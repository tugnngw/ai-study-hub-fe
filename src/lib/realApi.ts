// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
import type {
  User,
  LoginRequest,
  AuthResponse,
  RefreshResponse,
  RegisterRequest,
  Folder,
  CreateFolderRequest,
  UpdateFolderRequest,
  Document,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  DownloadUrlResponse,
  ShareResponse,
  ShareRequest,
  AskRequest,
  AskResponse,
  ReportDocumentRequest,
  Quiz,
  Flashcard,
  FlashcardProgress,
} from "./types";
import type { QuizItem } from "@/features/quiz/types/quiz.types";
import type { GenerateSummaryRequest, GenerateSummaryResponse } from "./types";

// ================================================================
// AUTH  →  /api/auth
// ================================================================

export const authApi = {
  register: (data: RegisterRequest): Promise<AuthResponse> =>
      api<AuthResponse>("/api/auth/register", { method: "POST", body: data }),

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await api<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: data,
    });

    const token = res?.accessToken;
    const refreshToken = res?.refreshToken;

    if (token) {
      tokenStore.set(token);
    }

    if (refreshToken) {
      tokenStore.setRefresh(refreshToken);
    }

    return res;
  },

  refresh: (): Promise<RefreshResponse> =>
      api<RefreshResponse>("/api/auth/refresh", {
        method: "POST",
        body: { refreshToken: tokenStore.getRefresh() },
      }),

  logout: async (): Promise<void> => {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    tokenStore.clear();
  },

  requestPasswordReset: (email: string): Promise<void> =>
      api<void>("/api/auth/request-reset", { method: "POST", body: { email } }),
  verifyResetOtp: (email: string, otp: string): Promise<void> =>
      api<void>("/api/auth/verify-otp", { method: "POST", body: { email, otp } }),
  resetPassword: (email: string, newPassword: string): Promise<void> =>
      api<void>("/api/auth/reset-password", {
        method: "POST",
        body: { email, password: newPassword },
      }),
};

// ================================================================
// ACCOUNT  →  /api/account
// ================================================================

export const accountApi = {
  me: (): Promise<User> => api<User>("/api/account/me"),
};

// ================================================================
// FOLDER  →  /api/folder
// ================================================================

export const folderApi = {
  list: (): Promise<Folder[]> => api<Folder[]>("/api/folder/getall"),
  getById: (id: string): Promise<Folder> =>
      api<Folder>(`/api/folder/getbyid/${id}`),
  create: (body: CreateFolderRequest): Promise<Folder> =>
      api<Folder>("/api/folder/create", { method: "POST", body }),
  update: (id: string, body: UpdateFolderRequest): Promise<Folder> =>
      api<Folder>(`/api/folder/update/${id}`, { method: "PUT", body }),
  delete: (id: string): Promise<void> =>
      api<void>(`/api/folder/delete/${id}`, { method: "DELETE" }),
};

// ================================================================
// DOCUMENT  →  /api/documents
// ================================================================

export const documentApi = {
  list: (): Promise<Document[]> => api<Document[]>("/api/documents"),
  listByFolder: (folderId: string): Promise<Document[]> =>
      api<Document[]>(`/api/documents/folder/${folderId}`),
  getById: (id: string): Promise<Document> =>
      api<Document>(`/api/documents/${id}`),
  getSharedById: (id: string): Promise<Document> =>
      api<Document>(`/api/documents/shared/${id}`),

  upload: async (input: UploadDocumentRequest): Promise<Document[]> => {
    const fd = new FormData();
    fd.append("files", input.file);
    fd.append("title", input.title);
    if (input.description) {
      fd.append("description", input.description);
    }
    if (input.folderId) {
      fd.append("folderId", input.folderId);
    }
    if (input.subjectId) {
      fd.append("subjectId", String(input.subjectId));
    }
    return api<Document[]>("/api/documents", {
      method: "POST",
      formData: fd,
    });
  },

  update: (id: string, body: UpdateDocumentRequest): Promise<Document> =>
      api<Document>(`/api/documents/${id}`, { method: "PUT", body }),

  delete: (id: string): Promise<void> =>
      api<void>(`/api/documents/${id}`, { method: "DELETE" }),

  getDownloadUrl: (id: string): Promise<DownloadUrlResponse> =>
      api<DownloadUrlResponse>(`/api/documents/${id}/download`),

  listTrash: (): Promise<Document[]> =>
      api<Document[]>("/api/documents/trash"),
  restoreFromTrash: (id: string): Promise<void> =>
      api<void>(`/api/documents/${id}/restore`, { method: "POST" }),
  emptyTrash: (id: string): Promise<void> =>
      api<void>(`/api/documents/${id}/permanent`, { method: "DELETE" }),
};

