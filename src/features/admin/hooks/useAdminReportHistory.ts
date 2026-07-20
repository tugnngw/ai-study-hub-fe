// src/features/admin/hooks/useAdminReportHistory.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reportApi } from "../services";
import { adminKeys } from "./adminKeys";

export function useReportHistory() {
  return useQuery({
    queryKey: adminKeys.reportHistory(),
    queryFn: () => reportApi.getReportHistory(),
  });
}

export function useReportedDocuments() {
  return useQuery({
    queryKey: ["reports", "pending"],
    queryFn: () => reportApi.getReports(),
  });
}
