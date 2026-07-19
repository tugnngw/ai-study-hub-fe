// src/features/admin/types/admin.types.ts
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Admin related types

// Placeholder for admin types. Example:
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  storageQuotaUsed: number;
=======
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// Admin feature domain types
=======
>>>>>>> origin/Flashcars

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
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/Flashcars
  title: string;
  actor: string;
  type: ActivityType;
  time: string;
}

// ── Users ──────────────────────────────────────────────
<<<<<<< HEAD
export type UserStatus = "Hoạt động" | "Khóa";

export interface AdminUserItem {
  id: number;
=======
export type UserStatus = "ACTIVE" | "BANNED" | "Hoạt động" | "Khóa";
export type PlanId = "FREE" | "PLUS" | "PRO";

export interface AdminUserItem {
  id: string; // UUID from BE
>>>>>>> origin/Flashcars
  name: string;
  email: string;
  status: UserStatus;
  plan: PlanId;
<<<<<<< HEAD
=======
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
>>>>>>> origin/Flashcars
}

// ── Reported / managed files ───────────────────────────
export interface ReportedFileItem {
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/Flashcars
  name: string;
  uploader: string;
  size: string;
  reports: number;
  reporter: string;
  reason: string;
}

<<<<<<< HEAD
export type ReportDecision = "remove" | "reject";

// ── Approval queue ─────────────────────────────────────
export interface ApprovalItem {
  id: number;
=======
export type ReportDecision = "approve" | "reject";

// ── Approval queue ─────────────────────────────────────
export interface ApprovalItem {
  id: string;
>>>>>>> origin/Flashcars
  title: string;
  uploader: string;
  date: string;
  size: string;
<<<<<<< HEAD
=======
  reason?: string;
  reporter?: string;
>>>>>>> origin/Flashcars
}

export type ApprovalAction = "approve" | "reject";

<<<<<<< HEAD
// ── Trash ──────────────────────────────────────────────
export interface DeletedFileItem {
  id: number;
=======
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
>>>>>>> origin/Flashcars
  name: string;
  deletedDate: string;
  remainingDays: number;
}

export interface DeletedAccountItem {
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/Flashcars
  name: string;
  email: string;
  deletedDate: string;
  remainingDays: number;
}

export type TrashItemType = "file" | "account";
export type TrashAction = "restore" | "delete";

<<<<<<< HEAD
// ── Premium / Gói (plans) ──────────────────────────────
export type PlanId = "FREE" | "PLUS" | "PRO";

// ── Premium management (admin) ─────────────────────────
=======
// ── Premium ─────────────────────────────────────────────
>>>>>>> origin/Flashcars
export type PaymentMethod = "MOMO" | "VNPay" | "ACB" | "Thẻ cào";
export type PremiumRequestStatus = "Pending" | "Approved" | "Rejected";

export interface PremiumRequestItem {
<<<<<<< HEAD
  id: number;
  name: string;
  email: string;
  plan: Exclude<PlanId, "FREE">; // chỉ PLUS / PRO mới có giao dịch
=======
  id: string;
  name: string;
  email: string;
  plan: Exclude<PlanId, "FREE">;
>>>>>>> origin/Flashcars
  registrationDate: string;
  paymentMethod: PaymentMethod;
  status: PremiumRequestStatus;
}

export interface PremiumStats {
  totalPremiumUsers: number;
  totalPremiumTrend: number;
  pendingRequests: number;
  pendingRequestsTrend: number;
<<<<<<< HEAD
  revenueThisMonth: number; // VND
=======
  revenueThisMonth: number;
>>>>>>> origin/Flashcars
  revenueTrend: number;
  expiredSubscriptions: number;
  expiredTrend: number;
}

export type PremiumDecision = "approve" | "reject";

<<<<<<< HEAD
// ── Transaction history (user) ─────────────────────────
=======
// ── Transaction ─────────────────────────────────────────
>>>>>>> origin/Flashcars
export type TransactionStatus = "Thành công" | "Đang xử lý" | "Thất bại";

export interface TransactionItem {
  id: string;
  plan: Exclude<PlanId, "FREE">;
<<<<<<< HEAD
  amount: number; // VND
=======
  amount: number;
>>>>>>> origin/Flashcars
  method: PaymentMethod;
  date: string;
  status: TransactionStatus;
}

<<<<<<< HEAD
// ── Plan catalog (trang nâng cấp) ──────────────────────
export interface PlanOption {
  id: Exclude<PlanId, "FREE">;
  name: string;
  price: number;     // VND / tháng
=======
// ── Plan catalog ──────────────────────────────────────
export interface PlanOption {
  id: Exclude<PlanId, "FREE">;
  name: string;
  price: number;
>>>>>>> origin/Flashcars
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

<<<<<<< HEAD
// ── Phương thức nạp tiền ───────────────────────────────
export interface TopUpMethod {
  id: string;
  category: string;   // "CHUYỂN KHOẢN" | "THẺ ĐIỆN THOẠI"
=======
// ── Top up methods ──────────────────────────────────────
export interface TopUpMethod {
  id: string;
  category: string;
>>>>>>> origin/Flashcars
  title: string;
  description: string;
  instant?: boolean;
  recommended?: boolean;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
}
=======
}
>>>>>>> origin/Flashcars
