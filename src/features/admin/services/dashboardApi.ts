<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/dashboard/...")
import type { AdminStats, ActivityItem } from "../types/admin.types";
const empty: AdminStats = { totalUsers:0,totalUsersTrend:0,totalDocs:0,totalDocsTrend:0,totalDownloads:0,totalDownloadsTrend:0,pendingApprovals:0 };
export const dashboardApi = {
  getStats: (): Promise<AdminStats> => Promise.resolve({ ...empty }),
  getRecentActivity: (): Promise<ActivityItem[]> => Promise.resolve([]),
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
import { api } from "@/lib/api";
import type { AdminStats, ActivityItem } from "../types/admin.types";
export const dashboardApi = {
  getStats: () => api<AdminStats>("/api/admin/dashboard/stats"),
  getRecentActivity: () => api<ActivityItem[]>("/api/admin/dashboard/activity"),
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
=======
=======
>>>>>>> origin/final/demo-v1
// src/features/admin/services/dashboardApi.ts
import { api } from "@/lib/api";
import type { AdminStats, ActivityItem } from "../types/admin.types";

export const dashboardApi = {
  getStats: (): Promise<AdminStats> =>
      api<AdminStats>("/api/admin/dashboard/stats"),
<<<<<<< HEAD
  getRecentActivity: (): Promise<ActivityItem[]> =>
      api<ActivityItem[]>("/api/admin/dashboard/activity"),
};
>>>>>>> origin/Flashcars
=======
  getRecentActivity: (limit: number = 15): Promise<ActivityItem[]> =>
      api<ActivityItem[]>(`/api/admin/dashboard/activity?limit=${limit}`),
};
>>>>>>> origin/final/demo-v1
