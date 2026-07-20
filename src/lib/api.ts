// src/lib/api.ts
export const API_BASE =
    (import.meta.env.VITE_API_BASE as string | undefined) ??
    "http://localhost:4040";

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

// Use sessionStorage instead of localStorage to keep sessions separate per tab
const storage = typeof window !== "undefined" ? localStorage : null;

export const tokenStore = {
  get: () => {
    if (!storage) return null;
    const token = storage.getItem(TOKEN_KEY);
    return token;
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

let refreshPromise: Promise<boolean> | null = null;
const MAX_RETRY_COUNT = 1;
const retryCountMap = new Map<string, number>();

/** Guard: fires auth:logout only once per session. Reset on login success. */
let logoutDispatched = false;
if (typeof window !== "undefined") {
  window.addEventListener("auth:login-success", () => { logoutDispatched = false; });
}

const ts = () => new Date().toISOString().slice(11, 23);

export async function attemptRefresh(): Promise<boolean> {
  const refreshToken = tokenStore.getRefresh();
  console.log(`[API] attemptRefresh called, refreshToken exists: ${!!refreshToken}`);
  if (!refreshToken) {
    console.log(`[API] ❌ No refresh token available`);
    return false;
  }

  try {
    console.log(`[API] 🔄 Attempting refresh...`);
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    console.log(`[API] Refresh response status: ${res.status}`);
    if (!res.ok) {
      console.log(`[API] ❌ Refresh failed with status: ${res.status}`);
      return false;
    }

    const json = await res.json();
    const data = json?.data ?? json;
    const newAccess = data?.accessToken ?? data?.token;
    const newRefresh = data?.refreshToken;

    console.log(`[API] Refresh result: ${newAccess ? "✅ Success" : "❌ Failed (no new token)"}`);
    if (newAccess) {
      tokenStore.set(newAccess);
      console.log("[API] Token set to localStorage."); // Log for setting token
      if (newRefresh) tokenStore.setRefresh(newRefresh);
      return true;
    } else {
      console.log(`[API] ❌ Refresh response missing token`);
      return false;
    }
  } catch (e) {
    console.error(`[API] ❌ Refresh error:`, e);
    return false;
  }
}

export async function api<T = unknown>(
    path: string,
    opts: Options = {},
): Promise<T> {
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
    console.log(`[API] doFetch - Current token: ${token ? token.substring(0, 10) + '...' : 'null'}`);
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

    console.log(`[API:${ts()}] FETCH ${opts.method || "GET"} ${path} - token exists: ${!!token}`);
    console.log(`[API:${ts()}] Headers:`, JSON.stringify(headers));
    return fetch(`${API_BASE}${path}`, {
      method: opts.method ?? "GET",
      headers,
      body,
      credentials: "include",
    });
  };

  let res = await doFetch();
  console.log(`[API:${ts()}] ${opts.method || "GET"} ${path} - response status:`, res.status);

  if (res.status === 401) {
    // Skip refresh for public auth endpoints (no auth required)
    const PUBLIC_AUTH_PATHS = [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/verify-otp",
      "/api/auth/reset-password",
    ];
    if (PUBLIC_AUTH_PATHS.some((p) => path.startsWith(p))) {
      throw new ApiError(401, "Unauthorized");
    }

    const requestKey = `${opts.method || "GET"}:${path}`;
    const currentRetryCount = retryCountMap.get(requestKey) || 0;

    if (currentRetryCount >= MAX_RETRY_COUNT) {
      console.log(`[API:${ts()}] ❌ Max retry count reached for ${path}, clearing retry count and throwing error`);
      retryCountMap.delete(requestKey);
      throw new ApiError(401, "Session expired. Please log in again.");
    }

    console.log(`[API:${ts()}] 🔴 Got 401 on ${path}, attempting refresh... (retry ${currentRetryCount + 1}/${MAX_RETRY_COUNT})`);
    if (!refreshPromise) {
      refreshPromise = attemptRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshed = await refreshPromise;
    console.log(`[API:${ts()}] Refresh result: ${refreshed ? "✅ Success" : "❌ Failed"}`);

    if (!refreshed) {
      // Clear stale tokens immediately, then notify AuthProvider once per session
      tokenStore.clear();
      if (!logoutDispatched) {
        logoutDispatched = true;
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }
    }

    if (refreshed) {
      retryCountMap.set(requestKey, currentRetryCount + 1);
      console.log(`[API:${ts()}] Retrying ${path} with new token...`);
      try {
        res = await doFetch();
        console.log(`[API:${ts()}] Retry status:`, res.status);
        if (res.ok || res.status !== 401) {
          retryCountMap.delete(requestKey);
        }
      } catch (retryError) {
        console.error(`[API:${ts()}] Error during retry fetch for ${path}:`, retryError);
        retryCountMap.delete(requestKey);
        throw new ApiError(500, `Failed to retry request: ${path}`);
      }
    } else {
      console.log(`[API:${ts()}] ❌ Refresh failed, throwing 401 error`);
      retryCountMap.delete(requestKey);
      throw new ApiError(401, "Session expired. Please log in again.");
    }
  }

  if (res.status === 403) {
    console.log(`[API] 🚫 Got 403 Forbidden on ${path} - no refresh attempt, access denied`);
    const ct = res.headers.get("content-type") ?? "";
    const json = ct.includes("application/json")
        ? await res.json().catch(() => null)
        : null;
    
    const errorCode = json && typeof json === "object" && "error" in json ? String((json as any).error) : null;
    
    if (errorCode === "ACCOUNT_LOCKED") {
      console.log(`[API] 🔒 Account locked detected, clearing auth state`);
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