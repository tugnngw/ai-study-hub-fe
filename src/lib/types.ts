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
  planExpiresAt?: string | null;
  planStartedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

// =============================================================
// SEMESTER
// =============================================================
export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

// =============================================================
// SUBJECT  →  /api/subjects
// =============================================================
export interface Subject {
  id: string;
  semesterId: string;
  code: string | null;
  name: string;
  defaultSubject: boolean;
}

// =============================================================
// FOLDER  →  /api/folder
// =============================================================
export interface Folder {
  id: string;
  name: string;
  subjectId?: string;
  aiSummary?: string | null;
  documentCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFolderRequest {
  name: string;
  subjectId: string;
}

export interface UpdateFolderRequest {
  name?: string;
  subjectId?: string;
}

// =============================================================
// DOCUMENT  →  /api/documents
// =============================================================
export interface Document {
  id: string;
  ownerId: string;
  folderId?: string | null;
  title: string;
  description?: string | null;
  summary?: string | null;
  status: "PROCESSING" | "READY" | "REJECT" | "COMPLETED";
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
  file?: File;
  files?: File[];
  title: string;
  description?: string;
  folderId?: string;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  folderId?: string;
}

export interface DownloadUrlResponse {
  url: string;
  expiresAt: string;
}

// =============================================================
// SHARE  →  /api/shares
// =============================================================
export interface ShareRequest {
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

// =============================================================
// RAG  →  /api/rag
// =============================================================
export interface AskRequest {
  folderId?: string;
  documentId?: string;
  question: string;
}

export interface AskResponse {
  answer: string;
  referencedDocumentIds: string[];
}

export interface RagStatusResponse {
  documentId: string;
  status: string;
}

// =============================================================
// REPORT  →  /api/reports
// =============================================================
export interface ReportDocumentRequest {
  id: string;
  reason: string;
  description?: string;
}

// =============================================================
// QUIZ  →  /api/quizzes
// =============================================================
export interface QuizResponse {
  id: string;
  title: string;
  generatedByAi: boolean;
  createdAt: string;
  questions: QuestionResponse[];
}

export interface QuestionResponse {
  id: string;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string; // "A" | "B" | "C" | "D"
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

// =============================================================
// FLASHCARD  →  /api/flashcards
// =============================================================
export interface FlashcardResponse {
  id: string;
  frontContent: string;
  backContent: string;
  generatedByAi: boolean;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  documentId: string;
  front: string;
  back: string;
  createdAt: string;
}

export interface FlashcardProgress {
  id: string;
  flashcardId: string;
  status: "new" | "learning" | "mastered";
  lastReviewed: string;
}

// =============================================================
// AI SUMMARY
// =============================================================
export interface GenerateSummaryRequest {
  documentId: string;
  force?: boolean;
}

export interface GenerateSummaryResponse {
  markdown: string;
}

// =============================================================
// AI GENERATION REQUESTS
// =============================================================
export interface GenerateFlashcardsRequest {
  documentId: string;
  numberOfCards?: number;
  force?: boolean;
}

export interface GenerateQuizRequest {
  documentId: string;
  numberOfQuestions?: number;
  force?: boolean;
}

export interface SharedDocument {
  id: string;
  title: string;
  description?: string;
  sharedBy: string;
  sharedAt: string;
}
