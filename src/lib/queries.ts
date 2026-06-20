// =============================================================
// queries.ts — TanStack Query hooks
// =============================================================
// Chuyển đổi mock ↔ real API bằng env var:
//   VITE_USE_MOCK=true   → dùng mockApi (mặc định khi chưa có BE)
//   VITE_USE_MOCK=false  → dùng realApi (khi BE đã sẵn sàng)
//
// Hoặc swap từng hook một bằng cách bỏ comment dòng "// REAL:"
// và comment dòng "// MOCK:" ở từng function bên dưới.
// =============================================================

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "./mock-data";
import {
  accountApi,
  authApi,
  documentApi,
  flashcardApi,
  folderApi,
  quizApi,
  ragApi,
  shareApi,
} from "./realApi";
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

// Đổi thành false khi BE đã sẵn sàng
const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "true") === "true";

// ================================================================
// AUTH
// ================================================================

export function useLogin() {
  return useMutation({
    mutationFn: (input: { username: string; password: string }) => {
      if (USE_MOCK) {
        // MOCK: giả lập login thành công
        return Promise.resolve({ token: "mock", user: { id: "1", username: input.username } as never });
      }
      // REAL:
      return authApi.login(input);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (input: Parameters<typeof authApi.register>[0]) => {
      if (USE_MOCK) return Promise.resolve();
      // REAL:
      return authApi.register(input);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => {
      if (USE_MOCK) return Promise.resolve();
      // REAL:
      return authApi.logout();
    },
    onSuccess: () => qc.clear(),
  });
}

// ================================================================
// ACCOUNT
// ================================================================

export function useCurrentUser() {
  return useQuery({
    queryKey: ["account", "me"],
    queryFn: () => {
      if (USE_MOCK) return Promise.resolve(null); // AuthContext đã giữ user khi mock
      // REAL:
      return accountApi.me();
    },
    enabled: !USE_MOCK,
    staleTime: 5 * 60_000,
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
    queryFn: () => {
      // MOCK:
      if (USE_MOCK) return mockApi.listFolders() as Promise<Folder[]>;
      // REAL:
      return folderApi.list();
    },
  });
}

export function useFolder(id: string) {
  return useQuery({
    queryKey: folderKeys.detail(id),
    queryFn: () => {
      // MOCK:
      if (USE_MOCK) return mockApi.getFolder(Number(id)) as Promise<Folder>;
      // REAL:
      return folderApi.getById(id);
    },
    enabled: !!id,
  });
}

export function useCreateFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateFolderRequest) => {
      // MOCK:
      if (USE_MOCK) return mockApi.createFolder(input) as Promise<Folder>;
      // REAL:
      return folderApi.create(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all }),
  });
}

export function useUpdateFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string } & UpdateFolderRequest) => {
      // MOCK:
      if (USE_MOCK) return mockApi.updateFolder(Number(id), body) as Promise<Folder>;
      // REAL:
      return folderApi.update(id, body);
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: folderKeys.all });
      qc.invalidateQueries({ queryKey: folderKeys.detail(v.id) });
    },
  });
}

export function useDeleteFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      // MOCK:
      if (USE_MOCK) return mockApi.deleteFolder(Number(id));
      // REAL:
      return folderApi.delete(id);
    },
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
};

export function useDocuments() {
  return useQuery({
    queryKey: docKeys.all,
    queryFn: () => {
      // MOCK:
      if (USE_MOCK) return mockApi.listDocuments() as Promise<Document[]>;
      // REAL:
      return documentApi.list();
    },
  });
}

export function useDocumentsByFolder(folderId: string) {
  return useQuery({
    queryKey: docKeys.byFolder(folderId),
    queryFn: () => {
      // MOCK:
      if (USE_MOCK) return mockApi.listDocsByFolder(Number(folderId)) as Promise<Document[]>;
      // REAL:
      return documentApi.listByFolder(folderId);
    },
    enabled: !!folderId,
  });
}

