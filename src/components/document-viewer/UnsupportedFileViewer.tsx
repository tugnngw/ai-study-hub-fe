import React from "react";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Download, ExternalLink, File } from "lucide-react";
=======
import { Download, ExternalLink, File, FileText } from "lucide-react";
>>>>>>> origin/test/share-document-cloudinary
=======
import { Download, ExternalLink, File, FileText } from "lucide-react";
>>>>>>> origin/uichange
=======
import { Download, ExternalLink, File } from "lucide-react";
>>>>>>> origin/admin-added
=======
import { Download, ExternalLink, File } from "lucide-react";
>>>>>>> origin/update/feature/share
=======
import { Download, ExternalLink, File } from "lucide-react";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { Download, ExternalLink, File } from "lucide-react";
>>>>>>> origin/Flashcards-fix
=======
import { Download, ExternalLink, File } from "lucide-react";
>>>>>>> origin/admin-added-fix
=======
import { Download, ExternalLink, File, FileText } from "lucide-react";
>>>>>>> origin/Flashcars
=======
import { Download, ExternalLink, File, FileText } from "lucide-react";
>>>>>>> origin/final/demo-v1
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UnsupportedFileViewerProps {
  fileName: string;
  detectedType: string;
  fileUrl: string;
  className?: string;
}

export const UnsupportedFileViewer: React.FC<UnsupportedFileViewerProps> = ({
<<<<<<< HEAD
<<<<<<< HEAD
  fileName,
  detectedType,
  fileUrl,
  className,
}) => {
<<<<<<< HEAD
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
=======
>>>>>>> origin/admin-added-fix
  // Toolbar
  const Toolbar = (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 shrink-0">
      <span className="text-sm font-medium truncate max-w-[200px]">
        {fileName}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <a href={fileUrl} download target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-1" />
            Tải xuống
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
=======
>>>>>>> origin/admin-added-fix
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
=======
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> Mở mới
>>>>>>> origin/test/share-document-cloudinary
=======
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> Mở mới
>>>>>>> origin/uichange
=======
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
>>>>>>> origin/admin-added
=======
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
>>>>>>> origin/update/feature/share
=======
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
>>>>>>> origin/update/feature/AI/Quiz
=======
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
>>>>>>> origin/Flashcards-fix
=======
            <ExternalLink className="h-4 w-4 mr-1" />
            Mở tab mới
>>>>>>> origin/admin-added-fix
          </a>
        </Button>
      </div>
    </div>
  );

  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
=======
    <Card className={cn("flex flex-col min-h-0", className)}>
>>>>>>> origin/test/share-document-cloudinary
=======
    <Card className={cn("flex flex-col min-h-0", className)}>
>>>>>>> origin/uichange
=======
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
>>>>>>> origin/admin-added
=======
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
>>>>>>> origin/update/feature/share
=======
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
>>>>>>> origin/update/feature/AI/Quiz
=======
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
>>>>>>> origin/Flashcards-fix
=======
    <Card className={cn("flex flex-col overflow-hidden min-h-0", className)}>
>>>>>>> origin/admin-added-fix
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
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  );
};