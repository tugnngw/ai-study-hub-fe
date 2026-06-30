import { n as api } from "./api-vGJ7qemV.js";
import { t as adminKeys } from "./adminKeys-Dq_NNZ6Y.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/features/admin/services/fileApi.ts
var adminFileApi = {
  getReportedFiles: () => api("/api/admin/files/reported"),
  handleReportDecision: (id, decision) =>
    api(`/api/admin/files/${id}/decision`, {
      method: "POST",
      body: { decision },
    }),
  getDeletedFiles: () => api("/api/admin/trash/files"),
  getDeletedAccounts: () => api("/api/admin/trash/accounts"),
  permanentDelete: (id, type) =>
    api(`/api/admin/trash/${type}/${id}`, { method: "DELETE" }),
  restoreItem: (id, type) =>
    api(`/api/admin/trash/${type}/${id}/restore`, { method: "POST" }),
};
//#endregion
//#region src/features/admin/hooks/useAdminFiles.ts
function useReportedFiles() {
  return useQuery({
    queryKey: adminKeys.reportedFiles(),
    queryFn: () => adminFileApi.getReportedFiles(),
  });
}
function useHandleReportDecision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, decision }) =>
      adminFileApi.handleReportDecision(id, decision),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: adminKeys.reportedFiles() }),
  });
}
function useDeletedFiles() {
  return useQuery({
    queryKey: adminKeys.deletedFiles(),
    queryFn: () => adminFileApi.getDeletedFiles(),
  });
}
function useDeletedAccounts() {
  return useQuery({
    queryKey: adminKeys.deletedAccounts(),
    queryFn: () => adminFileApi.getDeletedAccounts(),
  });
}
function usePermanentDelete() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, type }) => adminFileApi.permanentDelete(id, type),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
    },
  });
}
function useRestoreItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, type }) => adminFileApi.restoreItem(id, type),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
      qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
    },
  });
}
//#endregion
export {
  useReportedFiles as a,
  usePermanentDelete as i,
  useDeletedFiles as n,
  useRestoreItem as o,
  useHandleReportDecision as r,
  useDeletedAccounts as t,
};
