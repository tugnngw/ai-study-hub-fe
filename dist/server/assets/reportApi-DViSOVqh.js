import { n as api } from "./api-WaaweWSf.js";
//#region src/features/admin/services/reportApi.ts
var reportApi = {
	getReports: async () => {
		const res = await api("/api/reports");
		return (res?.content || res?.data || res || []).map((r) => ({
			id: r.documentId,
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
	getReportsByReporter: async (reporterId) => {
		const res = await api(`/api/reports/reporter/${reporterId}`);
		return (res?.content || res?.data || res || []).map((r) => ({
			id: r.documentId,
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
	handleReportDecision: async (id, decision) => {
		return await api(`/api/reports/${id}/decision`, {
			method: "POST",
			body: {
				decision: decision === "approve" ? "approved" : decision === "reject" ? "rejected" : "removed",
				comment: ""
			}
		}) !== null;
	}
};
//#endregion
export { reportApi as t };
