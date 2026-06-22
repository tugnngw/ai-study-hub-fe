// =============================================================
// realApi.ts — Real API calls, 1-1 mapping với BE endpoints
// =============================================================
// Đây là lớp gọi API duy nhất (không còn mock).
// queries.ts import trực tiếp các object dưới đây.
// Đổi VITE_API_BASE trong .env.local để trỏ tới BE.
// =============================================================

import { api } from "./api"; // client có sẵn, tự gán Bearer token
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Semester,
  CreateSemesterRequest,
  Subject,
  CreateSubjectRequest,
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
  /** POST /api/auth/register */
  register: (data: RegisterRequest) =>
    api<void>("/auth/register", { method: "POST", body: data }),

  /**
   * POST /api/auth/login
   * Lưu token vào tokenStore ngay sau khi nhận response
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

  /** POST /api/auth/logout */
  logout: async (): Promise<void> => {
    await api("/auth/logout", { method: "POST", body: {} }).catch(() => {});
    tokenStore.clear();
  },
};

// ================================================================
// ACCOUNT  →  /api/account
// ================================================================

export const accountApi = {
  /** GET /api/account/me */
  me: () => api<User>("/account/me"),

  /**
   * PUT /api/account/me — cập nhật hồ sơ.
   * ⚠️ Endpoint chưa có trong API doc — path dự kiến theo REST convention.
   *    Confirm với BE trước khi dùng production.
   */
  updateProfile: (data: Partial<Pick<User, "fullName" | "email">> & { dob?: string; address?: string; course?: string }) =>
    api<User>("/account/me", { method: "PUT", body: data }),

  /**
   * POST /api/account/change-password
   * ⚠️ Endpoint chưa có trong API doc — confirm với BE.
   */
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api<void>("/account/change-password", { method: "POST", body: data }),
};

// ================================================================
// SEMESTER  →  /api/semester
// ================================================================
// ⚠️  Endpoint chưa có trong API doc — path dự kiến theo REST convention.
//     Confirm với BE trước khi dùng production.
//     Bảng: semester(id, name, start_date, end_date)

export const semesterApi = {
  /** GET /api/semester/getall — danh sách tất cả học kỳ */
  list: () => api<Semester[]>("/semester/getall"),

  /** GET /api/semester/getbyid/:id */
  getById: (id: number) => api<Semester>(`/semester/getbyid/${id}`),

  /** POST /api/semester/create */
  create: (body: CreateSemesterRequest) =>
    api<Semester>("/semester/create", { method: "POST", body }),
};

// ================================================================
// SUBJECT  →  /api/subject
// ================================================================
// ⚠️  Endpoint chưa có trong API doc — path dự kiến theo REST convention.
//     Confirm với BE trước khi dùng production.
//     Bảng: subject(id, semester_id, code, name)

export const subjectApi = {
  /** GET /api/subject/getall — tất cả môn học */
  list: () => api<Subject[]>("/subject/getall"),

  /**
   * GET /api/subject/getbysemester/:semesterId
   * Môn học theo học kỳ — dùng cho tab "Môn học theo kỳ" trên Dashboard
   */
  listBySemester: (semesterId: number) =>
    api<Subject[]>(`/subject/getbysemester/${semesterId}`),

  /** GET /api/subject/getbyid/:id */
  getById: (id: number) => api<Subject>(`/subject/getbyid/${id}`),

  /** POST /api/subject/create */
  create: (body: CreateSubjectRequest) =>
    api<Subject>("/subject/create", { method: "POST", body }),
};

// ================================================================
// FOLDER  →  /api/folder
// ================================================================

export const folderApi = {
  /** GET /api/folder/getall */
  list: () => api<Folder[]>("/folder/getall"),

  /** GET /api/folder/getbyid/:id */
  getById: (id: string) => api<Folder>(`/folder/getbyid/${id}`),

  /** POST /api/folder/create */
  create: (body: CreateFolderRequest) =>
    api<Folder>("/folder/create", { method: "POST", body }),

  /** PUT /api/folder/update/:id */
  update: (id: string, body: UpdateFolderRequest) =>
    api<Folder>(`/folder/update/${id}`, { method: "PUT", body }),

  /** DELETE /api/folder/delete/:id */
  delete: (id: string) =>
    api<void>(`/folder/delete/${id}`, { method: "DELETE" }),
};

// ================================================================
// DOCUMENT  →  /api/documents
// ================================================================

