<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useState } from "react";

=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/AI-Study-fix
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/test/share-document-cloudinary
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/uichange
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/admin-added
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/update/feature/share
import { Flag, FolderOpen, MoreVertical, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteDocument } from "@/lib/queries";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { ShareDocumentDialog } from "@/components/share-document-dialog";
=======
import { ShareDialog } from "@/components/share-dialog";
>>>>>>> origin/test/share-document-cloudinary
=======
import { ShareDialog } from "@/components/share-dialog";
>>>>>>> origin/uichange
=======
import { ShareDocumentDialog } from "@/components/share-document-dialog";
>>>>>>> origin/admin-added
=======
import { ShareDocumentDialog } from "@/components/share-document-dialog";
>>>>>>> origin/update/feature/share
import { ReportDocumentDialog } from "@/components/report-document-dialog";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

export function DocumentActionsMenu({
  documentId,
  folderId,
  title,
  className,
  iconClassName,
}: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  documentId: number;
<<<<<<< HEAD
  folderId: number;
=======
  folderId: string;
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  documentId: string;
  folderId: string;
>>>>>>> origin/AI-Study-fix
=======
  documentId: string;
  folderId: string;
>>>>>>> origin/test/share-document-cloudinary
=======
  documentId: string;
  folderId: string;
>>>>>>> origin/uichange
=======
  documentId: number;
  folderId: string;
>>>>>>> origin/admin-added
=======
  documentId: number;
  folderId: string;
>>>>>>> origin/update/feature/share
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            onClick={() => navigate(`/aichat?folderId=${folderId}&docId=${documentId}`)}
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
            onClick={() =>
              navigate({
                to: "/ai",
                search: { folderId, docId: documentId },
              })
            }
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <ShareDocumentDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
<<<<<<< HEAD
<<<<<<< HEAD
        documentId={documentId}
        documentTitle={title}
=======
        documentTitle={title}
        folderId={folderId!}
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
        documentTitle={title}
        folderId={folderId!}
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        targetId={documentId}
        targetType="document"
        targetTitle={title}
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
=======
>>>>>>> origin/update/feature/share
      <ShareDocumentDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        documentTitle={title}
        folderId={folderId!}
<<<<<<< HEAD
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
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
