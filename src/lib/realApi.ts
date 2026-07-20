// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
import type {
  User,
  LoginRequest,
  AuthResponse,
  RefreshResponse,
  RegisterRequest,
  Semester,
  Subject,
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
  QuizResponse,
  FlashcardResponse,
  FlashcardProgress,
  GenerateSummaryRequest,
  GenerateSummaryResponse,
  GenerateFlashcardsRequest,
  GenerateQuizRequest,
  QuotaDetails,
} from "./types";

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
      api<void>("/api/auth/forgot-password", { method: "POST", body: { email } }),
  verifyResetOtp: (email: string, otp: string): Promise<void> =>
      api<void>("/api/auth/verify-otp", { method: "POST", body: { email, otp } }),
  resetPassword: (email: string, otp: string, newPassword: string): Promise<void> =>
      api<void>("/api/auth/reset-password", {
        method: "POST",
        body: { email, otp, newPassword },
      }),
  verifyEmail: (token: string): Promise<void> =>
      api<void>(`/api/auth/verify?token=${encodeURIComponent(token)}`, { method: "POST" }),
  sendVerification: (email: string): Promise<void> =>
      api<void>(`/api/auth/send-verification?email=${encodeURIComponent(email)}`, { method: "POST" }),
  resendVerificationByUsername: (username: string): Promise<void> =>
      api<void>(`/api/auth/resend-verification-by-username?username=${encodeURIComponent(username)}`, { method: "POST" }),
  resendVerification: (): Promise<void> =>
      api<void>("/api/auth/resend-verification", { method: "POST" }),
};

// ================================================================
// ACCOUNT  →  /api/account
// ================================================================

export const accountApi = {
  me: (): Promise<User> => api<User>("/api/account/me"),
  updateProfile: (body: { fullName?: string; email?: string }): Promise<void> =>
    api<void>("/api/account/profile", { method: "PUT", body }),
};

// ================================================================
// SEMESTER  →  /api/semesters
// ================================================================

export const semesterApi = {
  list: (): Promise<Semester[]> => api<Semester[]>("/api/semesters"),
  getById: (id: string): Promise<Semester> =>
      api<Semester>(`/api/semesters/${id}`),
};

// ================================================================
// SUBJECT  →  /api/subjects
// ================================================================

export const subjectApi = {
  listBySemester: (semesterId: string): Promise<Subject[]> =>
      api<Subject[]>(`/api/subjects/semester/${semesterId}`),
  getById: (id: string): Promise<Subject> =>
      api<Subject>(`/api/subjects/${id}`),
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
  listSharedFolder: (folderId: string): Promise<Document[]> =>
      api<Document[]>(`/api/documents/shared/folder/${folderId}`),
  getById: (id: string): Promise<Document> =>
      api<Document>(`/api/documents/${id}`),
  getSharedById: (id: string): Promise<Document> =>
      api<Document>(`/api/documents/shared/${id}`),

  upload: async (input: UploadDocumentRequest): Promise<Document[]> => {
    const fd = new FormData();
    const list = input.files ?? (input.file ? [input.file] : []);
    list.forEach((f) => fd.append("files", f));
    fd.append("title", input.title);
    if (input.description) {
      fd.append("description", input.description);
    }
    if (input.folderId) {
      fd.append("folderId", input.folderId);
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
  process: (documentId: string): Promise<string> =>
    api<string>(`/api/v1/rag/process/${documentId}`, { method: "POST" }),

  processFolder: (folderId: string): Promise<string> =>
    api<string>(`/api/v1/rag/process-folder/${folderId}`, { method: "POST" }),

  status: (documentId: string): Promise<import("./types").RagStatusResponse> =>
    api<import("./types").RagStatusResponse>(`/api/v1/rag/status/${documentId}`),

  // Chat sessions
  sessions: (documentId: string): Promise<import("./types").ChatSession[]> =>
    api<import("./types").ChatSession[]>(`/api/v1/rag/sessions?documentId=${documentId}`),

  sessionDetail: (sessionId: string): Promise<import("./types").ChatSession> =>
    api<import("./types").ChatSession>(`/api/v1/rag/sessions/${sessionId}`),

  deleteSession: (sessionId: string): Promise<void> =>
    api<void>(`/api/v1/rag/sessions/${sessionId}`, { method: "DELETE" }),

  chat: (input: import("./types").AskRequest): Promise<import("./types").AskResponse> =>
    api<import("./types").AskResponse>("/api/v1/rag/chat", {
      method: "POST",
      body: { sessionId: input.sessionId ?? null, documentId: input.documentId, question: input.question },
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
  shareDocument: (request: ShareRequest): Promise<ShareResponse> =>
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
  listMyReports: (): Promise<any[]> => api<any[]>("/api/reports/my"),
};

// ================================================================
// QUIZ  →  /api/quizzes
// ================================================================

export const quizApi = {
  listByDocument: (documentId: string): Promise<QuizResponse[]> =>
      api<QuizResponse[]>(`/api/quizzes/${documentId}`),
  generate: (input: GenerateQuizRequest): Promise<QuizResponse> =>
      api<QuizResponse>("/api/quizzes/generate", {
        method: "POST",
        body: input,
      }),
};

// ================================================================
// FLASHCARD  →  /api/flashcards
// ================================================================

export const flashcardApi = {
  listByDocument: (documentId: string): Promise<FlashcardResponse[]> =>
      api<FlashcardResponse[]>(`/api/flashcards/${documentId}`),
  generate: (input: GenerateFlashcardsRequest): Promise<FlashcardResponse[]> =>
      api<FlashcardResponse[]>("/api/flashcards/generate", {
        method: "POST",
        body: input,
      }),
};

// ================================================================
// AI SUMMARY
// ================================================================

export const summaryApi = {
  generate: (request: GenerateSummaryRequest): Promise<GenerateSummaryResponse> =>
      api<GenerateSummaryResponse>("/api/ai/summary", {
        method: "POST",
        body: request,
      }),

  getCached: (documentId: string): Promise<GenerateSummaryResponse> =>
      api<GenerateSummaryResponse>(`/api/ai/summary/${documentId}`),
};

// ================================================================
// QUOTA  →  /api/quota
// ================================================================

export const quotaApi = {
  getDetails: (): Promise<QuotaDetails> =>
      api<QuotaDetails>("/api/quota"),
};
