// src/features/admin/services/approvalApi.ts
import { adminDocumentApi } from "./documentApi";
import type { ApprovalItem } from "../types/admin.types";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export const approvalApi = {
  getPendingList: async (): Promise<ApprovalItem[]> => {
    const docs = await adminDocumentApi.getByStatus("COMPLETED");
    return docs.map((doc) => ({
      id: parseInt(doc.id),
      title: doc.title,
      uploader: doc.ownerId || "Unknown",
      date: new Date(doc.createdAt).toLocaleDateString("vi-VN"),
      size: doc.fileSize ? formatFileSize(doc.fileSize) : "0 KB",
    }));
  },

  approve: async (id: number): Promise<boolean> => {
    await adminDocumentApi.approve(String(id));
    return true;
  },

  reject: async (id: number): Promise<boolean> => {
    await adminDocumentApi.reject(String(id));
    return true;
  },
};