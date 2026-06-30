// src/components/document-viewer/DocxViewer.tsx

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, RotateCw, Download, ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isCloudinaryUrl,
  fetchCloudinaryFile, // Chỉ dùng fetch thuần
} from "./cloudinaryUtils";

interface DocxViewerProps {
  url: string;
  fileName?: string;
  className?: string;
}

export const DocxViewer: React.FC<DocxViewerProps> = ({
                                                        url,
                                                        fileName = "document.docx",
                                                        className,
                                                      }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isCloudinary = isCloudinaryUrl(url);

  const fetchAndRender = useCallback(async () => {
    if (!containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) void fetchAndRender();
      }, 50);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      containerRef.current.innerHTML = "";

      // 🟢 SỬA ĐỔI: Dùng trực tiếp fetch để lấy ArrayBuffer
      let arrayBuffer: ArrayBuffer | null = null;

      if (isCloudinary) {
        // Với Cloudinary, dùng hàm fetchCloudinaryFile để xử lý CORS / fl_attachment
        const blob = await fetchCloudinaryFile(url);
        if (!blob) throw new Error("Không thể tải file từ Cloudinary");
        arrayBuffer = await blob.arrayBuffer();
      } else {
        // Với URL thường, fetch bình thường
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        arrayBuffer = await response.arrayBuffer();
      }

      if (!arrayBuffer) throw new Error("Dữ liệu file rỗng");

      const { renderAsync } = await import("docx-preview");

      if (containerRef.current) {
        // 🟢 Truyền trực tiếp ArrayBuffer (không cần Blob URL)
        await renderAsync(arrayBuffer, containerRef.current, {
          renderImages: true,
          experimental: true,
          useBase64: true,
        } as any);
      }

      setLoading(false);
    } catch (e: any) {
      console.error("DOCX render error:", e);
      setError(e.message || "Không thể hiển thị nội dung file.");
      setLoading(false);
    }
  }, [url, isCloudinary]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAndRender();
  }, [url, retryCount, fetchAndRender]);

  const handleRetry = () => setRetryCount((prev) => prev + 1);

  const Toolbar = (
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold truncate max-w-[160px]">{fileName}</span>
        </div>
        <div className="flex items-center gap-0.5 flex-wrap">
          <Button variant="ghost" size="sm" asChild>
            <a href={url} download target="_blank" rel="noopener noreferrer">
              <Download className="h-3.5 w-3.5 mr-1" /> Tải
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1" /> Mở mới
            </a>
          </Button>
        </div>
      </div>
  );

  return (
      <Card className={cn("flex flex-col min-h-0", className)}>
        {Toolbar}

        {loading && (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
              <p className="text-sm text-muted-foreground">Đang tải DOCX...</p>
            </div>
        )}

        {error && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                <RotateCw className="h-4 w-4 mr-2" /> Thử lại
              </Button>
            </div>
        )}

        {!loading && !error && (
            <div className="flex-1 overflow-auto p-6 bg-white">
              <div
                  ref={containerRef}
                  className="docx-viewer prose prose-sm max-w-none dark:prose-invert"
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    height: "100%",
                    width: "100%",
                    minHeight: "400px",
                    overflow: "auto",
                  }}
              />
            </div>
        )}
      </Card>
  );
};