//#region src/lib/api.ts
var API_BASE = "http://localhost:4040";
var TOKEN_KEY = "auth_token";
var REFRESH_KEY = "refresh_token";
var storage = typeof window !== "undefined" ? sessionStorage : null;
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
var refreshPromise = null;
var MAX_RETRY_COUNT = 1;
var retryCountMap = /* @__PURE__ */ new Map();
async function attemptRefresh() {
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
			body: JSON.stringify({ refreshToken })
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
			console.log("[API] Token set to localStorage.");
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
async function api(path, opts = {}) {
	const doFetch = async () => {
		const token = tokenStore.get();
		console.log(`[API] doFetch - Current token: ${token ? token.substring(0, 10) + "..." : "null"}`);
		const headers = { ...opts.headers ?? {} };
		if (token) headers["Authorization"] = `Bearer ${token}`;
		let body;
		if (opts.formData) body = opts.formData;
		else if (opts.body !== void 0) {
			headers["Content-Type"] = "application/json";
			body = JSON.stringify(opts.body);
		}
		console.log(`[API] ${opts.method || "GET"} ${path} - token exists: ${!!token}`);
		return fetch(`${API_BASE}${path}`, {
			method: opts.method ?? "GET",
			headers,
			body,
			credentials: "include"
		});
	};
	let res = await doFetch();
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
		if (!refreshPromise) refreshPromise = attemptRefresh().finally(() => {
			refreshPromise = null;
		});
		const refreshed = await refreshPromise;
		console.log(`[API] Refresh result: ${refreshed ? "✅ Success" : "❌ Failed"}`);
		if (refreshed) {
			retryCountMap.set(requestKey, currentRetryCount + 1);
			console.log(`[API] Retrying ${path} with new token...`);
			try {
				res = await doFetch();
				console.log(`[API] Retry status:`, res.status);
				if (res.ok || res.status !== 401) retryCountMap.delete(requestKey);
			} catch (retryError) {
				console.error(`[API] Error during retry fetch for ${path}:`, retryError);
				retryCountMap.delete(requestKey);
				throw new ApiError(500, `Failed to retry request: ${path}`);
			}
		} else {
			console.log(`[API] ❌ Refresh failed, throwing 401 error`);
			retryCountMap.delete(requestKey);
			throw new ApiError(401, "Session expired. Please log in again.");
		}
	}
	if (res.status === 403) {
		console.log(`[API] 🚫 Got 403 Forbidden on ${path} - no refresh attempt, access denied`);
		const json = (res.headers.get("content-type") ?? "").includes("application/json") ? await res.json().catch(() => null) : null;
		if ((json && typeof json === "object" && "error" in json ? String(json.error) : null) === "ACCOUNT_LOCKED") {
			console.log(`[API] 🔒 Account locked detected, clearing auth state`);
			tokenStore.clear();
			throw new ApiError(403, json && typeof json === "object" && "message" in json ? String(json.message) : "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.", {
				...json,
				accountLocked: true
			});
		}
		throw new ApiError(403, json && typeof json === "object" && "message" in json && String(json.message) || "You do not have permission to access this resource", json);
	}
	const json = (res.headers.get("content-type") ?? "").includes("application/json") ? await res.json().catch(() => null) : null;
	if (!res.ok) {
		const message = json && typeof json === "object" && "message" in json && String(json.message) || `Request failed (${res.status})`;
		throw new ApiError(res.status, message, json);
	}
	return json?.data !== void 0 ? json.data : json;
}
//#endregion
export { tokenStore as i, ApiError as n, api as r, API_BASE as t };
