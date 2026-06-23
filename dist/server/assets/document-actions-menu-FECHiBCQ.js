import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { n as Input, t as Label } from "./label-B7oQAA24.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { _ as useShareFolder, m as useReportDocument, p as useOwnedShares, r as useDeleteDocument } from "./queries-CwH5qVX2.js";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BtjXROHi.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as ConfirmDeleteDialog } from "./confirm-delete-dialog-j3v19bHv.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Check, Circle, Copy, Flag, FolderOpen, MoreVertical, Share2, Trash2, Users } from "lucide-react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
//#region src/components/share-document-dialog.tsx
function ShareDocumentDialog({ open, onOpenChange, documentTitle, folderId }) {
	const share = useShareFolder();
	const { data: shares, isLoading } = useOwnedShares();
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		if (!open) {
			setEmailOrUsername("");
			setCopied(false);
		}
	}, [open]);
	const link = `http://localhost:5174/shared/${folderId}`;
	const handleInvite = async () => {
		const value = emailOrUsername.trim();
		if (!value) return;
		const isEmail = /^\S+@\S+\.\S+$/.test(value);
		try {
			await share.mutateAsync({
				folderId,
				email: isEmail ? value : void 0,
				username: isEmail ? void 0 : value
			});
			setEmailOrUsername("");
			toast.success(`Đã mời ${value}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Mời thất bại");
		}
	};
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			toast.success("Đã sao chép liên kết");
			setTimeout(() => setCopied(false), 1500);
		} catch {
			toast.error("Không thể sao chép liên kết");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
				className: "truncate",
				children: [
					"Chia sẻ \"",
					documentTitle,
					"\""
				]
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Mời người khác xem hoặc sao chép liên kết chia sẻ." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Mời người dùng" }), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Input, {
								type: "text",
								placeholder: "email@example.com hoặc username",
								value: emailOrUsername,
								onChange: (e) => setEmailOrUsername(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleInvite();
									}
								}
							}), /* @__PURE__ */ jsx(Button, {
								onClick: handleInvite,
								disabled: share.isPending || !emailOrUsername.trim(),
								children: share.isPending ? "Đang mời..." : "Mời"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1.5 text-sm font-medium",
							children: [
								/* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
								"Đã chia sẻ (",
								isLoading ? "..." : shares?.length ?? 0,
								")"
							]
						}), !shares || shares.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Chưa chia sẻ với ai."
						}) : /* @__PURE__ */ jsx("ul", {
							className: "space-y-1 max-h-32 overflow-y-auto",
							children: shares.map((s) => /* @__PURE__ */ jsx("li", {
								className: "text-sm rounded-md bg-muted/50 px-2.5 py-1.5 truncate",
								children: s.sharedUsername ?? s.sharedEmail ?? "Unknown"
							}, s.id))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Liên kết chia sẻ" }), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Input, {
								value: link,
								readOnly: true,
								className: "text-muted-foreground"
							}), /* @__PURE__ */ jsx(Button, {
								variant: "outline",
								size: "icon",
								onClick: handleCopy,
								title: "Sao chép liên kết",
								children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Đóng"
			}) })
		] })
	});
}
//#endregion
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
//#region src/components/document-actions-menu.tsx
function DocumentActionsMenu({ documentId, folderId, title, className, iconClassName }) {
	const navigate = useNavigate();
	const del = useDeleteDocument();
	const [shareOpen, setShareOpen] = useState(false);
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
					onClick: () => setShareOpen(true),
					children: [/* @__PURE__ */ jsx(Share2, { className: "h-3.5 w-3.5 mr-2" }), " Chia sẻ"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: () => setReportOpen(true),
					children: [/* @__PURE__ */ jsx(Flag, { className: "h-3.5 w-3.5 mr-2" }), " Báo cáo"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: () => setDeleteOpen(true),
					className: "text-destructive focus:text-destructive",
					children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5 mr-2" }), " Xóa"]
				})
			]
		})] }),
		/* @__PURE__ */ jsx(ShareDocumentDialog, {
			open: shareOpen,
			onOpenChange: setShareOpen,
			documentTitle: title,
			folderId
		}),
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
