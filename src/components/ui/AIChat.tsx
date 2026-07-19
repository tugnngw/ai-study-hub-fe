<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";

=======
import { Link, useNavigate } from "@tanstack/react-router";
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
import { Link, useNavigate } from "@tanstack/react-router";
>>>>>>> origin/AI-Study-fix
=======
import { Link, useNavigate } from "@tanstack/react-router";
>>>>>>> origin/test/share-document-cloudinary
=======
import { Link, useNavigate } from "@tanstack/react-router";
>>>>>>> origin/uichange
=======
import { Link, useNavigate } from "@tanstack/react-router";
>>>>>>> origin/admin-added
=======
import { Link, useNavigate } from "@tanstack/react-router";
>>>>>>> origin/update/feature/share
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderClosed,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  Loader2,
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  Loader2,
>>>>>>> origin/AI-Study-fix
  Send,
  Sparkles,
=======
=======
>>>>>>> origin/uichange
  Loader2,
  Send,
  Sparkles,
  Upload,
  ZoomIn,
  ZoomOut,
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
  Loader2,
  Send,
  Sparkles,
>>>>>>> origin/admin-added
=======
  Loader2,
  Send,
  Sparkles,
>>>>>>> origin/update/feature/share
} from "lucide-react";
import { toast } from "sonner";
import {
  useAskRag,
  useDocument,
  useDocumentsByFolder,
  useFolder,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  useUploadDocument,
>>>>>>> origin/test/share-document-cloudinary
=======
  useUploadDocument,
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
} from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { DocumentActionsMenu } from "@/components/document-actions-menu";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { DocumentViewer } from "@/components/document-viewer";
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
import { DocumentViewer } from "@/components/document-viewer";
>>>>>>> origin/AI-Study-fix
import { cn } from "@/lib/utils";
import type { Document } from "@/lib/types";
=======
=======
>>>>>>> origin/uichange
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
import { DocumentActionsMenu } from "@/components/document-actions-menu";
import { DocumentViewer } from "@/components/document-viewer";
import { cn } from "@/lib/utils";
import type { Document } from "@/lib/types";
<<<<<<< HEAD
<<<<<<< HEAD
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

function formatBytes(n: number) {
  if (!n) return "0 MB";
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(0)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(0)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

function fileTone(d: Document) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const name = (d.fileName ?? "").toLowerCase();
  if (name.endsWith(".pdf") || d.mimeType?.includes("pdf"))
    return { icon: "text-red-500", soft: "bg-red-50" };
  if (name.endsWith(".doc") || name.endsWith(".docx") || d.mimeType?.includes("word"))
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
  const name = (d.title ?? "").toLowerCase();
  if (name.endsWith(".pdf") || d.mimeType?.includes("pdf"))
    return { icon: "text-red-500", soft: "bg-red-50" };
  if (
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    d.mimeType?.includes("word")
  )
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
    return { icon: "text-blue-500", soft: "bg-blue-50" };
  return { icon: "text-primary", soft: "bg-muted" };
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export function AIChat({ folderId, docId }: { folderId: number; docId?: number }) {
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
export function AIChat({
  folderId,
  docId,
}: {
  folderId: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  docId?: number;
}) {
>>>>>>> origin/Ai-Study-fix-folder-refactor
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const doc = useDocument(docId ?? 0);
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
  docId?: string;
}) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const doc = useDocument(docId ?? "");
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
=======
>>>>>>> origin/update/feature/share
  docId?: number;
}) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const doc = useDocument(docId ?? 0);
<<<<<<< HEAD
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
  const ask = useAskRag();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [uploadOpen, setUploadOpen] = useState(false);
>>>>>>> origin/test/share-document-cloudinary
=======
  const [uploadOpen, setUploadOpen] = useState(false);
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
  const [activeTab, setActiveTab] = useState<
    "content" | "summary" | "flashcards" | "quizzes"
  >("content");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [chatZoom, setChatZoom] = useState(1);
  const zoomOut = () => setChatZoom((z) => Math.max(0.8, +(z - 0.1).toFixed(2)));
  const zoomIn = () => setChatZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)));
