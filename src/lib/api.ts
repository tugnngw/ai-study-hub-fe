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

export async function api<T = unknown>(
  path: string,
  opts: Options = {},
): Promise<T> {
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

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method ?? "GET",
    headers,
    body,
  });

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
      // Only clear token on Unauthorized
      if (res.status === 401) {
        tokenStore.clear();
      }
      throw new ApiError(res.status, message, json);
    }
  
  // Unwrap ApiResponse<T> { code, message, data } -> T
  const result = (json as any)?.data !== undefined ? (json as any).data : json;
  return result as T;
}
