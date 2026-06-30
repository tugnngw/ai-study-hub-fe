// src/features/documents/services/ragApi.ts
// RAG (Retrieval-Augmented Generation) API — document analysis and Q&A

import { api } from "@/lib/api";
import type { AskRequest, AskResponse } from "@/lib/types";

export const ragApi = {
  processDocument: (documentId: string) =>
    api<void>(`/api/v1/rag/process/${documentId}`, { method: "POST" }),

  getDocumentStatus: (documentId: string) =>
    api<{ documentId: string; status: string }>(
      `/api/v1/rag/status/${documentId}`,
    ),

  chat: (body: { documentId: string; question: string }) =>
    api<{ answer: string; sources: unknown[] }>(`/api/v1/rag/chat`, {
      method: "POST",
      body,
    }),

  upload: (file: File, documentId: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", documentId);
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

  uploadAndChunk: (file: File, documentId: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", documentId);
    return api<void>("/api/rag/upload/chunk", { method: "POST", formData: fd });
  },

  ask: (input: AskRequest): Promise<AskResponse> =>
    api<AskResponse>("/api/rag/ask", {
      method: "POST",
      body: { id: input.id, question: input.question },
    }),
};
