<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
>>>>>>> origin/update/feature/AI/Quiz
import { Flag, FolderOpen, MoreVertical, Share2, Trash2 } from "lucide-react";
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Flag, FolderOpen, MoreVertical, Download, Trash2, Pin, PinOff } from "lucide-react";
>>>>>>> origin/Flashcards-fix
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Flag, FolderOpen, MoreVertical, Download, Trash2, Pin, PinOff } from "lucide-react";
>>>>>>> origin/admin-added-fix
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Flag, FolderOpen, MoreVertical, Download, Trash2, Pin, PinOff } from "lucide-react";
>>>>>>> origin/Flashcars
=======
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Flag, FolderOpen, MoreVertical, Download, Trash2, Pin, PinOff, Share2, Pencil } from "lucide-react";
>>>>>>> origin/final/demo-v1
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useDeleteDocument } from "@/lib/queries";
<<<<<<< HEAD
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
=======
import { ShareDocumentDialog } from "@/components/share-document-dialog";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { useDeleteDocument, useDownloadDocument } from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
>>>>>>> origin/Flashcards-fix
=======
import { useDeleteDocument, useDownloadDocument } from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
>>>>>>> origin/admin-added-fix
=======
import { useDeleteDocument, useDownloadDocument } from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
>>>>>>> origin/Flashcars
import { ReportDocumentDialog } from "@/components/report-document-dialog";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
=======
import { useDeleteDocument, useDownloadDocument } from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
import { ReportDocumentDialog } from "@/components/report-document-dialog";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { ShareEntityDialog } from "@/components/share-entity-dialog";
import { EditDocumentDialog } from "@/components/edit-document-dialog";
>>>>>>> origin/final/demo-v1

export function DocumentActionsMenu({
  documentId,
  folderId,
  title,
<<<<<<< HEAD
  className,
  iconClassName,
}: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  documentId: number;
  folderId: string;
>>>>>>> origin/update/feature/AI/Quiz
=======
  documentId: number;
  folderId: string;
>>>>>>> origin/Flashcards-fix
=======
  documentId: number;
  folderId: string;
>>>>>>> origin/admin-added-fix
=======
  documentId: string;
  folderId: string;
>>>>>>> origin/Flashcars
  title: string;
=======
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
>>>>>>> origin/final/demo-v1
  className?: string;
  iconClassName?: string;
}) {
  const navigate = useNavigate();
  const del = useDeleteDocument();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  const [shareOpen, setShareOpen] = useState(false);
=======
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  const download = useDownloadDocument();
  const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
  const pinned = isPinned(documentId);

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  const [reportOpen, setReportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
=======
  const download = useDownloadDocument();
  const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
  const pinned = isPinned(documentId);
  const isRejected = status?.toUpperCase() === "REJECT";

  const [reportOpen, setReportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
>>>>>>> origin/final/demo-v1

  const handleDelete = async () => {
    try {
      await del.mutateAsync(documentId);
      toast.success("Đã xóa tài liệu");
      setDeleteOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xóa thất bại");
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  const handleDownload = async () => {
    try {
      const res = await download.mutateAsync(documentId);
      window.open(res.url, "_blank");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Tải xuống thất bại");
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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
          >
            <FolderOpen className="h-3.5 w-3.5 mr-2" /> Mở
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShareOpen(true)}>
            <Share2 className="h-3.5 w-3.5 mr-2" /> Chia sẻ
=======
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
          >
            <FolderOpen className="h-3.5 w-3.5 mr-2" /> Mở
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload} disabled={download.isPending}>
            <Download className="h-3.5 w-3.5 mr-2" /> Tải xuống
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
          >
            <FolderOpen className="h-3.5 w-3.5 mr-2" /> Mở
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="h-3.5 w-3.5 mr-2" /> Sửa thông tin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload} disabled={download.isPending}>
            <Download className="h-3.5 w-3.5 mr-2" /> Tải xuống
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
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        </DropdownMenuContent>
      </DropdownMenu>

<<<<<<< HEAD
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
=======
>>>>>>> origin/update/feature/AI/Quiz
      <ShareDocumentDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        documentTitle={title}
        folderId={folderId!}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
      />
=======
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
=======
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
>>>>>>> origin/final/demo-v1
    </>
  );
}
