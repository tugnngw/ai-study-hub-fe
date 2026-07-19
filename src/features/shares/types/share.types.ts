// src/features/shares/types/share.types.ts
// Share and permission types

export interface ShareResponse {
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;
  folderId: string;
  sharedUsername?: string;
  sharedEmail?: string;
  visibility: "public" | "private";
  createdAt: string;
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

// ── Trang Chia sẻ (figma) — CHỈ chia sẻ folder ─────────
// Người liên quan (người chia sẻ / người được chia sẻ)
export interface SharePerson {
<<<<<<< HEAD
<<<<<<< HEAD
  name: string;            // tên hiển thị
=======
  name: string; // tên hiển thị
>>>>>>> origin/Flashcars
=======
  name: string; // tên hiển thị
>>>>>>> origin/final/demo-v1
  avatarUrl?: string | null; // ảnh đại diện (backend trả; rỗng → hiện chữ cái đầu)
}

export interface SharedWithMeItem {
<<<<<<< HEAD
<<<<<<< HEAD
  id: number;              // id THẬT của folder
  name: string;            // tên thư mục
  size: string;            // "11.4mb"
  items: number;           // số mục trong thư mục
  sharedBy: SharePerson;   // người đã chia sẻ (tên + avatar)
  time: string;            // "21 giờ trước"
  order: number;           // mốc thời gian (số) để sắp xếp
}

export interface SharedByMeItem {
  id: number;
  name: string;
  size: string;
  items: number;
  sharedWith: SharePerson[]; // danh sách người được chia sẻ (tên + avatar)
  time: string;
  order: number;
}

export type ShareSort = "newest" | "oldest";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
  id: string; // id THẬT của folder
  name: string; // tên thư mục
  size: string; // "11.4mb"
  items: number; // số mục trong thư mục
  sharedBy: SharePerson; // người đã chia sẻ (tên + avatar)
  time: string; // "21 giờ trước"
  order: number; // mốc thời gian (số) để sắp xếp
  fileCount: number;
  savedFolderId?: string; // folderId đã lưu (nếu có)
}

export interface SharedByMeItem {
  id: string;
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
