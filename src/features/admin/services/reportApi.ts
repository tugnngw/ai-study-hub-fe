import { api } from "@/lib/api";
import type {
  ReportedFileItem,
  ReportDecision,
} from "../types/admin.types";

export const reportApi = {
  // GET /api/reports — ApiResponse<Page<ReportResponse>>
  getReports: async (): Promise<ReportedFileItem[]> => {
    try {
      // api() unwraps ApiResponse.data, result is Page<ReportResponse> = { content, totalElements, ... }
      const page: any = await api<any>("/api/reports");
      const content = page?.content ?? page ?? [];
      return content.map((r: any) => ({
        id: r.id,
        documentId: r.documentId,
        documentTitle: r.documentTitle,
        cloudinaryUrl: r.cloudinaryUrl,
        name: r.documentTitle || "Unknown",
        uploader: r.reporterUsername || r.reporterId || "Unknown",
        size: "N/A",
        reports: 1,
        reporter: r.reporterUsername || "Anonymous",
        reason: r.reason || "No reason provided",
        createdAt: r.createdAt || new Date().toISOString(),
        status: r.status || "pending",
      }));
    } catch {
      return [];
    }
  },

  // GET /api/reports/my — current user's reports
  getReportsByReporter: async (reporterId: string): Promise<ReportedFileItem[]> => {
    const page: any = await api<any>("/api/reports/my");
    const content = page?.content ?? page ?? [];
    return content.map((r: any) => ({
      id: r.id,
      documentId: r.documentId,
      documentTitle: r.documentTitle,
      name: r.documentTitle || "Unknown",
      uploader: r.reporterUsername || r.reporterId || "Unknown",
      size: "N/A",
      reports: 1,
      reporter: r.reporterUsername || "Anonymous",
      reason: r.reason || "No reason provided",
      createdAt: r.createdAt || new Date().toISOString(),
      status: r.status || "pending",
      cloudinaryUrl: r.cloudinaryUrl,
      mimeType: r.mimeType,
    }));
  },

  // GET /api/reports/history — ApiResponse<Page<ReportResponse>>
  getReportHistory: async (): Promise<ReportedFileItem[]> => {
    try {
      const page: any = await api<any>("/api/reports/history");
      const content = page?.content ?? page ?? [];
      return content.map((r: any) => ({
        id: r.id,
        documentId: r.documentId,
        documentTitle: r.documentTitle,
        cloudinaryUrl: r.cloudinaryUrl,
        name: r.documentTitle || "Unknown",
        uploader: r.reporterUsername || r.reporterId || "Unknown",
        size: "N/A",
        reports: 1,
        reporter: r.reporterUsername || "Anonymous",
        reason: r.reason || "No reason provided",
        createdAt: r.createdAt || new Date().toISOString(),
        status: r.status || "pending",
        decision: r.status === "approved" ? "Đã chấp nhận" :
                 r.status === "rejected" || r.status === "removed" ? "Không chấp nhận" :
                 "Chờ xử lý",
      }));
    } catch {
      return [];
    }
  },

  // POST /api/reports/{id}/decision — body { decision: "approved"|"rejected"|"removed", comment }
  handleReportDecision: async (id: string, decision: ReportDecision, reason?: string): Promise<boolean> => {
    try {
      await api<void>(`/api/reports/${id}/decision`, {
        method: "POST",
        body: {
          decision: decision === "approve" ? "approved" :
                   decision === "reject" ? "rejected" :
                   "removed",
          comment: reason ?? "",
        },
      });
      return true;
    } catch (err: any) {
      throw err;
    }
  },
};
