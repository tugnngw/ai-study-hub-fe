// src/components/document-viewer/PdfViewer.tsx

import React, { useState, useEffect } from "react";
import { Loader2, Download, ExternalLink, RotateCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { API_BASE } from "@/lib/api";
import { tokenStore } from "@/lib/api";

interface PdfViewerProps {
  url: string;
  fileName?: string;
  className?: string;
  documentId?: number;
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

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    const loadPdf = async () => {
      setLoading(true);
      setError(null);
      setPdfUrl(null);

      try {
        const token = tokenStore.get();

        // Step 1: Gọi backend download API
        const downloadResp = await fetch(
          `${API_BASE}/api/documents/${documentId}/download`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!downloadResp.ok) {
          throw new Error(`Backend download API: ${downloadResp.status}`);
        }

        // Step 2: Xác định response type
        const contentType = downloadResp.headers.get("content-type") || "";

        if (contentType.includes("json")) {
          // Case 1: Backend trả JSON { url: "signed-..." }
          const data = await downloadResp.json();
          const signedUrl =
            data?.url ||
            data?.data?.url ||
            data?.signedUrl;

          if (signedUrl) {
            // Fetch signed URL với auth header
            const pdfResp = await fetch(signedUrl, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!pdfResp.ok) throw new Error(`PDF fetch: ${pdfResp.status}`);

            const blob = await pdfResp.blob();
            if (cancelled) return;

            objectUrl = URL.createObjectURL(blob);
            setPdfUrl(objectUrl);
          } else {
            throw new Error("No URL in download response");
          }
        } else {
          // Case 2: Backend trả file trực tiếp (proxy)
          const blob = await downloadResp.blob();
          if (cancelled) return;

          objectUrl = URL.createObjectURL(blob);
          setPdfUrl(objectUrl);
        }
      } catch (e) {
        console.error("[PdfViewer] Load failed:", e);

        // Step 3: Fallback — fetch Cloudinary URL trực tiếp qua backend proxy
        if (!cancelled) {
          try {
            const token = tokenStore.get();
            // Thử fetch PDF qua backend với URL gốc, backend sẽ proxy
            const proxyResp = await fetch(
              `${API_BASE}/api/documents/${documentId}/download`,
              {
                headers: { Authorization: `Bearer ${token}` },
                // Không set Accept, để backend quyết định response type
              }
            );

            if (proxyResp.ok) {
              const blob = await proxyResp.blob();
              if (cancelled) return;
              objectUrl = URL.createObjectURL(blob);
              setPdfUrl(objectUrl);
            } else {
              // Fallback cuối: dùng URL gốc (embed sẽ tự load)
              setPdfUrl(url);
            }
          } catch {
            setPdfUrl(url);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (documentId) {
      loadPdf();
    } else {
      // Không có documentId, dùng URL gốc
      setPdfUrl(url);
      setLoading(false);
    }

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url, documentId]);

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
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
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

  // Error state - khi không thể tải PDF dù đã có URL
  if (error && !pdfUrl) {
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
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
      {Toolbar}
      {/* Hiển thị PDF qua <embed> - hoạt động tốt với maioria các PDF URL */}
      <embed
        src={pdfUrl || url}
        type="application/pdf"
        className="w-full"
        style={{ height: "calc(100vh - 320px)", minHeight: "500px" }}
        // Thêm thuộc tính để cải thiện trải nghiệm
        title={fileName}
        role="document"
      />
    </Card>
  );
};
