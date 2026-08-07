import { t as Button } from "./button-C90jjaif.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BwVCGmke.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/confirm-delete-dialog.tsx
function ConfirmDeleteDialog({ open, onOpenChange, title, onConfirm, isPending }) {
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "sm:max-w-lg",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Xác nhận xóa" }), /* @__PURE__ */ jsx(DialogDescription, {
				asChild: true,
				children: /* @__PURE__ */ jsxs("span", { children: ["Bạn có chắc chắn muốn xóa tài liệu này?", /* @__PURE__ */ jsxs("span", {
					className: "font-medium text-foreground break-all block mt-2.5 rounded-md bg-muted/60 border border-border/60 px-3 py-2 text-xs",
					children: ["Tên file: ", title]
				})] })
			})] }), /* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Hủy"
			}), /* @__PURE__ */ jsx(Button, {
				variant: "destructive",
				onClick: onConfirm,
				disabled: isPending,
				children: isPending ? "Đang xóa..." : "Xóa"
			})] })]
		})
	});
}
//#endregion
export { ConfirmDeleteDialog as t };
