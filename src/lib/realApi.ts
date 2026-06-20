// =============================================================
// realApi.ts — Real API calls, 1-1 mapping với BE endpoints
// =============================================================
// Hướng dẫn kết nối:
//   1. Copy file này vào src/lib/
//   2. Mở queries.ts, thay mỗi mockApi.xxx() → realApi.xxx()
//   3. Đổi VITE_API_BASE trong .env nếu cần
// =============================================================

import { api } from "./api"; // client có sẵn, tự gán Bearer token
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
import { tokenStore } from "./api";

// ================================================================
// AUTH  →  /api/auth
// ================================================================

export const authApi = {
  /**
   * POST /api/auth/register
   * Đăng ký tài khoản mới
   */
  register: (data: RegisterRequest) =>
    api<void>("/auth/register", { method: "POST", body: data }),

  /**
   * POST /api/auth/login
   * Returns token + user info — lưu token vào tokenStore ngay tại đây
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api<LoginResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
    tokenStore.set(res.token);
    if (res.refreshToken) tokenStore.setRefresh(res.refreshToken);
    return res;
  },

  /**
   * POST /api/auth/logout
   */
  logout: async (): Promise<void> => {
    await api("/auth/logout", { method: "POST", body: {} }).catch(() => {});
    tokenStore.clear();
  },
};

// ================================================================
// ACCOUNT  →  /api/account
// ================================================================

export const accountApi = {
  /**
   * GET /api/account/me
   * Lấy thông tin user đang đăng nhập
   */
  me: () => api<User>("/account/me"),
};

// ================================================================
// FOLDER  →  /api/folder
// ================================================================

export const folderApi = {
  /**
   * GET /api/folder/getall
   * Danh sách tất cả folder của user
   */
  list: () => api<Folder[]>("/folder/getall"),

  /**
   * GET /api/folder/getbyid/:id
   */
  getById: (id: string) => api<Folder>(`/folder/getbyid/${id}`),

  /**
   * POST /api/folder/create
   */
  create: (body: CreateFolderRequest) =>
    api<Folder>("/folder/create", { method: "POST", body }),

  /**
   * PUT /api/folder/update/:id
   */
  update: (id: string, body: UpdateFolderRequest) =>
    api<Folder>(`/folder/update/${id}`, { method: "PUT", body }),

  /**
   * DELETE /api/folder/delete/:id
   */
  delete: (id: string) =>
    api<void>(`/folder/delete/${id}`, { method: "DELETE" }),
};

// ================================================================
// DOCUMENT  →  /api/documents
// ================================================================

export const documentApi = {
  /**
   * GET /api/documents
   * Tất cả document của user
   */
  list: () => api<Document[]>("/documents"),

  /**
   * GET /api/documents/folder/:folderId
   * Document theo folder
   */
  listByFolder: (folderId: string) =>
    api<Document[]>(`/documents/folder/${folderId}`),

  /**
   * GET /api/documents/:id
   */
  getById: (id: number) => api<Document>(`/documents/${id}`),

  /**
   * POST /api/documents  (multipart/form-data)
   * Upload tài liệu mới
   */
  upload: async (input: UploadDocumentRequest): Promise<Document> => {
    const fd = new FormData();
    fd.append("file", input.file);
    fd.append("title", input.title);
    if (input.description) fd.append("description", input.description);
    if (input.folderId) fd.append("folderId", input.folderId);
    if (input.subjectId != null) fd.append("subjectId", String(input.subjectId));
    return api<Document>("/documents", { method: "POST", formData: fd });
  },

  /**
   * PUT /api/documents/:id
   * Cập nhật metadata (title, description, folderId)
   */
  update: (id: number, body: UpdateDocumentRequest) =>
    api<Document>(`/documents/${id}`, { method: "PUT", body }),

  /**
   * DELETE /api/documents/:id
   * Soft delete — document chuyển sang deleted_at
   */
  delete: (id: number) =>
    api<void>(`/documents/${id}`, { method: "DELETE" }),

  /**
   * GET /api/documents/:id/download
   * Trả về URL download (có thể là Cloudinary signed URL)
   */
  getDownloadUrl: (id: number) =>
    api<DownloadUrlResponse>(`/documents/${id}/download`),
};

