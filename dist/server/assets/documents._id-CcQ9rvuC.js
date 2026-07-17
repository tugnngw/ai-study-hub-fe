import { t as Route } from "./documents._id-BwgDM5Gn.js";
import { o as useDocument } from "./queries-CXmbvism.js";
import { t as Skeleton } from "./skeleton-GQcXPnHo.js";
import { t as DocumentWorkspace } from "./document-workspace-DmTMflSX.js";
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
