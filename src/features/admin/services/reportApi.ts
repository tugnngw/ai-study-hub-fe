// src/features/admin/services/reportApi.ts
import { api } from "@/lib/api";
import type { 
  ReportedFileItem,
  ReportDecision,
  TrashItemType,
} from "../types/admin.types";

export const reportApi = {
  getReports: async (): Promise<ReportedFileItem[]> => {
    const res: any = await api<any>("/api/reports");
    const content = res?.content || res?.data || res || [];
    return content.map((r: any) => ({
      id: r.documentId,
      name: r.documentTitle || "Unknown",
      uploader: r.reporterUsername || r.reporterId || "Unknown",
      size: "N/A",
      reports: 1,
      reporter: r.reporterUsername || "Anonymous",
      reason: r.reason || "No reason provided",
      createdAt: r.createdAt || new Date().toISOString(),
      status: r.status || "pending",
    }));
  },

  getReportsByReporter: async (reporterId: string): Promise<ReportedFileItem[]> => {
    const res: any = await api<any>(`/api/reports/reporter/${reporterId}`);
    const content = res?.content || res?.data || res || [];
    return content.map((r: any) => ({
      id: r.documentId,
      name: r.documentTitle || "Unknown",
      uploader: r.reporterUsername || r.reporterId || "Unknown",
      size: "N/A",
      reports: 1,
      reporter: r.reporterUsername || "Anonymous",
      reason: r.reason || "No reason provided",
      createdAt: r.createdAt || new Date().toISOString(),
      status: r.status || "pending",
    }));
  },

  handleReportDecision: async (id: string, decision: ReportDecision): Promise<boolean> => {
    const result = await api(`/api/reports/${id}/decision`, {
      method: "POST",
      body: { 
        decision: decision === "approve" ? "approved" : 
                 decision === "reject" ? "rejected" : 
                 "removed", 
        comment: "" 
      },
    });
    return result !== null;
  },
};