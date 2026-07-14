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

  reject: (data: { id: string; reason?: string }): Promise<void> => {
    if (!data.id || data.id === "undefined") {
      throw new Error("Invalid Document ID");
    }
    return api<void>(`/api/admin/documents/${data.id}/reject`, {
      method: "PATCH",
      body: data.reason ?? "",
      headers: { "Content-Type": "text/plain" }
    });
  }
};
