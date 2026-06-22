// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Folder,
  CreateFolderRequest,
  UpdateFolderRequest,
  Document,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  DownloadUrlResponse,
  ShareInfo,
  SharedDocument,
  AskRequest,
  AskResponse,
  ReportDocumentRequest,
  Quiz,
  Flashcard,
  FlashcardProgress,
} from "./types";

// ================================================================
// AUTH  →  /api/auth
// ================================================================

export const authApi = {
  register: (data: RegisterRequest) =>
    api<void>("/api/auth/register", { method: "POST", body: data }),

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: data,
    });
    tokenStore.set(res.token);
    if (res.refreshToken) tokenStore.setRefresh(res.refreshToken);
    return res;
  },

  logout: async (): Promise<void> => {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    tokenStore.clear();
  },

  // Password reset flow
  requestPasswordReset: (email: string) =>
    api<void>("/api/auth/request-reset", { method: "POST", body: { email } }),
  verifyResetOtp: (email: string, otp: string) =>
    api<void>("/api/auth/verify-otp", { method: "POST", body: { email, otp } }),
  resetPassword: (email: string, newPassword: string) =>
    api<void>("/api/auth/reset-password", {
      method: "POST",
      body: { email, password: newPassword },
    }),
};

// ================================================================
// ACCOUNT  →  /api/account
// ================================================================

export const accountApi = {
  me: () => api<User>("/api/account/me"),
};

// ================================================================
// FOLDER  →  /api/folder
// ================================================================

export const folderApi = {
  list: () => api<Folder[]>("/api/folder/getall"),
  getById: (id: string) => api<Folder>(`/api/folder/getbyid/${id}`),
  create: (body: CreateFolderRequest) =>
    api<Folder>("/api/folder/create", { method: "POST", body }),
  update: (id: string, body: UpdateFolderRequest) =>
    api<Folder>(`/api/folder/update/${id}`, { method: "PUT", body }),
  delete: (id: string) =>
    api<void>(`/api/folder/delete/${id}`, { method: "DELETE" }),
};

// ================================================================
// DOCUMENT  →  /api/documents
// ================================================================

export const documentApi = {
  list: () => api<Document[]>("/api/documents"),
  listByFolder: (folderId: string) =>
    api<Document[]>(`/api/documents/folder/${folderId}`),
  getById: (id: number) => api<Document>(`/api/documents/${id}`),

  upload: async (input: UploadDocumentRequest): Promise<Document> => {
    const fd = new FormData();
    fd.append("file", input.file);
    fd.append("title", input.title);
    if (input.description) fd.append("description", input.description);
    if (input.folderId) fd.append("folderId", input.folderId);
    if (input.subjectId) fd.append("subjectId", String(input.subjectId));
    return api<Document>("/api/documents", { method: "POST", formData: fd });
  },

  update: (id: number, body: UpdateDocumentRequest) =>
    api<Document>(`/api/documents/${id}`, { method: "PUT", body }),

  delete: (id: number) =>
    api<void>(`/api/documents/${id}`, { method: "DELETE" }),

  getDownloadUrl: (id: number) =>
    api<DownloadUrlResponse>(`/api/documents/${id}/download`),

  // Trash (soft-deleted docs)
  listTrash: () => api<Document[]>("/api/documents/trash"),
  restoreFromTrash: (id: number) =>
    api<void>(`/api/documents/${id}/restore`, { method: "POST" }),
  emptyTrash: (id: number) =>
    api<void>(`/api/documents/${id}/permanent`, { method: "DELETE" }),
};

// ================================================================
// RAG  →  /api/rag
// ================================================================

export const ragApi = {
  upload: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

  uploadAndChunk: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
    return api<void>("/api/rag/upload/chunk", { method: "POST", formData: fd });
  },

  ask: (input: AskRequest): Promise<AskResponse> =>
    api<AskResponse>("/api/rag/ask", {
      method: "POST",
      body: { id: input.id, question: input.question },
    }),
};

// ================================================================
// SHARE  →  /api/documents
// ================================================================

export const shareApi = {
  listSharedWithMe: () => api<SharedDocument[]>("/api/documents/shared"),

  getShareInfo: (documentId: number) =>
    api<ShareInfo>(`/api/documents/${documentId}/share`),

  shareWithEmail: (documentId: number, email: string) =>
    api<ShareInfo>(`/api/documents/${documentId}/share`, {
      method: "POST",
      body: { email },
    }),

  removeFromShared: (shareId: number) =>
    api<void>(`/api/documents/shared/${shareId}`, { method: "DELETE" }),

  saveToMyFolder: (
    sharedDocId: number,
    folderId: string,
    title: string,
    description?: string,
  ) =>
    api<Document>(`/api/documents/${sharedDocId}/save`, {
      method: "POST",
      body: { folderId, title, description },
    }),

  report: (body: ReportDocumentRequest) =>
    api<void>(`/api/documents/${body.id}/report`, {
      method: "POST",
      body: { reason: body.reason, description: body.description },
    }),
};

// ================================================================
// QUIZ  →  /api/quiz
// ================================================================

export const quizApi = {
  listByDocument: (documentId: number) =>
    api<Quiz[]>(`/api/quiz?documentId=${documentId}`),

  generate: (documentId: number, questionCount = 10) =>
    api<Quiz>("/api/quiz/generate", {
      method: "POST",
      body: { documentId, questionCount },
    }),
};

// ================================================================
// FLASHCARD  →  /api/flashcard
// ================================================================

export const flashcardApi = {
  listByDocument: (documentId: number) =>
    api<Flashcard[]>(`/api/flashcard?documentId=${documentId}`),

  generate: (documentId: number) =>
    api<Flashcard[]>("/api/flashcard/generate", {
      method: "POST",
      body: { documentId },
    }),

  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
      method: "PUT",
      body: { status },
    }),
};
