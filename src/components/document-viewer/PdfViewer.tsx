// src/components/document-viewer/PdfViewer.tsx

import React, { useState, useEffect, useRef } from "react";
import {
  Loader2,
  Download,
  ExternalLink,
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
  documentId?: string;
}

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
  const [isPanMode, setIsPanMode] = useState(true);
  const renderTaskRef = React.useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledCanvasW, setScaledCanvasW] = useState(0);

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

      try {
        const token = tokenStore.get();
        let blob: Blob | null = null;

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

              if (ct.includes("json") || ct.includes("text")) {
                const text = await downloadResp.text();
                try {
                  const data = JSON.parse(text);
                  const signedUrl = data?.url || data?.data?.url || data?.signedUrl || data?.cloudinaryUrl;
                  if (signedUrl) {
                    const pdfResp = await fetch(signedUrl, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
                    if (pdfResp.ok) {
                      const b = await pdfResp.blob();
                      if (b.size > 0) blob = b;
                    }
                  }
                } catch {
                  const b = new Blob([text], { type: "application/pdf" });
                  if (b.size > 500) blob = b;
                }
              } else {
                const b = await downloadResp.blob();
                if (b.size > 0) blob = b;
              }
            }
          } catch (e) {
            console.warn("[PdfViewer] API error:", e);
          }
        }

        if (!blob) {
          const urlsToTry = [url];
          if (url.includes("/image/upload/")) {
            urlsToTry.push(url.replace("/image/upload/", "/raw/upload/"));
            urlsToTry.push(url + "?fl_attachment=true");
          }

          for (const tryUrl of urlsToTry) {
            try {
              const directResp = await fetch(tryUrl, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              });
              if (directResp.ok) {
                const b = await directResp.blob();
                if (b.size > 500) {
                  blob = b;
                  break;
                }
              }
            } catch (e) {
              console.warn("[PdfViewer] Fetch error:", e);
            }
          }
        }

        if (blob && blob.size > 500) {
          objectUrl = URL.createObjectURL(blob);
          setPdfUrl(objectUrl);
        } else {
          throw new Error("Không thể tải PDF");
        }
      } catch (e) {
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
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        const page = await pdfDoc.getPage(pageNum);
        const vp = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current!;
        if (!canvas) return;

        const context = canvas.getContext("2d")!;
        if (!context) return;

        const hdScale = window.devicePixelRatio || 1;
        const displayW = vp.width;
        const displayH = vp.height;

        canvas.width = displayW * hdScale;
        canvas.height = displayH * hdScale;
        canvas.style.width = `${displayW}px`;
        canvas.style.height = `${displayH}px`;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.scale(hdScale, hdScale);

        const renderTask = page.render({ canvasContext: context, viewport: vp });
        renderTaskRef.current = renderTask;

        await renderTask.promise;

        if (cancelled) return;
        renderTaskRef.current = null;
      } catch (e: any) {
        if (e?.message?.message?.includes("cancelled")) return;
        if (!cancelled) setError("Render error");
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
  }, [pdfDoc, pageNum]);

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
        setError("Không thể hiển thị PDF. Vui lòng tải xuống để xem.");
      }
    };

    loadDocument();
  }, [pdfUrl]);

  // Fit to container width on page load
  useEffect(() => {
    if (!pdfDoc || !containerRef.current) return;
    const fit = async () => {
      const page = await pdfDoc.getPage(pageNum);
      const vp = page.getViewport({ scale: 1 });
      const availableWidth = containerRef.current!.clientWidth;
      const newScale = (availableWidth / vp.width) * 0.95;
      setScale(Math.min(Math.max(newScale, 0.5), 2.5));
    };
    fit();
  }, [pdfDoc]);

  // Track canvas display size for proper overflow
  useEffect(() => {
    if (!pdfDoc) return;
    const updateCanvasSize = async () => {
      const page = await pdfDoc.getPage(pageNum);
      const vp = page.getViewport({ scale });
      setScaledCanvasW(vp.width * scale);
    };
    updateCanvasSize();
  }, [pdfDoc, pageNum, scale]);

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

  // Fit to width handler
  const handleFitToWidth = async () => {
    if (!pdfDoc || !containerRef.current) return;
    const page = await pdfDoc.getPage(pageNum);
    const vp = page.getViewport({ scale: 1 });
    const availableWidth = containerRef.current.clientWidth;
    const newScale = (availableWidth / vp.width) * 0.95;
    setScale(Math.min(Math.max(newScale, 0.5), 2.5));
  };

  // Toolbar
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
            const v = Math.min(Math.max(Number(e.target.value) || 100, 50), 250);
            setScale(v / 100);
          }}
          className="h-6 w-12 px-1 py-0 text-center text-[11px]"
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
        <Input
          type="number"
          min={1} max={numPages || 1}
          value={pageNum}
          onChange={(e) => {
            const num = Math.min(Math.max(parseInt(e.target.value) || 1, 1), numPages || 1);
            setPageNum(num);
          }}
          className="h-6 w-10 px-1 py-0 text-center text-[11px]"
        />
        <span className="text-[11px] text-muted-foreground">/ {numPages || "—"}</span>
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
      <Card className={cn("flex flex-col min-h-0", className)} style={{ minHeight: "400px" }}>
        {Toolbar}
        <div className="flex-1 flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
          <p className="text-sm text-muted-foreground">Đang tải PDF...</p>
        </div>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className={cn("flex flex-col min-h-0", className)} style={{ minHeight: "400px" }}>
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
    <Card className={cn("flex flex-col min-h-0", className)} style={{ minHeight: "400px" }}>
      {Toolbar}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center bg-muted/20"
        style={{ minHeight: "400px" }}
      >
        {pdfDoc ? (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <canvas
              ref={canvasRef}
              className="border border-border/50 shadow-lg bg-white"
              style={{ display: "block" }}
            />
          </div>
        ) : !loading && !error ? (
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">Đang chuẩn bị...</p>
          </div>
        ) : null}
      </div>
    </Card>
  );
};