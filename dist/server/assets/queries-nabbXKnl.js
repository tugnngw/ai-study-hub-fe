import { i as tokenStore, n as ApiError } from "./api-DGaHVnww.js";
import { a as folderApi, c as semesterApi, d as summaryApi, i as flashcardApi, l as shareApi, o as quizApi, r as documentApi, s as ragApi, u as subjectApi } from "./realApi-D5l_6Aet.js";
import { t as paymentApi } from "./paymentApi-u5JyuPVW.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/lib/queries.ts
function usePlans() {
	return useQuery({
		queryKey: ["plans"],
		queryFn: () => paymentApi.getPlans(),
		staleTime: 3e4
	});
}
function useMySubscription() {
	return useQuery({
		queryKey: ["my-subscription"],
		queryFn: () => paymentApi.getMySubscription(),
		staleTime: 5e3,
		retry: false
	});
}
function useSemesters() {
	return useQuery({
		queryKey: ["semesters"],
		queryFn: () => semesterApi.list(),
		staleTime: 10 * 6e4
	});
}
function useSubjectsBySemester(semesterId) {
	return useQuery({
		queryKey: [
			"subjects",
			"semester",
			semesterId
		],
		queryFn: () => subjectApi.listBySemester(semesterId),
		enabled: !!semesterId,
		staleTime: 10 * 6e4
	});
}
function useSubjects() {
	return useQuery({
		queryKey: ["subjects", "all"],
		queryFn: async () => {
			const semesters = await semesterApi.list();
			return (await Promise.all(semesters.map((s) => subjectApi.listBySemester(s.id).catch(() => [])))).flat();
		},
		staleTime: 10 * 6e4
	});
}
function useDashboard() {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: async () => {
			const [folders, documents, semesters] = await Promise.all([
				folderApi.list().catch(() => []),
				documentApi.list().catch(() => []),
				semesterApi.list().catch(() => [])
			]);
			const subjectPromises = semesters.map((sem) => subjectApi.listBySemester(sem.id).catch(() => []));
			const allSubjects = (await Promise.all(subjectPromises)).flat();
			const docCountByFolder = {};
			documents.forEach((d) => {
				if (d.folderId != null) docCountByFolder[String(d.folderId)] = (docCountByFolder[String(d.folderId)] ?? 0) + 1;
			});
			return {
				recentNotes: [...folders].map((f) => ({
					...f,
					documentCount: f.documentCount ?? docCountByFolder[String(f.id)] ?? 0
				})).sort((a, b) => (b.updatedAt ?? b.createdAt ?? "").localeCompare(a.updatedAt ?? a.createdAt ?? "")).slice(0, 3),
				recentDocuments: [...documents].sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")).slice(0, 6),
				subjects: allSubjects,
				docCountBySubject: {}
			};
		},
		staleTime: 6e4
	});
}
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
		enabled: !!id
	});
}
function useCreateFolder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => folderApi.create(input),
		onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all }),
		onError: (error) => {
			console.error("[useCreateFolder] Error:", error);
			if (error instanceof ApiError && error.status === 401) {
				console.log("[useCreateFolder] 401 - session expired");
				tokenStore.clear();
				window.location.href = "/login";
			}
		}
	});
}
function useUpdateFolder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, ...body }) => folderApi.update(id, body),
		onSuccess: (_d, v) => {
			qc.invalidateQueries({ queryKey: folderKeys.all });
			qc.invalidateQueries({ queryKey: folderKeys.detail(v.id) });
		},
		onError: (error) => {
			console.error("[useUpdateFolder] Error:", error);
			if (error instanceof ApiError && error.status === 401) {
				console.log("[useUpdateFolder] 401 - session expired");
				tokenStore.clear();
				window.location.href = "/login";
			}
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
					console.log("[useDocumentsByFolder] Owner folder access failed, falling back to shared folder endpoint");
					return await documentApi.listSharedFolder(folderId);
				}
				throw err;
			}
		},
		enabled: !!folderId
	});
}
function useDocument(id) {
	return useQuery({
		queryKey: docKeys.detail(id),
		queryFn: async () => {
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
		enabled: !!id,
		refetchInterval: (query) => {
			if (query.state.data?.status === "PROCESSING") return 3e3;
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
			return await documentApi.upload(input);
		},
		onSuccess: (_d, v) => {
			qc.invalidateQueries({ queryKey: docKeys.all });
			if (v.folderId) qc.invalidateQueries({ queryKey: docKeys.byFolder(v.folderId) });
		}
	});
}
function useUpdateDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, ...body }) => documentApi.update(id, body),
		onSuccess: (_d, v) => {
			qc.invalidateQueries({ queryKey: docKeys.all });
			qc.invalidateQueries({ queryKey: docKeys.detail(v.id) });
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
			documentId: request.documentId,
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
function useReportDocument() {
	return useMutation({ mutationFn: (input) => shareApi.report(input) });
}
function useProcessRag() {
	return useMutation({ mutationFn: (documentId) => ragApi.process(documentId) });
}
function useRagChat() {
	return useMutation({ mutationFn: (input) => ragApi.chat(input) });
}
function useGenerateSummary() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => summaryApi.generate(input),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["summary"] });
		}
	});
}
function useSummary(documentId) {
	return useQuery({
		queryKey: ["summary", documentId],
		queryFn: () => summaryApi.getCached(documentId),
		enabled: !!documentId,
		staleTime: 6e4
	});
}
var quizKeys = { byDocument: (docId) => [
	"quiz",
	"document",
	docId
] };
function useQuizByDocument(documentId) {
	return useQuery({
		queryKey: quizKeys.byDocument(documentId),
		queryFn: () => quizApi.listByDocument(documentId),
		enabled: !!documentId
	});
}
function useGenerateQuiz() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => quizApi.generate(input),
		onSuccess: (_, input) => {
			qc.invalidateQueries({ queryKey: ["quizzes"] });
			qc.invalidateQueries({ queryKey: quizKeys.byDocument(input.documentId) });
		}
	});
}
var flashcardKeys = { byDocument: (docId) => [
	"flashcard",
	"document",
	docId
] };
function useFlashcardsByDocument(documentId) {
	return useQuery({
		queryKey: flashcardKeys.byDocument(documentId),
		queryFn: () => flashcardApi.listByDocument(documentId),
		enabled: !!documentId
	});
}
function useGenerateFlashcards() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => flashcardApi.generate(input),
		onSuccess: (_, input) => {
			qc.invalidateQueries({ queryKey: ["flashcards"] });
			qc.invalidateQueries({ queryKey: flashcardKeys.byDocument(input.documentId) });
		}
	});
}
//#endregion
export { useTrash as A, useRestoreFromTrash as C, useSubjects as D, useSharedDocuments as E, useUpdateFolder as M, useUploadDocument as N, useSubjectsBySemester as O, useReportDocument as S, useShareFolder as T, useOwnedShares as _, useDocument as a, useQuizByDocument as b, useDownloadDocument as c, useFolder as d, useFolders as f, useMySubscription as g, useGenerateSummary as h, useDeleteFolder as i, useUpdateDocument as j, useSummary as k, useEmptyTrash as l, useGenerateQuiz as m, useDashboard as n, useDocuments as o, useGenerateFlashcards as p, useDeleteDocument as r, useDocumentsByFolder as s, useCreateFolder as t, useFlashcardsByDocument as u, usePlans as v, useSemesters as w, useRagChat as x, useProcessRag as y };
