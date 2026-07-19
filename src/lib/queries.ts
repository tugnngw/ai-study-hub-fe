<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
// src/lib/queries.ts
>>>>>>> origin/test/share-document-cloudinary
=======
// src/lib/queries.ts
>>>>>>> origin/uichange
=======
// src/lib/queries.ts
>>>>>>> origin/admin-added
=======
// src/lib/queries.ts
>>>>>>> origin/update/feature/share
=======
// src/lib/queries.ts
>>>>>>> origin/update/feature/AI/Quiz
=======
// src/lib/queries.ts
>>>>>>> origin/Flashcards-fix
=======
// src/lib/queries.ts
>>>>>>> origin/admin-added-fix
=======
// src/lib/queries.ts
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  semesterApi,
  shareApi,
  subjectApi,
=======
  shareApi,
>>>>>>> origin/test/share-document-cloudinary
=======
  shareApi,
>>>>>>> origin/uichange
} from "./realApi";
import type {
  Document,
  Folder,
<<<<<<< HEAD
<<<<<<< HEAD
  Semester,
  Subject,
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  shareApi,
} from "./realApi";
import { tokenStore } from "./api";
import type {
  Document,
  Folder,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  SharedDocument,
=======
  SharedDocument,
  ShareResponse,
>>>>>>> origin/Flashcars
  UploadDocumentRequest,
  UpdateDocumentRequest,
  CreateFolderRequest,
  UpdateFolderRequest,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  AskRequest,
  ReportDocumentRequest,
  ShareResponse,
>>>>>>> origin/test/share-document-cloudinary
=======
  AskRequest,
  ReportDocumentRequest,
  ShareResponse,
>>>>>>> origin/uichange
=======
  AskRequest,
  ReportDocumentRequest,
>>>>>>> origin/admin-added
=======
  AskRequest,
  ReportDocumentRequest,
>>>>>>> origin/update/feature/share
=======
  AskRequest,
  ReportDocumentRequest,
>>>>>>> origin/update/feature/AI/Quiz
=======
  AskRequest,
  ReportDocumentRequest,
>>>>>>> origin/Flashcards-fix
=======
  AskRequest,
  ReportDocumentRequest,
>>>>>>> origin/admin-added-fix
=======
  AskRequest,
  ReportDocumentRequest,
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    retry: false,
>>>>>>> origin/test/share-document-cloudinary
=======
    retry: false,
>>>>>>> origin/uichange
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (input: { currentPassword: string; newPassword: string }) =>
      accountApi.changePassword(input),
=======
    retry: false,
>>>>>>> origin/admin-added
=======
    retry: false,
>>>>>>> origin/update/feature/share
=======
    retry: false,
>>>>>>> origin/update/feature/AI/Quiz
=======
    retry: false,
>>>>>>> origin/Flashcards-fix
=======
    retry: false,
>>>>>>> origin/admin-added-fix
=======
    retry: false,
>>>>>>> origin/Flashcars
  });
}

// ================================================================
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    enabled: !!id,
=======
    enabled: !!id && id > 0,
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
    enabled: typeof id === 'string' && id.trim().length > 0,
>>>>>>> origin/AI-Study-fix
=======
    enabled: !!id,
>>>>>>> origin/test/share-document-cloudinary
=======
    enabled: !!id,
>>>>>>> origin/uichange
=======
    enabled: !!id && id > 0,
>>>>>>> origin/admin-added
=======
    enabled: !!id && id > 0,
>>>>>>> origin/update/feature/share
=======
    enabled: !!id && id > 0,
>>>>>>> origin/update/feature/AI/Quiz
=======
    enabled: !!id && id > 0,
>>>>>>> origin/Flashcards-fix
=======
    enabled: !!id && id > 0,
>>>>>>> origin/admin-added-fix
=======
    enabled: !!id && id > 0,
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  detail: (id: number) => ["documents", id] as const,
=======
  detail: (id: string) => ["documents", "detail", id] as const,
