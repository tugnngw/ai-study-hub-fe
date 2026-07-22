// src/features/shares/hooks/useSharedWorkspace.ts
// React Query hooks for Shared Workspace browsing.
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentApi } from "@/lib/realApi";
import { sharesApi } from "../services";

const sharedWorkspaceKeys = {
  all: ["shared-workspace"] as const,
  folder: (shareToken: string) => [...sharedWorkspaceKeys.all, "folder", shareToken] as const,
  documents: (folderId: string) => [...sharedWorkspaceKeys.all, "documents", folderId] as const,
  document: (docId: string) => [...sharedWorkspaceKeys.all, "document", docId] as const,
};

export interface SharedFolderInfo {
  /** Actual folder ID for document listing (from backend) */
  folderId: string;
  /** Display name */
  folderName: string;
  /** The DB share ID for save API calls. Falls back to shareToken if unavailable. */
  shareDbId: string;
  /** Whether this share is a document (true) or folder (false) */
  isDocument: boolean;
  /** Document UUID when share is a single document */
  documentId?: string;
}

export function useSharedFolder(shareToken: string) {
  return useQuery({
    queryKey: sharedWorkspaceKeys.folder(shareToken),
    queryFn: async (): Promise<SharedFolderInfo> => {
      const allShares = await sharesApi.getSharedWithMe();
      const share = allShares.find((s) => s.id === shareToken);
      if (share) {
        return {
          folderId: share.isDocument ? "" : share.actualFolderId,
          folderName: share.name,
          shareDbId: share.shareId,
          isDocument: share.isDocument ?? false,
          documentId: share.documentId,
        };
      }
      const owned = await sharesApi.getSharedByMe();
      const ownedShare = owned.find((s) => s.id === shareToken);
      if (ownedShare) {
        return {
          folderId: ownedShare.documentId ? "" : ownedShare.actualFolderId,
          folderName: ownedShare.name,
          shareDbId: ownedShare.shareId,
          isDocument: !!ownedShare.documentId,
          documentId: ownedShare.documentId,
        };
      }
      throw new Error("Không tìm thấy thông tin chia sẻ");
    },
    enabled: !!shareToken,
  });
}

export function useSharedDocuments(folderId: string) {
  return useQuery({
    queryKey: sharedWorkspaceKeys.documents(folderId),
    queryFn: () => documentApi.listSharedFolder(folderId),
    enabled: !!folderId,
  });
}

export function useSharedDocument(docId: string) {
  return useQuery({
    queryKey: sharedWorkspaceKeys.document(docId),
    queryFn: () => documentApi.getSharedById(docId),
    enabled: !!docId,
  });
}

export function useSaveToMyFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ shareId, folderId, title, description }: { shareId: string; folderId: string; title?: string; description?: string }) =>
      sharesApi.saveShared(shareId, { folderId, title, description }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      qc.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}
