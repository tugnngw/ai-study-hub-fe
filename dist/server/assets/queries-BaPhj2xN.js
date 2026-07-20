import { r as tokenStore, t as ApiError } from "./api-CR3oJcwy.js";
import { a as folderApi, c as ragApi, d as subjectApi, f as summaryApi, i as flashcardApi, l as semesterApi, o as quizApi, r as documentApi, s as quotaApi, u as shareApi } from "./realApi-3S4ICjaY.js";
import { t as paymentApi } from "./paymentApi-BI_SoyJ-.js";
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
		enabled: !!id
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
function useRagStatus(documentId) {
	return useQuery({
		queryKey: ["rag-status", documentId],
		queryFn: () => ragApi.status(documentId),
		enabled: !!documentId,
		refetchInterval: (query) => {
			if (query.state.data?.status === "PROCESSING") return 3e3;
			return false;
		}
	});
}
function useRagSession(documentId) {
	return useQuery({
		queryKey: ["rag-sessions", documentId],
		queryFn: () => ragApi.sessions(documentId),
		enabled: !!documentId
	});
}
function useRagSessionDetail(sessionId) {
	return useQuery({
		queryKey: ["rag-session", sessionId],
		queryFn: () => ragApi.sessionDetail(sessionId),
		enabled: !!sessionId
	});
}
function useDeleteRagSession() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (sessionId) => ragApi.deleteSession(sessionId),
		onSuccess: (_, sessionId) => {
			qc.invalidateQueries({ queryKey: ["rag-sessions"] });
		}
	});
}
function useRagChat() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => ragApi.chat(input),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["quota"] });
		}
	});
}
function useGenerateSummary() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => summaryApi.generate(input),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["summary"] });
			qc.invalidateQueries({ queryKey: ["quota"] });
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
			qc.invalidateQueries({ queryKey: ["quota"] });
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
function useQuota() {
	return useQuery({
		queryKey: ["quota"],
		queryFn: () => quotaApi.getDetails(),
		staleTime: 6e4
	});
}
function useGenerateFlashcards() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (input) => flashcardApi.generate(input),
		onSuccess: (_, input) => {
			qc.invalidateQueries({ queryKey: ["flashcards"] });
			qc.invalidateQueries({ queryKey: flashcardKeys.byDocument(input.documentId) });
			qc.invalidateQueries({ queryKey: ["quota"] });
		}
	});
}
function useMySubmittedReports() {
	return useQuery({
		queryKey: ["my-reports"],
		queryFn: () => shareApi.listMyReports()
	});
}
//#endregion
export { useSemesters as A, useQuota as C, useRagStatus as D, useRagSessionDetail as E, useSummary as F, useTrash as I, useUpdateDocument as L, useSharedDocuments as M, useSubjects as N, useReportDocument as O, useSubjectsBySemester as P, useUpdateFolder as R, useQuizByDocument as S, useRagSession as T, useMySubmittedReports as _, useDeleteRagSession as a, usePlans as b, useDocumentsByFolder as c, useFlashcardsByDocument as d, useFolder as f, useGenerateSummary as g, useGenerateQuiz as h, useDeleteFolder as i, useShareFolder as j, useRestoreFromTrash as k, useDownloadDocument as l, useGenerateFlashcards as m, useDashboard as n, useDocument as o, useFolders as p, useDeleteDocument as r, useDocuments as s, useCreateFolder as t, useEmptyTrash as u, useMySubscription as v, useRagChat as w, useProcessRag as x, useOwnedShares as y, useUploadDocument as z };
