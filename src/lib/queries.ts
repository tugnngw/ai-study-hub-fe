// src/lib/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "@/features/admin/services/paymentApi";
import {
  accountApi,
  authApi,
  documentApi,
  flashcardApi,
  folderApi,
  quizApi,
  quotaApi,
  ragApi,
  semesterApi,
  shareApi,
  subjectApi,
  summaryApi,
} from "./realApi";
import { tokenStore, ApiError } from "./api";
import type {
  Document,
  Folder,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  CreateFolderRequest,
  UpdateFolderRequest,
  AskRequest,
  ReportDocumentRequest,
  GenerateSummaryRequest,
  GenerateSummaryResponse,
  GenerateFlashcardsRequest,
  GenerateQuizRequest,
  FlashcardResponse,
  QuizResponse,
  RagStatusResponse,
  ReportResponse,
} from "./types";

function handleAccountLockedError(error: unknown): boolean {
  if (error instanceof ApiError && error.status === 403) {
    const data = error.data as any;
    if (data?.accountLocked === true || data?.error === "ACCOUNT_LOCKED") {
      if (typeof window !== "undefined") {
        alert("Tài khoản của bạn đã bị khóa bởi quản trị viên.");
        window.location.href = "/login";
      }
      return true;
    }
  }
  return false;
}

// ================================================================
// AUTH
// ================================================================

export function useLogin() {
  return useMutation({
    mutationFn: (input: { username: string; password: string }) =>
      authApi.login(input),
    onError: (error) => {
      handleAccountLockedError(error);
    }
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (input: Parameters<typeof authApi.register>[0]) =>
      authApi.register(input),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => qc.clear(),
  });
}

// ================================================================
// ACCOUNT
// ================================================================

export function useCurrentUser() {
  return useQuery({
    queryKey: ["account", "me"],
    queryFn: () => accountApi.me(),
    staleTime: 5 * 60_000,
    retry: false,
  });
}

// ================================================================
// PLANS
// ================================================================

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: () => paymentApi.getPlans(),
    staleTime: 30_000,
  });
}

export function useMySubscription() {
  return useQuery({
    queryKey: ["my-subscription"],
    queryFn: () => paymentApi.getMySubscription(),
    staleTime: 5_000, // 5s
    retry: false,
  });
}

// ================================================================
// SEMESTER
// ================================================================

export function useSemesters() {
  return useQuery({
    queryKey: ["semesters"],
    queryFn: () => semesterApi.list(),
    staleTime: 10 * 60_000,
  });
}

// ================================================================
// SUBJECT
// ================================================================

export function useSubjectsBySemester(semesterId: string) {
  return useQuery({
    queryKey: ["subjects", "semester", semesterId],
    queryFn: () => subjectApi.listBySemester(semesterId),
    enabled: !!semesterId,
    staleTime: 10 * 60_000,
  });
}

// Backward compat: deprecated, use useSubjectsBySemester
// Fetches all semesters → subjects for each → flattens
export function useSubjects() {
  return useQuery({
    queryKey: ["subjects", "all"],
    queryFn: async () => {
      const semesters = await semesterApi.list();
      const results = await Promise.all(
        semesters.map((s) =>
          subjectApi.listBySemester(s.id).catch(() => [] as never[])
        )
      );
      return results.flat();
    },
    staleTime: 10 * 60_000,
  });
}

// ================================================================
// DASHBOARD (backward compat until phase 2 rewrite)
// ================================================================

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [folders, documents, semesters] = await Promise.all([
        folderApi.list().catch(() => []),
        documentApi.list().catch(() => []),
        semesterApi.list().catch(() => []),
      ]);

      // Build subject list from all semesters
      const subjectPromises = semesters.map((sem) =>
        subjectApi.listBySemester(sem.id).catch(() => [] as never[])
      );
      const subjectArrays = await Promise.all(subjectPromises);
      const allSubjects = subjectArrays.flat();

      // Count docs by folder (since Document no longer has subjectId)
      const docCountByFolder: Record<string, number> = {};
      documents.forEach((d) => {
        if (d.folderId != null) {
          docCountByFolder[String(d.folderId)] =
            (docCountByFolder[String(d.folderId)] ?? 0) + 1;
        }
      });

      const recentNotes = [...folders]
        .map((f) => ({
          ...f,
          documentCount: f.documentCount ?? docCountByFolder[String(f.id)] ?? 0,
        }))
        .sort((a, b) =>
          (b.updatedAt ?? b.createdAt ?? "").localeCompare(
            a.updatedAt ?? a.createdAt ?? "",
          ),
        )
        .slice(0, 3);

      const recentDocuments = [...documents]
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        .slice(0, 6);

      return {
        recentNotes,
        recentDocuments,
        subjects: allSubjects,
        docCountBySubject: {} as Record<string, number>,
      };
    },
    staleTime: 60_000,
  });
}

