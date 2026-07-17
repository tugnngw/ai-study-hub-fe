import { n as api } from "./api-CE3th9nP.js";
//#region src/features/admin/services/documentApi.ts
var adminDocumentApi = {
	getAll: () => api("/api/admin/documents"),
	getByStatus: (status) => api(`/api/admin/documents/status/${status}`),
	getTrash: () => api("/api/admin/documents/trash"),
	delete: (id) => api(`/api/admin/documents/${id}`, { method: "DELETE" }),
	restore: (id) => api(`/api/admin/documents/${id}/restore`, { method: "POST" }),
	approve: (id) => api(`/api/admin/documents/${id}/approve`, { method: "PATCH" }),
	reject: (data) => {
		if (!data.id || data.id === "undefined") throw new Error("Invalid Document ID");
		return api(`/api/admin/documents/${data.id}/reject`, {
			method: "PATCH",
			body: data.reason ?? "",
			headers: { "Content-Type": "text/plain" }
		});
	}
};
//#endregion
export { adminDocumentApi as t };
