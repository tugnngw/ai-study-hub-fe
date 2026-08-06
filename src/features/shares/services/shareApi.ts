// src/features/shares/services/shareApi.ts
// Tầng gọi API cho trang Chia sẻ (CHỈ chia sẻ folder).
// Khi NHẬN một folder chia sẻ, backend TỰ lưu vào "Tài liệu của tôi" của người
// nhận — không có thao tác "Lưu" thủ công ở FE.

import { api } from "@/lib/api";
import { formatRelativeTime } from "@/lib/formatTime";
import type { SharedWithMeItem, SharedByMeItem, ShareResponse, SaveToFolderResponse } from "../types/share.types";

export const sharesApi = {
  // GET — danh sách
  getSharedWithMe: async (): Promise<SharedWithMeItem[]> => {
    const response = await api<ShareResponse[]>("/api/shares/shared-with-me");
    return response.map(mapShareResponseToSharedWithMe);
  },
  getSharedByMe: async (): Promise<SharedByMeItem[]> => {
    const response = await api<ShareResponse[]>("/api/shares/owner");
    return response.map(mapShareResponseToSharedByMe);
  },

  // DELETE — Xóa share
  deleteShared: (shareToken: string) =>
      api<void>(`/api/shares/token/${shareToken}`, { method: "DELETE" }),

  // POST — Lưu shared item vào thư mục của tôi
  saveShared: (shareId: string, body: { folderId: string; title?: string; description?: string }) =>
    api<SaveToFolderResponse>(`/api/shares/${shareId}/save`, {
      method: "POST",
      body,
    }),

  // GET — Lấy link chia sẻ
  getShareLink: (shareToken: string) =>
      api<{ url: string }>(`/api/shares/${shareToken}/link`),

  // GET — URL tải xuống
  getDownloadUrl: (shareToken: string) =>
      api<{ url: string }>(`/api/shares/${shareToken}/download`),
};

function mapShareResponseToSharedWithMe(resp: ShareResponse): SharedWithMeItem {
   const sizeBytes = resp.documentId ? resp.documentFileSize : resp.folderSizeBytes;
   return {
     id: resp.shareToken,
     shareId: resp.id,
     actualFolderId: resp.folderId ?? "",
     name: resp.documentTitle || resp.folderName || "Unknown",
     folderName: resp.folderName ?? undefined,
     size: sizeBytes != null ? formatFileSize(sizeBytes) : "—",
     items: 0,
     sharedBy: {
       name: resp.ownerUsername || resp.ownerEmail || "Unknown",
       avatarUrl: null,
     },
     time: formatRelativeTime(resp.createdAt),
     order: new Date(resp.createdAt).getTime(),
     fileCount: 0,
     savedFolderId: resp.folderId ?? undefined,
     isDocument: !!resp.documentId,
     documentId: resp.documentId ?? undefined,
     documentStatus: resp.documentStatus ?? null,
   };
 }

function mapShareResponseToSharedByMe(resp: ShareResponse): SharedByMeItem {
   const sharedWith: any[] = [];
   if (resp.sharedUsername) {
     sharedWith.push({ name: resp.sharedUsername, avatarUrl: null });
   } else if (resp.sharedEmail) {
     sharedWith.push({ name: resp.sharedEmail, avatarUrl: null });
   }

   const sizeBytes = resp.documentId ? resp.documentFileSize : resp.folderSizeBytes;
   return {
     id: resp.shareToken,
     shareId: resp.id,
     actualFolderId: resp.folderId ?? "",
     name: resp.documentTitle || resp.folderName || "Unknown",
     folderName: resp.folderName ?? undefined,
     size: sizeBytes != null ? formatFileSize(sizeBytes) : "—",
     items: 0,
     sharedWith: sharedWith,
     time: formatRelativeTime(resp.createdAt),
     order: new Date(resp.createdAt).getTime(),
     fileCount: 0,
     savedFolderId: resp.folderId ?? undefined,
     documentId: resp.documentId ?? undefined,
     documentStatus: resp.documentStatus ?? null,
     subjectName: resp.subjectName ?? undefined,
     semesterName: resp.semesterName ?? undefined,
   };
 }

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
