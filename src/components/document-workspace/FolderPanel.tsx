// src/components/document-workspace/FolderPanel.tsx
// Panel 1 - folder info + quick upload + document list

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, FileText, Plus, Loader2, FolderKanban, Pin } from "lucide-react";
import { useFolder, useDocumentsByFolder, useUploadDocument } from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FolderPanelProps {
  folderId: string;
  docId?: number;
}

export function FolderPanel({ folderId, docId }: FolderPanelProps) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const upload = useUploadDocument();
  const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
  const files = [...(folderDocs.data ?? [])].sort(
    (a, b) => Number(isPinned(b.id)) - Number(isPinned(a.id)),
  );
  const size = files.reduce((s, d) => s + (d.fileSize || 0), 0);
  const total = 15 * 1024 * 1024 * 1024;
  const pct = Math.min(100, (size / total) * 100);
  const [quickOpen, setQuickOpen] = useState(false);
  const [quickFile, setQuickFile] = useState<File | null>(null);
  const [quickTitle, setQuickTitle] = useState("");

  const fmt = (n: number) => {
    if (!n) return "0 B";
    if (n < 1024) return `${n} B`;
    if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 ** 2).toFixed(1)} MB`;
  };

  const handleQuickUpload = async () => {
    if (!quickFile) { toast.error("Chọn file"); return; }
    const title = quickTitle.trim() || quickFile.name;
    try {
      await upload.mutateAsync({ file: quickFile, folderId, title });
      toast.success(`Đã thêm "${title}"`);
      setQuickOpen(false);
      setQuickFile(null);
      setQuickTitle("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload thất bại");
    }
  };

  return (
    <aside className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-soft h-full">
      <div className="p-4 pb-0">
        <Link to="/folders" className="flex items-center gap-1.5 text-primary font-medium text-sm mb-3 hover:gap-2.5 transition-all shrink-0">
          <ChevronLeft className="h-4 w-4" /> Quay về
        </Link>
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">THƯ MỤC ĐANG DÙNG</span>
          </div>
          <button
            onClick={() => setQuickOpen(!quickOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm file
          </button>
        </div>
        <div className="text-xs text-muted-foreground">{fmt(size)} · {files.length} tài liệu</div>
        <div className="text-xs mt-1">
          TÀI LIỆU ĐANG CÓ: <span className="font-bold text-primary">{files.length}</span>
        </div>
        <div className="mt-2 space-y-1">
          <Progress value={pct} className="h-1" />
          <div className="text-[10px] text-muted-foreground">
            <span className="font-medium text-foreground">{fmt(size)}</span> / {fmt(total)}
          </div>
        </div>
      </div>

      {/* Quick upload inline (auto-bound to current folder) */}
      {quickOpen && (
        <div className="px-4 py-3 border-b border-border bg-muted/30 shrink-0 space-y-2">
          <Input
            type="file"
            onChange={(e) => setQuickFile(e.target.files?.[0] ?? null)}
            className="h-8 text-xs"
          />
          <Input
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder="Tiêu đề (mặc định = tên file)"
            className="h-8 text-xs"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleQuickUpload}
              disabled={upload.isPending}
              className="flex-1 h-8 text-xs"
            >
              {upload.isPending ? "Đang tải…" : "Tải lên"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => { setQuickOpen(false); setQuickFile(null); setQuickTitle(""); }}
              className="h-8 text-xs"
            >
              Huỷ
            </Button>
          </div>
        </div>
      )}

      {/* File list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <div className="text-[10px] font-semibold tracking-wider text-muted-foreground px-2 py-1.5 uppercase">
          TÀI LIỆU ĐANG CÓ · {files.length}
        </div>
        {folderDocs.isLoading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-9 rounded-lg mx-1" />)}
        {files.map((d) => {
          const active = d.id === docId;
          const pinned = isPinned(d.id);
          return (
            <div key={d.id} className="relative group/item">
              <Link
                to="/folders/$id"
                params={{ id: String(folderId) }}
                search={{ docId: d.id }}
                className={cn(
                  "flex items-center gap-3 text-sm px-2.5 py-2 rounded-lg transition-colors",
                  active
                    ? "bg-gradient-brand text-white font-medium shadow-soft"
                    : pinned
                      ? "bg-amber-50 dark:bg-amber-400/10 hover:bg-accent text-foreground/90"
                      : "hover:bg-accent text-foreground/90",
                )}
              >
                {pinned ? (
                  <Pin className={cn("h-4 w-4 shrink-0", !active && "fill-amber-400 text-amber-500")} />
                ) : (
                  <FileText className="h-4 w-4 shrink-0" />
                )}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="truncate">{d.title}</div>
                  <div className={cn("text-[10px] truncate", active ? "text-white/70" : "text-muted-foreground/70")}>
                    {d.fileSize ? fmt(d.fileSize) : "—"}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  togglePin(d.id);
                }}
                title={pinned ? "Bỏ ghim" : "Ghim tài liệu"}
                className={cn(
                  "absolute right-1.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md flex items-center justify-center transition-opacity",
                  pinned ? "opacity-100" : "opacity-0 group-hover/item:opacity-100",
                  active ? "hover:bg-white/20 text-white" : "hover:bg-accent text-muted-foreground",
                )}
              >
                <Pin className={cn("h-3.5 w-3.5", pinned && !active && "fill-amber-400 text-amber-500")} />
              </button>
            </div>
          );
        })}
        {!folderDocs.isLoading && files.length === 0 && (
          <div className="text-xs text-muted-foreground px-3 py-4 text-center">Chưa có tài liệu</div>
        )}
      </div>
    </aside>
  );
}
