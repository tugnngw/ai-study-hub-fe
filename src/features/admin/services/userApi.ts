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
};
