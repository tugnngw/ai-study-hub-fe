import {
  a as folderApi,
  c as shareApi,
  i as flashcardApi,
  r as documentApi,
  s as ragApi,
} from "./realApi-Id31-bN7.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/lib/queries.ts
var folderKeys = {
  all: ["folders"],
  detail: (id) => ["folders", id],
};
function useFolders() {
  return useQuery({
    queryKey: folderKeys.all,
    queryFn: () => folderApi.list(),
  });
}
function useFolder(id) {
  return useQuery({
    queryKey: folderKeys.detail(id),
    queryFn: () => folderApi.getById(id),
    enabled: !!id && id > 0,
  });
}
function useCreateFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => folderApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all }),
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
  });
}
function useDeleteFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => folderApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all }),
  });
}
var docKeys = {
  all: ["documents"],
  byFolder: (folderId) => ["documents", "folder", folderId],
  detail: (id) => ["documents", id],
  trash: ["documents", "trash"],
};
function useDocuments() {
  return useQuery({
    queryKey: docKeys.all,
    queryFn: () => documentApi.list(),
  });
}
function useDocumentsByFolder(folderId) {
  return useQuery({
    queryKey: docKeys.byFolder(folderId),
    queryFn: () => documentApi.listByFolder(folderId),
    enabled: !!folderId,
  });
}
function useDocument(id) {
  const enabled = !!id;
  console.log("[TRACE-4] useDocument id:", id, "enabled:", enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      console.log("[TRACE-5] queryFn executing for id:", id);
      return documentApi.getById(id);
    },
    enabled,
    refetchInterval: (query) => {
      if (query.state.data?.status === "processing") {
        console.log("[Polling] Document is processing, polling every 3s");
        return 3e3;
      }
      return false;
    },
    refetchOnWindowFocus: (query) => {
      return query.state.data?.status === "processing";
    },
  });
}
function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
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
function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => documentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: docKeys.all }),
  });
}
function useDownloadDocument() {
  return useMutation({ mutationFn: (id) => documentApi.getDownloadUrl(id) });
}
function useTrash() {
  return useQuery({
    queryKey: docKeys.trash,
    queryFn: () => documentApi.listTrash(),
  });
}
function useRestoreFromTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => documentApi.restoreFromTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
      qc.invalidateQueries({ queryKey: docKeys.all });
    },
  });
}
function useEmptyTrash() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => documentApi.emptyTrash(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: docKeys.trash });
    },
  });
}
var sharedKeys = {
  all: ["shared"],
  owned: ["shared-owned"],
  info: (docId) => ["share-info", docId],
};
function useSharedDocuments() {
  return useQuery({
    queryKey: sharedKeys.all,
    queryFn: () => shareApi.listSharedWithMe(),
  });
}
function useReportDocument() {
  return useMutation({ mutationFn: (input) => shareApi.report(input) });
}
function useAskRag() {
  return useMutation({ mutationFn: (input) => ragApi.ask(input) });
}
var flashcardKeys = { byDocument: (docId) => ["flashcard", "document", docId] };
function useFlashcardsByDocument(documentId) {
  return useQuery({
    queryKey: flashcardKeys.byDocument(documentId),
    queryFn: () => flashcardApi.listByDocument(documentId),
    enabled: !!documentId,
  });
}
function useGenerateFlashcards() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId) => flashcardApi.generate(documentId),
    onSuccess: (_d, documentId) =>
      qc.invalidateQueries({ queryKey: flashcardKeys.byDocument(documentId) }),
  });
}
function useUpdateFlashcardProgress() {
  return useMutation({
    mutationFn: ({ flashcardId, status }) =>
      flashcardApi.updateProgress(flashcardId, status),
  });
}
//#endregion
export {
  useTrash as _,
  useDocument as a,
  useUploadDocument as b,
  useDownloadDocument as c,
  useFolder as d,
  useFolders as f,
  useSharedDocuments as g,
  useRestoreFromTrash as h,
  useDeleteFolder as i,
  useEmptyTrash as l,
  useReportDocument as m,
  useCreateFolder as n,
  useDocuments as o,
  useGenerateFlashcards as p,
  useDeleteDocument as r,
  useDocumentsByFolder as s,
  useAskRag as t,
  useFlashcardsByDocument as u,
  useUpdateFlashcardProgress as v,
  useUpdateFolder as y,
};
