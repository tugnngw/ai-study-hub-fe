<<<<<<< HEAD
<<<<<<< HEAD
// =============================================================
// queries.ts — TanStack Query hooks
// =============================================================
// Gọi thẳng realApi.ts (1-1 với endpoint BE). Không còn mock data.
// Khi BE chưa chạy, các hook sẽ reject — UI xử lý isLoading/isError.
// =============================================================

=======
// src/lib/queries.ts
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
// src/lib/queries.ts
>>>>>>> origin/AI-Study-fix
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  accountApi,
  authApi,
  documentApi,
  flashcardApi,
  folderApi,
  quizApi,
  ragApi,
<<<<<<< HEAD
<<<<<<< HEAD
  semesterApi,
  shareApi,
  subjectApi,
} from "./realApi";
import type {
  Document,
  Folder,
  Semester,
  Subject,
=======
=======
>>>>>>> origin/AI-Study-fix
  shareApi,
} from "./realApi";
import { tokenStore } from "./api";
import type {
  Document,
  Folder,
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
  SharedDocument,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  CreateFolderRequest,
  UpdateFolderRequest,
<<<<<<< HEAD
<<<<<<< HEAD
  CreateSemesterRequest,
  CreateSubjectRequest,
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
  AskRequest,
  ReportDocumentRequest,
=======
  AskRequest,
  ReportDocumentRequest,
  RagProcessRequest,
  RagChatRequest,
  RagChatResponse,
>>>>>>> origin/AI-Study-fix
} from "./types";

// ================================================================
// AUTH
// ================================================================

export function useLogin() {
  return useMutation({
    mutationFn: (input: { username: string; password: string }) =>
      authApi.login(input),
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
<<<<<<< HEAD
<<<<<<< HEAD
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof accountApi.updateProfile>[0]) =>
      accountApi.updateProfile(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["account", "me"] }),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (input: { currentPassword: string; newPassword: string }) =>
      accountApi.changePassword(input),
  });
}

// ================================================================
// SEMESTER  →  /api/semester
// ================================================================

export const semesterKeys = {
  all: ["semesters"] as const,
  detail: (id: number) => ["semesters", id] as const,
};

/** Danh sách tất cả học kỳ */
export function useSemesters() {
  return useQuery({
    queryKey: semesterKeys.all,
    queryFn: () => semesterApi.list(),
    staleTime: 10 * 60_000, // học kỳ ít thay đổi
  });
}

export function useSemester(id: number) {
  return useQuery({
    queryKey: semesterKeys.detail(id),
    queryFn: () => semesterApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateSemester() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateSemesterRequest) => semesterApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: semesterKeys.all }),
  });
}

// ================================================================
// SUBJECT  →  /api/subject
// ================================================================

export const subjectKeys = {
  all: ["subjects"] as const,
  bySemester: (semesterId: number) => ["subjects", "semester", semesterId] as const,
  detail: (id: number) => ["subjects", id] as const,
};

/** Tất cả môn học */
export function useSubjects() {
  return useQuery({
    queryKey: subjectKeys.all,
    queryFn: () => subjectApi.list(),
    staleTime: 10 * 60_000,
  });
}

/**
 * Môn học theo học kỳ — dùng cho tab "Môn học theo kỳ" trên Dashboard.
 * Chỉ fetch khi semesterId hợp lệ (> 0).
 */
export function useSubjectsBySemester(semesterId: number) {
  return useQuery({
    queryKey: subjectKeys.bySemester(semesterId),
    queryFn: () => subjectApi.listBySemester(semesterId),
    enabled: semesterId > 0,
    staleTime: 10 * 60_000,
  });
}

export function useCreateSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateSubjectRequest) => subjectApi.create(input),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: subjectKeys.all });
      if (v.semesterId) {
        qc.invalidateQueries({ queryKey: subjectKeys.bySemester(v.semesterId) });
      }
    },
=======
    retry: false,
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
    retry: false,
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
    enabled: !!id,
=======
    enabled: !!id && id > 0,
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
    enabled: typeof id === 'string' && id.trim().length > 0,
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
  detail: (id: number) => ["documents", id] as const,
=======
  detail: (id: string) => ["documents", "detail", id] as const,
>>>>>>> origin/AI-Study-fix
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
    queryFn: () => documentApi.listByFolder(folderId),
    enabled: !!folderId,
  });
}

