<<<<<<< HEAD
<<<<<<< HEAD
// src/components/document-workspace/ContentPanel.tsx
// Full content panel with sticky toolbar, features tabs, zoom/pan, horizontal scroll

import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
<<<<<<< HEAD
<<<<<<< HEAD
import { Download, Trash2, RotateCw, FileText, Loader2, ZoomIn, ZoomOut, Maximize2, Minus, Plus, Search, Hand, MousePointer2 } from "lucide-react";
=======
import { Download, Trash2, RotateCw, FileText, Loader2, ZoomIn, ZoomOut, Maximize2, Minus, Plus, Search, Hand, MousePointer2, Sparkles } from "lucide-react";
>>>>>>> origin/Flashcards-fix
=======
import { Download, Trash2, RotateCw, FileText, Loader2, ZoomIn, ZoomOut, Maximize2, Minus, Plus, Search, Hand, MousePointer2, Sparkles } from "lucide-react";
>>>>>>> origin/admin-added-fix
import { toast } from "sonner";
import { useDocument, useDocumentsByFolder, useDeleteDocument, useDownloadDocument } from "@/lib/queries";
import { DocumentViewer } from "@/components/document-viewer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
=======
=======
>>>>>>> origin/final/demo-v1
import { Download, FileText, Loader2, RotateCw, Trash2, Upload } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { DocumentViewer } from "@/components/document-viewer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
import { cn } from "@/lib/utils";
import { SummaryTab } from "./SummaryTab";
import { FlashcardsTab } from "./FlashcardsTab";
import { QuizzesTab } from "./QuizzesTab";
<<<<<<< HEAD
<<<<<<< HEAD

type Tab = "summary" | "flashcards" | "quizzes" | "original" | "notes";

interface ContentPanelProps {
  folderId: string;
  docId?: number;
}

