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
  plan: PlanId;
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

// ── Premium / Gói (plans) ──────────────────────────────
export type PlanId = "FREE" | "PLUS" | "PRO";

// ── Premium management (admin) ─────────────────────────
export type PaymentMethod = "MOMO" | "VNPay" | "ACB" | "Thẻ cào";
export type PremiumRequestStatus = "Pending" | "Approved" | "Rejected";

export interface PremiumRequestItem {
  id: number;
  name: string;
  email: string;
  plan: Exclude<PlanId, "FREE">; // chỉ PLUS / PRO mới có giao dịch
  registrationDate: string;
  paymentMethod: PaymentMethod;
  status: PremiumRequestStatus;
}

export interface PremiumStats {
  totalPremiumUsers: number;
  totalPremiumTrend: number;
  pendingRequests: number;
  pendingRequestsTrend: number;
  revenueThisMonth: number; // VND
  revenueTrend: number;
  expiredSubscriptions: number;
  expiredTrend: number;
}

export type PremiumDecision = "approve" | "reject";

// ── Transaction history (user) ─────────────────────────
export type TransactionStatus = "Thành công" | "Đang xử lý" | "Thất bại";

export interface TransactionItem {
  id: string;
  plan: Exclude<PlanId, "FREE">;
  amount: number; // VND
  method: PaymentMethod;
  date: string;
  status: TransactionStatus;
}

// ── Plan catalog (trang nâng cấp) ──────────────────────
export interface PlanOption {
  id: Exclude<PlanId, "FREE">;
  name: string;
  price: number;     // VND / tháng
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

// ── Phương thức nạp tiền ───────────────────────────────
export interface TopUpMethod {
  id: string;
  category: string;   // "CHUYỂN KHOẢN" | "THẺ ĐIỆN THOẠI"
  title: string;
  description: string;
  instant?: boolean;
  recommended?: boolean;
}
