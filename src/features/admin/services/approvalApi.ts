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
      return reports.map((r) => ({
        id: r.id,
        title: r.name || "Unknown",
        uploader: r.uploader,
        date: new Date(r.createdAt).toLocaleDateString("vi-VN"),
        size: r.size,
        reporter: r.reporter,
        reason: r.reason,
      }));
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
};