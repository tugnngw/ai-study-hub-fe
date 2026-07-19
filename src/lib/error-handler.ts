// src/lib/error-handler.ts
import { toast } from "sonner";

export function handleApiError(err: unknown, fallbackMsg = "Đã có lỗi xảy ra") {
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "object" && err !== null && "message" in err
        ? String((err as { message: unknown }).message)
        : fallbackMsg;

  // Không spam toast với các lỗi network thông thường
<<<<<<< HEAD
  if (message?.toLowerCase().includes("fetch") || message === "Failed to fetch") {
=======
  if (
    message?.toLowerCase().includes("fetch") ||
    message === "Failed to fetch"
  ) {
>>>>>>> origin/Flashcars
    toast.error("Không thể kết nối đến server. Vui lòng kiểm tra mạng.");
  } else {
    toast.error(message);
  }
}
