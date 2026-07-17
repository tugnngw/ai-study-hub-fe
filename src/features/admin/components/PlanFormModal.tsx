// src/features/admin/components/PlanFormModal.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MB_PER_GB, mbToGb } from "@/lib/config";
import type { AdminPlan } from "../services/paymentApi";
import type { useCreatePlan, useUpdatePlan } from "../hooks/usePayment";

interface PlanFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: AdminPlan | null;
  mode: "create" | "edit";
  createPlan: ReturnType<typeof useCreatePlan>;
  updatePlan: ReturnType<typeof useUpdatePlan>;
  existingPlans?: AdminPlan[];
}

export const PlanFormModal: React.FC<PlanFormModalProps> = ({
  open,
  onOpenChange,
  plan,
  mode,
  createPlan,
  updatePlan,
  existingPlans = [],
}) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [storageValue, setStorageValue] = useState<number>(1);
  const [storageUnit, setStorageUnit] = useState<"MB" | "GB">("GB");
  const [flashcardLimit, setFlashcardLimit] = useState<number>(0);
  const [questionLimit, setQuestionLimit] = useState<number>(0);
  const [summaryLimit, setSummaryLimit] = useState<number>(0);
  const [chatLimit, setChatLimit] = useState<number>(0);
  const [aiQuestions, setAiQuestions] = useState<number>(0);
  const [tier, setTier] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const createMutation = createPlan;
  const updateMutation = updatePlan;

  useEffect(() => {
    if (plan) {
      setName(plan.name || "");
      setPrice(plan.price || 0);
      setDurationDays(plan.durationDays || 30);
      const useMb = (plan.storageGb || 0) < 1;
      setStorageValue(useMb ? Math.round(plan.storageGb * MB_PER_GB) : plan.storageGb);
      setStorageUnit(useMb ? "MB" : "GB");
      setAiQuestions(plan.aiQuestions ?? 0);
      setFlashcardLimit(plan.flashcardLimit || 0);
      setQuestionLimit(plan.questionLimit || 0);
      setSummaryLimit(plan.summaryLimit || 0);
      setChatLimit(plan.chatLimit || 0);
      setTier(plan.tier ?? 0);
      setIsActive(plan.isActive !== undefined ? plan.isActive : true);
    } else if (mode === "create") {
      setName("");
      setPrice(0);
      setDurationDays(30);
      setStorageValue(1);
      setStorageUnit("GB");
      setAiQuestions(10);
      setFlashcardLimit(0);
      setQuestionLimit(0);
      setSummaryLimit(0);
      setChatLimit(0);
      setTier(0);
      setIsActive(true);
    }
  }, [plan, mode, open]);

  const validateForm = (): { valid: boolean; message?: string } => {
    if (!name.trim()) return { valid: false, message: "Tên gói không được để trống" };
    if (price < 0) return { valid: false, message: "Giá không được nhỏ hơn 0" };
    if (durationDays < -1) return { valid: false, message: "Thời hạn không được nhỏ hơn -1 (-1 là vĩnh viễn)" };
    if (storageValue < 0) return { valid: false, message: "Dung lượng không được nhỏ hơn 0" };
    if (aiQuestions < 0) return { valid: false, message: "Số câu hỏi AI không được nhỏ hơn 0" };
    if (flashcardLimit < -1) return { valid: false, message: "Giới hạn flashcard không hợp lệ" };
    if (questionLimit < -1) return { valid: false, message: "Giới hạn câu hỏi không hợp lệ" };
    if (summaryLimit < -1) return { valid: false, message: "Giới hạn tóm tắt không hợp lệ" };
    if (chatLimit < -1) return { valid: false, message: "Giới hạn chat không hợp lệ" };
    if (tier < 0) return { valid: false, message: "Cấp độ (tier) không được nhỏ hơn 0" };
    return { valid: true };
  };

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    const storageGb = storageUnit === "MB" ? mbToGb(storageValue) : storageValue;
    
    try {
      if (mode === "create") {
        await createMutation.mutateAsync({
          name,
          price,
          durationDays,
          storageGb,
          aiQuestions,
          flashcardLimit,
          questionLimit,
          summaryLimit,
          chatLimit,
          tier,
        } as any);
        toast.success("Đã tạo gói mới");
      } else if (plan) {
        await updateMutation.mutateAsync({
          id: plan.id,
          name,
          price,
          durationDays,
          storageGb,
          aiQuestions,
          flashcardLimit,
          questionLimit,
          summaryLimit,
          chatLimit,
          tier,
          isActive,
        } as any);
        toast.success("Đã cập nhật gói");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${mode === "create" ? "Tạo" : "Cập nhật"} thất bại`);
    }
  };

  const limitHint = (val: number) =>
    val === -1 ? "(không giới hạn)" : val === 0 ? "(tắt)" : "";

  // Tier map: group existing plans by tier
  const tierMap = useMemo(() => {
    const map = new Map<number, AdminPlan[]>();
    for (const p of existingPlans) {
      const t = p.tier ?? 0;
      if (!map.has(t)) map.set(t, []);
      map.get(t)!.push(p);
    }
    return map;
  }, [existingPlans]);

  const sortedTiers = useMemo(() =>
    Array.from(tierMap.entries()).sort(([a], [b]) => a - b),
    [tierMap],
  );

  const tierConflict = useMemo(() => {
    const existing = tierMap.get(tier) ?? [];
    if (existing.length === 0) return null;
    if (mode === "edit" && plan && existing.length === 1 && existing[0].id === plan.id) return null;
    return `Tier ${tier} đã được dùng bởi: ${existing.map(p => p.name).join(", ")}`;
  }, [tier, tierMap, mode, plan]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tạo gói nâng cấp mới" : `Sửa gói "${plan?.name}"`}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Điền thông tin để tạo gói nâng cấp mới"
              : "Chỉnh sửa thông tin gói nâng cấp"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Tên gói */}
          <div className="space-y-2">
            <Label htmlFor="name">Tên gói *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Pro, Premium"
            />
          </div>

          {/* Giá & Thời hạn */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Giá (VNĐ) *</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="99000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="durationDays">Thời hạn (ngày) *</Label>
              <Input
                id="durationDays"
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                placeholder="30"
              />
              <p className="text-xs text-muted-foreground">-1 = vĩnh viễn</p>
            </div>
          </div>

          {/* Dung lượng & Quiz */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storage">Dung lượng lưu trữ *</Label>
              <div className="flex gap-2">
                <Input
                  id="storage"
                  type="number"
                  step="any"
                  value={storageValue}
                  onChange={(e) => setStorageValue(Number(e.target.value))}
                  className="flex-1"
                  placeholder="1"
                />
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={storageUnit}
                  onChange={(e) => setStorageUnit(e.target.value as "MB" | "GB")}
                >
                  <option value="MB">MB</option>
                  <option value="GB">GB</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aiQuestions">Số câu hỏi Quiz AI *</Label>
              <Input
                id="aiQuestions"
                type="number"
                value={aiQuestions}
                onChange={(e) => setAiQuestions(Number(e.target.value))}
                placeholder="100"
              />
              <p className="text-xs text-muted-foreground">Số câu hỏi cho mỗi bài Quiz (mỗi lần tạo)</p>
            </div>
          </div>

          {/* Giới hạn tính năng */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-3">
              Giới hạn tính năng <span className="text-xs font-normal">(-1 = không giới hạn, 0 = tắt)</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-2">
                <Label htmlFor="flashcardLimit">Flashcard (lượt) *</Label>
                <Input
                  id="flashcardLimit"
                  type="number"
                  value={flashcardLimit}
                  onChange={(e) => setFlashcardLimit(Number(e.target.value))}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground h-4">{limitHint(flashcardLimit)}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="questionLimit">Quiz (lượt) *</Label>
                <Input
                  id="questionLimit"
                  type="number"
                  value={questionLimit}
                  onChange={(e) => setQuestionLimit(Number(e.target.value))}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground h-4">{limitHint(questionLimit)}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summaryLimit">Tóm tắt (lượt) *</Label>
                <Input
                  id="summaryLimit"
                  type="number"
                  value={summaryLimit}
                  onChange={(e) => setSummaryLimit(Number(e.target.value))}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground h-4">{limitHint(summaryLimit)}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chatLimit">AI Chat (lượt) *</Label>
                <Input
                  id="chatLimit"
                  type="number"
                  value={chatLimit}
                  onChange={(e) => setChatLimit(Number(e.target.value))}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground h-4">{limitHint(chatLimit)}</p>
              </div>
            </div>
          </div>

          {/* Cấp độ & Trạng thái */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tier">Cấp độ (Tier) *</Label>
              <Input
                id="tier"
                type="number"
                value={tier}
                onChange={(e) => setTier(Number(e.target.value))}
                placeholder="0"
                className={tierConflict ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {tierConflict ? (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>⚠</span> {tierConflict}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Số càng cao = gói càng cao. Không nên trùng tier giữa các gói.
                </p>
              )}
              {/* Tier map */}
              {sortedTiers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {sortedTiers.map(([t, plans]) => {
                    const isCurrentTier = t === tier;
                    const isOwn = mode === "edit" && plan && plans.length === 1 && plans[0].id === plan.id;
                    const taken = isCurrentTier && !isOwn;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTier(t)}
                        className={`
                          inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border
                          ${taken
                            ? "bg-red-50 border-red-200 text-red-600"
                            : isCurrentTier
                              ? "bg-primary/10 border-primary/30 text-primary"
                              : "bg-muted/50 border-border text-muted-foreground hover:border-primary/30"
                          }
                          ${isOwn ? "ring-1 ring-primary/30" : ""}
                        `}
                      >
                        <span className="font-mono">{t}</span>
                        <span>{plans.map(p => p.name).join(", ")}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {mode === "edit" && (
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <div className="flex items-center gap-3 pt-2">
                  <Switch
                    id="isActive"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                  <Badge variant={isActive ? "secondary" : "outline"}>
                    {isActive ? "Đang bật" : "Đã ẩn"}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu gói"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
