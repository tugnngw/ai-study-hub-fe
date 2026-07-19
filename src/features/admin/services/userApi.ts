// TODO(backend): api<T>("/api/admin/users...")
import type { AdminUserItem } from "../types/admin.types";
export const adminUserApi = {
  getUsers: (): Promise<AdminUserItem[]> => Promise.resolve([]),
  toggleStatus: (_id: number): Promise<boolean> => Promise.resolve(true),
  deleteUser: (_id: number): Promise<boolean> => Promise.resolve(true),
};
