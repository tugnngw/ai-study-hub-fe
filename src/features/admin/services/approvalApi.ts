// TODO(backend): api<T>("/api/admin/approvals...")
import type { ApprovalItem } from "../types/admin.types";
export const approvalApi = {
  getPendingList: (): Promise<ApprovalItem[]> => Promise.resolve([]),
  approve: (_id: number): Promise<boolean> => Promise.resolve(true),
  reject: (_id: number): Promise<boolean> => Promise.resolve(true),
};
