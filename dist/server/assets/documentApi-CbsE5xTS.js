import { r as api } from "./api-DGaHVnww.js";
//#region src/features/admin/services/documentApi.ts
var adminDocumentApi = {
	getAll: () => api("/api/admin/documents"),
	getByStatus: (status) => api(`/api/admin/documents/status/${status}`),
	getTrash: () => api("/api/admin/documents/trash"),
	delete: (id) => api(`/api/admin/documents/${id}`, { method: "DELETE" }),
	restore: (id) => api(`/api/admin/documents/${id}/restore`, { method: "POST" }),
	approve: (id) => api(`/api/admin/documents/${id}/approve`, { method: "PATCH" }),
	reject: (id) => api(`/api/admin/documents/${id}/reject`, { method: "PATCH" })
};
//#endregion
export { adminDocumentApi as t };
