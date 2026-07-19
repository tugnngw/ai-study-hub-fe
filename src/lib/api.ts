<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Lightweight API client. JWT stored in localStorage.
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ?? "http://localhost:8080";
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
// src/lib/api.ts
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "http://localhost:4040";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
=======
>>>>>>> origin/admin-added-fix
// src/lib/api.ts

export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "http://localhost:4040";
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
=======
>>>>>>> origin/final/demo-v1
// src/lib/api.ts
export const API_BASE =
    (import.meta.env.VITE_API_BASE as string | undefined) ??
    "http://localhost:4040";
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

<<<<<<< HEAD
export const tokenStore = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/AI-Study-fix
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/test/share-document-cloudinary
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/uichange
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/admin-added
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/update/feature/share
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/update/feature/AI/Quiz
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/Flashcards-fix
=======
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
>>>>>>> origin/admin-added-fix
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
=======
  get: () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  },
  set: (t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
  },
>>>>>>> origin/Flashcars
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
<<<<<<< HEAD
  getRefresh: () =>
    typeof window === "undefined" ? null : localStorage.getItem(REFRESH_KEY),
  setRefresh: (t: string) => localStorage.setItem(REFRESH_KEY, t),
=======
  getRefresh: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_KEY);
  },
  setRefresh: (t: string) => {
    localStorage.setItem(REFRESH_KEY, t);
  },
>>>>>>> origin/Flashcars
=======
// Use sessionStorage instead of localStorage to keep sessions separate per tab
const storage = typeof window !== "undefined" ? sessionStorage : null;

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
>>>>>>> origin/final/demo-v1
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export async function api<T = unknown>(path: string, opts: Options = {}): Promise<T> {
  const token = tokenStore.get();
  const headers: Record<string, string> = { ...(opts.headers ?? {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let body: BodyInit | undefined;
  if (opts.formData) {
    body = opts.formData;
  } else if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.body);
  }

  const res = await fetch(`${API_BASE}/api${path}`, {
    method: opts.method ?? "GET",
    headers,
    body,
  });

  const ct = res.headers.get("content-type") ?? "";
  const data = ct.includes("application/json") ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "message" in data && String((data as { message: unknown }).message)) ||
      `Request failed (${res.status})`;
    if (res.status === 401) {
      tokenStore.clear();
    }
    throw new ApiError(res.status, message, data);
  }
  return data as T;
=======
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// ── Refresh token queue ─────────────────────────────────────
let refreshPromise: Promise<boolean> | null = null;

