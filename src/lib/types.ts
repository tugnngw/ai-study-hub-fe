// =============================================================
// Backend enums (case-sensitive, from ../ai-study-hub-be/domain/enums/)
// =============================================================
export type DocumentStatus = "COMPLETED" | "READY" | "REJECT" | "REPORTED" | "BANNED";
export type AccountRole = "USER" | "ADMIN";
export type AccountStatus = "ACTIVE" | "INACTIVE" | "SOFT_deleted";
export type PlanName = "FREE" | "BASIC" | "PRO" | "PREMIUM";
export type SubscriptionStatusEnum = "ACTIVE" | "EXPIRED" | "CANCELLED" | "UPGRADED";
export type AiProcessingStatus = "NOT_STARTED" | "PROCESSING" | "COMPLETED" | "FAILED";
export type AuthProvider = "LOCAL" | "GOOGLE" | "GITHUB";
export type PaymentStatusValue = "PENDING" | "PROCESSING" | "PAID" | "CANCELLED" | "FAILED" | "EXPIRED";
export type ActivityType = "USER_REGISTER" | "USER_UPGRADE" | "DOCUMENT_UPLOAD" | "DOCUMENT_DOWNLOAD" | "DOCUMENT_DELETE" | "DOCUMENT_RESTORE" | "PAYMENT_SUCCESS" | "PAYMENT_FAILED";
export type FlashcardProgressStatus = "NEW" | "LEARNING" | "MASTERED";

// =============================================================
// AUTH
// =============================================================
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
  email?: string;
}

// Backend AuthResponse record
export interface AuthResponse {
  userId: string;
  username: string;
  email: string | null;
  fullName: string;
  role: AccountRole;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  emailVerified: boolean;
}

// /api/account/me response
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  role: AccountRole;
  status: AccountStatus;
  plan: PlanName;
  storageGb: number;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
}

// =============================================================
// PLAN / SUBSCRIPTION
// =============================================================
// Matches backend PlanResponse
export interface Plan {
  id: string;
  name: string;
  tagline?: string;
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
  tier: number;
}

// Matches backend SubscriptionResponse (/api/payment/my-subscription)
export interface SubscriptionResponse {
  id: string;
  planId: string;
  planName: string;
  status: string;
  startDate: string;
  endDate: string | null;
  pricePaid: number;
  storageGbGranted: number;
  aiQuestionsGranted: number;
  flashcardLimitGranted: number;
  questionLimitGranted: number;
  summaryLimitGranted: number;
  chatLimitGranted: number;
  tierGranted: number;
  daysRemaining: number;
}

// =============================================================
// SEMESTER / SUBJECT
// =============================================================
export interface Semester {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  semesterId: string;
  code?: string | null;
  name: string;
  defaultSubject?: boolean;
}

// =============================================================
// FOLDER
// =============================================================
export interface Folder {
  id: string;
  name: string;
  description?: string | null;
  aiSummary?: string | null;
  subjectId?: string | null;
  semesterId?: string | null;
  createdAt: string;
  updatedAt: string;
  documentCount: number;
  deletedAt?: string | null;
}

export interface CreateFolderRequest {
  name: string;
  description?: string;
  subjectId: string;
}

export interface UpdateFolderRequest {
  name?: string;
  description?: string;
  subjectId?: string;
}

// =============================================================
// DOCUMENT
// =============================================================
// Matches backend DocumentResponse
export interface Document {
  id: string;
  ownerId: string;
  subjectId?: string | null;
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
  expiresAt?: string;
}

// =============================================================
// QUOTA
// =============================================================
// Matches backend QuotaService.QuotaDetails
export interface QuotaDetails {
  planName: string;
  storageGb: number;
  aiQuestions: number;
  chatLimit: number;
  flashcardLimit: number;
  questionLimit: number;
  summaryLimit: number;
  chatRemaining: number;
  flashcardRemaining: number;
  questionRemaining: number;
  summaryRemaining: number;
  subscriptionEndDate: string;
  status: "ACTIVE" | "NO_SUBSCRIPTION" | "NO_PLAN" | "EXPIRED";
}

// =============================================================
// RAG / AI
// =============================================================

// Backend RagController GET /api/v1/rag/status/{id} returns Map<String,String> = { documentId, status }
export interface RagStatusResponse {
  documentId: string;
  status: AiProcessingStatus;
}

export interface AskRequest {
  sessionId?: string | null;
  documentId: string;
  question: string;
}

// Backend RagChatResponse
export interface AskResponse {
  sessionId: string;
  answer: string;
  referencedDocumentIds?: string[];
}

// Backend ChatSessionResponse
export interface ChatSession {
  id: string;
  documentId: string;
  title: string;
  messageCount?: number;
  messages?: ChatMessage[];
  createdAt: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  senderType: "USER" | "AI";
  content: string;
  referencedChunks?: string;
  createdAt: string;
}

export interface GenerateSummaryRequest {
  documentId: string;
  force?: boolean;
}

// Backend AiSummaryController SummaryResponse
export interface GenerateSummaryResponse {
  markdown: string;
}

export interface GenerateFlashcardsRequest {
  documentId: string;
  numberOfCards: number;
}

// Backend FlashcardGenerateResponse
export interface GenerateFlashcardsResponse {
  flashcards: FlashcardResponse[];
  requestedCount: number;
  rawCount: number;
  savedCount: number;
  message: string;
}

export interface GenerateQuizRequest {
  documentId: string;
  numberOfQuestions: number;
}

export interface FlashcardProgress {
  flashcardId: string;
  status: FlashcardProgressStatus;
}

// Backend FlashcardResponse
export interface FlashcardResponse {
  id: string;
  frontContent: string;
  backContent: string;
  generatedByAi?: boolean;
  createdAt?: string;
}

// Backend QuizResponse with nested QuestionResponse
export interface QuizResponse {
  id: string;
  title?: string;
  generatedByAi?: boolean;
  createdAt?: string;
  questions: QuestionResponse[];
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
// SHARE
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
  recipients?: ShareRecipient[];
  documentTitle: string | null;
  folderName: string | null;
  cloudinaryUrl?: string | null;
  documentStatus?: string | null;
}

export interface ShareRecipient {
  accountId?: string;
  email?: string;
  username?: string;
  fullName?: string;
}

export interface ShareRequest {
  folderId?: string;
  documentId?: string;
  username?: string;
  email?: string;
  visibility?: string;
}

// =============================================================
// REPORT
// =============================================================
export interface ReportDocumentRequest {
  id: string;
  reason: string;
  description: string;
}

// Backend ReportResponse
export interface ReportResponse {
  id: string;
  documentId: string;
  documentTitle?: string;
  reporterId: string;
  reporterUsername?: string;
  reason: string;
  status: string;
  adminComment?: string;
  cloudinaryUrl?: string | null;
  mimeType?: string | null;
  createdAt: string;
}

export interface ReportDecisionRequest {
  decision: "approved" | "rejected" | "removed";
  comment?: string;
}

// =============================================================
// SAVE TO FOLDER (share save)
// =============================================================
export interface SaveToFolderResponse {
  total: number;
  copied: number;
  skipped: number;
  failed: number;
  copiedDocuments?: SaveDocumentResult[];
  skippedDocuments?: SaveDocumentResult[];
  failedDocuments?: SaveDocumentResult[];
  message: string;
}

export interface SaveDocumentResult {
  name: string;
  documentId: string | null;
  reason?: string;
}

// =============================================================
// SYSTEM
// =============================================================
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