export function ContentPanel({ folderId, docId }: ContentPanelProps) {
  const navigate = useNavigate();
  const doc = useDocument(docId && !isNaN(docId) && docId > 0 ? docId : 0);
  const folderDocs = useDocumentsByFolder(folderId);
  const del = useDeleteDocument();
  const download = useDownloadDocument();
  const [tab, setTab] = useState<Tab>("original");
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isValidDoc = !!docId && !!doc.data;

  // Zoom handlers
  const handleZoomIn = () => setZoom(p => Math.min(p + 10, 300));
  const handleZoomOut = () => setZoom(p => Math.max(p - 10, 50));
  const handleZoomReset = () => { setZoom(100); setPan({ x: 0, y: 0 }); };
  const handleFitWidth = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth - 48;
    const fitZ = Math.max(50, Math.min(300, Math.round((cw / 900) * 100)));
    setZoom(fitZ);
    setPan({ x: 0, y: 0 });
  }, []);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 100) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  // Ctrl+scroll zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const d = e.deltaY > 0 ? -5 : 5;
    setZoom(p => Math.min(Math.max(p + d, 50), 300));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      if (e.key === "=" || e.key === "+") { e.preventDefault(); handleZoomIn(); }
      if (e.key === "-") { e.preventDefault(); handleZoomOut(); }
      if (e.key === "0") { e.preventDefault(); handleZoomReset(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Actions
  const handleDownload = async () => {
    if (!docId) return;
    try { const res = await download.mutateAsync(docId); window.open(res.url, "_blank"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Tải xuống thất bại"); }
  };
  const handleDelete = async () => {
    if (!docId) return;
    if (!confirm("Xoá tài liệu này (chuyển vào Thùng rác)?")) return;
    try { await del.mutateAsync(docId); toast.success("Đã chuyển vào thùng rác"); navigate({ to: "/folders/$id", params: { id: String(folderId) }, search: {} }); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: "original", label: "📄 Nội dung gốc" },
    { id: "summary", label: "📝 All Summary" },
    { id: "flashcards", label: "🃏 AI Flashcards" },
    { id: "quizzes", label: "❓ AI Quizzes" },
    { id: "notes", label: "📝 Ghi chú AI" },
  ];

  return (
    <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-soft h-full">
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-3 py-2 flex items-center gap-2 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium truncate">{doc.data?.title ?? "Chưa chọn tài liệu"}</span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 border-l border-border pl-2">
          <button onClick={handleZoomOut} className="p-1.5 hover:bg-accent rounded-lg transition-colors" title="Thu nhỏ (Ctrl+-)">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <Input type="number" min={50} max={300} value={zoom} onChange={(e) => {
            const v = Math.min(Math.max(Number(e.target.value) || 50, 50), 300);
            setZoom(v);
          }} className="h-7 w-14 px-1 py-0 text-center text-xs" />
          <button onClick={handleZoomIn} className="p-1.5 hover:bg-accent rounded-lg transition-colors" title="Phóng to (Ctrl++)">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleFitWidth} className="p-1.5 hover:bg-accent rounded-lg transition-colors" title="Vừa khung">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleZoomReset} className="p-1.5 hover:bg-accent rounded-lg transition-colors" title="Reset (Ctrl+0)">
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Download/Delete */}
        {docId && <>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/admin-added-fix
          {tab === "original" && (
            <button onClick={() => setTab("flashcards")} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-brand text-white text-xs font-medium rounded-lg hover:opacity-90 transition-opacity" title="Chuyển đến Flashcards">
              <Sparkles className="h-3.5 w-3.5" /> Flashcards
            </button>
          )}
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
          <button onClick={handleDownload} className="p-1.5 hover:bg-accent rounded-lg" title="Tải xuống"><Download className="h-3.5 w-3.5" /></button>
          <button onClick={handleDelete} className="p-1.5 hover:bg-accent rounded-lg text-destructive" title="Xoá"><Trash2 className="h-3.5 w-3.5" /></button>
        </>}
      </div>

      {/* Features tabs */}
      <div className="flex gap-1 px-3 border-b border-border bg-gradient-soft shrink-0 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn(
            "px-4 py-2.5 text-xs font-medium transition-all relative whitespace-nowrap",
            tab === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}>
            {t.label}
            {tab === t.id && <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-primary rounded-full" />}
          </button>
        ))}
      </div>

      {/* File pills (only in original tab) */}
      {tab === "original" && (folderDocs.data?.length ?? 0) > 1 && (
        <div className="flex gap-2 px-4 py-2 border-b border-border overflow-x-auto items-center shrink-0 bg-background/60">
          <button onClick={() => navigate({ to: "/folders/$id", params: { id: String(folderId) }, search: {} })}
            className={cn("px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0", !docId ? "bg-gradient-brand text-white" : "bg-muted text-foreground hover:bg-accent")}>
            Tất cả
          </button>
          {(folderDocs.data ?? []).map(d => (
            <Link key={d.id} to="/folders/$id" params={{ id: String(folderId) }} search={{ docId: d.id }}
              className={cn("px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0", d.id === docId ? "bg-gradient-brand text-white" : "bg-brand-soft text-primary hover:bg-accent")}>
              {d.title}
            </Link>
          ))}
        </div>
      )}

      {/* Content area with zoom/pan */}
      <div ref={containerRef} className="flex-1 overflow-hidden relative bg-muted/20" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        style={{ cursor: zoom > 100 ? (isDragging ? "grabbing" : "grab") : "default" }}>
        <div className="w-full h-full overflow-auto" style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center top", transition: isDragging ? "none" : "transform 0.15s ease" }}>
          <div className="p-6 min-w-[600px]" style={{ marginLeft: pan.x, marginTop: pan.y }}>
            {renderContent()}
          </div>
        </div>
        {zoom !== 100 && <div className="absolute bottom-3 right-3 bg-foreground/70 text-background text-[10px] px-2 py-0.5 rounded-full">{zoom}%</div>}
      </div>
    </div>
  );

  function renderContent() {
    switch (tab) {
      case "original":
<<<<<<< HEAD
<<<<<<< HEAD
        if (isValidDoc) return <DocumentViewer document={doc.data} />;
=======
=======
>>>>>>> origin/admin-added-fix
        if (isValidDoc) return (
          <div className="space-y-4">
            <DocumentViewer document={doc.data} />
            <div className="flex justify-center">
              <Button size="sm" onClick={() => setTab("flashcards")} className="bg-gradient-brand text-white">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Xem Flashcards của tài liệu này
              </Button>
            </div>
          </div>
        );
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
        if (doc.isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
        if (!docId) return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {folderDocs.isLoading && Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
            {(folderDocs.data ?? []).map(d => (
              <Link key={d.id} to="/folders/$id" params={{ id: String(folderId) }} search={{ docId: d.id }}
                className="group flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft">
                <div className="h-16 w-16 rounded-xl bg-gradient-soft flex items-center justify-center group-hover:bg-gradient-brand transition-colors mb-3">
                  <FileText className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <div className="text-xs font-medium truncate w-full">{d.title}</div>
              </Link>
            ))}
          </div>
        );
        return (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <p className="text-sm text-muted-foreground">Không thể tải tài liệu</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RotateCw className="h-4 w-4 mr-2" /> Thử lại
            </Button>
          </div>
        );
      case "summary": return <SummaryTab title={doc.data?.title ?? ""} description={doc.data?.description ?? ""} />;
<<<<<<< HEAD
<<<<<<< HEAD
      case "flashcards": return <FlashcardsTab title={doc.data?.title ?? ""} />;
=======
      case "flashcards": return <FlashcardsTab documentId={docId ?? 0} title={doc.data?.title ?? ""} />;
>>>>>>> origin/Flashcards-fix
=======
      case "flashcards": return <FlashcardsTab documentId={docId ?? 0} title={doc.data?.title ?? ""} />;
>>>>>>> origin/admin-added-fix
      case "quizzes": return <QuizzesTab title={doc.data?.title ?? ""} />;
      case "notes": return <NotesTab />;
      default: return <div className="text-sm text-muted-foreground text-center mt-16">Chọn một tài liệu để xem nội dung.</div>;
    }
  }
}

