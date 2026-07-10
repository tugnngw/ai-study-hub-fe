// src/lib/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GenerateSummaryRequest, GenerateSummaryResponse } from "./types";
import { paymentApi } from "@/features/admin/services/paymentApi";
import {
  accountApi,
  authApi,
  dashboardApi,
  documentApi,
  flashcardApi,
  folderApi,
  quizApi,
  ragApi,
  shareApi,
  subjectApi,
  summaryApi,
} from "./realApi";
import { tokenStore, ApiError } from "./api";
import type {
  Document,
  Folder,
  SharedDocument,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  CreateFolderRequest,
  UpdateFolderRequest,
  AskRequest,
  ReportDocumentRequest,
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
// PLANS (gói nâng cấp) — dùng chung cho trang Premium của user.
// Cùng cache với chỉnh sửa của admin để tự cập nhật sau khi admin lưu.
// ================================================================

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: () => paymentApi.getPlans(),
    staleTime: 30_000,
  });
}

// ================================================================
// DASHBOARD (trang chủ người dùng)
// Điểm nối BE: gọi GET /api/dashboard. Khi BE chưa sẵn sàng, tự tổng hợp
// từ folders/documents/subjects để UI vẫn chạy.
// ================================================================

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        return await dashboardApi.get();
      } catch {
        // Fallback: dựng payload từ các endpoint hiện có.
        const [folders, documents, subjects] = await Promise.all([
          folderApi.list().catch(() => []),
          documentApi.list().catch(() => []),
          subjectApi.list().catch(() => []),
        ]);
        const docCountBySubject: Record<number, number> = {};
        const docCountByFolder: Record<string, number> = {};
        documents.forEach((d) => {
          if (d.subjectId != null)
            docCountBySubject[d.subjectId] =
              (docCountBySubject[d.subjectId] ?? 0) + 1;
          if (d.folderId != null)
            docCountByFolder[String(d.folderId)] =
              (docCountByFolder[String(d.folderId)] ?? 0) + 1;
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
        return { recentNotes, recentDocuments, subjects, docCountBySubject };
      }
    },
    staleTime: 60_000,
  });
}

// ================================================================
// SUBJECT (môn học theo kỳ) — dùng cho luồng upload
// ================================================================

export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: () => subjectApi.list(),
    staleTime: 10 * 60_000,
  });
}

// ================================================================
// FOLDER
// ================================================================

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
    enabled: !!id && id !== "0",
  });
}

export function useCreateFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateFolderRequest) => folderApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all }),
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
  const enabled = !!id;
  console.log("[TRACE-4] useDocument id:", id, "enabled:", enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: async () => {
      console.log("[TRACE-5] queryFn executing for id:", id);
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
    enabled: enabled,
    // Thêm polling khi document đang processing
    refetchInterval: (query) => {
      const data = query.state.data as Document | undefined;
      if (data?.status === "PROCESSING") {
        console.log("[Polling] Document is processing, polling every 3s");
        return 3000; // Poll every 3 seconds
      }
      return false;
    },
    // Refetch khi focus nếu đang processing
    refetchOnWindowFocus: (query) => {
      const data = query.state.data as Document | undefined;
      return data?.status === "PROCESSING";
    },
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UploadDocumentRequest) => {
      const docs = await documentApi.upload(input);
      await Promise.all(docs.map((doc) => ragApi.processDocument(doc.id)));
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
    enabled: !!tokenStore.get(), // Only run if authenticated
  });
}

export function useShareFolder() {
  const qc = useQueryClient();
  return useMutation({
    // Chia sẻ folder HOẶC file (document). Truyền đúng 1 trong 2 id.
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

// Alias rõ nghĩa để chia sẻ 1 file đơn lẻ.
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

export function useAskRag() {
  return useMutation({
    mutationFn: (input: AskRequest) => ragApi.ask(input),
  });
}

export function useUploadRag() {
  return useMutation({
    mutationFn: (input: { file: File; documentId: string; chunk?: boolean }) =>
      input.chunk
        ? ragApi.uploadAndChunk(input.file, input.documentId)
        : ragApi.upload(input.file, input.documentId),
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
      qc.invalidateQueries({ queryKey: ["summaries"] });
    },
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
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["quizzes"] });
      // Also invalidate the specific document key if a single document was used
      if (data?.id != null) {
        qc.invalidateQueries({ queryKey: quizKeys.byDocument(String(data.id)) });
      }
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

export function useGenerateFlashcards() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: GenerateFlashcardsRequest) =>
      flashcardApi.generate(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });
}

export function useUpdateFlashcardProgress() {
  return useMutation({
    mutationFn: ({
      flashcardId,
      status,
    }: {
      flashcardId: number;
      status: "new" | "learning" | "mastered";
    }) => flashcardApi.updateProgress(flashcardId, status),
  });
}

export type { Document, Folder, SharedDocument };
