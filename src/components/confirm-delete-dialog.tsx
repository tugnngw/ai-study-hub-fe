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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            {description ?? "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/AI-Study-fix
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/test/share-document-cloudinary
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/uichange
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/admin-added
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/update/feature/share
=======
            {description ??
              "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."}
>>>>>>> origin/update/feature/AI/Quiz
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
            {isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
