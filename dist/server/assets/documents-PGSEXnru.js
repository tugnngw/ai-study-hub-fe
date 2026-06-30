import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B5SRUUUO.js";
import { _ as useUploadDocument, d as useFolders, o as useDocuments } from "./queries-I4d4VPTX.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as Textarea } from "./textarea-1llmCJsE.js";
import { t as usePinnedDocuments } from "./preferences-D2yi1BRo.js";
import { t as DocumentActionsMenu } from "./document-actions-menu-WhXpWAyO.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BHv1JhlL.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { FileText, Pin, Plus, Search, Upload } from "lucide-react";
//#region src/routes/_authenticated/documents.tsx?tsr-split=component
function DocumentsPage() {
	const { data, isLoading } = useDocuments();
	const [query, setQuery] = useState("");
	const [uploadOpen, setUploadOpen] = useState(false);
	const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();
	const filtered = (data ?? []).filter((d) => d.title.toLowerCase().includes(query.toLowerCase())).sort((a, b) => Number(isPinned(b.id)) - Number(isPinned(a.id)));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Documents"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-1",
					children: "All your uploaded files"
				})] }), /* @__PURE__ */ jsxs(Button, {
					onClick: () => setUploadOpen(true),
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }), " Upload"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative max-w-sm",
				children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
					placeholder: "Search documents...",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					className: "pl-9"
				})]
			}),
			isLoading ? /* @__PURE__ */ jsx("div", {
				className: "space-y-2",
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-14" }, i))
			}) : filtered.length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-16 text-center",
				children: [
					/* @__PURE__ */ jsx(FileText, { className: "h-10 w-10 mx-auto text-muted-foreground/50" }),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "No documents found."
					}),
					/* @__PURE__ */ jsxs(Button, {
						className: "mt-4",
						onClick: () => setUploadOpen(true),
						children: [/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 mr-2" }), " Upload your first"]
					})
				]
			}) }) : /* @__PURE__ */ jsx("div", {
				className: "border border-border/60 rounded-lg overflow-hidden",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", {
						className: "bg-muted/40",
						children: /* @__PURE__ */ jsxs("tr", {
							className: "text-left",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium",
									children: "Title"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium hidden md:table-cell",
									children: "Description"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium w-24",
									children: "Actions"
								})
							]
						})
					}), /* @__PURE__ */ jsx("tbody", { children: filtered.map((d) => /* @__PURE__ */ jsx(DocumentRow, {
						id: d.id,
						folderId: d.folderId ?? "",
						title: d.title,
						description: d.description ?? "",
						pinned: isPinned(d.id),
						onTogglePin: () => togglePin(d.id)
					}, d.id)) })]
				})
			}),
			/* @__PURE__ */ jsx(UploadDialog, {
				open: uploadOpen,
				onOpenChange: setUploadOpen
			})
		]
	});
}
function DocumentRow({ id, folderId, title, description, pinned, onTogglePin }) {
	return /* @__PURE__ */ jsxs("tr", {
		className: cn("border-t border-border/60 hover:bg-accent/30", pinned && "bg-amber-50/60 dark:bg-amber-400/5"),
		children: [
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onTogglePin,
						title: pinned ? "Bỏ ghim" : "Ghim tài liệu",
						className: "shrink-0 h-6 w-6 rounded-md hover:bg-accent flex items-center justify-center",
						children: /* @__PURE__ */ jsx(Pin, { className: cn("h-3.5 w-3.5", pinned ? "fill-amber-400 text-amber-500" : "text-muted-foreground") })
					}), /* @__PURE__ */ jsxs(Link, {
						to: "/ai",
						search: {
							folderId,
							docId: id
						},
						className: "flex items-center gap-2 hover:text-primary min-w-0",
						children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ jsx("span", {
							className: "font-medium truncate",
							children: title
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-md",
				children: description
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3",
				children: /* @__PURE__ */ jsx(DocumentActionsMenu, {
					documentId: id,
					folderId,
					title
				})
			})
		]
	});
}
function UploadDialog({ open, onOpenChange }) {
	const folders = useFolders();
	const upload = useUploadDocument();
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [folderId, setFolderId] = useState("");
	const submit = async () => {
		if (!file) return toast.error("Select a file");
		if (!title.trim()) return toast.error("Title required");
		if (!folderId) return toast.error("Select a folder");
		try {
			await upload.mutateAsync({
				file,
				folderId,
				title,
				description
			});
			toast.success("Uploaded");
			onOpenChange(false);
			setFile(null);
			setTitle("");
			setDescription("");
			setFolderId("");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Upload failed");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Upload document" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new file to your workspace." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "File" }), /* @__PURE__ */ jsx(Input, {
							type: "file",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Title" }), /* @__PURE__ */ jsx(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Description" }), /* @__PURE__ */ jsx(Textarea, {
							value: description,
							onChange: (e) => setDescription(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Folder" }), /* @__PURE__ */ jsxs(Select, {
							value: folderId,
							onValueChange: setFolderId,
							children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose folder" }) }), /* @__PURE__ */ jsx(SelectContent, { children: (folders.data ?? []).map((f) => /* @__PURE__ */ jsx(SelectItem, {
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
				children: "Cancel"
			}), /* @__PURE__ */ jsx(Button, {
				onClick: submit,
				disabled: upload.isPending,
				children: upload.isPending ? "Uploading..." : "Upload"
			})] })
		] })
	});
}
//#endregion
export { DocumentsPage as component };
