import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isPending,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  isPending?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate">Xóa "{title}"?</DialogTitle>
          <DialogDescription>
<<<<<<< HEAD
            {description ?? "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/Ai-Study-fix-folder-refactor
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
<<<<<<< HEAD
          <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
=======
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
>>>>>>> origin/Ai-Study-fix-folder-refactor
            {isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