// ================================================================
// RAG  →  /api/rag
// ================================================================

export const ragApi = {
  processDocument: (documentId: string): Promise<void> =>
      api<void>(`/api/v1/rag/process/${documentId}`, { method: "POST" }),

  getDocumentStatus: (documentId: string): Promise<{ documentId: string; status: string }> =>
      api<{ documentId: string; status: string }>(`/api/v1/rag/status/${documentId}`),

  upload: (file: File, documentId: string): Promise<void> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", documentId);
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

  uploadAndChunk: (file: File, documentId: string): Promise<void> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", documentId);
    return api<void>("/api/rag/upload/chunk", { method: "POST", formData: fd });
  },

  ask: (input: AskRequest): Promise<AskResponse> =>
      api<AskResponse>("/api/rag/ask", {
        method: "POST",
        body: { id: input.id, question: input.question },
      }),
};

// ================================================================
// SHARE  →  /api/shares
// ================================================================

export const shareApi = {
  listOwned: (): Promise<ShareResponse[]> =>
      api<ShareResponse[]>("/api/shares/owner"),
  listSharedWithMe: (): Promise<ShareResponse[]> =>
      api<ShareResponse[]>("/api/shares/shared-with-me"),
  shareFolder: (request: ShareRequest): Promise<ShareResponse> =>
      api<ShareResponse>("/api/shares", { method: "POST", body: request }),
  removeShare: (shareId: string): Promise<void> =>
      api<void>(`/api/shares/${shareId}`, { method: "DELETE" }),
  saveToMyFolder: (shareId: string, folderId: string, title: string, description?: string): Promise<ShareResponse> =>
      api<ShareResponse>(`/api/shares/${shareId}/save`, {
        method: "POST",
        body: { folderId, title, description },
      }),
  report: (body: ReportDocumentRequest): Promise<void> =>
      api<void>(`/api/reports`, {
        method: "POST",
        body: { documentId: body.id, reason: body.reason, description: body.description },
      }),
};
// ================================================================
// QUIZ  →  /api/quiz
// ================================================================

export const quizApi = {
  listByDocument: (documentId: string): Promise<Quiz[]> =>
      api<Quiz[]>(`/api/quizzes?documentId=${documentId}`),
  generate: (input: { documentIds: string[]; numberOfQuestions?: number } | string, questionCount = 10): Promise<Quiz> => {
    const body = typeof input === "string" 
      ? { documentId: input, questionCount }
      : { documentId: input.documentIds[0], numberOfQuestions: input.numberOfQuestions ?? questionCount };
    return api<Quiz>("/api/quizzes/generate", {
      method: "POST",
      body,
    });
  },
  generateAdvanced: (body: {
    scope: "all" | string;
    types: string[];
    questionCount: number;
  }): Promise<QuizItem[]> => api<QuizItem[]>("/api/quizzes/generate", { method: "POST", body }),
};

// ================================================================
// FLASHCARD  →  /api/flashcards
// ================================================================

export const flashcardApi = {
  listByDocument: (documentId: string): Promise<Flashcard[]> =>
      api<Flashcard[]>(`/api/flashcards?documentId=${documentId}`),
  generate: (input: { documentIds: string[]; numberOfCards?: number } | string): Promise<Flashcard[]> => {
    const body = typeof input === "string"
      ? { documentId: input }
      : { documentId: input.documentIds[0], numberOfCards: input.numberOfCards };
    return api<Flashcard[]>("/api/flashcards/generate", {
      method: "POST",
      body,
    });
  },
  updateProgress: (flashcardId: string, status: FlashcardProgress["status"]): Promise<FlashcardProgress> =>
      api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
        method: "PUT",
        body: { status },
      }),
};

export const summaryApi = {
  generate: (request: GenerateSummaryRequest) =>
    api<GenerateSummaryResponse>("/api/ai/summary", {
      method: "POST",
      body: request,
    }),
};
