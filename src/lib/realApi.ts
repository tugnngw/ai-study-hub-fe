<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// =============================================================
// realApi.ts — Real API calls, 1-1 mapping với BE endpoints
// =============================================================
// Đây là lớp gọi API duy nhất (không còn mock).
// queries.ts import trực tiếp các object dưới đây.
// Đổi VITE_API_BASE trong .env.local để trỏ tới BE.
// =============================================================

import { api } from "./api"; // client có sẵn, tự gán Bearer token
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/AI-Study-fix
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/test/share-document-cloudinary
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/uichange
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/admin-added
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/update/feature/share
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/update/feature/AI/Quiz
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/Flashcards-fix
=======
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
>>>>>>> origin/admin-added-fix
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  Semester,
  CreateSemesterRequest,
  Subject,
  CreateSubjectRequest,
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
=======
>>>>>>> origin/final/demo-v1
// src/lib/realApi.ts
import { api } from "./api";
import { tokenStore } from "./api";
import type {
  User,
  LoginRequest,
  AuthResponse,
  RefreshResponse,
  RegisterRequest,
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
  Semester,
  Subject,
>>>>>>> origin/final/demo-v1
  Folder,
  CreateFolderRequest,
  UpdateFolderRequest,
  Document,
  UploadDocumentRequest,
  UpdateDocumentRequest,
  DownloadUrlResponse,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  ShareInfo,
  SharedDocument,
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/AI-Study-fix
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/test/share-document-cloudinary
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/uichange
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/admin-added
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/update/feature/share
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/update/feature/AI/Quiz
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/Flashcards-fix
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/admin-added-fix
=======
  ShareResponse,
  ShareRequest,
>>>>>>> origin/Flashcars
  AskRequest,
  AskResponse,
  ReportDocumentRequest,
  Quiz,
  Flashcard,
  FlashcardProgress,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
} from "./types";
<<<<<<< HEAD
import { tokenStore } from "./api";
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  RagProcessRequest,
  RagChatRequest,
  RagChatResponse,
} from "./types";
>>>>>>> origin/AI-Study-fix
=======
} from "./types";
>>>>>>> origin/test/share-document-cloudinary
=======
} from "./types";
>>>>>>> origin/uichange
=======
} from "./types";
>>>>>>> origin/admin-added
=======
} from "./types";
>>>>>>> origin/update/feature/share
=======
} from "./types";
import type { QuizItem } from "@/features/quiz/types/quiz.types";
>>>>>>> origin/update/feature/AI/Quiz
=======
} from "./types";
import type { QuizItem } from "@/features/quiz/types/quiz.types";
>>>>>>> origin/Flashcards-fix
=======
} from "./types";
import type { QuizItem } from "@/features/quiz/types/quiz.types";
>>>>>>> origin/admin-added-fix
=======
} from "./types";
import type { QuizItem } from "@/features/quiz/types/quiz.types";
>>>>>>> origin/Flashcars
=======
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
} from "./types";
>>>>>>> origin/final/demo-v1

// ================================================================
// AUTH  →  /api/auth
// ================================================================

