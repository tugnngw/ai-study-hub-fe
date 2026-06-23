// src/lib/api.ts
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ??
  "http://localhost:4040";

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

export const tokenStore = {
  get: () =>
    typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
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

// ── Refresh token queue ─────────────────────────────────────
let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
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
  const doFetch = async (): Promise<Response> => {
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

    if (res.status === 403) {
      // 403 after 401 means refresh also failed — clear
      tokenStore.clear();
    }

    throw new ApiError(res.status, message, json);
  }

  // Unwrap ApiResponse<T> { code, message, data } -> T
  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
}
