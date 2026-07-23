// src/features/admin/services/userApi.ts
import { api } from "@/lib/api";
import type { AdminUserItem } from "../types/admin.types";

export const adminUserApi = {
  getUsers: async (): Promise<AdminUserItem[]> => {
    const response = await api<any>("/api/admin/users");
    const content = response?.content ?? response ?? [];
    
    // Map backend UserResponse → frontend AdminUserItem
    return Array.isArray(content) ? content.map((u: any) => ({
      id: u.id ?? u.accountId,
      name: u.fullName ?? u.username ?? "Unknown",
      email: u.email ?? "",
      status: u.status === "ACTIVE" ? "Hoạt động" as const :
              u.status === "INACTIVE" ? "Ngưng hoạt động (Khóa)" as const :
              u.status === "SOFT_deleted" ? "Xóa mềm" as const :
              "Không xác định" as const,
      plan: u.plan || (u.role === "ADMIN" ? "PRO" : "FREE"),
      role: u.role,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
    })) : [];
  },

  getUserById: async (id: string): Promise<AdminUserItem> => {
    const response = await api<AdminUserItem>(`/api/admin/users/${id}`);
    return response;
  },

  lockUser: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}/lock`, { method: "PATCH" }),

  unlockUser: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}/unlock`, { method: "PATCH" }),

  softDeleteUser: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}`, { method: "DELETE" }),

  hardDeleteUser: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}/hard`, { method: "DELETE" }),

  getTrashUsers: async (): Promise<AdminUserItem[]> => {
    const response = await api<any>("/api/admin/users/trash");
    const list = response?.data ?? response ?? [];
    return Array.isArray(list) ? list.map((u: any) => ({
      id: u.id ?? u.accountId,
      name: u.fullName ?? u.username ?? "Unknown",
      email: u.email ?? "",
      status: "Xóa mềm" as const,
      plan: "FREE" as const,
      role: u.role,
      deletedAt: u.deletedAt,
    })) : [];
  },

  restoreUser: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}/restore`, { method: "PATCH" }),

  toggleStatus: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}/toggle-status`, { method: "PATCH" }),
};
