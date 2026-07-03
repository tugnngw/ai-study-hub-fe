import { t as Route } from "./documents._id-Dj1ZYst9.js";
import { a as useDocument } from "./queries-CTUrUBWQ.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as DocumentWorkspace } from "./document-workspace-Df4hWaEq.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/documents.$id.tsx?tsr-split=component
function DocumentDetail() {
	const { id } = Route.useParams();
	const doc = useDocument(id);
	if (doc.isLoading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-[calc(100vh-8rem)] w-full" });
	if (!doc.data) return /* @__PURE__ */ jsx("div", {
		className: "text-sm text-muted-foreground",
		children: "Document not found."
	});
	return /* @__PURE__ */ jsx(DocumentWorkspace, {
		folderId: doc.data.folderId || "",
		docId: id
	});
}
//#endregion
export { DocumentDetail as component };
