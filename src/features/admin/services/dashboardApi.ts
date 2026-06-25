// src/features/admin/services/dashboardApi.ts
// TODO(backend): thay bằng api<T>("/api/admin/dashboard/...").
import type { AdminStats, ActivityItem } from "../types/admin.types";

const emptyStats: AdminStats = {
  totalUsers: 0, totalUsersTrend: 0,
  totalDocs: 0, totalDocsTrend: 0,
  totalDownloads: 0, totalDownloadsTrend: 0,
  pendingApprovals: 0,
};

export const dashboardApi = {
  getStats: (): Promise<AdminStats> => Promise.resolve({ ...emptyStats }),
  getRecentActivity: (): Promise<ActivityItem[]> => Promise.resolve([]),
};
