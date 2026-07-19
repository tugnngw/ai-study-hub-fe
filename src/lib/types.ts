<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// src/lib/types.ts
// =============================================================
// 1. AUTH / ACCOUNT
// =============================================================

export interface RegisterRequest {
  username: string;
  password: string;
  fullName?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
// src/lib/types.ts
>>>>>>> origin/Flashcars
export interface LoginRequest {
  username: string;
  password: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/** Response của login */
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

/** GET /api/account/me  →  table: account */
export interface User {
  id: string;              // UUID
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: User;
}

export interface User {
  id: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  authProvider: "LOCAL" | "GOOGLE";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  lastLoginAt?: string;   // ISO datetime
  createdAt: string;
}

// ------------------------------------------------------------------
// 2. SEMESTER  →  table: semester
// ------------------------------------------------------------------

/** GET /api/semester/getall  |  GET /api/semester/getbyid/:id */
export interface Semester {
  id: number;              // BIGINT IDENTITY
  name: string;            // VARCHAR(100)
  startDate?: string | null; // DATE
  endDate?: string | null;   // DATE
}

/** POST /api/semester/create */
export interface CreateSemesterRequest {
  name: string;
  startDate?: string;
  endDate?: string;
}

// ------------------------------------------------------------------
// 3. SUBJECT  →  table: subject
// ------------------------------------------------------------------

/** GET /api/subject/getall  |  GET /api/subject/getbysemester/:semesterId */
export interface Subject {
  id: number;              // BIGINT IDENTITY
  semesterId?: number | null; // FK → semester.id
  code?: string | null;    // VARCHAR(50)
  name?: string | null;    // VARCHAR(255)
}

/** POST /api/subject/create */
export interface CreateSubjectRequest {
  semesterId?: number;
  code?: string;
  name: string;
}

// ------------------------------------------------------------------
// 4. FOLDER  →  table: folder
// ------------------------------------------------------------------

/** GET /api/folder/getall  |  GET /api/folder/getbyid/:id */
export interface Folder {
  id: string;              // UUID
  ownerId: string;         // UUID
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  providerId?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  version?: number;
}

// =============================================================
// 2. FOLDER
// =============================================================

export interface Folder {
  id: string;
  ownerId: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  name: string;
  aiSummary?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  documentCount?: number;  // virtual — FE tính hoặc BE trả về
}

/** POST /api/folder/create */
=======
}

>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
}

>>>>>>> origin/AI-Study-fix
=======
}

>>>>>>> origin/test/share-document-cloudinary
=======
}

>>>>>>> origin/uichange
=======
}

>>>>>>> origin/admin-added
=======
}

>>>>>>> origin/update/feature/share
=======
}

>>>>>>> origin/update/feature/AI/Quiz
=======
}

>>>>>>> origin/Flashcards-fix
=======
}

>>>>>>> origin/admin-added-fix
export interface CreateFolderRequest {
  name: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/** PUT /api/folder/update/:id */
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
export interface UpdateFolderRequest {
  name: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// ------------------------------------------------------------------
// 5. DOCUMENT  →  table: document
// ------------------------------------------------------------------

export type DocumentStatus = "processing" | "ready" | "failed" | "deleted";

/** GET /api/documents  |  GET /api/documents/:id */
export interface Document {
  id: number;              // BIGINT IDENTITY
  ownerId: string;         // UUID
  subjectId?: number | null;
  folderId?: string | null; // UUID
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// =============================================================
// 3. DOCUMENT
// =============================================================

export type DocumentStatus = "processing" | "ready" | "failed" | "deleted";

export interface Document {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  id: number;
  ownerId: string;
  subjectId?: number | null;
  folderId?: string | null;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
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
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  aiSummary?: string;
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
>>>>>>> origin/Flashcars
  id: string;
  ownerId: string;
  subjectId?: number | null;
  folderId?: string | null;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  title: string;
  description?: string | null;
  summary?: string | null;
  status: DocumentStatus;
=======
  title: string;
  description?: string | null;
  summary?: string | null;
  status: "processing" | "ready" | "failed" | "deleted";
>>>>>>> origin/Flashcars
  cloudinaryUrl?: string | null;
  publicId?: string | null;
  mimeType?: string | null;
  checksum?: string | null;
  fileSize?: number | null;
  totalPages?: number | null;
  createdAt: string;
  deletedAt?: string | null;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  /** @deprecated dùng cloudinaryUrl thay cho fileName */
  fileName?: string;
}

/**
 * POST /api/documents  (multipart/form-data)
 * Dùng FormData khi gọi API — xem realApi.uploadDocument()
 */
=======
}

>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
}

>>>>>>> origin/AI-Study-fix
=======
}

>>>>>>> origin/test/share-document-cloudinary
=======
}

