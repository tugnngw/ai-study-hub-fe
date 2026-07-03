import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DJOO1b-0.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BgKcOzjx.js";
import { t as useAdminTransactions } from "./useAdminTransactions-DbqvmLU7.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Clock, Crown, Loader2, TrendingDown, TrendingUp, Wallet, XCircle } from "lucide-react";
//#region src/features/admin/components/AdminPremiumPage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
var fmtDate = (date) => new Date(date).toLocaleString("vi-VN");
function StatCard({ label, value, trend, icon, tone }) {
	const up = trend >= 0;
	return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
		className: "pt-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					className: `h-11 w-11 rounded-xl flex items-center justify-center ${tone}`,
					children: icon
				}), /* @__PURE__ */ jsxs("span", {
					className: `inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`,
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
				className: "text-2xl font-bold tracking-tight mt-1 font-display",
				children: value
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground mt-0.5",
				children: "so với tháng trước"
			})
		]
	}) });
}
var statusBadge = {
	PENDING: {
		label: "Chờ xử lý",
		cls: "bg-amber-500/10 text-amber-600"
	},
	PAID: {
		label: "Thành công",
		cls: "bg-emerald-500/10 text-emerald-600"
	},
	FAILED: {
		label: "Thất bại",
		cls: "bg-destructive/10 text-destructive"
	},
	CANCELLED: {
		label: "Đã hủy",
		cls: "bg-gray-500/10 text-gray-600"
	}
};
var AdminPremiumPage = () => {
	const [tab, setTab] = useState("all");
	const { data, isLoading } = useAdminTransactions(0, 50);
	const transactions = data?.content || [];
	const totalPaid = transactions.filter((t) => t.status === "PAID").length;
	const totalRevenue = transactions.filter((t) => t.status === "PAID").reduce((sum, t) => sum + t.amount, 0);
	const filtered = useMemo(() => tab === "all" ? transactions : transactions.filter((t) => t.status === tab), [transactions, tab]);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center min-h-[400px]",
		children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Quản lý Premium"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Theo dõi gói trả phí và lịch sử giao dịch nâng cấp"
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ jsx(StatCard, {
						label: "Total Premium Users",
						value: String(totalPaid),
						trend: 0,
						icon: /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5" }),
						tone: "bg-primary/10 text-primary"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Pending Requests",
						value: String(transactions.filter((t) => t.status === "PENDING").length),
						trend: 0,
						icon: /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }),
						tone: "bg-amber-500/10 text-amber-600"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Revenue This Month",
						value: fmtVnd(totalRevenue),
						trend: 0,
						icon: /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" }),
						tone: "bg-emerald-500/10 text-emerald-600"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Total Transactions",
						value: String(transactions.length),
						trend: 0,
						icon: /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5" }),
						tone: "bg-destructive/10 text-destructive"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
				className: "flex-row items-center justify-between space-y-0",
				children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-base",
					children: "Lịch sử giao dịch thanh toán"
				}), /* @__PURE__ */ jsx(Tabs, {
					value: tab,
					onValueChange: (v) => setTab(v),
					children: /* @__PURE__ */ jsxs(TabsList, { children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "all",
							children: "Tất cả"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "PAID",
							children: "Thành công"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "PENDING",
							children: "Chờ xử lý"
						})
					] })
				})]
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
					className: "[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground",
					children: [
						/* @__PURE__ */ jsx(TableHead, { children: "User" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Email" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Số tiền" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Ngày tạo" })
					]
				}) }), /* @__PURE__ */ jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
					colSpan: 6,
					className: "h-24 text-center text-muted-foreground",
					children: "Không có giao dịch nào"
				}) }) : filtered.map((tx) => {
					const s = statusBadge[tx.status] || statusBadge.PENDING;
					return /* @__PURE__ */ jsxs(TableRow, {
						className: "[&>td]:py-4 [&>td]:text-[15px]",
						children: [
							/* @__PURE__ */ jsx(TableCell, {
								className: "font-semibold",
								children: tx.userName || "N/A"
							}),
							/* @__PURE__ */ jsx(TableCell, {
								className: "text-muted-foreground",
								children: tx.userEmail || "N/A"
							}),
							/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								children: tx.planName
							}) }),
							/* @__PURE__ */ jsx(TableCell, {
								className: "font-semibold",
								children: fmtVnd(tx.amount)
							}),
							/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
								variant: "secondary",
								className: `${s.cls} text-[13px] px-2.5 py-1`,
								children: s.label
							}) }),
							/* @__PURE__ */ jsx(TableCell, {
								className: "text-muted-foreground text-sm",
								children: fmtDate(tx.createdAt)
							})
						]
					}, tx.id);
				}) })] })
			})] })
		]
	});
};
//#endregion
//#region src/routes/admin_panel/premium.tsx?tsr-split=component
var SplitComponent = AdminPremiumPage;
//#endregion
export { SplitComponent as component };
