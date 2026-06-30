import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, File, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UnsupportedFileViewerProps {
  fileName: string;
  detectedType: string;
  fileUrl: string;
  className?: string;
}

export const UnsupportedFileViewer: React.FC<UnsupportedFileViewerProps> = ({
                                                                              fileName,
                                                                              detectedType,
                                                                              fileUrl,
                                                                              className,
                                                                            }) => {
  // Toolbar - matches PdfViewer styling
  const Toolbar = (
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-1.5 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm gap-1 flex-wrap min-h-[42px]">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold truncate max-w-[160px]">{fileName}</span>
        </div>
        <div className="flex items-center gap-0.5 flex-wrap">
          <Button variant="ghost" size="sm" asChild>
            <a href={fileUrl} download target="_blank" rel="noopener noreferrer">
              <Download className="h-3.5 w-3.5 mr-1" /> Tải
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1" /> Mở mới
            </a>
          </Button>
        </div>
      </div>
  );

  return (
      <Card className={cn("flex flex-col min-h-0", className)}>
        {Toolbar}

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-muted-foreground mb-4">
            <File className="h-12 w-12" />
          </div>
          <p className="text-lg font-semibold text-primary mb-1">{fileName}</p>
          <p className="text-sm text-muted-foreground mb-6">
            Loại tệp không được hỗ trợ để xem: <strong>{detectedType}</strong>
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <a href={fileUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Mở trong tab mới
              </a>
            </Button>
          </div>
        </div>
      </Card>
  );
};