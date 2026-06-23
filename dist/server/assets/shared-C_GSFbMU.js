import { t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { n as Input, t as Label } from "./label-B7oQAA24.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { a as useDeleteSharedDocument, f as useFolders, g as useSaveSharedDocument, n as useCreateFolder, v as useSharedDocuments } from "./queries-CwH5qVX2.js";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BtjXROHi.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as ConfirmDeleteDialog } from "./confirm-delete-dialog-j3v19bHv.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.js";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Download, FileText, MoreVertical, Plus, Trash2, Users } from "lucide-react";
//#region src/components/save-shared-document-dialog.tsx
var NEW_FOLDER_VALUE = "__new__";
function SaveSharedDocumentDialog({ open, onOpenChange, sharedId, defaultTitle, defaultDescription }) {
	const folders = useFolders();
	const createFolder = useCreateFolder();
	const save = useSaveSharedDocument();
	const [folderId, setFolderId] = useState("");
	const [newFolderName, setNewFolderName] = useState("");
	const [title, setTitle] = useState(defaultTitle);
	const [description, setDescription] = useState(defaultDescription ?? "");
	useEffect(() => {
		if (open) {
			setTitle(defaultTitle);
			setDescription(defaultDescription ?? "");
			setFolderId("");
			setNewFolderName("");
		}
	}, [
		open,
		defaultTitle,
		defaultDescription
	]);
	const submit = async () => {
		if (!title.trim()) {
			toast.error("Vui lòng nhập tiêu đề");
			return;
		}
		let targetFolderId = null;
		try {
			if (folderId === NEW_FOLDER_VALUE) {
				if (!newFolderName.trim()) {
					toast.error("Vui lòng nhập tên thư mục mới");
					return;
				}
				targetFolderId = (await createFolder.mutateAsync({ name: newFolderName.trim() })).id;
			} else if (folderId) targetFolderId = folderId;
			else {
				toast.error("Vui lòng chọn thư mục lưu trữ");
				return;
			}
			await save.mutateAsync({
				sharedId,
				folderId: targetFolderId,
				title: title.trim(),
				description: description.trim() || void 0
			});
			toast.success("Đã lưu tài liệu vào thư mục");
			onOpenChange(false);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Lưu thất bại");
		}
	};
	const isPending = createFolder.isPending || save.isPending;
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Lưu tài liệu" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Lưu tài liệu được chia sẻ vào thư mục của bạn." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsx(Label, { children: "Thư mục lưu trữ" }),
							/* @__PURE__ */ jsxs(Select, {
								value: folderId,
								onValueChange: setFolderId,
								children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Chọn thư mục" }) }), /* @__PURE__ */ jsxs(SelectContent, { children: [(folders.data ?? []).map((f) => /* @__PURE__ */ jsx(SelectItem, {
									value: String(f.id),
									children: f.name
								}, f.id)), /* @__PURE__ */ jsx(SelectItem, {
									value: NEW_FOLDER_VALUE,
									children: /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }), " Tạo thư mục mới"]
									})
								})] })]
							}),
							folderId === NEW_FOLDER_VALUE && /* @__PURE__ */ jsx(Input, {
								placeholder: "Tên thư mục mới",
								value: newFolderName,
								onChange: (e) => setNewFolderName(e.target.value),
								className: "mt-2"
							})
						]
					}),
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
							onChange: (e) => setDescription(e.target.value),
							rows: 3
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Hủy"
			}), /* @__PURE__ */ jsx(Button, {
				onClick: submit,
				disabled: isPending,
				children: isPending ? "Đang lưu..." : "Lưu"
			})] })
		] })
	});
}
//#endregion
//#region src/components/shared-document-actions-menu.tsx
function SharedDocumentActionsMenu({ sharedId, title, description, className, iconClassName }) {
	const del = useDeleteSharedDocument();
	const [saveOpen, setSaveOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const handleDelete = async () => {
		try {
			await del.mutateAsync(sharedId);
			toast.success("Đã xóa khỏi danh sách được chia sẻ");
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
			children: [/* @__PURE__ */ jsxs(DropdownMenuItem, {
				onClick: () => setSaveOpen(true),
				children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-2" }), " Lưu"]
			}), /* @__PURE__ */ jsxs(DropdownMenuItem, {
				onClick: () => setDeleteOpen(true),
				className: "text-destructive focus:text-destructive",
				children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5 mr-2" }), " Xóa"]
			})]
		})] }),
		/* @__PURE__ */ jsx(SaveSharedDocumentDialog, {
			open: saveOpen,
			onOpenChange: setSaveOpen,
			sharedId,
			defaultTitle: title,
			defaultDescription: description
		}),
		/* @__PURE__ */ jsx(ConfirmDeleteDialog, {
			open: deleteOpen,
			onOpenChange: setDeleteOpen,
			title,
			description: "Bạn có chắc chắn muốn xóa tài liệu này khỏi danh sách được chia sẻ?",
			onConfirm: handleDelete,
			isPending: del.isPending
		})
	] });
}
//#endregion
//#region src/routes/_authenticated/shared.tsx?tsr-split=component
function SharedPage() {
	const { data, isLoading } = useSharedDocuments();
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-semibold tracking-tight",
			children: "Được chia sẻ với tôi"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Các tài liệu mà người khác đã chia sẻ tới bạn."
		})] }), isLoading ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, {
			className: "py-12 text-center text-sm",
			children: "Đang tải…"
		}) }) : (data ?? []).length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
			className: "py-16 text-center",
			children: [/* @__PURE__ */ jsx(Users, { className: "h-10 w-10 mx-auto text-muted-foreground/50" }), /* @__PURE__ */ jsx("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "Chưa có tài liệu được chia sẻ"
			})]
		}) }) : /* @__PURE__ */ jsx("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: (data ?? []).map((d) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "p-4 flex items-start gap-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-primary" })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "font-medium truncate",
								children: d.title
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground truncate",
								children: d.description
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: [
									"Chia sẻ bởi:",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "font-medium",
										children: d.sharedBy
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsx(SharedDocumentActionsMenu, {
						sharedId: d.id,
						title: d.title,
						description: d.description ?? void 0
					})
				]
			}) }, d.id))
		})]
	});
}
//#endregion
export { SharedPage as component };
