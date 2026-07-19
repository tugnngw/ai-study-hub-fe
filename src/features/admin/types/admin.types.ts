// src/features/admin/types/admin.types.ts
<<<<<<< HEAD
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
=======
>>>>>>> origin/final/demo-v1

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
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/Flashcars
=======
  id: string;
>>>>>>> origin/final/demo-v1
  title: string;
  actor: string;
  type: ActivityType;
  time: string;
}

// ── Users ──────────────────────────────────────────────
<<<<<<< HEAD
<<<<<<< HEAD
export type UserStatus = "Hoạt động" | "Khóa";

export interface AdminUserItem {
  id: number;
=======
=======
>>>>>>> origin/final/demo-v1
export type UserStatus = "ACTIVE" | "BANNED" | "Hoạt động" | "Khóa";
export type PlanId = "FREE" | "PLUS" | "PRO";

export interface AdminUserItem {
  id: string; // UUID from BE
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  name: string;
  email: string;
  status: UserStatus;
  plan: PlanId;
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
  folderId?: string;
  subjectId?: number;
  mimeType?: string;
  cloudinaryUrl?: string;
>>>>>>> origin/final/demo-v1
}

// ── Reported / managed files ───────────────────────────
export interface ReportedFileItem {
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/Flashcars
=======
  id: string;
  documentId?: string;
>>>>>>> origin/final/demo-v1
  name: string;
  uploader: string;
  size: string;
  reports: number;
  reporter: string;
  reason: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
export type ReportDecision = "remove" | "reject";

// ── Approval queue ─────────────────────────────────────
export interface ApprovalItem {
  id: number;
=======
=======
>>>>>>> origin/final/demo-v1
export type ReportDecision = "approve" | "reject";

// ── Approval queue ─────────────────────────────────────
export interface ApprovalItem {
  id: string;
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
  documentId?: string;
>>>>>>> origin/final/demo-v1
  title: string;
  uploader: string;
  date: string;
  size: string;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  reason?: string;
  reporter?: string;
>>>>>>> origin/Flashcars
=======
  reason?: string;
  reporter?: string;
  cloudinaryUrl?: string | null;
  mimeType?: string | null;
>>>>>>> origin/final/demo-v1
}

export type ApprovalAction = "approve" | "reject";

<<<<<<< HEAD
<<<<<<< HEAD
// ── Trash ──────────────────────────────────────────────
export interface DeletedFileItem {
  id: number;
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  name: string;
  deletedDate: string;
  remainingDays: number;
}

export interface DeletedAccountItem {
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/Flashcars
=======
  id: string;
>>>>>>> origin/final/demo-v1
  name: string;
  email: string;
  deletedDate: string;
  remainingDays: number;
}

export type TrashItemType = "file" | "account";
export type TrashAction = "restore" | "delete";

<<<<<<< HEAD
<<<<<<< HEAD
// ── Premium / Gói (plans) ──────────────────────────────
export type PlanId = "FREE" | "PLUS" | "PRO";

// ── Premium management (admin) ─────────────────────────
=======
// ── Premium ─────────────────────────────────────────────
>>>>>>> origin/Flashcars
=======
// ── Premium ─────────────────────────────────────────────
>>>>>>> origin/final/demo-v1
export type PaymentMethod = "MOMO" | "VNPay" | "ACB" | "Thẻ cào";
export type PremiumRequestStatus = "Pending" | "Approved" | "Rejected";

export interface PremiumRequestItem {
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
  name: string;
  email: string;
  plan: Exclude<PlanId, "FREE">; // chỉ PLUS / PRO mới có giao dịch
=======
=======
>>>>>>> origin/final/demo-v1
  id: string;
  name: string;
  email: string;
  plan: Exclude<PlanId, "FREE">;
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
  revenueThisMonth: number; // VND
=======
  revenueThisMonth: number;
>>>>>>> origin/Flashcars
=======
  revenueThisMonth: number;
>>>>>>> origin/final/demo-v1
  revenueTrend: number;
  expiredSubscriptions: number;
  expiredTrend: number;
}

export type PremiumDecision = "approve" | "reject";

<<<<<<< HEAD
<<<<<<< HEAD
// ── Transaction history (user) ─────────────────────────
=======
// ── Transaction ─────────────────────────────────────────
>>>>>>> origin/Flashcars
=======
// ── Transaction ─────────────────────────────────────────
>>>>>>> origin/final/demo-v1
export type TransactionStatus = "Thành công" | "Đang xử lý" | "Thất bại";

export interface TransactionItem {
  id: string;
  plan: Exclude<PlanId, "FREE">;
<<<<<<< HEAD
<<<<<<< HEAD
  amount: number; // VND
=======
  amount: number;
>>>>>>> origin/Flashcars
  method: PaymentMethod;
=======
  amount: number;
  method: string; // Changed from PaymentMethod to string
>>>>>>> origin/final/demo-v1
  date: string;
  status: TransactionStatus;
}

<<<<<<< HEAD
<<<<<<< HEAD
// ── Plan catalog (trang nâng cấp) ──────────────────────
export interface PlanOption {
  id: Exclude<PlanId, "FREE">;
  name: string;
  price: number;     // VND / tháng
=======
=======
>>>>>>> origin/final/demo-v1
// ── Plan catalog ──────────────────────────────────────
export interface PlanOption {
  id: Exclude<PlanId, "FREE">;
  name: string;
  price: number;
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

<<<<<<< HEAD
<<<<<<< HEAD
// ── Phương thức nạp tiền ───────────────────────────────
export interface TopUpMethod {
  id: string;
  category: string;   // "CHUYỂN KHOẢN" | "THẺ ĐIỆN THOẠI"
=======
=======
>>>>>>> origin/final/demo-v1
// ── Top up methods ──────────────────────────────────────
export interface TopUpMethod {
  id: string;
  category: string;
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  title: string;
  description: string;
  instant?: boolean;
  recommended?: boolean;
<<<<<<< HEAD
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
=======
}
>>>>>>> origin/final/demo-v1
