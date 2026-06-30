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
  email: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  aiSummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFolderRequest {
  name: string;
  description?: string;
}

export interface UpdateFolderRequest {
  name?: string;
  description?: string;
}

export interface Document {
  id: string;
  ownerId: string;
  subjectId?: number | null;
  folderId?: string | null;
  title: string;
  description?: string | null;
  summary?: string | null;
  status: "processing" | "ready" | "failed" | "deleted";
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
  file: File;
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

export interface ShareRequest {
  folderId: string;
  username?: string;
  email?: string;
  visibility: "private" | "public";
}

export interface ShareResponse {
  id: string;
  folderId: string;
  sharedEmail?: string;
  sharedUsername?: string;
  visibility: "private" | "public";
  createdAt: string;
}

export interface AskRequest {
  documentId: string;
  question: string;
}

export interface AskResponse {
  answer: string;
  sources?: unknown[];
}

export interface ReportDocumentRequest {
  id: string;
  reason: string;
  description?: string;
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