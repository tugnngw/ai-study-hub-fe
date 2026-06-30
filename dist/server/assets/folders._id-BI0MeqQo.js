import { t as Route } from "./folders._id-BgLa6LZI.js";
import { t as DocumentWorkspace } from "./document-workspace-C-mHKsFQ.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/folders.$id.tsx?tsr-split=component
function FolderDetail() {
	const { id } = Route.useParams();
	const { docId } = Route.useSearch();
	return /* @__PURE__ */ jsx(DocumentWorkspace, {
		folderId: id,
		docId
	});
}
//#endregion
export { FolderDetail as component };
