import { n as api } from "./api-DDxKl-Hx.js";
//#region src/features/admin/services/reportApi.ts
var reportApi = {
	getReports: async () => {
		try {
			const page = await api("/api/reports");
			return (page?.content ?? page ?? []).map((r) => ({
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
				createdAt: r.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
				status: r.status || "pending"
			}));
		} catch {
			return [];
		}
	},
	getReportsByReporter: async (reporterId) => {
		const page = await api("/api/reports/my");
		return (page?.content ?? page ?? []).map((r) => ({
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
			cloudinaryUrl: r.cloudinaryUrl,
			mimeType: r.mimeType
		}));
	},
	getReportHistory: async () => {
		try {
			const page = await api("/api/reports/history");
			return (page?.content ?? page ?? []).map((r) => ({
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
				createdAt: r.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
				status: r.status || "pending",
				decision: r.status === "approved" ? "Đã chấp nhận" : r.status === "rejected" || r.status === "removed" ? "Không chấp nhận" : "Chờ xử lý"
			}));
		} catch {
			return [];
		}
	},
	handleReportDecision: async (id, decision, reason) => {
		try {
			await api(`/api/reports/${id}/decision`, {
				method: "POST",
				body: {
					decision: decision === "approve" ? "approved" : decision === "reject" ? "rejected" : "removed",
					comment: reason ?? ""
				}
			});
			return true;
		} catch (err) {
			throw err;
		}
	}
};
//#endregion
export { reportApi as t };
