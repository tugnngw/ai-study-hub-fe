// =============================================================
// AUTH types
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

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  userId: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
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
  storageGb?: number;
  plan?: string;
  planExpiresAt?: string | null;
}

export interface QuestionResponse {
  id: string;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

// =============================================================
// PLAN / SUBSCRIPTION
// =============================================================
export interface Plan {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  durationDays: number;
  storageGb: number;
  aiQuestions: number;
  chatLimit: number;          // 0: disabled, -1: unlimited, >0: limited count
  flashcardLimit: number;     // 0: disabled, -1: unlimited, >0: limited count
  questionLimit: number;      // 0: disabled, -1: unlimited, >0: limited count  
  summaryLimit: number;       // 0: disabled, -1: unlimited, >0: limited count
  features?: string[];
  isPopular: boolean;
  displayOrder: number;
  isActive: boolean;
  tagline?: string | null;
  activeSubscriptionCount?: number;
}

export interface Semester {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  semesterId?: string;
  code?: string | null;
  name: string;
  defaultSubject?: boolean;
}

export interface QuotaDetails {
  planName: string;
  storageGb: number;
  aiQuestions: number;
  chatLimit: number;
  flashcardLimit: number;
  questionLimit: number;
  summaryLimit: number;
  chatRemaining: number;      // -1: unlimited, 0: disabled/exceeded, >0: remaining count
  flashcardRemaining: number;  // -1: unlimited, 0: disabled/exceeded, >0: remaining count
  questionRemaining: number;
  summaryRemaining: number;
  subscriptionEndDate: string;
  status: "ACTIVE" | "NO_SUBSCRIPTION" | "NO_PLAN" | "EXPIRED";
}

// =============================================================
// RAG / AI types
// =============================================================
export type DocumentStatus = "COMPLETED" | "READY" | "REJECT" | "REPORTED" | "BANNED";
export type AiProcessingStatus = "NOT_STARTED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface Document {
  id: string;
  ownerId: string;
  subjectId?: number | null;
  folderId?: string | null;
  title: string;
  description?: string | null;
  summary?: string | null;
  status: DocumentStatus;
  aiStatus?: AiProcessingStatus;
  cloudinaryUrl?: string | null;
  publicId?: string | null;
  mimeType?: string | null;
  checksum?: string | null;
  fileSize?: number | null;
  totalPages?: number | null;
  createdAt: string;
  deletedAt?: string | null;
  rejectReason?: string | null;
}

export interface RagStatusResponse {
  documentId: string;
  aiStatus: AiProcessingStatus;
}

export interface AskRequest {
  sessionId?: string | null;
  folderId?: string;
  documentId: string;
  question: string;
}

export interface AskResponse {
  answer: string;
  sessionId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  documentId: string;
  messages: { senderType: string; content: string }[];
  createdAt: string;
}

export interface GenerateSummaryRequest {
  documentId: string;
  force?: boolean;
}

export interface GenerateSummaryResponse {
  markdown?: string;
  summary?: string;
}

export interface GenerateFlashcardsRequest {
  documentId: string;
  numberOfCards: number;
  force?: boolean;
}

export interface GenerateQuizRequest {
  documentId: string;
  numberOfQuestions: number;
  force?: boolean;
}

export interface FlashcardProgress {
  flashcardId: number;
  status: string;
}

export interface FlashcardResponse {
  id: number;
  frontContent: string;
  backContent: string;
}

export interface QuizResponse {
  id: number;
  questions: {
    id: string;
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
  }[];
}

export interface ReportDocumentRequest {
  id: string;
  reason: string;
  description?: string;
}

// =============================================================
// FOLDER types
// =============================================================
export interface Folder {
  id: string;
  ownerId: string;
  name: string;
  aiSummary?: string | null;
  subjectId?: string | null;
  semesterId?: string | null;
  description?: string | null;
  documentCount?: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateFolderRequest {
  name: string;
  subjectId?: string;
  description?: string;
}

export interface UpdateFolderRequest {
  name: string;
  subjectId?: string;
  description?: string;
}

// =============================================================
// DOCUMENT types
// =============================================================
export interface UploadDocumentRequest {
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
}

export interface DownloadUrlResponse {
  url: string;
  expiresAt: string;
}

// =============================================================
// SHARE types
// =============================================================
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
}

export interface ShareRequest {
  folderId?: string;
  documentId?: string;
  username?: string;
  email?: string;
  visibility: "public" | "private";
}

export interface ShareRecipient {
  username?: string;
  email?: string;
}