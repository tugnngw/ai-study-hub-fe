import { t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { I as useTrash, k as useRestoreFromTrash, u as useEmptyTrash } from "./queries-DWCqaZ92.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { FileText, RotateCcw, Trash2 } from "lucide-react";
//#region src/routes/_authenticated/trash.tsx?tsr-split=component
function TrashPage() {
	const { data, isLoading } = useTrash();
	const restore = useRestoreFromTrash();
	const erase = useEmptyTrash();
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-semibold tracking-tight",
			children: "Thùng rác"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Các tài liệu đã xoá sẽ ở đây. Bạn có thể khôi phục hoặc xoá vĩnh viễn."
		})] }), isLoading ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, {
			className: "py-12 text-center text-sm",
			children: "Đang tải…"
		}) }) : (data ?? []).length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
			className: "py-16 text-center",
			children: [/* @__PURE__ */ jsx(Trash2, { className: "h-10 w-10 mx-auto text-muted-foreground/50" }), /* @__PURE__ */ jsx("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "Thùng rác trống"
			})]
		}) }) : /* @__PURE__ */ jsx("div", {
			className: "border border-border rounded-lg overflow-hidden",
			children: (data ?? []).map((d) => /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 px-4 py-3 border-b border-border last:border-0",
				children: [
					/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm font-medium truncate",
							children: d.title
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground truncate",
							children: d.description
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => restore.mutate(d.id),
						disabled: restore.isPending,
						children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-2" }), " Khôi phục"]
					}),
					/* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: "ghost",
						className: "text-destructive",
						onClick: () => {
							if (confirm("Xoá vĩnh viễn?")) erase.mutate(d.id);
						},
						children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
					})
				]
			}, d.id))
		})]
	});
}
//#endregion
export { TrashPage as component };