export function useDocument(id: number) {
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      // MOCK:
      if (USE_MOCK) return mockApi.getDocument(id) as Promise<Document>;
      // REAL:
      return documentApi.getById(id);
    },
    enabled: !!id,
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UploadDocumentRequest) => {
      // MOCK:
      if (USE_MOCK)
        return mockApi.uploadDocument({
          file: input.file,
          folderId: Number(input.folderId),
          title: input.title,
          description: input.description,
        }) as Promise<Document>;
      // REAL:
      return documentApi.upload(input);
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
    mutationFn: ({ id, ...body }: { id: number } & UpdateDocumentRequest) => {
      if (USE_MOCK) return Promise.resolve({} as Document); // mock không có updateDocument
      // REAL:
      return documentApi.update(id, body);
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: docKeys.all });
      qc.invalidateQueries({ queryKey: docKeys.detail(v.id) });
    },
  });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      // MOCK:
      if (USE_MOCK) return mockApi.deleteDocument(id);
      // REAL:
      return documentApi.delete(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: (id: number) => {
      // MOCK:
      if (USE_MOCK) return mockApi.downloadDocument(id) as Promise<{ url: string }>;
      // REAL:
      return documentApi.getDownloadUrl(id);
    },
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
    queryFn: () => {
      // MOCK:
      if (USE_MOCK) return mockApi.listShared() as Promise<SharedDocument[]>;
      // REAL:
      return shareApi.listSharedWithMe();
    },
  });
}

export function useShareInfo(documentId: number, enabled = true) {
  return useQuery({
    queryKey: sharedKeys.info(documentId),
    queryFn: () => {
      // MOCK:
      if (USE_MOCK) return mockApi.getShareInfo(documentId) as Promise<never>;
      // REAL:
      return shareApi.getShareInfo(documentId);
    },
    enabled: !!documentId && enabled,
  });
}

export function useShareDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: number; email: string }) => {
      // MOCK:
      if (USE_MOCK) return mockApi.shareDocument(input);
      // REAL:
      return shareApi.shareWithEmail(input.id, input.email);
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: sharedKeys.info(v.id) });
    },
  });
}

export function useDeleteSharedDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (shareId: number) => {
      // MOCK:
      if (USE_MOCK) return mockApi.deleteSharedDocument(shareId);
      // REAL:
      return shareApi.removeFromShared(shareId);
    },
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
    }) => {
      // MOCK:
      if (USE_MOCK)
        return mockApi.saveSharedDocument({
          ...input,
          folderId: Number(input.folderId),
        }) as Promise<Document>;
      // REAL:
      return shareApi.saveToMyFolder(input.sharedId, input.folderId, input.title, input.description);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
  });
}

export function useReportDocument() {
  return useMutation({
    mutationFn: (input: ReportDocumentRequest) => {
      // MOCK:
      if (USE_MOCK) return mockApi.reportDocument(input);
      // REAL:
      return shareApi.report(input);
    },
  });
}

// ================================================================
// RAG
// ================================================================

export function useAskRag() {
  return useMutation({
    mutationFn: (input: AskRequest) => {
      // MOCK:
      if (USE_MOCK) return mockApi.ask(input);
      // REAL:
      return ragApi.ask(input);
    },
  });
}

export function useUploadRag() {
  return useMutation({
    mutationFn: (input: { file: File; documentId: number; chunk?: boolean }) => {
      if (USE_MOCK) return Promise.resolve();
      // REAL:
      return input.chunk
        ? ragApi.uploadAndChunk(input.file, input.documentId)
        : ragApi.upload(input.file, input.documentId);
    },
  });
}

// ================================================================
// QUIZ  (sẵn sàng khi BE implement)
// ================================================================

export const quizKeys = {
  byDocument: (docId: number) => ["quiz", "document", docId] as const,
};

export function useQuizByDocument(documentId: number) {
  return useQuery({
    queryKey: quizKeys.byDocument(documentId),
    queryFn: () => quizApi.listByDocument(documentId),
    enabled: !!documentId && !USE_MOCK,
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
// FLASHCARD  (sẵn sàng khi BE implement)
// ================================================================

export const flashcardKeys = {
  byDocument: (docId: number) => ["flashcard", "document", docId] as const,
};

export function useFlashcardsByDocument(documentId: number) {
  return useQuery({
    queryKey: flashcardKeys.byDocument(documentId),
    queryFn: () => flashcardApi.listByDocument(documentId),
    enabled: !!documentId && !USE_MOCK,
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
export type { Document, Folder, SharedDocument };
