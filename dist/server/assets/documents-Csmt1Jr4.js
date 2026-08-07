import { r as documentApi } from "./realApi-BCKVeZFR.js";
import { t as Route } from "./documents-47jO3B-I.js";
import { I as useSubjects, L as useSubjectsBySemester, N as useSemesters, U as useUploadDocument, m as useFolders, s as useDocuments } from "./queries-BOxd9l6F.js";
import { n as formatBytes, r as formatDateTime, t as cn } from "./utils-CZKD4yH6.js";
import { t as Button } from "./button-C90jjaif.js";
import { t as Input } from "./input-Cek7xrlr.js";
import { t as Skeleton } from "./skeleton-_R9c2vuT.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BwVCGmke.js";
import { t as Label } from "./label-HQjKAyB7.js";
import { t as Textarea } from "./textarea-B2WhzhFn.js";
import { t as usePinnedDocuments } from "./preferences-D2yi1BRo.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D8F-jI2z.js";
import { t as DocumentActionsMenu } from "./document-actions-menu-C2mhmnte.js";
import { n as CardContent, t as Card } from "./card-D4JpMjWP.js";
import { t as Badge } from "./badge-CXVSNBvN.js";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-C9-cV9dF.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { FileText, Loader2, Pin, Plus, Search, Upload, X } from "lucide-react";
//#region src/routes/_authenticated/documents.tsx?tsr-split=component
function DocumentsPage() {
	const { data, isLoading } = useDocuments();
	const subjects = useSemesters();
	const folders = useFolders();
	const allSubjects = useSubjects();
	const semesterMap = useMemo(() => new Map((subjects.data ?? []).map((s) => [s.id, s.name])), [subjects.data]);
	const subjectNameMap = useMemo(() => new Map((allSubjects.data ?? []).map((s) => [s.id, s.name])), [allSubjects.data]);
	const folderData = folders.data ?? [];
	const folderLookup = useMemo(() => new Map(folderData.map((f) => [f.id, f])), [folderData]);
	const [query, setQuery] = useState("");
	const [uploadOpen, setUploadOpen] = useState(false);
	const search = Route.useSearch();
	useEffect(() => {
		if (search.upload) setUploadOpen(true);
	}, [search.upload]);
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
				className: "overflow-x-auto w-full border border-border/60 rounded-lg",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm min-w-[800px]",
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
									className: "px-4 py-3 font-medium hidden lg:table-cell",
									children: "Semester"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium hidden lg:table-cell",
									children: "Subject"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium",
									children: "Upload Time"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium hidden md:table-cell",
									children: "Description"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-4 py-3 font-medium hidden md:table-cell",
									children: "Size"
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
						const folderInfo = folderLookup.get(d.folderId ?? "");
						const folderName = folderInfo?.name || "-";
						const semesterName = folderInfo?.semesterId ? semesterMap.get(folderInfo.semesterId) || "-" : "-";
						const subjectName = folderInfo?.subjectId ? subjectNameMap.get(folderInfo.subjectId) || "-" : "-";
						return /* @__PURE__ */ jsx(DocumentRow, {
							id: d.id,
							folderId: d.folderId ?? "",
							folderName,
							semesterName,
							subjectName,
							title: d.title,
							description: d.description ?? "",
							fileSize: d.formattedFileSize ?? "-",
							status: d.status,
							rejectReason: d.rejectReason,
							pinned: isPinned(d.id),
							createdAt: d.createdAt,
							onTogglePin: () => togglePin(d.id)
						}, d.id);
					}) })]
				})
			}),
			/* @__PURE__ */ jsx(UploadDialog, {
				open: uploadOpen,
				onOpenChange: setUploadOpen,
				initialFolderId: search.newFolderId
			})
		]
	});
}
function DocumentRow({ id, folderId, folderName, semesterName, subjectName, title, description, fileSize, status, rejectReason, pinned, createdAt, onTogglePin }) {
	const navigate = useNavigate();
	const [showDialog, setShowDialog] = useState(false);
	const isRejected = status?.toUpperCase() === "REJECT";
	const isBanned = status?.toUpperCase() === "BANNED";
	const isBlocked = isRejected || isBanned;
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
				f: folderId,
				d: id
			}
		});
	};
	const getStatusBadge = () => {
		const statusUpper = status?.toUpperCase();
		if (statusUpper === "COMPLETED") return /* @__PURE__ */ jsx(Badge, {
			className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20",
			children: "Chờ duyệt"
		});
		if (statusUpper === "READY" || statusUpper === "REPORTED") return /* @__PURE__ */ jsx(Badge, {
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
						to: "/ai",
						search: isBlocked ? {} : {
							f: folderId,
							d: id
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
				className: "px-4 py-3 hidden lg:table-cell max-w-[150px]",
				children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("span", {
						className: "text-sm truncate block",
						children: folderName
					})
				}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: folderName }) })] }) })
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 text-muted-foreground hidden lg:table-cell text-sm max-w-[120px]",
				children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("span", {
						className: "truncate block",
						children: semesterName
					})
				}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: semesterName }) })] }) })
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 text-muted-foreground hidden lg:table-cell text-sm max-w-[150px]",
				children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("span", {
						className: "truncate block",
						children: subjectName
					})
				}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: subjectName }) })] }) })
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 text-muted-foreground text-sm",
				children: formatDateTime(createdAt)
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 text-muted-foreground hidden md:table-cell max-w-[200px]",
				children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("span", {
						className: "truncate block",
						children: description || "—"
					})
				}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", {
					className: "max-w-xs break-all",
					children: description || "Không có mô tả"
				}) })] }) })
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-4 py-3 text-muted-foreground hidden md:table-cell",
				children: fileSize
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
				children: isBanned ? "Tài liệu đã bị cấm" : "Tài liệu đã bị từ chối"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: isBanned ? "Tài liệu này đã bị cấm do vi phạm quy định." : "Tài liệu này không đủ điều kiện để hiển thị." })] }),
			isRejected && /* @__PURE__ */ jsxs("div", {
				className: "p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg max-h-[150px] overflow-y-auto",
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
			}), !isBanned && /* @__PURE__ */ jsx(Button, {
				variant: "default",
				onClick: proceedToDocument,
				children: "Vẫn truy cập"
			})] })
		] })
	})] });
}
function UploadDialog({ open, onOpenChange, initialFolderId }) {
	const folders = useFolders();
	const semesters = useSemesters();
	const upload = useUploadDocument();
	const navigate = useNavigate();
	const [uploadConfig, setUploadConfig] = useState(null);
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [folderId, setFolderId] = useState("");
	const [semesterId, setSemesterId] = useState("");
	const [subjectId, setSubjectId] = useState("");
	useEffect(() => {
		if (!open) return;
		documentApi.getUploadConfig().then(setUploadConfig).catch(() => setUploadConfig(null));
	}, [open]);
	const subjects = useSubjectsBySemester(semesterId);
	useEffect(() => {
		if (!open || !initialFolderId) return;
		const folder = (folders.data ?? []).find((f) => f.id === initialFolderId);
		if (folder) {
			setFolderId(folder.id);
			setSemesterId(folder.semesterId ?? "");
			setSubjectId(folder.subjectId ?? "");
		}
	}, [
		open,
		initialFolderId,
		folders.data
	]);
	const subjectsInSemester = useMemo(() => subjects.data ?? [], [subjects.data]);
	const foldersInSubject = useMemo(() => {
		if (!subjectId) return folders.data ?? [];
		return (folders.data ?? []).filter((f) => f.subjectId === subjectId);
	}, [folders.data, subjectId]);
	useEffect(() => {
		if (folderId) {
			const folder = (folders.data ?? []).find((f) => f.id === folderId);
			if (folder) {
				if (folder.subjectId && folder.subjectId !== subjectId) setSubjectId(folder.subjectId);
				if (folder.semesterId && folder.semesterId !== semesterId) setSemesterId(folder.semesterId);
			}
		}
	}, [
		folderId,
		folders.data,
		subjectId,
		semesterId
	]);
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
		if (title.length > 255) return toast.error("Tiêu đề không được quá 255 ký tự");
		if (!semesterId) return toast.error("Chọn kỳ học");
		if (!subjectId) return toast.error("Chọn môn học");
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
	const handleFolderChange = (value) => {
		if (value === "create_folder") {
			reset();
			onOpenChange(false);
			navigate({
				to: "/folders",
				search: { createFolder: "1" }
			});
		} else setFolderId(value);
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: (v) => {
			onOpenChange(v);
			if (!v) reset();
		},
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "sm:max-w-xl",
			children: [
				/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Tải lên tài liệu" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Chọn một hoặc nhiều tệp, kèm kỳ và môn học tương ứng." })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-4",
					children: [
						uploadConfig && /* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-xs text-muted-foreground space-y-0.5",
							children: [/* @__PURE__ */ jsxs("p", { children: [
								"Định dạng hỗ trợ:",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: uploadConfig.allowedExtensions.join(", ")
								})
							] }), /* @__PURE__ */ jsxs("p", { children: [
								"Dung lượng tối đa mỗi tệp:",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: formatBytes(uploadConfig.maxFileSize)
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "File (có thể chọn nhiều)" }),
								/* @__PURE__ */ jsx(Input, {
									type: "file",
									multiple: true,
									accept: uploadConfig?.allowedExtensions.join(",") ?? ".pdf,.txt",
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
													className: "truncate max-w-[300px] sm:max-w-[400px]",
													children: f.name
												}),
												/* @__PURE__ */ jsxs("span", {
													className: "text-xs text-muted-foreground shrink-0",
													children: [
														"(",
														formatBytes(f.size),
														")"
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
								placeholder: "Tên tài liệu",
								maxLength: 255
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
								onChange: (e) => setDescription(e.target.value),
								maxLength: 500
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx(Label, { children: "Kỳ học" }), folderId && /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: "Tự động từ thư mục"
									})]
								}), /* @__PURE__ */ jsxs(Select, {
									value: semesterId,
									onValueChange: (v) => {
										if (folderId) return;
										setSemesterId(v);
										setSubjectId("");
									},
									disabled: !!folderId,
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										className: cn(!!folderId && "cursor-not-allowed opacity-50"),
										children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Chọn kỳ" })
									}), /* @__PURE__ */ jsx(SelectContent, { children: (semesters.data ?? []).map((s) => /* @__PURE__ */ jsx(SelectItem, {
										value: s.id,
										children: s.name
									}, s.id)) })]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx(Label, { children: "Môn học" }), folderId && /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: "Tự động từ thư mục"
									})]
								}), /* @__PURE__ */ jsxs(Select, {
									value: subjectId,
									onValueChange: setSubjectId,
									disabled: !semesterId || !!folderId,
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										className: cn(!!folderId && "cursor-not-allowed opacity-50"),
										children: /* @__PURE__ */ jsx(SelectValue, { placeholder: semesterId ? "Chọn môn" : "Chọn kỳ trước" })
									}), /* @__PURE__ */ jsx(SelectContent, { children: subjectsInSemester.length === 0 ? /* @__PURE__ */ jsx("div", {
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
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx(Label, { children: "Thư mục" }), folderId && /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => {
											setFolderId("");
											setSemesterId("");
											setSubjectId("");
										},
										className: "text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground",
										children: "Bỏ chọn thư mục"
									})]
								}),
								/* @__PURE__ */ jsxs(Select, {
									value: folderId,
									onValueChange: handleFolderChange,
									children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: !subjectId ? "Chọn thư mục (sẽ tự nhập kỳ & môn)" : "Chọn thư mục" }) }), /* @__PURE__ */ jsx(SelectContent, { children: foldersInSubject.length === 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
										className: "px-3 py-2 text-sm text-muted-foreground",
										children: "Không có thư mục"
									}), /* @__PURE__ */ jsx(SelectItem, {
										value: "create_folder",
										className: "px-3 py-2 text-sm text-muted-foreground",
										children: "+ Tạo thư mục mới..."
									})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [foldersInSubject.map((f) => /* @__PURE__ */ jsx(SelectItem, {
										value: String(f.id),
										children: f.name
									}, f.id)), /* @__PURE__ */ jsx(SelectItem, {
										value: "create_folder",
										className: "px-3 py-2 text-sm text-muted-foreground",
										children: "+ Tạo thư mục mới..."
									})] }) })]
								}),
								subjectId && foldersInSubject.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-amber-600 dark:text-amber-400",
									children: "Chưa có thư mục nào cho môn này."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					disabled: upload.isPending,
					children: "Huỷ"
				}), /* @__PURE__ */ jsx(Button, {
					onClick: submit,
					disabled: upload.isPending,
					children: upload.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }), "Đang tải lên…"] }) : "Tải lên"
				})] })
			]
		})
	});
}
//#endregion
export { DocumentsPage as component };
