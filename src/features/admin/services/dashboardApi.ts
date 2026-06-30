import { api } from "@/lib/api";
import type { AdminStats, ActivityItem } from "../types/admin.types";
export const dashboardApi = {
  getStats: () => api<AdminStats>("/api/admin/dashboard/stats"),
  getRecentActivity: () => api<ActivityItem[]>("/api/admin/dashboard/activity"),
};
