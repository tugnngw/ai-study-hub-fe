// src/features/admin/hooks/useAdminDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services";
import { adminKeys } from "./adminKeys";

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.dashboardStats(),
    queryFn: () => dashboardApi.getStats(),
  });
}

export function useAdminActivity(limit: number = 15) {
  return useQuery({
    queryKey: adminKeys.dashboardActivity(),
    queryFn: () => dashboardApi.getRecentActivity(limit),
  });
}
