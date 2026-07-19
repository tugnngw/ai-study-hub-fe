import { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { AlertTriangle } from "lucide-react";
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
import { toast } from "sonner";
import { useReportDocument } from "@/lib/queries";
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

export function ReportDocumentDialog({
  open,
  onOpenChange,
  documentId,
  documentTitle,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
<<<<<<< HEAD
  documentId: number;
=======
  documentId: string;
>>>>>>> origin/AI-Study-fix
  documentTitle: string;
}) {
  const report = useReportDocument();
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
      toast.error("Vui lòng chọn lý do báo cáo");
      return;
    }
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      await report.mutateAsync({ id: documentId, reason, description: description.trim() || undefined });
=======
=======
>>>>>>> origin/AI-Study-fix
      await report.mutateAsync({
        id: documentId,
        reason,
        description: description.trim() || undefined,
      });
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
      toast.success("Đã gửi báo cáo, cảm ơn bạn!");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gửi báo cáo thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
<<<<<<< HEAD
<<<<<<< HEAD
          <DialogTitle className="flex items-center gap-2 truncate">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
=======
          <DialogTitle className="truncate">
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
          <DialogTitle className="truncate">
>>>>>>> origin/AI-Study-fix
            Báo cáo "{documentTitle}"
          </DialogTitle>
          <DialogDescription>
            Cho chúng tôi biết vấn đề bạn gặp phải với tài liệu này.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Lý do báo cáo</Label>
<<<<<<< HEAD
<<<<<<< HEAD
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
=======
=======
>>>>>>> origin/AI-Study-fix
            <RadioGroup
              value={reason}
              onValueChange={setReason}
              className="space-y-2"
            >
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
              {REPORT_REASONS.map((r) => (
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
              placeholder="Cung cấp chi tiết để chúng tôi xử lý nhanh hơn..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
<<<<<<< HEAD
<<<<<<< HEAD
          <Button variant="destructive" onClick={submit} disabled={report.isPending}>
=======
=======
>>>>>>> origin/AI-Study-fix
          <Button
            variant="destructive"
            onClick={submit}
            disabled={report.isPending}
          >
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
            {report.isPending ? "Đang gửi..." : "Gửi báo cáo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
