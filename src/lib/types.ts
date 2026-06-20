// =============================================================
// types.ts — Data models aligned with DB schema & BE API
// =============================================================
// ⚠️  Các type này map trực tiếp với response của BE.
//     Khi BE trả về field tên khác, chỉnh sửa ở đây là đủ.
// =============================================================

// ------------------------------------------------------------------
// 1. AUTH / ACCOUNT  →  table: account
// ------------------------------------------------------------------

/** POST /api/auth/register */
export interface RegisterRequest {
  username: string;    // VARCHAR(10) UNIQUE
  email: string;       // VARCHAR(40)
  password: string;
  fullName: string;    // VARCHAR(30)
}

/** POST /api/auth/login */
export interface LoginRequest {
  username: string;
  password: string;
}

/** Response của login */
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

/** GET /api/account/me  →  table: account */
export interface User {
  id: string;              // UUID
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  authProvider: "LOCAL" | "GOOGLE";
  lastLoginAt?: string;   // ISO datetime
  createdAt: string;
}

// ------------------------------------------------------------------
// 2. FOLDER  →  table: folder
// ------------------------------------------------------------------

/** GET /api/folder/getall  |  GET /api/folder/getbyid/:id */
export interface Folder {
  id: string;              // UUID
  ownerId: string;         // UUID
  name: string;
  aiSummary?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  // virtual (có thể BE trả về hoặc tính ở FE)
  documentCount?: number;
}

/** POST /api/folder/create */
export interface CreateFolderRequest {
  name: string;
}

/** PUT /api/folder/update/:id */
export interface UpdateFolderRequest {
  name: string;
}

// ------------------------------------------------------------------
// 3. DOCUMENT  →  table: document
// ------------------------------------------------------------------

export type DocumentStatus = "processing" | "ready" | "failed" | "deleted";

/** GET /api/documents  |  GET /api/documents/:id */
export interface Document {
  id: number;              // BIGINT IDENTITY
  ownerId: string;         // UUID
  subjectId?: number | null;
  folderId?: string | null; // UUID
  title: string;
  description?: string | null;
  summary?: string | null;
  status: DocumentStatus;
  cloudinaryUrl?: string | null;
  publicId?: string | null;
  mimeType?: string | null;
  checksum?: string | null;
  fileSize?: number | null;
  totalPages?: number | null;
  createdAt: string;
  deletedAt?: string | null;

  // Virtual fields FE dùng từ mock — BE có thể không trả, xử lý ở adapter
  /** @deprecated dùng cloudinaryUrl thay cho fileName */
  fileName?: string;
}

/**
 * POST /api/documents  (multipart/form-data)
 * Dùng FormData khi gọi API — xem realApi.uploadDocument()
 */
export interface UploadDocumentRequest {
  file: File;
  title: string;
  description?: string;
  folderId?: string;       // UUID
  subjectId?: number;
}

/** PUT /api/documents/:id */
export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  folderId?: string;
}

/** GET /api/documents/:id/download */
export interface DownloadUrlResponse {
  url: string;
  expiresAt?: string;
}

// ------------------------------------------------------------------
// 4. SHARE  →  table: share
// ------------------------------------------------------------------

export type Visibility = "private" | "shared" | "public";

export interface ShareInfo {
  folderId: string;
  visibility: Visibility;
  recipients: ShareRecipient[];
  /** Public link nếu visibility = public */
  link?: string;
}

export interface ShareRecipient {
  accountId: string;
  email: string;
  fullName?: string;
}

/** Tài liệu được chia sẻ cho user hiện tại (dùng ở trang Shared) */
export interface SharedDocument extends Document {
  sharedBy: string;       // fullName của người share
  sharedAt: string;       // ISO datetime
  shareId: number;        // share.id — dùng để xoá khỏi danh sách shared
}

// ------------------------------------------------------------------
// 5. RAG  →  table: document_chunk
// ------------------------------------------------------------------

/** POST /api/rag/ask */
export interface AskRequest {
  id: number;             // documentId
  question: string;
}

export interface AskResponse {
  answer: string;
  referencedChunks?: ReferencedChunk[];
}

export interface ReferencedChunk {
  chunkIndex: number;
  content: string;
  similarity?: number;
}

// ------------------------------------------------------------------
// 6. QUIZ  →  tables: quiz, question, quiz_attempt, quiz_answer
// ------------------------------------------------------------------

export interface Quiz {
  id: number;
  documentId: number;
  title: string;
  generatedByAi: boolean;
  createdAt: string;
  questions?: Question[];
}

export interface Question {
  id: number;
  quizId: number;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
}

export interface QuizAttempt {
  id: number;
  quizId: number;
  accountId: string;
  score?: number;
  totalQuestions: number;
  status: "in_progress" | "completed";
  startedAt: string;
  completedAt?: string;
}

// ------------------------------------------------------------------
// 7. FLASHCARD  →  tables: flashcard, flashcard_progress
// ------------------------------------------------------------------

export interface Flashcard {
  id: number;
  documentId: number;
  frontContent: string;
  backContent: string;
  generatedByAi: boolean;
  createdAt: string;
}

export interface FlashcardProgress {
  flashcardId: number;
  status: "new" | "learning" | "mastered";
  reviewCount: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
}

// ------------------------------------------------------------------
// 8. REPORT  →  table: report
// ------------------------------------------------------------------

export interface ReportDocumentRequest {
  id: number;             // documentId
  reason: string;
  description?: string;
}

// ------------------------------------------------------------------
// 9. PAYMENT  →  table: payment
// ------------------------------------------------------------------

export interface Payment {
  id: number;
  planName: string;
  amount: number;
  currency: string;
  paymentMethod?: string;
  transactionCode?: string;
  status: "pending" | "success" | "failed";
  createdAt: string;
  expiredAt?: string;
}

// ------------------------------------------------------------------
// 10. GENERIC API WRAPPER
// ------------------------------------------------------------------

/** Wrapper phổ biến nếu BE bọc response trong { data, message } */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

/** Pagination (nếu BE hỗ trợ) */
export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
