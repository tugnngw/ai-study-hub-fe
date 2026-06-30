import { n as api } from "./api-WaaweWSf.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-CcHbQ4nc.js";
import { t as adminKeys } from "./adminKeys-DCGILVa1.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Download, FileStack, Flag, Trash, TrendingDown, TrendingUp, Upload, UserPlus, Users } from "lucide-react";
//#region src/features/admin/services/dashboardApi.ts
var dashboardApi = {
	getStats: () => api("/api/admin/dashboard/stats"),
	getRecentActivity: () => api("/api/admin/dashboard/activity")
};
//#endregion
//#region src/features/admin/hooks/useAdminDashboard.ts
function useAdminStats() {
	return useQuery({
		queryKey: adminKeys.dashboardStats(),
		queryFn: () => dashboardApi.getStats()
	});
}
function useAdminActivity() {
	return useQuery({
		queryKey: adminKeys.dashboardActivity(),
		queryFn: () => dashboardApi.getRecentActivity()
	});
}
//#endregion
//#region src/features/admin/components/AdminDashboardPage.tsx
var activityIcon = {
	user: /* @__PURE__ */ jsx(UserPlus, { className: "h-4 w-4" }),
	upload: /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
	report: /* @__PURE__ */ jsx(Flag, { className: "h-4 w-4" }),
	delete: /* @__PURE__ */ jsx(Trash, { className: "h-4 w-4" })
};
var activityTone = {
	user: "bg-primary/10 text-primary",
	upload: "bg-emerald-500/10 text-emerald-600",
	report: "bg-amber-500/10 text-amber-600",
	delete: "bg-destructive/10 text-destructive"
};
function StatCard({ label, value, trend, icon, tone }) {
	const up = (trend ?? 0) >= 0;
	return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
		className: "pt-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					className: cn("h-11 w-11 rounded-xl flex items-center justify-center", tone),
					children: icon
				}), trend !== void 0 && /* @__PURE__ */ jsxs("span", {
					className: cn("inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full", up ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"),
					children: [
						up ? /* @__PURE__ */ jsx(TrendingUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(TrendingDown, { className: "h-3.5 w-3.5" }),
						Math.abs(trend),
						"%"
					]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground text-sm font-medium mt-4",
				children: label
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-3xl font-bold tracking-tight mt-1 font-display",
				children: value
			})
		]
	}) });
}
var AdminDashboardPage = () => {
	const { data: stats } = useAdminStats();
	const { data: activity = [] } = useAdminActivity();
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Dashboard"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Tổng quan hoạt động hệ thống"
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ jsx(StatCard, {
						label: "Tổng Users",
						value: stats?.totalUsers.toLocaleString("vi-VN") ?? "—",
						trend: stats?.totalUsersTrend,
						icon: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
						tone: "bg-primary/10 text-primary"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Tổng Tài liệu",
						value: stats?.totalDocs.toLocaleString("vi-VN") ?? "—",
						trend: stats?.totalDocsTrend,
						icon: /* @__PURE__ */ jsx(FileStack, { className: "h-5 w-5" }),
						tone: "bg-emerald-500/10 text-emerald-600"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Download",
						value: stats?.totalDownloads.toLocaleString("vi-VN") ?? "—",
						trend: stats?.totalDownloadsTrend,
						icon: /* @__PURE__ */ jsx(Download, { className: "h-5 w-5" }),
						tone: "bg-amber-500/10 text-amber-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
				className: "text-base",
				children: "Hoạt động gần đây"
			}) }), /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: activity?.map((item, i) => /* @__PURE__ */ jsxs("div", {
					className: cn("flex items-center gap-4 px-6 py-3.5 hover:bg-muted/40 transition-colors", i !== activity.length - 1 && "border-b border-border"),
					children: [
						/* @__PURE__ */ jsx("div", {
							className: cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", activityTone[item.type]),
							children: activityIcon[item.type]
						}),
						/* @__PURE__ */ jsx(Avatar, {
							className: "h-8 w-8",
							children: /* @__PURE__ */ jsx(AvatarFallback, {
								className: "text-xs bg-muted",
								children: item.actor.charAt(0)
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-medium text-sm truncate",
								children: item.title
							}), /* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground text-xs truncate",
								children: item.actor
							})]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground text-xs shrink-0",
							children: item.time
						})
					]
				}, item.id))
			})] })
		]
	});
};
//#endregion
//#region src/routes/admin_panel/index.tsx?tsr-split=component
var SplitComponent = AdminDashboardPage;
//#endregion
export { SplitComponent as component };
