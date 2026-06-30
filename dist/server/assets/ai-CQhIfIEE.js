import { t as Route } from "./ai-BTJlE_b5.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-B5SRUUUO.js";
import { _ as useUploadDocument, a as useDocument, s as useDocumentsByFolder, t as useAskRag, u as useFolder } from "./queries-I4d4VPTX.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as Textarea } from "./textarea-1llmCJsE.js";
import { t as DocumentActionsMenu } from "./document-actions-menu-WhXpWAyO.js";
import { t as DocumentViewer } from "./DocumentViewer-C5AoJUhL.js";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, FileText, FolderClosed, Loader2, Send, Sparkles, Upload, ZoomIn, ZoomOut } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//#region src/components/ui/AIChat.tsx
function formatBytes(n) {
	if (!n) return "0 MB";
	if (n < 1024) return `${n} B`;
	if (n < 1024 ** 2) return `${(n / 1024).toFixed(0)} KB`;
	if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(0)} MB`;
	return `${(n / 1024 ** 3).toFixed(2)} GB`;
}
function fileTone(d) {
	const name = (d.title ?? "").toLowerCase();
	if (name.endsWith(".pdf") || d.mimeType?.includes("pdf")) return {
		icon: "text-red-500",
		soft: "bg-red-50"
	};
	if (name.endsWith(".doc") || name.endsWith(".docx") || d.mimeType?.includes("word")) return {
		icon: "text-blue-500",
		soft: "bg-blue-50"
	};
	return {
		icon: "text-primary",
		soft: "bg-muted"
	};
}
function AIChat({ folderId, docId }) {
	const folder = useFolder(folderId);
	const folderDocs = useDocumentsByFolder(folderId);
	const doc = useDocument(docId ?? "");
	const ask = useAskRag();
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [uploadOpen, setUploadOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("content");
	const scrollRef = useRef(null);
	const inputRef = useRef(null);
	const [chatZoom, setChatZoom] = useState(1);
	const zoomOut = () => setChatZoom((z) => Math.max(.8, +(z - .1).toFixed(2)));
	const zoomIn = () => setChatZoom((z) => Math.min(1.6, +(z + .1).toFixed(2)));
	const docs = folderDocs.data ?? [];
	const totalSize = docs.reduce((s, d) => s + (d.fileSize ?? 0), 0);
	useEffect(() => {
		setMessages([]);
	}, [docId]);
	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, ask.isPending]);
	useEffect(() => {
		inputRef.current?.focus();
	}, [docId]);
	const submitChat = async () => {
		if (!input.trim()) return;
		if (!docId) {
			toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
			return;
		}
		const q = input.trim();
		setInput("");
		setMessages((m) => [...m, {
			role: "user",
			content: q
		}]);
		try {
			const res = await ask.mutateAsync({
				id: docId,
				question: q
			});
			setMessages((m) => [...m, {
				role: "assistant",
				content: res.answer
			}]);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Đã xảy ra lỗi");
		} finally {
			inputRef.current?.focus();
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-4 h-[calc(100vh-9rem)]",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: "hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-[10px] font-semibold tracking-wider text-muted-foreground mb-2",
						children: "THƯ MỤC ĐANG DÙNG"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-gradient-soft p-3 border border-border/50 flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(FolderClosed, { className: "h-4.5 w-4.5 text-white" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold font-display truncate",
									children: folder.data?.name ?? "—"
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-[11px] text-muted-foreground",
									children: [
										formatBytes(totalSize),
										" · ",
										docs.length,
										" tài liệu"
									]
								})]
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/folders",
								className: "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0",
								title: "Quản lý thư mục",
								children: /* @__PURE__ */ jsx(FolderClosed, { className: "h-4 w-4" })
							})
						]
					}),
					/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setUploadOpen(true),
						className: "w-full justify-start gap-2 text-primary font-medium text-sm hover:gap-3 transition-all border-primary/30 hover:border-primary hover:bg-primary/5 mb-3",
						children: [/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }), " Tải lên tài liệu"]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-[10px] font-semibold tracking-wider text-muted-foreground mt-5 mb-2",
						children: "TÀI LIỆU ĐANG CÓ"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1 overflow-y-auto flex-1 -mx-1 px-1",
						children: [
							folderDocs.isLoading && Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-10 rounded-lg" }, i)),
							docs.map((d) => {
								const active = d.id === docId;
								const tone = fileTone(d);
								return /* @__PURE__ */ jsxs("div", {
									className: cn("group flex items-center gap-2 rounded-lg pl-2 pr-1 py-2 transition-colors", active ? "bg-red-50 border-l-2 border-red-400" : "hover:bg-accent border-l-2 border-transparent"),
									children: [/* @__PURE__ */ jsxs(Link, {
										to: "/ai",
										search: {
											folderId,
											docId: d.id
										},
										className: "flex items-center gap-2 min-w-0 flex-1",
										children: [/* @__PURE__ */ jsx(FileText, { className: cn("h-4 w-4 shrink-0", tone.icon) }), /* @__PURE__ */ jsx("span", {
											className: cn("truncate text-sm", active ? "font-medium text-foreground" : "text-foreground/90"),
											children: d.title
										})]
									}), /* @__PURE__ */ jsx(DocumentActionsMenu, {
										documentId: d.id,
										folderId,
										title: d.title,
										className: "h-6 w-6 rounded-md hover:bg-background flex items-center justify-center text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100",
										iconClassName: "h-3.5 w-3.5"
									})]
								}, d.id);
							}),
							!folderDocs.isLoading && docs.length === 0 && /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground px-2",
								children: "Chưa có tài liệu"
							})
						]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/folders",
						className: "mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white text-sm font-medium py-2.5 shadow-brand hover:opacity-90 transition-opacity",
						children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }), " Quay về"]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "px-4 pt-3 border-b border-border",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-6 overflow-x-auto",
							children: [
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("content"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "content" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "Original Content"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("summary"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "summary" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "AI Summary"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("flashcards"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "flashcards" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "AI Flashcards"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("quizzes"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "quizzes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "AI Quizzes"
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => navigate({
									to: "/ai",
									search: { folderId }
								}),
								className: cn("px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0", !docId ? "bg-gradient-brand text-white" : "bg-muted text-foreground hover:bg-accent"),
								children: "All"
							}),
							docs.map((d) => /* @__PURE__ */ jsx(Link, {
								to: "/ai",
								search: {
									folderId,
									docId: d.id
								},
								className: cn("px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0", d.id === docId ? "bg-gradient-brand text-white" : "bg-brand-soft text-primary hover:bg-accent"),
								children: d.title
							}, d.id)),
							docs.length > 3 && /* @__PURE__ */ jsx("span", {
								className: "h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0",
								children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
							})
						]
					}),
					activeTab === "content" && /* @__PURE__ */ jsx("div", {
						className: "flex-1 overflow-y-auto",
						children: docId && doc.data?.status === "ready" ? /* @__PURE__ */ jsx(DocumentViewer, { document: doc.data }) : doc.data?.status === "processing" ? /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center gap-2 p-8",
								children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Đang xử lý tài liệu..."
								})]
							})
						}) : doc.data?.status === "failed" ? /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full p-8",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-red-500 text-center",
								children: "Tài liệu đã xảy ra lỗi khi xử lý"
							})
						}) : docId && !doc.data ? /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full p-8",
							children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
						}) : /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-4 p-5",
							children: [
								folderDocs.isLoading && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-40 rounded-xl" }, i)),
								docs.map((d) => {
									const active = d.id === docId;
									const tone = fileTone(d);
									return /* @__PURE__ */ jsx("div", {
										className: cn("group relative flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5", active && "border-primary ring-2 ring-primary/20 shadow-soft"),
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/ai",
											search: {
												folderId,
												docId: d.id
											},
											className: "flex flex-col items-center w-full",
											children: [/* @__PURE__ */ jsx("div", {
												className: "flex-1 flex items-center justify-center w-full py-4",
												children: /* @__PURE__ */ jsx("div", {
													className: cn("h-16 w-16 rounded-xl flex items-center justify-center", tone.soft),
													children: /* @__PURE__ */ jsx(FileText, { className: cn("h-8 w-8", tone.icon) })
												})
											}), /* @__PURE__ */ jsx("div", {
												className: "text-xs font-medium text-primary truncate w-full",
												children: d.title
											})]
										})
									}, d.id);
								}),
								!folderDocs.isLoading && docs.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "col-span-full text-sm text-muted-foreground text-center py-10",
									children: "Chưa có tài liệu trong thư mục này."
								})
							]
						})
					}),
					" ",
					activeTab === "summary" && /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6" }),
					activeTab === "flashcards" && /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6" }),
					activeTab === "quizzes" && /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6" })
				]
			}),
			/* @__PURE__ */ jsxs("aside", {
				className: "bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "px-4 py-3 border-b border-border flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm font-semibold font-display truncate flex-1 text-center",
							children: doc.data?.title ?? "Chưa chọn tài liệu"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-0.5 shrink-0",
							children: [
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: zoomOut,
									disabled: chatZoom <= .8,
									title: "Thu nhỏ",
									className: "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground disabled:opacity-40",
									children: /* @__PURE__ */ jsx(ZoomOut, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-[11px] text-muted-foreground w-9 text-center tabular-nums",
									children: [Math.round(chatZoom * 100), "%"]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: zoomIn,
									disabled: chatZoom >= 1.6,
									title: "Phóng to",
									className: "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground disabled:opacity-40",
									children: /* @__PURE__ */ jsx(ZoomIn, { className: "h-4 w-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						ref: scrollRef,
						className: "flex-1 overflow-y-auto p-4 space-y-3",
						style: { fontSize: `${chatZoom}rem` },
						children: [messages.length === 0 ? /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center justify-center h-full text-center px-4 py-8",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3",
									children: /* @__PURE__ */ jsx(Sparkles, { className: "h-7 w-7 text-primary" })
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-base font-semibold font-display",
									children: "Trò chuyện với AI"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground mt-1 max-w-sm",
									children: docId ? "Hỏi AI để tóm tắt, giải thích hoặc kiểm tra kiến thức từ tài liệu này." : "Chọn một tài liệu để bắt đầu trò chuyện."
								})
							]
						}) : messages.map((m, i) => /* @__PURE__ */ jsx("div", {
							className: cn("text-[1em] rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed", m.role === "user" ? "bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft whitespace-pre-wrap" : "bg-muted text-foreground rounded-bl-md prose prose-sm dark:prose-invert prose-p:m-1 prose-pre:m-1 prose-ul:m-1 prose-ol:m-1"),
							children: m.role === "user" ? m.content : /* @__PURE__ */ jsx(ReactMarkdown, {
								remarkPlugins: [remarkGfm],
								components: {
									code: ({ inline, className, children, ...props }) => /* @__PURE__ */ jsx("code", {
										className: cn("rounded px-1.5 py-0.5", inline ? "bg-slate-700 text-slate-100" : "block bg-slate-800 text-slate-100 overflow-x-auto p-2 my-1"),
										...props,
										children
									}),
									a: ({ children, ...props }) => /* @__PURE__ */ jsx("a", {
										className: "text-blue-500 hover:underline",
										...props,
										children
									})
								},
								children: m.content
							})
						}, i)), ask.isPending && /* @__PURE__ */ jsxs("div", {
							className: "text-sm bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%] inline-flex items-center gap-1.5",
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
							ref: inputRef,
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Nhập câu hỏi của bạn….",
							className: "text-sm rounded-xl bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-input",
							disabled: !docId
						}), /* @__PURE__ */ jsx(Button, {
							type: "submit",
							size: "icon",
							disabled: ask.isPending || !input.trim() || !docId,
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
//#endregion
//#region src/routes/_authenticated/ai.tsx?tsr-split=component
function AIChatPage() {
	const { folderId, docId } = Route.useSearch();
	return /* @__PURE__ */ jsx(AIChat, {
		folderId,
		docId
	});
}
//#endregion
export { AIChatPage as component };
