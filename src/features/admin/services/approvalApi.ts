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
        documentId: (r as any).documentId,
        title: r.name || "Unknown",
        uploader: r.uploader,
        date: new Date(r.createdAt ?? new Date().toISOString()).toLocaleDateString("vi-VN"),
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

  reject: async (id: string, reason: string): Promise<boolean> => {
    await reportApi.handleReportDecision(id, "reject", reason);
    return true;
  },
};