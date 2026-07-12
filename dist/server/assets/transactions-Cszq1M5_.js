import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DJOO1b-0.js";
import { t as useAdminTransactions } from "./useAdminTransactions-DvE_HvOP.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/features/admin/components/AdminTransactionsPage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
var fmtDate = (date) => new Date(date).toLocaleString("vi-VN");
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
var AdminTransactionsPage = () => {
	const [page] = useState(0);
	const { data, isLoading } = useAdminTransactions(page, 50);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center min-h-[400px]",
		children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
	});
	const transactions = data?.content || [];
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight font-display",
			children: "Lịch sử giao dịch"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1 text-sm",
			children: "Xem tất cả giao dịch thanh toán của người dùng"
		})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
			className: "text-base",
			children: [
				"Tất cả giao dịch (",
				data?.totalElements || 0,
				")"
			]
		}) }), /* @__PURE__ */ jsx(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
				className: "[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground",
				children: [
					/* @__PURE__ */ jsx(TableHead, { children: "ID" }),
					/* @__PURE__ */ jsx(TableHead, { children: "User" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Email" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Số tiền" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Ngày tạo" })
				]
			}) }), /* @__PURE__ */ jsx(TableBody, { children: transactions.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
				colSpan: 7,
				className: "h-24 text-center text-muted-foreground",
				children: "Chưa có giao dịch nào"
			}) }) : transactions.map((tx) => {
				const s = statusBadge[tx.status] || statusBadge.PENDING;
				return /* @__PURE__ */ jsxs(TableRow, {
					className: "[&>td]:py-4 [&>td]:text-[15px]",
					children: [
						/* @__PURE__ */ jsx(TableCell, {
							className: "font-mono text-sm",
							children: tx.id
						}),
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
		})] })]
	});
};
//#endregion
//#region src/routes/admin_panel/transactions.tsx?tsr-split=component
var SplitComponent = AdminTransactionsPage;
//#endregion
export { SplitComponent as component };
