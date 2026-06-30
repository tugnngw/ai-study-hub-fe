import { api } from "@/lib/api";
import type { ApprovalItem } from "../types/admin.types";
export const approvalApi = {
  getPendingList: () => api<ApprovalItem[]>("/api/admin/approvals"),
  approve: (id: number) => api<boolean>(`/api/admin/approvals/${id}/approve`, { method: "POST" }),
  reject: (id: number) => api<boolean>(`/api/admin/approvals/${id}/reject`, { method: "POST" }),
};
