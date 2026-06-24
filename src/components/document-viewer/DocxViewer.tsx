// src/components/document-viewer/DocxViewer.tsx

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, RotateCw, Download, ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  isCloudinaryUrl,
  createCloudinaryBlobUrl,
  cleanupBlobUrl,
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
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const isCloudinary = isCloudinaryUrl(url);

  // Process URL on mount and when URL changes
  useEffect(() => {
    let isMounted = true;
    let currentBlobUrl: string | null = null;

    const processUrl = async () => {
      setProcessedUrl(null);
      setLoading(true);

      const blobUrl = await createCloudinaryBlobUrl(url);

      if (isMounted) {
        if (blobUrl) {
          setProcessedUrl(blobUrl);
          setError(null);
          currentBlobUrl = blobUrl;
        } else {
          setProcessedUrl(null);
        }
        setLoading(false);
      }
    };

    if (isCloudinary) {
      processUrl();
    }

    return () => {
      isMounted = false;
      if (currentBlobUrl) {
        cleanupBlobUrl(currentBlobUrl);
      }
    };
  }, [url, isCloudinary]);

  const fetchAndRender = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      setLoading(true);
      setError(null);
      containerRef.current.innerHTML = "";

      // Use processedUrl (blob) for Cloudinary, original URL for others
      const targetUrl = (isCloudinary && processedUrl) ? processedUrl : url;

      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          Accept: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const { renderAsync } = await import("docx-preview");

      await renderAsync(arrayBuffer, containerRef.current, {
        renderImages: true,
      });

      setLoading(false);
    } catch (e) {
      console.error("DOCX render error:", e);
      const errorMsg = e instanceof Error ? e.message : "Unknown error";

      if (isCloudinary && (errorMsg.includes("HTTP 4") || errorMsg.includes("fetch"))) {
        setError(
          "Không thể tải file từ Cloudinary. Vui lòng tải xuống để xem."
        );
      } else if (errorMsg.includes("format") || errorMsg.includes("xml")) {
        setError(
          "File DOCX không hợp lệ hoặc bị hỏng. Vui lòng tải lên file khác."
        );
      } else {
        setError(`Lỗi: ${errorMsg}`);
      }

      setLoading(false);
    }
  }, [url, isCloudinary, processedUrl]);

  useEffect(() => {
    fetchAndRender();
  }, [url, retryCount, fetchAndRender]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // Toolbar - matches PdfViewer styling
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

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
          <p className="text-sm text-muted-foreground">Đang tải DOCX...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RotateCw className="h-4 w-4 mr-2" />
            Thử lại
          </Button>
        </div>
      )}

      {/* DOCX Content */}
      {!loading && !error && (
        <div className="flex-1 overflow-auto p-6">
          <div
            ref={containerRef}
            className="docx-viewer prose prose-sm max-w-none dark:prose-invert"
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          />
        </div>
      )}
    </Card>
  );
};
