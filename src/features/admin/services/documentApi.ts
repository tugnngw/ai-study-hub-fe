// src/features/admin/services/documentApi.ts
import { api } from "@/lib/api";
import type { DocumentResponse, DocumentStatus } from "../types/admin.types";

export const adminDocumentApi = {
  getAll: (): Promise<DocumentResponse[]> =>
      api<DocumentResponse[]>("/api/admin/documents"),

  getByStatus: (status: DocumentStatus): Promise<DocumentResponse[]> =>
      api<DocumentResponse[]>(`/api/admin/documents/status/${status}`),

  getTrash: (): Promise<DocumentResponse[]> =>
      api<DocumentResponse[]>("/api/admin/documents/trash"),

  delete: (id: string): Promise<void> =>
      api<void>(`/api/admin/documents/${id}`, { method: "DELETE" }),

  restore: (id: string): Promise<void> =>
      api<void>(`/api/admin/documents/${id}/restore`, { method: "POST" }),

  approve: (id: string): Promise<void> =>
      api<void>(`/api/admin/documents/${id}/approve`, { method: "PATCH" }),

  reject: (id: string): Promise<void> =>
      api<void>(`/api/admin/documents/${id}/reject`, { method: "PATCH" }),
};