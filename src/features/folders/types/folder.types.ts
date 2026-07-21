// src/features/folders/types/folder.types.ts
// Folder-related types and interfaces

export interface Folder {
  id: string;
  ownerId: string;
  name: string;
  aiSummary?: string | null;
  subjectId?: string | null;
  semesterId?: string | null;
  description?: string | null;
  documentCount?: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateFolderRequest {
  name: string;
  subjectId?: string;
  description?: string;
}

export interface UpdateFolderRequest {
  name: string;
  subjectId?: string;
  description?: string;
}
