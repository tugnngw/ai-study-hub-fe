import { t as Button } from "./button-pc6NSNyO.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-C3MnOk9C.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Download, ExternalLink, FileText } from "lucide-react";
//#region src/features/admin/components/FilePreviewDialog.tsx
function FilePreviewDialog({ open, onOpenChange, title, url, mimeType }) {
	const isImage = (mimeType ?? "").startsWith("image/");
	const isPdf = (mimeType ?? "").includes("pdf") || (url ?? "").toLowerCase().endsWith(".pdf");
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-w-4xl",
			children: [
				/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, {
					className: "flex items-center gap-2 truncate",
					children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ jsxs("span", {
						className: "truncate",
						children: ["Xem trước: ", title]
					})]
				}) }),
				/* @__PURE__ */ jsx("div", {
					className: "h-[70vh] rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center",
					children: !url ? /* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground text-center px-6",
						children: "Không có đường dẫn xem trước cho file này."
					}) : isImage ? /* @__PURE__ */ jsx("img", {
						src: url,
						alt: title,
						className: "max-h-full max-w-full object-contain"
					}) : isPdf ? /* @__PURE__ */ jsx("iframe", {
						src: url,
						title,
						className: "w-full h-full"
					}) : /* @__PURE__ */ jsxs("div", {
						className: "text-center space-y-3 px-6",
						children: [
							/* @__PURE__ */ jsx(FileText, { className: "h-12 w-12 mx-auto text-muted-foreground/50" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Không hỗ trợ xem trước định dạng này trong trình duyệt."
							}),
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								children: /* @__PURE__ */ jsxs("a", {
									href: url,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1.5" }), " Mở ở tab mới"]
								})
							})
						]
					})
				}),
				url && /* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ jsxs("a", {
							href: url,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1.5" }), " Mở tab mới"]
						})
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ jsxs("a", {
							href: url,
							download: true,
							children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-1.5" }), " Tải xuống"]
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { FilePreviewDialog as t };