function NotesTab() {
  const [notes, setNotes] = useState("");
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Ghi chú AI</h2>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ghi chú của bạn về tài liệu này..." className="min-h-[300px] w-full resize-none rounded-lg border border-border bg-transparent p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}
=======
=======
>>>>>>> origin/final/demo-v1
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { UploadDialog } from "./DocumentWorkspace";

type Tab = "original" | "notes" | "summary" | "flashcards" | "quizzes";

export function ContentPanel({
<<<<<<< HEAD
                                 folderId,
                                 docId,
                                 tab,
                                 setTab,
                                 notes,
                                 setNotes,
                                 folder,
                                 folderDocs,
                                 doc,
                                 uploadOpen,
                                 setUploadOpen,
                                 download,
                                 del,
                             }: {
=======
    folderId,
    docId,
    tab,
    setTab,
    notes,
    setNotes,
    folder,
    folderDocs,
    doc,
    uploadOpen,
    setUploadOpen,
    download,
    del,
}: {
>>>>>>> origin/final/demo-v1
    folderId: string;
    docId?: string;
    tab: Tab;
    setTab: (tab: Tab) => void;
    notes: string;
    setNotes: (val: string) => void;
    folder: UseQueryResult<any>;
    folderDocs: UseQueryResult<any>;
    doc: UseQueryResult<any>;
    uploadOpen: boolean;
    setUploadOpen: (val: boolean) => void;
    download: UseMutationResult<any, Error, string, unknown>;
    del: UseMutationResult<any, Error, string, unknown>;
}) {
    const navigate = useNavigate();

    const handleDownload = async () => {
        if (!docId) return;
        try {
            const res = await download.mutateAsync(docId);
            window.open(res.url, "_blank");
        } catch (e) {
            // Error handled in mutation
        }
    };

    const handleDelete = async () => {
        if (!docId) return;
        if (!confirm("Xoá tài liệu này (chuyển vào Thùng rác)?")) return;
        try {
            await del.mutateAsync(docId);
            navigate({
                to: "/folders/$id",
                params: { id: String(folderId) },
                search: {},
            });
        } catch (e) {
            // Error handled in mutation
        }
    };

    return (
        <section className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
            <div className="flex gap-1.5 p-3 border-b border-border bg-gradient-soft overflow-x-auto">
                {(
                    [
                        { id: "original", label: "Nội dung gốc" },
                        { id: "notes", label: "Ghi chú AI" },
                        { id: "summary", label: "Tóm tắt AI" },
                        { id: "flashcards", label: "Flashcards AI" },
                        { id: "quizzes", label: "Quizzes AI" },
                    ] as { id: Tab; label: string }[]
                ).map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={cn(
                            "px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all whitespace-nowrap",
                            tab === t.id
                                ? "bg-gradient-brand text-white shadow-soft"
                                : "bg-card text-foreground/70 border border-border hover:text-foreground hover:border-primary/40",
                        )}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

<<<<<<< HEAD
            {/* File pill row */}
            {tab === "original" && (folderDocs.data?.length ?? 0) > 0 && (
                <div className="flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center">
                    <button
                        onClick={() =>
                            navigate({
                                to: "/folders/$id",
                                params: { id: String(folderId) },
                                search: {},
                            })
                        }
                        className={cn(
                            "px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors",
                            !docId
                                ? "bg-gradient-brand text-white"
                                : "bg-muted text-foreground hover:bg-accent",
                        )}
                    >
                        Tất cả
                    </button>
                    {(folderDocs.data ?? []).map((d: any) => (
                        <Link
                            key={d.id}
                            to="/folders/$id"
                            params={{ id: String(folderId) }}
                            search={{ docId: d.id }}
                            className={cn(
                                "px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors",
                                d.id === docId
                                    ? "bg-gradient-brand text-white"
                                    : "bg-brand-soft text-primary hover:bg-accent",
                            )}
                        >
                            {d.title}
                        </Link>
                    ))}
                </div>
            )}

            {/* Folder navigation - only show when viewing PDF */}
=======
>>>>>>> origin/final/demo-v1
            {tab === "original" && docId && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setUploadOpen(true)}
                            className="flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-2.5 transition-all h-auto px-0"
                        >
                            <Upload className="h-4 w-4" /> Tải lên tài liệu
                        </Button>
                        <div className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                            THƯ MỤC
                        </div>
                        <div className="text-sm font-semibold font-display">
                            {folder.data?.name ?? "—"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {folderDocs.data?.length ?? 0} tài liệu
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-6">
                {tab === "original" ? (
                    docId && doc.data ? (
<<<<<<< HEAD
                        // ✅ QUAN TRỌNG: Đã thêm className="flex-1 min-h-0 w-full h-full" vào đây
=======
>>>>>>> origin/final/demo-v1
                        <DocumentViewer document={doc.data} className="flex-1 min-h-0 w-full h-full" />
                    ) : doc.isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <p className="text-sm text-muted-foreground">Đang tải tài liệu...</p>
                            </div>
                        </div>
                    ) : !docId ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {folderDocs.isLoading &&
                                Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="h-40 rounded-xl" />
                                ))}
                            {(folderDocs.data ?? []).map((d: any) => {
                                const active = d.id === docId;
                                return (
                                    <Link
                                        key={d.id}
                                        to="/folders/$id"
                                        params={{ id: String(folderId) }}
                                        search={{ docId: d.id }}
                                        className={cn(
                                            "group flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5",
                                            active &&
                                            "border-primary ring-2 ring-primary/20 shadow-soft",
                                        )}
                                    >
                                        <div className="flex-1 flex items-center justify-center w-full py-4">
                                            <div className="h-16 w-16 rounded-xl bg-gradient-soft flex items-center justify-center group-hover:bg-gradient-brand transition-colors">
                                                <FileText className="h-8 w-8 text-primary group-hover:text-white" />
                                            </div>
                                        </div>
                                        <div className="text-xs font-medium text-foreground truncate w-full">
                                            {d.title}
                                        </div>
                                    </Link>
                                );
                            })}
                            {!folderDocs.isLoading &&
                                (folderDocs.data ?? []).length === 0 && (
                                    <div className="col-span-full text-sm text-muted-foreground text-center py-10">
                                        Chưa có tài liệu. Bấm "Tải lên tài liệu" để bắt đầu.
                                    </div>
                                )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-sm text-muted-foreground">Không thể tải tài liệu</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.location.reload()}
                                >
                                    <RotateCw className="h-4 w-4 mr-2" />
                                    Thử lại
                                </Button>
                            </div>
                        </div>
                    )
                ) : !docId ? (
                    <div className="text-sm text-muted-foreground text-center mt-16">
                        Chọn một tài liệu để xem nội dung.
                    </div>
                ) : doc.isLoading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-96" />
                    </div>
                ) : tab === "notes" ? (
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-1 border border-border rounded-lg px-2 py-1.5 text-xs text-muted-foreground bg-muted/40">
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer font-bold">B</span>
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer italic">I</span>
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer underline">U</span>
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">H1</span>
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">H2</span>
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">• List</span>
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">1. List</span>
                            <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">Link</span>
                        </div>
                        <h2 className="text-xl font-bold text-gradient-brand font-display">
                            Ghi chú AI
                        </h2>
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Ghi chú của bạn về tài liệu này..."
                            className="min-h-[300px] resize-none"
                        />
                    </div>
                ) : tab === "summary" ? (
                    <SummaryTab
                        title={doc.data?.title ?? ""}
                        description={doc.data?.description ?? ""}
                    />
                ) : tab === "flashcards" ? (
                    <FlashcardsTab title={doc.data?.title ?? ""} />
                ) : (
                    <QuizzesTab title={doc.data?.title ?? ""} />
                )}
            </div>

            {docId && (
                <div className="p-3 border-t border-border flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={download.isPending}
                    >
                        <Download className="h-3.5 w-3.5 mr-2" />{" "}
                        {download.isPending ? "Đang tải…" : "Tải xuống"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        className="text-destructive"
                    >
                        <Trash2 className="h-3.5 w-3.5 mr-2" /> Xoá
                    </Button>
                </div>
            )}

            <UploadDialog
                open={uploadOpen}
                onOpenChange={setUploadOpen}
                folderId={folderId}
            />
        </section>
    );
<<<<<<< HEAD
}
>>>>>>> origin/Flashcars
=======
}
>>>>>>> origin/final/demo-v1
