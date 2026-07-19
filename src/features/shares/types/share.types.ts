// src/features/shares/types/share.types.ts
// Share and permission types

export interface ShareResponse {
  id: number;
  folderId: string;
  sharedUsername?: string;
  sharedEmail?: string;
  visibility: "public" | "private";
  createdAt: string;
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
