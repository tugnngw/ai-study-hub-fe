import { api } from "@/lib/api";
import type {
  ReportedFileItem, ReportDecision, DeletedFileItem, DeletedAccountItem, TrashItemType,
} from "../types/admin.types";
export const adminFileApi = {
  getReportedFiles: () => api<ReportedFileItem[]>("/api/admin/files/reported"),
  handleReportDecision: (id: number, decision: ReportDecision) =>
    api<boolean>(`/api/admin/files/${id}/decision`, { method: "POST", body: { decision } }),
  getDeletedFiles: () => api<DeletedFileItem[]>("/api/admin/trash/files"),
  getDeletedAccounts: () => api<DeletedAccountItem[]>("/api/admin/trash/accounts"),
  permanentDelete: (id: number, type: TrashItemType) =>
    api<boolean>(`/api/admin/trash/${type}/${id}`, { method: "DELETE" }),
  restoreItem: (id: number, type: TrashItemType) =>
    api<boolean>(`/api/admin/trash/${type}/${id}/restore`, { method: "POST" }),
};
