// src/components/document-viewer/PdfViewer.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
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

// Configure PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

interface PdfViewerProps {
  url: string;
  fileName?: string;
  className?: string;
  documentId?: number;
}

/**
 * PdfViewer — Direct pdfjs-dist canvas renderer
 * More reliable than react-pdf, full control over rendering
 */
export const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  fileName = "document.pdf",
  className,
  documentId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [fitToPage, setFitToPage] = useState(true);

  // Fetch PDF binary data manually (bypass pdfjs network layer)
  useEffect(() => {
    let cancelled = false;

    const loadPdfData = async () => {
      setLoading(true);
      setError(null);

      // Helper: fetch URL as ArrayBuffer
      const fetchBuffer = async (fetchUrl: string, authToken?: string) => {
        const res = await fetch(fetchUrl, {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = await res.arrayBuffer();
        if (!buf || buf.byteLength === 0) throw new Error("Empty response");
        return buf;
      };

      try {
        const token = tokenStore.get();
        let arrayBuffer: ArrayBuffer | null = null;

        // Try 1: backend download API
        if (documentId) {
          try {
            const downloadResp = await fetch(
              `${API_BASE}/api/documents/${documentId}/download`,
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (downloadResp.ok) {
              const ct = downloadResp.headers.get("content-type") || "";
              if (ct.includes("json")) {
                const data = await downloadResp.json();
                const signedUrl = data?.url || data?.data?.url || data?.signedUrl;
                if (signedUrl) {
                  try {
                    arrayBuffer = await fetchBuffer(signedUrl, token);
                  } catch {
                    // signed URL failed, try direct
                    throw new Error("signed URL failed");
                  }
                } else throw new Error("No URL in response");
              } else {
                arrayBuffer = await downloadResp.arrayBuffer();
                if (!arrayBuffer || arrayBuffer.byteLength === 0) throw new Error("Empty response");
              }
            } else throw new Error(`API ${downloadResp.status}`);
          } catch (e) {
            console.warn("[PdfViewer] Backend API failed, trying direct URL:", e);
            // Try 2: fetch original URL directly
            try {
              arrayBuffer = await fetchBuffer(url);
            } catch (e2) {
              console.warn("[PdfViewer] Direct fetch also failed:", e2);
              // Try 3: use iframe as last resort
              if (!cancelled) setError("Không thể tải PDF. Mở tab mới để xem.");
              return;
            }
          }
        } else {
          // No documentId, fetch directly
          try {
            arrayBuffer = await fetchBuffer(url);
          } catch {
            if (!cancelled) setError("Không thể tải PDF.");
            return;
          }
        }

        if (!cancelled && arrayBuffer) {
          setPdfData(new Uint8Array(arrayBuffer));
        }
      } catch (e: any) {
        console.error("[PdfViewer] Fetch failed:", e);
        if (!cancelled) setError(e.message || "Không thể tải PDF");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPdfData();

    return () => { cancelled = true; };
  }, [url, documentId]);

  // Load PDF document from binary data
  useEffect(() => {
    let cancelled = false;

    const loadDocument = async () => {
      if (!pdfData) return;
      setLoading(true);
      setError(null);

      try {
        const doc = await pdfjsLib.getDocument({ data: pdfData }).promise;
        if (!cancelled) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setPageNumber(1);
        }
      } catch (e: any) {
        console.error("[PdfViewer] Document load error:", e);
        if (!cancelled) setError(e.message || "Không thể tải PDF");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDocument();

    return () => { cancelled = true; };
  }, [pdfData]);

  // Render current page on canvas
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    try {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      canvas.width = viewport.width * (window.devicePixelRatio || 1);
      canvas.height = viewport.height * (window.devicePixelRatio || 1);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      await page.render({
        canvasContext: ctx,
        viewport,
      }).promise;
    } catch (e: any) {
      console.error("[PdfViewer] Page render error:", e);
    }
  }, [pdfDoc, pageNumber, scale]);

  // Re-render when page or scale changes
  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Handle zoom
  const handleZoom = (direction: "in" | "out" | "fit") => {
    if (direction === "fit") {
      setFitToPage((prev) => !prev);
    } else if (direction === "in") {
      setScale((prev) => Math.min(prev + 0.25, 3));
      setFitToPage(false);
    } else {
      setScale((prev) => Math.max(prev - 0.25, 0.25));
      setFitToPage(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!numPages) return;
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setPageNumber((p) => Math.max(1, p - 1));
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        setPageNumber((p) => Math.min(numPages, p + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numPages]);

  // Toolbar
  const Toolbar = (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-sm font-semibold text-gray-800 truncate max-w-[250px]">
          {fileName}
        </span>
        {numPages && (
          <span className="text-xs text-gray-500">{numPages} trang</span>
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
              disabled={scale <= 0.25}
              title="Thu nhỏ"
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
              disabled={scale >= 3}
              title="Phóng to"
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom("fit")}
              title="Vừa khung"
              className={cn("h-8 w-8 p-0", !fitToPage && "bg-gray-100")}
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
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              title="Trang trước"
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min={1}
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
              onClick={() =>
                setPageNumber((p) => Math.min(numPages, p + 1))
              }
              disabled={pageNumber >= numPages}
              title="Trang sau"
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-xs">
          <a href={url} download target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-1" />
            Tải xuống
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-xs">
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

  // Main render
  return (
    <Card className={cn("flex flex-col overflow-hidden min-h-0 bg-white", className)}>
      {Toolbar}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center py-6"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-3" />
            <p className="text-sm text-gray-600">Đang tải PDF...</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-sm">
            <canvas ref={canvasRef} className="block" />
          </div>
        )}
      </div>
    </Card>
  );
};
