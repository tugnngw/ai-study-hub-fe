// src/features/admin/hooks/useAdminFiles.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminFileApi } from "../services";
<<<<<<< HEAD
import type { ReportDecision, TrashItemType } from "../types/admin.types";
=======
import { reportApi } from "../services/reportApi";
import type { TrashItemType } from "../types/admin.types";
>>>>>>> origin/Flashcars
import { adminKeys } from "./adminKeys";

export function useReportedFiles() {
  return useQuery({
    queryKey: adminKeys.reportedFiles(),
<<<<<<< HEAD
    queryFn: () => adminFileApi.getReportedFiles(),
=======
    queryFn: () => reportApi.getReports(),
    refetchOnWindowFocus: true,
>>>>>>> origin/Flashcars
  });
}

export function useHandleReportDecision() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
    mutationFn: ({ id, decision }: { id: number; decision: ReportDecision }) =>
      adminFileApi.handleReportDecision(id, decision),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.reportedFiles() }),
=======
    mutationFn: ({ id, decision }: { id: string; decision: string }) =>
        reportApi.handleReportDecision(id, decision as any),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.reportedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.approvals() });
    },
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
    mutationFn: ({ id, type }: { id: number; type: TrashItemType }) =>
      adminFileApi.permanentDelete(id, type),
=======
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.permanentDelete(id, type),
>>>>>>> origin/Flashcars
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
    },
  });
}

export function useRestoreItem() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
    mutationFn: ({ id, type }: { id: number; type: TrashItemType }) =>
      adminFileApi.restoreItem(id, type),
=======
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.restoreItem(id, type),
>>>>>>> origin/Flashcars
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
    },
  });
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/Flashcars
