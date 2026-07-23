import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FolderOpen, MoreVertical, Trash2, Pin, PinOff, Share2, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { encodeId } from "@/lib/id-encoder";
import { useDeleteDocument } from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { ShareEntityDialog } from "@/components/share-entity-dialog";
import { EditDocumentDialog } from "@/components/edit-document-dialog";

export function DocumentActionsMenu({
  documentId,
  folderId,
  title,
  status,
  description,
  subjectId,
  className,
  iconClassName,
}: {
  documentId: string;
  folderId: string;
  title: string;
  status?: string;
  description?: string;
  subjectId?: string;
  className?: string;
  iconClassName?: string;
}) {
  const navigate = useNavigate();
  const del = useDeleteDocument();
  const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
  const pinned = isPinned(documentId);
  const isRejected = status?.toUpperCase() === "REJECT";

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await del.mutateAsync(documentId);
      toast.success("Đã xóa tài liệu");
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
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem
            onClick={() =>
              navigate({
                to: "/ai",
                search: { f: encodeId(folderId), d: encodeId(documentId) },
              })
            }
          >
            <FolderOpen className="h-3.5 w-3.5 mr-2" /> Mở
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="h-3.5 w-3.5 mr-2" /> Sửa thông tin
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              if (isRejected) {
                toast.error("Tài liệu bị từ chối duyệt, không thể chia sẻ");
                return;
              }
              setShareOpen(true);
            }}
            disabled={isRejected}
            className={isRejected ? "opacity-50 cursor-not-allowed" : ""}
          >
            <Share2 className="h-3.5 w-3.5 mr-2" /> Chia sẻ
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5 mr-2" /> Xóa
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              togglePin(documentId);
              toast.success(pinned ? "Đã bỏ ghim tài liệu" : "Đã ghim tài liệu");
            }}
          >
            {pinned ? (
              <PinOff className="h-3.5 w-3.5 mr-2" />
            ) : (
              <Pin className="h-3.5 w-3.5 mr-2" />
            )}
            {pinned ? "Bỏ ghim" : "Ghim"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={title}
        onConfirm={handleDelete}
        isPending={del.isPending}
      />
      <ShareEntityDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={title}
        documentId={documentId}
      />
      <EditDocumentDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        documentId={documentId}
        initial={{ title, description, folderId, subjectId }}
      />
    </>
  );
}
