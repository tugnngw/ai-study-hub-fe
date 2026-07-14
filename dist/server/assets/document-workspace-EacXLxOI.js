import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-B5SRUUUO.js";
import { N as useUploadDocument, a as useDocument, c as useDownloadDocument, d as useFolder, r as useDeleteDocument, s as useDocumentsByFolder, x as useRagChat } from "./queries-nabbXKnl.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as Textarea } from "./textarea-1llmCJsE.js";
import { t as DocumentViewer } from "./DocumentViewer-BOg4Un3U.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Download, FileText, Loader2, RotateCw, Send, Sparkles, Trash2, Upload, X } from "lucide-react";
//#region src/components/document-workspace.tsx
var HIGHLIGHTS = [
	{
		id: "memo",
		label: "Thẻ ghi nhớ",
		cls: "bg-orange-100 text-orange-700 hover:bg-orange-200"
	},
	{
		id: "quiz",
		label: "Bài kiểm tra",
		cls: "bg-green-100 text-green-700 hover:bg-green-200"
	},
	{
		id: "summary",
		label: "Tóm Tắt",
		cls: "bg-blue-100 text-blue-700 hover:bg-blue-200"
	},
	{
		id: "idea",
		label: "Ý Chính",
		cls: "bg-purple-100 text-purple-700 hover:bg-purple-200"
	}
];
function DocumentWorkspace({ folderId, docId }) {
	const folder = useFolder(folderId);
	const folderDocs = useDocumentsByFolder(folderId);
	const doc = useDocument(docId ?? "");
	console.log("DOC DATA", doc.data);
	const del = useDeleteDocument();
	const chat = useRagChat();
	const download = useDownloadDocument();
	const navigate = useNavigate();
	const [tab, setTab] = useState("original");
	const [notes, setNotes] = useState("");
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [uploadOpen, setUploadOpen] = useState(false);
	const scrollRef = useRef(null);
	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages]);
	const submitChat = async () => {
		if (!input.trim() || !docId) return;
		const q = input.trim();
		setInput("");
		setMessages((m) => [...m, {
			role: "user",
			content: q
		}]);
		try {
			const res = await chat.mutateAsync({
				folderId,
				documentId: docId,
				question: q
			});
			setMessages((m) => [...m, {
				role: "assistant",
				content: res.answer
			}]);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	const handleDownload = async () => {
		if (!docId) return;
		try {
			const res = await download.mutateAsync(docId);
			window.open(res.url, "_blank");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Tải xuống thất bại");
		}
	};
	const handleDelete = async () => {
		if (!docId) return;
		if (!confirm("Xoá tài liệu này (chuyển vào Thùng rác)?")) return;
		try {
			await del.mutateAsync(docId);
			toast.success("Đã chuyển vào thùng rác");
			navigate({
				to: "/folders/$id",
				params: { id: String(folderId) },
				search: {}
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-4 h-[calc(100vh-9rem)]",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: "hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						to: "/folders",
						className: "flex items-center gap-1.5 text-primary font-medium text-sm mb-4 hover:gap-2.5 transition-all",
						children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }), " Quay về"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-gradient-soft p-3 border border-border/50",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-[10px] font-semibold tracking-wider text-muted-foreground mb-1",
								children: "THƯ MỤC ĐANG DÙNG"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm font-semibold font-display",
								children: folder.data?.name ?? "—"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: [folderDocs.data?.length ?? 0, " tài liệu"]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 flex-1 min-h-0 flex flex-col",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-[10px] font-semibold tracking-wider text-muted-foreground mb-2 px-1",
							children: "TÀI LIỆU ĐANG CÓ"
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1 overflow-y-auto flex-1 -mx-1 px-1",
							children: [
								folderDocs.isLoading && Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-9 rounded-lg" }, i)),
								(folderDocs.data ?? []).map((d) => {
									const active = d.id === docId;
									return /* @__PURE__ */ jsxs(Link, {
										to: "/folders/$id",
										params: { id: String(folderId) },
										search: { docId: d.id },
										className: cn("flex items-center gap-2 text-sm px-2.5 py-2 rounded-lg transition-colors", active ? "bg-gradient-brand text-white font-medium shadow-soft" : "hover:bg-accent text-foreground/90"),
										children: [/* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: d.title
										})]
									}, d.id);
								}),
								!folderDocs.isLoading && (folderDocs.data ?? []).length === 0 && /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground px-2",
									children: "Chưa có tài liệu"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						className: "mt-4 justify-start border-dashed hover:border-primary hover:text-primary hover:bg-primary/5",
						onClick: () => setUploadOpen(true),
						children: [/* @__PURE__ */ jsx(Upload, { className: "h-3.5 w-3.5 mr-2" }), " Tải lên tài liệu"]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex gap-1.5 p-3 border-b border-border bg-gradient-soft overflow-x-auto",
						children: [
							{
								id: "original",
								label: "Nội dung gốc"
							},
							{
								id: "notes",
								label: "Ghi chú AI"
							},
							{
								id: "summary",
								label: "Tóm tắt AI"
							},
							{
								id: "flashcards",
								label: "Flashcards AI"
							},
							{
								id: "quizzes",
								label: "Quizzes AI"
							}
						].map((t) => /* @__PURE__ */ jsx("button", {
							onClick: () => setTab(t.id),
							className: cn("px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all whitespace-nowrap", tab === t.id ? "bg-gradient-brand text-white shadow-soft" : "bg-card text-foreground/70 border border-border hover:text-foreground hover:border-primary/40"),
							children: t.label
						}, t.id))
					}),
					tab === "original" && (folderDocs.data?.length ?? 0) > 0 && /* @__PURE__ */ jsxs("div", {
						className: "flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => navigate({
								to: "/folders/$id",
								params: { id: String(folderId) },
								search: {}
							}),
							className: cn("px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors", !docId ? "bg-gradient-brand text-white" : "bg-muted text-foreground hover:bg-accent"),
							children: "Tất cả"
						}), (folderDocs.data ?? []).map((d) => /* @__PURE__ */ jsx(Link, {
							to: "/folders/$id",
							params: { id: String(folderId) },
							search: { docId: d.id },
							className: cn("px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors", d.id === docId ? "bg-gradient-brand text-white" : "bg-brand-soft text-primary hover:bg-accent"),
							children: d.title
						}, d.id))]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex-1 overflow-y-auto p-6",
						children: tab === "original" ? docId && doc.data ? /* @__PURE__ */ jsx(DocumentViewer, { document: doc.data }) : doc.isLoading ? /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Đang tải tài liệu..."
								})]
							})
						}) : !docId ? /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
							children: [
								folderDocs.isLoading && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-40 rounded-xl" }, i)),
								(folderDocs.data ?? []).map((d) => {
									const active = d.id === docId;
									return /* @__PURE__ */ jsxs(Link, {
										to: "/folders/$id",
										params: { id: String(folderId) },
										search: { docId: d.id },
										className: cn("group flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5", active && "border-primary ring-2 ring-primary/20 shadow-soft"),
										children: [/* @__PURE__ */ jsx("div", {
											className: "flex-1 flex items-center justify-center w-full py-4",
											children: /* @__PURE__ */ jsx("div", {
												className: "h-16 w-16 rounded-xl bg-gradient-soft flex items-center justify-center group-hover:bg-gradient-brand transition-colors",
												children: /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-primary group-hover:text-white" })
											})
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs font-medium text-foreground truncate w-full",
											children: d.title
										})]
									}, d.id);
								}),
								!folderDocs.isLoading && (folderDocs.data ?? []).length === 0 && /* @__PURE__ */ jsx("div", {
									className: "col-span-full text-sm text-muted-foreground text-center py-10",
									children: "Chưa có tài liệu. Bấm \"Tải lên tài liệu\" để bắt đầu."
								})
							]
						}) : /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Không thể tải tài liệu"
								}), /* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => window.location.reload(),
									children: [/* @__PURE__ */ jsx(RotateCw, { className: "h-4 w-4 mr-2" }), "Thử lại"]
								})]
							})
						}) : !docId ? /* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground text-center mt-16",
							children: "Chọn một tài liệu để xem nội dung."
						}) : doc.isLoading ? /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-48" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-96" })]
						}) : tab === "notes" ? /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-1 border border-border rounded-lg px-2 py-1.5 text-xs text-muted-foreground bg-muted/40",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer font-bold",
											children: "B"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer italic",
											children: "I"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer underline",
											children: "U"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer",
											children: "H1"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer",
											children: "H2"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer",
											children: "• List"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer",
											children: "1. List"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 hover:bg-accent rounded cursor-pointer",
											children: "Link"
										})
									]
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold text-gradient-brand font-display",
									children: "Ghi chú AI"
								}),
								/* @__PURE__ */ jsx(Textarea, {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									placeholder: "Ghi chú của bạn về tài liệu này...",
									className: "min-h-[300px] resize-none"
								})
							]
						}) : tab === "summary" ? /* @__PURE__ */ jsx(SummaryTab, {
							title: doc.data?.title ?? "",
							description: doc.data?.description ?? ""
						}) : tab === "flashcards" ? /* @__PURE__ */ jsx(FlashcardsTab, { title: doc.data?.title ?? "" }) : /* @__PURE__ */ jsx(QuizzesTab, { title: doc.data?.title ?? "" })
					}),
					docId && /* @__PURE__ */ jsxs("div", {
						className: "p-3 border-t border-border flex items-center gap-2",
						children: [/* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleDownload,
							disabled: download.isPending,
							children: [
								/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 mr-2" }),
								" ",
								download.isPending ? "Đang tải…" : "Tải xuống"
							]
						}), /* @__PURE__ */ jsxs(Button, {
							variant: "ghost",
							size: "sm",
							onClick: handleDelete,
							className: "text-destructive",
							children: [/* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5 mr-2" }), " Xoá"]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("aside", {
				className: "bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "p-4 border-b border-border bg-gradient-soft space-y-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-white" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
									children: "AI Assistant"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold truncate font-display",
									children: doc.data?.title ?? "Chưa chọn tài liệu"
								})]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-1.5",
							children: HIGHLIGHTS.map((h) => /* @__PURE__ */ jsx("button", {
								onClick: () => toast.info(`${h.label} — đang phát triển`),
								className: cn("px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors", h.cls),
								children: h.label
							}, h.id))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						ref: scrollRef,
						className: "flex-1 overflow-y-auto p-3 space-y-3",
						children: [messages.length === 0 ? /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center justify-center h-full text-center px-4 py-8",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "h-12 w-12 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3",
									children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-primary" })
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm font-medium",
									children: "Hỏi AI về tài liệu"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Tóm tắt, giải thích, hỏi đáp — tất cả trong một"
								})
							]
						}) : messages.map((m, i) => /* @__PURE__ */ jsx("div", {
							className: cn("text-sm rounded-2xl px-3.5 py-2.5 max-w-[88%] leading-relaxed", m.role === "user" ? "bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft" : "bg-muted text-foreground rounded-bl-md"),
							children: m.content
						}, i)), chat.isPending && /* @__PURE__ */ jsxs("div", {
							className: "text-sm bg-muted rounded-2xl rounded-bl-md px-3.5 py-2.5 max-w-[88%] inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
								/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:200ms]" }),
								/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: (e) => {
							e.preventDefault();
							submitChat();
						},
						className: "p-3 border-t border-border flex gap-2",
						children: [/* @__PURE__ */ jsx(Input, {
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Hỏi AI bất cứ điều gì…",
							className: "text-sm rounded-xl bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-input",
							disabled: !docId
						}), /* @__PURE__ */ jsx(Button, {
							type: "submit",
							size: "icon",
							disabled: chat.isPending || !input.trim() || !docId,
							className: "bg-gradient-brand hover:opacity-90 rounded-xl shrink-0",
							children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(UploadDialog, {
				open: uploadOpen,
				onOpenChange: setUploadOpen,
				folderId
			})
		]
	});
}
function UploadDialog({ open, onOpenChange, folderId }) {
	const upload = useUploadDocument();
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const submit = async () => {
		if (!file) return toast.error("Chọn file");
		if (!title.trim()) return toast.error("Nhập tiêu đề");
		try {
			await upload.mutateAsync({
				file,
				folderId,
				title,
				description
			});
			toast.success("Đã tải lên");
			onOpenChange(false);
			setFile(null);
			setTitle("");
			setDescription("");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Upload failed");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Tải lên tài liệu" }) }),
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
				children: upload.isPending ? "Đang tải…" : "Tải lên"
			})] })
		] })
	});
}
function SummaryTab({ title, description }) {
	const [loading, setLoading] = useState(true);
	const [tick, setTick] = useState(0);
	useEffect(() => {
		setLoading(true);
		const t = setTimeout(() => setLoading(false), 700);
		return () => clearTimeout(t);
	}, [title, tick]);
	const bullets = useMemo(() => [
		`Tài liệu “${title}” cung cấp kiến thức nền tảng và thuật ngữ cốt lõi cho người học.`,
		"Trình bày khái niệm theo trình tự từ cơ bản đến nâng cao, kèm ví dụ minh hoạ.",
		"Nhấn mạnh các thuật ngữ tiếng Anh chuyên ngành và cách dùng trong ngữ cảnh thực tế.",
		"Đưa ra bài tập vận dụng giúp người đọc tự kiểm tra mức độ hiểu bài.",
		"Kết luận tổng kết các điểm quan trọng cần ghi nhớ sau khi đọc xong tài liệu."
	], [title]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h2", {
				className: "text-xl font-bold flex items-center gap-2 text-gradient-brand font-display",
				children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }), " AI Summary"]
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground mt-1",
				children: "Tóm tắt được tạo tự động bởi AI dựa trên nội dung tài liệu"
			})] }), /* @__PURE__ */ jsxs(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => setTick((t) => t + 1),
				children: [/* @__PURE__ */ jsx(RotateCw, { className: "h-3.5 w-3.5 mr-2" }), " Tạo lại"]
			})]
		}), loading ? /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" }),
				/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
				/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6" }),
				/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-2/3" })
			]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-primary/20 bg-brand-soft/60 p-4",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-xs font-semibold text-primary mb-1",
				children: "Tóm tắt ngắn"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm leading-relaxed",
				children: description || `Tài liệu “${title}” tổng hợp các kiến thức cốt lõi và thuật ngữ quan trọng, giúp người đọc nắm chắc lý thuyết và áp dụng vào thực tế.`
			})]
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
			className: "text-sm font-semibold mb-2",
			children: "Điểm chính"
		}), /* @__PURE__ */ jsx("ul", {
			className: "space-y-2 text-sm",
			children: bullets.map((b, i) => /* @__PURE__ */ jsxs("li", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "h-5 w-5 shrink-0 rounded-full bg-gradient-brand text-white text-xs font-bold flex items-center justify-center",
					children: i + 1
				}), /* @__PURE__ */ jsx("span", { children: b })]
			}, i))
		})] })] })]
	});
}
function FlashcardsTab({ title }) {
	const cards = useMemo(() => [
		{
			front: "Algorithm",
			back: "Tập hợp các bước cụ thể để giải quyết một bài toán."
		},
		{
			front: "Variable",
			back: "Vùng nhớ có tên, dùng để lưu trữ giá trị có thể thay đổi."
		},
		{
			front: "Function",
			back: "Khối lệnh có thể tái sử dụng, nhận đầu vào và trả về kết quả."
		},
		{
			front: "Loop",
			back: "Cấu trúc lặp lại một khối lệnh nhiều lần theo điều kiện."
		},
		{
			front: "Class",
			back: "Khuôn mẫu định nghĩa thuộc tính và hành vi của đối tượng (OOP)."
		}
	], []);
	const [idx, setIdx] = useState(0);
	const [flipped, setFlipped] = useState(false);
	useEffect(() => setFlipped(false), [idx]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-xl font-bold flex items-center gap-2 text-gradient-brand font-display",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }), " AI Flashcards"]
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground mt-1",
					children: [
						"Thẻ ghi nhớ từ “",
						title,
						"” — bấm vào thẻ để lật mặt"
					]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "text-xs text-muted-foreground",
					children: [
						idx + 1,
						" / ",
						cards.length
					]
				})]
			}),
			/* @__PURE__ */ jsxs("button", {
				onClick: () => setFlipped((f) => !f),
				className: "w-full min-h-[220px] rounded-xl border-2 border-primary/20 bg-gradient-soft p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3",
						children: flipped ? "Định nghĩa" : "Thuật ngữ"
					}),
					/* @__PURE__ */ jsx("div", {
						className: cn("font-semibold", flipped ? "text-base leading-relaxed" : "text-2xl"),
						children: flipped ? cards[idx].back : cards[idx].front
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground mt-4",
						children: "Bấm để lật thẻ"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setIdx((i) => (i - 1 + cards.length) % cards.length),
						children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }), " Trước"]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex gap-1",
						children: cards.map((_, i) => /* @__PURE__ */ jsx("div", { className: cn("h-1.5 rounded-full transition-all", i === idx ? "w-6 bg-gradient-brand" : "w-1.5 bg-muted") }, i))
					}),
					/* @__PURE__ */ jsxs(Button, {
						size: "sm",
						onClick: () => setIdx((i) => (i + 1) % cards.length),
						children: ["Tiếp ", /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 ml-1" })]
					})
				]
			})
		]
	});
}
function QuizzesTab({ title }) {
	const quizzes = useMemo(() => [
		{
			q: "Thuật ngữ “Algorithm” có nghĩa là gì?",
			options: [
				"Một loại ngôn ngữ lập trình",
				"Tập hợp các bước giải quyết bài toán",
				"Một loại biến trong bộ nhớ",
				"Tên gọi của một framework"
			],
			answer: 1
		},
		{
			q: "Cấu trúc nào dùng để lặp lại một khối lệnh?",
			options: [
				"Function",
				"Variable",
				"Loop",
				"Class"
			],
			answer: 2
		},
		{
			q: "Trong OOP, “Class” là gì?",
			options: [
				"Một biến toàn cục",
				"Khuôn mẫu định nghĩa đối tượng",
				"Một hàm trả về số",
				"Một loại vòng lặp"
			],
			answer: 1
		}
	], []);
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const score = useMemo(() => quizzes.reduce((s, q, i) => answers[i] === q.answer ? s + 1 : s, 0), [answers, quizzes]);
	const reset = () => {
		setAnswers({});
		setSubmitted(false);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-xl font-bold flex items-center gap-2 text-gradient-brand font-display",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }), " AI Quizzes"]
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground mt-1",
					children: [
						"Câu hỏi trắc nghiệm từ “",
						title,
						"”"
					]
				})] }), submitted && /* @__PURE__ */ jsxs("div", {
					className: "text-sm font-semibold",
					children: [
						"Điểm:",
						" ",
						/* @__PURE__ */ jsxs("span", {
							className: "text-gradient-brand",
							children: [
								score,
								" / ",
								quizzes.length
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: quizzes.map((quiz, qi) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border p-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "font-medium text-sm mb-3",
						children: [
							"Câu ",
							qi + 1,
							". ",
							quiz.q
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-2",
						children: quiz.options.map((opt, oi) => {
							const picked = answers[qi] === oi;
							const correct = submitted && oi === quiz.answer;
							const wrong = submitted && picked && oi !== quiz.answer;
							return /* @__PURE__ */ jsxs("button", {
								disabled: submitted,
								onClick: () => setAnswers((a) => ({
									...a,
									[qi]: oi
								})),
								className: cn("w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors", correct && "border-emerald-400 bg-emerald-50/60", wrong && "border-red-400 bg-red-50/60", !submitted && picked && "border-primary bg-brand-soft/60", !submitted && !picked && "border-border hover:bg-accent"),
								children: [/* @__PURE__ */ jsx("span", {
									className: cn("h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0", correct && "bg-emerald-500 text-white border-emerald-500", wrong && "bg-red-500 text-white border-red-500", !submitted && picked && "bg-gradient-brand text-white border-transparent"),
									children: correct ? /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) : wrong ? /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) : String.fromCharCode(65 + oi)
								}), /* @__PURE__ */ jsx("span", { children: opt })]
							}, oi);
						})
					})]
				}, qi))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end gap-2",
				children: submitted ? /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					onClick: reset,
					children: [/* @__PURE__ */ jsx(RotateCw, { className: "h-4 w-4 mr-2" }), " Làm lại"]
				}) : /* @__PURE__ */ jsx(Button, {
					onClick: () => {
						if (Object.keys(answers).length < quizzes.length) {
							toast.error("Vui lòng trả lời tất cả câu hỏi");
							return;
						}
						setSubmitted(true);
					},
					children: "Nộp bài"
				})
			})
		]
	});
}
//#endregion
export { DocumentWorkspace as t };
