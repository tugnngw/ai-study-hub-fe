import { c as shareApi } from "./realApi-C5uV909C.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { n as buttonVariants, t as Button } from "./button-OuFjfcpS.js";
import { n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B5SRUUUO.js";
import { d as useFolders, i as useDeleteFolder, n as useCreateFolder, y as useUpdateFolder } from "./queries-DZC_51lm.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DXMm4jWj.js";
import { n as useStarredFolders } from "./preferences-D2yi1BRo.js";
import * as React$1 from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FolderKanban, MoreVertical, Pencil, Plus, Search, Share2, Star, Trash2 } from "lucide-react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
//#endregion
//#region src/routes/_authenticated/folders.tsx?tsr-split=component
function FoldersPage() {
	const { data, isLoading } = useFolders();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [deleting, setDeleting] = useState(null);
	const [sharing, setSharing] = useState(null);
	const { isMarked: isStarred, toggle: toggleStar } = useStarredFolders();
	const filtered = (data ?? []).filter((f) => f.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => Number(isStarred(b.id)) - Number(isStarred(a.id)));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Folders"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-1",
					children: "Organize your documents"
				})] }), /* @__PURE__ */ jsxs(Button, {
					onClick: () => {
						setEditing(null);
						setOpen(true);
					},
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }), " New folder"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative max-w-sm",
				children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
					placeholder: "Search folders...",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					className: "pl-9"
				})]
			}),
			isLoading ? /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-32" }, i))
			}) : filtered.length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-16 text-center",
				children: [/* @__PURE__ */ jsx(FolderKanban, { className: "h-10 w-10 mx-auto text-muted-foreground/50" }), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "No folders found."
				})]
			}) }) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((f) => /* @__PURE__ */ jsxs(Card, {
					className: cn("group hover:border-primary/40 transition-colors relative", isStarred(f.id) && "border-amber-400/60 bg-amber-50/40 dark:bg-amber-400/5"),
					children: [isStarred(f.id) && /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 absolute top-3 right-3 fill-amber-400 text-amber-400" }), /* @__PURE__ */ jsxs(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/ai",
							search: { folderId: f.id },
							className: "block",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center",
									children: /* @__PURE__ */ jsx(FolderKanban, { className: "h-5 w-5 text-primary" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-medium truncate pr-5",
										children: f.name
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground line-clamp-2 mt-1",
										children: f.aiSummary || "No summary"
									})]
								})]
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity",
							children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx(Button, {
									size: "sm",
									variant: "ghost",
									children: /* @__PURE__ */ jsx(MoreVertical, { className: "h-3.5 w-3.5" })
								})
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								children: [
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: () => setSharing(f),
										children: [/* @__PURE__ */ jsx(Share2, { className: "h-3.5 w-3.5 mr-2" }), "Share"]
									}),
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: () => toggleStar(f.id),
										children: [/* @__PURE__ */ jsx(Star, { className: cn("h-3.5 w-3.5 mr-2", isStarred(f.id) && "fill-amber-400 text-amber-400") }), "Star"]
									}),
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: () => {
											setEditing(f);
											setOpen(true);
										},
										children: [/* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5 mr-2" }), "Edit"]
									}),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: () => setDeleting(f),
										className: "text-destructive focus:text-destructive",
										children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5 mr-2" }), "Delete"]
									})
								]
							})] })
						})]
					})]
				}, f.id))
			}),
			/* @__PURE__ */ jsx(FolderFormDialog, {
				open,
				onOpenChange: setOpen,
				folder: editing
			}),
			/* @__PURE__ */ jsx(DeleteFolderDialog, {
				folder: deleting,
				onClose: () => setDeleting(null)
			}),
			/* @__PURE__ */ jsx(ShareFolderDialog, {
				folder: sharing,
				onClose: () => setSharing(null)
			})
		]
	});
}
function FolderFormDialog({ open, onOpenChange, folder }) {
	const create = useCreateFolder();
	const update = useUpdateFolder();
	const [name, setName] = useState(folder?.name ?? "");
	if (open && folder && folder.name !== name && name === "") setName(folder.name);
	const submit = async () => {
		if (!name.trim()) return toast.error("Name is required");
		try {
			if (folder) {
				await update.mutateAsync({
					id: folder.id,
					name
				});
				toast.success("Folder updated");
			} else {
				await create.mutateAsync({ name });
				toast.success("Folder created");
			}
			onOpenChange(false);
			setName("");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: (v) => {
			onOpenChange(v);
			if (!v) setName("");
		},
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: folder ? "Edit folder" : "New folder" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Organize related documents together." })] }),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label, { children: "Name" }), /* @__PURE__ */ jsx(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "e.g. Contracts"
					})]
				})
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Cancel"
			}), /* @__PURE__ */ jsx(Button, {
				onClick: submit,
				disabled: create.isPending || update.isPending,
				children: folder ? "Save" : "Create"
			})] })
		] })
	});
}
function DeleteFolderDialog({ folder, onClose }) {
	const del = useDeleteFolder();
	return /* @__PURE__ */ jsx(AlertDialog, {
		open: !!folder,
		onOpenChange: (v) => {
			if (!v) onClose();
		},
		children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete folder?" }), /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
			"This will delete “",
			folder?.name,
			"”. This action cannot be undone."
		] })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ jsx(AlertDialogAction, {
			onClick: async () => {
				if (!folder) return;
				try {
					await del.mutateAsync(folder.id);
					toast.success("Folder deleted");
					onClose();
				} catch (e) {
					toast.error(e instanceof Error ? e.message : "Failed");
				}
			},
			children: "Delete"
		})] })] })
	});
}
function ShareFolderDialog({ folder, onClose }) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const shareMutation = useMutation({
		mutationFn: (data) => shareApi.shareFolder(data),
		onSuccess: () => {
			toast.success("Folder shared successfully");
			onClose();
			setEmail("");
			setUsername("");
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to share folder");
		}
	});
	const handleShare = async () => {
		if (!folder) return;
		if (!email.trim() && !username.trim()) {
			toast.error("Please enter email or username");
			return;
		}
		const request = {
			folderId: folder.id,
			visibility: "private"
		};
		if (email.trim()) request.email = email.trim();
		if (username.trim()) request.username = username.trim();
		await shareMutation.mutateAsync(request);
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open: !!folder,
		onOpenChange: (v) => {
			if (!v) onClose();
		},
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Share folder" }), /* @__PURE__ */ jsxs(DialogDescription, { children: [
				"Share “",
				folder?.name,
				"” with another user"
			] })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ jsx(Input, {
							id: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "user@example.com"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "username",
							children: "Username"
						}), /* @__PURE__ */ jsx(Input, {
							id: "username",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							placeholder: "username"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: "Enter either email or username of the user you want to share with."
					})
				]
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: onClose,
				children: "Cancel"
			}), /* @__PURE__ */ jsx(Button, {
				onClick: handleShare,
				disabled: shareMutation.isPending,
				children: "Share"
			})] })
		] })
	});
}
//#endregion
export { FoldersPage as component };