>>>>>>> origin/AI-Study-fix
=======
  detail: (id: number) => ["documents", id] as const,
>>>>>>> origin/test/share-document-cloudinary
=======
  detail: (id: number) => ["documents", id] as const,
>>>>>>> origin/uichange
=======
  detail: (id: number) => ["documents", id] as const,
>>>>>>> origin/admin-added
=======
  detail: (id: number) => ["documents", id] as const,
>>>>>>> origin/update/feature/share
=======
  detail: (id: number) => ["documents", id] as const,
>>>>>>> origin/update/feature/AI/Quiz
=======
  detail: (id: number) => ["documents", id] as const,
>>>>>>> origin/Flashcards-fix
=======
  detail: (id: number) => ["documents", id] as const,
>>>>>>> origin/admin-added-fix
=======
  detail: (id: string) => ["documents", id] as const,
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export function useDocument(id: string) {
  const enabled = !!id;
>>>>>>> origin/test/share-document-cloudinary
=======
export function useDocument(id: string) {
  const enabled = !!id;
>>>>>>> origin/uichange
=======
export function useDocument(id: number) {
  const enabled = !!id;
>>>>>>> origin/admin-added
=======
export function useDocument(id: number) {
  const enabled = !!id;
>>>>>>> origin/update/feature/share
=======
export function useDocument(id: number) {
  const enabled = !!id;
>>>>>>> origin/update/feature/AI/Quiz
=======
export function useDocument(id: number) {
  const enabled = !!id;
>>>>>>> origin/Flashcards-fix
=======
export function useDocument(id: number) {
  const enabled = !!id;
>>>>>>> origin/admin-added-fix
  console.log('[TRACE-4] useDocument id:', id, 'enabled:', enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      console.log('[TRACE-5] queryFn executing for id:', id);
=======
export function useDocument(id: string) {
  const enabled = !!id;
  console.log("[TRACE-4] useDocument id:", id, "enabled:", enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      console.log("[TRACE-5] queryFn executing for id:", id);
>>>>>>> origin/Flashcars
      return documentApi.getById(id);
    },
    enabled: enabled,
    // Thêm polling khi document đang processing
    refetchInterval: (query) => {
      const data = query.state.data as Document | undefined;
      if (data?.status === "processing") {
<<<<<<< HEAD
        console.log('[Polling] Document is processing, polling every 3s');
=======
        console.log("[Polling] Document is processing, polling every 3s");
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
    mutationFn: (input: UploadDocumentRequest) => documentApi.upload(input),
=======
    mutationFn: async (input: UploadDocumentRequest) => {
      const docs = await documentApi.upload(input);
      await Promise.all(docs.map((doc) => ragApi.processDocument(doc.id)));
      return docs;
    },
>>>>>>> origin/Flashcars
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      if (v.folderId)
        qc.invalidateQueries({ queryKey: docKeys.byFolder(v.folderId) });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
    },
  });
}

export function useUpdateDocument() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
=======
    mutationFn: ({ id, ...body }: { id: string } & UpdateDocumentRequest) =>
>>>>>>> origin/AI-Study-fix
=======
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
>>>>>>> origin/test/share-document-cloudinary
=======
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
>>>>>>> origin/uichange
=======
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
>>>>>>> origin/admin-added
=======
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
>>>>>>> origin/update/feature/share
=======
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
>>>>>>> origin/update/feature/AI/Quiz
=======
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
>>>>>>> origin/Flashcards-fix
=======
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) =>
>>>>>>> origin/admin-added-fix
=======
    mutationFn: ({ id, ...body }: { id: string } & UpdateDocumentRequest) =>
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/test/share-document-cloudinary
=======
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/uichange
=======
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/admin-added
=======
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/update/feature/share
=======
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/update/feature/AI/Quiz
=======
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/Flashcards-fix
=======
    mutationFn: (id: number) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/admin-added-fix
=======
    mutationFn: (id: string) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
>>>>>>> origin/Flashcars
  });
}

export function useDownloadDocument() {
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
    mutationFn: (id: number) => documentApi.getDownloadUrl(id),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> origin/Flashcars
    mutationFn: (id: string) => documentApi.getDownloadUrl(id),
  });
}

// ================================================================
// TRASH
// ================================================================
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/test/share-document-cloudinary
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/uichange
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/admin-added
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/update/feature/share
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/update/feature/AI/Quiz
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/Flashcards-fix
=======
// ================================================================
// TRASH
// ================================================================
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars

export function useTrash() {
  return useQuery({
    queryKey: docKeys.trash,
    queryFn: () => documentApi.listTrash(),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export function useRestoreDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.restore(id),
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
export function useRestoreFromTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.restoreFromTrash(id),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
=======
>>>>>>> origin/Flashcars
export function useRestoreFromTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentApi.restoreFromTrash(id),
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
      qc.invalidateQueries({ queryKey: docKeys.all });
    },
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export function usePermanentDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.permanentDelete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.trash }),
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
export function useEmptyTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.emptyTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
=======
>>>>>>> origin/Flashcars
export function useEmptyTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentApi.emptyTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  });
}

