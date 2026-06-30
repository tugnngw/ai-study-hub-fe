// src/features/admin/services/fileApi.ts
import { adminDocumentApi } from "./documentApi";
import type {
  ReportedFileItem,
  ReportDecision,
  DeletedFileItem,
  DeletedAccountItem,
  TrashItemType,
} from "../types/admin.types";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function calculateRemainingDays(deletedAt: string): number {
  const diff = 30 - Math.floor((Date.now() - new Date(deletedAt).getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export const adminFileApi = {
  getReportedFiles: async (): Promise<ReportedFileItem[]> => {
    try {
      const docs = await adminDocumentApi.getByStatus("PENDING");
      return docs.map((doc) => ({
        id: parseInt(doc.id),
        name: doc.title,
        uploader: doc.ownerId || "Unknown",
        size: formatFileSize(doc.fileSize || 0),
        reports: 1,
        reporter: "System",
        reason: "Báo cáo từ người dùng",
      }));
    } catch {
      return [];
    }
  },

  handleReportDecision: async (id: number, decision: ReportDecision): Promise<boolean> => {
    const docId = String(id);
    if (decision === "remove") {
      await adminDocumentApi.reject(docId);
    } else {
      await adminDocumentApi.approve(docId);
    }
    return true;
  },

  getDeletedFiles: async (): Promise<DeletedFileItem[]> => {
    try {
      const docs = await adminDocumentApi.getTrash();
      return docs.map((doc) => ({
        id: parseInt(doc.id),
        name: doc.title,
        deletedDate: doc.deletedAt || doc.updatedAt || new Date().toISOString(),
        remainingDays: calculateRemainingDays(doc.deletedAt || doc.updatedAt || new Date().toISOString()),
      }));
    } catch {
      return [];
    }
  },

  getDeletedAccounts: async (): Promise<DeletedAccountItem[]> => {
    // Backend chưa có API này
    return [];
  },

  permanentDelete: async (id: number, type: TrashItemType): Promise<boolean> => {
    if (type === "file") {
      await adminDocumentApi.delete(String(id));
    }
    return true;
  },

  restoreItem: async (id: number, type: TrashItemType): Promise<boolean> => {
    if (type === "file") {
      await adminDocumentApi.restore(String(id));
    }
    return true;
  },
};