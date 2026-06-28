// src/components/document-viewer/PdfViewer.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Loader2,
  Download,
  ExternalLink,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Hand,
  MousePointer2,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { API_BASE } from "@/lib/api";
import { tokenStore } from "@/lib/api";

interface PdfViewerProps {
  url: string;
  fileName?: string;
  className?: string;
  documentId?: string; // UUID
}

/**
 * PdfViewer — hiển thị PDF bằng cách sử dụng backend download API để lấy signed URL
 *
 * Quy trình:
 * 1. Gọi backend download API (có Bearer token) để lấy signed URL
 * 2. Nếu thành công, dùng signed URL để hiển thị PDF qua <embed>
 * 3. Nếu thất bại, fallback về URL gốc (có thể vẫn hoạt động nếu không private)
 * 4. Hiển thị lỗi và nút tải xuống nếu mọi thứ đều thất bại
 */
export const PdfViewer: React.FC<PdfViewerProps> = ({
                                                      url,
                                                      fileName = "document.pdf",
                                                      className,
                                                      documentId,
                                                    }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [renderError, setRenderError] = useState(false);
  const renderTaskRef = React.useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isPanMode, setIsPanMode] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  // Load PDF.js library dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    const loadPdf = async () => {
      setLoading(true);
      setError(null);
      setPdfUrl(null);
      setRenderError(false);

      try {
        const token = tokenStore.get();
        let blob: Blob | null = null;

        // Step 1: Try backend download API
        if (documentId) {
          console.log("[PdfViewer] Step 1: Backend download API for doc", documentId);
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
              console.log("[PdfViewer] Download OK:", downloadResp.status, ct);

              if (ct.includes("json")) {
                const data = await downloadResp.json();
                const signedUrl = data?.url || data?.data?.url || data?.signedUrl;
                if (signedUrl) {
                  console.log("[PdfViewer] Fetching signed URL...");
                  const pdfResp = await fetch(signedUrl, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                  });
                  if (pdfResp.ok) {
                    const b = await pdfResp.blob();
                    console.log("[PdfViewer] Signed URL blob:", b.type, b.size);
                    if (b.size > 0) blob = b;
                  }
                }
              } else {
                const b = await downloadResp.blob();
                console.log("[PdfViewer] Backend blob:", b.type, b.size);
                if (b.size > 0) blob = b;
              }
            } else {
              console.warn("[PdfViewer] API failed:", downloadResp.status);
            }
          } catch (e) {
            console.warn("[PdfViewer] API error:", e);
          }
        }

        // Step 2: Fetch Cloudinary URL directly
        if (!blob) {
          // Try multiple URL formats for Cloudinary
          const urlsToTry = [url];
          // Cloudinary PDFs need /raw/upload/ not /image/upload/
          if (url.includes("/image/upload/")) {
            urlsToTry.push(url.replace("/image/upload/", "/raw/upload/"));
            urlsToTry.push(url + "?fl_attachment=true");
          }

          for (const tryUrl of urlsToTry) {
            console.log("[PdfViewer] Step 2: Trying URL:", tryUrl.substring(0, 80));
            try {
              const directResp = await fetch(tryUrl, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              });
              if (directResp.ok) {
                const b = await directResp.blob();
                console.log("[PdfViewer] Direct blob:", b.type, b.size, "from:", tryUrl.substring(0, 60));
                if (b.size > 500) {
                  blob = b;
                  break;
                }
              } else {
                console.warn("[PdfViewer] Fetch status:", directResp.status, "for:", tryUrl.substring(0, 60));
              }
            } catch (e) {
              console.warn("[PdfViewer] Fetch error:", e, "for:", tryUrl.substring(0, 60));
            }
          }
        }

        // Step 3: Create object URL from blob
        if (blob && blob.size > 500) {
          objectUrl = URL.createObjectURL(blob);
          setPdfUrl(objectUrl);
          console.log("[PdfViewer] Object URL created, size:", blob.size);
        } else {
          console.error("[PdfViewer] No valid blob, size:", blob?.size);
          throw new Error("Không thể tải PDF");
        }
      } catch (e) {
        console.error("[PdfViewer] Load failed:", e);
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Không thể tải PDF");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (documentId) {
      loadPdf();
    } else {
      // Không có documentId, nhưng vẫn cần fetch và tạo blob URL
      const fetchDirectly = async () => {
        try {
          const token = tokenStore.get();
          const resp = await fetch(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (resp.ok) {
            const blob = await resp.blob();
            if (blob.size > 500) {
              objectUrl = URL.createObjectURL(blob);
              setPdfUrl(objectUrl);
            } else {
              setError("PDF file is invalid (too small)");
            }
          } else {
            setError(`Fetch failed: ${resp.status}`);
          }
        } catch (e) {
          setError(e instanceof Error ? e.message : "Không thể tải PDF");
        } finally {
          setLoading(false);
        }
      };
      fetchDirectly();
    }

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url, documentId]);

  // Render PDF page using canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !(window as any).pdfjsLib) return;

    let cancelled = false;

    const renderPage = async () => {
      try {
        // Cancel previous render
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        setRenderError(false);
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current!;
        if (!canvas) return;

        const context = canvas.getContext("2d")!;
        if (!context) return;

        // Clear canvas first
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Render and track the task
        const renderTask = page.render({ canvasContext: context, viewport });
        renderTaskRef.current = renderTask;

        await renderTask.promise;

        if (cancelled) return;
        renderTaskRef.current = null;
      } catch (e: any) {
        // Ignore "Render cancelled" errors
        if (e?.message?.includes("cancelled")) {
          console.log("[PdfViewer] Render cancelled");
          return;
        }
        console.error("[PdfViewer] Render error:", e);
        if (!cancelled) setRenderError(true);
      }
    };

    renderPage();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, pageNum, scale]);

  // Load PDF document
  useEffect(() => {
    if (!pdfUrl || !(window as any).pdfjsLib) return;

    const pdfjsLib = (window as any).pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

    const loadDocument = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setPageNum(1);
      } catch (e) {
        console.error("[PdfViewer] PDF load error:", e);
        setError("Không thể hiển thị PDF. Vui lòng tải xuống để xem.");
      }
    };

    loadDocument();
  }, [pdfUrl]);

  // Fit to container width on page load / doc load
  useEffect(() => {
    if (!pdfDoc || !containerRef.current) return;
    const fit = async () => {
      const page = await pdfDoc.getPage(pageNum);
      const vp = page.getViewport({ scale: 1 });
      const w = containerRef.current!.clientWidth - 48;
      setScale(Math.min(Math.max((w / vp.width) * 0.95, 0.5), 2.5));
    };
    fit();
  }, [pdfDoc, pageNum]);

  // Ctrl+scroll zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setScale((s) => Math.min(Math.max(s + (e.deltaY > 0 ? -0.15 : 0.15), 0.5), 2.5));
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Pan/drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPanMode || scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setScrollStart({ left: containerRef.current.scrollLeft, top: containerRef.current.scrollTop });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    containerRef.current.scrollLeft = scrollStart.left - dx;
    containerRef.current.scrollTop = scrollStart.top - dy;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Fit to width handler
  const handleFitToWidth = async () => {
    if (!pdfDoc || !containerRef.current) return;
    const page = await pdfDoc.getPage(pageNum);
    const vp = page.getViewport({ scale: 1 });
    const w = containerRef.current.clientWidth - 48;
    setScale(Math.min(Math.max((w / vp.width) * 0.95, 0.5), 2.5));
  };

  // Toolbar — sticky inside PDF card header
  const Toolbar = (
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold truncate max-w-[160px]">{fileName}</span>
          {numPages && <span className="text-[11px] text-muted-foreground whitespace-nowrap">/ {numPages} trang</span>}
        </div>

        <div className="flex items-center gap-0.5 flex-wrap">
          {/* Pan mode toggle */}
          <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPanMode(!isPanMode)}
              title={isPanMode ? "Chế độ kéo" : "Chế độ chọn"}
              className={cn("h-7 w-7 p-0", isPanMode && "bg-accent text-primary")}
          >
            {isPanMode ? <Hand className="h-3.5 w-3.5" /> : <MousePointer2 className="h-3.5 w-3.5" />}
          </Button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Zoom controls */}
          <Button variant="ghost" size="sm" onClick={() => setScale((s) => Math.max(s - 0.15, 0.5))} disabled={scale <= 0.5} className="h-7 w-7 p-0" title="Thu nhỏ">
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <Input
              type="number"
              min={50}
              max={250}
              value={Math.round(scale * 100)}
              onChange={(e) => {
                const v = Math.min(Math.max(Number(e.target.value) || 50, 50), 250);
                setScale(v / 100);
              }}
              className="h-6 w-14 px-1 py-0 text-center text-[11px]"
          />
          <Button variant="ghost" size="sm" onClick={() => setScale((s) => Math.min(s + 0.15, 2.5))} disabled={scale >= 2.5} className="h-7 w-7 p-0" title="Phóng to">
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleFitToWidth} className="h-7 w-7 p-0" title="Vừa khung">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Page navigation */}
          <Button variant="ghost" size="sm" onClick={() => setPageNum((p) => Math.max(1, p - 1))} disabled={pageNum <= 1} className="h-7 w-7 p-0">
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <div className="flex items-center gap-1">
            <Input
                type="number" min={1} max={numPages || 1}
                value={pageNum}
                onChange={(e) => {
                  const num = Math.min(Math.max(parseInt(e.target.value) || 1, 1), numPages || 1);
                  setPageNum(num);
                }}
                className="h-6 w-10 px-1 py-0 text-center text-[11px]"
            />
            <span className="text-[11px] text-muted-foreground">/ {numPages || "—"}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setPageNum((p) => Math.min(numPages || 1, p + 1))} disabled={pageNum >= (numPages || 1)} className="h-7 w-7 p-0">
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Actions */}
          <Button variant="ghost" size="sm" asChild className="h-7 px-1.5 text-[11px]">
            <a href={url} download target="_blank" rel="noopener noreferrer">
              <Download className="h-3.5 w-3.5 mr-1" />
              Tải
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild className="h-7 px-1.5 text-[11px]">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              Mở mới
            </a>
          </Button>
        </div>
      </div>
  );

  // Loading state
  if (loading) {
    return (
        <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
          {Toolbar}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Đang tải PDF...</p>
          </div>
        </Card>
    );
  }

  // Error state
  if (error) {
    return (
        <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
          {Toolbar}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <p className="text-red-500 text-center mb-4">{error}</p>
            <Button variant="outline" size="sm" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </a>
            </Button>
          </div>
        </Card>
    );
  }

  // Main PDF display
  return (
      <Card className={cn("flex flex-col min-h-0", className)}>
        {Toolbar}
        <div
            ref={containerRef}
            className="flex-1 overflow-auto flex flex-col items-start justify-start bg-gradient-to-b from-muted/20 to-muted/40"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? "grabbing" : (isPanMode && scale > 1 ? "grab" : "auto") }}
        >
          <div style={{ padding: "1rem", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", minHeight: "100%", width: "100%" }}>
            {renderError ? (
                <div className="text-center">
                  <p className="text-red-500 mb-3">Lỗi khi hiển thị trang</p>
                  <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPageNum((p) => p)}
                  >
                    <RotateCw className="h-4 w-4 mr-2" />
                    Thử lại
                  </Button>
                </div>
            ) : pdfDoc ? (
                <>
                  <canvas
                      ref={canvasRef}
                      className="border border-border/50 shadow-lg rounded-lg bg-white"
                      style={{ cursor: isPanMode ? "grab" : "auto", maxWidth: "none" }}
                  />
                </>
            ) : (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Đang tải PDF...</p>
                </div>
            )}
          </div>
        </div>
      </Card>
  );
};