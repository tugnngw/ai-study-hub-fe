import { Download, FileText, Loader2, RotateCw, Trash2, Upload } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { DocumentViewer } from "@/components/document-viewer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SummaryTab } from "./SummaryTab";
import { FlashcardsTab } from "./FlashcardsTab";
import { QuizzesTab } from "./QuizzesTab";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { UploadDialog } from "./DocumentWorkspace";

type Tab = "original" | "notes" | "summary" | "flashcards" | "quizzes";

export function ContentPanel({
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
                        // ✅ QUAN TRỌNG: Đã thêm className="flex-1 min-h-0 w-full h-full" vào đây
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
}