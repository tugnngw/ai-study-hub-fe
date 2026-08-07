import { t as Route } from "./folders._id-CiNjhHfa.js";
import { f as useFolder } from "./queries-BOxd9l6F.js";
import { t as Button } from "./button-C90jjaif.js";
import { t as DocumentWorkspace } from "./DocumentWorkspace-CJfrshFo.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FolderX } from "lucide-react";
//#region src/routes/_authenticated/folders.$id.tsx?tsr-split=component
function FolderDetail() {
	const { id } = Route.useParams();
	const { docId } = Route.useSearch();
	const folder = useFolder(id);
	const navigate = useNavigate();
	if (folder.isLoading) return null;
	if (folder.error || !folder.data) return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center h-[60vh] gap-4 text-center",
		children: [
			/* @__PURE__ */ jsx(FolderX, { className: "h-16 w-16 text-muted-foreground/50" }),
			/* @__PURE__ */ jsx("h2", {
				className: "text-xl font-semibold",
				children: "Thư mục không tồn tại hoặc đã bị xoá"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground max-w-sm",
				children: "Thư mục này có thể đã bị xoá hoặc bạn không có quyền truy cập. Hãy khôi phục từ thùng rác nếu bạn muốn sử dụng lại."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-3 mt-2",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => navigate({ to: "/folders" }),
					children: "Quay lại thư mục"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => navigate({ to: "/trash" }),
					children: "Mở thùng rác"
				})]
			})
		]
	});
	return /* @__PURE__ */ jsx(DocumentWorkspace, {
		folderId: id,
		docId: docId || ""
	});
}
//#endregion
export { FolderDetail as component };
