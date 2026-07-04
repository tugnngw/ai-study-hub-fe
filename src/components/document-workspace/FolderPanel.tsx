import { FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { UseQueryResult } from "@tanstack/react-query";

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
                    <div className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1">
                        THƯ MỤC: {folder.data?.name || "—"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
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
                    {(folderDocs.data ?? []).map((d: any) => {
                        const active = d.id === docId;
                        return (
                            <Link
                                key={d.id}
                                to="/folders/$id"
                                params={{ id: String(folderId) }}
                                search={{ docId: d.id }}
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
                        <div className="text-xs text-muted-foreground px-2">
                            Chưa có tài liệu
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}