export const folderKeys = {
  all: ["folders"] as const,
  detail: (id: string) => ["folders", id] as const,
};

export function useFolders() {
  return useQuery({
    queryKey: folderKeys.all,
    queryFn: () => folderApi.list(),
  });
}

export function useFolder(id: string) {
  return useQuery({
    queryKey: folderKeys.detail(id),
    queryFn: () => folderApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateFolderRequest) => folderApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all }),
    onError: (error: unknown) => {
      console.error("[useCreateFolder] Error:", error);
      if (error instanceof ApiError && error.status === 401) {
        console.log("[useCreateFolder] 401 - session expired");
        tokenStore.clear();
        window.location.href = "/login";
      }
    },
  });
}

export function useUpdateFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string } & UpdateFolderRequest) =>
      folderApi.update(id, body),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: folderKeys.all });
      qc.invalidateQueries({ queryKey: folderKeys.detail(v.id) });
    },
    onError: (error: unknown) => {
      console.error("[useUpdateFolder] Error:", error);
      if (error instanceof ApiError && error.status === 401) {
        console.log("[useUpdateFolder] 401 - session expired");
        tokenStore.clear();
        window.location.href = "/login";
      }
    },
  });
}

export function useDeleteFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => folderApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all }),
  });
}

// ================================================================
// DOCUMENT
// ================================================================

export const docKeys = {
  all: ["documents"] as const,
  byFolder: (folderId: string) => ["documents", "folder", folderId] as const,
  detail: (id: string) => ["documents", id] as const,
  trash: ["documents", "trash"] as const,
};

export function useDocuments() {
  return useQuery({
    queryKey: docKeys.all,
    queryFn: () => documentApi.list(),
  });
}

export function useDocumentsByFolder(folderId: string) {
  return useQuery({
    queryKey: docKeys.byFolder(folderId),
    queryFn: async () => {
      try {
        return await documentApi.listByFolder(folderId);
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        if (status === 401 || status === 403) {
          console.log("[useDocumentsByFolder] Owner folder access failed, falling back to shared folder endpoint");
          return await documentApi.listSharedFolder(folderId);
        }
        throw err;
      }
    },
    enabled: !!folderId,
  });
}

export function useDocument(id: string) {
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: async () => {
      try {
        return await documentApi.getById(id);
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        if (status === 401 || status === 403) {
          console.log("[useDocument] Owner fetch failed, trying shared endpoint");
          return documentApi.getSharedById(id);
        }
        throw err;
      }
    },
    enabled: !!id,
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UploadDocumentRequest) => {
      const docs = await documentApi.upload(input);
      return docs;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      if (v.folderId)
        qc.invalidateQueries({ queryKey: docKeys.byFolder(v.folderId) });
    },
  });
}

export function useUpdateDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string } & UpdateDocumentRequest) =>
      documentApi.update(id, body),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      qc.invalidateQueries({ queryKey: docKeys.detail(v.id) });
    },
  });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: (id: string) => documentApi.getDownloadUrl(id),
  });
}

// ================================================================
// TRASH
// ================================================================

export function useTrash() {
  return useQuery({
    queryKey: docKeys.trash,
    queryFn: () => documentApi.listTrash(),
  });
}

export function useRestoreFromTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentApi.restoreFromTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
      qc.invalidateQueries({ queryKey: docKeys.all });
    },
  });
}

export function useEmptyTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentApi.emptyTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
  });
}

export function useFolderTrash() {
  return useQuery({
    queryKey: ["folders", "trash"],
    queryFn: () => folderApi.listTrash(),
  });
}

export function useRestoreFolderFromTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => folderApi.restoreFromTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders", "trash"] });
      qc.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}

export function usePermanentDeleteFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => folderApi.permanentDelete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders", "trash"] });
    },
  });
}

// ================================================================
// SHARE
// ================================================================

export const sharedKeys = {
  all: ["shared"] as const,
  owned: ["shared-owned"] as const,
  info: (docId: string) => ["share-info", docId] as const,
};

export function useSharedDocuments() {
  return useQuery({
    queryKey: sharedKeys.all,
    queryFn: () => shareApi.listSharedWithMe(),
  });
}

export function useOwnedShares() {
  return useQuery({
    queryKey: sharedKeys.owned,
    queryFn: () => shareApi.listOwned(),
    enabled: !!tokenStore.get(),
  });
}

export function useShareFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (request: {
      folderId?: string;
      documentId?: string;
      username?: string;
      email?: string;
    }) =>
        shareApi.shareFolder({
          folderId: request.folderId,
          documentId: request.documentId,
          username: request.username,
          email: request.email,
          visibility: "private",
        }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sharedKeys.all });
      qc.invalidateQueries({ queryKey: sharedKeys.owned });
    },
  });
}

