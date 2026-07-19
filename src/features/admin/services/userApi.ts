<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/users...")
import type { AdminUserItem } from "../types/admin.types";
export const adminUserApi = {
  getUsers: (): Promise<AdminUserItem[]> => Promise.resolve([]),
  toggleStatus: (_id: number): Promise<boolean> => Promise.resolve(true),
  deleteUser: (_id: number): Promise<boolean> => Promise.resolve(true),
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
import { api } from "@/lib/api";
import type { AdminUserItem } from "../types/admin.types";
export const adminUserApi = {
  getUsers: () => api<AdminUserItem[]>("/api/admin/users"),
  toggleStatus: (id: number) => api<boolean>(`/api/admin/users/${id}/toggle-status`, { method: "POST" }),
  deleteUser: (id: number) => api<boolean>(`/api/admin/users/${id}`, { method: "DELETE" }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
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
      plan: u.role === "ADMIN" ? "PRO" as const : "FREE" as const,
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

  restoreUser: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}/restore`, { method: "PATCH" }),

  toggleStatus: (id: string): Promise<AdminUserItem> =>
      api<AdminUserItem>(`/api/admin/users/${id}/toggle-status`, { method: "PATCH" }),
>>>>>>> origin/Flashcars
};
