// src/components/document-viewer/TextViewer.tsx

import React, { useEffect, useState, useCallback } from "react";
import { Loader2, Download, ExternalLink, RotateCw, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isCloudinaryUrl } from "./cloudinaryUtils";

interface TextViewerProps {
  url: string;
  fileName?: string;
  className?: string;
}

export const TextViewer: React.FC<TextViewerProps> = ({
  url,
  fileName = "document.txt",
  className,
}) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isCloudinary = isCloudinaryUrl(url);

  const fetchText = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      setContent(text);
      setLoading(false);
    } catch (e) {
      console.error("Text fetch error:", e);
      const errorMsg = e instanceof Error ? e.message : "Unknown error";

      if (isCloudinary) {
        setError(
          "Không thể tải file text từ Cloudinary do CORS. Vui lòng tải xuống để xem."
        );
      } else {
        setError(`Không thể tải file: ${errorMsg}`);
      }
      setLoading(false);
    }
  }, [url, isCloudinary]);

  useEffect(() => {
    fetchText();
  }, [url, retryCount, fetchText]);

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
          <p className="text-sm text-muted-foreground">Đang tải file text...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-red-500 text-center mb-3 text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RotateCw className="h-4 w-4 mr-2" />
            Thử lại
          </Button>
          <div className="mt-3 text-sm text-muted-foreground">
            Hoặc tải xuống để xem
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !content && (
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-muted-foreground text-sm">File trống</p>
        </div>
      )}

      {/* Text Content */}
      {!loading && !error && content && (
        <div className="flex-1 overflow-auto p-6">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground break-words">
            {content}
          </pre>
        </div>
      )}
    </Card>
  );
};
