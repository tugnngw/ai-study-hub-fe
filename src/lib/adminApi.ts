// =============================================================
// adminApi.ts — API cho khu Quản trị (Admin)
// Port từ project FE_updated, dùng chung api() client (base URL: VITE_API_BASE)
// Tất cả path đều đi qua api() -> tự ghép `${API_BASE}/api` + path
// =============================================================

import { api } from "./api";

// ---------- Dashboard ----------
export interface ActivityItem { id: number; action: string; user: string; time: string; }
export interface DashboardStats {
  totalUsers: number;
  totalDocs: number;
  downloads: number;
  usersTrend: string;
  docsTrend: string;
  downloadsTrend: string;
  activities: ActivityItem[];
}

export const dashboardApi = {
  // GET /api/admin/dashboard/stats
  getStats: () => api<DashboardStats>("/admin/dashboard/stats"),
};

// ---------- Users ----------
export interface UserItem { id: number; name: string; email: string; status: "Hoạt động" | "Khóa"; }

export const userApi = {
  // GET /api/admin/users
  getUsers: () => api<UserItem[]>("/admin/users"),
  // PATCH /api/admin/users/:id/toggle-status
  toggleStatus: (id: number) => api<boolean>(`/admin/users/${id}/toggle-status`, { method: "PATCH" }),
  // DELETE /api/admin/users/:id
  deleteUser: (id: number) => api<boolean>(`/admin/users/${id}`, { method: "DELETE" }),
};

// ---------- Approval ----------
export interface ApprovalItem { id: number; title: string; uploader: string; size: string; result: "approved" | "rejected"; }

export const approvalApi = {
  // GET /api/admin/approvals/pending
  getPendingList: () => api<ApprovalItem[]>("/admin/approvals/pending"),
  // PATCH /api/admin/approvals/:id/approve
  approve: (id: number) => api<boolean>(`/admin/approvals/${id}/approve`, { method: "PATCH" }),
  // PATCH /api/admin/approvals/:id/reject
  reject: (id: number) => api<boolean>(`/admin/approvals/${id}/reject`, { method: "PATCH" }),
};

// ---------- Files / Reports / Trash ----------
export interface Reporter { name: string; reason: string; detail: string; }
export interface ReportedFileItem { id: number; name: string; uploader: string; size: string; reports: number; reportedBy: Reporter; }
export interface DeletedFileItem { id: number; name: string; deletedDate: string; remainingDays: number; }
export interface DeletedAccountItem { id: number; name: string; deletedDate: string; remainingDays: number; }

export const fileApi = {
  // GET /api/admin/files/reported
  getReportedFiles: () => api<ReportedFileItem[]>("/admin/files/reported"),
  // PATCH /api/admin/files/reported/:id/decision  body: { decision }
  handleReportDecision: (id: number, decision: "remove" | "reject") =>
    api<boolean>(`/admin/files/reported/${id}/decision`, { method: "PATCH", body: { decision } }),
  // GET /api/admin/trash/files
  getDeletedFiles: () => api<DeletedFileItem[]>("/admin/trash/files"),
  // GET /api/admin/trash/accounts
  getDeletedAccounts: () => api<DeletedAccountItem[]>("/admin/trash/accounts"),
  // DELETE /api/admin/trash/:type/:id
  permanentDelete: (id: number, type: "file" | "account") =>
    api<boolean>(`/admin/trash/${type}/${id}`, { method: "DELETE" }),
  // POST /api/admin/trash/:type/:id/restore
  restoreItem: (id: number, type: "file" | "account") =>
    api<boolean>(`/admin/trash/${type}/${id}/restore`, { method: "POST" }),
};
