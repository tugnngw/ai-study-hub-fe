import { t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { t as Label } from "./label-B39qiR2q.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-C3MnOk9C.js";
import { O as useReportDocument } from "./queries-CXmbvism.js";
import { t as Textarea } from "./textarea-CY1CNB-1.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Circle } from "lucide-react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
//#region src/components/ui/radio-group.tsx
var RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//#endregion
//#region src/components/report-document-dialog.tsx
var REPORT_REASONS = [
	{
		value: "copyright",
		label: "Nội dung vi phạm bản quyền"
	},
	{
		value: "misinformation",
		label: "Thông tin sai lệch / gây hiểu lầm"
	},
	{
		value: "inappropriate",
		label: "Nội dung không phù hợp / phản cảm"
	},
	{
		value: "privacy",
		label: "Vi phạm quyền riêng tư"
	},
	{
		value: "other",
		label: "Lý do khác"
	}
];
function ReportDocumentDialog({ open, onOpenChange, documentId, documentTitle }) {
	const report = useReportDocument();
	const [reason, setReason] = useState("");
	const [description, setDescription] = useState("");
	useEffect(() => {
		if (!open) {
			setReason("");
			setDescription("");
		}
	}, [open]);
	const submit = async () => {
		if (!reason) {
			toast.error("Vui lòng chọn lý do báo cáo");
			return;
		}
		try {
			await report.mutateAsync({
				id: documentId,
				reason,
				description: description.trim() || void 0
			});
			toast.success("Đã gửi báo cáo, cảm ơn bạn!");
			onOpenChange(false);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Gửi báo cáo thất bại");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
				className: "truncate",
				children: [
					"Báo cáo \"",
					documentTitle,
					"\""
				]
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Cho chúng tôi biết vấn đề bạn gặp phải với tài liệu này." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label, { children: "Lý do báo cáo" }), /* @__PURE__ */ jsx(RadioGroup, {
						value: reason,
						onValueChange: setReason,
						className: "space-y-2",
						children: REPORT_REASONS.map((r) => /* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 text-sm rounded-md border border-border/60 px-3 py-2 cursor-pointer hover:bg-accent/40",
							children: [/* @__PURE__ */ jsx(RadioGroupItem, { value: r.value }), r.label]
						}, r.value))
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label, { children: "Mô tả thêm (tùy chọn)" }), /* @__PURE__ */ jsx(Textarea, {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						placeholder: "Cung cấp chi tiết để chúng tôi xử lý nhanh hơn...",
						rows: 3
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Hủy"
			}), /* @__PURE__ */ jsx(Button, {
				variant: "destructive",
				onClick: submit,
				disabled: report.isPending,
				children: report.isPending ? "Đang gửi..." : "Gửi báo cáo"
			})] })
		] })
	});
}
//#endregion
export { ReportDocumentDialog as t };