export const documentApi = {
  /** GET /api/documents */
  list: () => api<Document[]>("/documents"),

  /** GET /api/documents/folder/:folderId */
  listByFolder: (folderId: string) =>
    api<Document[]>(`/documents/folder/${folderId}`),

  /** GET /api/documents/:id */
  getById: (id: number) => api<Document>(`/documents/${id}`),

  /**
   * POST /api/documents  (multipart/form-data)
   * Upload tài liệu mới — bước 1 trong upload flow
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

  /** PUT /api/documents/:id */
  update: (id: number, body: UpdateDocumentRequest) =>
    api<Document>(`/documents/${id}`, { method: "PUT", body }),

  /** DELETE /api/documents/:id — soft delete (set deleted_at) */
  delete: (id: number) =>
    api<void>(`/documents/${id}`, { method: "DELETE" }),

  /** GET /api/documents/:id/download */
  getDownloadUrl: (id: number) =>
    api<DownloadUrlResponse>(`/documents/${id}/download`),

  // ----------------------------------------------------------------
  // ⚠️ CHƯA CÓ TRONG API DOC — suy ra từ deleted_at trong schema.
  //    Cần BE confirm path trước khi dùng production.
  // ----------------------------------------------------------------

  /** GET /api/documents/trash */
  listTrash: () => api<Document[]>("/documents/trash"),

  /** PUT /api/documents/:id/restore */
  restore: (id: number) =>
    api<Document>(`/documents/${id}/restore`, { method: "PUT" }),

  /** DELETE /api/documents/:id/permanent */
  permanentDelete: (id: number) =>
    api<void>(`/documents/${id}/permanent`, { method: "DELETE" }),
};

// ================================================================
// SHARE  →  /api/documents (share endpoints)
// ================================================================
// 🔴 MISMATCH VỚI DATABASE:
//    Bảng `share` lưu theo FOLDER (folder_id, owner_id, shared_account_id).
//    FE hiện tại thao tác theo documentId — cần BE confirm hoặc đổi sang folderId.

export const shareApi = {
  /** GET /api/documents/shared */
  listSharedWithMe: () => api<SharedDocument[]>("/documents/shared"),

  /** GET /api/documents/:id/share */
  getShareInfo: (documentId: number) =>
    api<ShareInfo>(`/documents/${documentId}/share`),

  /** POST /api/documents/:id/share */
  shareWithEmail: (documentId: number, email: string) =>
    api<ShareInfo>(`/documents/${documentId}/share`, {
      method: "POST",
      body: { email },
    }),

  /** DELETE /api/documents/shared/:shareId */
  removeFromShared: (shareId: number) =>
    api<void>(`/documents/shared/${shareId}`, { method: "DELETE" }),

  /** POST /api/documents/:sharedDocId/save */
  saveToMyFolder: (sharedDocId: number, folderId: string, title: string, description?: string) =>
    api<Document>(`/documents/${sharedDocId}/save`, {
      method: "POST",
      body: { folderId, title, description },
    }),

  /** POST /api/documents/:id/report */
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
   * Upload file RAG — bước 2 sau khi tạo document
   */
  upload: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
    return api<void>("/rag/upload", { method: "POST", formData: fd });
  },

  /**
   * POST /api/rag/upload/chunk
   * Upload + chunk file với documentId
   */
  uploadAndChunk: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
    return api<void>("/rag/upload/chunk", { method: "POST", formData: fd });
  },

  /**
   * POST /api/rag/ask
   * Params: id (Long) + question (String) — gửi dưới dạng query string
   */
  ask: (input: AskRequest): Promise<AskResponse> => {
    const params = new URLSearchParams({
      id: String(input.id),
      question: input.question,
    });
    return api<AskResponse>(`/rag/ask?${params.toString()}`, {
      method: "POST",
    });
  },
};

// ================================================================
// QUIZ  →  (chuẩn bị sẵn — chưa có trong API doc)
// ================================================================

export const quizApi = {
  /** GET /api/quiz?documentId=:id */
  listByDocument: (documentId: number) =>
    api<Quiz[]>(`/quiz?documentId=${documentId}`),

  /** POST /api/quiz/generate */
  generate: (documentId: number, questionCount = 10) =>
    api<Quiz>("/quiz/generate", {
      method: "POST",
      body: { documentId, questionCount },
    }),
};

// ================================================================
// FLASHCARD  →  (chuẩn bị sẵn — chưa có trong API doc)
// ================================================================

export const flashcardApi = {
  /** GET /api/flashcard?documentId=:id */
  listByDocument: (documentId: number) =>
    api<Flashcard[]>(`/flashcard?documentId=${documentId}`),

  /** POST /api/flashcard/generate */
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
