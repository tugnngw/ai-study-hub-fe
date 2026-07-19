<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";

=======
import { Link, useNavigate } from "@tanstack/react-router";
>>>>>>> origin/Ai-Study-fix-folder-refactor
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  Download,
  FileText,
  Send,
  Trash2,
  Upload,
  Sparkles,
  RotateCw,
  Check,
  X,
  ChevronRight,
<<<<<<< HEAD
=======
  Loader2,
>>>>>>> origin/Ai-Study-fix-folder-refactor
} from "lucide-react";
import { toast } from "sonner";
import {
  useAskRag,
  useDeleteDocument,
  useDocument,
  useDocumentsByFolder,
<<<<<<< HEAD
  useFolder,
  useUploadDocument,
} from "@/lib/queries";
=======
  useDownloadDocument,
  useFolder,
  useUploadDocument,
} from "@/lib/queries";
import { DocumentViewer } from "@/components/document-viewer";
>>>>>>> origin/Ai-Study-fix-folder-refactor
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
<<<<<<< HEAD
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
import { cn } from "@/lib/utils";

type Tab = "original" | "notes" | "summary" | "flashcards" | "quizzes";
type Highlight = "memo" | "quiz" | "summary" | "idea";

const HIGHLIGHTS: { id: Highlight; label: string; cls: string }[] = [
<<<<<<< HEAD
  { id: "memo", label: "Thẻ ghi nhớ", cls: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
  { id: "quiz", label: "Bài kiểm tra", cls: "bg-green-100 text-green-700 hover:bg-green-200" },
  { id: "summary", label: "Tóm Tắt", cls: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { id: "idea", label: "Ý Chính", cls: "bg-pink-100 text-pink-700 hover:bg-pink-200" },
=======
  {
    id: "memo",
    label: "Thẻ ghi nhớ",
    cls: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  },
  {
    id: "quiz",
    label: "Bài kiểm tra",
    cls: "bg-green-100 text-green-700 hover:bg-green-200",
  },
  {
    id: "summary",
    label: "Tóm Tắt",
    cls: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  {
    id: "idea",
    label: "Ý Chính",
    cls: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  },
>>>>>>> origin/Ai-Study-fix-folder-refactor
];

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

export function DocumentWorkspace({
  folderId,
  docId,
}: {
<<<<<<< HEAD
  folderId: number;
=======
  folderId: string;
>>>>>>> origin/Ai-Study-fix-folder-refactor
  docId?: number;
}) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
<<<<<<< HEAD
  const doc = useDocument(docId ?? 0);
  const del = useDeleteDocument();
  const ask = useAskRag();
=======
  const isValidDocId = typeof docId === 'number' && !isNaN(docId) && docId > 0;
  const doc = useDocument(isValidDocId ? docId : 0);;
  console.log("DOC DATA", doc.data);
  console.log('[TRACE-3] DocumentWorkspace: docId received:', docId);
  console.log('[TRACE-3.1] isValidDocId:', isValidDocId);
  console.log('[TRACE-3.2] docId passed to useDocument:', isValidDocId ? docId : 0);
  const del = useDeleteDocument();
  const ask = useAskRag();
  const download = useDownloadDocument();
>>>>>>> origin/Ai-Study-fix-folder-refactor
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("original");
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
<<<<<<< HEAD
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
=======
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
>>>>>>> origin/Ai-Study-fix-folder-refactor
  }, [messages]);

  // Note: user clicks files in the grid to open them — no auto-select.

<<<<<<< HEAD

=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
  const submitChat = async () => {
    if (!input.trim() || !docId) return;
    const q = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    try {
      const res = await ask.mutateAsync({ id: docId, question: q });
      setMessages((m) => [...m, { role: "assistant", content: res.answer }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

<<<<<<< HEAD
=======
  const handleDownload = async () => {
    if (!docId) return;
    try {
      const res = await download.mutateAsync(docId);
      window.open(res.url, "_blank");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Tải xuống thất bại");
    }
  };

>>>>>>> origin/Ai-Study-fix-folder-refactor
  const handleDelete = async () => {
    if (!docId) return;
    if (!confirm("Xoá tài liệu này (chuyển vào Thùng rác)?")) return;
    try {
      await del.mutateAsync(docId);
      toast.success("Đã chuyển vào thùng rác");
<<<<<<< HEAD
      navigate(`/folders/${folderId}`);
=======
      navigate({
        to: "/folders/$id",
        params: { id: String(folderId) },
        search: {},
      });
>>>>>>> origin/Ai-Study-fix-folder-refactor
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-4 h-[calc(100vh-9rem)]">
      {/* Column 1: file list */}
      <aside className="hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft">
        <Link
          to="/folders"
          className="flex items-center gap-1.5 text-primary font-medium text-sm mb-4 hover:gap-2.5 transition-all"
        >
          <ChevronLeft className="h-4 w-4" /> Quay về
        </Link>

        <div className="rounded-xl bg-gradient-soft p-3 border border-border/50">
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1">
            THƯ MỤC ĐANG DÙNG
          </div>
<<<<<<< HEAD
          <div className="text-sm font-semibold font-display">{folder.data?.name ?? "—"}</div>
=======
          <div className="text-sm font-semibold font-display">
            {folder.data?.name ?? "—"}
          </div>
>>>>>>> origin/Ai-Study-fix-folder-refactor
          <div className="text-xs text-muted-foreground mt-0.5">
            {folderDocs.data?.length ?? 0} tài liệu
          </div>
        </div>

        <div className="mt-5 flex-1 min-h-0 flex flex-col">
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-2 px-1">
            TÀI LIỆU ĐANG CÓ
          </div>
          <div className="space-y-1 overflow-y-auto flex-1 -mx-1 px-1">
            {folderDocs.isLoading &&
<<<<<<< HEAD
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-9 rounded-lg" />)}
=======
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-9 rounded-lg" />
              ))}
>>>>>>> origin/Ai-Study-fix-folder-refactor
            {(folderDocs.data ?? []).map((d) => {
              const active = d.id === docId;
              return (
                <Link
                  key={d.id}
<<<<<<< HEAD
                  to={`/folders/${String(folderId)}?docId=${d.id}`}
=======
                  to="/folders/$id"
                  params={{ id: String(folderId) }}
                  search={{ docId: d.id }}
>>>>>>> origin/Ai-Study-fix-folder-refactor
                  className={cn(
                    "flex items-center gap-2 text-sm px-2.5 py-2 rounded-lg transition-colors",
                    active
                      ? "bg-gradient-brand text-white font-medium shadow-soft"
                      : "hover:bg-accent text-foreground/90",
                  )}
                >
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{d.title}</span>
                </Link>
              );
            })}
            {!folderDocs.isLoading && (folderDocs.data ?? []).length === 0 && (
<<<<<<< HEAD
              <div className="text-xs text-muted-foreground px-2">Chưa có tài liệu</div>
=======
              <div className="text-xs text-muted-foreground px-2">
                Chưa có tài liệu
              </div>
>>>>>>> origin/Ai-Study-fix-folder-refactor
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 justify-start border-dashed hover:border-primary hover:text-primary hover:bg-primary/5"
          onClick={() => setUploadOpen(true)}
        >
          <Upload className="h-3.5 w-3.5 mr-2" /> Tải lên tài liệu
        </Button>
      </aside>

      {/* Column 2: preview */}
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

        {/* File pill row */}
        {tab === "original" && (folderDocs.data?.length ?? 0) > 0 && (
          <div className="flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center">
            <button
              onClick={() =>
<<<<<<< HEAD
                navigate(`/folders/${folderId}`)
=======
                navigate({
                  to: "/folders/$id",
                  params: { id: String(folderId) },
                  search: {},
                })
>>>>>>> origin/Ai-Study-fix-folder-refactor
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
            {(folderDocs.data ?? []).map((d) => (
              <Link
                key={d.id}
<<<<<<< HEAD
                to={`/folders/${String(folderId)}?docId=${d.id}`}
=======
                to="/folders/$id"
                params={{ id: String(folderId) }}
                search={{ docId: d.id }}
>>>>>>> origin/Ai-Study-fix-folder-refactor
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

        <div className="flex-1 overflow-y-auto p-6">
          {tab === "original" ? (
<<<<<<< HEAD
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {folderDocs.isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))}
              {(folderDocs.data ?? []).map((d) => {
                const active = d.id === docId;
                return (
                  <Link
                    key={d.id}
                    to={`/folders/${String(folderId)}?docId=${d.id}`}
                    className={cn(
                      "group flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5",
                      active && "border-primary ring-2 ring-primary/20 shadow-soft",
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
              {!folderDocs.isLoading && (folderDocs.data ?? []).length === 0 && (
                <div className="col-span-full text-sm text-muted-foreground text-center py-10">
                  Chưa có tài liệu. Bấm "Tải lên tài liệu" để bắt đầu.
                </div>
              )}
            </div>
=======
            // 🔥 Kiểm tra kỹ hơn
            docId && doc.data ? (
              // Display original document viewer when a document is selected
              <DocumentViewer document={doc.data} />
            ) : doc.isLoading ? (
              // 🔥 Đang loading
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Đang tải tài liệu...</p>
                </div>
              </div>
            ) : !docId ? (
              // Display grid of documents to select from when no document is selected
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {folderDocs.isLoading &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-40 rounded-xl" />
                  ))}
                {(folderDocs.data ?? []).map((d) => {
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
              // 🔥 Fallback khi có lỗi
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
>>>>>>> origin/Ai-Study-fix-folder-refactor
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
<<<<<<< HEAD
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer font-bold">B</span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer italic">I</span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer underline">U</span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">H1</span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">H2</span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">• List</span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">1. List</span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">Link</span>
              </div>
              <h2 className="text-xl font-bold text-gradient-brand font-display">Ghi chú AI</h2>
=======
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer font-bold">
                  B
                </span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer italic">
                  I
                </span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer underline">
                  U
                </span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">
                  H1
                </span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">
                  H2
                </span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">
                  • List
                </span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">
                  1. List
                </span>
                <span className="px-2 py-0.5 hover:bg-accent rounded cursor-pointer">
                  Link
                </span>
              </div>
              <h2 className="text-xl font-bold text-gradient-brand font-display">
                Ghi chú AI
              </h2>
>>>>>>> origin/Ai-Study-fix-folder-refactor
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi chú của bạn về tài liệu này..."
                className="min-h-[300px] resize-none"
              />
            </div>
          ) : tab === "summary" ? (
<<<<<<< HEAD
            <SummaryTab title={doc.data?.title ?? ""} description={doc.data?.description ?? ""} />
=======
            <SummaryTab
              title={doc.data?.title ?? ""}
              description={doc.data?.description ?? ""}
            />
>>>>>>> origin/Ai-Study-fix-folder-refactor
          ) : tab === "flashcards" ? (
            <FlashcardsTab title={doc.data?.title ?? ""} />
          ) : (
            <QuizzesTab title={doc.data?.title ?? ""} />
          )}
        </div>

<<<<<<< HEAD




=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
        {docId && (
          <div className="p-3 border-t border-border flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
<<<<<<< HEAD
              disabled={!doc.data?.cloudinaryUrl}
              onClick={() => {
                const url = doc.data?.cloudinaryUrl;
                if (!url) return toast.error("Tài liệu chưa có file để tải");
                window.open(url, "_blank");
              }}
            >
              <Download className="h-3.5 w-3.5 mr-2" /> Download
=======
              onClick={handleDownload}
              disabled={download.isPending}
            >
              <Download className="h-3.5 w-3.5 mr-2" />{" "}
              {download.isPending ? "Đang tải…" : "Tải xuống"}
>>>>>>> origin/Ai-Study-fix-folder-refactor
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
      </section>

      {/* Column 3: chat */}
      <aside className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
        <div className="p-4 border-b border-border bg-gradient-soft space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                AI Assistant
              </div>
              <div className="text-sm font-semibold truncate font-display">
                {doc.data?.title ?? "Chưa chọn tài liệu"}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {HIGHLIGHTS.map((h) => (
              <button
                key={h.id}
                onClick={() => toast.info(`${h.label} — đang phát triển`)}
                className={cn(
                  "px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors",
                  h.cls,
                )}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
              <div className="h-12 w-12 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm font-medium">Hỏi AI về tài liệu</div>
              <div className="text-xs text-muted-foreground mt-1">
                Tóm tắt, giải thích, hỏi đáp — tất cả trong một
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "text-sm rounded-2xl px-3.5 py-2.5 max-w-[88%] leading-relaxed",
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
            <div className="text-sm bg-muted rounded-2xl rounded-bl-md px-3.5 py-2.5 max-w-[88%] inline-flex items-center gap-1.5">
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi AI bất cứ điều gì…"
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

=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
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
<<<<<<< HEAD
  folderId: number;
=======
  folderId: string;
>>>>>>> origin/Ai-Study-fix-folder-refactor
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
<<<<<<< HEAD
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
=======
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
>>>>>>> origin/Ai-Study-fix-folder-refactor
          </div>
          <div className="space-y-2">
            <Label>Tiêu đề</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mô tả</Label>
<<<<<<< HEAD
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
=======
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
>>>>>>> origin/Ai-Study-fix-folder-refactor
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

/* -------------------- AI Summary -------------------- */
<<<<<<< HEAD
function SummaryTab({ title, description }: { title: string; description: string }) {
=======
function SummaryTab({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
>>>>>>> origin/Ai-Study-fix-folder-refactor
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [title, tick]);

  const bullets = useMemo(
    () => [
      `Tài liệu “${title}” cung cấp kiến thức nền tảng và thuật ngữ cốt lõi cho người học.`,
      "Trình bày khái niệm theo trình tự từ cơ bản đến nâng cao, kèm ví dụ minh hoạ.",
      "Nhấn mạnh các thuật ngữ tiếng Anh chuyên ngành và cách dùng trong ngữ cảnh thực tế.",
      "Đưa ra bài tập vận dụng giúp người đọc tự kiểm tra mức độ hiểu bài.",
      "Kết luận tổng kết các điểm quan trọng cần ghi nhớ sau khi đọc xong tài liệu.",
    ],
    [title],
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Summary
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Tóm tắt được tạo tự động bởi AI dựa trên nội dung tài liệu
          </p>
        </div>
<<<<<<< HEAD
        <Button size="sm" variant="outline" onClick={() => setTick((t) => t + 1)}>
=======
        <Button
          size="sm"
          variant="outline"
          onClick={() => setTick((t) => t + 1)}
        >
>>>>>>> origin/Ai-Study-fix-folder-refactor
          <RotateCw className="h-3.5 w-3.5 mr-2" /> Tạo lại
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-primary/20 bg-brand-soft/60 p-4">
<<<<<<< HEAD
            <div className="text-xs font-semibold text-primary mb-1">Tóm tắt ngắn</div>
=======
            <div className="text-xs font-semibold text-primary mb-1">
              Tóm tắt ngắn
            </div>
>>>>>>> origin/Ai-Study-fix-folder-refactor
            <p className="text-sm leading-relaxed">
              {description ||
                `Tài liệu “${title}” tổng hợp các kiến thức cốt lõi và thuật ngữ quan trọng, giúp người đọc nắm chắc lý thuyết và áp dụng vào thực tế.`}
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Điểm chính</div>
            <ul className="space-y-2 text-sm">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="h-5 w-5 shrink-0 rounded-full bg-gradient-brand text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------- AI Flashcards -------------------- */
function FlashcardsTab({ title }: { title: string }) {
  const cards = useMemo(
    () => [
<<<<<<< HEAD
      { front: "Algorithm", back: "Tập hợp các bước cụ thể để giải quyết một bài toán." },
      { front: "Variable", back: "Vùng nhớ có tên, dùng để lưu trữ giá trị có thể thay đổi." },
      { front: "Function", back: "Khối lệnh có thể tái sử dụng, nhận đầu vào và trả về kết quả." },
      { front: "Loop", back: "Cấu trúc lặp lại một khối lệnh nhiều lần theo điều kiện." },
      { front: "Class", back: "Khuôn mẫu định nghĩa thuộc tính và hành vi của đối tượng (OOP)." },
=======
      {
        front: "Algorithm",
        back: "Tập hợp các bước cụ thể để giải quyết một bài toán.",
      },
      {
        front: "Variable",
        back: "Vùng nhớ có tên, dùng để lưu trữ giá trị có thể thay đổi.",
      },
      {
        front: "Function",
        back: "Khối lệnh có thể tái sử dụng, nhận đầu vào và trả về kết quả.",
      },
      {
        front: "Loop",
        back: "Cấu trúc lặp lại một khối lệnh nhiều lần theo điều kiện.",
      },
      {
        front: "Class",
        back: "Khuôn mẫu định nghĩa thuộc tính và hành vi của đối tượng (OOP).",
      },
>>>>>>> origin/Ai-Study-fix-folder-refactor
    ],
    [],
  );
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => setFlipped(false), [idx]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Flashcards
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Thẻ ghi nhớ từ “{title}” — bấm vào thẻ để lật mặt
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          {idx + 1} / {cards.length}
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[220px] rounded-xl border-2 border-primary/20 bg-gradient-soft p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md"
      >
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
          {flipped ? "Định nghĩa" : "Thuật ngữ"}
        </div>
<<<<<<< HEAD
        <div className={cn("font-semibold", flipped ? "text-base leading-relaxed" : "text-2xl")}>
=======
        <div
          className={cn(
            "font-semibold",
            flipped ? "text-base leading-relaxed" : "text-2xl",
          )}
        >
>>>>>>> origin/Ai-Study-fix-folder-refactor
          {flipped ? cards[idx].back : cards[idx].front}
        </div>
        <div className="text-xs text-muted-foreground mt-4">Bấm để lật thẻ</div>
      </button>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIdx((i) => (i - 1 + cards.length) % cards.length)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Trước
        </Button>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === idx ? "w-6 bg-gradient-brand" : "w-1.5 bg-muted",
              )}
            />
          ))}
        </div>
        <Button size="sm" onClick={() => setIdx((i) => (i + 1) % cards.length)}>
          Tiếp <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

/* -------------------- AI Quizzes -------------------- */
interface Quiz {
  q: string;
  options: string[];
  answer: number;
}

<<<<<<< HEAD
const QUIZ_TYPE_OPTIONS = [
  { id: "mcq", label: "Multiple Choice" },
  { id: "fill", label: "Fill in the Blank" },
  { id: "tf", label: "True/False" },
] as const;

function QuizzesTab({ title }: { title: string }) {
  const allQuizzes: Quiz[] = useMemo(
=======
function QuizzesTab({ title }: { title: string }) {
  const quizzes: Quiz[] = useMemo(
>>>>>>> origin/Ai-Study-fix-folder-refactor
    () => [
      {
        q: "Thuật ngữ “Algorithm” có nghĩa là gì?",
        options: [
          "Một loại ngôn ngữ lập trình",
          "Tập hợp các bước giải quyết bài toán",
          "Một loại biến trong bộ nhớ",
          "Tên gọi của một framework",
        ],
        answer: 1,
      },
      {
        q: "Cấu trúc nào dùng để lặp lại một khối lệnh?",
        options: ["Function", "Variable", "Loop", "Class"],
        answer: 2,
      },
      {
        q: "Trong OOP, “Class” là gì?",
        options: [
          "Một biến toàn cục",
          "Khuôn mẫu định nghĩa đối tượng",
          "Một hàm trả về số",
          "Một loại vòng lặp",
        ],
        answer: 1,
      },
    ],
    [],
  );

<<<<<<< HEAD
  // Create-quiz config (per spec: số lượng câu hỏi + loại câu hỏi, trạng thái rỗng "No quizzes found")
  const [numQuestions, setNumQuestions] = useState("25");
  const [types, setTypes] = useState<string[]>(["mcq"]);
  const toggleType = (id: string) =>
    setTypes((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
<<<<<<< HEAD
    () => (quizzes ?? []).reduce((s, q, i) => (answers[i] === q.answer ? s + 1 : s), 0),
=======
    () => quizzes.reduce((s, q, i) => (answers[i] === q.answer ? s + 1 : s), 0),
>>>>>>> origin/Ai-Study-fix-folder-refactor
    [answers, quizzes],
  );

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
<<<<<<< HEAD
    setQuizzes(null);
  };

  const createQuiz = () => {
    if (types.length === 0) {
      toast.error("Chọn ít nhất một loại câu hỏi");
      return;
    }
    const n = Math.max(1, Math.min(allQuizzes.length, Number(numQuestions) || allQuizzes.length));
    setQuizzes(allQuizzes.slice(0, n));
    setAnswers({});
    setSubmitted(false);
  };

  if (!quizzes) {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Quizzes
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Tạo bộ câu hỏi trắc nghiệm từ “{title}”</p>
        </div>

        <div className="rounded-xl border border-border p-5 space-y-5 bg-gradient-soft">
          <div className="space-y-2 max-w-xs">
            <Label className="text-xs font-semibold">Number of Questions</Label>
            <Select value={numQuestions} onValueChange={setNumQuestions}>
              <SelectTrigger className="bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["5", "10", "15", "20", "25"].map((n) => (
                  <SelectItem key={n} value={n}>
                    {n} câu
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold">Question types</Label>
            <div className="flex flex-wrap gap-2">
              {QUIZ_TYPE_OPTIONS.map((opt) => {
                const active = types.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleType(opt.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      active
                        ? "bg-gradient-brand text-white border-transparent shadow-soft"
                        : "bg-card text-foreground/80 border-border hover:border-primary/40",
                    )}
                  >
                    {active && <Check className="h-3 w-3" />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-10 border border-dashed border-border rounded-xl">
          <div className="text-sm text-muted-foreground mb-4">No quizzes found</div>
          <Button onClick={createQuiz} className="bg-gradient-brand hover:opacity-90">
            <Sparkles className="h-4 w-4 mr-2" /> Create Quiz
          </Button>
        </div>
      </div>
    );
  }

=======
  };

>>>>>>> origin/Ai-Study-fix-folder-refactor
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Quizzes
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Câu hỏi trắc nghiệm từ “{title}”
          </p>
        </div>
        {submitted && (
          <div className="text-sm font-semibold">
            Điểm:{" "}
            <span className="text-gradient-brand">
              {score} / {quizzes.length}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz, qi) => (
          <div key={qi} className="rounded-lg border border-border p-4">
            <div className="font-medium text-sm mb-3">
              Câu {qi + 1}. {quiz.q}
            </div>
            <div className="space-y-2">
              {quiz.options.map((opt, oi) => {
                const picked = answers[qi] === oi;
                const correct = submitted && oi === quiz.answer;
                const wrong = submitted && picked && oi !== quiz.answer;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors",
                      correct && "border-emerald-400 bg-emerald-50/60",
                      wrong && "border-red-400 bg-red-50/60",
                      !submitted && picked && "border-primary bg-brand-soft/60",
                      !submitted && !picked && "border-border hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0",
<<<<<<< HEAD
                        correct && "bg-emerald-500 text-white border-emerald-500",
                        wrong && "bg-red-500 text-white border-red-500",
                        !submitted && picked && "bg-gradient-brand text-white border-transparent",
                      )}
                    >
                      {correct ? <Check className="h-3 w-3" /> : wrong ? <X className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
=======
                        correct &&
                          "bg-emerald-500 text-white border-emerald-500",
                        wrong && "bg-red-500 text-white border-red-500",
                        !submitted &&
                          picked &&
                          "bg-gradient-brand text-white border-transparent",
                      )}
                    >
                      {correct ? (
                        <Check className="h-3 w-3" />
                      ) : wrong ? (
                        <X className="h-3 w-3" />
                      ) : (
                        String.fromCharCode(65 + oi)
                      )}
>>>>>>> origin/Ai-Study-fix-folder-refactor
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        {submitted ? (
          <Button variant="outline" onClick={reset}>
            <RotateCw className="h-4 w-4 mr-2" /> Làm lại
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (Object.keys(answers).length < quizzes.length) {
                toast.error("Vui lòng trả lời tất cả câu hỏi");
                return;
              }
              setSubmitted(true);
            }}
          >
            Nộp bài
          </Button>
        )}
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