// ================================================================
// SHARE  →  /api/documents (share endpoints)
// ================================================================
// ⚠️  API doc chưa liệt kê rõ share endpoint riêng.
//     Tạm định nghĩa theo pattern chuẩn — điều chỉnh khi BE confirm.
// ================================================================

export const shareApi = {
  /**
   * GET /api/documents/shared
   * Danh sách tài liệu được người khác share cho mình
   */
  listSharedWithMe: () => api<SharedDocument[]>("/documents/shared"),

  /**
   * GET /api/documents/:id/share
   * Lấy thông tin share của một document (recipients, link)
   */
  getShareInfo: (documentId: number) =>
    api<ShareInfo>(`/documents/${documentId}/share`),

  /**
   * POST /api/documents/:id/share
   * Chia sẻ document cho email khác
   */
  shareWithEmail: (documentId: number, email: string) =>
    api<ShareInfo>(`/documents/${documentId}/share`, {
      method: "POST",
      body: { email },
    }),

  /**
   * DELETE /api/documents/shared/:shareId
   * Xoá document khỏi danh sách "Shared with me"
   */
  removeFromShared: (shareId: number) =>
    api<void>(`/documents/shared/${shareId}`, { method: "DELETE" }),

  /**
   * POST /api/documents/:sharedDocId/save
   * Lưu document được share vào folder của mình
   */
  saveToMyFolder: (sharedDocId: number, folderId: string, title: string, description?: string) =>
    api<Document>(`/documents/${sharedDocId}/save`, {
      method: "POST",
      body: { folderId, title, description },
    }),

  /**
   * POST /api/documents/:id/report
   * Báo cáo vi phạm tài liệu
   */
  report: (body: ReportDocumentRequest) =>
    api<void>(`/documents/${body.id}/report`, {
      method: "POST",
      body: { reason: body.reason, description: body.description },
    }),
};

// ================================================================
// RAG  →  /api/rag
// ================================================================

export const ragApi = {
  /**
   * POST /api/rag/upload
   * Upload file RAG (không chunk) — cần documentId
   */
  upload: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
    return api<void>("/rag/upload", { method: "POST", formData: fd });
  },

  /**
   * POST /api/rag/upload/chunk
   * Upload và chunk file với documentId
   */
  uploadAndChunk: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
    return api<void>("/rag/upload/chunk", { method: "POST", formData: fd });
  },

  /**
   * POST /api/rag/ask
   * Đặt câu hỏi dựa trên nội dung document (RAG)
   */
  ask: (input: AskRequest): Promise<AskResponse> =>
    api<AskResponse>("/rag/ask", {
      method: "POST",
      // BE nhận params: id (Long), question (String)
      // Nếu BE dùng query params thay vì body thì dùng fetch trực tiếp
      body: { id: input.id, question: input.question },
    }),
};

// ================================================================
// QUIZ  →  (chưa có trong API doc — chuẩn bị sẵn)
// ================================================================

export const quizApi = {
  /** GET /api/quiz?documentId=:id */
  listByDocument: (documentId: number) =>
    api<Quiz[]>(`/quiz?documentId=${documentId}`),

  /** POST /api/quiz/generate — tạo quiz bằng AI */
  generate: (documentId: number, questionCount = 10) =>
    api<Quiz>("/quiz/generate", {
      method: "POST",
      body: { documentId, questionCount },
    }),
};

// ================================================================
// FLASHCARD  →  (chưa có trong API doc — chuẩn bị sẵn)
// ================================================================

export const flashcardApi = {
  /** GET /api/flashcard?documentId=:id */
  listByDocument: (documentId: number) =>
    api<Flashcard[]>(`/flashcard?documentId=${documentId}`),

  /** POST /api/flashcard/generate — tạo flashcard bằng AI */
  generate: (documentId: number) =>
    api<Flashcard[]>("/flashcard/generate", {
      method: "POST",
      body: { documentId },
    }),

  /** PUT /api/flashcard/:id/progress */
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/flashcard/${flashcardId}/progress`, {
      method: "PUT",
      body: { status },
    }),
};
