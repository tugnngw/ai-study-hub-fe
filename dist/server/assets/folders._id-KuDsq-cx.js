import { t as Route } from "./folders._id-CBv2fIhD.js";
import { t as DocumentWorkspace } from "./document-workspace-DldjrmuM.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/folders.$id.tsx?tsr-split=component
function FolderDetail() {
	const { id } = Route.useParams();
	const { docId } = Route.useSearch();
	const doc = useDocument(docId ?? "");
	const navigate = useNavigate();
	useEffect(() => {
		if (doc.data?.status?.toUpperCase() === "BANNED") navigate({
			to: "/folders/$id",
			params: { id },
			search: {}
		});
	}, [
		doc.data,
		id,
		navigate
	]);
	return /* @__PURE__ */ jsx(DocumentWorkspace, {
		folderId: id,
		docId
	});
}
//#endregion
export { FolderDetail as component };
