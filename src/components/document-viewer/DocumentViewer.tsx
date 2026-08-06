import React, { useState } from "react";
import { PdfViewer } from "./PdfViewer";
import { DocxViewer } from "./DocxViewer";
import { TextViewer } from "./TextViewer";
import { UnsupportedFileViewer } from "./UnsupportedFileViewer";
import {
  detectFileType,
  extractFileName,
  getTypeLabel,
} from "./fileTypeDetection";
import type { Document } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import {
  AlertTriangle,
  Clock,
  Trash2,
  XCircle,
} from "lucide-react";
import { isContentAccessible, contentBlockedReason } from "@/lib/document-status";
import { useDeleteDocument, useMySubmittedReports } from "@/lib/queries";
import { toast } from "sonner";
import { ReportDocumentDialog } from "@/components/report-document-dialog";

interface DocumentViewerProps {
  document: Document;
  className?: string;
  onReport?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  className,
  onReport,
}) => {
  const del = useDeleteDocument();
  const myReports = useMySubmittedReports();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [appealOpen, setAppealOpen] = useState(false);

  // Appeal đã gửi + đang chờ xử lý → disable nút kháng cáo
  const hasPendingAppeal = (myReports.data ?? []).some(
    (r: any) => String(r.documentId) === String(document.id) && r.status === "pending",
  );

  const handleDelete = async () => {
    try {
      await del.mutateAsync(document.id);
      toast.success("Đã xóa tài liệu");
      setDeleteOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xóa thất bại");
    }
  };
  console.log('[Debug Flow] DocumentViewer: Received document prop:', {
    id: document.id,
    title: document.title,
    status: document.status,
    cloudinaryUrl: document.cloudinaryUrl,
    mimeType: document.mimeType,
    publicId: document.publicId,
  });

  if (document.status === "REJECT") {
    return (
      <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="text-red-500">
              <svg className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-red-600">Tài liệu đã bị từ chối duyệt</p>
            {document.rejectReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2 max-w-md">
                <p className="text-sm font-medium text-red-800 mb-1">Lý do từ chối:</p>
                <p className="text-sm text-red-700">{document.rejectReason}</p>
              </div>
            )}
            <p className="text-sm text-gray-600 mt-3">
              Vui lòng chỉnh sửa lại nội dung tài liệu và tải lên lại,<br />hoặc liên hệ quản trị viên để biết thêm chi tiết.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // BANNED: card riêng — KHÔNG mount viewer. Owner chỉ còn Xóa (+ Appeal tương lai).
  if (document.status === "BANNED") {
    return (
      <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-red-500">
              <AlertTriangle className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-lg font-medium text-red-600">Tài liệu đã bị cấm</p>
            <p className="text-sm text-gray-500">
              Tài liệu này đã bị quản trị viên khóa vì vi phạm quy định và không còn có thể sử dụng.
            </p>
            {document.rejectReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2 text-left">
                <p className="text-sm font-medium text-red-800 mb-1">Lý do:</p>
                <p className="text-sm text-red-700">{document.rejectReason}</p>
              </div>
            )}
            <div className="text-sm text-muted-foreground text-left pt-2 border-t border-border/60">
              <p className="font-medium mb-1">Bạn vẫn có thể:</p>
              <div className="flex items-center gap-1.5 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className="underline decoration-destructive/40 underline-offset-2 hover:text-destructive/80"
                >
                  Xóa tài liệu
                </button>
              </div>
              {hasPendingAppeal ? (
                <div className="flex items-center gap-1.5 text-amber-600 mt-1.5 text-xs font-medium">
                  Kháng cáo đang chờ xử lý
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-primary mt-1.5">
                  <button
                    type="button"
                    onClick={() => setAppealOpen(true)}
                    className="underline decoration-primary/40 underline-offset-2 hover:text-primary/80"
                  >
                    Kháng cáo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ConfirmDeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title={document.title}
          onConfirm={handleDelete}
          isPending={del.isPending}
        />
        <ReportDocumentDialog
          mode="APPEAL"
          open={appealOpen}
          onOpenChange={setAppealOpen}
          documentId={document.id}
          documentTitle={document.title}
        />
      </Card>
    );
  }

  // COMPLETED/REJECT: show placeholder with metadata, no file content.
  if (!isContentAccessible(document.status)) {
    const blockReason = contentBlockedReason(document.status);
    return (
      <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          {document.status === "COMPLETED" ? (
            <Clock className="h-16 w-16 text-yellow-500 mb-4" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
          )}
          <h3 className="text-lg font-semibold mb-2">
            {document.status === "COMPLETED" ? "Đang chờ phê duyệt" : "Tài liệu bị từ chối"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            {blockReason}
          </p>
          {document.rejectReason && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 max-w-md text-left">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">Lý do từ chối:</p>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">{document.rejectReason}</p>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // REPORTED: hidden from user — file works normally until admin bans it.
  const reportedBanner = null;

  console.log('[Debug Flow] DocumentViewer: File URL:', document.cloudinaryUrl);

  console.log('[Debug Flow] DocumentViewer: File URL:', document.cloudinaryUrl);
  // Validate cloudinaryUrl exists
  const fileUrl = document.cloudinaryUrl;
  if (!fileUrl || fileUrl.trim() === "") {
    return (
      <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center">
            <p className="text-red-500 font-medium mb-2">
              Không có tệp để hiển thị
            </p>
            <p className="text-sm text-muted-foreground">
              Tài liệu này chưa được tải lên hoặc URL không hợp lệ.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Validate mimeType exists (optional but logged)
  if (!document.mimeType) {
    console.warn(
      `Document ${document.id} (${document.title}) missing mimeType. Fallback to URL extension.`
    );
  }

  // Detect file type with priority: mimeType > extension
  const fileType = detectFileType(document.mimeType, fileUrl);
  console.log('[Debug Flow] DocumentViewer: Detected File Type:', fileType);
  const fileName = document.title || extractFileName(fileUrl);

  // Render appropriate viewer based on detected type
  const viewer = (() => {
    switch (fileType) {
      case "pdf":
        return <PdfViewer url={fileUrl} fileName={fileName} className={className} documentId={document.id} fileSize={document.fileSize} mimeType={document.mimeType} totalPages={document.totalPages} createdAt={document.createdAt} />;
      case "docx":
        return <DocxViewer url={fileUrl} fileName={fileName} className={className} />;
      case "txt":
        return <TextViewer url={fileUrl} fileName={fileName} className={className} />;
      default:
        return <UnsupportedFileViewer fileName={fileName} detectedType={getTypeLabel("unsupported")} fileUrl={fileUrl} className={className} />;
    }
  })();

  return (
    <div className={`flex flex-col ${className || ""}`}>
      {reportedBanner}
      <div className="flex-1 min-h-0">{viewer}</div>
    </div>
  );
};

export type { Document } from "@/lib/types";