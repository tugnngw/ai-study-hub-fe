<<<<<<< HEAD
// src/features/documents/services/documentApi.ts
// Document API — CRUD operations for documents

=======
>>>>>>> origin/final/demo-v1
import { api } from "@/lib/api";
import type {
  Document,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  DownloadUrlResponse,
} from "../types/document.types";

export const documentApi = {
  list: () => api<Document[]>("/api/documents"),

  listByFolder: (folderId: string) =>
    api<Document[]>(`/api/documents/folder/${folderId}`),

<<<<<<< HEAD
<<<<<<< HEAD
  getById: (id: number) => {
    console.log('[TRACE-6] documentApi.getById called with id:', id);
=======
  getById: (id: string) => {
    console.log("[TRACE-6] documentApi.getById called with id:", id);
>>>>>>> origin/Flashcars
    return api<Document>(`/api/documents/${id}`);
  },
=======
  getById: (id: string) => api<Document>(`/api/documents/${id}`),
>>>>>>> origin/final/demo-v1

  upload: async (input: UploadDocumentRequest): Promise<Document[]> => {
    const fd = new FormData();
    fd.append("files", input.file);
    fd.append("title", input.title);
    if (input.description) {
      fd.append("description", input.description);
    }
    if (input.folderId) {
      fd.append("folderId", input.folderId);
    }
    if (input.subjectId) {
      fd.append("subjectId", String(input.subjectId));
    }
    return api<Document[]>("/api/documents", {
      method: "POST",
      formData: fd,
    });
  },

<<<<<<< HEAD
<<<<<<< HEAD
  update: (id: number, body: UpdateDocumentRequest) =>
    api<Document>(`/api/documents/${id}`, { method: "PUT", body }),

  delete: (id: number) =>
    api<void>(`/api/documents/${id}`, { method: "DELETE" }),

  getDownloadUrl: (id: number) =>
=======
=======
>>>>>>> origin/final/demo-v1
  update: (id: string, body: UpdateDocumentRequest) =>
    api<Document>(`/api/documents/${id}`, { method: "PUT", body }),

  delete: (id: string) =>
    api<void>(`/api/documents/${id}`, { method: "DELETE" }),

  getDownloadUrl: (id: string) =>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
    api<DownloadUrlResponse>(`/api/documents/${id}/download`),

  listTrash: () => api<Document[]>("/api/documents/trash"),

<<<<<<< HEAD
<<<<<<< HEAD
  restoreFromTrash: (id: number) =>
    api<void>(`/api/documents/${id}/restore`, { method: "POST" }),

  emptyTrash: (id: number) =>
=======
=======
>>>>>>> origin/final/demo-v1
  restoreFromTrash: (id: string) =>
    api<void>(`/api/documents/${id}/restore`, { method: "POST" }),

  emptyTrash: (id: string) =>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
    api<void>(`/api/documents/${id}/permanent`, { method: "DELETE" }),
};
