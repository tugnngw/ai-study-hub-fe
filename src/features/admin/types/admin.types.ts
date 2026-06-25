// src/features/admin/types/admin.types.ts
// Admin feature domain types

// ── Dashboard ──────────────────────────────────────────
export interface AdminStats {
  totalUsers: number;
  totalUsersTrend: number;
  totalDocs: number;
  totalDocsTrend: number;
  totalDownloads: number;
  totalDownloadsTrend: number;
  pendingApprovals: number;
}

export type ActivityType = "user" | "upload" | "report" | "delete";

export interface ActivityItem {
  id: number;
  title: string;
  actor: string;
  type: ActivityType;
  time: string;
}

// ── Users ──────────────────────────────────────────────
export type UserStatus = "Hoạt động" | "Khóa";

export interface AdminUserItem {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
}

// ── Reported / managed files ───────────────────────────
export interface ReportedFileItem {
  id: number;
  name: string;
  uploader: string;
  size: string;
  reports: number;
  reporter: string;
  reason: string;
}

export type ReportDecision = "remove" | "reject";

// ── Approval queue ─────────────────────────────────────
export interface ApprovalItem {
  id: number;
  title: string;
  uploader: string;
  date: string;
  size: string;
}

export type ApprovalAction = "approve" | "reject";

// ── Trash ──────────────────────────────────────────────
export interface DeletedFileItem {
  id: number;
  name: string;
  deletedDate: string;
  remainingDays: number;
}

export interface DeletedAccountItem {
  id: number;
  name: string;
  email: string;
  deletedDate: string;
  remainingDays: number;
}

export type TrashItemType = "file" | "account";
export type TrashAction = "restore" | "delete";