<<<<<<< HEAD
export function useDocument(id: number) {
<<<<<<< HEAD
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => documentApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Upload flow:
 *   Bước 1 — POST /api/documents  → tạo record, nhận id
 *   Bước 2 — POST /api/rag/upload → chunk + nhúng vector
 */
export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UploadDocumentRequest) => {
      const doc = await documentApi.upload(input);
      try {
        await ragApi.upload(input.file, doc.id);
      } catch (err) {
        console.error(`RAG embedding thất bại cho document #${doc.id}:`, err);
        (doc as Document & { ragUploadFailed?: boolean }).ragUploadFailed = true;
      }
      return doc;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      if (v.folderId) qc.invalidateQueries({ queryKey: docKeys.byFolder(v.folderId) });
=======
  const enabled = !!id;
=======
export function useDocument(id: string) {
  const enabled = typeof id === 'string' && id.trim().length > 0;
>>>>>>> origin/AI-Study-fix
  console.log('[TRACE-4] useDocument id:', id, 'enabled:', enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      console.log('[TRACE-5] queryFn executing for id:', id);
      return documentApi.getById(id);
    },
    enabled: enabled,
    // Thêm polling khi document đang processing
    refetchInterval: (query) => {
      const data = query.state.data as Document | undefined;
      if (data?.status === "processing") {
        console.log('[Polling] Document is processing, polling every 3s');
        return 3000; // Poll every 3 seconds
      }
      return false;
    },
    // Refetch khi focus nếu đang processing
    refetchOnWindowFocus: (query) => {
      const data = query.state.data as Document | undefined;
      return data?.status === "processing";
    },
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UploadDocumentRequest) => documentApi.upload(input),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      if (v.folderId)
        qc.invalidateQueries({ queryKey: docKeys.byFolder(v.folderId) });
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
    },
  });
}

export function useUpdateDocument() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
=======
    mutationFn: ({ id, ...body }: { id: string } & UpdateDocumentRequest) =>
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
    mutationFn: (id: number) => documentApi.delete(id),
<<<<<<< HEAD
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
=======
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
    mutationFn: (id: string) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/AI-Study-fix
  });
}

export function useDownloadDocument() {
  return useMutation({
<<<<<<< HEAD
    mutationFn: (id: number) => documentApi.getDownloadUrl(id),
  });
}

<<<<<<< HEAD
// ----------------------------------------------------------------
// TRASH  ⚠️ chưa có trong API doc — xem ghi chú trong realApi.ts
// ----------------------------------------------------------------
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
    mutationFn: (id: string) => documentApi.getDownloadUrl(id),
  });
}

// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/AI-Study-fix

export function useTrash() {
  return useQuery({
    queryKey: docKeys.trash,
    queryFn: () => documentApi.listTrash(),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
export function useRestoreDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.restore(id),
=======
export function useRestoreFromTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.restoreFromTrash(id),
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
export function useRestoreFromTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentApi.restoreFromTrash(id),
>>>>>>> origin/AI-Study-fix
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
      qc.invalidateQueries({ queryKey: docKeys.all });
    },
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
export function usePermanentDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.permanentDelete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.trash }),
=======
export function useEmptyTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.emptyTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
export function useEmptyTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentApi.emptyTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
>>>>>>> origin/AI-Study-fix
  });
}

// ================================================================
// SHARE
// ================================================================

export const sharedKeys = {
  all: ["shared"] as const,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  owned: ["shared-owned"] as const,
>>>>>>> origin/Ai-Study-fix-folder-refactor
  info: (docId: number) => ["share-info", docId] as const,
=======
  owned: ["shared-owned"] as const,
  info: (docId: string) => ["share-info", docId] as const,
>>>>>>> origin/AI-Study-fix
};

export function useSharedDocuments() {
  return useQuery({
    queryKey: sharedKeys.all,
    queryFn: () => shareApi.listSharedWithMe(),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
export function useShareInfo(documentId: number, enabled = true) {
  return useQuery({
    queryKey: sharedKeys.info(documentId),
    queryFn: () => shareApi.getShareInfo(documentId),
    enabled: !!documentId && enabled,
  });
}

export function useShareDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: number; email: string }) =>
      shareApi.shareWithEmail(input.id, input.email),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: sharedKeys.info(v.id) });
=======
=======
>>>>>>> origin/AI-Study-fix
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
    mutationFn: (request: { folderId: string; username?: string; email?: string }) =>
      shareApi.shareFolder({
        folderId: request.folderId,
        username: request.username,
        email: request.email,
        visibility: "private",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sharedKeys.all });
      qc.invalidateQueries({ queryKey: sharedKeys.owned });
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
    },
  });
}

