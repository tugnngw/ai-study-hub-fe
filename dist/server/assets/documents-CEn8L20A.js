import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { A as useSemesters, P as useSubjectsBySemester, p as useFolders, s as useDocuments, z as useUploadDocument } from "./queries-BnM1O96_.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as usePinnedDocuments } from "./preferences-D2yi1BRo.js";
import { t as DocumentActionsMenu } from "./document-actions-menu-_dgF4_qe.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { FileText, Pin, Plus, Search, Upload, X } from "lucide-react";
//#region src/routes/_authenticated/documents.tsx?tsr-split=component
function DocumentsPage() {
	const { data, isLoading } = useDocuments();
	useSemesters();
	const folders = useFolders();
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
									className: "px-4 py-3 font-medium hidden lg:table-cell",
									children: "Folder"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium hidden md:table-cell",
									children: "Description"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium hidden sm:table-cell",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium w-24",
									children: "Actions"
								})
							]
						})
					}), /* @__PURE__ */ jsx("tbody", { children: filtered.map((d) => {
						const folderName = folders.data?.find((f) => f.id === d.folderId)?.name || "—";
						return /* @__PURE__ */ jsx(DocumentRow, {
							id: d.id,
							folderId: d.folderId ?? "",
							folderName,
							title: d.title,
							description: d.description ?? "",
							status: d.status,
							rejectReason: d.rejectReason,
							pinned: isPinned(d.id),
							onTogglePin: () => togglePin(d.id)
						}, d.id);
					}) })]
				})
			}),
			/* @__PURE__ */ jsx(UploadDialog, {
				open: uploadOpen,
				onOpenChange: setUploadOpen
			})
		]
	});
}
function DocumentRow({ id, folderId, folderName, title, description, status, rejectReason, pinned, onTogglePin }) {
	const [showDialog, setShowDialog] = useState(false);
	const isRejected = status?.toUpperCase() === "REJECT";
	const isReported = status?.toUpperCase() === "REPORTED";
	const isBanned = status?.toUpperCase() === "BANNED";
	const isBlocked = isRejected || isReported || isBanned;
	const handleDocumentClick = (e) => {
		if (isBlocked) {
			e.preventDefault();
			setShowDialog(true);
		}
	};
	const proceedToDocument = () => {
		setShowDialog(false);
		navigate({
			to: "/ai",
			search: {
				folderId,
				docId: id
			}
		});
	};
	const getStatusBadge = () => {
		const statusUpper = status?.toUpperCase();
		if (statusUpper === "COMPLETED") return /* @__PURE__ */ jsx(Badge, {
			className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20",
			children: "Chờ duyệt"
		});
		if (statusUpper === "READY") return /* @__PURE__ */ jsx(Badge, {
			className: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20",
			children: "Sẵn sàng"
		});
		if (statusUpper === "REJECT") return /* @__PURE__ */ jsx(Badge, {
			className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
			children: "Bị từ chối"
		});
		if (statusUpper === "BANNED") return /* @__PURE__ */ jsx(Badge, {
			className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
			children: "Bị cấm"
		});
		if (statusUpper === "REPORTED") return /* @__PURE__ */ jsx(Badge, {
			className: "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20",
			children: "Bị báo cáo"
		});
		return /* @__PURE__ */ jsx(Badge, {
			variant: "outline",
			children: status
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("tr", {
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
						to: isBlocked ? "#" : "/ai",
						search: isBlocked ? {} : {
							folderId,
							docId: id
						},
						onClick: handleDocumentClick,
						className: "flex items-center gap-2 hover:text-primary min-w-0",
						children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ jsx("span", {
							className: "font-medium truncate",
							children: title
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 hidden lg:table-cell",
				children: /* @__PURE__ */ jsx("span", {
					className: "text-sm",
					children: folderName
				})
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-md",
				children: description
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 hidden sm:table-cell",
				children: getStatusBadge()
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3",
				children: /* @__PURE__ */ jsx(DocumentActionsMenu, {
					documentId: id,
					folderId,
					title,
					status,
					description
				})
			})
		]
	}), /* @__PURE__ */ jsx(Dialog, {
		open: showDialog,
		onOpenChange: setShowDialog,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: isRejected || isBanned ? "text-red-600" : "text-amber-600",
				children: isBanned ? "Tài liệu đã bị cấm" : isRejected ? "Tài liệu đã bị từ chối" : "Tài liệu đang bị báo cáo"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: isBanned ? "Tài liệu này đã bị cấm do vi phạm quy định." : isRejected ? "Tài liệu này không đủ điều kiện để hiển thị." : "Tài liệu này đang bị báo cáo và cần được kiểm duyệt." })] }),
			isRejected && /* @__PURE__ */ jsxs("div", {
				className: "p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-medium text-red-800 dark:text-red-300",
					children: "Lý do từ chối:"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-red-700 dark:text-red-400 mt-1",
					children: rejectReason || "Không có thông tin lý do cụ thể."
				})]
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => setShowDialog(false),
				children: "Đóng"
			}), !isReported && !isBanned && /* @__PURE__ */ jsx(Button, {
				variant: "default",
				onClick: proceedToDocument,
				children: "Vẫn truy cập"
			})] })
		] })
	})] });
}
function UploadDialog({ open, onOpenChange }) {
	const folders = useFolders();
	const semesters = useSemesters();
	const upload = useUploadDocument();
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [folderId, setFolderId] = useState("");
	const [semesterId, setSemesterId] = useState("");
	const [subjectId, setSubjectId] = useState("");
	const subjects = useSubjectsBySemester(semesterId);
	const subjectsInSemester = useMemo(() => subjects.data ?? [], [subjects.data]);
	const multiple = files.length > 1;
	const reset = () => {
		setFiles([]);
		setTitle("");
		setDescription("");
		setFolderId("");
		setSemesterId("");
		setSubjectId("");
	};
	const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));
	const submit = async () => {
		if (files.length === 0) return toast.error("Chọn ít nhất một file");
		if (!multiple && !title.trim()) return toast.error("Nhập tiêu đề");
		if (!folderId) return toast.error("Chọn thư mục");
		try {
			await upload.mutateAsync({
				files,
				title: multiple ? files[0].name : title,
				description,
				folderId
			});
			toast.success(multiple ? `Đã tải lên ${files.length} tài liệu` : "Đã tải lên tài liệu");
			onOpenChange(false);
			reset();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Tải lên thất bại");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: (v) => {
			onOpenChange(v);
			if (!v) reset();
		},
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Tải lên tài liệu" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Chọn một hoặc nhiều tệp, kèm kỳ và môn học tương ứng." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsx(Label, { children: "File (có thể chọn nhiều)" }),
							/* @__PURE__ */ jsx(Input, {
								type: "file",
								multiple: true,
								onChange: (e) => {
									const picked = Array.from(e.target.files ?? []);
									if (picked.length) setFiles((prev) => [...prev, ...picked]);
									e.target.value = "";
								}
							}),
							files.length > 0 && /* @__PURE__ */ jsx("ul", {
								className: "space-y-1 max-h-40 overflow-y-auto rounded-md border border-border/60 p-2",
								children: files.map((f, i) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-center justify-between gap-2 text-sm px-2 py-1 rounded hover:bg-accent/40",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "truncate flex items-center gap-2 min-w-0",
										children: [
											/* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
											/* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: f.name
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "text-xs text-muted-foreground shrink-0",
												children: [
													"(",
													(f.size / 1024 / 1024).toFixed(1),
													" MB)"
												]
											})
										]
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => removeFile(i),
										className: "text-muted-foreground hover:text-destructive shrink-0",
										title: "Bỏ file này",
										children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
									})]
								}, `${f.name}-${i}`))
							})
						]
					}),
					!multiple && /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Tiêu đề" }), /* @__PURE__ */ jsx(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Tên tài liệu"
						})]
					}),
					multiple && /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Đang tải ",
							files.length,
							" tệp — mỗi tệp sẽ tạo một tài liệu riêng, lấy tên theo tên tệp."
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Mô tả (tuỳ chọn)" }), /* @__PURE__ */ jsx(Textarea, {
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
				disabled: upload.isPending,
				children: upload.isPending ? "Đang tải lên…" : "Tải lên"
			})] })
		] })
	});
}
//#endregion
export { DocumentsPage as component };
