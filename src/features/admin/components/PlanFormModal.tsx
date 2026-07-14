// src/features/admin/components/PlanFormModal.tsx
import React, { useState, useEffect } from "react";
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
}

export const PlanFormModal: React.FC<PlanFormModalProps> = ({
  open,
  onOpenChange,
  plan,
  mode,
  createPlan,
  updatePlan,
}) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [storageValue, setStorageValue] = useState<number>(1);
  const [storageUnit, setStorageUnit] = useState<"MB" | "GB">("GB");
  const [flashcardLimit, setFlashcardLimit] = useState<number>(0);
  const [questionLimit, setQuestionLimit] = useState<number>(0);
  const [summaryLimit, setSummaryLimit] = useState<number>(0);
  const [aiQuestions, setAiQuestions] = useState<number>(0);
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
      setIsActive(true);
    }
  }, [plan, mode, open]);

  const validateForm = (): { valid: boolean; message?: string } => {
    if (!name.trim()) return { valid: false, message: "Tên gói không được để trống" };
    if (price < 0) return { valid: false, message: "Giá không được nhỏ hơn 0" };
    if (durationDays < -1) return { valid: false, message: "Thời hạn không được nhỏ hơn 0 ngày (0 là vĩnh viễn)" };
    if (storageValue < 0) return { valid: false, message: "Dung lượng không được nhỏ hơn 0" };
    if (aiQuestions < 0) return { valid: false, message: "Số câu hỏi AI không được nhỏ hơn 0" };
    if (flashcardLimit < -1) return { valid: false, message: "Giới hạn flashcard không hợp lệ" };
    if (questionLimit < -1) return { valid: false, message: "Giới hạn câu hỏi không hợp lệ" };
    if (summaryLimit < -1) return { valid: false, message: "Giới hạn tóm tắt không hợp lệ" };
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
          isActive,
        } as any);
        toast.success("Đã cập nhật gói");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${mode === "create" ? "Tạo" : "Cập nhật"} thất bại`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
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

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên gói *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Pro, Premium"
            />
          </div>

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
          </div>
          
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
            <Label htmlFor="aiQuestions">Số câu hỏi AI *</Label>
            <Input
              id="aiQuestions"
              type="number"
              value={aiQuestions}
              onChange={(e) => setAiQuestions(Number(e.target.value))}
              placeholder="100"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="flashcardLimit">Flashcard *</Label>
              <Input
                id="flashcardLimit"
                type="number"
                value={flashcardLimit}
                onChange={(e) => setFlashcardLimit(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="questionLimit">Câu hỏi *</Label>
              <Input
                id="questionLimit"
                type="number"
                value={questionLimit}
                onChange={(e) => setQuestionLimit(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summaryLimit">Tóm tắt *</Label>
              <Input
                id="summaryLimit"
                type="number"
                value={summaryLimit}
                onChange={(e) => setSummaryLimit(Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>

          {mode === "edit" && (
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="isActive">Trạng thái</Label>
              <div className="flex items-center gap-2">
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
