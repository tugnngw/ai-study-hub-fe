import { a as ragApi, c as tokenStore, i as folderApi, o as shareApi, r as documentApi } from "./realApi-DdsVabnO.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/lib/queries.ts
var folderKeys = {
	all: ["folders"],
	detail: (id) => ["folders", id]
};
function useFolders() {
	return useQuery({
		queryKey: folderKeys.all,
		queryFn: () => folderApi.list()
	});
}
function useFolder(id) {
	return useQuery({
		queryKey: folderKeys.detail(id),
		queryFn: () => folderApi.getById(id),
		enabled: !!id && id > 0
	});
}
function useCreateFolder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => folderApi.create(input),
		onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all })
	});
}
function useUpdateFolder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, ...body }) => folderApi.update(id, body),
		onSuccess: (_d, v) => {
			qc.invalidateQueries({ queryKey: folderKeys.all });
			qc.invalidateQueries({ queryKey: folderKeys.detail(v.id) });
		}
	});
}
function useDeleteFolder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => folderApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all })
	});
}
var docKeys = {
	all: ["documents"],
	byFolder: (folderId) => [
		"documents",
		"folder",
		folderId
	],
	detail: (id) => ["documents", id],
	trash: ["documents", "trash"]
};
function useDocuments() {
	return useQuery({
		queryKey: docKeys.all,
		queryFn: () => documentApi.list()
	});
}
function useDocumentsByFolder(folderId) {
	return useQuery({
		queryKey: docKeys.byFolder(folderId),
		queryFn: () => documentApi.listByFolder(folderId),
		enabled: !!folderId
	});
}
function useDocument(id) {
	const enabled = !!id;
	console.log("[TRACE-4] useDocument id:", id, "enabled:", enabled);
	return useQuery({
		queryKey: docKeys.detail(id),
		queryFn: () => {
			console.log("[TRACE-5] queryFn executing for id:", id);
			return documentApi.getById(id);
		},
		enabled,
		refetchInterval: (query) => {
			if (query.state.data?.status === "processing") {
				console.log("[Polling] Document is processing, polling every 3s");
				return 3e3;
			}
			return false;
		},
		refetchOnWindowFocus: (query) => {
			return query.state.data?.status === "processing";
		}
	});
}
function useUploadDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => documentApi.upload(input),
		onSuccess: (_d, v) => {
			qc.invalidateQueries({ queryKey: docKeys.all });
			if (v.folderId) qc.invalidateQueries({ queryKey: docKeys.byFolder(v.folderId) });
		}
	});
}
function useDeleteDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => documentApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all })
	});
}
function useDownloadDocument() {
	return useMutation({ mutationFn: (id) => documentApi.getDownloadUrl(id) });
}
function useTrash() {
	return useQuery({
		queryKey: docKeys.trash,
		queryFn: () => documentApi.listTrash()
	});
}
function useRestoreFromTrash() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => documentApi.restoreFromTrash(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: docKeys.trash });
			qc.invalidateQueries({ queryKey: docKeys.all });
		}
	});
}
function useEmptyTrash() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => documentApi.emptyTrash(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: docKeys.trash });
		}
	});
}
var sharedKeys = {
	all: ["shared"],
	owned: ["shared-owned"],
	info: (docId) => ["share-info", docId]
};
function useSharedDocuments() {
	return useQuery({
		queryKey: sharedKeys.all,
		queryFn: () => shareApi.listSharedWithMe()
	});
}
function useOwnedShares() {
	return useQuery({
		queryKey: sharedKeys.owned,
		queryFn: () => shareApi.listOwned(),
		enabled: !!tokenStore.get()
	});
}
function useShareFolder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (request) => shareApi.shareFolder({
			folderId: request.folderId,
			username: request.username,
			email: request.email,
			visibility: "private"
		}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: sharedKeys.all });
			qc.invalidateQueries({ queryKey: sharedKeys.owned });
		}
	});
}
function useDeleteSharedDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (shareId) => shareApi.removeShare(shareId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: sharedKeys.all });
			qc.invalidateQueries({ queryKey: sharedKeys.owned });
		}
	});
}
function useSaveSharedDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => {
			console.log("useSaveSharedDocument called:", input);
			return Promise.resolve({});
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: docKeys.all });
		}
	});
}
function useReportDocument() {
	return useMutation({ mutationFn: (input) => shareApi.report(input) });
}
function useAskRag() {
	return useMutation({ mutationFn: (input) => ragApi.ask(input) });
}
//#endregion
export { useShareFolder as _, useDeleteSharedDocument as a, useUpdateFolder as b, useDocumentsByFolder as c, useFolder as d, useFolders as f, useSaveSharedDocument as g, useRestoreFromTrash as h, useDeleteFolder as i, useDownloadDocument as l, useReportDocument as m, useCreateFolder as n, useDocument as o, useOwnedShares as p, useDeleteDocument as r, useDocuments as s, useAskRag as t, useEmptyTrash as u, useSharedDocuments as v, useUploadDocument as x, useTrash as y };
