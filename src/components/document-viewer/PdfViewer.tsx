// src/components/document-viewer/PdfViewer.tsx
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Enhanced PDF viewer with drag-to-pan, smooth zoom, scroll-based navigation
=======
>>>>>>> origin/AI-Study-fix

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
=======

import React, { useState, useEffect, useRef, useCallback } from "react";
>>>>>>> origin/test/share-document-cloudinary
=======

import React, { useState, useEffect, useRef, useCallback } from "react";
>>>>>>> origin/uichange
=======
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
// Enhanced PDF viewer with drag-to-pan, smooth zoom, scroll-based navigation

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
import {
  Loader2,
  Download,
  ExternalLink,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  Hand,
  MousePointer2,
  Search,
  MoveRight,
  FileText,
  Sun,
  Moon,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Hand,
  MousePointer2,
  FileText,
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { API_BASE, tokenStore } from "@/lib/api";

=======
import { API_BASE } from "@/lib/api";
import { tokenStore } from "@/lib/api";

// Configure PDF worker
>>>>>>> origin/AI-Study-fix
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

=======
import { API_BASE } from "@/lib/api";
import { tokenStore } from "@/lib/api";

>>>>>>> origin/test/share-document-cloudinary
=======
import { API_BASE } from "@/lib/api";
import { tokenStore } from "@/lib/api";

>>>>>>> origin/uichange
=======
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
import { API_BASE, tokenStore } from "@/lib/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
interface PdfViewerProps {
  url: string;
  fileName?: string;
  className?: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  documentId?: number;
}

=======
  documentId?: string;
}

/**
 * PdfViewer — Direct pdfjs-dist canvas renderer
 * More reliable than react-pdf, full control over rendering
 */
>>>>>>> origin/AI-Study-fix
=======
  documentId?: number;
}

>>>>>>> origin/admin-added
=======
  documentId?: number;
}

>>>>>>> origin/update/feature/share
=======
  documentId?: number;
}

>>>>>>> origin/update/feature/AI/Quiz
=======
  documentId?: number;
}

