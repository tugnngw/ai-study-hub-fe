// src/features/admin/services/fileApi.ts
import { adminDocumentApi } from "./documentApi";
import { adminUserApi } from "./userApi";
import { reportApi } from "./reportApi";
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

export const adminFileApi = {
  getReportedFiles: async (): Promise<ReportedFileItem[]> => {
    try {
      const reports = await reportApi.getReports();
      return reports.map((r) => ({
        ...r,
        id: r.documentId || r.id,
      }));
    } catch {
      return [];
    }
  },

  handleReportDecision: async (id: string, decision: ReportDecision): Promise<boolean> => {
    if (decision === "remove") {
      await adminDocumentApi.reject({ id });
    } else {
      await adminDocumentApi.approve(id);
    }
    return true;
  },

  getDeletedFiles: async (): Promise<DeletedFileItem[]> => {
    try {
      const docs = await adminDocumentApi.getTrash();
      return docs.map((doc) => ({
        id: doc.id,
        name: doc.title,
        deletedDate: doc.deletedAt || doc.updatedAt || new Date().toISOString(),
        remainingDays: doc.remainingDays ?? 0,
        size: doc.formattedFileSize,
      }));
    } catch {
      return [];
    }
  },

  getDeletedAccounts: async (): Promise<DeletedAccountItem[]> => {
    try {
      const accounts = await adminUserApi.getTrashUsers();
      return accounts.map((a) => ({
        id: a.id,
        name: a.name,
        email: a.email,
        deletedDate: a.deletedAt ?? new Date().toISOString(),
        remainingDays: a.remainingDays ?? 0,
      }));
    } catch {
      return [];
    }
  },

  permanentDelete: async (id: string, type: TrashItemType): Promise<boolean> => {
    if (type === "file") {
      await adminDocumentApi.delete(id);
    } else if (type === "account") {
      await adminUserApi.hardDeleteUser(id);
    }
    return true;
  },

  restoreItem: async (id: string, type: TrashItemType): Promise<boolean> => {
    if (type === "file") {
      await adminDocumentApi.restore(id);
    } else if (type === "account") {
      await adminUserApi.restoreUser(id);
    }
    return true;
  },
};
