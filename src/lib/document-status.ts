// Centralized document status logic — single source of truth.

export type DocStatus = "COMPLETED" | "READY" | "REJECT" | "REPORTED" | "BANNED";

/** AI actions only available when document is approved (READY) or under review (REPORTED). */
export function isAIAvailable(status?: string | null): boolean {
  const s = status?.toUpperCase();
  return s === "READY" || s === "REPORTED";
}

/** Owner can view any status except BANNED (metadata only). */
export function isOwnerViewable(status?: string | null): boolean {
  const s = status?.toUpperCase();
  return s !== "BANNED";
}

/** Owner can view document content (file viewer) only for READY or REPORTED. */
export function isContentAccessible(status?: string | null): boolean {
  const s = status?.toUpperCase();
  return s === "READY" || s === "REPORTED";
}

/** Shared users should only see READY docs. */
export function isSharedViewable(status?: string | null): boolean {
  return status?.toUpperCase() === "READY";
}

/** Document is blocked from full interaction (but may still be viewable). */
export function isBlocked(status?: string | null): boolean {
  const s = status?.toUpperCase();
  return s === "REJECT" || s === "BANNED";
}

/** Vietnamese label for each status. */
export function statusLabel(status?: string | null): string {
  switch (status?.toUpperCase()) {
    case "READY":
    case "REPORTED": return "Sẵn sàng";
    case "COMPLETED": return "Chờ duyệt";
    case "REJECT": return "Bị từ chối";
    case "BANNED": return "Bị cấm";
    default: return status ?? "Không xác định";
  }
}

/** Tailwind classes for the status badge. */
export function statusBadgeClasses(status?: string | null): string {
  switch (status?.toUpperCase()) {
    case "READY":
      return "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20";
    case "COMPLETED":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20";
    case "REJECT":
      return "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20";
    case "BANNED":
      return "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20";
    case "REPORTED":
      return "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20";
    default:
      return "";
  }
}

/** User-facing explanation for why content (file viewer) is unavailable. */
export function contentBlockedReason(status?: string | null): string | null {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
      return "Tài liệu đang chờ quản trị viên phê duyệt. Bạn có thể xem thông tin tài liệu nhưng không thể truy cập nội dung cho đến khi được duyệt.";
    case "REJECT":
      return "Tài liệu đã bị từ chối duyệt nên không thể hiển thị nội dung.";
    default:
      return null;
  }
}

/** User-facing explanation for why AI is unavailable. */
export function aiUnavailableReason(status?: string | null): string | null {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
      return "Tài liệu đang chờ quản trị viên phê duyệt. Tính năng AI sẽ khả dụng sau khi tài liệu được duyệt.";
    case "REJECT":
      return "Tài liệu đã bị từ chối duyệt. Vui lòng chỉnh sửa và tải lên lại, hoặc liên hệ quản trị viên.";
    case "BANNED":
      return "Tài liệu đã bị cấm do vi phạm quy định.";
    default:
      return null;
  }
}
