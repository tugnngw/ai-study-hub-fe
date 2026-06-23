// src/components/document-viewer/PdfViewer.tsx

import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import * as pdfjsLib from "pdfjs-dist";
import {
  Loader2,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { API_BASE } from "@/lib/api";
import { tokenStore } from "@/lib/api";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF worker to use local file from public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

interface PdfViewerProps {
  url: string;
  fileName?: string;
  className?: string;
  documentId?: number;
}

/**
 * PdfViewer — Modern PDF viewer similar to mindgrasp.ai
 *
 * Features:
 * - Zoom in/out controls
 * - Page navigation (previous/next, jump to page)
 * - Fit-to-page option
 * - Download and open in new tab
 * - Clean, modern UI
 */
export const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  fileName = "document.pdf",
  className,
  documentId,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>(url);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [fitToPage, setFitToPage] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    const loadPdf = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = tokenStore.get();

        // Try fetch PDF via backend download API
        const downloadResp = await fetch(
          `${API_BASE}/api/documents/${documentId}/download`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (downloadResp.ok) {
          const contentType = downloadResp.headers.get("content-type") || "";

          if (contentType.includes("json")) {
            // Backend returns JSON with URL
            const data = await downloadResp.json();
            const signedUrl = data?.url || data?.data?.url || data?.signedUrl;
            if (signedUrl) {
              const pdfResp = await fetch(signedUrl, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              });
              if (!pdfResp.ok) throw new Error("Failed to fetch signed URL");
              const blob = await pdfResp.blob();
              if (!cancelled) {
                objectUrl = URL.createObjectURL(blob);
                setPdfUrl(objectUrl);
              }
            } else {
              throw new Error("No URL in response");
            }
          } else {
            // Backend returns file directly
            const blob = await downloadResp.blob();
            if (!cancelled) {
              objectUrl = URL.createObjectURL(blob);
              setPdfUrl(objectUrl);
            }
          }
        } else {
          throw new Error(`API failed: ${downloadResp.status}`);
        }
      } catch (e) {
        console.warn("[PdfViewer] Backend API failed, using original URL:", e);
        if (!cancelled) {
          setPdfUrl(url);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (documentId) {
      loadPdf();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url, documentId]);

  const onDocumentLoadSuccess = ({ numPages: num }: { numPages: number }) => {
    setNumPages(num);
    setPageNumber(1);
  };

  const onDocumentLoadError = (err: Error) => {
    console.error("[PdfViewer] PDF load error:", err);
    setError(err.message || "Không thể tải PDF");
  };

  const handleZoom = (direction: "in" | "out" | "fit") => {
    if (direction === "fit") {
      setFitToPage(!fitToPage);
      setScale(1);
    } else if (direction === "in") {
      setScale((prev) => Math.min(prev + 0.25, 2));
      setFitToPage(false);
    } else {
      setScale((prev) => Math.max(prev - 0.25, 0.5));
      setFitToPage(false);
    }
  };

  const pageWidth = fitToPage
    ? Math.min(window.innerWidth - 80, 900)
    : Math.min(window.innerWidth - 80, 900) * scale;

  // Enhanced Toolbar
  const Toolbar = (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-sm font-semibold text-gray-800 truncate max-w-[250px]">
          {fileName}
        </span>
        {numPages && (
          <span className="text-xs text-gray-500">
            {numPages} trang
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Zoom Controls */}
        {numPages && (
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom("out")}
              disabled={scale <= 0.5}
              title="Zoom out"
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-gray-600 w-8 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom("in")}
              disabled={scale >= 2}
              title="Zoom in"
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom("fit")}
              title={fitToPage ? "Fit to width" : "Fit to page"}
              className={cn("h-8 w-8 p-0", fitToPage && "bg-gray-100")}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Page Navigation */}
        {numPages && (
          <div className="flex items-center gap-1 border-r border-gray-200 px-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
              title="Previous page"
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              max={numPages}
              value={pageNumber}
              onChange={(e) => {
                const num = Math.min(
                  Math.max(1, parseInt(e.target.value) || 1),
                  numPages
                );
                setPageNumber(num);
              }}
              className="h-8 w-10 px-2 py-0 text-center text-xs border-gray-300"
            />
            <span className="text-xs text-gray-600">/ {numPages}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
              title="Next page"
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8 px-2 text-xs"
        >
          <a href={url} download target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-1" />
            Tải xuống
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8 px-2 text-xs"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở mới
          </a>
        </Button>
      </div>
    </div>
  );

  // Error state
  if (error) {
    return (
      <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
        {Toolbar}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          <Button variant="outline" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" />
              Tải xuống tệp
            </a>
          </Button>
        </div>
      </Card>
    );
  }

  // Main PDF display with react-pdf
  return (
    <Card className={cn("flex flex-col overflow-hidden min-h-0 bg-white", className)}>
      {Toolbar}
      <div className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center py-6">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-3" />
              <p className="text-sm text-gray-600">Đang tải PDF...</p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center p-12">
              <p className="text-red-500 text-center mb-4 font-medium">
                Không thể tải PDF
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống tệp
                </a>
              </Button>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            renderAnnotationLayer={true}
            renderTextLayer={true}
            scale={scale}
          />
        </Document>
      </div>
    </Card>
  );
};
