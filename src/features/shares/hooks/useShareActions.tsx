// src/features/shares/hooks/useShareActions.tsx
// Gói các HÀNH ĐỘNG của trang Chia sẻ: Mở / Tải xuống / Xóa / Sao chép link.
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { sharesApi } from "../services";

export function useShareActions(opts?: {
  onRemovedWithMe?: (id: string) => void;
  onRemovedByMe?: (id: string) => void;
  onOpenInAI?: (folderId: string) => void;
}) {
  const navigate = useNavigate();

  // Mở folder trong AI chat. /ai yêu cầu search { folderId, docId? }.
  const openInAI = (id: string, folderId?: string) => {
    navigate({ to: "/ai", search: { folderId: folderId ?? `shared-${id}` } });
  };

  const download = async (id: string, name: string) => {
    try {
      const { url } = await sharesApi.getDownloadUrl(id);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success(`Đang tải xuống "${name}"`);
    } catch {
      toast.error("Không tải xuống được");
    }
  };

  // Xóa = xóa thẳng folder (soft-delete) -> hiện trong Thùng rác.
  const removeWithMe = async (id: string, name: string) => {
    try {
      await sharesApi.deleteShared(id);
      opts?.onRemovedWithMe?.(id);
      toast.success(`Đã chuyển "${name}" vào Thùng rác`);
    } catch {
      toast.error("Không xóa được");
    }
  };
  const removeByMe = async (id: string, name: string) => {
    try {
      await sharesApi.deleteShared(id);
      opts?.onRemovedByMe?.(id);
      toast.success(`Đã chuyển "${name}" vào Thùng rác`);
    } catch {
      toast.error("Không xóa được");
    }
  };

  const copyLink = async (id: string, name: string) => {
    try {
      const { url } = await sharesApi.getShareLink(id);
      await navigator.clipboard?.writeText(url);
      toast.success(`Đã sao chép link "${name}"`);
    } catch {
      toast.error("Không sao chép được link");
    }
  };

  return { openInAI, download, removeWithMe, removeByMe, copyLink };
}