// ================================================================
// SHARE
// ================================================================

export const sharedKeys = {
  all: ["shared"] as const,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  info: (targetId: string) => ["share-info", targetId] as const,
>>>>>>> origin/test/share-document-cloudinary
=======
  info: (targetId: string) => ["share-info", targetId] as const,
>>>>>>> origin/uichange
=======
  owned: ["shared-owned"] as const,
  info: (docId: number) => ["share-info", docId] as const,
>>>>>>> origin/admin-added
=======
  owned: ["shared-owned"] as const,
  info: (docId: number) => ["share-info", docId] as const,
>>>>>>> origin/update/feature/share
=======
  owned: ["shared-owned"] as const,
  info: (docId: number) => ["share-info", docId] as const,
>>>>>>> origin/update/feature/AI/Quiz
=======
  owned: ["shared-owned"] as const,
  info: (docId: number) => ["share-info", docId] as const,
>>>>>>> origin/Flashcards-fix
=======
  owned: ["shared-owned"] as const,
  info: (docId: number) => ["share-info", docId] as const,
>>>>>>> origin/admin-added-fix
=======
  owned: ["shared-owned"] as const,
  info: (docId: string) => ["share-info", docId] as const,
>>>>>>> origin/Flashcars
};

export function useSharedDocuments() {
  return useQuery({
    queryKey: sharedKeys.all,
    queryFn: () => shareApi.listSharedWithMe(),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export function useShareInfo(documentId: number, enabled = true) {
  return useQuery({
    queryKey: sharedKeys.info(documentId),
    queryFn: () => shareApi.getShareInfo(documentId),
    enabled: !!documentId && enabled,
=======
=======
>>>>>>> origin/uichange
export function useShareInfo(targetId: string, targetType: "document" | "folder", enabled = true) {
  return useQuery({
    queryKey: sharedKeys.info(targetId),
    queryFn: () => shareApi.getShareInfo(targetId, targetType),
    enabled: !!targetId && enabled,
    // Silent fail on 401 - don't show error toast
    useErrorBoundary: false,
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
  });
}

export function useShareDocument() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: (input: { id: number; email: string }) =>
      shareApi.shareWithEmail(input.id, input.email),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: sharedKeys.info(v.id) });
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
export function useOwnedShares() {
  return useQuery({
    queryKey: sharedKeys.owned,
    queryFn: () => shareApi.listOwned(),
    enabled: !!tokenStore.get(), // Only run if authenticated
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
    mutationFn: (input: { id: string; value: string }) =>
      shareApi.share(input.id, "document", input.value),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: sharedKeys.info(variables.id) });
    },
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  });
}

export function useShareFolder() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
    mutationFn: (request: { folderId: string; username?: string; email?: string }) =>
=======
    mutationFn: (request: {
      folderId: string;
      username?: string;
      email?: string;
    }) =>
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
    mutationFn: (input: { id: string; value: string }) =>
      shareApi.share(input.id, "folder", input.value),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: sharedKeys.info(variables.id) });
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
    },
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
>>>>>>> origin/admin-added
=======
export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
>>>>>>> origin/update/feature/share
=======
export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
>>>>>>> origin/update/feature/AI/Quiz
=======
export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
>>>>>>> origin/Flashcards-fix
=======
export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
>>>>>>> origin/admin-added-fix
    mutationFn: (shareId: number) => shareApi.removeShare(shareId),
