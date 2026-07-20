import { t as Button } from "./button-pc6NSNyO.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-C3MnOk9C.js";
import { A as useSemesters, L as useUpdateDocument, P as useSubjectsBySemester, l as useDownloadDocument, p as useFolders, r as useDeleteDocument } from "./queries-BaPhj2xN.js";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CMUoSIKJ.js";
import { t as Textarea } from "./textarea-CY1CNB-1.js";
import { t as usePinnedDocuments } from "./preferences-D2yi1BRo.js";
import { t as ReportDocumentDialog } from "./report-document-dialog-C3WrZe3q.js";
import { t as ShareEntityDialog } from "./share-entity-dialog-CYNtaCyS.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CBPWXxKu.js";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Download, Flag, FolderOpen, MoreVertical, Pencil, Pin, PinOff, Share2, Trash2 } from "lucide-react";
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
