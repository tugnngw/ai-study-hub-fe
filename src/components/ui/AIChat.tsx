import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QuizzesTab } from "@/components/document-workspace/QuizzesTab";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderClosed,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  useAskRag,
  useDocument,
  useDocumentsByFolder,
  useFolder,
} from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentActionsMenu } from "@/components/document-actions-menu";
import { DocumentViewer } from "@/components/document-viewer";
import { cn } from "@/lib/utils";
import type { Document } from "@/lib/types";

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
  const name = (d.title ?? "").toLowerCase();
  if (name.endsWith(".pdf") || d.mimeType?.includes("pdf"))
    return { icon: "text-red-500", soft: "bg-red-50" };
  if (
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    d.mimeType?.includes("word")
  )
    return { icon: "text-blue-500", soft: "bg-blue-50" };
  return { icon: "text-primary", soft: "bg-muted" };
}

export function AIChat({
  folderId,
  docId,
}: {
  folderId: string;
  docId?: number;
}) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const doc = useDocument(docId ?? 0);
  const ask = useAskRag();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<
    "content" | "summary" | "flashcards" | "quizzes"
  >("content");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const docs = folderDocs.data ?? [];
  const totalSize = docs.reduce((s, d) => s + (d.fileSize ?? 0), 0);

  useEffect(() => {
    setMessages([]);
  }, [docId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, ask.isPending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [docId]);

  const submitChat = async () => {
    if (!input.trim()) return;
    if (!docId) {
      toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
      return;
    }
    const q = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    try {
      const res = await ask.mutateAsync({ id: docId, question: q });
      setMessages((m) => [...m, { role: "assistant", content: res.answer }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Đã xảy ra lỗi");
    } finally {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_360px] gap-4 h-[calc(100vh-9rem)] w-full">
      {/* Column 1: folder + file list */}
      <aside className="hidden lg:flex flex-col h-full bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft">
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
                  to="/ai"
                  search={{ folderId, docId: d.id }}
                  className="flex items-center gap-2 min-w-0 flex-1"
                >
                  <FileText className={cn("h-4 w-4 shrink-0", tone.icon)} />
                  <span
                    className={cn(
                      "truncate text-sm",
                      active
                        ? "font-medium text-foreground"
                        : "text-foreground/90",
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
            <div className="text-xs text-muted-foreground px-2">
              Chưa có tài liệu
            </div>
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
      <section className="h-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
        <div className="px-4 pt-3 border-b border-border">
          <div className="flex items-center gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("content")}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                activeTab === "content"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
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
                  : "border-transparent text-muted-foreground hover:text-foreground",
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
                  : "border-transparent text-muted-foreground hover:text-foreground",
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
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              AI Quizzes
            </button>
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
            )}
          >
            All
          </button>
          {docs.map((d) => (
            <Link
              key={d.id}
              to="/ai"
              search={{ folderId, docId: d.id }}
              className={cn(
                "px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0",
                d.id === docId
                  ? "bg-gradient-brand text-white"
                  : "bg-brand-soft text-primary hover:bg-accent",
              )}
            >
              {d.title}
            </Link>
          ))}
          {docs.length > 3 && (
            <span className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0">
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
        {activeTab === "content" && (
          <div className="flex-1 overflow-y-auto">
            {docId && doc.data?.status === "ready" ? (
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
        {activeTab === "summary" && (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Nội dung AI Summary */}
          </div>
        )}
        {activeTab === "flashcards" && (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Nội dung AI Flashcards */}
          </div>
        )}
        {activeTab === "quizzes" && (
          <div className="flex-1 overflow-y-auto p-6">
            <QuizzesTab folderId={folderId} docId={docId} title={doc.data?.title ?? "tài liệu"} />
          </div>
        )}
      </section>


      {/* Column 3: chat */}
      <aside className="h-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
        <div className="px-4 py-3.5 border-b border-border text-center">
          <div className="text-sm font-semibold font-display truncate">
            {doc.data?.title ?? "Chưa chọn tài liệu"}
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <div className="text-base font-semibold font-display">
                Trò chuyện với AI
              </div>
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
                  "text-sm rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft"
                    : "bg-muted text-foreground rounded-bl-md",
                )}
              >
                {m.content}
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
    </div>
  );
}
