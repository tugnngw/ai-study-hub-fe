// src/features/shares/components/SharePage.tsx
// Trang Chia sẻ — lắp ráp từ hooks + component con (folder-only).
import { useState } from "react";
import { useShares, useShareActions } from "../hooks";
import { ShareToolbar, type ShareTabKey } from "./ShareToolbar";
import { SharedWithMeTable } from "./SharedWithMeTable";
import { SharedByMeTable } from "./SharedByMeTable";

export function SharePage() {
  const s = useShares();
  const [tab, setTab] = useState<ShareTabKey>("all");
  const actions = useShareActions({
    onRemovedWithMe: s.removeWithMeLocal,
    onRemovedByMe: s.removeByMeLocal,
<<<<<<< HEAD
<<<<<<< HEAD
=======
    onOpenInAI: (folderId) => {
      // Handle opening in AI with folderId
    },
>>>>>>> origin/Flashcars
=======
    onOpenInAI: (folderId) => {
      // Handle opening in AI with folderId
    },
>>>>>>> origin/final/demo-v1
  });

  const showWithMe = tab === "all" || tab === "with-me";
  const showByMe = tab === "all" || tab === "by-me";

<<<<<<< HEAD
<<<<<<< HEAD
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">Chia sẻ</h1>
=======
=======
>>>>>>> origin/final/demo-v1
  const handleOpenWithMe = (shareToken: string, savedFolderId?: string) => {
    actions.openInAI(shareToken, savedFolderId);
  };

  const handleOpenByMe = (shareToken: string, savedFolderId?: string) => {
    actions.openInAI(shareToken, savedFolderId);
  };

  return (
<<<<<<< HEAD
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Chia sẻ
        </h1>
>>>>>>> origin/Flashcars
        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý tài liệu bạn được chia sẻ và những tài liệu bạn đã chia sẻ
        </p>
      </div>

      <ShareToolbar
<<<<<<< HEAD
        q={s.q} onQ={s.setQ}
        sort={s.sort} onSort={s.setSort}
        tab={tab} onTab={setTab}
=======
        q={s.q}
        onQ={s.setQ}
        sort={s.sort}
        onSort={s.setSort}
        tab={tab}
        onTab={setTab}
>>>>>>> origin/Flashcars
      />

      {showWithMe && (
        <SharedWithMeTable
          items={s.pagedWithMe}
          count={s.withMeCount}
          page={s.pageWithMe}
          totalPages={s.totalPagesWithMe}
          onPage={s.setPageWithMe}
<<<<<<< HEAD
          onOpen={actions.openInAI}
=======
          onOpen={(id) => {
            const item = s.pagedWithMe.find((it) => it.id === id);
            handleOpenWithMe(id, item?.savedFolderId);
          }}
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
          onOpen={actions.openInAI}
=======
          onOpen={(id) => {
            const item = s.pagedByMe.find((it) => it.id === id);
            handleOpenByMe(id, item?.savedFolderId);
          }}
>>>>>>> origin/Flashcars
          onCopyLink={actions.copyLink}
          onRemove={actions.removeByMe}
        />
      )}
    </div>
=======
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
                  const item = s.pagedWithMe.find((it) => it.id === id);
                  handleOpenWithMe(id, item?.savedFolderId);
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
                  const item = s.pagedByMe.find((it) => it.id === id);
                  handleOpenByMe(id, item?.savedFolderId);
                }}
                onCopyLink={actions.copyLink}
                onRemove={actions.removeByMe}
            />
        )}
      </div>
>>>>>>> origin/final/demo-v1
  );
}