export const authApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  register: (data: RegisterRequest) =>
    api<void>("/api/auth/register", { method: "POST", body: data }),

  login: async (data: LoginRequest): Promise<any> => {
    localStorage.clear(); // Clear old tokens before new login
    const res = await api<any>("/api/auth/login", {
      method: "POST",
      body: data,
    });
    
    // api() already unwraps ApiResponse<T> → res is the AuthResponse object
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const token = res?.accessToken ?? res?.token;
    if (token) {
      tokenStore.set(token);
=======
    if (res?.accessToken) {
      tokenStore.set(res.accessToken);
>>>>>>> origin/test/share-document-cloudinary
=======
    if (res?.accessToken) {
      tokenStore.set(res.accessToken);
>>>>>>> origin/uichange
=======
    const token = res?.accessToken ?? res?.token;
    if (token) {
      tokenStore.set(token);
>>>>>>> origin/admin-added
=======
    const token = res?.accessToken ?? res?.token;
    if (token) {
      tokenStore.set(token);
>>>>>>> origin/update/feature/share
=======
    const token = res?.accessToken ?? res?.token;
    if (token) {
      tokenStore.set(token);
>>>>>>> origin/update/feature/AI/Quiz
=======
    const token = res?.accessToken ?? res?.token;
    if (token) {
      tokenStore.set(token);
>>>>>>> origin/Flashcards-fix
=======
    const token = res?.accessToken ?? res?.token;
    if (token) {
      tokenStore.set(token);
>>>>>>> origin/admin-added-fix
    }
    
    if (res?.refreshToken) tokenStore.setRefresh(res.refreshToken);
    return res;
  },

  refresh: (): Promise<{ accessToken: string; refreshToken?: string }> =>
    api("/api/auth/refresh", {
      method: "POST",
      body: { refreshToken: tokenStore.getRefresh() },
    }),
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

  logout: async (): Promise<void> => {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    tokenStore.clear();
  },

<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
=======
>>>>>>> origin/final/demo-v1
  requestPasswordReset: (email: string): Promise<void> =>
      api<void>("/api/auth/request-reset", { method: "POST", body: { email } }),
  verifyResetOtp: (email: string, otp: string): Promise<void> =>
      api<void>("/api/auth/verify-otp", { method: "POST", body: { email, otp } }),
  resetPassword: (email: string, newPassword: string): Promise<void> =>
      api<void>("/api/auth/reset-password", {
        method: "POST",
        body: { email, password: newPassword },
      }),
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
};

// ================================================================
// ACCOUNT  →  /api/account
// ================================================================

export const accountApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  me: () => api<User>("/api/account/me"),
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  me: () => api<User>("/api/account/me"),
>>>>>>> origin/AI-Study-fix
=======
  me: () => api<User>("/api/account/me"),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api<void>("/api/account/change-password", { method: "POST", body: data }),
>>>>>>> origin/test/share-document-cloudinary
=======
  me: () => api<User>("/api/account/me"),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api<void>("/api/account/change-password", { method: "POST", body: data }),
>>>>>>> origin/uichange
=======
  me: () => api<User>("/api/account/me"),
>>>>>>> origin/admin-added
=======
  me: () => api<User>("/api/account/me"),
>>>>>>> origin/update/feature/share
=======
  me: () => api<User>("/api/account/me"),
>>>>>>> origin/update/feature/AI/Quiz
=======
  me: () => api<User>("/api/account/me"),
>>>>>>> origin/Flashcards-fix
=======
  me: () => api<User>("/api/account/me"),
>>>>>>> origin/admin-added-fix
=======
  me: (): Promise<User> => api<User>("/api/account/me"),
>>>>>>> origin/Flashcars
=======
  me: (): Promise<User> => api<User>("/api/account/me"),
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
>>>>>>> origin/final/demo-v1
};

// ================================================================
// FOLDER  →  /api/folder
// ================================================================

export const folderApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  list: () => api<Folder[]>("/api/folder/getall"),
  getById: (id: string) => api<Folder>(`/api/folder/getbyid/${id}`),
  create: (body: CreateFolderRequest) =>
    api<Folder>("/api/folder/create", { method: "POST", body }),
  update: (id: string, body: UpdateFolderRequest) =>
    api<Folder>(`/api/folder/update/${id}`, { method: "PUT", body }),
  delete: (id: string) =>
    api<void>(`/api/folder/delete/${id}`, { method: "DELETE" }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
=======
>>>>>>> origin/final/demo-v1
  list: (): Promise<Folder[]> => api<Folder[]>("/api/folder/getall"),
  getById: (id: string): Promise<Folder> =>
      api<Folder>(`/api/folder/getbyid/${id}`),
  create: (body: CreateFolderRequest): Promise<Folder> =>
      api<Folder>("/api/folder/create", { method: "POST", body }),
  update: (id: string, body: UpdateFolderRequest): Promise<Folder> =>
      api<Folder>(`/api/folder/update/${id}`, { method: "PUT", body }),
  delete: (id: string): Promise<void> =>
      api<void>(`/api/folder/delete/${id}`, { method: "DELETE" }),
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
};

// ================================================================
// DOCUMENT  →  /api/documents
// ================================================================

export const documentApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  list: () => api<Document[]>("/api/documents"),
  listByFolder: (folderId: string) =>
    api<Document[]>(`/api/documents/folder/${folderId}`),
  getById: (id: number) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  list: () => api<Document[]>("/api/documents"),
  listByFolder: (folderId: string) =>
    api<Document[]>(`/api/documents/folder/${folderId}`),
  getById: (id: string) => {
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
    console.log('[TRACE-6] documentApi.getById called with id:', id);
    return api<Document>(`/api/documents/${id}`);
  },

  upload: async (input: UploadDocumentRequest): Promise<Document[]> => {
    const fd = new FormData();
    fd.append("files", input.file); // <-- file -> files
=======
  list: (): Promise<Document[]> => api<Document[]>("/api/documents"),
  listByFolder: (folderId: string): Promise<Document[]> =>
      api<Document[]>(`/api/documents/folder/${folderId}`),
  getById: (id: string): Promise<Document> =>
      api<Document>(`/api/documents/${id}`),

  upload: async (input: UploadDocumentRequest): Promise<Document[]> => {
    const fd = new FormData();
    fd.append("files", input.file);
>>>>>>> origin/Flashcars
=======
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
>>>>>>> origin/final/demo-v1
    fd.append("title", input.title);
    if (input.description) {
      fd.append("description", input.description);
    }
    if (input.folderId) {
      fd.append("folderId", input.folderId);
    }
<<<<<<< HEAD
    if (input.subjectId) {
      fd.append("subjectId", String(input.subjectId));
    }
<<<<<<< HEAD
    return api<Document[]>(
      "/api/documents",
      {
        method: "POST",
        formData: fd,
      }
    );
  },

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  update: (id: number, body: UpdateDocumentRequest) =>
    api<Document>(`/api/documents/${id}`, { method: "PUT", body }),

  delete: (id: number) =>
    api<void>(`/api/documents/${id}`, { method: "DELETE" }),

  getDownloadUrl: (id: number) =>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  update: (id: string, body: UpdateDocumentRequest) =>
    api<Document>(`/api/documents/${id}`, { method: "PUT", body }),

  delete: (id: string) =>
    api<void>(`/api/documents/${id}`, { method: "DELETE" }),

  getDownloadUrl: (id: string) =>
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
    api<DownloadUrlResponse>(`/api/documents/${id}/download`),

  // Trash (soft-deleted docs)
  listTrash: () => api<Document[]>("/api/documents/trash"),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  restoreFromTrash: (id: number) =>
    api<void>(`/api/documents/${id}/restore`, { method: "POST" }),
  emptyTrash: (id: number) =>
    api<void>(`/api/documents/${id}/permanent`, { method: "DELETE" }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  restoreFromTrash: (id: string) =>
    api<void>(`/api/documents/${id}/restore`, { method: "POST" }),
  emptyTrash: (id: string) =>
    api<void>(`/api/documents/${id}/permanent`, { method: "DELETE" }),
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
};

// ================================================================
// RAG  →  /api/rag
// ================================================================

export const ragApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * POST /api/rag/upload
   * Upload file RAG — bước 2 sau khi tạo document
   */
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  upload: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    return api<void>("/rag/upload", { method: "POST", formData: fd });
  },

  /**
   * POST /api/rag/upload/chunk
   * Upload + chunk file với documentId
   */
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/test/share-document-cloudinary
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/uichange
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/admin-added
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/update/feature/share
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/update/feature/AI/Quiz
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/Flashcards-fix
=======
    return api<void>("/api/rag/upload", { method: "POST", formData: fd });
  },

>>>>>>> origin/admin-added-fix
  uploadAndChunk: (file: File, documentId: number) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", String(documentId));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
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
>>>>>>> origin/Flashcars
    return api<void>("/api/rag/upload/chunk", { method: "POST", formData: fd });
  },

  ask: (input: AskRequest): Promise<AskResponse> =>
<<<<<<< HEAD
    api<AskResponse>("/api/rag/ask", {
      method: "POST",
      body: { id: input.id, question: input.question },
    }),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  upload: (file: File, documentId: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", documentId);
    return api<void>("/api/v1/rag/upload", { method: "POST", formData: fd });
  },

  uploadAndChunk: (file: File, documentId: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("documentId", documentId);
    return api<void>("/api/v1/rag/upload/chunk", { method: "POST", formData: fd });
  },

  ask: (input: AskRequest): Promise<AskResponse> =>
    api<AskResponse>("/api/v1/rag/chat", {
      method: "POST",
      body: { folderId: input.id, documentId: input.id, question: input.question },
    }),

  processDocumentPipeline: (req: RagProcessRequest) =>
    api<string>(`/api/v1/rag/process/${req.documentId}`, { method: "POST" }),

  chatWithFolder: (req: RagChatRequest) =>
    api<RagChatResponse>("/api/v1/rag/chat", { method: "POST", body: req }),
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
};

// ================================================================
// SHARE  →  /api/documents
// ================================================================

export const shareApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  // List shares where current user is the owner
  listOwned: () => api<ShareResponse[]>("/api/shares/owner"),

  // List shares where current user is shared with
  listSharedWithMe: () => api<ShareResponse[]>("/api/shares/shared-with-me"),

    // Create a new share (share folder with username)
    shareFolder: (request: ShareRequest) =>
      api<ShareResponse>("/api/shares", { method: "POST", body: request }),

  // Remove a share by its ID
  removeShare: (shareId: number) =>
    api<void>(`/api/shares/${shareId}`, { method: "DELETE" }),

  // Report a document
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
  listOwned: () => api<ShareResponse[]>("/api/shares/owner"),
  listSharedWithMe: () => api<ShareResponse[]>("/api/shares/shared-with-me"),
  getShareInfo: (id: string, type: "document" | "folder") => {
    const basePath = type === "document" ? "documents" : "folder";
    return api<ShareResponse>(`/api/${basePath}/${id}/share-info`);
  },
  share: (id: string, type: "document" | "folder", value: string) => {
    const basePath = type === "document" ? "documents" : "folder";
    const v = (value ?? "").trim();
    const isEmail = v.includes("@");
    const body: Record<string, string> = {
      [type === "document" ? "documentId" : "folderId"]: id,
      ...(v ? { [isEmail ? "email" : "username"]: v } : {}),
    };
    return api<ShareResponse>(`/api/${basePath}/${id}/share`, {
      method: "POST",
      body,
    });
  },
  revoke: (shareId: string) =>
    api<void>(`/api/shares/${shareId}`, { method: "DELETE" }),
  removeFromShared: (shareId: number | string) =>
    api<void>(`/api/shares/${shareId}`, { method: "DELETE" }),
  saveToMyFolder: (
    shareId: number | string,
    folderId: string,
    title: string,
    description?: string,
  ) =>
    api<void>(`/api/shares/${shareId}/save`, {
      method: "POST",
      body: { folderId, title, description },
    }),
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  report: (body: ReportDocumentRequest) =>
    api<void>(`/api/documents/${body.id}/report`, {
      method: "POST",
      body: { reason: body.reason, description: body.description },
    }),
=======
      api<AskResponse>("/api/rag/ask", {
        method: "POST",
        body: { id: input.id, question: input.question },
=======
  ask: (input: AskRequest): Promise<AskResponse> =>
      api<AskResponse>("/api/rag/ask", {
        method: "POST",
        body: { documentId: input.documentId, question: input.question },
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
=======
  shareDocument: (request: ShareRequest): Promise<ShareResponse> =>
      api<ShareResponse>("/api/shares", { method: "POST", body: request }),
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
};

// ================================================================
// QUIZ  →  /api/quiz
// ================================================================

export const quizApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  listByDocument: (documentId: number) =>
    api<Quiz[]>(`/api/quiz?documentId=${documentId}`),

  generate: (documentId: number, questionCount = 10) =>
    api<Quiz>("/api/quiz/generate", {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  listByDocument: (documentId: string) =>
    api<Quiz[]>(`/api/quiz?documentId=${documentId}`),

  generate: (documentId: string, questionCount = 10) =>
    api<Quiz>("/api/quiz/generate", {
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
      method: "POST",
      body: { documentId, questionCount },
    }),
};

// ================================================================
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// FLASHCARD  →  (chuẩn bị sẵn — chưa có trong API doc)
// ================================================================

export const flashcardApi = {
  /** GET /api/flashcard?documentId=:id */
  listByDocument: (documentId: number) =>
    api<Flashcard[]>(`/flashcard?documentId=${documentId}`),

  /** POST /api/flashcard/generate */
  generate: (documentId: number) =>
    api<Flashcard[]>("/flashcard/generate", {
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
      method: "POST",
      body: { documentId, questionCount },
    }),

  // Sinh quiz theo tùy chọn (scope: "all" | documentId, nhiều loại câu hỏi).
  // TODO(backend): hiện thực POST /api/quiz/generate nhận { scope, types, questionCount }
  // và trả về QuizItem[] ({ id, type, question, options[], correctAnswers[] }).
  generateAdvanced: (body: { scope: "all" | number; types: string[]; questionCount: number }) =>
    api<QuizItem[]>("/api/quiz/generate", { method: "POST", body }),
};

// ================================================================
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
  listByDocument: (documentId: string): Promise<Quiz[]> =>
      api<Quiz[]>(`/api/quiz?documentId=${documentId}`),
  generate: (documentId: string, questionCount = 10): Promise<Quiz> =>
      api<Quiz>("/api/quiz/generate", {
        method: "POST",
        body: { documentId, questionCount },
      }),
  generateAdvanced: (body: {
    scope: "all" | string;
    types: string[];
    questionCount: number;
  }): Promise<QuizItem[]> => api<QuizItem[]>("/api/quiz/generate", { method: "POST", body }),
};

// ================================================================
>>>>>>> origin/Flashcars
// FLASHCARD  →  /api/flashcard
// ================================================================

export const flashcardApi = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  listByDocument: (documentId: number) =>
    api<Flashcard[]>(`/api/flashcard?documentId=${documentId}`),

  generate: (documentId: number) =>
    api<Flashcard[]>("/api/flashcard/generate", {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  listByDocument: (documentId: string) =>
    api<Flashcard[]>(`/api/flashcard?documentId=${documentId}`),

  generate: (documentId: string) =>
    api<Flashcard[]>("/api/flashcard/generate", {
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
      method: "POST",
      body: { documentId },
    }),

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  /** PUT /api/flashcard/:id/progress */
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/flashcard/${flashcardId}/progress`, {
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  updateProgress: (flashcardId: string, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/AI-Study-fix
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/test/share-document-cloudinary
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/uichange
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/admin-added
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/update/feature/share
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/update/feature/AI/Quiz
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/Flashcards-fix
=======
  updateProgress: (flashcardId: number, status: FlashcardProgress["status"]) =>
    api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
>>>>>>> origin/admin-added-fix
      method: "PUT",
      body: { status },
    }),
};
=======
  listByDocument: (documentId: string): Promise<Flashcard[]> =>
      api<Flashcard[]>(`/api/flashcard?documentId=${documentId}`),
  generate: (documentId: string): Promise<Flashcard[]> =>
      api<Flashcard[]>("/api/flashcard/generate", {
        method: "POST",
        body: { documentId },
      }),
  updateProgress: (flashcardId: string, status: FlashcardProgress["status"]): Promise<FlashcardProgress> =>
      api<FlashcardProgress>(`/api/flashcard/${flashcardId}/progress`, {
        method: "PUT",
        body: { status },
      }),
};
>>>>>>> origin/Flashcars
=======
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
>>>>>>> origin/final/demo-v1
