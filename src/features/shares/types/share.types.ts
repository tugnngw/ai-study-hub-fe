// src/features/shares/types/share.types.ts
// Share and permission types

export interface ShareResponse {
  id: string;
  folderId: string | null;
  documentId: string | null;
  ownerId: string;
  ownerUsername: string;
  ownerEmail: string;
  sharedAccountId: string | null;
  sharedUsername: string | null;
  sharedEmail: string | null;
  visibility: string;
  shareToken: string;
  shareLink: string;
  createdAt: string;
  recipients: ShareRecipient[];
  documentTitle: string | null;
  folderName: string | null;
  fileCount: number | null;
}

export interface ShareRequest {
  folderId: string;
  username?: string;
  email?: string;
  visibility: "public" | "private";
}

export interface ShareRecipient {
  username?: string;
  email?: string;
}

export interface SaveToFolderResponse {
  message: string;
  copied: number;
  skipped: number;
  failed: number;
  copiedDocuments?: string[];
  skippedDocuments?: string[];
  failedDocuments?: string[];
}

export interface SharePerson {
  name: string;
  avatarUrl?: string | null;
}

export interface SharedWithMeItem {
  id: string;          // shareToken (URL-friendly)
  shareId: string;     // DB id (for API calls)
  actualFolderId: string; // actual folder UUID from backend (for document listing)
  documentId?: string; // document UUID when share is a single document
  name: string;
  size: string;
  items: number;
  sharedBy: SharePerson;
  time: string;
  order: number;
  fileCount: number;
  savedFolderId?: string;
  isDocument?: boolean;
}

export interface SharedByMeItem {
  id: string;
  shareId: string;
  actualFolderId: string;
  documentId?: string; // document UUID when share is a single document
  name: string;
  size: string;
  items: number;
  sharedWith: SharePerson[];
  time: string;
  order: number;
  fileCount: number;
  savedFolderId?: string;
}

export type ShareSort = "newest" | "oldest";
