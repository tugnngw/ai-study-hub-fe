import { n as api, r as tokenStore } from "./api-DeanpG7g.js";
//#region src/lib/realApi.ts
var authApi = {
	register: (data) => api("/api/auth/register", {
		method: "POST",
		body: data
	}),
	login: async (data) => {
		const res = await api("/api/auth/login", {
			method: "POST",
			body: data
		});
		const token = res?.accessToken;
		const refreshToken = res?.refreshToken;
		if (token) tokenStore.set(token);
		if (refreshToken) tokenStore.setRefresh(refreshToken);
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
var semesterApi = {
	list: () => api("/api/semesters"),
	getById: (id) => api(`/api/semesters/${id}`)
};
var subjectApi = {
	listBySemester: (semesterId) => api(`/api/subjects/semester/${semesterId}`),
	getById: (id) => api(`/api/subjects/${id}`)
};
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
	listSharedFolder: (folderId) => api(`/api/documents/shared/folder/${folderId}`),
	getById: (id) => api(`/api/documents/${id}`),
	getSharedById: (id) => api(`/api/documents/shared/${id}`),
	upload: async (input) => {
		const fd = new FormData();
		(input.files ?? (input.file ? [input.file] : [])).forEach((f) => fd.append("files", f));
		fd.append("title", input.title);
		if (input.description) fd.append("description", input.description);
		if (input.folderId) fd.append("folderId", input.folderId);
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
var ragApi = { ask: (input) => api("/api/rag/ask", {
	method: "POST",
	body: {
		documentId: input.documentId,
		question: input.question
	}
}) };
var shareApi = {
	listOwned: () => api("/api/shares/owner"),
	listSharedWithMe: () => api("/api/shares/shared-with-me"),
	shareFolder: (request) => api("/api/shares", {
		method: "POST",
		body: request
	}),
	shareDocument: (request) => api("/api/shares", {
		method: "POST",
		body: request
	}),
	removeShare: (shareId) => api(`/api/shares/${shareId}`, { method: "DELETE" }),
	saveToMyFolder: (shareId, folderId, title, description) => api(`/api/shares/${shareId}/save`, {
		method: "POST",
		body: {
			folderId,
			title,
			description
		}
	}),
	report: (body) => api(`/api/reports`, {
		method: "POST",
		body: {
			documentId: body.id,
			reason: body.reason,
			description: body.description
		}
	})
};
var quizApi = {
	listByDocument: (documentId) => api(`/api/quizzes/${documentId}`),
	generate: (input) => api("/api/quizzes/generate", {
		method: "POST",
		body: input
	})
};
var flashcardApi = {
	listByDocument: (documentId) => api(`/api/flashcards/${documentId}`),
	generate: (input) => api("/api/flashcards/generate", {
		method: "POST",
		body: input
	})
};
var summaryApi = {
	generate: (request) => api("/api/ai/summary", {
		method: "POST",
		body: request
	}),
	getCached: (documentId) => api(`/api/ai/summary/${documentId}`)
};
//#endregion
export { folderApi as a, semesterApi as c, summaryApi as d, flashcardApi as i, shareApi as l, authApi as n, quizApi as o, documentApi as r, ragApi as s, accountApi as t, subjectApi as u };