export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: (shareId: number) => shareApi.removeFromShared(shareId),
    onSuccess: () => qc.invalidateQueries({ queryKey: sharedKeys.all }),
=======
=======
>>>>>>> origin/AI-Study-fix
    mutationFn: (shareId: number) => shareApi.removeShare(shareId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sharedKeys.all });
      qc.invalidateQueries({ queryKey: sharedKeys.owned });
    },
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
  });
}

export function useSaveSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      sharedId: number;
      folderId: string;
      title: string;
      description?: string;
<<<<<<< HEAD
<<<<<<< HEAD
    }) =>
      shareApi.saveToMyFolder(input.sharedId, input.folderId, input.title, input.description),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
=======
=======
>>>>>>> origin/AI-Study-fix
    }) => {
      // Placeholder: BE doesn't have a "save shared doc" endpoint yet.
      // For now, just simulate success.
      console.log("useSaveSharedDocument called:", input);
      return Promise.resolve({});
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.all });
    },
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
=======
    mutationFn: (input: { file: File; documentId: string; chunk?: boolean }) =>
>>>>>>> origin/AI-Study-fix
      input.chunk
        ? ragApi.uploadAndChunk(input.file, input.documentId)
        : ragApi.upload(input.file, input.documentId),
  });
}

<<<<<<< HEAD
// ================================================================
<<<<<<< HEAD
// QUIZ  (sẵn sàng khi BE implement /api/quiz)
=======
// QUIZ
>>>>>>> origin/Ai-Study-fix-folder-refactor
// ================================================================

export const quizKeys = {
  byDocument: (docId: number) => ["quiz", "document", docId] as const,
};

export function useQuizByDocument(documentId: number) {
=======
export function useProcessRagPipeline() {
  return useMutation({
    mutationFn: (req: RagProcessRequest) => ragApi.processDocumentPipeline(req),
  });
}

export function useChatWithFolder() {
  return useMutation({
    mutationFn: (req: RagChatRequest) => ragApi.chatWithFolder(req),
  });
}

// ================================================================
// QUIZ
// ================================================================

export const quizKeys = {
  byDocument: (docId: string) => ["quiz", "document", docId] as const,
};

export function useQuizByDocument(documentId: string) {
>>>>>>> origin/AI-Study-fix
  return useQuery({
    queryKey: quizKeys.byDocument(documentId),
    queryFn: () => quizApi.listByDocument(documentId),
    enabled: !!documentId,
  });
}

export function useGenerateQuiz() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
=======
    mutationFn: (input: { documentId: string; questionCount?: number }) =>
>>>>>>> origin/AI-Study-fix
      quizApi.generate(input.documentId, input.questionCount),
    onSuccess: (_d, v) =>
      qc.invalidateQueries({ queryKey: quizKeys.byDocument(v.documentId) }),
  });
}

// ================================================================
<<<<<<< HEAD
<<<<<<< HEAD
// FLASHCARD  (sẵn sàng khi BE implement /api/flashcard)
=======
// FLASHCARD
>>>>>>> origin/Ai-Study-fix-folder-refactor
// ================================================================

export const flashcardKeys = {
  byDocument: (docId: number) => ["flashcard", "document", docId] as const,
};

export function useFlashcardsByDocument(documentId: number) {
=======
// FLASHCARD
// ================================================================

export const flashcardKeys = {
  byDocument: (docId: string) => ["flashcard", "document", docId] as const,
};

export function useFlashcardsByDocument(documentId: string) {
>>>>>>> origin/AI-Study-fix
  return useQuery({
    queryKey: flashcardKeys.byDocument(documentId),
    queryFn: () => flashcardApi.listByDocument(documentId),
    enabled: !!documentId,
  });
}

export function useGenerateFlashcards() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
=======
    mutationFn: (documentId: string) => flashcardApi.generate(documentId),
>>>>>>> origin/AI-Study-fix
    onSuccess: (_d, documentId) =>
      qc.invalidateQueries({ queryKey: flashcardKeys.byDocument(documentId) }),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
// ================================================================
// Re-exports (giữ backward compat với code hiện tại)
// ================================================================
export type { Document, Folder, Semester, Subject, SharedDocument };
=======
export type { Document, Folder, SharedDocument };
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
export type { Document, Folder, SharedDocument };
>>>>>>> origin/AI-Study-fix
