import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B5SRUUUO.js";
import { C as useSubjectsBySemester, T as useUpdateDocument, b as useSemesters, f as useFolders, i as useDeleteDocument, l as useDownloadDocument, v as useReportDocument } from "./queries-5wiHfXhj.js";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DXMm4jWj.js";
import { t as Textarea } from "./textarea-1llmCJsE.js";
import { t as usePinnedDocuments } from "./preferences-D2yi1BRo.js";
import { t as ShareEntityDialog } from "./share-entity-dialog-BI4q0sJs.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BHv1JhlL.js";
import * as React$1 from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Circle, Download, Flag, FolderOpen, MoreVertical, Pencil, Pin, PinOff, Share2, Trash2 } from "lucide-react";
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
//#region src/components/edit-document-dialog.tsx
function EditDocumentDialog({ open, onOpenChange, documentId, initial }) {
	const folders = useFolders();
	const semesters = useSemesters();
	const update = useUpdateDocument();
	const [title, setTitle] = useState(initial.title);
	const [description, setDescription] = useState(initial.description ?? "");
	const [folderId, setFolderId] = useState(initial.folderId ?? "");
	const [semesterId, setSemesterId] = useState("");
	const [subjectId, setSubjectId] = useState(initial.subjectId ?? "");
	const subjects = useSubjectsBySemester(semesterId);
	useEffect(() => {
		if (!open) return;
		setTitle(initial.title);
		setDescription(initial.description ?? "");
		setFolderId(initial.folderId ?? "");
		setSubjectId(initial.subjectId ?? "");
		setSemesterId("");
	}, [open, initial]);
	const subjectsInSemester = useMemo(() => subjects.data ?? [], [subjects.data]);
	useEffect(() => {
		if (!open) return;
		if (initial.subjectId && semesters.data) {}
	}, [
		open,
		initial.subjectId,
		semesters.data
	]);
	const submit = async () => {
		if (!title.trim()) return toast.error("Nhập tiêu đề");
		try {
			await update.mutateAsync({
				id: documentId,
				title,
				description,
				folderId: folderId || void 0
			});
			toast.success("Đã cập nhật tài liệu");
			onOpenChange(false);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Cập nhật thất bại");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Chỉnh sửa tài liệu" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Cập nhật tiêu đề, mô tả, kỳ, môn và thư mục của tài liệu." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Tiêu đề" }), /* @__PURE__ */ jsx(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Mô tả" }), /* @__PURE__ */ jsx(Textarea, {
							value: description,
							onChange: (e) => setDescription(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Kỳ học" }), /* @__PURE__ */ jsxs(Select, {
								value: semesterId,
								onValueChange: (v) => {
									setSemesterId(v);
									setSubjectId("");
								},
								children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Chọn kỳ" }) }), /* @__PURE__ */ jsx(SelectContent, { children: (semesters.data ?? []).map((s) => /* @__PURE__ */ jsx(SelectItem, {
									value: s.id,
									children: s.name
								}, s.id)) })]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Môn học" }), /* @__PURE__ */ jsxs(Select, {
								value: subjectId,
								onValueChange: setSubjectId,
								disabled: !semesterId,
								children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: semesterId ? "Chọn môn" : "Chọn kỳ trước" }) }), /* @__PURE__ */ jsx(SelectContent, { children: subjectsInSemester.length === 0 ? /* @__PURE__ */ jsx("div", {
									className: "px-3 py-2 text-sm text-muted-foreground",
									children: "Không có môn trong kỳ này"
								}) : subjectsInSemester.map((s) => /* @__PURE__ */ jsxs(SelectItem, {
									value: s.id,
									children: [
										s.code ?? s.name,
										" – ",
										s.name
									]
								}, s.id)) })]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Thư mục" }), /* @__PURE__ */ jsxs(Select, {
							value: folderId,
							onValueChange: setFolderId,
							children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Chọn thư mục" }) }), /* @__PURE__ */ jsx(SelectContent, { children: (folders.data ?? []).map((f) => /* @__PURE__ */ jsx(SelectItem, {
								value: String(f.id),
								children: f.name
							}, f.id)) })]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Huỷ"
			}), /* @__PURE__ */ jsx(Button, {
				onClick: submit,
				disabled: update.isPending,
				children: update.isPending ? "Đang lưu…" : "Lưu thay đổi"
			})] })
		] })
	});
}
//#endregion
//#region src/components/document-actions-menu.tsx
function DocumentActionsMenu({ documentId, folderId, title, status, description, subjectId, className, iconClassName }) {
	const navigate = useNavigate();
	const del = useDeleteDocument();
	const download = useDownloadDocument();
	const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
	const pinned = isPinned(documentId);
	const isRejected = status?.toUpperCase() === "REJECT";
	const [reportOpen, setReportOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [shareOpen, setShareOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
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
					onClick: () => setEditOpen(true),
					children: [/* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5 mr-2" }), " Sửa thông tin"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: handleDownload,
					disabled: download.isPending,
					children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-2" }), " Tải xuống"]
				}),
				/* @__PURE__ */ jsxs(DropdownMenuItem, {
					onClick: () => {
						if (isRejected) {
							toast.error("Tài liệu bị từ chối duyệt, không thể chia sẻ");
							return;
						}
						setShareOpen(true);
					},
					disabled: isRejected,
					className: isRejected ? "opacity-50 cursor-not-allowed" : "",
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
		}),
		/* @__PURE__ */ jsx(ShareEntityDialog, {
			open: shareOpen,
			onOpenChange: setShareOpen,
			title,
			documentId
		}),
		/* @__PURE__ */ jsx(EditDocumentDialog, {
			open: editOpen,
			onOpenChange: setEditOpen,
			documentId,
			initial: {
				title,
				description,
				folderId,
				subjectId
			}
		})
	] });
}
//#endregion
export { DocumentActionsMenu as t };
