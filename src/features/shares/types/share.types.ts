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

// ── Trang Chia sẻ (figma) — CHỈ chia sẻ folder ─────────
// Người liên quan (người chia sẻ / người được chia sẻ)
export interface SharePerson {
  name: string; // tên hiển thị
  avatarUrl?: string | null; // ảnh đại diện (backend trả; rỗng → hiện chữ cái đầu)
}

export interface SharedWithMeItem {
  id: number; // id THẬT của folder
  name: string; // tên thư mục
  size: string; // "11.4mb"
  items: number; // số mục trong thư mục
  sharedBy: SharePerson; // người đã chia sẻ (tên + avatar)
  time: string; // "21 giờ trước"
  order: number; // mốc thời gian (số) để sắp xếp
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
