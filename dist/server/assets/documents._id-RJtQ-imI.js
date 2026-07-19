import { t as Route } from "./documents._id-GRpXemeP.js";
import { o as useDocument } from "./queries-CwH5qVX2.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as DocumentWorkspace } from "./document-workspace-CPfqjxs8.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/documents.$id.tsx?tsr-split=component
function DocumentDetail() {
	const { id } = Route.useParams();
	console.log("[TRACE-1] Route param id:", id, "type:", typeof id);
	const docId = Number(id);
	console.log("[TRACE-2] Converted docId:", docId, "isNaN:", isNaN(docId));
	const doc = useDocument(docId);
	if (doc.isLoading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-[calc(100vh-8rem)] w-full" });
	if (!doc.data) return /* @__PURE__ */ jsx("div", {
		className: "text-sm text-muted-foreground",
		children: "Document not found."
	});
	return /* @__PURE__ */ jsx(DocumentWorkspace, {
		folderId: doc.data.folderId || "",
		docId
	});
}
//#endregion
export { DocumentDetail as component };
