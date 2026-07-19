<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/files...","/api/admin/trash...")
=======
import { api } from "@/lib/api";
>>>>>>> origin/update/feature/share
=======
import { api } from "@/lib/api";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { api } from "@/lib/api";
>>>>>>> origin/Flashcards-fix
import type {
  ReportedFileItem, ReportDecision, DeletedFileItem, DeletedAccountItem, TrashItemType,
} from "../types/admin.types";
export const adminFileApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  getReportedFiles: (): Promise<ReportedFileItem[]> => Promise.resolve([]),
  handleReportDecision: (_id: number, _d: ReportDecision): Promise<boolean> => Promise.resolve(true),
  getDeletedFiles: (): Promise<DeletedFileItem[]> => Promise.resolve([]),
  getDeletedAccounts: (): Promise<DeletedAccountItem[]> => Promise.resolve([]),
  permanentDelete: (_id: number, _t: TrashItemType): Promise<boolean> => Promise.resolve(true),
  restoreItem: (_id: number, _t: TrashItemType): Promise<boolean> => Promise.resolve(true),
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  getReportedFiles: () => api<ReportedFileItem[]>("/api/admin/files/reported"),
  handleReportDecision: (id: number, decision: ReportDecision) =>
    api<boolean>(`/api/admin/files/${id}/decision`, { method: "POST", body: { decision } }),
  getDeletedFiles: () => api<DeletedFileItem[]>("/api/admin/trash/files"),
  getDeletedAccounts: () => api<DeletedAccountItem[]>("/api/admin/trash/accounts"),
  permanentDelete: (id: number, type: TrashItemType) =>
    api<boolean>(`/api/admin/trash/${type}/${id}`, { method: "DELETE" }),
  restoreItem: (id: number, type: TrashItemType) =>
    api<boolean>(`/api/admin/trash/${type}/${id}/restore`, { method: "POST" }),
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
};
