import { useCallback, useSyncExternalStore } from "react";
//#region src/lib/preferences.ts
function createIdSetStore(storageKey) {
	let ids = /* @__PURE__ */ new Set();
	const listeners = /* @__PURE__ */ new Set();
	function load() {
		if (typeof window === "undefined") return;
		try {
			const raw = window.localStorage.getItem(storageKey);
			ids = new Set(raw ? JSON.parse(raw) : []);
		} catch {
			ids = /* @__PURE__ */ new Set();
		}
	}
	load();
	function persist() {
		try {
			window.localStorage.setItem(storageKey, JSON.stringify(Array.from(ids)));
		} catch {}
		listeners.forEach((l) => l());
	}
	return {
		getSnapshot: () => ids,
		subscribe: (cb) => {
			listeners.add(cb);
			return () => listeners.delete(cb);
		},
		has: (id) => ids.has(id),
		toggle: (id) => {
			const next = new Set(ids);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			ids = next;
			persist();
		}
	};
}
var starredFoldersStore = createIdSetStore("ai-study-hub:starred-folders");
var pinnedDocumentsStore = createIdSetStore("ai-study-hub:pinned-documents");
var starredSharedDocumentsStore = createIdSetStore("ai-study-hub:starred-shared-documents");
function useIdSet(store) {
	const ids = useSyncExternalStore(store.subscribe, store.getSnapshot, () => /* @__PURE__ */ new Set());
	return {
		ids,
		isMarked: useCallback((id) => ids.has(String(id)), [ids]),
		toggle: useCallback((id) => store.toggle(String(id)), [])
	};
}
/** Star/unstar a folder. Starred folders sort to the top of folder lists. */
function useStarredFolders() {
	return useIdSet(starredFoldersStore);
}
/** Pin/unpin a document. Pinned documents sort to the top of file lists. */
function usePinnedDocuments() {
	return useIdSet(pinnedDocumentsStore);
}
/** Star/unstar an item in "Shared with me". Starred items sort to the top. */
function useStarredSharedDocuments() {
	return useIdSet(starredSharedDocumentsStore);
}
//#endregion
export { useStarredFolders as n, useStarredSharedDocuments as r, usePinnedDocuments as t };
