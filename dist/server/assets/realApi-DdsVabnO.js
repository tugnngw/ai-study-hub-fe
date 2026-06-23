//#region src/lib/api.ts
var API_BASE = "http://localhost:4040";
var TOKEN_KEY = "auth_token";
var REFRESH_KEY = "refresh_token";
var tokenStore = {
	get: () => typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
	set: (t) => localStorage.setItem(TOKEN_KEY, t),
	clear: () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(REFRESH_KEY);
	},
	getRefresh: () => typeof window === "undefined" ? null : localStorage.getItem(REFRESH_KEY),
	setRefresh: (t) => localStorage.setItem(REFRESH_KEY, t)
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
async function api(path, opts = {}) {
	const doFetch = async () => {
		const token = tokenStore.get();
		console.log("🔑 api request", {
			path,
			tokenPresent: !!token
		});
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
//#region src/lib/realApi.ts
var authApi = {
	register: (data) => api("/api/auth/register", {
		method: "POST",
		body: data
	}),
	login: async (data) => {
		localStorage.clear();
		const res = await api("/api/auth/login", {
			method: "POST",
			body: data
		});
		const token = res?.accessToken ?? res?.token;
		if (token) tokenStore.set(token);
		if (res?.refreshToken) tokenStore.setRefresh(res.refreshToken);
		return res;
	},
	refresh: () => api("/api/auth/refresh", {
		method: "POST",
		body: { refreshToken: tokenStore.getRefresh() }
	}),
	logout: async () => {
		await api("/api/auth/logout", { method: "POST" }).catch(() => {});
		tokenStore.clear();
	},
	requestPasswordReset: (email) => api("/api/auth/request-reset", {
		method: "POST",
		body: { email }
	}),
	verifyResetOtp: (email, otp) => api("/api/auth/verify-otp", {
		method: "POST",
		body: {
			email,
			otp
		}
	}),
	resetPassword: (email, newPassword) => api("/api/auth/reset-password", {
		method: "POST",
		body: {
			email,
			password: newPassword
		}
	})
};
var accountApi = { me: () => api("/api/account/me") };
var folderApi = {
	list: () => api("/api/folder/getall"),
	getById: (id) => api(`/api/folder/getbyid/${id}`),
	create: (body) => api("/api/folder/create", {
		method: "POST",
		body
	}),
	update: (id, body) => api(`/api/folder/update/${id}`, {
		method: "PUT",
		body
	}),
	delete: (id) => api(`/api/folder/delete/${id}`, { method: "DELETE" })
};
var documentApi = {
	list: () => api("/api/documents"),
	listByFolder: (folderId) => api(`/api/documents/folder/${folderId}`),
	getById: (id) => {
		console.log("[TRACE-6] documentApi.getById called with id:", id);
		return api(`/api/documents/${id}`);
	},
	upload: async (input) => {
		const fd = new FormData();
		fd.append("files", input.file);
		fd.append("title", input.title);
		if (input.description) fd.append("description", input.description);
		if (input.folderId) fd.append("folderId", input.folderId);
		if (input.subjectId) fd.append("subjectId", String(input.subjectId));
		return api("/api/documents", {
			method: "POST",
			formData: fd
		});
	},
	update: (id, body) => api(`/api/documents/${id}`, {
		method: "PUT",
		body
	}),
	delete: (id) => api(`/api/documents/${id}`, { method: "DELETE" }),
	getDownloadUrl: (id) => api(`/api/documents/${id}/download`),
	listTrash: () => api("/api/documents/trash"),
	restoreFromTrash: (id) => api(`/api/documents/${id}/restore`, { method: "POST" }),
	emptyTrash: (id) => api(`/api/documents/${id}/permanent`, { method: "DELETE" })
};
var ragApi = {
	upload: (file, documentId) => {
		const fd = new FormData();
		fd.append("file", file);
		fd.append("documentId", String(documentId));
		return api("/api/rag/upload", {
			method: "POST",
			formData: fd
		});
	},
	uploadAndChunk: (file, documentId) => {
		const fd = new FormData();
		fd.append("file", file);
		fd.append("documentId", String(documentId));
		return api("/api/rag/upload/chunk", {
			method: "POST",
			formData: fd
		});
	},
	ask: (input) => api("/api/rag/ask", {
		method: "POST",
		body: {
			id: input.id,
			question: input.question
		}
	})
};
var shareApi = {
	listOwned: () => api("/api/shares/owner"),
	listSharedWithMe: () => api("/api/shares/shared-with-me"),
	shareFolder: (request) => api("/api/shares", {
		method: "POST",
		body: request
	}),
	removeShare: (shareId) => api(`/api/shares/${shareId}`, { method: "DELETE" }),
	report: (body) => api(`/api/documents/${body.id}/report`, {
		method: "POST",
		body: {
			reason: body.reason,
			description: body.description
		}
	})
};
//#endregion
export { ragApi as a, tokenStore as c, folderApi as i, authApi as n, shareApi as o, documentApi as r, API_BASE as s, accountApi as t };
