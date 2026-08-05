// src/lib/api.ts
export const API_BASE =
    (import.meta.env.VITE_API_BASE as string | undefined) ??
    "http://localhost:4040";

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

// -----------------------------------------------------------------------------
// Kiến trúc token storage (quyết định chủ đích, KHÔNG phải công nợ kỹ thuật):
//
//   - Access token + refresh token được lưu trong localStorage vì kiến trúc
//     hiện tại là stateless JWT: backend không quản lý session, mọi request
//     mang token qua `Authorization: Bearer <token>`.
//   - Hệ quả: token đọc được từ JS (bề mặt XSS lộ token). Đây là ràng buộc
//     cố hữu của kiến trúc, không phải lỗi vô ý.
//   - Hướng nâng cấp tương lai: chuyển refresh token sang HttpOnly cookie
//     (giảm bề mặt XSS) — cần backend mở rộng (cookie-based auth + CSRF),
//     là thay đổi kiến trúc nên chưa thực hiện trong giai đoạn này.
// -----------------------------------------------------------------------------
const storage = typeof window !== "undefined" ? localStorage : null;

export const tokenStore = {
  get: () => {
    if (!storage) return null;
    return storage.getItem(TOKEN_KEY);
  },
  set: (t: string) => {
    if (!storage) return;
    storage.setItem(TOKEN_KEY, t);
    // Broadcast to other tabs via storage event (only works for other tabs)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new StorageEvent("storage", {
        key: TOKEN_KEY,
        newValue: t,
        url: window.location.href,
      }));
    }
  },
  clear: () => {
    if (!storage) return;
    storage.removeItem(TOKEN_KEY);
    storage.removeItem(REFRESH_KEY);
  },
  getRefresh: () => {
    if (!storage) return null;
    return storage.getItem(REFRESH_KEY);
  },
  setRefresh: (t: string) => {
    if (!storage) return;
    storage.setItem(REFRESH_KEY, t);
  },
};

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type Options = {
  method?: string;
  body?: unknown;
  formData?: FormData;
  headers?: Record<string, string>;
};

/**
 * Các endpoint auth công khai KHÔNG được trigger refresh khi trả 401.
 * Ví dụ: refresh token hết hạn → POST /api/auth/refresh trả 401 →
 * nếu refresh tiếp sẽ thành vòng lặp vô hạn. Những endpoint này thường
 * trả 401 vì lý do nghiệp vụ (sai mật khẩu, OTP sai) chứ không phải vì
 * access token hết hạn — không nên xử lý như "session hết hạn".
 */
const REFRESH_PATHS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/forgot-password",
  "/api/auth/verify-otp",
  "/api/auth/reset-password",
  "/api/auth/verify",
  "/api/auth/send-verification",
];

// -----------------------------------------------------------------------------
// REFRESH — nơi duy nhất toàn app thực hiện refresh token.
//   - Single-flight: mọi caller đồng thời dùng chung 1 Promise → đúng 1 request
//     POST /api/auth/refresh trên toàn bộ phiên, bất kể có bao nhiêu 401.
//   - Không có interval refresh, không có refresh rải rác ở AuthProvider.
// -----------------------------------------------------------------------------
let refreshPromise: Promise<boolean> | null = null;

async function doRefresh(): Promise<boolean> {
  const refreshToken = tokenStore.getRefresh();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });
    if (!res.ok) return false;

    const json = await res.json();
    const data = json?.data ?? json;
    if (!data?.accessToken) return false;

    tokenStore.set(data.accessToken);
    if (data.refreshToken) tokenStore.setRefresh(data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

export function refreshTokens(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// -----------------------------------------------------------------------------
// SESSION FAILED — dấu hiệu duy nhất báo "không thể tiếp tục phiên".
// Token bị xóa + 1 event `auth:unauthorized` (fire một lần, guard redirect).
// AuthProvider cũng lắng nghe để clear user state.
// -----------------------------------------------------------------------------
let unauthorizedDispatched = false;
if (typeof window !== "undefined") {
  window.addEventListener("auth:login-success", () => {
    unauthorizedDispatched = false;
  });
}

export function sessionFailed() {
  tokenStore.clear();
  if (!unauthorizedDispatched) {
    unauthorizedDispatched = true;
    window.dispatchEvent(new CustomEvent("auth:unauthorized"));
  }
}

export async function api<T = unknown>(
    path: string,
    opts: Options = {},
): Promise<T> {
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
    const headers: Record<string, string> = { ...(opts.headers ?? {}) };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let body: BodyInit | undefined;
    if (opts.formData) {
      body = opts.formData;
    } else if (opts.body !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(opts.body);
    }

    return fetch(`${API_BASE}${path}`, {
      method: opts.method ?? "GET",
      headers,
      body,
      credentials: "include",
    });
  };

  let res = await doFetch();

  if (res.status === 401 && !REFRESH_PATHS.some((p) => path.startsWith(p))) {
    // Retry tối đa 1 lần mỗi request: refresh (single-flight) → retry với token mới.
    const refreshed = await refreshTokens();
    if (refreshed) {
      res = await doFetch();
      // Retry xong vẫn 401 → refresh token cũng đã hết hạn.
      if (res.status === 401) {
        sessionFailed();
        throw new ApiError(401, "Session expired. Please log in again.");
      }
    } else {
      sessionFailed();
      throw new ApiError(401, "Session expired. Please log in again.");
    }
  }

  if (res.status === 403) {
    const ct = res.headers.get("content-type") ?? "";
    const json = ct.includes("application/json")
        ? await res.json().catch(() => null)
        : null;

    const errorCode = json && typeof json === "object" && "error" in json ? String((json as any).error) : null;

    if (errorCode === "ACCOUNT_LOCKED") {
      // Tài khoản bị khóa: phiên không thể tiếp tục — dừng ngay, không refresh.
      tokenStore.clear();

      const message = json && typeof json === "object" && "message" in json
          ? String((json as { message: unknown }).message)
          : "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.";

      throw new ApiError(403, message, { ...json, accountLocked: true });
    }

    const message =
        (json &&
            typeof json === "object" &&
            "message" in json &&
            String((json as { message: unknown }).message)) ||
        "You do not have permission to access this resource";
    throw new ApiError(403, message, json);
  }

  // 204 No Content — return null (caller handles)
  if (res.status === 204) {
    return null as T;
  }

  const ct = res.headers.get("content-type") ?? "";
  const json = ct.includes("application/json")
      ? await res.json().catch(() => null)
      : null;

  if (!res.ok) {
    const message =
        (json &&
            typeof json === "object" &&
            "message" in json &&
            String((json as { message: unknown }).message)) ||
        `Request failed (${res.status})`;

    throw new ApiError(res.status, message, json);
  }

  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
}
