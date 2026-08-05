import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useReportDocument, useSubmitAppeal } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const REPORT_REASONS = [
  { value: "copyright", label: "Nội dung vi phạm bản quyền" },
  { value: "misinformation", label: "Thông tin sai lệch / gây hiểu lầm" },
  { value: "inappropriate", label: "Nội dung không phù hợp / phản cảm" },
  { value: "privacy", label: "Vi phạm quyền riêng tư" },
  { value: "other", label: "Lý do khác" },
] as const;

const APPEAL_REASONS = [
  { value: "not_violation", label: "Tài liệu của tôi không vi phạm quy định" },
  { value: "misunderstood", label: "Nội dung bị hiểu lầm" },
  { value: "fixed", label: "Tôi đã chỉnh sửa / sẽ chỉnh sửa nội dung" },
  { value: "other", label: "Lý do khác" },
] as const;

export function ReportDocumentDialog({
  open,
  onOpenChange,
  documentId,
  documentTitle,
  mode = "REPORT",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  documentId: string;
  documentTitle: string;
  mode?: "REPORT" | "APPEAL";
}) {
  const report = useReportDocument();
  const appeal = useSubmitAppeal();
  const isAppeal = mode === "APPEAL";
  const [reason, setReason] = useState<string>("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) {
      setReason("");
      setDescription("");
    }
  }, [open]);

  const submit = async () => {
    if (!reason) {
      toast.error(isAppeal ? "Vui lòng chọn lý do kháng cáo" : "Vui lòng chọn lý do báo cáo");
      return;
    }
    try {
      await (isAppeal ? appeal : report).mutateAsync({
        id: documentId,
        reason,
        description: description.trim(),
      });
      toast.success(isAppeal ? "Đã gửi kháng cáo, chờ quản trị viên xem xét!" : "Đã gửi báo cáo, cảm ơn bạn!");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : (isAppeal ? "Gửi kháng cáo thất bại" : "Gửi báo cáo thất bại"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate">
            {isAppeal ? "Kháng cáo" : "Báo cáo"} "{documentTitle}"
          </DialogTitle>
          <DialogDescription>
            {isAppeal
              ? "Giải thích vì sao tài liệu của bạn không vi phạm quy định."
              : "Cho chúng tôi biết vấn đề bạn gặp phải với tài liệu này."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{isAppeal ? "Lý do kháng cáo" : "Lý do báo cáo"}</Label>
            <RadioGroup
              value={reason}
              onValueChange={setReason}
              className="space-y-2"
            >
              {(isAppeal ? APPEAL_REASONS : REPORT_REASONS).map((r) => (
                <label
                  key={r.value}
                  className="flex items-center gap-2 text-sm rounded-md border border-border/60 px-3 py-2 cursor-pointer hover:bg-accent/40"
                >
                  <RadioGroupItem value={r.value} />
                  {r.label}
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Mô tả thêm (tùy chọn)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isAppeal ? "Cung cấp chi tiết để quản trị viên xem xét..." : "Cung cấp chi tiết để chúng tôi xử lý nhanh hơn..."}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={submit}
            disabled={(isAppeal ? appeal : report).isPending}
          >
            {(isAppeal ? appeal : report).isPending ? "Đang gửi..." : isAppeal ? "Gửi kháng cáo" : "Gửi báo cáo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