export function useShareDocument() {
  return useShareFolder();
}

export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (shareId: string) => shareApi.removeShare(shareId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sharedKeys.all });
      qc.invalidateQueries({ queryKey: sharedKeys.owned });
    },
  });
}

export function useSaveSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      sharedId: string;
      folderId: string;
      title: string;
      description?: string;
    }) => {
      return shareApi.saveToMyFolder(input.sharedId, input.folderId, input.title, input.description);
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      qc.invalidateQueries({ queryKey: sharedKeys.all });
    },
  });
}

export function useReportDocument() {
  return useMutation({
    mutationFn: (input: ReportDocumentRequest) => shareApi.report(input),
  });
}

// ================================================================
// RAG
// ================================================================

export function useProcessRag() {
  return useMutation({
    mutationFn: (documentId: string) => ragApi.process(documentId),
  });
}

export function useProcessFolderRag() {
  return useMutation({
    mutationFn: (folderId: string) => ragApi.processFolder(folderId),
  });
}

export function useRagStatus(documentId: string) {
  return useQuery({
    queryKey: ["rag-status", documentId],
    queryFn: () => ragApi.status(documentId),
    enabled: !!documentId,
    refetchInterval: (query) => {
      const data = query.state.data as RagStatusResponse | undefined;
      if (data?.status === "PROCESSING") return 3000;
      return false;
    },
  });
}

export function useRagSession(documentId: string) {
  return useQuery({
    queryKey: ["rag-sessions", documentId],
    queryFn: () => ragApi.sessions(documentId),
    enabled: !!documentId,
  });
}

export function useRagSessionDetail(sessionId: string | null) {
  return useQuery({
    queryKey: ["rag-session", sessionId],
    queryFn: () => ragApi.sessionDetail(sessionId!),
    enabled: !!sessionId,
  });
}

export function useDeleteRagSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => ragApi.deleteSession(sessionId),
    onSuccess: (_, sessionId) => {
      qc.invalidateQueries({ queryKey: ["rag-sessions"] });
    },
  });
}

export function useRagChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: import("./types").AskRequest) => ragApi.chat(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quota"] });
    },
  });
}

// ================================================================
// SUMMARY
// ================================================================

export function useGenerateSummary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: GenerateSummaryRequest) =>
      summaryApi.generate(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["summary"] });
      qc.invalidateQueries({ queryKey: ["quota"] });
    },
  });
}

export function useSummary(documentId: string) {
  return useQuery({
    queryKey: ["summary", documentId],
    queryFn: () => summaryApi.getCached(documentId),
    enabled: !!documentId,
    staleTime: 60_000,
  });
}

// ================================================================
// QUIZ
// ================================================================

export const quizKeys = {
  byDocument: (docId: string) => ["quiz", "document", docId] as const,
};

export function useQuizByDocument(documentId: string) {
  return useQuery({
    queryKey: quizKeys.byDocument(documentId),
    queryFn: () => quizApi.listByDocument(documentId),
    enabled: !!documentId,
  });
}

export function useGenerateQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: GenerateQuizRequest) =>
      quizApi.generate(input),
    onSuccess: (_, input) => {
      qc.invalidateQueries({ queryKey: ["quizzes"] });
      qc.invalidateQueries({ queryKey: quizKeys.byDocument(input.documentId) });
      qc.invalidateQueries({ queryKey: ["quota"] });
    },
  });
}

// ================================================================
// FLASHCARD
// ================================================================

export const flashcardKeys = {
  byDocument: (docId: string) => ["flashcard", "document", docId] as const,
};

export function useFlashcardsByDocument(documentId: string) {
  return useQuery({
    queryKey: flashcardKeys.byDocument(documentId),
    queryFn: () => flashcardApi.listByDocument(documentId),
    enabled: !!documentId,
  });
}

// ================================================================
// QUOTA
// ================================================================

export function useQuota() {
  return useQuery({
    queryKey: ["quota"],
    queryFn: () => quotaApi.getDetails(),
    staleTime: 60_000,
  });
}

export function useGenerateFlashcards() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: GenerateFlashcardsRequest) =>
      flashcardApi.generate(input),
    onSuccess: (_, input) => {
      qc.invalidateQueries({ queryKey: ["flashcards"] });
      qc.invalidateQueries({ queryKey: flashcardKeys.byDocument(input.documentId) });
      qc.invalidateQueries({ queryKey: ["quota"] });
    },
  });
}

export function useMySubmittedReports() {
  return useQuery({
    queryKey: ["my-reports"],
    queryFn: async () => {
      const result = await shareApi.listMyReports();
      // Backend returns Page<ReportResponse> — api() unwraps ApiResponse.data,
      // so result is { content: ReportResponse[], totalElements, ... }
      return (result as any)?.content ?? result ?? [];
    },
  });
}