>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });
  const [isPanMode, setIsPanMode] = useState(true);
  const [showThumbs, setShowThumbs] = useState(false);

  // Fetch PDF binary data
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [fitToPage, setFitToPage] = useState(true);

  // Fetch PDF binary data manually (bypass pdfjs network layer)
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  useEffect(() => {
    let cancelled = false;

    const loadPdfData = async () => {
      setLoading(true);
      setError(null);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      // Helper: fetch URL as ArrayBuffer
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Try 1: backend download API
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
        if (documentId) {
          try {
            const downloadResp = await fetch(
              `${API_BASE}/api/documents/${documentId}/download`,
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
            );

            if (downloadResp.ok) {
              const ct = downloadResp.headers.get("content-type") || "";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
              console.log("[PdfViewer] Download OK:", downloadResp.status, ct);

>>>>>>> origin/test/share-document-cloudinary
=======
              console.log("[PdfViewer] Download OK:", downloadResp.status, ct);

>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
              if (ct.includes("json")) {
                const data = await downloadResp.json();
                const signedUrl = data?.url || data?.data?.url || data?.signedUrl;
                if (signedUrl) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  try { arrayBuffer = await fetchBuffer(signedUrl, token); } catch { throw new Error("signed URL failed"); }
=======
                  try {
                    arrayBuffer = await fetchBuffer(signedUrl, token || undefined);
                  } catch {
                    // signed URL failed, try direct
                    throw new Error("signed URL failed");
                  }
>>>>>>> origin/AI-Study-fix
=======
                  try { arrayBuffer = await fetchBuffer(signedUrl, token); } catch { throw new Error("signed URL failed"); }
>>>>>>> origin/admin-added
=======
                  try { arrayBuffer = await fetchBuffer(signedUrl, token); } catch { throw new Error("signed URL failed"); }
>>>>>>> origin/update/feature/share
=======
                  try { arrayBuffer = await fetchBuffer(signedUrl, token); } catch { throw new Error("signed URL failed"); }
>>>>>>> origin/update/feature/AI/Quiz
=======
                  try { arrayBuffer = await fetchBuffer(signedUrl, token); } catch { throw new Error("signed URL failed"); }
>>>>>>> origin/Flashcards-fix
                } else throw new Error("No URL in response");
              } else {
                arrayBuffer = await downloadResp.arrayBuffer();
                if (!arrayBuffer || arrayBuffer.byteLength === 0) throw new Error("Empty response");
              }
            } else throw new Error(`API ${downloadResp.status}`);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
          } catch {
            try { arrayBuffer = await fetchBuffer(url); } catch { if (!cancelled) setError("Không thể tải PDF. Mở tab mới để xem."); return; }
          }
        } else {
          try { arrayBuffer = await fetchBuffer(url); } catch { if (!cancelled) setError("Không thể tải PDF."); return; }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
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
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
        }

        if (!cancelled && arrayBuffer) {
          setPdfData(new Uint8Array(arrayBuffer));
        }
      } catch (e: any) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.error("[PdfViewer] Fetch failed:", e);
>>>>>>> origin/AI-Study-fix
        if (!cancelled) setError(e.message || "Không thể tải PDF");
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
        if (!cancelled) setError(e.message || "Không thể tải PDF");
>>>>>>> origin/admin-added
=======
        if (!cancelled) setError(e.message || "Không thể tải PDF");
>>>>>>> origin/update/feature/share
=======
        if (!cancelled) setError(e.message || "Không thể tải PDF");
>>>>>>> origin/update/feature/AI/Quiz
=======
        if (!cancelled) setError(e.message || "Không thể tải PDF");
>>>>>>> origin/Flashcards-fix
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    loadPdfData();
<<<<<<< HEAD
=======
    loadPdfData();
>>>>>>> origin/admin-added
=======
    loadPdfData();
>>>>>>> origin/update/feature/share
=======
    loadPdfData();
>>>>>>> origin/update/feature/AI/Quiz
=======
    loadPdfData();
>>>>>>> origin/Flashcards-fix
    return () => { cancelled = true; };
  }, [url, documentId]);

  // Load PDF document
  useEffect(() => {
    let cancelled = false;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

    return () => { cancelled = true; };
  }, [url, documentId]);

  // Load PDF document from binary data
  useEffect(() => {
    let cancelled = false;

>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
    const loadDocument = async () => {
      if (!pdfData) return;
      setLoading(true);
      setError(null);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
      try {
        const doc = await pdfjsLib.getDocument({ data: pdfData }).promise;
        if (!cancelled) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setPageNumber(1);
        }
      } catch (e: any) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.error("[PdfViewer] Document load error:", e);
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
        if (!cancelled) setError(e.message || "Không thể tải PDF");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
    loadDocument();
    return () => { cancelled = true; };
  }, [pdfData]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

    loadDocument();

    return () => { cancelled = true; };
  }, [pdfData]);

  // Render current page on canvas
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    try {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      canvas.width = viewport.width * (window.devicePixelRatio || 1);
      canvas.height = viewport.height * (window.devicePixelRatio || 1);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      await page.render({
        canvasContext: ctx,
        viewport,
      }).promise;
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
    } catch (e: any) {
      console.error("[PdfViewer] Page render error:", e);
    }
  }, [pdfDoc, pageNumber, scale]);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
    setDragStart({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setScrollStart({ left: containerRef.current.scrollLeft, top: containerRef.current.scrollTop });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    if (!dragging || !containerRef.current) return;
=======
    if (!isDragging || !containerRef.current) return;
>>>>>>> origin/test/share-document-cloudinary
=======
    if (!isDragging || !containerRef.current) return;
>>>>>>> origin/uichange
=======
    if (!dragging || !containerRef.current) return;
>>>>>>> origin/admin-added
=======
    if (!dragging || !containerRef.current) return;
>>>>>>> origin/update/feature/share
=======
    if (!dragging || !containerRef.current) return;
>>>>>>> origin/update/feature/AI/Quiz
=======
    if (!dragging || !containerRef.current) return;
>>>>>>> origin/Flashcards-fix
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    containerRef.current.scrollLeft = scrollStart.left - dx;
    containerRef.current.scrollTop = scrollStart.top - dy;
  };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const handleMouseUp = () => setDragging(false);

=======
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

>>>>>>> origin/AI-Study-fix
=======
  const handleMouseUp = () => setDragging(false);

>>>>>>> origin/admin-added
=======
  const handleMouseUp = () => setDragging(false);

>>>>>>> origin/update/feature/share
=======
  const handleMouseUp = () => setDragging(false);

>>>>>>> origin/update/feature/AI/Quiz
=======
  const handleMouseUp = () => setDragging(false);

>>>>>>> origin/Flashcards-fix
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!numPages) return;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
      if ((e.key === "ArrowLeft" || e.key === "PageUp") && !e.ctrlKey && !e.metaKey) {
        setPageNumber((p) => Math.max(1, p - 1));
      } else if ((e.key === "ArrowRight" || e.key === "PageDown") && !e.ctrlKey && !e.metaKey) {
        setPageNumber((p) => Math.min(numPages, p + 1));
      } else if (e.key === "Home") {
        setPageNumber(1);
      } else if (e.key === "End") {
        setPageNumber(numPages);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setPageNumber((p) => Math.max(1, p - 1));
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        setPageNumber((p) => Math.min(numPages, p + 1));
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numPages]);

  // Toolbar
  const Toolbar = (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
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
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          <Button variant="outline" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" /> Tải xuống tệp
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          <Button variant="outline" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" />
              Tải xuống tệp
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
            </a>
          </Button>
        </div>
      </Card>
    );
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
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
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
          </div>
        )}
      </div>
    </Card>
  );
};
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
};
>>>>>>> origin/test/share-document-cloudinary
=======
};
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
