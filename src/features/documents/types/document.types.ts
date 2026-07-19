// src/features/documents/types/document.types.ts
// Document-related types and interfaces

export type DocumentStatus = "processing" | "ready" | "failed" | "deleted";

export interface Document {
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> origin/Flashcars
=======
  id: string;
>>>>>>> origin/final/demo-v1
  ownerId: string;
  subjectId?: number | null;
  folderId?: string | null;
  title: string;
  description?: string | null;
  summary?: string | null;
  status: DocumentStatus;
  cloudinaryUrl?: string | null;
  publicId?: string | null;
  mimeType?: string | null;
  checksum?: string | null;
  fileSize?: number | null;
  totalPages?: number | null;
  createdAt: string;
  deletedAt?: string | null;
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

export interface SharedDocument {
  id: number;
  title: string;
  description?: string;
  sharedBy: string;
  sharedAt: string;
}
