// src/features/shares/services/shareApi.ts
// Tầng gọi API cho trang Chia sẻ (CHỈ chia sẻ folder).
// Khi NHẬN một folder chia sẻ, backend TỰ lưu vào "Tài liệu của tôi" của người
// nhận — không có thao tác "Lưu" thủ công ở FE.

import { api } from "@/lib/api";
<<<<<<< HEAD
<<<<<<< HEAD
import type { SharedWithMeItem, SharedByMeItem } from "../types/share.types";
=======
import type { SharedWithMeItem, SharedByMeItem, ShareResponse } from "../types/share.types";
>>>>>>> origin/Flashcars
=======
import type { SharedWithMeItem, SharedByMeItem, ShareResponse } from "../types/share.types";
>>>>>>> origin/final/demo-v1

export const sharesApi = {
  // GET — danh sách (backend trả đủ field figma: name, size, items,
  // sharedBy{name,avatarUrl}, sharedWith[], time, order)
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
=======
>>>>>>> origin/admin-added-fix

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
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
};
=======
=======
>>>>>>> origin/final/demo-v1
  getSharedWithMe: async (): Promise<SharedWithMeItem[]> => {
    const response = await api<ShareResponse[]>("/api/shares/shared-with-me");
    return response.map(mapShareResponseToSharedWithMe);
  },
  getSharedByMe: async (): Promise<SharedByMeItem[]> => {
    const response = await api<ShareResponse[]>("/api/shares/owner");
    return response.map(mapShareResponseToSharedByMe);
  },

  // DELETE — Xóa: xóa THẲNG share -> hiện trong Thùng rác.
  deleteShared: (shareToken: string) =>
<<<<<<< HEAD
    api<void>(`/api/shares/${shareToken}`, { method: "DELETE" }),

  // GET — Lấy link chia sẻ (Sao chép link)
  getShareLink: (shareToken: string) =>
    api<{ url: string }>(`/api/shares/${shareToken}/link`),

  // GET — Lấy URL tải xuống (Tải xuống)
  getDownloadUrl: (shareToken: string) =>
    api<{ url: string }>(`/api/shares/${shareToken}/download`),
=======
      api<void>(`/api/shares/token/${shareToken}`, { method: "DELETE" }),

  // GET — Lấy link chia sẻ (Sao chép link)
  getShareLink: (shareToken: string) =>
      api<{ url: string }>(`/api/shares/${shareToken}/link`),

  // GET — Lấy URL tải xuống (Tải xuống)
  getDownloadUrl: (shareToken: string) =>
      api<{ url: string }>(`/api/shares/${shareToken}/download`),
>>>>>>> origin/final/demo-v1
};

function mapShareResponseToSharedWithMe(resp: ShareResponse): SharedWithMeItem {
  return {
    id: resp.shareToken,
    name: resp.folderName || resp.documentTitle || "Unknown",
    size: "11.4mb",
    items: resp.fileCount || 0,
    sharedBy: {
      name: resp.ownerUsername || resp.ownerEmail || "Unknown",
      avatarUrl: null,
    },
    time: "21 giờ trước",
    order: new Date(resp.createdAt).getTime(),
    fileCount: resp.fileCount || 0,
    savedFolderId: resp.folderId ?? undefined,
  };
}

function mapShareResponseToSharedByMe(resp: ShareResponse): SharedByMeItem {
  const sharedWith: any[] = [];
  if (resp.sharedUsername) {
    sharedWith.push({ name: resp.sharedUsername, avatarUrl: null });
  } else if (resp.sharedEmail) {
    sharedWith.push({ name: resp.sharedEmail, avatarUrl: null });
  }

  return {
    id: resp.shareToken,
    name: resp.folderName || resp.documentTitle || "Unknown",
    size: "11.4mb",
    items: resp.fileCount || 0,
    sharedWith: sharedWith,
    time: "21 giờ trước",
    order: new Date(resp.createdAt).getTime(),
    fileCount: resp.fileCount || 0,
    savedFolderId: resp.folderId ?? undefined,
  };
}
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
