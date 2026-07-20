import { n as api } from "./api-CR3oJcwy.js";
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
		time: "21 giờ trước",
		order: new Date(resp.createdAt).getTime(),
		fileCount: resp.fileCount || 0,
		savedFolderId: resp.folderId ?? void 0,
		isDocument: !!resp.documentId
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
		time: "21 giờ trước",
		order: new Date(resp.createdAt).getTime(),
		fileCount: resp.fileCount || 0,
		savedFolderId: resp.folderId ?? void 0
	};
}
//#endregion
export { sharesApi as t };
