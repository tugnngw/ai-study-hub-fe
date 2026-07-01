import React from "react";
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
import { Loader2 } from "lucide-react";

interface DocumentViewerProps {
  document: Document;
  className?: string;
}

/**
 * DocumentViewer - Main orchestrator component
 *
 * Validates backend data and selects correct viewer:
 * - Priority 1: document.mimeType
 * - Priority 2: Extension from cloudinaryUrl
 *
 * Supported types:
 * - PDF: react-pdf with lazy page loading
 * - DOCX: docx-preview with retry logic
 * - TXT: Plain text with line preservation
 * - Unsupported: Friendly message + download
 */
export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  className,
}) => {
  console.log('[Debug Flow] DocumentViewer: Received document prop:', {
    id: document.id,
    title: document.title,
    status: document.status,
    cloudinaryUrl: document.cloudinaryUrl,
    mimeType: document.mimeType,
    publicId: document.publicId,
  });

  if (document.status === "PROCESSING") {
    return (
      <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
          <p className="text-sm text-muted-foreground">Đang xử lý tài liệu...</p>
          <p className="text-xs text-muted-foreground mt-1">Vui lòng đợi trong giây lát</p>
        </div>
      </Card>
    );
  }

  if (document.status === "REJECT") {
    return (
      <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-red-500 font-medium mb-2">Không thể tải tài liệu</p>
          <p className="text-sm text-muted-foreground">Tài liệu đã xảy ra lỗi khi xử lý</p>
        </div>
      </Card>
    );
  }
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
  switch (fileType) {
    case "pdf":
      console.log('[Debug Flow] DocumentViewer: Rendering PdfViewer');
      return (
        <PdfViewer
          url={fileUrl}
          fileName={fileName}
          className={className}
          documentId={document.id}
        />
      );

    case "docx":
      console.log('[Debug Flow] DocumentViewer: Rendering DocxViewer');
      return (
        <DocxViewer
          url={fileUrl}
          fileName={fileName}
          className={className}
        />
      );

    case "txt":
      console.log('[Debug Flow] DocumentViewer: Rendering TextViewer');
      return (
        <TextViewer
          url={fileUrl}
          fileName={fileName}
          className={className}
        />
      );

    case "unsupported":
    default:
      console.log('[Debug Flow] DocumentViewer: Rendering UnsupportedFileViewer');
      return (
        <UnsupportedFileViewer
          fileName={fileName}
          detectedType={getTypeLabel("unsupported")}
          fileUrl={fileUrl}
          className={className}
        />
      );
  }
};

export type { Document } from "@/lib/types";