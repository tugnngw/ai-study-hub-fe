import { n as useAuth } from "./auth-DMiM-CCq.js";
import { r as useTheme } from "./theme-DyHR6V10.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BtjXROHi.js";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ClipboardCheck, Crown, FileText, History, LayoutDashboard, Loader2, LogOut, Moon, PanelLeft, PanelLeftClose, Search, ShieldCheck, Sun, Trash2, User, Users } from "lucide-react";
//#region src/features/admin/components/AdminShell.tsx
var nav = [
	{
		to: "/admin_panel",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin_panel/users",
		label: "Quản lý Users",
		icon: Users,
		exact: false
	},
	{
		to: "/admin_panel/files",
		label: "Quản lý tài liệu",
		icon: FileText,
		exact: false
	},
	{
		to: "/admin_panel/approvals",
		label: "Báo cáo file",
		icon: ClipboardCheck,
		exact: false
	},
	{
		to: "/admin_panel/report_history",
		label: "Lịch sử báo cáo",
		icon: History,
		exact: false
	},
	{
		to: "/admin_panel/trash",
		label: "Thùng rác",
		icon: Trash2,
		exact: false
	},
	{
		to: "/admin_panel/premium",
		label: "Premium",
		icon: Crown,
		exact: false
	},
	{
		to: "/admin_panel/profile",
		label: "Hồ sơ",
		icon: User,
		exact: false
	}
];
var isActivePath = (pathname, to, exact) => exact ? pathname === to || pathname === `${to}/` : pathname.startsWith(to);
function AdminShell({ children }) {
	const { user, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [collapsed, setCollapsed] = useState(false);
	const handleLogout = async () => {
		await logout();
		navigate({ to: "/auth/login" });
	};
	const initial = (user?.fullName?.[0] ?? "A").toUpperCase();
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex",
		children: [/* @__PURE__ */ jsxs("aside", {
			className: cn("hidden md:flex md:flex-col shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-all duration-300", collapsed ? "md:w-16" : "md:w-64"),
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("px-5 py-5 border-b border-border flex items-center gap-2", collapsed ? "justify-center px-0" : ""),
				children: [
					/* @__PURE__ */ jsxs(Link, {
						to: "/admin_panel",
						className: "flex items-center gap-2.5 group min-w-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0",
							children: /* @__PURE__ */ jsx(ShieldCheck, {
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
								children: "Quản trị"
							})]
						})]
					}),
					!collapsed && /* @__PURE__ */ jsx("button", {
						onClick: () => setCollapsed(true),
						className: "p-1 hover:bg-accent rounded-lg ml-auto shrink-0",
						children: /* @__PURE__ */ jsx(PanelLeftClose, { className: "h-4 w-4" })
					}),
					collapsed && /* @__PURE__ */ jsx("button", {
						onClick: () => setCollapsed(false),
						className: "p-1 hover:bg-accent rounded-lg",
						children: /* @__PURE__ */ jsx(PanelLeft, { className: "h-4 w-4" })
					})
				]
			}), /* @__PURE__ */ jsxs("nav", {
				className: "flex-1 p-3 space-y-0.5 overflow-y-auto",
				children: [!collapsed && /* @__PURE__ */ jsx("div", {
					className: "text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5",
					children: "QUẢN TRỊ HỆ THỐNG"
				}), nav.map((item) => {
					const active = isActivePath(pathname, item.to, item.exact);
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
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "h-16 border-b border-border/60 bg-background/70 backdrop-blur-xl flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/admin_panel",
							className: "md:hidden flex items-center gap-2",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center",
								children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-white" })
							})
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setCollapsed(!collapsed),
							className: "hidden md:flex p-1.5 hover:bg-accent rounded-lg",
							children: /* @__PURE__ */ jsx(PanelLeft, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "hidden sm:flex items-center gap-2 flex-1 max-w-md",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative w-full",
								children: [/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
									placeholder: "Tìm kiếm…",
									className: "pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input"
								})]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "ml-auto flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: toggleTheme,
								className: "p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground transition-colors",
								title: theme === "dark" ? "Chuyển nền sáng" : "Chuyển nền tối",
								"aria-label": "Đổi giao diện sáng/tối",
								children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
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
											children: user?.fullName ?? "Admin"
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-[10px] text-muted-foreground",
											children: ["@", user?.username ?? "admin"]
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
													children: user?.fullName ?? "Quản trị viên"
												}), /* @__PURE__ */ jsx("div", {
													className: "text-xs text-muted-foreground font-normal truncate",
													children: user?.email ?? "admin"
												})]
											})]
										})
									}),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									/* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/admin_panel/profile",
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
							})] })]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "md:hidden border-b border-border bg-card/60 backdrop-blur-md",
					children: /* @__PURE__ */ jsx("nav", {
						className: "flex overflow-x-auto px-2 py-2 gap-1",
						children: nav.map((item) => {
							const active = isActivePath(pathname, item.to, item.exact);
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
						className: "p-6 md:p-8",
						children
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/routes/admin_panel/route.tsx?tsr-split=component
function AdminLayoutRoute() {
	const { isAuthenticated, isLoading, user } = useAuth();
	const navigate = useNavigate();
	const isAdmin = user?.role === "ADMIN";
	useEffect(() => {
		if (isLoading) return;
		if (!isAuthenticated) navigate({
			to: "/auth/login",
			replace: true
		});
		else if (!isAdmin) navigate({
			to: "/dashboard",
			replace: true
		});
	}, [
		isAuthenticated,
		isLoading,
		isAdmin,
		navigate
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
	if (!isAuthenticated || !isAdmin) return null;
	return /* @__PURE__ */ jsx(AdminShell, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
//#endregion
export { AdminLayoutRoute as component };
