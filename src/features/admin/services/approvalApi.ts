<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/approvals...")
import type { ApprovalItem } from "../types/admin.types";
export const approvalApi = {
  getPendingList: (): Promise<ApprovalItem[]> => Promise.resolve([]),
  approve: (_id: number): Promise<boolean> => Promise.resolve(true),
  reject: (_id: number): Promise<boolean> => Promise.resolve(true),
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
import { api } from "@/lib/api";
import type { ApprovalItem } from "../types/admin.types";
export const approvalApi = {
  getPendingList: () => api<ApprovalItem[]>("/api/admin/approvals"),
  approve: (id: number) => api<boolean>(`/api/admin/approvals/${id}/approve`, { method: "POST" }),
  reject: (id: number) => api<boolean>(`/api/admin/approvals/${id}/reject`, { method: "POST" }),
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
};
=======
=======
>>>>>>> origin/final/demo-v1
// src/features/admin/services/approvalApi.ts
import { reportApi } from "./reportApi";
import type { ApprovalItem } from "../types/admin.types";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export const approvalApi = {
  getPendingList: async (): Promise<ApprovalItem[]> => {
    try {
      const reports = await reportApi.getReports();
      // Filter only pending reports (including those with null/undefined status)
      const pendingReports = reports.filter(r => !r.status || r.status === "pending");
      const data = pendingReports.map((r) => ({
        id: r.id,
<<<<<<< HEAD
=======
        documentId: (r as any).documentId,
>>>>>>> origin/final/demo-v1
        title: r.name || "Unknown",
        uploader: r.uploader,
        date: new Date(r.createdAt).toLocaleDateString("vi-VN"),
        size: r.size,
        reporter: r.reporter,
        reason: r.reason,
      }));
      console.log("[approvalApi.getPendingList] returning pending reports length:", data.length, "total reports:", reports.length);
      return JSON.parse(JSON.stringify(data));
    } catch {
      return [];
    }
  },

  approve: async (id: string): Promise<boolean> => {
    await reportApi.handleReportDecision(id, "approve");
    return true;
  },

  reject: async (id: string): Promise<boolean> => {
    await reportApi.handleReportDecision(id, "reject");
    return true;
  },
<<<<<<< HEAD
};
>>>>>>> origin/Flashcars
=======
};
>>>>>>> origin/final/demo-v1
