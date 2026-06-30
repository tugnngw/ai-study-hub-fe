// src/features/admin/hooks/useAdminDocuments.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminDocumentApi } from "../services";
import { adminKeys } from "./adminKeys";
import type { DocumentResponse } from "../types/admin.types";

export const useAdminDocuments = (tab: string) => {
  const fetchFn = async () => {
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
  };
  return useQuery({ queryKey: adminKeys.documents(tab as any), queryFn: fetchFn, keepPreviousData: true });
};

export const useApproveDocument = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => adminDocumentApi.approve(id), onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() }) });
};

export const useRejectDocument = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => adminDocumentApi.reject(id), onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() }) });
};

export const useDeleteDocument = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => adminDocumentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() }) });
};

export const useRestoreDocument = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => adminDocumentApi.restore(id), onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() }) });
};
