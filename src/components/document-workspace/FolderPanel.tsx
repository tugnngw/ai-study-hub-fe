import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { UseQueryResult } from "@tanstack/react-query";
import { statusLabel } from "@/lib/document-status";

export function FolderPanel({
                                folderId,
                                docId,
                                folder,
                                folderDocs,
                            }: {
    folderId: string;
    docId?: string;
    folder: UseQueryResult<any>;
    folderDocs: UseQueryResult<any>;
}) {
    return (
        <aside className="hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft">
            {!docId && (
                <div className="rounded-xl bg-gradient-soft p-3 border border-border/50">
                    <div className="text-sm font-semibold font-display truncate">
                        {folder.data?.name || "Thư mục"}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                        {folderDocs.data?.length || 0} tài liệu
                    </div>
                </div>
            )}

            <div className="mt-5 flex-1 min-h-0 flex flex-col">
                <div className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-2 px-1">
                    TÀI LIỆU ĐANG CÓ
                </div>
                <div className="space-y-1 overflow-y-auto flex-1 -mx-1 px-1">
                    {folderDocs.isLoading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-9 rounded-lg" />
                        ))}
                    {(folderDocs.data ?? [])
                        .filter((d: any) => d.status?.toUpperCase() !== 'BANNED')
                        .map((d: any) => {
                        const active = d.id === docId;
                        const s = d.status?.toUpperCase();
                        const showStatusIcon = s === 'COMPLETED' || s === 'REJECT';
                        return (
                            <div key={d.id} className="group relative">
                                <Link
                                    to="/folders/$id"
                                    params={{ id: String(folderId) }}
                                    search={{ docId: d.id }}
                                    className={cn(
                                        "flex items-center gap-2 text-sm px-2.5 py-2 rounded-lg transition-colors",
                                        active
                                            ? "bg-gradient-brand text-white font-medium shadow-soft"
                                            : "hover:bg-accent text-foreground/90",
                                        s === 'BANNED' && "opacity-50 cursor-not-allowed pointer-events-none",
                                    )}
                                    onClick={(e) => {
                                        if (s === 'REJECT') { e.preventDefault(); toast.error("Tài liệu đã bị từ chối"); }
                                    }}
                                >
                                    <FileText className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate flex-1">{d.title}</span>
                                    {showStatusIcon && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${s === 'COMPLETED' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                            {statusLabel(s)}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                    {!folderDocs.isLoading && (folderDocs.data ?? []).length === 0 && (
                        <div className="text-xs text-muted-foreground px-2">
                            Chưa có tài liệu
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}