<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/dashboard/...")
import type { AdminStats, ActivityItem } from "../types/admin.types";
const empty: AdminStats = { totalUsers:0,totalUsersTrend:0,totalDocs:0,totalDocsTrend:0,totalDownloads:0,totalDownloadsTrend:0,pendingApprovals:0 };
export const dashboardApi = {
  getStats: (): Promise<AdminStats> => Promise.resolve({ ...empty }),
  getRecentActivity: (): Promise<ActivityItem[]> => Promise.resolve([]),
=======
import { api } from "@/lib/api";
import type { AdminStats, ActivityItem } from "../types/admin.types";
export const dashboardApi = {
  getStats: () => api<AdminStats>("/api/admin/dashboard/stats"),
  getRecentActivity: () => api<ActivityItem[]>("/api/admin/dashboard/activity"),
>>>>>>> origin/update/feature/share
};