=======
export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (shareId: string) => shareApi.removeShare(shareId),
>>>>>>> origin/Flashcars
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sharedKeys.all });
      qc.invalidateQueries({ queryKey: sharedKeys.owned });
    },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
export function useCreateShareLink() {
  return useMutation({
    mutationFn: (input: { id: string; type: "document" | "folder" }) =>
      shareApi.share(input.id, input.type, ""), // empty value creates link only
  });
}

export function useRevokeShare() {
  return useMutation({
    mutationFn: (shareId: string) => shareApi.revoke(shareId),
  });
}

export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (shareId: number) => shareApi.removeFromShared(shareId),
    onSuccess: () => qc.invalidateQueries({ queryKey: sharedKeys.all }),
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  });
}

export function useSaveSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
<<<<<<< HEAD
      sharedId: number;
      folderId: string;
      title: string;
      description?: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    }) =>
      shareApi.saveToMyFolder(input.sharedId, input.folderId, input.title, input.description),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
    }) =>
      shareApi.saveToMyFolder(
        input.sharedId,
        input.folderId,
        input.title,
        input.description,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
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
>>>>>>> origin/Flashcars
  });
}

export function useReportDocument() {
  return useMutation({
    mutationFn: (input: ReportDocumentRequest) => shareApi.report(input),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/admin-added-fix
export function useReportFolder() {
  return useMutation({
    mutationFn: (input: { folderId: string; reason: string; description?: string }) => {
      // Placeholder: BE doesn't have a folder-level report endpoint yet.
      console.log("useReportFolder called:", input);
      return Promise.resolve({});
    },
  });
}

<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
=======
    mutationFn: (input: { file: File; documentId: string; chunk?: boolean }) =>
>>>>>>> origin/AI-Study-fix
=======
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
>>>>>>> origin/test/share-document-cloudinary
=======
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
>>>>>>> origin/uichange
=======
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
>>>>>>> origin/admin-added
=======
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
>>>>>>> origin/update/feature/share
=======
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
>>>>>>> origin/update/feature/AI/Quiz
=======
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
>>>>>>> origin/Flashcards-fix
=======
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) =>
>>>>>>> origin/admin-added-fix
=======
    mutationFn: (input: { file: File; documentId: string; chunk?: boolean }) =>
>>>>>>> origin/Flashcars
      input.chunk
        ? ragApi.uploadAndChunk(input.file, input.documentId)
        : ragApi.upload(input.file, input.documentId),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// ================================================================
<<<<<<< HEAD
// QUIZ  (sẵn sàng khi BE implement /api/quiz)
=======
// QUIZ
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
// ================================================================
// QUIZ
>>>>>>> origin/test/share-document-cloudinary
=======
// ================================================================
// QUIZ
>>>>>>> origin/uichange
=======
// ================================================================
// QUIZ
>>>>>>> origin/admin-added
=======
// ================================================================
// QUIZ
>>>>>>> origin/update/feature/share
=======
// ================================================================
// QUIZ
>>>>>>> origin/update/feature/AI/Quiz
=======
// ================================================================
// QUIZ
>>>>>>> origin/Flashcards-fix
=======
// ================================================================
// QUIZ
>>>>>>> origin/admin-added-fix
// ================================================================

export const quizKeys = {
  byDocument: (docId: number) => ["quiz", "document", docId] as const,
};

export function useQuizByDocument(documentId: number) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
>>>>>>> origin/Flashcars
// ================================================================
// QUIZ
// ================================================================

export const quizKeys = {
  byDocument: (docId: string) => ["quiz", "document", docId] as const,
};

export function useQuizByDocument(documentId: string) {
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
=======
    mutationFn: (input: { documentId: string; questionCount?: number }) =>
>>>>>>> origin/AI-Study-fix
=======
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
>>>>>>> origin/test/share-document-cloudinary
=======
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
>>>>>>> origin/uichange
=======
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
>>>>>>> origin/admin-added
=======
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
>>>>>>> origin/update/feature/share
=======
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
>>>>>>> origin/update/feature/AI/Quiz
=======
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
>>>>>>> origin/Flashcards-fix
=======
    mutationFn: (input: { documentId: number; questionCount?: number }) =>
>>>>>>> origin/admin-added-fix
=======
    mutationFn: (input: { documentId: string; questionCount?: number }) =>
>>>>>>> origin/Flashcars
      quizApi.generate(input.documentId, input.questionCount),
    onSuccess: (_d, v) =>
      qc.invalidateQueries({ queryKey: quizKeys.byDocument(v.documentId) }),
  });
}

