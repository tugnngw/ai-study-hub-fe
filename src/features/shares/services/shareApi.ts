// src/features/shares/services/shareApi.ts
// Tầng gọi API cho trang Chia sẻ (CHỈ chia sẻ folder).
// Khi NHẬN một folder chia sẻ, backend TỰ lưu vào "Tài liệu của tôi" của người
// nhận — không có thao tác "Lưu" thủ công ở FE.

import { api } from "@/lib/api";
import type { SharedWithMeItem, SharedByMeItem, ShareResponse } from "../types/share.types";

export const sharesApi = {
  // GET — danh sách (backend trả đủ field figma: name, size, items,
  // sharedBy{name,avatarUrl}, sharedWith[], time, order)
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
      api<void>(`/api/shares/token/${shareToken}`, { method: "DELETE" }),

  // GET — Lấy link chia sẻ (Sao chép link)
  getShareLink: (shareToken: string) =>
      api<{ url: string }>(`/api/shares/${shareToken}/link`),

  // GET — Lấy URL tải xuống (Tải xuống)
  getDownloadUrl: (shareToken: string) =>
      api<{ url: string }>(`/api/shares/${shareToken}/download`),
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
