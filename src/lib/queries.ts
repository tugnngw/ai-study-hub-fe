// =============================================================
// queries.ts — TanStack Query hooks
// =============================================================
// Gọi thẳng realApi.ts (1-1 với endpoint BE). Không còn mock data.
// Khi BE chưa chạy, các hook sẽ reject — UI xử lý isLoading/isError.
// =============================================================

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  accountApi,
  authApi,
  documentApi,
  flashcardApi,
  folderApi,
  quizApi,
  ragApi,
  semesterApi,
  shareApi,
  subjectApi,
} from "./realApi";
import type {
  Document,
  Folder,
  Semester,
  Subject,
  SharedDocument,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  CreateFolderRequest,
  UpdateFolderRequest,
  CreateSemesterRequest,
  CreateSubjectRequest,
  AskRequest,
  ReportDocumentRequest,
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
    enabled: !!id,
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
  detail: (id: number) => ["documents", id] as const,
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

export function useDocument(id: number) {
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
    },
  });
}

export function useUpdateDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
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
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: (id: number) => documentApi.getDownloadUrl(id),
  });
}

// ----------------------------------------------------------------
// TRASH  ⚠️ chưa có trong API doc — xem ghi chú trong realApi.ts
// ----------------------------------------------------------------

export function useTrash() {
  return useQuery({
    queryKey: docKeys.trash,
    queryFn: () => documentApi.listTrash(),
  });
}

export function useRestoreDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.restore(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
      qc.invalidateQueries({ queryKey: docKeys.all });
    },
  });
}

export function usePermanentDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.permanentDelete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.trash }),
  });
}

// ================================================================
// SHARE
// ================================================================

export const sharedKeys = {
  all: ["shared"] as const,
  info: (docId: number) => ["share-info", docId] as const,
};

export function useSharedDocuments() {
  return useQuery({
    queryKey: sharedKeys.all,
    queryFn: () => shareApi.listSharedWithMe(),
  });
}

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
    },
  });
}

export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (shareId: number) => shareApi.removeFromShared(shareId),
    onSuccess: () => qc.invalidateQueries({ queryKey: sharedKeys.all }),
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
    }) =>
      shareApi.saveToMyFolder(input.sharedId, input.folderId, input.title, input.description),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
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
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
      input.chunk
        ? ragApi.uploadAndChunk(input.file, input.documentId)
        : ragApi.upload(input.file, input.documentId),
  });
}

// ================================================================
// QUIZ  (sẵn sàng khi BE implement /api/quiz)
// ================================================================

export const quizKeys = {
  byDocument: (docId: number) => ["quiz", "document", docId] as const,
};

export function useQuizByDocument(documentId: number) {
  return useQuery({
    queryKey: quizKeys.byDocument(documentId),
    queryFn: () => quizApi.listByDocument(documentId),
    enabled: !!documentId,
  });
}

export function useGenerateQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
      quizApi.generate(input.documentId, input.questionCount),
    onSuccess: (_d, v) =>
      qc.invalidateQueries({ queryKey: quizKeys.byDocument(v.documentId) }),
  });
}

// ================================================================
// FLASHCARD  (sẵn sàng khi BE implement /api/flashcard)
// ================================================================

export const flashcardKeys = {
  byDocument: (docId: number) => ["flashcard", "document", docId] as const,
};

export function useFlashcardsByDocument(documentId: number) {
  return useQuery({
    queryKey: flashcardKeys.byDocument(documentId),
    queryFn: () => flashcardApi.listByDocument(documentId),
    enabled: !!documentId,
  });
}

export function useGenerateFlashcards() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
    onSuccess: (_d, documentId) =>
      qc.invalidateQueries({ queryKey: flashcardKeys.byDocument(documentId) }),
  });
}

// ================================================================
// Re-exports (giữ backward compat với code hiện tại)
// ================================================================
export type { Document, Folder, Semester, Subject, SharedDocument };
