import { n as api } from "./api-WaaweWSf.js";
//#region src/features/admin/services/reportApi.ts
var reportApi = {
	getReports: async () => {
		console.log("[ReportAPI] getReports called");
		try {
			const res = await api("/api/reports");
			console.log("[ReportAPI] getReports response:", res);
			const content = res?.content || res?.data || res || [];
			console.log("[ReportAPI] getReports content:", content);
			console.log("[ReportAPI] getReports statuses:", content.map((r) => ({
				id: r.id,
				status: r.status
			})));
			return content.map((r) => ({
				id: r.id,
				documentId: r.documentId,
				documentTitle: r.documentTitle,
				name: r.documentTitle || "Unknown",
				uploader: r.reporterUsername || r.reporterId || "Unknown",
				size: "N/A",
				reports: 1,
				reporter: r.reporterUsername || "Anonymous",
				reason: r.reason || "No reason provided",
				createdAt: r.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
				status: r.status || "pending"
			}));
		} catch (err) {
			console.error("[ReportAPI] getReports error:", err);
			return [];
		}
	},
	getReportsByReporter: async (reporterId) => {
		const res = await api(`/api/reports/reporter/${reporterId}`);
		return (res?.content || res?.data || res || []).map((r) => ({
			id: r.id,
			documentId: r.documentId,
			name: r.documentTitle || "Unknown",
			uploader: r.reporterUsername || r.reporterId || "Unknown",
			size: "N/A",
			reports: 1,
			reporter: r.reporterUsername || "Anonymous",
			reason: r.reason || "No reason provided",
			createdAt: r.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
			status: r.status || "pending"
		}));
	},
	getReportHistory: async () => {
		console.log("[ReportAPI] getReportHistory called");
		try {
			const res = await api("/api/reports/history");
			console.log("[ReportAPI] getReportHistory response:", res);
			console.log("[ReportAPI] getReportHistory response type:", typeof res, Object.keys(res));
			const content = res?.content || res?.data || res || [];
			console.log("[ReportAPI] getReportHistory content:", content);
			console.log("[ReportAPI] getReportHistory first item keys:", content.length > 0 ? Object.keys(content[0]) : []);
			return content.map((r) => ({
				id: r.id,
				documentId: r.documentId,
				documentTitle: r.documentTitle,
				name: r.documentTitle || "Unknown",
				uploader: r.reporterUsername || r.reporterId || "Unknown",
				size: "N/A",
				reports: 1,
				reporter: r.reporterUsername || "Anonymous",
				reason: r.reason || "No reason provided",
				createdAt: r.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
				status: r.status || "pending",
				decision: r.status === "accepted" ? "Đã chấp nhận" : r.status === "rejected" || r.status === "removed" ? "Không chấp nhận" : "Đang chờ xử lý"
			}));
		} catch (err) {
			console.error("[ReportAPI] getReportHistory error:", err);
			return [];
		}
	},
	handleReportDecision: async (id, decision) => {
		console.log("[ReportAPI] handleReportDecision:", {
			id,
			decision
		});
		try {
			const token = localStorage.getItem("auth_token");
			const res = await fetch(`http://localhost:4040/api/reports/${id}/decision`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					decision: decision === "approve" ? "approved" : decision === "reject" ? "rejected" : "removed",
					comment: ""
				})
			});
			const text = await res.text();
			console.log("[ReportAPI] Decision response status:", res.status);
			console.log("[ReportAPI] Decision response body:", text);
			if (!res.ok) throw new Error(`Decision failed: ${text}`);
			return true;
		} catch (err) {
			console.error("[ReportAPI] handleReportDecision error:", err);
			throw err;
		}
	}
};
//#endregion
export { reportApi as t };
