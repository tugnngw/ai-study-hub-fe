import { a as folderApi, c as shareApi, i as flashcardApi, l as summaryApi, o as quizApi, r as documentApi, s as ragApi } from "./realApi-BJn2M0sE.js";
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
		queryFn: async () => {
			try {
				return await documentApi.listByFolder(folderId);
			} catch (err) {
				const status = err.status;
				if (status === 401 || status === 403) {
					console.log("[useDocumentsByFolder] Owner folder access failed, falling back to shared documents");
					return (await shareApi.listSharedWithMe()).filter((share) => share.folderId === folderId && share.documentId).map((share) => ({
						id: share.documentId,
						ownerId: share.ownerId,
						folderId: share.folderId,
						title: share.documentTitle || "Untitled Document",
						description: null,
						summary: null,
						status: "READY",
						cloudinaryUrl: share.cloudinaryUrl,
						publicId: null,
						mimeType: null,
						subjectId: null,
						createdAt: share.createdAt,
						updatedAt: share.createdAt
					}));
				}
				throw err;
			}
		},
		enabled: !!folderId
	});
}
function useDocument(id) {
	const enabled = !!id;
	console.log("[TRACE-4] useDocument id:", id, "enabled:", enabled);
	return useQuery({
		queryKey: docKeys.detail(id),
		queryFn: async () => {
			console.log("[TRACE-5] queryFn executing for id:", id);
			try {
				return await documentApi.getById(id);
			} catch (err) {
				const status = err.status;
				if (status === 401 || status === 403) {
					console.log("[useDocument] Owner fetch failed, trying shared endpoint");
					return documentApi.getSharedById(id);
				}
				throw err;
			}
		},
		enabled,
		refetchInterval: (query) => {
			if (query.state.data?.status === "PROCESSING") {
				console.log("[Polling] Document is processing, polling every 3s");
				return 3e3;
			}
			return false;
		},
		refetchOnWindowFocus: (query) => {
			return query.state.data?.status === "PROCESSING";
		}
	});
}
function useUploadDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			const docs = await documentApi.upload(input);
			await Promise.all(docs.map((doc) => ragApi.processDocument(doc.id)));
			return docs;
		},
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
function useReportDocument() {
	return useMutation({ mutationFn: (input) => shareApi.report(input) });
}
function useAskRag() {
	return useMutation({ mutationFn: (input) => ragApi.ask(input) });
}
function useGenerateSummary() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => summaryApi.generate(input),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["summaries"] });
		}
	});
}
var quizKeys = { byDocument: (docId) => [
	"quiz",
	"document",
	docId
] };
function useGenerateQuiz() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => quizApi.generate(input),
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ["quizzes"] });
			if (data?.id != null) qc.invalidateQueries({ queryKey: quizKeys.byDocument(String(data.id)) });
		}
	});
}
function useGenerateFlashcards() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => flashcardApi.generate(input),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["flashcards"] });
		}
	});
}
//#endregion
export { useSharedDocuments as _, useDocument as a, useUploadDocument as b, useDownloadDocument as c, useFolders as d, useGenerateFlashcards as f, useRestoreFromTrash as g, useReportDocument as h, useDeleteFolder as i, useEmptyTrash as l, useGenerateSummary as m, useCreateFolder as n, useDocuments as o, useGenerateQuiz as p, useDeleteDocument as r, useDocumentsByFolder as s, useAskRag as t, useFolder as u, useTrash as v, useUpdateFolder as y };
