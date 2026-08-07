import { A as useReportDocument, R as useSubmitAppeal } from "./queries-BOxd9l6F.js";
import { t as cn } from "./utils-CZKD4yH6.js";
import { t as Button } from "./button-C90jjaif.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BwVCGmke.js";
import { t as Label } from "./label-HQjKAyB7.js";
import { t as Textarea } from "./textarea-B2WhzhFn.js";
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
var APPEAL_REASONS = [
	{
		value: "not_violation",
		label: "Tài liệu của tôi không vi phạm quy định"
	},
	{
		value: "misunderstood",
		label: "Nội dung bị hiểu lầm"
	},
	{
		value: "fixed",
		label: "Tôi đã chỉnh sửa / sẽ chỉnh sửa nội dung"
	},
	{
		value: "other",
		label: "Lý do khác"
	}
];
function ReportDocumentDialog({ open, onOpenChange, documentId, documentTitle, mode = "REPORT" }) {
	const report = useReportDocument();
	const appeal = useSubmitAppeal();
	const isAppeal = mode === "APPEAL";
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
			toast.error(isAppeal ? "Vui lòng chọn lý do kháng cáo" : "Vui lòng chọn lý do báo cáo");
			return;
		}
		try {
			await (isAppeal ? appeal : report).mutateAsync({
				id: documentId,
				reason,
				description: description.trim()
			});
			toast.success(isAppeal ? "Đã gửi kháng cáo, chờ quản trị viên xem xét!" : "Đã gửi báo cáo, cảm ơn bạn!");
			onOpenChange(false);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : isAppeal ? "Gửi kháng cáo thất bại" : "Gửi báo cáo thất bại");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
				className: "truncate",
				children: [
					isAppeal ? "Kháng cáo" : "Báo cáo",
					" \"",
					documentTitle,
					"\""
				]
			}), /* @__PURE__ */ jsx(DialogDescription, { children: isAppeal ? "Giải thích vì sao tài liệu của bạn không vi phạm quy định." : "Cho chúng tôi biết vấn đề bạn gặp phải với tài liệu này." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label, { children: isAppeal ? "Lý do kháng cáo" : "Lý do báo cáo" }), /* @__PURE__ */ jsx(RadioGroup, {
						value: reason,
						onValueChange: setReason,
						className: "space-y-2",
						children: (isAppeal ? APPEAL_REASONS : REPORT_REASONS).map((r) => /* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 text-sm rounded-md border border-border/60 px-3 py-2 cursor-pointer hover:bg-accent/40",
							children: [/* @__PURE__ */ jsx(RadioGroupItem, { value: r.value }), r.label]
						}, r.value))
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label, { children: "Mô tả thêm (tùy chọn)" }), /* @__PURE__ */ jsx(Textarea, {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						placeholder: isAppeal ? "Cung cấp chi tiết để quản trị viên xem xét..." : "Cung cấp chi tiết để chúng tôi xử lý nhanh hơn...",
						rows: 3,
						maxLength: 500
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
				disabled: (isAppeal ? appeal : report).isPending,
				children: (isAppeal ? appeal : report).isPending ? "Đang gửi..." : isAppeal ? "Gửi kháng cáo" : "Gửi báo cáo"
			})] })
		] })
	});
}
//#endregion
export { ReportDocumentDialog as t };
