import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderClosed,
  Loader2,
  Send,
  Sparkles,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { toast } from "sonner";
import {
  useRagChat,
  useProcessRag,
  useRagStatus,
  useDocument,
  useDocumentsByFolder,
  useFolder,
  useFolders,
  useUploadDocument,
} from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ragApi } from "@/lib/realApi";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DocumentActionsMenu } from "@/components/document-actions-menu";
import { DocumentViewer } from "@/components/document-viewer";
import { AISummary } from "@/features/ai/AISummary";
import { FlashcardTab } from "@/features/ai/FlashcardTab";
import { QuizTab } from "@/features/ai/QuizTab";
import { useGenerateSummary, useSummary } from "@/lib/queries";
import type { GenerateSummaryResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Document } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  docId?: string;
}) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const doc = useDocument(docId ?? "");
  const chat = useRagChat();
  const navigate = useNavigate();
  const allFolders = useFolders();

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "content" | "summary" | "flashcards" | "quizzes"
  >("content");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatZoom, setChatZoom] = useState(1);
  const zoomOut = () => setChatZoom((z) => Math.max(0.8, +(z - 0.1).toFixed(2)));
  const zoomIn = () => setChatZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)));

  const generateSummary = useGenerateSummary();
  const { data: cachedSummary } = useSummary(docId ?? "");
  const [summary, setSummary] = useState<string | null>(null);

  // Load cached summary when doc changes, reset otherwise
  useEffect(() => {
    if (cachedSummary?.markdown) {
      setSummary(cachedSummary.markdown);
    } else {
      setSummary(null);
    }
  }, [docId, cachedSummary?.markdown]);

  const processDoc = useProcessRag();
  const qc = useQueryClient();

  const [isProcessing, setIsProcessing] = useState(false);
  const processedRef = useRef<Set<string>>(new Set());
  const pollingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef(false);

  const docs = folderDocs.data ?? [];
  const totalSize = docs.reduce((s, d) => s + (d.fileSize ?? 0), 0);

  const pollStatus = useCallback((id: string): Promise<void> => {
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 20;

      const check = async () => {
        if (abortRef.current) { resolve(); return; }
        try {
          const res = await ragApi.status(id);
          if (res.status === "COMPLETED" || res.status === "READY") {
            qc.invalidateQueries({ queryKey: ["documents"] });
            resolve();
            return;
          }
        } catch { /* ignore and retry */ }

        attempts++;
        if (attempts >= maxAttempts) {
          resolve();
          return;
        }
        pollingTimerRef.current = setTimeout(check, 3000);
      };

      check();
    });
  }, [qc]);

  const processDocument = useCallback(async (id: string) => {
    if (isProcessing) return;
    if (processedRef.current.has(id)) return;
    processedRef.current.add(id);

    setIsProcessing(true);
    abortRef.current = false;
    try {
      await processDoc.mutateAsync(id);
      await pollStatus(id);
    } catch {
      processedRef.current.delete(id);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, processDoc, pollStatus]);

  // Auto-process on doc select
  useEffect(() => {
    if (docId) {
      processDocument(docId);
    }
    return () => {
      abortRef.current = true;
      if (pollingTimerRef.current) {
        clearTimeout(pollingTimerRef.current);
        pollingTimerRef.current = null;
      }
    };
  }, [docId]);

  useEffect(() => {
    setMessages([]);
  }, [docId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, chat.isPending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [docId]);

  const submitChat = async () => {
    if (!input.trim()) return;
    if (!folderId) {
      toast.info("Chọn một thư mục để bắt đầu trò chuyện");
      return;
    }
    const q = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    try {
      const res = await chat.mutateAsync({
        folderId,
        ...(docId ? { documentId: docId } : {}),
        question: q,
      });
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
          <div className="rounded-xl bg-gradient-soft p-3 border border-border/50 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
              <FolderClosed className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold font-display truncate">
                {folder.data?.name ??
                  (allFolders.data ?? []).find(
                    (f) => String(f.id) === String(folderId),
                  )?.name ??
                  (folder.isLoading ? "Đang tải…" : "Thư mục")}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {formatBytes(totalSize)} · {docs.length} tài liệu
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0"
                  title="Chọn thư mục khác"
                >
                  <FolderClosed className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 max-h-72 overflow-y-auto">
                <DropdownMenuLabel>Chuyển thư mục</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(allFolders.data ?? []).map((f) => (
                  <DropdownMenuItem
                    key={f.id}
                    onClick={() =>
                      navigate({ to: "/ai", search: { folderId: String(f.id) } })
                    }
                    className={cn(
                      "cursor-pointer",
                      String(f.id) === String(folderId) &&
                        "bg-accent font-medium",
                    )}
                  >
                    <FolderClosed className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span className="truncate">{f.name}</span>
                    {String(f.id) === String(folderId) && (
                      <Check className="h-3.5 w-3.5 ml-auto text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
                {(allFolders.data ?? []).length === 0 && (
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    Chưa có thư mục
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/folders">
                    <FolderClosed className="h-3.5 w-3.5 mr-2" /> Quản lý thư mục
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setUploadOpen(true)}
            className="w-full justify-start gap-2 text-primary font-medium text-sm hover:gap-3 transition-all border-primary/30 hover:border-primary hover:bg-primary/5 mb-3"
          >
            <Upload className="h-4 w-4" /> Tải lên tài liệu
          </Button>

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
        <section className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
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
              {docId && (doc.data?.status === "READY" || doc.data?.status === "COMPLETED") ? (
                <DocumentViewer document={doc.data} />
              ) : doc.data?.status === "PROCESSING" ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-2 p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Đang xử lý tài liệu...</p>
                  </div>
                </div>
              ) : doc.data?.status === "REJECT" ? (
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
            <AISummary
              docId={docId}
              docs={docs}
              isGenerating={generateSummary.isPending}
              summary={summary}
              onGenerate={(opts) =>
                generateSummary.mutate(opts, {
                  onSuccess: (data: GenerateSummaryResponse) => {
                    setSummary(data.markdown);
                    toast.success("Summary generated!");
                  },
                  onError: (err) =>
                    toast.error((err as Error).message || "Failed to generate summary"),
                })
              }
            />
          )}
          {activeTab === "flashcards" && <FlashcardTab docs={docs} docId={docId} />}
          {activeTab === "quizzes" && <QuizTab docs={docs} docId={docId} />}
        </section>

        {/* Column 3: chat */}
        <aside className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
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
                    ? "Hỏi AI về nội dung của tài liệu đang chọn."
                    : folderId
                      ? "Hỏi AI về tất cả tài liệu trong thư mục này."
                      : "Chọn một thư mục để bắt đầu trò chuyện."}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
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
                        code: (props) => {
                          const { className, children, ...rest } = props;
                          // react-markdown passes inline at runtime but TS types omit it
                          const isInline = (props as Record<string, unknown>).inline as boolean | undefined;
                          return (
                            <code
                              className={cn(
                                "rounded px-1.5 py-0.5",
                                isInline
                                  ? "bg-slate-700 text-slate-100"
                                  : "block bg-slate-800 text-slate-100 overflow-x-auto p-2 my-1"
                              )}
                              {...rest}
                            >
                              {children}
                            </code>
                          );
                        },
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
                </div>
              ))
            )}
            {chat.isPending && (
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
              disabled={!folderId}
            />
            <Button
              type="submit"
              size="icon"
              disabled={chat.isPending || isProcessing || !input.trim() || !folderId}
              className="bg-gradient-brand hover:opacity-90 rounded-xl shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </aside>

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
