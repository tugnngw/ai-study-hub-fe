import { n as useAuth } from "./auth-ZyesprRF.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { n as Input, t as Label } from "./label-B7oQAA24.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { f as useFolders, s as useDocuments, x as useUploadDocument } from "./queries-CwH5qVX2.js";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BtjXROHi.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.js";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Cloud, Database, FileText, FolderKanban, LayoutDashboard, Loader2, LogOut, Search, Sparkles, Trash2, Upload, User, Users } from "lucide-react";
//#region src/components/upload-document-dialog.tsx
function UploadDocumentDialog({ open, onOpenChange, defaultFolderId }) {
	const folders = useFolders();
	const upload = useUploadDocument();
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [folderId, setFolderId] = useState(defaultFolderId ? String(defaultFolderId) : "");
	useEffect(() => {
		if (open && defaultFolderId) setFolderId(String(defaultFolderId));
	}, [open, defaultFolderId]);
	const reset = () => {
		setFile(null);
		setTitle("");
		setDescription("");
		setFolderId(defaultFolderId ? String(defaultFolderId) : "");
	};
	const submit = async () => {
		if (!file) return toast.error("Chọn một file");
		if (!title.trim()) return toast.error("Nhập tiêu đề");
		if (!folderId) return toast.error("Chọn thư mục");
		try {
			await upload.mutateAsync({
				file,
				folderId,
				title,
				description
			});
			toast.success("Đã tải lên tài liệu");
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
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Tải lên tài liệu" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Thêm tệp mới vào không gian làm việc của bạn." })] }),
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
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Tên tài liệu"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Mô tả (tuỳ chọn)" }), /* @__PURE__ */ jsx(Textarea, {
							value: description,
							onChange: (e) => setDescription(e.target.value)
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
//#region src/components/app-shell.tsx
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/folders",
		label: "Thư mục",
		icon: FolderKanban
	},
	{
		to: "/documents",
		label: "Tài liệu",
		icon: FileText
	},
	{
		to: "/shared",
		label: "Được chia sẻ",
		icon: Users
	},
	{
		to: "/trash",
		label: "Thùng rác",
		icon: Trash2
	},
	{
		to: "/cloud",
		label: "Lưu trữ Cloud",
		icon: Cloud
	}
];
function formatBytes(n) {
	if (!n) return "0 B";
	if (n < 1024) return `${n} B`;
	if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
	if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
	return `${(n / 1024 ** 3).toFixed(2)} GB`;
}
function AppShell({ children }) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { data: documents } = useDocuments();
	const used = documents?.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) || 0;
	const total = 15 * 1024 * 1024 * 1024;
	const pct = Math.min(100, used / total * 100);
	const handleLogout = async () => {
		await logout();
		navigate({ to: "/auth/login" });
	};
	const initial = user?.fullName?.[0]?.toUpperCase() ?? "U";
	const [uploadOpen, setUploadOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: "hidden md:flex md:flex-col md:w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "px-5 py-5 border-b border-sidebar-border",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/dashboard",
							className: "flex items-center gap-2.5 group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform",
								children: /* @__PURE__ */ jsx(Sparkles, {
									className: "h-4.5 w-4.5 text-white",
									strokeWidth: 2.5
								})
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "font-display font-bold text-base leading-tight",
								children: "AI Study Hub"
							}), /* @__PURE__ */ jsx("div", {
								className: "text-[10px] text-muted-foreground tracking-wider uppercase",
								children: "Learn smarter"
							})] })]
						})
					}),
					/* @__PURE__ */ jsxs("nav", {
						className: "flex-1 p-3 space-y-0.5 overflow-y-auto",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5",
							children: "WORKSPACE"
						}), nav.map((item) => {
							const active = pathname.startsWith(item.to);
							return /* @__PURE__ */ jsxs(Link, {
								to: item.to,
								className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative", active ? "bg-gradient-brand text-white shadow-brand font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"),
								children: [/* @__PURE__ */ jsx(item.icon, {
									className: cn("h-4 w-4 shrink-0", active && "drop-shadow-sm"),
									strokeWidth: active ? 2.5 : 2
								}), /* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: item.label
								})]
							}, item.to);
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "px-3 pb-1",
						children: /* @__PURE__ */ jsxs(Button, {
							onClick: () => setUploadOpen(true),
							className: "w-full justify-start bg-gradient-brand text-white hover:opacity-90 shadow-brand",
							children: [/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 mr-2" }), " Tải lên tài liệu"]
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "p-3",
						children: /* @__PURE__ */ jsxs("div", {
							className: "rounded-xl border border-sidebar-border bg-card/60 p-3.5 space-y-2.5",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Database, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-semibold",
										children: "Dung lượng"
									})]
								}),
								/* @__PURE__ */ jsx(Progress, {
									value: pct,
									className: "h-1.5"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "text-[11px] text-muted-foreground",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-medium text-foreground",
											children: formatBytes(used)
										}),
										" ",
										"/ ",
										formatBytes(total)
									]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1 min-w-0 flex flex-col",
				children: [
					/* @__PURE__ */ jsxs("header", {
						className: "h-16 border-b border-border/60 bg-background/70 backdrop-blur-xl flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30",
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "/dashboard",
								className: "md:hidden flex items-center gap-2",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center",
									children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-white" })
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "hidden sm:flex items-center gap-2 flex-1 max-w-md",
								children: /* @__PURE__ */ jsxs("div", {
									className: "relative w-full",
									children: [/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										placeholder: "Tìm tài liệu, thư mục…",
										className: "pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input"
									})]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "ml-auto flex items-center gap-2",
								children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ jsxs("button", {
										className: "flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors",
										children: [/* @__PURE__ */ jsx("div", {
											className: "h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft",
											children: initial
										}), /* @__PURE__ */ jsxs("div", {
											className: "hidden sm:flex flex-col items-start leading-tight",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-medium",
												children: user?.fullName ?? "User"
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-[10px] text-muted-foreground",
												children: ["@", user?.username ?? "user"]
											})]
										})]
									})
								}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
									align: "end",
									className: "w-60",
									children: [
										/* @__PURE__ */ jsx(DropdownMenuLabel, {
											className: "pb-2",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("div", {
													className: "h-10 w-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-semibold",
													children: initial
												}), /* @__PURE__ */ jsxs("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ jsx("div", {
														className: "font-semibold truncate",
														children: user?.fullName
													}), /* @__PURE__ */ jsx("div", {
														className: "text-xs text-muted-foreground font-normal truncate",
														children: user?.email
													})]
												})]
											})
										}),
										/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
										/* @__PURE__ */ jsx(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ jsxs(Link, {
												to: "/profile",
												className: "cursor-pointer",
												children: [/* @__PURE__ */ jsx(User, { className: "h-4 w-4 mr-2" }), " Hồ sơ"]
											})
										}),
										/* @__PURE__ */ jsx(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ jsxs(Link, {
												to: "/profile",
												className: "cursor-pointer",
												children: [/* @__PURE__ */ jsx(User, { className: "h-4 w-4 mr-2" }), " Hồ sơ"]
											})
										}),
										/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
										/* @__PURE__ */ jsxs(DropdownMenuItem, {
											onClick: handleLogout,
											className: "cursor-pointer text-destructive focus:text-destructive",
											children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-2" }), " Đăng xuất"]
										})
									]
								})] })
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "md:hidden border-b border-border bg-card/60 backdrop-blur-md",
						children: /* @__PURE__ */ jsx("nav", {
							className: "flex overflow-x-auto px-2 py-2 gap-1",
							children: nav.map((item) => {
								const active = pathname.startsWith(item.to);
								return /* @__PURE__ */ jsxs(Link, {
									to: item.to,
									className: cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap", active ? "bg-gradient-brand text-white" : "text-muted-foreground hover:bg-accent"),
									children: [/* @__PURE__ */ jsx(item.icon, { className: "h-3.5 w-3.5" }), item.label]
								}, item.to);
							})
						})
					}),
					/* @__PURE__ */ jsx("main", {
						className: "flex-1 min-w-0",
						children: /* @__PURE__ */ jsx("div", {
							className: "p-6 md:p-8 max-w-7xl mx-auto",
							children
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(UploadDocumentDialog, {
				open: uploadOpen,
				onOpenChange: setUploadOpen
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/route.tsx?tsr-split=component
function AuthLayout() {
	const { isAuthenticated, isLoading, user } = useAuth();
	useEffect(() => {
		if (!isLoading && !isAuthenticated) window.location.href = "/auth/login";
	}, [
		isAuthenticated,
		isLoading,
		user
	]);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ jsx(Loader2, { className: "h-12 w-12 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Đang tải..."
			})]
		})
	});
	if (!isAuthenticated) return null;
	return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
//#endregion
export { AuthLayout as component };
