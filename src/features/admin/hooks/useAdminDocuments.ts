// src/features/admin/hooks/useAdminDocuments.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminDocumentApi } from "../services";
import { adminKeys } from "./adminKeys";
import type { DocumentResponse } from "../types/admin.types";

export const useAdminDocuments = (tab: string) => {
  const fetchFn = async () => {
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
    console.log("[DEBUG] Documents API response:", data);
    return data ?? [];
  };
  return useQuery({ queryKey: adminKeys.documents(tab as any), queryFn: fetchFn, keepPreviousData: true });
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
