import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface ImageViewerProps {
  url: string;
  fileName: string;
  className?: string;
}

/**
 * ImageViewer - Display images (PNG, JPG, GIF, WebP, SVG)
 *
 * Features:
 * - Responsive image display
 * - Zoom in/out controls
 * - Rotate image
 * - Download button
 * - Error handling with fallback
 */
export const ImageViewer: React.FC<ImageViewerProps> = ({
  url,
  fileName,
  className,
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [error, setError] = useState(false);

  console.log('[Debug Flow] ImageViewer: Rendering image:', { url, fileName });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-red-500 font-medium mb-2">Không thể tải ảnh</p>
          <p className="text-sm text-muted-foreground mb-4">
            Ảnh không thể được tải từ URL này
          </p>
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Tải xuống
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`flex flex-col overflow-hidden min-h-0 ${className || ""}`}>
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {fileName}
          </span>
          <span className="text-xs text-muted-foreground">({zoom}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleZoomOut}
            variant="ghost"
            size="sm"
            disabled={zoom <= 50}
            title="Phóng to"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleZoomIn}
            variant="ghost"
            size="sm"
            disabled={zoom >= 200}
            title="Thu nhỏ"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleRotate}
            variant="ghost"
            size="sm"
            title="Xoay 90°"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border" />
          <Button
            onClick={handleDownload}
            variant="ghost"
            size="sm"
            title="Tải xuống"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image Container */}
      <div className="flex-1 overflow-auto flex items-center justify-center bg-muted/5 p-4">
        <div
          className="transition-transform duration-200"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
          }}
        >
          <img
            src={url}
            alt={fileName}
            onError={() => {
              console.error('[ImageViewer] Failed to load image:', url);
              setError(true);
            }}
            className="max-w-full h-auto"
            style={{ maxHeight: "90vh" }}
          />
        </div>
      </div>
    </Card>
  );
};
