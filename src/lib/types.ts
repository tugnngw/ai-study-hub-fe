// src/lib/types.ts
// =============================================================
// 1. AUTH / ACCOUNT
// =============================================================

export interface RegisterRequest {
  username: string;
  password: string;
  fullName?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  authProvider: "LOCAL" | "GOOGLE";
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
  name: string;
  aiSummary?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateFolderRequest {
  name: string;
}

export interface UpdateFolderRequest {
  name: string;
}

// =============================================================
// 3. DOCUMENT
// =============================================================

export type DocumentStatus = "processing" | "ready" | "failed" | "deleted";

export interface Document {
  id: number;
  ownerId: string;
  subjectId?: number | null;
  folderId?: string | null;
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
}

export interface UploadDocumentRequest {
  file: File;
  title: string;
  description?: string;
  folderId?: string;
  subjectId?: number;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  folderId?: string;
}

export interface DownloadUrlResponse {
  url: string;
  expiresAt?: string;
}

// =============================================================
// 4. SHARE
// =============================================================

export type Visibility = "private" | "shared" | "public";

export interface ShareRequest {
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
}

export interface ShareRecipient {
  accountId: string;
  email: string;
  fullName?: string;
}

export interface SharedDocument extends Document {
  sharedBy: string;
  sharedAt: string;
  shareId: number;
}

// =============================================================
// 5. RAG
// =============================================================

export interface AskRequest {
  id: number;
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

// =============================================================
// 6. QUIZ
// =============================================================

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

// =============================================================
// 7. FLASHCARD
// =============================================================

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

// =============================================================
// 8. REPORT
// =============================================================

export interface ReportDocumentRequest {
  id: number;
  reason: string;
  description?: string;
}
