// src/features/shares/components/SharePage.tsx
// Trang Chia sẻ — lắp ráp từ hooks + component con (folder-only).
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useShares, useShareActions } from "../hooks";
import { ShareToolbar, type ShareTabKey } from "./ShareToolbar";
import { SharedWithMeTable } from "./SharedWithMeTable";
import { SharedByMeTable } from "./SharedByMeTable";

export function SharePage() {
  const s = useShares();
  const [tab, setTab] = useState<ShareTabKey>("all");
  const navigate = useNavigate();
  const actions = useShareActions({
    onRemovedWithMe: s.removeWithMeLocal,
    onRemovedByMe: s.removeByMeLocal,
    onOpenInAI: (folderId) => {
      // Handle opening in AI with folderId
    },
  });

  const showWithMe = tab === "all" || tab === "with-me";
  const showByMe = tab === "all" || tab === "by-me";

  const handleOpenWithMe = (shareToken: string) => {
    navigate({
      to: "/shared/$shareId",
      params: { shareId: shareToken },
    });
  };

  const handleOpenByMe = (shareToken: string) => {
    navigate({
      to: "/shared/$shareId",
      params: { shareId: shareToken },
    });
  };

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Chia sẻ
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Quản lý tài liệu bạn được chia sẻ và những tài liệu bạn đã chia sẻ
          </p>
        </div>

        <ShareToolbar
            q={s.q}
            onQ={s.setQ}
            sort={s.sort}
            onSort={s.setSort}
            tab={tab}
            onTab={setTab}
        />

        {showWithMe && (
            <SharedWithMeTable
                items={s.pagedWithMe}
                count={s.withMeCount}
                page={s.pageWithMe}
                totalPages={s.totalPagesWithMe}
                onPage={s.setPageWithMe}
                onOpen={(id) => {
                  handleOpenWithMe(id);
                }}
                onDownload={actions.download}
                onRemove={actions.removeWithMe}
            />
        )}

        {showByMe && (
            <SharedByMeTable
                items={s.pagedByMe}
                count={s.byMeCount}
                page={s.pageByMe}
                totalPages={s.totalPagesByMe}
                onPage={s.setPageByMe}
                onOpen={(id) => {
                  handleOpenByMe(id);
                }}
                onCopyLink={actions.copyLink}
                onRemove={actions.removeByMe}
            />
        )}
      </div>
  );
}
