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
  description: string;
}