// ================================================================
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// FLASHCARD  (sẵn sàng khi BE implement /api/flashcard)
=======
// FLASHCARD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
// FLASHCARD
>>>>>>> origin/test/share-document-cloudinary
=======
// FLASHCARD
>>>>>>> origin/uichange
=======
// FLASHCARD
>>>>>>> origin/admin-added
=======
// FLASHCARD
>>>>>>> origin/update/feature/share
=======
// FLASHCARD
>>>>>>> origin/update/feature/AI/Quiz
=======
// FLASHCARD
>>>>>>> origin/Flashcards-fix
=======
// FLASHCARD
>>>>>>> origin/admin-added-fix
// ================================================================

export const flashcardKeys = {
  byDocument: (docId: number) => ["flashcard", "document", docId] as const,
};

export function useFlashcardsByDocument(documentId: number) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/Flashcars
// FLASHCARD
// ================================================================

export const flashcardKeys = {
  byDocument: (docId: string) => ["flashcard", "document", docId] as const,
};

export function useFlashcardsByDocument(documentId: string) {
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
=======
    mutationFn: (documentId: string) => flashcardApi.generate(documentId),
>>>>>>> origin/AI-Study-fix
=======
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
>>>>>>> origin/test/share-document-cloudinary
=======
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
>>>>>>> origin/uichange
=======
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
>>>>>>> origin/admin-added
=======
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
>>>>>>> origin/update/feature/share
=======
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
>>>>>>> origin/update/feature/AI/Quiz
=======
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
>>>>>>> origin/Flashcards-fix
=======
    mutationFn: (documentId: number) => flashcardApi.generate(documentId),
>>>>>>> origin/admin-added-fix
=======
    mutationFn: (documentId: string) => flashcardApi.generate(documentId),
>>>>>>> origin/Flashcars
    onSuccess: (_d, documentId) =>
      qc.invalidateQueries({ queryKey: flashcardKeys.byDocument(documentId) }),
  });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export type { Document, Folder, SharedDocument };
>>>>>>> origin/test/share-document-cloudinary
=======
export type { Document, Folder, SharedDocument };
>>>>>>> origin/uichange
=======
export type { Document, Folder, SharedDocument };
>>>>>>> origin/admin-added
=======
export type { Document, Folder, SharedDocument };
>>>>>>> origin/update/feature/share
=======
export type { Document, Folder, SharedDocument };
>>>>>>> origin/update/feature/AI/Quiz
=======
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
export function useUpdateFlashcardProgress() {
  return useMutation({
    mutationFn: ({
      flashcardId,
      status,
    }: {
      flashcardId: number;
      status: "new" | "learning" | "mastered";
<<<<<<< HEAD
      documentId?: number;
=======
      documentId?: string;
>>>>>>> origin/Flashcars
    }) => flashcardApi.updateProgress(flashcardId, status),
  });
}

export type { Document, Folder, SharedDocument };
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
