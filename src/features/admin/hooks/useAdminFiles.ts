// src/features/admin/hooks/useAdminFiles.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminFileApi } from "../services";
import type { ReportDecision, TrashItemType } from "../types/admin.types";
import { adminKeys } from "./adminKeys";

export function useReportedFiles() {
  return useQuery({
    queryKey: adminKeys.reportedFiles(),
    queryFn: () => adminFileApi.getReportedFiles(),
  });
}

export function useHandleReportDecision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: ReportDecision }) =>
        adminFileApi.handleReportDecision(id, decision),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.reportedFiles() }),
  });
}

export function useDeletedFiles() {
  return useQuery({
    queryKey: adminKeys.deletedFiles(),
    queryFn: () => adminFileApi.getDeletedFiles(),
  });
}

export function useDeletedAccounts() {
  return useQuery({
    queryKey: adminKeys.deletedAccounts(),
    queryFn: () => adminFileApi.getDeletedAccounts(),
  });
}

export function usePermanentDelete() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.permanentDelete(id, type),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
    },
  });
}

export function useRestoreItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.restoreItem(id, type),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
    },
  });
}
