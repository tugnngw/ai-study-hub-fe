<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/approvals...")
import type { ApprovalItem } from "../types/admin.types";
export const approvalApi = {
  getPendingList: (): Promise<ApprovalItem[]> => Promise.resolve([]),
  approve: (_id: number): Promise<boolean> => Promise.resolve(true),
  reject: (_id: number): Promise<boolean> => Promise.resolve(true),
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
import { api } from "@/lib/api";
import type { ApprovalItem } from "../types/admin.types";
export const approvalApi = {
  getPendingList: () => api<ApprovalItem[]>("/api/admin/approvals"),
  approve: (id: number) => api<boolean>(`/api/admin/approvals/${id}/approve`, { method: "POST" }),
  reject: (id: number) => api<boolean>(`/api/admin/approvals/${id}/reject`, { method: "POST" }),
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
