// src/features/shares/components/SharedByMeTable.tsx
import { Link2, Trash2, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SharedByMeItem } from "../types/share.types";
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
  items: SharedByMeItem[];
  count: number;
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
  onOpen: (id: string) => void;
  onCopyLink: (id: string, name: string) => void;
  onRemove: (id: string, name: string) => void;
  onReport: (id: string, name: string) => void;
  onAppeal: (id: string, name: string) => void;
}

export function SharedByMeTable({
                                  items,
                                  count,
                                  page,
                                  totalPages,
                                  onPage,
                                  onCopyLink,
                                  onRemove,
                                  onAppeal,
                                }: Props) {
  return (<>
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-bold">
          Tôi đã chia sẻ
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          {count}
        </span>
        </h2>
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[1fr_220px_160px_44px] items-center px-4 h-11 bg-muted/40 rounded-t-xl text-xs font-semibold text-muted-foreground">
                <div>Tên tài liệu</div>
                <div>Chia sẻ với</div>
                <div>Thời gian</div>
                <div />
              </div>
              {count === 0 ? (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    Không có mục nào
                  </div>
              ) : (
                  items.map((it, i) => (
                      <div
                          key={it.id}
                          className={cn(
                              "grid grid-cols-[1fr_220px_160px_44px] items-center px-4 py-3 hover:bg-muted/30 transition-colors",
                              i !== items.length - 1 && "border-b border-border",
                          )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <ItemIcon isDocument={!!it.documentId} />
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
                                    {[
                                      it.documentId && it.folderName ? it.folderName : null,
                                      it.subjectName,
                                      it.semesterName,
                                      it.size,
                                    ].filter(Boolean).join(" · ") || "—"}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs break-all">
                                    {[
                                      it.documentId && it.folderName ? `Folder: ${it.folderName}` : null,
                                      it.subjectName ? `Subject: ${it.subjectName}` : null,
                                      it.semesterName ? `Semester: ${it.semesterName}` : null,
                                      it.size ? `Size: ${it.size}` : null,
                                    ].filter(Boolean).join(" · ") || "—"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          {it.sharedWith[0] && (
                              <PersonAvatar person={it.sharedWith[0]} />
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-sm truncate cursor-help">
                                  {it.sharedWith[0]?.name ?? "—"}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{it.sharedWith.map(w => w.name).join(", ") || "—"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {it.sharedWith.length > 1 && (
                              <span className="text-xs font-medium text-muted-foreground shrink-0">
                        +{it.sharedWith.length - 1}
                      </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-nowrap">{it.time}</div>
                        <RowMenu
                            items={[
                              {
                                icon: <Link2 className="h-4 w-4" />,
                                label: "Sao chép link",
                                onClick: () => onCopyLink(it.id, it.name),
                              },
                              ...(it.documentId && it.documentStatus === "BANNED" ? [{
                                icon: <Flag className="h-4 w-4" />,
                                label: "Kháng cáo",
                                onClick: () => onAppeal(it.id, it.name),
                              }] : []),
                              {
                                icon: <Trash2 className="h-4 w-4" />,
                                label: "Xóa",
                                danger: true,
                                onClick: () => onRemove(it.id, it.name),
                              },
                            ]}
                        />
                      </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
        <Pager page={page} totalPages={totalPages} onChange={onPage} />
      </section>
    </>
  );
}
