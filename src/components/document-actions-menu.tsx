import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Flag, FolderOpen, MoreVertical, Download, Trash2, Pin, PinOff } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteDocument, useDownloadDocument } from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
import { ReportDocumentDialog } from "@/components/report-document-dialog";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

export function DocumentActionsMenu({
  documentId,
  folderId,
  title,
  className,
  iconClassName,
}: {
  documentId: string;
  folderId: string;
  title: string;
  className?: string;
  iconClassName?: string;
}) {
  const navigate = useNavigate();
  const del = useDeleteDocument();
  const download = useDownloadDocument();
  const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
  const pinned = isPinned(documentId);

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

  const handleDownload = async () => {
    try {
      const res = await download.mutateAsync(documentId);
      window.open(res.url, "_blank");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Tải xuống thất bại");
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
                search: { folderId, docId: documentId },
              })
            }
          >
            <FolderOpen className="h-3.5 w-3.5 mr-2" /> Mở
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload} disabled={download.isPending}>
            <Download className="h-3.5 w-3.5 mr-2" /> Tải xuống
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
