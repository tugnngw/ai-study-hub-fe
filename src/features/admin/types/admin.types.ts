// src/features/admin/types/admin.types.ts

// ── Dashboard ──────────────────────────────────────────
export interface AdminStats {
  totalUsers: number;
  usersLastWeek: number;
  usersPrevWeek: number;
  totalDocs: number;
  docsLastWeek: number;
  docsPrevWeek: number;
  totalDownloads: number;
  downloadsLastWeek: number;
  downloadsPrevWeek: number;
}

export type ActivityType = 
  | "USER_REGISTER" 
  | "USER_UPGRADE" 
  | "DOCUMENT_UPLOAD" 
  | "DOCUMENT_DELETE" 
  | "DOCUMENT_DOWNLOAD" 
  | "DOCUMENT_RESTORE"
  | "PAYMENT_SUCCESS" 
  | "PAYMENT_FAILED";

export interface ActivityItem {
  id: string;
  title: string;
  actor: string;
  type: ActivityType;
  createdAt: string;
}

// ── Users ──────────────────────────────────────────────
export type UserStatus = "ACTIVE" | "BANNED" | "Hoạt động" | "Khóa" | "Ngưng hoạt động (Khóa)" | "Xóa mềm";
export type PlanId = "FREE" | "BASIC" | "PRO" | "PREMIUM";

export interface AdminUserItem {
  id: string; // UUID from BE
  name: string;
  email: string;
  status: UserStatus;
  plan: PlanId;
  role?: string;
  createdAt?: string;
  lastLoginAt?: string;
  deletedAt?: string;
}

// ── Document ──────────────────────────────────────────
export type DocumentStatus = "COMPLETED" | "READY" | "REJECT" | "REPORTED" | "BANNED";

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
  folderId?: string;
  subjectId?: number;
  mimeType?: string;
  cloudinaryUrl?: string;
  aiStatus?: "NOT_STARTED" | "PROCESSING" | "COMPLETED" | "FAILED";
}

// ── Reported / managed files ───────────────────────────
export interface ReportedFileItem {
  id: string;
  documentId?: string;
  documentTitle?: string;
  name: string;
  uploader: string;
  size: string;
  reports: number;
  reporter: string;
  reason: string;
  createdAt?: string;
  status?: string;
  decision?: string;
  cloudinaryUrl?: string | null;
  mimeType?: string | null;
}

export type ReportDecision = "approve" | "reject";

// ── Approval queue ─────────────────────────────────────
export interface ApprovalItem {
  id: string;
  documentId?: string;
  title: string;
  uploader: string;
  date: string;
  size: string;
  reason?: string;
  reporter?: string;
  cloudinaryUrl?: string | null;
  mimeType?: string | null;
}

export type ApprovalAction = "approve" | "reject";

// ── Report history ─────────────────────────────────────
export interface ReportHistoryItem {
  id: string;
  documentId?: string;
  title: string;
  uploader: string;
  date: string;
  reason?: string;
  reporter?: string;
  status: string;
  decision?: string;
  cloudinaryUrl?: string | null;
  mimeType?: string | null;
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