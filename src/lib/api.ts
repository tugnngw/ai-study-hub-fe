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
// src/lib/api.ts
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "http://localhost:4040";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

export const tokenStore = {
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
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
  getRefresh: () =>
    typeof window === "undefined" ? null : localStorage.getItem(REFRESH_KEY),
  setRefresh: (t: string) => localStorage.setItem(REFRESH_KEY, t),
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
// ── Refresh token queue ─────────────────────────────────────
let refreshPromise: Promise<boolean> | null = null;

export async function attemptRefresh(): Promise<boolean> {
=======
// ── Refresh token queue ─────────────────────────────────────
let refreshPromise: Promise<boolean> | null = null;

const debugLog = (msg: string) => {
  console.log(`[API] ${msg}`);
};

async function attemptRefresh(): Promise<boolean> {
>>>>>>> origin/AI-Study-fix
=======
// ── Refresh token queue ─────────────────────────────────────
let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
>>>>>>> origin/test/share-document-cloudinary
  const refreshToken = tokenStore.getRefresh();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const json = await res.json();
    // Backend returns { accessToken, refreshToken } or { data: { accessToken, refreshToken } }
    const data = json?.data ?? json;
    const newAccess = data?.accessToken;
    const newRefresh = data?.refreshToken;

    if (newAccess) {
      tokenStore.set(newAccess);
      if (newRefresh) tokenStore.setRefresh(newRefresh);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function api<T = unknown>(
  path: string,
  opts: Options = {},
): Promise<T> {
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
    const headers: Record<string, string> = { ...(opts.headers ?? {}) };
    if (token) headers["Authorization"] = `Bearer ${token}`;

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
    });
  };

  let res = await doFetch();

  // ── Auto-refresh on 401 ─────────────────────────────
  if (res.status === 401) {
    // Deduplicate concurrent refresh calls
    if (!refreshPromise) {
      refreshPromise = attemptRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      // Retry the original request with new token
      res = await doFetch();
    } else {
      // Refresh failed — clear everything
      tokenStore.clear();
      throw new ApiError(401, "Session expired. Please log in again.");
    }
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

<<<<<<< HEAD
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
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
    if (res.status === 403) {
      // 403 after 401 means refresh also failed — clear
      tokenStore.clear();
    }

    throw new ApiError(res.status, message, json);
  }

  // Unwrap ApiResponse<T> { code, message, data } -> T
  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
>>>>>>> origin/test/share-document-cloudinary
}
