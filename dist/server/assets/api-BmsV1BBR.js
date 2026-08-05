//#region src/lib/api.ts
var API_BASE = "http://localhost:4040";
var TOKEN_KEY = "auth_token";
var REFRESH_KEY = "refresh_token";
var storage = typeof window !== "undefined" ? localStorage : null;
var tokenStore = {
	get: () => {
		if (!storage) return null;
		return storage.getItem(TOKEN_KEY);
	},
	set: (t) => {
		if (!storage) return;
		storage.setItem(TOKEN_KEY, t);
		if (typeof window !== "undefined") window.dispatchEvent(new StorageEvent("storage", {
			key: TOKEN_KEY,
			newValue: t,
			url: window.location.href
		}));
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
	setRefresh: (t) => {
		if (!storage) return;
		storage.setItem(REFRESH_KEY, t);
	}
};
var ApiError = class extends Error {
	status;
	data;
	constructor(status, message, data) {
		super(message);
		this.status = status;
		this.data = data;
	}
};
/**
* Các endpoint auth công khai KHÔNG được trigger refresh khi trả 401.
* Ví dụ: refresh token hết hạn → POST /api/auth/refresh trả 401 →
* nếu refresh tiếp sẽ thành vòng lặp vô hạn. Những endpoint này thường
* trả 401 vì lý do nghiệp vụ (sai mật khẩu, OTP sai) chứ không phải vì
* access token hết hạn — không nên xử lý như "session hết hạn".
*/
var REFRESH_PATHS = [
	"/api/auth/login",
	"/api/auth/register",
	"/api/auth/refresh",
	"/api/auth/forgot-password",
	"/api/auth/verify-otp",
	"/api/auth/reset-password",
	"/api/auth/verify",
	"/api/auth/send-verification"
];
var refreshPromise = null;
async function doRefresh() {
	const refreshToken = tokenStore.getRefresh();
	if (!refreshToken) return false;
	try {
		const res = await fetch(`${API_BASE}/api/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken }),
			credentials: "include"
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
function refreshTokens() {
	if (!refreshPromise) refreshPromise = doRefresh().finally(() => {
		refreshPromise = null;
	});
	return refreshPromise;
}
var unauthorizedDispatched = false;
if (typeof window !== "undefined") window.addEventListener("auth:login-success", () => {
	unauthorizedDispatched = false;
});
function sessionFailed() {
	tokenStore.clear();
	if (!unauthorizedDispatched) {
		unauthorizedDispatched = true;
		window.dispatchEvent(new CustomEvent("auth:unauthorized"));
	}
}
async function api(path, opts = {}) {
	const doFetch = async () => {
		const token = tokenStore.get();
		const headers = { ...opts.headers ?? {} };
		if (token) headers["Authorization"] = `Bearer ${token}`;
		let body;
		if (opts.formData) body = opts.formData;
		else if (opts.body !== void 0) {
			headers["Content-Type"] = "application/json";
			body = JSON.stringify(opts.body);
		}
		return fetch(`${API_BASE}${path}`, {
			method: opts.method ?? "GET",
			headers,
			body,
			credentials: "include"
		});
	};
	let res = await doFetch();
	if (res.status === 401 && !REFRESH_PATHS.some((p) => path.startsWith(p))) if (await refreshTokens()) {
		res = await doFetch();
		if (res.status === 401) {
			sessionFailed();
			throw new ApiError(401, "Session expired. Please log in again.");
		}
	} else {
		sessionFailed();
		throw new ApiError(401, "Session expired. Please log in again.");
	}
	if (res.status === 403) {
		const json = (res.headers.get("content-type") ?? "").includes("application/json") ? await res.json().catch(() => null) : null;
		if ((json && typeof json === "object" && "error" in json ? String(json.error) : null) === "ACCOUNT_LOCKED") {
			tokenStore.clear();
			throw new ApiError(403, json && typeof json === "object" && "message" in json ? String(json.message) : "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.", {
				...json,
				accountLocked: true
			});
		}
		throw new ApiError(403, json && typeof json === "object" && "message" in json && String(json.message) || "You do not have permission to access this resource", json);
	}
	if (res.status === 204) return null;
	const json = (res.headers.get("content-type") ?? "").includes("application/json") ? await res.json().catch(() => null) : null;
	if (!res.ok) {
		const message = json && typeof json === "object" && "message" in json && String(json.message) || `Request failed (${res.status})`;
		throw new ApiError(res.status, message, json);
	}
	return json?.data !== void 0 ? json.data : json;
}
//#endregion
export { tokenStore as i, api as n, refreshTokens as r, ApiError as t };
