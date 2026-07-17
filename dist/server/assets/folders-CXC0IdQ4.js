import { t as cn } from "./utils-C_uf36nf.js";
import { n as buttonVariants, t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { A as useSemesters, N as useSubjects, P as useSubjectsBySemester, R as useUpdateFolder, i as useDeleteFolder, p as useFolders, s as useDocuments, t as useCreateFolder } from "./queries-BnM1O96_.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BtjXROHi.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { n as useStarredFolders } from "./preferences-D2yi1BRo.js";
import { t as ShareEntityDialog } from "./share-entity-dialog-DnjfYqbR.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { BadgeCheck, BookOpen, FolderKanban, GraduationCap, Loader2, MoreVertical, Pencil, Plus, Search, Share2, Star, Trash2 } from "lucide-react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, {
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
var AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
//#endregion
//#region src/routes/_authenticated/folders.tsx?tsr-split=component
function FoldersPage() {
	const { data, isLoading } = useFolders();
	const { data: docs } = useDocuments();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [deleting, setDeleting] = useState(null);
	const [sharing, setSharing] = useState(null);
	const { isMarked: isStarred, toggle: toggleStar } = useStarredFolders();
	const folders = useFolders();
	const semesters = useSemesters();
	const allSubjects = useSubjects();
	const subjectMap = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		(allSubjects.data ?? []).forEach((s) => map.set(s.id, s));
		return map;
	}, [allSubjects.data]);
	const getSemesterName = (subjectId) => {
		if (!subjectId) return null;
		const subject = subjectMap.get(subjectId);
		if (!subject) return null;
		return semesters.data?.find((sem) => sem.id === subject.semesterId)?.name || null;
	};
	const editingSubjectId = useMemo(() => {
		if (!editing || !semesters.data || !folders.data) return "";
		return folders.data.find((f) => f.id === editing.id)?.subjectId ?? "";
	}, [
		editing,
		semesters.data,
		folders.data
	]);
	const countByFolder = useMemo(() => {
		const m = /* @__PURE__ */ new Map();
		(docs ?? []).forEach((d) => {
			if (d.folderId != null) m.set(String(d.folderId), (m.get(String(d.folderId)) ?? 0) + 1);
		});
		console.log("DEBUG DOCUMENT COUNT MAP:", Object.fromEntries(m));
		return m;
	}, [docs]);
	const folderCount = (f) => {
		const count = f.documentCount ?? countByFolder.get(String(f.id)) ?? 0;
		console.log(`DEBUG FOLDER ${f.name} (ID: ${f.id}) COUNT:`, count);
		return count;
	};
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
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "font-medium truncate pr-5",
											children: f.name
										}),
										/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground line-clamp-2 mt-1",
											children: f.description || f.aiSummary || "No summary"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap gap-2 mt-2",
											children: [getSemesterName(f.subjectId) && /* @__PURE__ */ jsx(Badge, {
												variant: "secondary",
												className: "text-[10px] px-1.5 py-0",
												children: getSemesterName(f.subjectId)
											}), f.subjectId && subjectMap.get(f.subjectId) && /* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												className: "text-[10px] px-1.5 py-0",
												children: subjectMap.get(f.subjectId).code
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-xs font-medium text-primary mt-1.5",
											children: [folderCount(f), " tài liệu"]
										})
									]
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
				folder: editing,
				initialSubjectId: editingSubjectId
			}),
			/* @__PURE__ */ jsx(DeleteFolderDialog, {
				folder: deleting,
				onClose: () => setDeleting(null)
			}),
			/* @__PURE__ */ jsx(ShareEntityDialog, {
				open: !!sharing,
				onOpenChange: (v) => {
					if (!v) setSharing(null);
				},
				title: sharing?.name ?? "",
				folderId: sharing?.id
			})
		]
	});
}
function FolderFormDialog({ open, onOpenChange, folder, initialSubjectId }) {
	const create = useCreateFolder();
	const update = useUpdateFolder();
	const semesters = useSemesters();
	const [name, setName] = useState(folder?.name ?? "");
	const [semesterId, setSemesterId] = useState("");
	const [subjectId, setSubjectId] = useState(initialSubjectId ?? "");
	const subjects = useSubjectsBySemester(semesterId);
	const [description, setDescription] = useState("");
	const selectedSubject = useMemo(() => (subjects.data ?? []).find((s) => s.id === subjectId), [subjects.data, subjectId]);
	const reset = () => {
		setName(folder?.name ?? "");
		setSemesterId("");
		setSubjectId(initialSubjectId ?? "");
		setDescription("");
	};
	const submit = async () => {
		if (!name.trim()) return toast.error("Name is required");
		if (!semesterId) return toast.error("Select a semester");
		if (!subjectId) return toast.error("Select a subject");
		try {
			if (folder) {
				await update.mutateAsync({
					id: folder.id,
					name: name.trim(),
					subjectId,
					description: description.trim() || void 0
				});
				toast.success("Folder updated");
			} else {
				await create.mutateAsync({
					name: name.trim(),
					subjectId,
					description: description.trim() || void 0
				});
				toast.success("Folder created");
			}
			onOpenChange(false);
			reset();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	const isPending = create.isPending || update.isPending;
	const canSubmit = name.trim() && semesterId && subjectId;
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: (v) => {
			onOpenChange(v);
			if (!v) reset();
		},
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(FolderKanban, { className: "h-5 w-5 text-primary" }), folder ? "Edit folder" : "New folder"]
			}), /* @__PURE__ */ jsx(DialogDescription, { children: folder ? "Update the folder details." : "Create a new folder to organize your documents." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs(Label, {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4 text-muted-foreground" }), "Semester"]
						}), /* @__PURE__ */ jsxs(Select, {
							value: semesterId,
							onValueChange: (v) => {
								setSemesterId(v);
								setSubjectId("");
							},
							disabled: semesters.isLoading,
							children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a semester" }) }), /* @__PURE__ */ jsx(SelectContent, { children: semesters.isLoading ? /* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-center p-3",
								children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" })
							}) : (semesters.data ?? []).map((s) => /* @__PURE__ */ jsx(SelectItem, {
								value: s.id,
								children: s.name
							}, s.id)) })]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs(Label, {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4 text-muted-foreground" }), "Subject"]
						}), /* @__PURE__ */ jsxs(Select, {
							value: subjectId,
							onValueChange: setSubjectId,
							disabled: !semesterId || subjects.isLoading,
							children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: !semesterId ? "Select a semester first" : subjects.isLoading ? "Loading subjects..." : "Select a subject" }) }), /* @__PURE__ */ jsx(SelectContent, { children: subjects.isLoading ? /* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-center p-3",
								children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" })
							}) : (subjects.data ?? []).length === 0 ? /* @__PURE__ */ jsx("div", {
								className: "px-3 py-2 text-sm text-muted-foreground",
								children: "No subjects available"
							}) : (subjects.data ?? []).map((s) => /* @__PURE__ */ jsx(SelectItem, {
								value: s.id,
								children: /* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-2",
									children: [
										s.code && /* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs text-muted-foreground",
											children: s.code
										}),
										/* @__PURE__ */ jsx("span", { children: s.name }),
										s.defaultSubject && /* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "ml-auto text-[10px] px-1.5 py-0 h-auto border-primary/30 text-primary",
											children: "Default"
										})
									]
								})
							}, s.id)) })]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs(Label, {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(FolderKanban, { className: "h-4 w-4 text-muted-foreground" }), "Folder name"]
						}), /* @__PURE__ */ jsx(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							disabled: !subjectId,
							placeholder: !subjectId ? !semesterId ? "Select a semester first" : "Select a subject first" : "e.g. Week 1 – Introduction"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Description (optional)" }), /* @__PURE__ */ jsx(Textarea, {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							disabled: !subjectId,
							placeholder: !subjectId ? "Select a subject first" : "Brief description of this folder...",
							rows: 2
						})]
					}),
					selectedSubject?.defaultSubject && /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-primary" }),
							"This folder belongs to the default subject of",
							" ",
							(semesters.data ?? []).find((s) => s.id === semesterId)?.name ?? ""
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Cancel"
			}), /* @__PURE__ */ jsx(Button, {
				onClick: submit,
				disabled: isPending || !canSubmit,
				children: isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-1 animate-spin" }), folder ? "Saving..." : "Creating..."] }) : folder ? "Save" : "Create folder"
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
//#endregion
export { FoldersPage as component };
