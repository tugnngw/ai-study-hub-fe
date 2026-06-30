// src/components/document-viewer/PdfViewer.tsx
// Enhanced PDF viewer with drag-to-pan, smooth zoom, scroll-based navigation

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
  Hand,
  MousePointer2,
  Search,
  MoveRight,
  FileText,
  Sun,
  Moon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { API_BASE, tokenStore } from "@/lib/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

interface PdfViewerProps {
  url: string;
  fileName?: string;
  className?: string;
  documentId?: number;
}

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
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });
  const [isPanMode, setIsPanMode] = useState(true);
  const [showThumbs, setShowThumbs] = useState(false);

  // Fetch PDF binary data
  useEffect(() => {
    let cancelled = false;

    const loadPdfData = async () => {
      setLoading(true);
      setError(null);

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
                  try { arrayBuffer = await fetchBuffer(signedUrl, token); } catch { throw new Error("signed URL failed"); }
                } else throw new Error("No URL in response");
              } else {
                arrayBuffer = await downloadResp.arrayBuffer();
                if (!arrayBuffer || arrayBuffer.byteLength === 0) throw new Error("Empty response");
              }
            } else throw new Error(`API ${downloadResp.status}`);
          } catch {
            try { arrayBuffer = await fetchBuffer(url); } catch { if (!cancelled) setError("Không thể tải PDF. Mở tab mới để xem."); return; }
          }
        } else {
          try { arrayBuffer = await fetchBuffer(url); } catch { if (!cancelled) setError("Không thể tải PDF."); return; }
        }

        if (!cancelled && arrayBuffer) {
          setPdfData(new Uint8Array(arrayBuffer));
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Không thể tải PDF");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPdfData();
    return () => { cancelled = true; };
  }, [url, documentId]);

  // Load PDF document
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
        if (!cancelled) setError(e.message || "Không thể tải PDF");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadDocument();
    return () => { cancelled = true; };
  }, [pdfData]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    try {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
    } catch (e: any) {
      console.error("[PdfViewer] Page render error:", e);
    }
  }, [pdfDoc, pageNumber, scale]);

  useEffect(() => { renderPage(); }, [renderPage]);

  // Fit to container width
  useEffect(() => {
    if (!pdfDoc || !containerRef.current) return;
    // Auto-fit on page load
    const containerWidth = containerRef.current.clientWidth - 64; // padding
    const baseWidth = pdfDoc.getPage(pageNumber).then((page) => {
      const vp = page.getViewport({ scale: 1 });
      const fitScale = (containerWidth / vp.width) * 0.95;
      setScale(Math.min(Math.max(fitScale, 0.25), 3));
    });
  }, [pdfDoc, pageNumber]);

  // Zoom
  const handleZoom = (direction: "in" | "out" | "fit") => {
    if (direction === "fit") {
      handleFitToWidth();
    } else if (direction === "in") {
      setScale((prev) => Math.min(prev + 0.25, 3));
    } else {
      setScale((prev) => Math.max(prev - 0.25, 0.25));
    }
  };

  const handleFitToWidth = async () => {
    if (!pdfDoc || !containerRef.current) return;
    const page = await pdfDoc.getPage(pageNumber);
    const vp = page.getViewport({ scale: 1 });
    const containerWidth = containerRef.current.clientWidth - 64;
    setScale(Math.min(Math.max(containerWidth / vp.width * 0.95, 0.25), 3));
  };

  // Scroll-based zoom (Ctrl+scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale((prev) => Math.min(Math.max(prev + delta, 0.25), 3));
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPanMode) return;
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setScrollStart({ left: containerRef.current.scrollLeft, top: containerRef.current.scrollTop });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    containerRef.current.scrollLeft = scrollStart.left - dx;
    containerRef.current.scrollTop = scrollStart.top - dy;
  };

  const handleMouseUp = () => setDragging(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!numPages) return;
      if ((e.key === "ArrowLeft" || e.key === "PageUp") && !e.ctrlKey && !e.metaKey) {
        setPageNumber((p) => Math.max(1, p - 1));
      } else if ((e.key === "ArrowRight" || e.key === "PageDown") && !e.ctrlKey && !e.metaKey) {
        setPageNumber((p) => Math.min(numPages, p + 1));
      } else if (e.key === "Home") {
        setPageNumber(1);
      } else if (e.key === "End") {
        setPageNumber(numPages);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numPages]);

  // Toolbar
  const Toolbar = (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 shrink-0 flex-wrap gap-1">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm font-semibold truncate max-w-[200px]">{fileName}</span>
        {numPages && <span className="text-xs text-muted-foreground">{numPages} trang</span>}
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {/* Pan mode toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPanMode(!isPanMode)}
          title={isPanMode ? "Chuyển sang chế độ chọn" : "Chuyển sang chế độ kéo"}
          className={cn("h-8 w-8 p-0", isPanMode && "bg-accent text-primary")}
        >
          {isPanMode ? <Hand className="h-4 w-4" /> : <MousePointer2 className="h-4 w-4" />}
        </Button>

        <div className="h-5 w-px bg-border mx-1" />

        {/* Zoom */}
        <Button variant="ghost" size="sm" onClick={() => handleZoom("out")} disabled={scale <= 0.25} className="h-8 w-8 p-0" title="Thu nhỏ">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min={25}
          max={300}
          value={Math.round(scale * 100)}
          onChange={(e) => {
            const v = Math.min(Math.max(Number(e.target.value) || 25, 25), 300);
            setScale(v / 100);
          }}
          className="h-7 w-14 px-1 py-0 text-center text-xs"
        />
        <Button variant="ghost" size="sm" onClick={() => handleZoom("in")} disabled={scale >= 3} className="h-8 w-8 p-0" title="Phóng to">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleZoom("fit")} className="h-8 w-8 p-0" title="Vừa khung">
          <Maximize2 className="h-4 w-4" />
        </Button>

        <div className="h-5 w-px bg-border mx-1" />

        {/* Page Nav */}
        <Button variant="ghost" size="sm" onClick={() => setPageNumber((p) => Math.max(1, p - 1))} disabled={pageNumber <= 1} className="h-8 w-8 p-0">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          <Input
            type="number" min={1} max={numPages || 1}
            value={pageNumber}
            onChange={(e) => {
              const num = Math.min(Math.max(parseInt(e.target.value) || 1, 1), numPages || 1);
              setPageNumber(num);
            }}
            className="h-7 w-10 px-1 py-0 text-center text-xs"
          />
          <span className="text-xs text-muted-foreground">/ {numPages || "—"}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPageNumber((p) => Math.min(numPages || 1, p + 1))} disabled={pageNumber >= (numPages || 1)} className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="h-5 w-px bg-border mx-1" />

        <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-xs">
          <a href={url} download target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-1" />
            Tải
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
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          <Button variant="outline" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" /> Tải xuống tệp
            </a>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
      {Toolbar}
      <div
        ref={containerRef}
        className={cn(
          "flex-1 overflow-auto bg-muted/40 flex items-start justify-center py-6",
          isPanMode && "cursor-grab",
          dragging && "cursor-grabbing",
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Đang tải PDF...</p>
          </div>
        ) : (
          <div className="relative bg-white shadow-lg rounded-sm">
            <canvas ref={canvasRef} className="block" />
            {/* Page indicator overlay */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
              {pageNumber}/{numPages}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