export async function attemptRefresh(): Promise<boolean> {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
// ── Refresh token queue ─────────────────────────────────────
let refreshPromise: Promise<boolean> | null = null;

const debugLog = (msg: string) => {
  console.log(`[API] ${msg}`);
};

async function attemptRefresh(): Promise<boolean> {
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
// ── Refresh token queue ─────────────────────────────────────
let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
let refreshPromise: Promise<boolean> | null = null;

export async function attemptRefresh(): Promise<boolean> {
>>>>>>> origin/Flashcars
  const refreshToken = tokenStore.getRefresh();
  if (!refreshToken) return false;

  try {
=======
let refreshPromise: Promise<boolean> | null = null;
const MAX_RETRY_COUNT = 1;
const retryCountMap = new Map<string, number>();

export async function attemptRefresh(): Promise<boolean> {
  const refreshToken = tokenStore.getRefresh();
  console.log(`[API] attemptRefresh called, refreshToken exists: ${!!refreshToken}`);
  if (!refreshToken) {
    console.log(`[API] ❌ No refresh token available`);
    return false;
  }

  try {
    console.log(`[API] 🔄 Attempting refresh...`);
>>>>>>> origin/final/demo-v1
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

<<<<<<< HEAD
    if (!res.ok) return false;

    const json = await res.json();
<<<<<<< HEAD
    // Backend returns { accessToken, refreshToken } or { data: { accessToken, refreshToken } }
    const data = json?.data ?? json;
    const newAccess = data?.accessToken;
=======
    const data = json?.data ?? json;
    const newAccess = data?.accessToken ?? data?.token;
>>>>>>> origin/Flashcars
    const newRefresh = data?.refreshToken;

    if (newAccess) {
      tokenStore.set(newAccess);
      if (newRefresh) tokenStore.setRefresh(newRefresh);
      return true;
    }
    return false;
<<<<<<< HEAD
  } catch {
=======
  } catch (e) {
    console.error("Refresh error:", e);
>>>>>>> origin/Flashcars
=======
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
>>>>>>> origin/final/demo-v1
    return false;
  }
}

export async function api<T = unknown>(
<<<<<<< HEAD
<<<<<<< HEAD
  path: string,
  opts: Options = {},
): Promise<T> {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
  console.log('🔑 api request', { path, tokenPresent: !!token });
=======
  debugLog(`${opts.method || 'GET'} ${path}`);
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
    console.log('🔑 api request', { path, tokenPresent: !!token });
>>>>>>> origin/AI-Study-fix
=======
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
>>>>>>> origin/test/share-document-cloudinary
=======
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
>>>>>>> origin/uichange
=======
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
  console.log('🔑 api request', { path, tokenPresent: !!token });
>>>>>>> origin/admin-added
=======
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
  console.log('🔑 api request', { path, tokenPresent: !!token });
>>>>>>> origin/update/feature/share
=======
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
  console.log('🔑 api request', { path, tokenPresent: !!token });
>>>>>>> origin/update/feature/AI/Quiz
=======
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
  console.log('🔑 api request', { path, tokenPresent: !!token });
>>>>>>> origin/Flashcards-fix
=======
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
  console.log('🔑 api request', { path, tokenPresent: !!token });
>>>>>>> origin/admin-added-fix
    const headers: Record<string, string> = { ...(opts.headers ?? {}) };
    if (token) headers["Authorization"] = `Bearer ${token}`;
=======
=======
>>>>>>> origin/final/demo-v1
    path: string,
    opts: Options = {},
): Promise<T> {
  const doFetch = async (): Promise<Response> => {
    const token = tokenStore.get();
<<<<<<< HEAD
=======
    console.log(`[API] doFetch - Current token: ${token ? token.substring(0, 10) + '...' : 'null'}`);
>>>>>>> origin/final/demo-v1
    const headers: Record<string, string> = { ...(opts.headers ?? {}) };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

    let body: BodyInit | undefined;
    if (opts.formData) {
      body = opts.formData;
    } else if (opts.body !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(opts.body);
    }

<<<<<<< HEAD
=======
    console.log(`[API] ${opts.method || "GET"} ${path} - token exists: ${!!token}`);
>>>>>>> origin/final/demo-v1
    return fetch(`${API_BASE}${path}`, {
      method: opts.method ?? "GET",
      headers,
      body,
<<<<<<< HEAD
=======
      credentials: "include",
>>>>>>> origin/final/demo-v1
    });
  };

  let res = await doFetch();
<<<<<<< HEAD

<<<<<<< HEAD
  // ── Auto-refresh on 401 ─────────────────────────────
  if (res.status === 401) {
    // Deduplicate concurrent refresh calls
=======
  if (res.status === 401) {
>>>>>>> origin/Flashcars
=======
  console.log(`[API] ${opts.method || "GET"} ${path} - response status:`, res.status);

  if (res.status === 401) {
    const requestKey = `${opts.method || "GET"}:${path}`;
    const currentRetryCount = retryCountMap.get(requestKey) || 0;

    if (currentRetryCount >= MAX_RETRY_COUNT) {
      console.log(`[API] ❌ Max retry count reached for ${path}, clearing retry count and throwing error`);
      retryCountMap.delete(requestKey);
      throw new ApiError(401, "Session expired. Please log in again.");
    }

    console.log(`[API] 🔴 Got 401 on ${path}, attempting refresh... (retry ${currentRetryCount + 1}/${MAX_RETRY_COUNT})`);
>>>>>>> origin/final/demo-v1
    if (!refreshPromise) {
      refreshPromise = attemptRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshed = await refreshPromise;
<<<<<<< HEAD

    if (refreshed) {
<<<<<<< HEAD
      // Retry the original request with new token
      res = await doFetch();
    } else {
      // Refresh failed — clear everything
=======
      res = await doFetch();
    } else {
>>>>>>> origin/Flashcars
      tokenStore.clear();
=======
    console.log(`[API] Refresh result: ${refreshed ? "✅ Success" : "❌ Failed"}`);

    if (refreshed) {
      retryCountMap.set(requestKey, currentRetryCount + 1);
      console.log(`[API] Retrying ${path} with new token...`);
      try {
        res = await doFetch();
        console.log(`[API] Retry status:`, res.status);
        if (res.ok || res.status !== 401) {
          retryCountMap.delete(requestKey);
        }
      } catch (retryError) {
        console.error(`[API] Error during retry fetch for ${path}:`, retryError);
        retryCountMap.delete(requestKey);
        throw new ApiError(500, `Failed to retry request: ${path}`);
      }
    } else {
      console.log(`[API] ❌ Refresh failed, throwing 401 error`);
      retryCountMap.delete(requestKey);
>>>>>>> origin/final/demo-v1
      throw new ApiError(401, "Session expired. Please log in again.");
    }
  }

<<<<<<< HEAD
  const ct = res.headers.get("content-type") ?? "";
  const json = ct.includes("application/json")
<<<<<<< HEAD
    ? await res.json().catch(() => null)
    : null;

  if (!res.ok) {
    const message =
      (json &&
        typeof json === "object" &&
        "message" in json &&
        String((json as { message: unknown }).message)) ||
      `Request failed (${res.status})`;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
    // Do NOT clear token on 403 – user may simply lack permission.
    // Token clearing is only for 401 (unauthenticated) after refresh failure.
    // 403 means the request was understood but the user lacks required rights.
    // Let the UI handle the error (e.g., show a permission dialog).
    throw new ApiError(res.status, message, json);
  }


  // Unwrap ApiResponse<T> { code, message, data } -> T
  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
    if (res.status === 403) {
      // 403 after 401 means refresh also failed — clear
      tokenStore.clear();
    }
=======
=======
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
>>>>>>> origin/final/demo-v1
      ? await res.json().catch(() => null)
      : null;

  if (!res.ok) {
    const message =
        (json &&
            typeof json === "object" &&
            "message" in json &&
            String((json as { message: unknown }).message)) ||
        `Request failed (${res.status})`;
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

    throw new ApiError(res.status, message, json);
  }

<<<<<<< HEAD
<<<<<<< HEAD
  // Unwrap ApiResponse<T> { code, message, data } -> T
  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
}
=======
  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
}
>>>>>>> origin/Flashcars
=======
  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
}
>>>>>>> origin/final/demo-v1
