import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B5SRUUUO.js";
import { c as useDownloadDocument, h as useReportDocument, r as useDeleteDocument } from "./queries-DZC_51lm.js";
import { t as Textarea } from "./textarea-1llmCJsE.js";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DXMm4jWj.js";
import { t as usePinnedDocuments } from "./preferences-D2yi1BRo.js";
import * as React$1 from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Circle, Download, Flag, FolderOpen, MoreVertical, Pin, PinOff, Trash2 } from "lucide-react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
//#region src/components/ui/radio-group.tsx
var RadioGroup = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React$1.forwardRef(({ className, ...props }, ref) => {
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
//#region src/components/document-actions-menu.tsx
function DocumentActionsMenu({ documentId, folderId, title, className, iconClassName }) {
	const navigate = useNavigate();
	const del = useDeleteDocument();
	const download = useDownloadDocument();
	const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
	const pinned = isPinned(documentId);
	const [reportOpen, setReportOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const handleDelete = async () => {
		try {
			await del.mutateAsync(documentId);
			toast.success("Đã xóa tài liệu");
			setDeleteOpen(false);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Xóa thất bại");
		}
	};
	const handleDownload = async () => {
		try {
			const res = await download.mutateAsync(documentId);
			window.open(res.url, "_blank");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Tải xuống thất bại");
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: (e) => e.stopPropagation(),
				className: className ?? "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0",
				title: "Tùy chọn",
				children: /* @__PURE__ */ jsx(MoreVertical, { className: iconClassName ?? "h-4 w-4" })
			})
		}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
			align: "end",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: () => navigate({
						to: "/ai",
						search: {
							folderId,
							docId: documentId
						}
					}),
					children: [/* @__PURE__ */ jsx(FolderOpen, { className: "h-3.5 w-3.5 mr-2" }), " Mở"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: handleDownload,
					disabled: download.isPending,
					children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-2" }), " Tải xuống"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: () => setReportOpen(true),
					children: [/* @__PURE__ */ jsx(Flag, { className: "h-3.5 w-3.5 mr-2" }), " Báo cáo"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: () => setDeleteOpen(true),
					className: "text-destructive focus:text-destructive",
					children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5 mr-2" }), " Xóa"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: () => {
						togglePin(documentId);
						toast.success(pinned ? "Đã bỏ ghim tài liệu" : "Đã ghim tài liệu");
					},
					children: [pinned ? /* @__PURE__ */ jsx(PinOff, { className: "h-3.5 w-3.5 mr-2" }) : /* @__PURE__ */ jsx(Pin, { className: "h-3.5 w-3.5 mr-2" }), pinned ? "Bỏ ghim" : "Ghim"]
				})
			]
		})] }),
		/* @__PURE__ */ jsx(ReportDocumentDialog, {
			open: reportOpen,
			onOpenChange: setReportOpen,
			documentId,
			documentTitle: title
		}),
		/* @__PURE__ */ jsx(ConfirmDeleteDialog, {
			open: deleteOpen,
			onOpenChange: setDeleteOpen,
			title,
			onConfirm: handleDelete,
			isPending: del.isPending
		})
	] });
}
//#endregion
export { DocumentActionsMenu as t };
