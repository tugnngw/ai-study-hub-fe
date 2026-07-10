// src/features/admin/components/FilePreviewDialog.tsx
// Dialog cho phép admin XEM nội dung file trước khi duyệt / từ chối.
import { FileText, Download, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  url?: string | null;
  mimeType?: string | null;
}

export function FilePreviewDialog({ open, onOpenChange, title, url, mimeType }: Props) {
  const isImage = (mimeType ?? "").startsWith("image/");
  const isPdf = (mimeType ?? "").includes("pdf") || (url ?? "").toLowerCase().endsWith(".pdf");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 truncate">
            <FileText className="h-4 w-4 text-primary shrink-0" />
            <span className="truncate">Xem trước: {title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="h-[70vh] rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center">
          {!url ? (
            <div className="text-sm text-muted-foreground text-center px-6">
              Không có đường dẫn xem trước cho file này.
            </div>
          ) : isImage ? (
            <img
              src={url}
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          ) : isPdf ? (
            <iframe src={url} title={title} className="w-full h-full" />
          ) : (
            <div className="text-center space-y-3 px-6">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Không hỗ trợ xem trước định dạng này trong trình duyệt.
              </p>
              <Button asChild variant="outline" size="sm">
                <a href={url} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Mở ở tab mới
                </a>
              </Button>
            </div>
          )}
        </div>

        {url && (
          <div className="flex justify-end gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={url} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Mở tab mới
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={url} download>
                <Download className="h-3.5 w-3.5 mr-1.5" /> Tải xuống
              </a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
