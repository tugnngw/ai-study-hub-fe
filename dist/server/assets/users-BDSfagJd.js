import { t as cn } from "./utils-CZKD4yH6.js";
import { t as Button } from "./button-C90jjaif.js";
import { t as Input } from "./input-Cek7xrlr.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-D4JpMjWP.js";
import { t as Badge } from "./badge-CXVSNBvN.js";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-C9-cV9dF.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CvauYBoD.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-BW_ewuzj.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as adminUserApi } from "./userApi-BLmljLkG.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Lock, Search, Trash2, Unlock } from "lucide-react";
//#region src/features/admin/hooks/useAdminUsers.ts
function useAdminUsers() {
	return useQuery({
		queryKey: adminKeys.users(),
		queryFn: async () => await adminUserApi.getUsers() ?? []
	});
}
function useDeleteUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => adminUserApi.softDeleteUser(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() })
	});
}
function useLockUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => adminUserApi.lockUser(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() })
	});
}
function useUnlockUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => adminUserApi.unlockUser(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() })
	});
}
//#endregion
//#region src/features/admin/components/PlanBadge.tsx
var styles = {
	FREE: "bg-muted text-muted-foreground border-transparent",
	BASIC: "bg-primary/10 text-primary border-transparent",
	PRO: "bg-gradient-brand text-white border-transparent shadow-sm",
	PREMIUM: "bg-amber-500/10 text-amber-600 border-amber-500/20"
};
var labels = {
	FREE: "Free",
	BASIC: "Basic",
	PRO: "Pro",
	PREMIUM: "Premium"
};
var PlanBadge = ({ plan, className }) => /* @__PURE__ */ jsx(Badge, {
	variant: "secondary",
	className: cn(styles[plan], className),
	children: labels[plan]
});
//#endregion
//#region src/features/admin/components/AdminUsersPage.tsx
var AdminUsersPage = () => {
	const [query, setQuery] = useState("");
	const { data: usersResponse = [], isLoading } = useAdminUsers();
	const users = Array.isArray(usersResponse) ? usersResponse : [];
	const lockUser = useLockUser();
	const unlockUser = useUnlockUser();
	const deleteUser = useDeleteUser();
	const filtered = useMemo(() => users.filter((u) => u.name?.toLowerCase().includes(query.toLowerCase()) || u.email?.toLowerCase().includes(query.toLowerCase())), [users, query]);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center h-64",
		children: /* @__PURE__ */ jsx("div", {
			className: "text-muted-foreground",
			children: "Đang tải..."
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between gap-4 flex-wrap",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Quản lý Users"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Quản lý tài khoản thành viên trong hệ thống"
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "relative w-full max-w-xs",
				children: [/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
					placeholder: "Tìm tên hoặc email…",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					className: "pl-9"
				})]
			})]
		}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "flex-row items-center justify-between space-y-0",
			children: [/* @__PURE__ */ jsx(CardTitle, {
				className: "text-base",
				children: "Danh sách thành viên"
			}), /* @__PURE__ */ jsxs("span", {
				className: "text-sm text-muted-foreground",
				children: [filtered.length, " thành viên"]
			})]
		}), /* @__PURE__ */ jsx(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto w-full border border-border/60 rounded-lg",
				children: /* @__PURE__ */ jsxs(Table, {
					className: "min-w-[800px]",
					children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableHead, { children: "Tên" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Username" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Email" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
						/* @__PURE__ */ jsx(TableHead, {
							className: "text-right",
							children: "Hành động"
						})
					] }) }), /* @__PURE__ */ jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
						colSpan: 6,
						className: "h-24 text-center text-muted-foreground",
						children: users.length === 0 ? "Không có thành viên nào" : "Không tìm thấy thành viên"
					}) }) : filtered.map((u) => /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableCell, {
							className: "max-w-[200px]",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ jsx(Avatar, {
									className: "h-9 w-9 shrink-0",
									children: /* @__PURE__ */ jsx(AvatarFallback, {
										className: "bg-muted text-sm",
										children: u.name?.charAt(0).toUpperCase() ?? "?"
									})
								}), /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
									asChild: true,
									children: /* @__PURE__ */ jsx("span", {
										className: "font-medium truncate block cursor-help",
										children: u.name ?? "-"
									})
								}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: u.name ?? "—" }) })] }) })]
							})
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-muted-foreground max-w-[150px]",
							children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("span", {
									className: "truncate block cursor-help",
									children: u.username || "-"
								})
							}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: u.username || "—" }) })] }) })
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-muted-foreground max-w-[200px]",
							children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("span", {
									className: "truncate block cursor-help",
									children: u.email
								})
							}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: u.email }) })] }) })
						}),
						/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(PlanBadge, { plan: u.plan }) }),
						/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
							variant: u.status === "Hoạt động" ? "secondary" : u.status === "Ngưng hoạt động (Khóa)" ? "outline" : "destructive",
							children: u.status
						}) }),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									disabled: lockUser.isPending || unlockUser.isPending,
									onClick: () => u.status === "Hoạt động" ? lockUser.mutate(u.id, { onSuccess: () => toast.success("Đã khóa tài khoản") }) : unlockUser.mutate(u.id, { onSuccess: () => toast.success("Đã mở khóa tài khoản") }),
									children: [lockUser.isPending || unlockUser.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin mr-1" }) : u.status === "Hoạt động" ? /* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5 mr-1" }) : /* @__PURE__ */ jsx(Unlock, { className: "h-3.5 w-3.5 mr-1" }), lockUser.isPending || unlockUser.isPending ? "Đang xử lý..." : u.status === "Hoạt động" ? "Khóa" : "Mở khóa"]
								}), /* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									className: "text-destructive hover:text-destructive",
									disabled: deleteUser.isPending || u.status === "Xóa mềm",
									onClick: () => {
										if (window.confirm(`Xóa thành viên "${u.name ?? ""}"?`)) deleteUser.mutate(u.id, { onSuccess: () => toast.success("Đã xóa thành viên") });
									},
									children: [deleteUser.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin mr-1" }) : /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5 mr-1" }), deleteUser.isPending ? "Đang xóa..." : u.status === "Xóa mềm" ? "Đã xóa" : "Xóa"]
								})]
							})
						})
					] }, u.id)) })]
				})
			})
		})] })]
	});
};
//#endregion
//#region src/routes/admin_panel/users.tsx?tsr-split=component
var SplitComponent = AdminUsersPage;
//#endregion
export { SplitComponent as component };
