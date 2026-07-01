import { useState } from "react";
import { Download, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteSharedDocument } from "@/lib/queries";
import { SaveSharedDocumentDialog } from "@/components/save-shared-document-dialog";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

export function SharedDocumentActionsMenu({
                                            sharedId,
                                            title,
                                            description,
                                            className,
                                            iconClassName,
                                          }: {
  sharedId: string;
  title: string;
  description?: string;
  className?: string;
  iconClassName?: string;
}) {
  const del = useDeleteSharedDocument();
  const [saveOpen, setSaveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await del.mutateAsync(sharedId);
      toast.success("Đã xóa khỏi danh sách được chia sẻ");
      setDeleteOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xóa thất bại");
    }
  };

  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className={
                    className ??
                    "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0"
                }
                title="Tùy chọn"
            >
              <MoreVertical className={iconClassName ?? "h-4 w-4"} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSaveOpen(true)}>
              <Download className="h-3.5 w-3.5 mr-2" /> Lưu
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={() => setDeleteOpen(true)}
                className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <SaveSharedDocumentDialog
            open={saveOpen}
            onOpenChange={setSaveOpen}
            sharedId={sharedId}
            defaultTitle={title}
            defaultDescription={description}
        />
        <ConfirmDeleteDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title={title}
            description="Bạn có chắc chắn muốn xóa tài liệu này khỏi danh sách được chia sẻ?"
            onConfirm={handleDelete}
            isPending={del.isPending}
        />
      </>
  );
}
