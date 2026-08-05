import { n as api } from "./api-BmsV1BBR.js";
//#region src/lib/formatTime.ts
function formatRelativeTime(isoString) {
	const diffMs = Date.now() - new Date(isoString).getTime();
	if (diffMs < 0) return "Vừa xong";
	const seconds = Math.floor(diffMs / 1e3);
	if (seconds < 60) return "Vừa xong";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} phút trước`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} giờ trước`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days} ngày trước`;
	const weeks = Math.floor(days / 7);
	if (weeks < 4) return `${weeks} tuần trước`;
	const months = Math.floor(days / 30);
	if (months < 12) return `${months} tháng trước`;
	return `${Math.floor(days / 365)} năm trước`;
}
//#endregion
//#region src/features/shares/services/shareApi.ts
var sharesApi = {
	getSharedWithMe: async () => {
		return (await api("/api/shares/shared-with-me")).map(mapShareResponseToSharedWithMe);
	},
	getSharedByMe: async () => {
		return (await api("/api/shares/owner")).map(mapShareResponseToSharedByMe);
	},
	deleteShared: (shareToken) => api(`/api/shares/token/${shareToken}`, { method: "DELETE" }),
	saveShared: (shareId, body) => api(`/api/shares/${shareId}/save`, {
		method: "POST",
		body
	}),
	getShareLink: (shareToken) => api(`/api/shares/${shareToken}/link`),
	getDownloadUrl: (shareToken) => api(`/api/shares/${shareToken}/download`)
};
function mapShareResponseToSharedWithMe(resp) {
	return {
		id: resp.shareToken,
		shareId: resp.id,
		actualFolderId: resp.folderId ?? "",
		name: resp.folderName || resp.documentTitle || "Unknown",
		size: "11.4mb",
		items: resp.fileCount || 0,
		sharedBy: {
			name: resp.ownerUsername || resp.ownerEmail || "Unknown",
			avatarUrl: null
		},
		time: formatRelativeTime(resp.createdAt),
		order: new Date(resp.createdAt).getTime(),
		fileCount: resp.fileCount || 0,
		savedFolderId: resp.folderId ?? void 0,
		isDocument: !!resp.documentId,
		documentId: resp.documentId ?? void 0
	};
}
function mapShareResponseToSharedByMe(resp) {
	const sharedWith = [];
	if (resp.sharedUsername) sharedWith.push({
		name: resp.sharedUsername,
		avatarUrl: null
	});
	else if (resp.sharedEmail) sharedWith.push({
		name: resp.sharedEmail,
		avatarUrl: null
	});
	return {
		id: resp.shareToken,
		shareId: resp.id,
		actualFolderId: resp.folderId ?? "",
		name: resp.folderName || resp.documentTitle || "Unknown",
		size: "11.4mb",
		items: resp.fileCount || 0,
		sharedWith,
		time: formatRelativeTime(resp.createdAt),
		order: new Date(resp.createdAt).getTime(),
		fileCount: resp.fileCount || 0,
		savedFolderId: resp.folderId ?? void 0,
		documentId: resp.documentId ?? void 0
	};
}
//#endregion
export { sharesApi as t };
