import { r as tokenStore } from "./api-DeanpG7g.js";
import { a as folderApi, c as semesterApi, d as summaryApi, i as flashcardApi, l as shareApi, o as quizApi, r as documentApi, s as ragApi, u as subjectApi } from "./realApi-NTBAiS1o.js";
import { t as paymentApi } from "./paymentApi-BWfabZn7.js";
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
function useAskRag() {
	return useMutation({ mutationFn: (input) => ragApi.ask(input) });
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
			if (data?.id != null) qc.invalidateQueries({ queryKey: quizKeys.byDocument(data.id) });
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
export { useSharedDocuments as C, useUpdateFolder as D, useUpdateDocument as E, useUploadDocument as O, useShareFolder as S, useTrash as T, useOwnedShares as _, useDeleteFolder as a, useRestoreFromTrash as b, useDocumentsByFolder as c, useFolder as d, useFolders as f, useMySubscription as g, useGenerateSummary as h, useDeleteDocument as i, useDownloadDocument as l, useGenerateQuiz as m, useCreateFolder as n, useDocument as o, useGenerateFlashcards as p, useDashboard as r, useDocuments as s, useAskRag as t, useEmptyTrash as u, usePlans as v, useSubjectsBySemester as w, useSemesters as x, useReportDocument as y };
