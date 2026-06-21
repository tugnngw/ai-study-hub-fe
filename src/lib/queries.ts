// src/lib/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    retry: false,
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

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UploadDocumentRequest) => documentApi.upload(input),
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
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: (id: number) => documentApi.getDownloadUrl(id),
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
    mutationFn: (id: number) => documentApi.restoreFromTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
      qc.invalidateQueries({ queryKey: docKeys.all });
    },
  });
}

export function useEmptyTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => documentApi.emptyTrash(id),
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
    }) => shareApi.saveToMyFolder(input.sharedId, input.folderId, input.title, input.description),
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
// QUIZ
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
// FLASHCARD
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

export type { Document, Folder, SharedDocument };