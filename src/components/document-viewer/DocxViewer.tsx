// src/components/document-viewer/DocxViewer.tsx
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
// Renders DOCX files using mammoth.js (converts to clean HTML)

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, RotateCw, Download, ExternalLink } from "lucide-react";
import * as mammoth from "mammoth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, RotateCw, Download, ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // Process Cloudinary URL if needed
=======
  // Process URL on mount and when URL changes
>>>>>>> origin/test/share-document-cloudinary
=======
  // Process URL on mount and when URL changes
>>>>>>> origin/uichange
=======
  // Process Cloudinary URL if needed
>>>>>>> origin/admin-added
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    } else {
      setProcessedUrl(null);
      setLoading(false);
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
    } else {
      setProcessedUrl(null);
      setLoading(false);
>>>>>>> origin/admin-added
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
    let isMounted = true;

    try {
      setLoading(true);
      setError(null);

<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
    try {
      setLoading(true);
      setError(null);
      containerRef.current.innerHTML = "";

      // Use processedUrl (blob) for Cloudinary, original URL for others
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added

      if (!isMounted) return;

      // Convert DOCX to HTML using mammoth
      const result = await mammoth.convertArrayBuffer({
        arrayBuffer,
        options: {
          styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='Normal'] => p:fresh",
            "p[style-name='List Paragraph'] => p:fresh",
          ],
          includeEmbeddedStyleMap: true,
        },
      });

      if (!isMounted || !containerRef.current) return;

      // Insert HTML into container
      containerRef.current.innerHTML = result.value;

      // Log warnings if any
      if (result.messages.length > 0) {
        console.warn("DOCX conversion warnings:", result.messages);
      }

      setLoading(false);
    } catch (e) {
      if (!isMounted) return;

<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
      const { renderAsync } = await import("docx-preview");

      await renderAsync(arrayBuffer, containerRef.current, {
        renderImages: true,
      });

      setLoading(false);
    } catch (e) {
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added

    return () => {
      isMounted = false;
    };
<<<<<<< HEAD
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
  }, [url, isCloudinary, processedUrl]);

  useEffect(() => {
    fetchAndRender();
  }, [url, retryCount, fetchAndRender]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
  // Toolbar
  const Toolbar = (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 shrink-0">
      <span className="text-sm font-medium truncate max-w-[200px]">
        {fileName}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <a href={url} download target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-1" />
            Tải xuống
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
=======
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> Mở mới
>>>>>>> origin/test/share-document-cloudinary
=======
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> Mở mới
>>>>>>> origin/uichange
=======
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
>>>>>>> origin/admin-added
          </a>
        </Button>
      </div>
    </div>
  );

  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
=======
    <Card className={cn("flex flex-col min-h-0", className)}>
>>>>>>> origin/test/share-document-cloudinary
=======
    <Card className={cn("flex flex-col min-h-0", className)}>
>>>>>>> origin/uichange
=======
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
>>>>>>> origin/admin-added
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            className="prose prose-sm max-w-none dark:prose-invert prose-img:max-w-full prose-img:h-auto"
=======
            className="docx-viewer prose prose-sm max-w-none dark:prose-invert"
>>>>>>> origin/test/share-document-cloudinary
=======
            className="docx-viewer prose prose-sm max-w-none dark:prose-invert"
>>>>>>> origin/uichange
=======
            className="prose prose-sm max-w-none dark:prose-invert prose-img:max-w-full prose-img:h-auto"
>>>>>>> origin/admin-added
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