>>>>>>> origin/test/share-document-cloudinary
=======
  const [chatZoom, setChatZoom] = useState(1);
  const zoomOut = () => setChatZoom((z) => Math.max(0.8, +(z - 0.1).toFixed(2)));
  const zoomIn = () => setChatZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)));
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share

  const docs = folderDocs.data ?? [];
  const totalSize = docs.reduce((s, d) => s + (d.fileSize ?? 0), 0);

  useEffect(() => {
    setMessages([]);
  }, [docId]);

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
  }, [messages, ask.isPending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [docId]);

  const submitChat = async () => {
    if (!input.trim()) return;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    if (!docId) {
      toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
=======
    if (!folderId) {
      toast.info("Chọn thư mục để bắt đầu trò chuyện");
>>>>>>> origin/AI-Study-fix
=======
    if (!docId) {
      toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
>>>>>>> origin/test/share-document-cloudinary
=======
    if (!docId) {
      toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
>>>>>>> origin/uichange
=======
    if (!docId) {
      toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
>>>>>>> origin/admin-added
=======
    if (!docId) {
      toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
>>>>>>> origin/update/feature/share
      return;
    }
    const q = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await ask.mutateAsync({ id: docId, question: q });
=======
       const res = await ask.mutateAsync({ id: folderId, question: q, documentId: docId });
>>>>>>> origin/AI-Study-fix
=======
      const res = await ask.mutateAsync({ id: docId, question: q });
>>>>>>> origin/test/share-document-cloudinary
=======
      const res = await ask.mutateAsync({ id: docId, question: q });
>>>>>>> origin/uichange
=======
      const res = await ask.mutateAsync({ id: docId, question: q });
>>>>>>> origin/admin-added
=======
      const res = await ask.mutateAsync({ id: docId, question: q });
>>>>>>> origin/update/feature/share
      setMessages((m) => [...m, { role: "assistant", content: res.answer }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Đã xảy ra lỗi");
    } finally {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-4 h-[calc(100vh-9rem)]">
      {/* Column 1: folder + file list */}
      <aside className="hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft">
        <div className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-2">
          THƯ MỤC ĐANG DÙNG
        </div>
        <div className="rounded-xl bg-gradient-soft p-3 border border-border/50 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
            <FolderClosed className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold font-display truncate">
              {folder.data?.name ?? "—"}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {formatBytes(totalSize)} · {docs.length} tài liệu
            </div>
          </div>
          <Link
            to="/folders"
            className="h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0"
            title="Quản lý thư mục"
          >
            <FolderClosed className="h-4 w-4" />
          </Link>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
        <Button
          variant="outline"
          size="sm"
          onClick={() => setUploadOpen(true)}
          className="w-full justify-start gap-2 text-primary font-medium text-sm hover:gap-3 transition-all border-primary/30 hover:border-primary hover:bg-primary/5 mb-3"
        >
          <Upload className="h-4 w-4" /> Tải lên tài liệu
        </Button>

<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
        <div className="text-[10px] font-semibold tracking-wider text-muted-foreground mt-5 mb-2">
          TÀI LIỆU ĐANG CÓ
        </div>
        <div className="space-y-1 overflow-y-auto flex-1 -mx-1 px-1">
          {folderDocs.isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-lg" />
            ))}
          {docs.map((d) => {
            const active = d.id === docId;
            const tone = fileTone(d);
            return (
              <div
                key={d.id}
                className={cn(
                  "group flex items-center gap-2 rounded-lg pl-2 pr-1 py-2 transition-colors",
                  active
                    ? "bg-red-50 border-l-2 border-red-400"
                    : "hover:bg-accent border-l-2 border-transparent",
                )}
              >
                <Link
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  to={`/aichat?folderId=${folderId}&docId=${d.id}`}
=======
                  to="/ai"
                  search={{ folderId, docId: d.id }}
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
                  to="/ai"
                  search={{ folderId, docId: d.id }}
>>>>>>> origin/AI-Study-fix
=======
                  to="/ai"
                  search={{ folderId, docId: d.id }}
>>>>>>> origin/test/share-document-cloudinary
=======
                  to="/ai"
                  search={{ folderId, docId: d.id }}
>>>>>>> origin/uichange
=======
                  to="/ai"
                  search={{ folderId, docId: d.id }}
>>>>>>> origin/admin-added
=======
                  to="/ai"
                  search={{ folderId, docId: d.id }}
>>>>>>> origin/update/feature/share
                  className="flex items-center gap-2 min-w-0 flex-1"
                >
                  <FileText className={cn("h-4 w-4 shrink-0", tone.icon)} />
                  <span
                    className={cn(
                      "truncate text-sm",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                      active ? "font-medium text-foreground" : "text-foreground/90",
=======
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground/90",
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground/90",
>>>>>>> origin/AI-Study-fix
=======
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground/90",
>>>>>>> origin/test/share-document-cloudinary
=======
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground/90",
>>>>>>> origin/uichange
=======
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground/90",
>>>>>>> origin/admin-added
=======
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground/90",
>>>>>>> origin/update/feature/share
                    )}
                  >
                    {d.title}
                  </span>
                </Link>
                <DocumentActionsMenu
                  documentId={d.id}
                  folderId={folderId}
                  title={d.title}
                  className="h-6 w-6 rounded-md hover:bg-background flex items-center justify-center text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100"
                  iconClassName="h-3.5 w-3.5"
                />
              </div>
            );
          })}
          {!folderDocs.isLoading && docs.length === 0 && (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="text-xs text-muted-foreground px-2">Chưa có tài liệu</div>
=======
            <div className="text-xs text-muted-foreground px-2">
              Chưa có tài liệu
            </div>
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
            <div className="text-xs text-muted-foreground px-2">
              Chưa có tài liệu
            </div>
>>>>>>> origin/AI-Study-fix
=======
            <div className="text-xs text-muted-foreground px-2">
              Chưa có tài liệu
            </div>
>>>>>>> origin/test/share-document-cloudinary
=======
            <div className="text-xs text-muted-foreground px-2">
              Chưa có tài liệu
            </div>
>>>>>>> origin/uichange
=======
            <div className="text-xs text-muted-foreground px-2">
              Chưa có tài liệu
            </div>
>>>>>>> origin/admin-added
=======
            <div className="text-xs text-muted-foreground px-2">
              Chưa có tài liệu
            </div>
>>>>>>> origin/update/feature/share
          )}
        </div>

        <Link
          to="/folders"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white text-sm font-medium py-2.5 shadow-brand hover:opacity-90 transition-opacity"
        >
          <ChevronLeft className="h-4 w-4" /> Quay về
        </Link>
      </aside>

      {/* Column 2: original content */}
      <section className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
        <div className="px-4 pt-3 border-b border-border">
          <div className="flex items-center gap-6 overflow-x-auto">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
            <button
              onClick={() => setActiveTab("content")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                activeTab === "content"
                  ? "border-primary text-primary"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  : "border-transparent text-muted-foreground hover:text-foreground"
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/AI-Study-fix
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/test/share-document-cloudinary
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/uichange
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/admin-added
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/update/feature/share
              )}
            >
              Original Content
            </button>

            <button
              onClick={() => setActiveTab("summary")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                activeTab === "summary"
                  ? "border-primary text-primary"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  : "border-transparent text-muted-foreground hover:text-foreground"
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/AI-Study-fix
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/test/share-document-cloudinary
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/uichange
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/admin-added
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/update/feature/share
              )}
            >
              AI Summary
            </button>

            <button
              onClick={() => setActiveTab("flashcards")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                activeTab === "flashcards"
                  ? "border-primary text-primary"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  : "border-transparent text-muted-foreground hover:text-foreground"
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/AI-Study-fix
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/test/share-document-cloudinary
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/uichange
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/admin-added
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/update/feature/share
              )}
            >
              AI Flashcards
            </button>

            <button
              onClick={() => setActiveTab("quizzes")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                activeTab === "quizzes"
                  ? "border-primary text-primary"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  : "border-transparent text-muted-foreground hover:text-foreground"
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/AI-Study-fix
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/test/share-document-cloudinary
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/uichange
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/admin-added
=======
                  : "border-transparent text-muted-foreground hover:text-foreground",
>>>>>>> origin/update/feature/share
              )}
            >
              AI Quizzes
            </button>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

          </div>
        </div>

        {/* Pill row */}
        <div className="flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center">
          <button
            onClick={() => navigate(`/aichat?folderId=${folderId}`)}
            className={cn(
              "px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0",
              !docId ? "bg-gradient-brand text-white" : "bg-muted text-foreground hover:bg-accent",
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
          </div>
        </div>
        {/* Pill row */}
        <div className="flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center">
          <button
            onClick={() => navigate({ to: "/ai", search: { folderId } })}
            className={cn(
              "px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0",
              !docId
                ? "bg-gradient-brand text-white"
                : "bg-muted text-foreground hover:bg-accent",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
            )}
          >
            All
          </button>
          {docs.map((d) => (
            <Link
              key={d.id}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              to={`/aichat?folderId=${folderId}&docId=${d.id}`}
=======
              to="/ai"
              search={{ folderId, docId: d.id }}
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
              to="/ai"
              search={{ folderId, docId: d.id }}
>>>>>>> origin/AI-Study-fix
=======
              to="/ai"
              search={{ folderId, docId: d.id }}
>>>>>>> origin/test/share-document-cloudinary
=======
              to="/ai"
              search={{ folderId, docId: d.id }}
>>>>>>> origin/uichange
=======
              to="/ai"
              search={{ folderId, docId: d.id }}
>>>>>>> origin/admin-added
=======
              to="/ai"
              search={{ folderId, docId: d.id }}
>>>>>>> origin/update/feature/share
              className={cn(
                "px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0",
                d.id === docId
                  ? "bg-gradient-brand text-white"
                  : "bg-brand-soft text-primary hover:bg-accent",
              )}
            >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              {d.fileName ?? d.title}
=======
              {d.title}
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
              {d.title}
>>>>>>> origin/AI-Study-fix
=======
              {d.title}
>>>>>>> origin/test/share-document-cloudinary
=======
              {d.title}
>>>>>>> origin/uichange
=======
              {d.title}
>>>>>>> origin/admin-added
=======
              {d.title}
>>>>>>> origin/update/feature/share
            </Link>
          ))}
          {docs.length > 3 && (
            <span className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0">
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD



        {activeTab === "content" && (
          <></>
        )}          {activeTab === "summary" && (
          <div className="max-w-3xl mx-auto space-y-6">

            <h2 className="text-xl font-semibold">
              AI Summary
            </h2>

            <div className="rounded-xl border p-5 bg-muted/20">
              <h3 className="font-medium mb-3">
                Tóm tắt tài liệu
              </h3>

              <p className="text-sm text-muted-foreground leading-7">
                AI sẽ sinh phần tóm tắt nội dung của tài liệu đang chọn tại đây.
              </p>
            </div>

          </div>
        )}
        {activeTab === "flashcards" && (
          <div className="space-y-5">

            <h2 className="text-xl font-semibold">
              AI Flashcards
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="rounded-xl border p-5 hover:shadow-md">
                <div className="font-semibold mb-2">
                  Front
                </div>

                Agile là gì?
              </div>

              <div className="rounded-xl border p-5 bg-primary/5">
                <div className="font-semibold mb-2">
                  Back
                </div>

                Agile là phương pháp phát triển phần mềm theo từng vòng lặp.
              </div>

            </div>

          </div>
        )}
        {activeTab === "quizzes" && (
          <div className="space-y-5">

            <h2 className="text-xl font-semibold">
              AI Quizzes
            </h2>

            <div className="rounded-xl border p-5">

              <div className="font-medium mb-4">
                Agile tập trung vào điều gì?
              </div>

              <div className="space-y-3">

                <Button variant="outline" className="w-full justify-start">
                  A. Waterfall
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  B. Phản hồi nhanh
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  C. Big Bang
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  D. Không có đáp án
                </Button>

              </div>

            </div>

          </div>
        )}
        {/* File grid */}
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {folderDocs.isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))}

              {docs.map((d) => {
                const active = d.id === docId;
                const tone = fileTone(d);

                return (
                  <div
                    key={d.id}
                    className={cn(
                      "group relative flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5",
                      active && "border-primary ring-2 ring-primary/20 shadow-soft",
                    )}
                  >
                    <div className="absolute top-2 right-2 opacity-60 group-hover:opacity-100">
                      <DocumentActionsMenu
                        documentId={d.id}
                        folderId={folderId}
                        title={d.title}
                        className="h-6 w-6 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0"
                        iconClassName="h-3.5 w-3.5"
                      />
                    </div>
                    <Link
                      to={`/aichat?folderId=${folderId}&docId=${d.id}`}
                      className="flex flex-col items-center w-full"
                    >
                      <div className="flex-1 flex items-center justify-center w-full py-4">
                        <div
                          className={cn(
                            "h-16 w-16 rounded-xl flex items-center justify-center",
                            tone.soft,
                          )}
                        >
                          <FileText className={cn("h-8 w-8", tone.icon)} />
                        </div>
                      </div>

                      <div className="text-xs font-medium text-primary truncate w-full">
                        {d.fileName ?? d.title}
                      </div>
                    </Link>
                  </div>
                );
              })}

              {!folderDocs.isLoading && docs.length === 0 && (
                <div className="col-span-full text-sm text-muted-foreground text-center py-10">
                  Chưa có tài liệu trong thư mục này.
                </div>
              )}
            </div>
          </div>
        )}
=======
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto">
            {docId && doc.data?.status === "ready" ? (
=======
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto">
            {docId && doc.data?.status === "completed" ? (
>>>>>>> origin/AI-Study-fix
=======
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto">
            {docId && doc.data?.status === "ready" ? (
>>>>>>> origin/test/share-document-cloudinary
=======
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto">
            {docId && doc.data?.status === "ready" ? (
>>>>>>> origin/uichange
=======
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto">
            {docId && doc.data?.status === "ready" ? (
>>>>>>> origin/admin-added
=======
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto">
            {docId && doc.data?.status === "ready" ? (
>>>>>>> origin/update/feature/share
              <DocumentViewer document={doc.data} />
            ) : doc.data?.status === "processing" ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2 p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Đang xử lý tài liệu...</p>
                </div>
              </div>
            ) : doc.data?.status === "failed" ? (
              <div className="flex items-center justify-center h-full p-8">
                <p className="text-red-500 text-center">Tài liệu đã xảy ra lỗi khi xử lý</p>
              </div>
            ) : docId && !doc.data ? (
              <div className="flex items-center justify-center h-full p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5">
                {folderDocs.isLoading &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-40 rounded-xl" />
                  ))}
                {docs.map((d) => {
                  const active = d.id === docId;
                  const tone = fileTone(d);
                  return (
                    <div
                      key={d.id}
                      className={cn(
                        "group relative flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5",
                        active && "border-primary ring-2 ring-primary/20 shadow-soft",
                      )}
                    >
                      <Link
                        to="/ai"
                        search={{ folderId, docId: d.id }}
                        className="flex flex-col items-center w-full"
                      >
                        <div className="flex-1 flex items-center justify-center w-full py-4">
                          <div className={cn("h-16 w-16 rounded-xl flex items-center justify-center", tone.soft)}>
                            <FileText className={cn("h-8 w-8", tone.icon)} />
                          </div>
                        </div>
                        <div className="text-xs font-medium text-primary truncate w-full">
                          {d.title}
                        </div>
                      </Link>
                    </div>
                  );
                })}
                {!folderDocs.isLoading && docs.length === 0 && (
                  <div className="col-span-full text-sm text-muted-foreground text-center py-10">
                    Chưa có tài liệu trong thư mục này.
                  </div>
                )}
              </div>
            )}
          </div>
        )}{" "}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
        {activeTab === "summary" && (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Nội dung AI Summary */}
          </div>
        )}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
        {activeTab === "flashcards" && (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Nội dung AI Flashcards */}
          </div>
        )}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
        {activeTab === "quizzes" && (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Nội dung AI Quizzes */}
          </div>
        )}
      </section>

      {/* Column 3: chat */}
      <aside className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="px-4 py-3.5 border-b border-border text-center">
          <div className="text-sm font-semibold font-display truncate">
<<<<<<< HEAD
<<<<<<< HEAD
            {doc.data?.fileName ?? doc.data?.title ?? "Chưa chọn tài liệu"}
=======
            {doc.data?.title ?? "Chưa chọn tài liệu"}
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
            {doc.data?.title ?? "Chưa chọn tài liệu"}
>>>>>>> origin/AI-Study-fix
=======
        <div className="px-4 py-3.5 border-b border-border text-center">
          <div className="text-sm font-semibold font-display truncate">
            {doc.data?.title ?? "Chưa chọn tài liệu"}
>>>>>>> origin/admin-added
=======
        <div className="px-4 py-3.5 border-b border-border text-center">
          <div className="text-sm font-semibold font-display truncate">
            {doc.data?.title ?? "Chưa chọn tài liệu"}
>>>>>>> origin/update/feature/share
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="text-sm font-semibold font-display truncate flex-1 text-center">
            {doc.data?.title ?? "Chưa chọn tài liệu"}
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={zoomOut}
              disabled={chatZoom <= 0.8}
              title="Thu nhỏ"
              className="h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground disabled:opacity-40"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-[11px] text-muted-foreground w-9 text-center tabular-nums">
              {Math.round(chatZoom * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={chatZoom >= 1.6}
              title="Phóng to"
              className="h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground disabled:opacity-40"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{ fontSize: `${chatZoom}rem` }}
        >
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <div className="text-base font-semibold font-display">Trò chuyện với AI</div>
=======
              <div className="text-base font-semibold font-display">
                Trò chuyện với AI
              </div>
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
              <div className="text-base font-semibold font-display">
                Trò chuyện với AI
              </div>
>>>>>>> origin/AI-Study-fix
=======
              <div className="text-base font-semibold font-display">
                Trò chuyện với AI
              </div>
>>>>>>> origin/test/share-document-cloudinary
=======
              <div className="text-base font-semibold font-display">
                Trò chuyện với AI
              </div>
>>>>>>> origin/uichange
=======
              <div className="text-base font-semibold font-display">
                Trò chuyện với AI
              </div>
>>>>>>> origin/admin-added
=======
              <div className="text-base font-semibold font-display">
                Trò chuyện với AI
              </div>
>>>>>>> origin/update/feature/share
              <div className="text-sm text-muted-foreground mt-1 max-w-sm">
                {docId
                  ? "Hỏi AI để tóm tắt, giải thích hoặc kiểm tra kiến thức từ tài liệu này."
                  : "Chọn một tài liệu để bắt đầu trò chuyện."}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={cn(
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
                  "text-sm rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft"
                    : "bg-muted text-foreground rounded-bl-md",
                )}
              >
                {m.content}
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
                  "text-[1em] rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed",
                  m.role === "user"
                    ? "bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft whitespace-pre-wrap"
                    : "bg-muted text-foreground rounded-bl-md prose prose-sm dark:prose-invert prose-p:m-1 prose-pre:m-1 prose-ul:m-1 prose-ol:m-1",
                )}
              >
                {m.role === "user" ? (
                  m.content
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({ inline, className, children, ...props }) => (
                        <code
                          className={cn(
                            "rounded px-1.5 py-0.5",
                            inline
                              ? "bg-slate-700 text-slate-100"
                              : "block bg-slate-800 text-slate-100 overflow-x-auto p-2 my-1"
                          )}
                          {...props}
                        >
                          {children}
                        </code>
                      ),
                      a: ({ children, ...props }) => (
                        <a className="text-blue-500 hover:underline" {...props}>
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                )}
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
              </div>
            ))
          )}
          {ask.isPending && (
            <div className="text-sm bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%] inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:200ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]" />
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submitChat();
          }}
          className="p-3 border-t border-border flex gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn…."
            className="text-sm rounded-xl bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-input"
            disabled={!docId}
          />
          <Button
            type="submit"
            size="icon"
            disabled={ask.isPending || !input.trim() || !docId}
            className="bg-gradient-brand hover:opacity-90 rounded-xl shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </aside>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    </div>
  );
}
=======
=======
>>>>>>> origin/uichange

      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        folderId={folderId}
      />
    </div>
  );
}

function UploadDialog({
  open,
  onOpenChange,
  folderId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  folderId: string;
}) {
  const upload = useUploadDocument();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    if (!file) return toast.error("Chọn file");
    if (!title.trim()) return toast.error("Nhập tiêu đề");
    try {
      await upload.mutateAsync({ file, folderId, title, description });
      toast.success("Đã tải lên");
      onOpenChange(false);
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tải lên tài liệu</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File</Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="space-y-2">
            <Label>Tiêu đề</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mô tả</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Huỷ
          </Button>
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải…" : "Tải lên"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
    </div>
  );
}
>>>>>>> origin/admin-added
=======
    </div>
  );
}
>>>>>>> origin/update/feature/share
