<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/files...","/api/admin/trash...")
=======
import { api } from "@/lib/api";
>>>>>>> origin/update/feature/share
=======
import { api } from "@/lib/api";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { api } from "@/lib/api";
>>>>>>> origin/Flashcards-fix
=======
import { api } from "@/lib/api";
>>>>>>> origin/admin-added-fix
import type {
  ReportedFileItem, ReportDecision, DeletedFileItem, DeletedAccountItem, TrashItemType,
} from "../types/admin.types";
export const adminFileApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  getReportedFiles: (): Promise<ReportedFileItem[]> => Promise.resolve([]),
  handleReportDecision: (_id: number, _d: ReportDecision): Promise<boolean> => Promise.resolve(true),
  getDeletedFiles: (): Promise<DeletedFileItem[]> => Promise.resolve([]),
  getDeletedAccounts: (): Promise<DeletedAccountItem[]> => Promise.resolve([]),
  permanentDelete: (_id: number, _t: TrashItemType): Promise<boolean> => Promise.resolve(true),
  restoreItem: (_id: number, _t: TrashItemType): Promise<boolean> => Promise.resolve(true),
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  getReportedFiles: () => api<ReportedFileItem[]>("/api/admin/files/reported"),
  handleReportDecision: (id: number, decision: ReportDecision) =>
    api<boolean>(`/api/admin/files/${id}/decision`, { method: "POST", body: { decision } }),
  getDeletedFiles: () => api<DeletedFileItem[]>("/api/admin/trash/files"),
  getDeletedAccounts: () => api<DeletedAccountItem[]>("/api/admin/trash/accounts"),
  permanentDelete: (id: number, type: TrashItemType) =>
    api<boolean>(`/api/admin/trash/${type}/${id}`, { method: "DELETE" }),
  restoreItem: (id: number, type: TrashItemType) =>
    api<boolean>(`/api/admin/trash/${type}/${id}/restore`, { method: "POST" }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
// src/features/admin/services/fileApi.ts
import { adminDocumentApi } from "./documentApi";
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

function calculateRemainingDays(deletedAt: string): number {
  const diff = 30 - Math.floor((Date.now() - new Date(deletedAt).getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export const adminFileApi = {
  getReportedFiles: async (): Promise<ReportedFileItem[]> => {
    try {
      const reports = await reportApi.getReports();
      return reports.map((r) => ({
        id: r.documentId,
        name: r.documentTitle || "Unknown",
        uploader: r.reporterId || "Unknown",
        size: "N/A",
        reports: 1,
        reporter: r.reporterUsername || "Unknown",
        reason: r.reason,
        createdAt: r.createdAt,
      }));
    } catch {
      return [];
    }
  },

  handleReportDecision: async (id: string, decision: ReportDecision): Promise<boolean> => {
    if (decision === "remove") {
      await adminDocumentApi.reject(id);
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
        remainingDays: calculateRemainingDays(doc.deletedAt || doc.updatedAt || new Date().toISOString()),
      }));
    } catch {
      return [];
    }
  },

  getDeletedAccounts: async (): Promise<DeletedAccountItem[]> => {
    return [];
  },

  permanentDelete: async (id: string, type: TrashItemType): Promise<boolean> => {
    if (type === "file") {
      await adminDocumentApi.delete(id);
    }
    return true;
  },

  restoreItem: async (id: string, type: TrashItemType): Promise<boolean> => {
    if (type === "file") {
      await adminDocumentApi.restore(id);
    }
    return true;
  },
>>>>>>> origin/Flashcars
};
