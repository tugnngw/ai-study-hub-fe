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

  getById: (id: string) => api<Document>(`/api/documents/${id}`),

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

  update: (id: string, body: UpdateDocumentRequest) =>
    api<Document>(`/api/documents/${id}`, { method: "PUT", body }),

  delete: (id: string) =>
    api<void>(`/api/documents/${id}`, { method: "DELETE" }),

  getDownloadUrl: (id: string) =>
    api<DownloadUrlResponse>(`/api/documents/${id}/download`),

  listTrash: () => api<Document[]>("/api/documents/trash"),

  restoreFromTrash: (id: string) =>
    api<void>(`/api/documents/${id}/restore`, { method: "POST" }),

  emptyTrash: (id: string) =>
    api<void>(`/api/documents/${id}/permanent`, { method: "DELETE" }),
};
