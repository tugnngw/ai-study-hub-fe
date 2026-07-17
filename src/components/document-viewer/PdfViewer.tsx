// src/components/document-viewer/PdfViewer.tsx
import React from "react";
import { FileText, ExternalLink, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";

interface PdfViewerProps {
  url: string;
  fileName?: string;
  className?: string;
  documentId?: string;
  fileSize?: number | null;
  mimeType?: string | null;
  totalPages?: number | null;
  createdAt?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  fileName = "document.pdf",
  className,
  fileSize,
  mimeType,
  totalPages,
  createdAt,
}) => {
  const ext = (fileName.split(".").pop() || "PDF").toUpperCase();

  return (
    <Card className={cn("flex flex-col min-h-0", className)} style={{ minHeight: "400px" }}>
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold truncate max-w-[160px]">{fileName}</span>
          {totalPages && <span className="text-[11px] text-muted-foreground whitespace-nowrap">/ {totalPages} trang</span>}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild className="h-7 px-1.5 text-[11px]">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              Mở mới
            </a>
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center">
        {!url ? (
          <div className="text-sm text-muted-foreground text-center px-6">
            Không có đường dẫn xem trước cho file này.
          </div>
        ) : (
          <iframe src={url} title={fileName} className="w-full h-full" />
        )}
      </div>

      <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground">
        <span>Loại: {mimeType || ext}</span>
        <span>Kích thước: {formatBytes(fileSize)}</span>
        {createdAt && <span>Ngày tải lên: {new Date(createdAt).toLocaleDateString("vi-VN")}</span>}
      </div>
    </Card>
  );
};