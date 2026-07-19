// src/lib/preferences.ts
// Lightweight, persisted "starred folders" / "pinned documents" state.
// Stored in localStorage and shared across components via a tiny pub-sub
// store (no backend field exists for this yet, so it lives on the client).

import { useSyncExternalStore, useCallback } from "react";

function createIdSetStore(storageKey: string) {
  let ids: Set<string> = new Set();
  const listeners = new Set<() => void>();

  function load() {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      ids = new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      ids = new Set();
    }
  }
  load();

  function persist() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(Array.from(ids)));
    } catch {
      // ignore quota / SSR errors
    }
    listeners.forEach((l) => l());
  }

  return {
    getSnapshot: () => ids,
    subscribe: (cb: () => void) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    has: (id: string) => ids.has(id),
    toggle: (id: string) => {
      const next = new Set(ids);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      ids = next;
      persist();
    },
  };
}

const starredFoldersStore = createIdSetStore("ai-study-hub:starred-folders");
const pinnedDocumentsStore = createIdSetStore("ai-study-hub:pinned-documents");
const starredSharedDocumentsStore = createIdSetStore(
  "ai-study-hub:starred-shared-documents",
);

function useIdSet(store: ReturnType<typeof createIdSetStore>) {
  const ids = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => new Set<string>(),
  );
<<<<<<< HEAD
  const isMarked = useCallback((id: string | number) => ids.has(String(id)), [ids]);
  const toggle = useCallback((id: string | number) => store.toggle(String(id)), []);
=======
  const isMarked = useCallback(
    (id: string | number) => ids.has(String(id)),
    [ids],
  );
  const toggle = useCallback(
    (id: string | number) => store.toggle(String(id)),
    [],
  );
>>>>>>> origin/Flashcars
  return { ids, isMarked, toggle };
}

/** Star/unstar a folder. Starred folders sort to the top of folder lists. */
export function useStarredFolders() {
  return useIdSet(starredFoldersStore);
}

/** Pin/unpin a document. Pinned documents sort to the top of file lists. */
export function usePinnedDocuments() {
  return useIdSet(pinnedDocumentsStore);
}

/** Star/unstar an item in "Shared with me". Starred items sort to the top. */
export function useStarredSharedDocuments() {
  return useIdSet(starredSharedDocumentsStore);
}
