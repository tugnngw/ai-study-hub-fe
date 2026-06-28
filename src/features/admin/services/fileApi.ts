// TODO(backend): api<T>("/api/admin/files...","/api/admin/trash...")
import type {
  ReportedFileItem, ReportDecision, DeletedFileItem, DeletedAccountItem, TrashItemType,
} from "../types/admin.types";
export const adminFileApi = {
  getReportedFiles: (): Promise<ReportedFileItem[]> => Promise.resolve([]),
  handleReportDecision: (_id: number, _d: ReportDecision): Promise<boolean> => Promise.resolve(true),
  getDeletedFiles: (): Promise<DeletedFileItem[]> => Promise.resolve([]),
  getDeletedAccounts: (): Promise<DeletedAccountItem[]> => Promise.resolve([]),
  permanentDelete: (_id: number, _t: TrashItemType): Promise<boolean> => Promise.resolve(true),
  restoreItem: (_id: number, _t: TrashItemType): Promise<boolean> => Promise.resolve(true),
};
