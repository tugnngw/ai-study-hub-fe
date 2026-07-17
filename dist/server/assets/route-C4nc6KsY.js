import { n as useAuth } from "./auth-DMiM-CCq.js";
import { r as useTheme } from "./theme-DyHR6V10.js";
import { n as formatBytes, t as cn } from "./utils-BlvTLkCV.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { A as useSemesters, C as useQuota, N as useSubjects, o as useDocument, p as useFolders, s as useDocuments } from "./queries-BZClv1r5.js";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CMUoSIKJ.js";
import { t as Progress } from "./progress-BS38uVhb.js";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Cloud, Crown, Database, FileText, FolderKanban, LayoutDashboard, Loader2, LogOut, Moon, PanelLeft, Receipt, Search, Settings, Sparkles, Sun, Trash2, User, Users } from "lucide-react";
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
		to: "/reported",
		label: "Báo cáo vi phạm",
		icon: AlertCircle
	},
	{
		to: "/cloud",
		label: "Lưu trữ Cloud",
		icon: Cloud
	},
	{
		to: "/premium",
		label: "Nâng cấp Premium",
		icon: Crown
	},
	{
		to: "/transactions",
		label: "Lịch sử giao dịch",
		icon: Receipt
	}
];
var SIDEBAR_COLLAPSED_KEY = "ai-study-hub:sidebar-collapsed";
function getInitialCollapsed() {
	if (typeof window === "undefined") return false;
	try {
		return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1";
	} catch {
		return false;
	}
}
function AppShell({ children }) {
	const { user, logout, reloadUser } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const search = useRouterState({ select: (s) => s.location.search });
	const { data: documents } = useDocuments();
	const { data: quota } = useQuota();
	const folders = useFolders();
	const semesters = useSemesters();
	const subjects = useSubjects();
	const folderMap = useMemo(() => new Map((folders.data ?? []).map((f) => [f.id, f])), [folders.data]);
	const semesterMap = useMemo(() => new Map((semesters.data ?? []).map((s) => [s.id, s.name])), [semesters.data]);
	const subjectMap = useMemo(() => new Map((subjects.data ?? []).map((s) => [s.id, s.name])), [subjects.data]);
	const [collapsed, setCollapsedState] = useState(getInitialCollapsed);
	const [headerSearch, setHeaderSearch] = useState("");
	const headerSearchResults = useMemo(() => {
		if (!headerSearch.trim()) return [];
		const q = headerSearch.toLowerCase();
		return (documents ?? []).filter((d) => d.title.toLowerCase().includes(q)).slice(0, 8);
	}, [headerSearch, documents]);
	const { theme, toggleTheme } = useTheme();
	useEffect(() => {
		const interval = setInterval(() => {
			reloadUser().catch(() => {});
		}, 6e4);
		return () => clearInterval(interval);
	}, [reloadUser]);
	const setCollapsed = (value) => {
		setCollapsedState(value);
		try {
			window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, value ? "1" : "0");
		} catch {}
	};
	const openDoc = useDocument((search?.docId ? String(search.docId) : void 0) || "");
	const used = documents?.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) || 0;
	const total = (quota?.storageGb ?? user?.storageGb ?? 1) * 1024 * 1024 * 1024;
	const pct = Math.min(100, used / total * 100);
	const handleLogout = async () => {
		await logout();
		navigate({ to: "/auth/login" });
	};
	const initial = user?.fullName?.[0]?.toUpperCase() ?? "U";
	const isFolderDetail = pathname.startsWith("/folders/") || pathname.startsWith("/documents/") || pathname.startsWith("/ai");
	return /* @__PURE__ */ jsxs("div", {
		className: "h-dvh flex",
		children: [/* @__PURE__ */ jsxs("aside", {
			className: cn("hidden md:flex md:flex-col shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-all duration-300", collapsed ? "md:w-16" : "md:w-64"),
			children: [
				/* @__PURE__ */ jsx("div", {
					className: cn("px-5 py-5 border-b border-border flex items-center gap-2", collapsed ? "justify-center px-0" : ""),
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/dashboard",
						className: "flex items-center gap-2.5 group min-w-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0",
							children: /* @__PURE__ */ jsx(Sparkles, {
								className: "h-4.5 w-4.5 text-white",
								strokeWidth: 2.5
							})
						}), !collapsed && /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "font-display font-bold text-base leading-tight truncate",
								children: "AI Study Hub"
							}), /* @__PURE__ */ jsx("div", {
								className: "text-[10px] text-muted-foreground tracking-wider uppercase",
								children: "Learn smarter"
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "flex-1 p-3 space-y-0.5 overflow-y-auto",
					children: [!collapsed && /* @__PURE__ */ jsx("div", {
						className: "text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5",
						children: "WORKSPACE"
					}), nav.map((item) => {
						const active = pathname.startsWith(item.to);
						return /* @__PURE__ */ jsxs(Link, {
							to: item.to,
							className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative", collapsed && "justify-center px-0", active ? "bg-gradient-brand text-white shadow-brand font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"),
							title: collapsed ? item.label : void 0,
							children: [/* @__PURE__ */ jsx(item.icon, {
								className: cn("h-4 w-4 shrink-0", active && "drop-shadow-sm"),
								strokeWidth: active ? 2.5 : 2
							}), !collapsed && /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: item.label
							})]
						}, item.to);
					})]
				}),
				!collapsed && /* @__PURE__ */ jsx("div", {
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
									" / ",
									formatBytes(total)
								]
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1 min-w-0 flex flex-col min-h-0",
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
						/* @__PURE__ */ jsx("button", {
							onClick: () => setCollapsed(!collapsed),
							className: "hidden md:flex p-1.5 hover:bg-accent rounded-lg",
							title: collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar",
							children: /* @__PURE__ */ jsx(PanelLeft, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "hidden sm:flex items-center gap-2 flex-1 max-w-md",
							children: isFolderDetail && openDoc.data ? /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 min-w-0 text-sm font-medium",
								children: [/* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: openDoc.data.title
								})]
							}) : /* @__PURE__ */ jsxs("div", {
								className: "relative w-full",
								children: [
									/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
									/* @__PURE__ */ jsx(Input, {
										value: headerSearch,
										onChange: (e) => setHeaderSearch(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter" && headerSearch.trim()) {
												const url = `/documents?q=${encodeURIComponent(headerSearch.trim())}`;
												window.location.href = url;
											}
										},
										placeholder: "Tìm tài liệu, thư mục...",
										className: "pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input"
									}),
									headerSearch.trim() && /* @__PURE__ */ jsx("div", {
										className: "absolute top-full mt-1 left-0 right-0 bg-popover border border-border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto p-1.5",
										children: headerSearchResults.length === 0 ? /* @__PURE__ */ jsx("div", {
											className: "px-3 py-4 text-xs text-muted-foreground text-center",
											children: "Không tìm thấy"
										}) : headerSearchResults.map((d) => {
											const folder = d.folderId ? folderMap.get(d.folderId) : null;
											const semName = folder?.semesterId ? semesterMap.get(folder.semesterId) : null;
											const subName = folder?.subjectId ? subjectMap.get(folder.subjectId) : null;
											return /* @__PURE__ */ jsxs("button", {
												className: "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg hover:bg-accent transition-colors",
												onClick: () => {
													setHeaderSearch("");
													window.location.href = `/ai?folderId=${d.folderId ?? ""}&docId=${d.id}`;
												},
												children: [
													/* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 shrink-0 text-primary" }),
													/* @__PURE__ */ jsxs("div", {
														className: "flex-1 min-w-0",
														children: [/* @__PURE__ */ jsx("div", {
															className: "text-sm font-medium truncate",
															children: d.title
														}), /* @__PURE__ */ jsxs("div", {
															className: "text-[11px] text-muted-foreground mt-0.5",
															children: [
																folder?.name ?? "",
																folder?.name && semName ? ` · ${semName}` : "",
																folder?.name && subName ? ` · ${subName}` : ""
															]
														})]
													}),
													folder && /* @__PURE__ */ jsx("span", {
														className: "shrink-0 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full truncate max-w-[120px]",
														children: folder.name
													})
												]
											}, d.id);
										})
									})
								]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "ml-auto flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: toggleTheme,
								className: "h-9 w-9 flex items-center justify-center hover:bg-accent rounded-full transition-colors",
								title: theme === "dark" ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode",
								children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs("button", {
									className: "flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft",
										children: initial
									}), /* @__PURE__ */ jsxs("div", {
										className: "hidden sm:flex flex-col items-start leading-tight",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-medium",
												children: user?.fullName ?? "User"
											}), user?.role !== "ADMIN" && user?.plan && user.plan !== "FREE" && /* @__PURE__ */ jsx("span", {
												className: "text-[9px] font-bold bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-full border border-amber-500/20",
												children: user.plan
											})]
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
											children: [/* @__PURE__ */ jsx(User, { className: "h-4 w-4 mr-2" }), " Hồ sơ của tôi"]
										})
									}),
									/* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/admin",
											className: "cursor-pointer",
											children: [/* @__PURE__ */ jsx(Settings, { className: "h-4 w-4 mr-2" }), " Cài đặt & Bảo mật"]
										})
									}),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: handleLogout,
										className: "cursor-pointer text-destructive focus:text-destructive",
										children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-2" }), " Đăng xuất"]
									})
								]
							})] })]
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
					className: "flex-1 min-w-0 flex flex-col min-h-0",
					children: isFolderDetail ? /* @__PURE__ */ jsx("div", {
						className: "flex-1 min-h-0 overflow-hidden",
						children
					}) : /* @__PURE__ */ jsx("div", {
						className: "px-6 md:px-8 lg:px-10 py-6 lg:py-8 max-w-screen-2xl mx-auto w-full overflow-y-auto",
						children
					})
				})
			]
		})]
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
