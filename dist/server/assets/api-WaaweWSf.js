//#region src/lib/api.ts
var API_BASE = "http://localhost:4040";
var TOKEN_KEY = "auth_token";
var REFRESH_KEY = "refresh_token";
var tokenStore = {
	get: () => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(TOKEN_KEY);
	},
	set: (t) => {
		localStorage.setItem(TOKEN_KEY, t);
	},
	clear: () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(REFRESH_KEY);
	},
	getRefresh: () => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(REFRESH_KEY);
	},
	setRefresh: (t) => {
		localStorage.setItem(REFRESH_KEY, t);
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
async function attemptRefresh() {
	const refreshToken = tokenStore.getRefresh();
	if (!refreshToken) return false;
	try {
		const res = await fetch(`${API_BASE}/api/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken })
		});
		if (!res.ok) return false;
		const json = await res.json();
		const data = json?.data ?? json;
		const newAccess = data?.accessToken ?? data?.token;
		const newRefresh = data?.refreshToken;
		if (newAccess) {
			tokenStore.set(newAccess);
			if (newRefresh) tokenStore.setRefresh(newRefresh);
			return true;
		}
		return false;
	} catch (e) {
		console.error("Refresh error:", e);
		return false;
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
			body
		});
	};
	let res = await doFetch();
	if (res.status === 401) {
		if (!refreshPromise) refreshPromise = attemptRefresh().finally(() => {
			refreshPromise = null;
		});
		if (await refreshPromise) res = await doFetch();
		else {
			tokenStore.clear();
			throw new ApiError(401, "Session expired. Please log in again.");
		}
	}
	const json = (res.headers.get("content-type") ?? "").includes("application/json") ? await res.json().catch(() => null) : null;
	if (!res.ok) {
		const message = json && typeof json === "object" && "message" in json && String(json.message) || `Request failed (${res.status})`;
		throw new ApiError(res.status, message, json);
	}
	return json?.data !== void 0 ? json.data : json;
}
//#endregion
export { api as n, tokenStore as r, API_BASE as t };
