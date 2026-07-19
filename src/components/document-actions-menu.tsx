<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useState } from "react";

=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/Ai-Study-fix-folder-refactor
import { Flag, FolderOpen, MoreVertical, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteDocument } from "@/lib/queries";
import { ShareDocumentDialog } from "@/components/share-document-dialog";
import { ReportDocumentDialog } from "@/components/report-document-dialog";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

export function DocumentActionsMenu({
  documentId,
  folderId,
  title,
  className,
  iconClassName,
}: {
  documentId: number;
<<<<<<< HEAD
  folderId: number;
=======
  folderId: string;
>>>>>>> origin/Ai-Study-fix-folder-refactor
  title: string;
  className?: string;
  iconClassName?: string;
}) {
  const navigate = useNavigate();
  const del = useDeleteDocument();

  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
<<<<<<< HEAD
            onClick={() => navigate(`/aichat?folderId=${folderId}&docId=${documentId}`)}
=======
            onClick={() =>
              navigate({
                to: "/ai",
                search: { folderId, docId: documentId },
              })
            }
>>>>>>> origin/Ai-Study-fix-folder-refactor
          >
            <FolderOpen className="h-3.5 w-3.5 mr-2" /> Mở
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShareOpen(true)}>
            <Share2 className="h-3.5 w-3.5 mr-2" /> Chia sẻ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setReportOpen(true)}>
            <Flag className="h-3.5 w-3.5 mr-2" /> Báo cáo
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5 mr-2" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ShareDocumentDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
<<<<<<< HEAD
        documentId={documentId}
        documentTitle={title}
=======
        documentTitle={title}
        folderId={folderId!}
>>>>>>> origin/Ai-Study-fix-folder-refactor
      />
      <ReportDocumentDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        documentId={documentId}
        documentTitle={title}
      />
      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={title}
        onConfirm={handleDelete}
        isPending={del.isPending}
      />
    </>
  );
}
