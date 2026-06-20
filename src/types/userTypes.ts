export interface AppUser {
  id: number;
  email: string;
  fullName: string;
}

export interface FolderItem {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  documentCount?: number;
}

export interface DocumentItem {
  id: number;
  title: string;
  description?: string | null;
  folderId: number;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SharedDocumentItem extends DocumentItem {
  sharedBy: string;
}

export interface AskResponse {
  answer: string;
}
