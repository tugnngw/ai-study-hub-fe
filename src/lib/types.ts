// src/lib/types.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  authProvider: string;
  plan?: "FREE" | "BASIC" | "PRO" | "PREMIUM" | "PLUS";
  storageGb?: number;
  // Thời điểm gói nâng cấp hết hạn (ISO string). null/undefined = gói FREE / không hết hạn.
  planExpiresAt?: string | null;
  // Ngày bắt đầu gói hiện tại (ISO) — dùng để tính số ngày còn lại khi đổi gói.
  planStartedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

// =============================================================
// SUBJECT / SEMESTER  →  /api/subjects
// Dùng cho việc upload tài liệu: mỗi tài liệu thuộc 1 môn, mỗi môn thuộc 1 kỳ.
// =============================================================
export interface Subject {
  id: number;
  code: string;          // ví dụ SE1901
  name: string;          // ví dụ Software Engineering
  semester: number;      // kỳ 1..9
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  aiSummary?: string;
  // Số tài liệu trong thư mục (BE nên trả kèm; nếu không FE tự đếm).
  documentCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFolderRequest {
  name: string;
  description?: string;
}

export interface UpdateFolderRequest {
  name?: string;
  description?: string;
}

export interface Document {
  id: string;
  ownerId: string;
  subjectId?: number | null;
  folderId?: string | null;
  title: string;
  description?: string | null;
  summary?: string | null;
  status: "processing" | "ready" | "failed" | "deleted" | "PROCESSING" | "READY" | "REJECT" | "COMPLETED";
  cloudinaryUrl?: string | null;
  publicId?: string | null;
  mimeType?: string | null;
  checksum?: string | null;
  fileSize?: number | null;
  totalPages?: number | null;
  createdAt: string;
  deletedAt?: string | null;
  updatedAt?: string;
}

export interface UploadDocumentRequest {
  // Hỗ trợ 1 hoặc nhiều file cùng lúc. Giữ `file` để tương thích code cũ.
  file?: File;
  files?: File[];
  title: string;
  description?: string;
  folderId?: string;
  subjectId?: number;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  folderId?: string;
  subjectId?: number;
}

export interface DownloadUrlResponse {
  url: string;
  expiresAt: string;
}

export interface ShareRequest {
  // Chia sẻ theo folder HOẶC theo 1 file (document). Truyền đúng 1 trong 2.
  folderId?: string;
  documentId?: string;
  username?: string;
  email?: string;
  visibility: "private" | "public";
}

export interface ShareResponse {
  id: string;
  folderId: string | null;
  documentId: string | null;
  ownerId: string;
  ownerUsername: string;
  ownerEmail: string;
  sharedAccountId: string | null;
  sharedUsername: string | null;
  sharedEmail: string | null;
  visibility: string;
  shareToken: string;
  shareLink: string;
  createdAt: string;
  recipients: ShareRecipient[];
  documentTitle: string | null;
  folderName: string | null;
  fileCount: number | null;
  cloudinaryUrl: string | null;
  documentStatus?: string | null;
}

export interface ShareRecipient {
  accountId: string;
  email: string;
  username: string;
  fullName: string;
}

export interface AskRequest {
  documentId: string;
  question: string;
}

export interface AskResponse {
  answer: string;
  sources?: unknown[];
}

export interface ReportDocumentRequest {
  id: string;
  reason: string;
  description?: string;
}

export interface Quiz {
  id: string;
  documentId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  documentId: string;
  front: string;
  back: string;
  createdAt: string;
}


// =============================================================
// 9. AI SUMMARY
// =============================================================

export interface GenerateSummaryRequest {
  documentIds: string[];
  force?: boolean;
}

export interface GenerateSummaryResponse {
  markdown: string;
}

export interface FlashcardProgress {
  id: string;
  flashcardId: string;
  status: "new" | "learning" | "mastered";
  lastReviewed: string;
}
// =============================================================
// 10. AI GENERATION REQUESTS
// =============================================================

export interface GenerateFlashcardsRequest {
  documentIds: string[];
  numberOfCards?: number;
}

export interface GenerateQuizRequest {
  documentIds: string[];
  numberOfQuestions?: number;
}
