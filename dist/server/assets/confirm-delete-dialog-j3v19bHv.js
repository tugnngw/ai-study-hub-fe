import { t as Button } from "./button-BkEeRci-.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/confirm-delete-dialog.tsx
function ConfirmDeleteDialog({ open, onOpenChange, title, description, onConfirm, isPending }) {
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "truncate",
			children: [
				"Xóa \"",
				title,
				"\"?"
			]
		}), /* @__PURE__ */ jsx(DialogDescription, { children: description ?? "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác." })] }), /* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
			variant: "outline",
			onClick: () => onOpenChange(false),
			children: "Hủy"
		}), /* @__PURE__ */ jsx(Button, {
			variant: "destructive",
			onClick: onConfirm,
			disabled: isPending,
			children: isPending ? "Đang xóa..." : "Xóa"
		})] })] })
	});
}
//#endregion
export { ConfirmDeleteDialog as t };
