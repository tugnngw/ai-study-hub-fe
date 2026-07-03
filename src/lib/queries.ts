// src/lib/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GenerateSummaryRequest, GenerateSummaryResponse } from "./types";
import {
  accountApi,
  authApi,
  documentApi,
  flashcardApi,
  folderApi,
  quizApi,
  ragApi,
  shareApi,
  summaryApi,
} from "./realApi";
import { tokenStore } from "./api";
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
    enabled: !!id && id > 0,
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
          console.log("[useDocumentsByFolder] Owner folder access failed, falling back to shared documents");
          // Fallback: get all shared documents and filter by folderId
          const sharedItems = await shareApi.listSharedWithMe();
          // Filter shares that belong to this folder and convert to Document-like objects
          const docs: Document[] = sharedItems
            .filter(share => share.folderId === folderId && share.documentId)
            .map(share => ({
              id: share.documentId!,
              ownerId: share.ownerId, // This is the owner's ID, not the current user's
              folderId: share.folderId!,
              title: share.documentTitle || "Untitled Document",
              description: null,
              summary: null,
              status: "READY", // Assume shared docs are ready to view
              cloudinaryUrl: share.cloudinaryUrl,
              publicId: null,
              mimeType: null, // We don't have this from share, but PDF viewer can work with cloudinaryUrl
              subjectId: null,
              createdAt: share.createdAt,
              updatedAt: share.createdAt,
            }));
          return docs;
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
    mutationFn: (request: {
      folderId: string;
      username?: string;
      email?: string;
    }) =>
        shareApi.shareFolder({
          folderId: request.folderId,
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
