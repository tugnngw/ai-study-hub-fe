// src/features/admin/services/reportApi.ts
import type { 
  ReportedFileItem,
  ReportDecision,
  TrashItemType,
} from "../types/admin.types";

export const reportApi = {
  getReports: async (): Promise<ReportedFileItem[]> => {
    console.log("[ReportAPI] getReports called");
    try {
      const res: any = await api<any>("/api/reports");
      console.log("[ReportAPI] getReports response:", res);
      const content = res?.content || res?.data || res || [];
      console.log("[ReportAPI] getReports content:", content);
      console.log("[ReportAPI] getReports statuses:", content.map((r: any) => ({ id: r.id, status: r.status })));
      return content.map((r: any) => ({
        id: r.id, // Report ID from backend
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
      }));
    } catch (err) {
      console.error("[ReportAPI] getReports error:", err);
      return [];
    }
  },

  getReportsByReporter: async (reporterId: string): Promise<ReportedFileItem[]> => {
    const res: any = await api<any>(`/api/reports/reporter/${reporterId}`);
    const content = res?.content || res?.data || res || [];
    return content.map((r: any) => ({
      id: r.id,
      documentId: r.documentId,
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

  getReportHistory: async (): Promise<ReportedFileItem[]> => {
    console.log("[ReportAPI] getReportHistory called");
    try {
      const res: any = await api<any>("/api/reports/history");
      console.log("[ReportAPI] getReportHistory response:", res);
      console.log("[ReportAPI] getReportHistory response type:", typeof res, Object.keys(res));
      const content = res?.content || res?.data || res || [];
      console.log("[ReportAPI] getReportHistory content:", content);
      console.log("[ReportAPI] getReportHistory first item keys:", content.length > 0 ? Object.keys(content[0]) : []);
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
        decision: r.status === "accepted" ? "Đã chấp nhận" : 
                 r.status === "rejected" || r.status === "removed" ? "Không chấp nhận" : 
                 "Chấp nhận",
      }));
    } catch (err) {
      console.error("[ReportAPI] getReportHistory error:", err);
      return [];
    }
  },

  handleReportDecision: async (id: string, decision: ReportDecision): Promise<boolean> => {
    console.log("[ReportAPI] handleReportDecision:", { id, decision });
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`http://localhost:4040/api/reports/${id}/decision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          decision: decision === "approve" ? "approved" : 
                   decision === "reject" ? "rejected" : 
                   "removed", 
          comment: "" 
        }),
      });
      const text = await res.text();
      console.log("[ReportAPI] Decision response status:", res.status);
      console.log("[ReportAPI] Decision response body:", text);
      
      if (!res.ok) {
        throw new Error(`Decision failed: ${text}`);
      }
      
      return true;
    } catch (err: any) {
      console.error("[ReportAPI] handleReportDecision error:", err);
      throw err;
    }
  },
};