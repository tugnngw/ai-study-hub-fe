import { n as api } from "./api-DDxKl-Hx.js";
//#region src/features/admin/services/userApi.ts
var adminUserApi = {
	getUsers: async () => {
		const response = await api("/api/admin/users");
		const content = response?.content ?? response ?? [];
		return Array.isArray(content) ? content.map((u) => ({
			id: u.id ?? u.accountId,
			name: u.fullName ?? u.username ?? "Unknown",
			email: u.email ?? "",
			status: u.status === "ACTIVE" ? "Hoạt động" : u.status === "INACTIVE" ? "Ngưng hoạt động (Khóa)" : u.status === "SOFT_deleted" ? "Xóa mềm" : "Không xác định",
			plan: u.plan || (u.role === "ADMIN" ? "PRO" : "FREE"),
			role: u.role,
			createdAt: u.createdAt,
			lastLoginAt: u.lastLoginAt
		})) : [];
	},
	getUserById: async (id) => {
		return await api(`/api/admin/users/${id}`);
	},
	lockUser: (id) => api(`/api/admin/users/${id}/lock`, { method: "PATCH" }),
	unlockUser: (id) => api(`/api/admin/users/${id}/unlock`, { method: "PATCH" }),
	softDeleteUser: (id) => api(`/api/admin/users/${id}`, { method: "DELETE" }),
	hardDeleteUser: (id) => api(`/api/admin/users/${id}/hard`, { method: "DELETE" }),
	getTrashUsers: async () => {
		const response = await api("/api/admin/users/trash");
		const list = response?.data ?? response ?? [];
		return Array.isArray(list) ? list.map((u) => ({
			id: u.id ?? u.accountId,
			name: u.fullName ?? u.username ?? "Unknown",
			email: u.email ?? "",
			status: "Xóa mềm",
			plan: "FREE",
			role: u.role,
			deletedAt: u.deletedAt
		})) : [];
	},
	restoreUser: (id) => api(`/api/admin/users/${id}/restore`, { method: "PATCH" }),
	toggleStatus: (id) => api(`/api/admin/users/${id}/toggle-status`, { method: "PATCH" })
};
//#endregion
export { adminUserApi as t };