>>>>>>> origin/uichange
=======
}

>>>>>>> origin/admin-added
=======
}

>>>>>>> origin/update/feature/share
=======
}

>>>>>>> origin/update/feature/AI/Quiz
=======
}

>>>>>>> origin/Flashcards-fix
=======
}

>>>>>>> origin/admin-added-fix
=======
  updatedAt?: string;
}

>>>>>>> origin/Flashcars
export interface UploadDocumentRequest {
  file: File;
  title: string;
  description?: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  folderId?: string;       // UUID
  subjectId?: number;
}

/** PUT /api/documents/:id */
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  folderId?: string;
  subjectId?: number;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  folderId?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/** GET /api/documents/:id/download */
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
export interface DownloadUrlResponse {
  url: string;
  expiresAt?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// ------------------------------------------------------------------
// 6. NOTE (Sổ ghi chú)  →  table: document (mimeType = note hoặc type riêng)
// ------------------------------------------------------------------
// ⚠️  Chưa có bảng note riêng trong schema hiện tại.
//     Tạm dùng Document với mimeType = "text/note" để phân biệt.
//     Khi BE có bảng/endpoint note riêng thì tách ra type Note độc lập.

export interface Note extends Document {
  mimeType: "text/note";
}

// ------------------------------------------------------------------
// 7. SHARE  →  table: share
// ------------------------------------------------------------------

export type Visibility = "private" | "shared" | "public";

export interface ShareInfo {
  folderId: string;
  visibility: Visibility;
  recipients: ShareRecipient[];
  /** Public link nếu visibility = public */
  link?: string;
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// =============================================================
// 4. SHARE
// =============================================================

export type Visibility = "private" | "shared" | "public";

export interface ShareRequest {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  folderId: string;
  email?: string;      // Search by email
  username?: string;   // Search by username
  visibility: Visibility;
}

export interface ShareResponse {
  id: number;
  folderId: string;
  ownerId: string;
  sharedAccountId?: string;
  sharedUsername?: string;
  sharedEmail?: string;
  visibility: Visibility;
  createdAt: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  // Temporary addition to prevent TS errors on shared page
  title?: string;
  description?: string;
  sharedBy?: string;
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
export interface DownloadUrlResponse {
  url: string;
  expiresAt: string;
}

export interface ShareRequest {
  folderId: string;
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
>>>>>>> origin/Flashcars
}

export interface ShareRecipient {
  accountId: string;
  email: string;
<<<<<<< HEAD
  fullName?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/** Tài liệu được chia sẻ cho user hiện tại (dùng ở trang Shared) */
export interface SharedDocument extends Document {
  sharedBy: string;       // fullName của người share
  sharedAt: string;       // ISO datetime
  shareId: number;        // share.id — dùng để xoá khỏi danh sách shared
}

// ------------------------------------------------------------------
// 8. RAG  →  table: document_chunk
// ------------------------------------------------------------------

/** POST /api/rag/ask */
export interface AskRequest {
  id: number;             // documentId
=======
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
  folder: Folder;
  owner: User;
  sharedAccount?: User;
  visibility: Visibility;
}

export interface ShareRecipient {
  accountId: string;
  email?: string;
  username?: string;
  fullName?: string;
}

export interface ShareResponse {
  id?: number | string | null;
  folderId?: string | null;
  documentId?: string | null;
  ownerId: string;
  ownerUsername?: string | null;
  ownerEmail?: string | null;
  sharedAccountId?: string | null;
  sharedUsername?: string | null;
  sharedEmail?: string | null;
  visibility: Visibility;
  shareToken?: string | null;
  shareLink?: string | null;
  link?: string | null;
  createdAt?: string | null;
  recipients?: ShareRecipient[];
  documentTitle?: string | null;
  folderName?: string | null;
}

<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
export interface SharedDocument extends Document {
  sharedBy: string;
  sharedAt: string;
  shareId: number;
}

// =============================================================
// 5. RAG
// =============================================================

export interface AskRequest {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  id: string; // folderId
  documentId?: string;
>>>>>>> origin/AI-Study-fix
=======
  id: string;
>>>>>>> origin/test/share-document-cloudinary
=======
  id: string;
>>>>>>> origin/uichange
=======
  id: number;
>>>>>>> origin/admin-added
=======
  id: number;
>>>>>>> origin/update/feature/share
=======
  id: number;
>>>>>>> origin/update/feature/AI/Quiz
=======
  id: number;
>>>>>>> origin/Flashcards-fix
=======
  id: number;
>>>>>>> origin/admin-added-fix
=======
  username: string;
  fullName: string;
}

export interface AskRequest {
  documentId: string;
>>>>>>> origin/Flashcars
  question: string;
}

export interface AskResponse {
  answer: string;
<<<<<<< HEAD
  referencedChunks?: ReferencedChunk[];
}

export interface ReferencedChunk {
  chunkIndex: number;
  content: string;
  similarity?: number;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// ------------------------------------------------------------------
// 9. QUIZ  →  tables: quiz, question, quiz_attempt, quiz_answer
// ------------------------------------------------------------------
=======
// =============================================================
// 6. QUIZ
// =============================================================
>>>>>>> origin/Ai-Study-fix-folder-refactor

export interface Quiz {
  id: number;
  documentId: number;
=======
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// =============================================================
// 6. QUIZ
// =============================================================

export interface Quiz {
  id: number;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  documentId: string;
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
// =============================================================
// 6. QUIZ
// =============================================================

export interface Quiz {
  id: string;
  documentId: number;
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
  documentId: number;
>>>>>>> origin/admin-added
=======
  documentId: number;
>>>>>>> origin/update/feature/share
=======
  documentId: number;
>>>>>>> origin/update/feature/AI/Quiz
=======
  documentId: number;
>>>>>>> origin/Flashcards-fix
=======
  documentId: number;
>>>>>>> origin/admin-added-fix
  title: string;
  generatedByAi: boolean;
  createdAt: string;
  questions?: Question[];
}

export interface Question {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/test/share-document-cloudinary
=======
  id: string;
>>>>>>> origin/uichange
=======
  id: number;
>>>>>>> origin/admin-added
=======
  id: number;
>>>>>>> origin/update/feature/share
=======
  id: number;
>>>>>>> origin/update/feature/AI/Quiz
=======
  id: number;
>>>>>>> origin/Flashcards-fix
=======
  id: number;
>>>>>>> origin/admin-added-fix
  quizId: number;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
}

export interface QuizAttempt {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/test/share-document-cloudinary
=======
  id: string;
>>>>>>> origin/uichange
=======
  id: number;
>>>>>>> origin/admin-added
=======
  id: number;
>>>>>>> origin/update/feature/share
=======
  id: number;
>>>>>>> origin/update/feature/AI/Quiz
=======
  id: number;
>>>>>>> origin/Flashcards-fix
=======
  id: number;
>>>>>>> origin/admin-added-fix
  quizId: number;
  accountId: string;
  score?: number;
  totalQuestions: number;
  status: "in_progress" | "completed";
  startedAt: string;
  completedAt?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// ------------------------------------------------------------------
// 10. FLASHCARD  →  tables: flashcard, flashcard_progress
// ------------------------------------------------------------------
=======
// =============================================================
// 7. FLASHCARD
// =============================================================
>>>>>>> origin/Ai-Study-fix-folder-refactor

export interface Flashcard {
  id: number;
  documentId: number;
=======
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// =============================================================
// 7. FLASHCARD
// =============================================================

export interface Flashcard {
  id: number;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  documentId: string;
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
// =============================================================
// 7. FLASHCARD
// =============================================================

export interface Flashcard {
  id: string;
  documentId: number;
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
  documentId: number;
>>>>>>> origin/admin-added
=======
  documentId: number;
>>>>>>> origin/update/feature/share
=======
  documentId: number;
>>>>>>> origin/update/feature/AI/Quiz
=======
  documentId: number;
>>>>>>> origin/Flashcards-fix
=======
  documentId: number;
>>>>>>> origin/admin-added-fix
  frontContent: string;
  backContent: string;
  generatedByAi: boolean;
=======
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
>>>>>>> origin/Flashcars
  createdAt: string;
}

export interface FlashcardProgress {
<<<<<<< HEAD
  flashcardId: number;
  status: "new" | "learning" | "mastered";
  reviewCount: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// ------------------------------------------------------------------
// 11. REPORT  →  table: report
// ------------------------------------------------------------------

export interface ReportDocumentRequest {
  id: number;             // documentId
  reason: string;
  description?: string;
}

// ------------------------------------------------------------------
// 12. PAYMENT  →  table: payment
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
// 13. GENERIC API WRAPPER
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
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// =============================================================
// 8. REPORT
// =============================================================

export interface ReportDocumentRequest {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  id: number;
  reason: string;
  description?: string;
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
  id: string;
  reason: string;
  description?: string;
}
<<<<<<< HEAD
<<<<<<< HEAD

// =============================================================
// 9. RAG REQUESTS
// =============================================================

export interface RagProcessRequest {
  documentId: string;
}

export interface RagChatRequest {
  folderId?: string;
  documentId?: string;
  question: string;
}

export interface RagChatResponse {
  answer: string;
  referencedDocumentIds: string[];
}
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
  id: string;
  flashcardId: string;
  status: "new" | "learning" | "mastered";
  lastReviewed: string;
}
>>>>>>> origin/Flashcars
