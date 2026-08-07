// src/features/shares/components/SharedWithMeTable.tsx
import { useState } from "react";
import { FolderOpen, Download, Trash2, Star, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useStarredSharedDocuments } from "@/lib/preferences";
import { ReportDocumentDialog } from "@/components/report-document-dialog";
import type { SharedWithMeItem } from "../types/share.types";
import { ItemIcon } from "./ItemIcon";
import { PersonAvatar } from "./PersonAvatar";
import { RowMenu } from "./RowMenu";
import { Pager } from "./Pager";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  items: SharedWithMeItem[];
  count: number;
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
  onOpen: (id: string) => void;
  onDownload: (id: string, name: string) => void;
  onRemove: (id: string, name: string) => void;
}

export function SharedWithMeTable({
                                    items,
                                    count,
                                    page,
                                    totalPages,
                                    onPage,
                                    onOpen,
                                    onDownload,
                                    onRemove,
                                  }: Props) {
  const { isMarked: isStarred, toggle: toggleStar } =
      useStarredSharedDocuments();
  const sortedItems = [...items].sort(
      (a, b) => Number(isStarred(b.id)) - Number(isStarred(a.id)),
  );
  const [reportDocId, setReportDocId] = useState("");
  const [reportDocTitle, setReportDocTitle] = useState("");
  return (<>
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-bold">
          Được chia sẻ với tôi
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          {count}
        </span>
        </h2>
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid grid-cols-[28px_1fr_220px_160px_44px] items-center px-4 h-11 bg-muted/40 rounded-t-xl text-xs font-semibold text-muted-foreground">
                <div />
                <div>Tên tài liệu</div>
                <div>Được chia sẻ bởi</div>
                <div>Thời gian</div>
                <div />
              </div>
              {count === 0 ? (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    Không có mục nào
                  </div>
              ) : (
                  sortedItems.map((it, i) => {
                    const starred = isStarred(it.id);
                    const metadata = [
                      it.isDocument && it.folderName ? it.folderName : null,
                      it.subjectName,
                      it.semesterName,
                      it.size,
                    ].filter(Boolean).join(" · ") || "—";
                    return (
                        <div
                            key={it.id}
                            className={cn(
                                "grid grid-cols-[28px_1fr_220px_160px_44px] items-center px-4 py-3 hover:bg-muted/30 transition-colors",
                                i !== sortedItems.length - 1 && "border-b border-border",
                            )}
                        >
                          <button
                              type="button"
                              onClick={() => toggleStar(it.id)}
                              title={starred ? "Bỏ gắn sao" : "Gắn sao"}
                              className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent shrink-0"
                          >
                            <Star
                                className={cn(
                                    "h-4 w-4",
                                    starred && "fill-amber-400 text-amber-500",
                                )}
                            />
                          </button>
                          <div className="flex items-center gap-3 min-w-0">
                            <ItemIcon isDocument={it.isDocument} />
                            <div className="min-w-0 flex-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="font-medium truncate cursor-help">{it.name}</div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{it.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="text-xs text-muted-foreground truncate cursor-help">
                                      {metadata}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs break-all">{metadata}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <PersonAvatar person={it.sharedBy} />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-sm truncate cursor-help">{it.sharedBy.name}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{it.sharedBy.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="text-sm text-muted-foreground whitespace-nowrap">{it.time}</div>
                          <RowMenu
                              items={[
                                {
                                  icon: <FolderOpen className="h-4 w-4" />,
                                  label: "Mở",
                                  onClick: () => onOpen(it.id),
                                },
                                {
                                  icon: <Download className="h-4 w-4" />,
                                  label: "Tải xuống",
                                  onClick: () => onDownload(it.id, it.name),
                                },
                                ...(it.isDocument && it.documentId ? [{
                                  icon: <Flag className="h-4 w-4" />,
                                  label: "Báo cáo",
                                  onClick: () => {
                                    setReportDocId(it.documentId!);
                                    setReportDocTitle(it.name);
                                  },
                                }] : []),
                                {
                                  icon: <Trash2 className="h-4 w-4" />,
                                  label: "Xóa",
                                  danger: true,
                                  onClick: () => onRemove(it.id, it.name),
                                },
                                {
                                  icon: (
                                      <Star
                                          className={cn(
                                              "h-4 w-4",
                                              starred && "fill-amber-400 text-amber-500",
                                          )}
                                      />
                                  ),
                                  label: starred ? "Bỏ gắn sao" : "Gắn sao",
                                  onClick: () => toggleStar(it.id),
                                },
                              ]}
                          />
                        </div>
                    );
                  })
              )}
            </div>
          </CardContent>
        </Card>
        <Pager page={page} totalPages={totalPages} onChange={onPage} />
      </section>
      <ReportDocumentDialog
        open={!!reportDocId}
        onOpenChange={(v) => { if (!v) { setReportDocId(""); setReportDocTitle(""); } }}
        documentId={reportDocId}
        documentTitle={reportDocTitle}
      />
    </>
  );
}
