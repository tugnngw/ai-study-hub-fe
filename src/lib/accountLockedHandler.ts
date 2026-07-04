import { ApiError } from "./api";

export function handleAccountLockedError(error: unknown): boolean {
  if (error instanceof ApiError && error.status === 403) {
    const data = error.data as any;
    if (data?.accountLocked === true || data?.error === "ACCOUNT_LOCKED") {
      if (typeof window !== "undefined") {
        alert("Tài khoản của bạn đã bị khóa bởi quản trị viên. Bạn sẽ được đăng xuất.");
        window.location.href = "/login";
      }
      return true;
    }
  }
  return false;
}
