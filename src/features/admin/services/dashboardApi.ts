// src/features/admin/services/dashboardApi.ts
import { api } from "@/lib/api";
import type { AdminStats, ActivityItem } from "../types/admin.types";

export const dashboardApi = {
  getStats: (): Promise<AdminStats> =>
      api<AdminStats>("/api/admin/dashboard/stats"),
  getRecentActivity: (limit: number = 15): Promise<ActivityItem[]> =>
      api<ActivityItem[]>(`/api/admin/dashboard/activity?limit=${limit}`),
};