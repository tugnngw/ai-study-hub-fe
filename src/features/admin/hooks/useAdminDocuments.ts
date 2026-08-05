// src/features/admin/hooks/useAdminDocuments.ts
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { adminDocumentApi } from "../services";
import { adminKeys } from "./adminKeys";
import type { DocumentResponse } from "../types/admin.types";

export const useAdminDocuments = (tab: string) => {
  const key = adminKeys.documents(tab as any);
  const queryInfo = useQuery({
    queryKey: key,
    queryFn: async () => {
      const ts = new Date().toISOString().slice(11, 23);
      console.log(`[RQ:${ts}] queryFn START key=${JSON.stringify(key)} tab=${tab}`);
      const data = await (async () => {
        switch (tab) {
          case "pending":
            return adminDocumentApi.getByStatus("COMPLETED");
          case "approved":
            return adminDocumentApi.getByStatus("READY");
          case "rejected":
            return adminDocumentApi.getByStatus("REJECT");
          case "trash":
            return adminDocumentApi.getTrash();
          default:
            return adminDocumentApi.getAll();
        }
      })();
      console.log(`[RQ:${ts}] queryFn END key=${JSON.stringify(key)} resultCount=${data?.length ?? 0}`, data);
      return data ?? [];
    },
    placeholderData: keepPreviousData,
  });

  const ts = new Date().toISOString().slice(11, 23);
  console.log(
    `[RQ:${ts}] useQuery RENDER key=${JSON.stringify(key)} ` +
    `fetchStatus=${queryInfo.fetchStatus} ` +
    `status=${queryInfo.status} ` +
    `isStale=${queryInfo.isStale} ` +
    `isFetching=${queryInfo.isFetching} ` +
    `dataCount=${(queryInfo.data as any[])?.length ?? 0}`
  );

  return queryInfo;
};

export const useApproveDocument = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      console.log("[DEBUG] Approving document:", id);
      return adminDocumentApi.approve(id);
    },
    onSuccess: () => {
      console.log("[DEBUG] Approve success");
      qc.invalidateQueries({ queryKey: adminKeys.all, exact: false });
    },
    onError: (error: any) => {
      console.error("[DEBUG] Approve error:", error);
    },
  });
};

export const useRejectDocument = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; reason?: string }) => {
      console.log("[DEBUG] Rejecting document:", data.id, "reason:", data.reason);
      return adminDocumentApi.reject(data);
    },
    onSuccess: () => {
      console.log("[DEBUG] Reject success");
      qc.invalidateQueries({ queryKey: adminKeys.all, exact: false });
    },
    onError: (error: any) => {
      console.error("[DEBUG] Reject error:", error);
    },
  });
};

export const useDeleteDocument = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => adminDocumentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() }) });
};

export const useRestoreDocument = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => adminDocumentApi.restore(id), onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() }) });
};
