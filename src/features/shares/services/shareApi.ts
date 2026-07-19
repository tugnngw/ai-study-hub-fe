// src/features/shares/services/shareApi.ts
// Tầng gọi API cho trang Chia sẻ (CHỈ chia sẻ folder).
// Khi NHẬN một folder chia sẻ, backend TỰ lưu vào "Tài liệu của tôi" của người
// nhận — không có thao tác "Lưu" thủ công ở FE.

import { api } from "@/lib/api";
import type { SharedWithMeItem, SharedByMeItem } from "../types/share.types";

export const sharesApi = {
  // GET — danh sách (backend trả đủ field figma: name, size, items,
  // sharedBy{name,avatarUrl}, sharedWith[], time, order)
  getSharedWithMe: () => api<SharedWithMeItem[]>("/api/shares/with-me"),
  getSharedByMe: () => api<SharedByMeItem[]>("/api/shares/by-me"),

  // DELETE — Xóa: xóa THẲNG folder (soft-delete) -> hiện trong Thùng rác.
  deleteShared: (folderId: number) =>
    api<void>(`/api/folder/delete/${folderId}`, { method: "DELETE" }),

  // GET — Lấy link chia sẻ (Sao chép link)
  getShareLink: (shareId: number) =>
    api<{ url: string }>(`/api/shares/${shareId}/link`),

  // GET — Lấy URL tải xuống (Tải xuống)
  getDownloadUrl: (shareId: number) =>
    api<{ url: string }>(`/api/shares/${shareId}/download`),
<<<<<<< HEAD
=======

  // POST — Lưu một bản sao của folder được chia sẻ vào thư mục của tôi
  // (thư mục có sẵn hoặc thư mục mới), với tiêu đề/mô tả tuỳ chỉnh.
  saveShared: (body: {
    shareId: number;
    kind: "folder" | "file";
    folderId?: string;
    newFolderName?: string;
    title: string;
    description?: string;
  }) =>
    api<void>(`/api/shares/${body.shareId}/save`, {
      method: "POST",
      body: {
        folderId: body.folderId,
        newFolderName: body.newFolderName,
        title: body.title,
        description: body.description,
      },
    }),
>>>>>>> origin/Flashcards-fix
};
