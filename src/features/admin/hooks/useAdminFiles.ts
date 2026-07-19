// src/features/admin/hooks/useAdminFiles.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminFileApi } from "../services";
<<<<<<< HEAD
<<<<<<< HEAD
import type { ReportDecision, TrashItemType } from "../types/admin.types";
=======
import { reportApi } from "../services/reportApi";
import type { TrashItemType } from "../types/admin.types";
>>>>>>> origin/Flashcars
=======
import { reportApi } from "../services/reportApi";
import type { TrashItemType } from "../types/admin.types";
>>>>>>> origin/final/demo-v1
import { adminKeys } from "./adminKeys";

export function useReportedFiles() {
  return useQuery({
    queryKey: adminKeys.reportedFiles(),
<<<<<<< HEAD
<<<<<<< HEAD
    queryFn: () => adminFileApi.getReportedFiles(),
=======
    queryFn: () => reportApi.getReports(),
    refetchOnWindowFocus: true,
>>>>>>> origin/Flashcars
=======
    queryFn: () => reportApi.getReports(),
    refetchOnWindowFocus: true,
>>>>>>> origin/final/demo-v1
  });
}

export function useHandleReportDecision() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: ({ id, decision }: { id: number; decision: ReportDecision }) =>
      adminFileApi.handleReportDecision(id, decision),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.reportedFiles() }),
=======
=======
>>>>>>> origin/final/demo-v1
    mutationFn: ({ id, decision }: { id: string; decision: string }) =>
        reportApi.handleReportDecision(id, decision as any),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.reportedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.approvals() });
    },
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
    mutationFn: ({ id, type }: { id: number; type: TrashItemType }) =>
      adminFileApi.permanentDelete(id, type),
=======
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.permanentDelete(id, type),
>>>>>>> origin/Flashcars
=======
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.permanentDelete(id, type),
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
    mutationFn: ({ id, type }: { id: number; type: TrashItemType }) =>
      adminFileApi.restoreItem(id, type),
=======
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.restoreItem(id, type),
>>>>>>> origin/Flashcars
=======
    mutationFn: ({ id, type }: { id: string; type: TrashItemType }) =>
        adminFileApi.restoreItem(id, type),
>>>>>>> origin/final/demo-v1
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
    },
  });
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/Flashcars
=======
}
>>>>>>> origin/final/demo-v1
