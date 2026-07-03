// src/features/admin/types/admin.types.ts

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
  id: string;
  title: string;
  actor: string;
  type: ActivityType;
  time: string;
}

// ── Users ──────────────────────────────────────────────
export type UserStatus = "ACTIVE" | "BANNED" | "Hoạt động" | "Khóa";
export type PlanId = "FREE" | "PLUS" | "PRO";

export interface AdminUserItem {
  id: string; // UUID from BE
  name: string;
  email: string;
  status: UserStatus;
  plan: PlanId;
  role?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

// ── Document ──────────────────────────────────────────
export type DocumentStatus = "COMPLETED" | "READY" | "REJECT" | "DELETED" | "PROCESSING" | "FAILED";

export interface DocumentResponse {
  id: string;
  title: string;
  description?: string;
  status: DocumentStatus;
  ownerId: string;
  fileSize?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// ── Reported / managed files ───────────────────────────
export interface ReportedFileItem {
  id: string;
  name: string;
  uploader: string;
  size: string;
  reports: number;
  reporter: string;
  reason: string;
}

export type ReportDecision = "approve" | "reject";

// ── Approval queue ─────────────────────────────────────
export interface ApprovalItem {
  id: string;
  title: string;
  uploader: string;
  date: string;
  size: string;
  reason?: string;
  reporter?: string;
}

export type ApprovalAction = "approve" | "reject";

// ── Report history ─────────────────────────────────────
export interface ReportHistoryItem {
  id: string;
  title: string;
  uploader: string;
  date: string;
  reason?: string;
  reporter?: string;
  status: string;
  decision?: string;
}

// ── Trash ──────────────────────────────────────────────
export interface DeletedFileItem {
  id: string;
  name: string;
  deletedDate: string;
  remainingDays: number;
}

export interface DeletedAccountItem {
  id: string;
  name: string;
  email: string;
  deletedDate: string;
  remainingDays: number;
}

export type TrashItemType = "file" | "account";
export type TrashAction = "restore" | "delete";

// ── Premium ─────────────────────────────────────────────
export type PaymentMethod = "MOMO" | "VNPay" | "ACB" | "Thẻ cào";
export type PremiumRequestStatus = "Pending" | "Approved" | "Rejected";

export interface PremiumRequestItem {
  id: string;
  name: string;
  email: string;
  plan: Exclude<PlanId, "FREE">;
  registrationDate: string;
  paymentMethod: PaymentMethod;
  status: PremiumRequestStatus;
}

export interface PremiumStats {
  totalPremiumUsers: number;
  totalPremiumTrend: number;
  pendingRequests: number;
  pendingRequestsTrend: number;
  revenueThisMonth: number;
  revenueTrend: number;
  expiredSubscriptions: number;
  expiredTrend: number;
}

export type PremiumDecision = "approve" | "reject";

// ── Transaction ─────────────────────────────────────────
export type TransactionStatus = "Thành công" | "Đang xử lý" | "Thất bại";

export interface TransactionItem {
  id: string;
  plan: Exclude<PlanId, "FREE">;
  amount: number;
  method: string; // Changed from PaymentMethod to string
  date: string;
  status: TransactionStatus;
}

// ── Plan catalog ──────────────────────────────────────
export interface PlanOption {
  id: Exclude<PlanId, "FREE">;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

// ── Top up methods ──────────────────────────────────────
export interface TopUpMethod {
  id: string;
  category: string;
  title: string;
  description: string;
  instant?: boolean;
  recommended?: boolean;
}