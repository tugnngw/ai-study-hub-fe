import { t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { t as paymentApi } from "./paymentApi-vb5qpUKI.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BtNG4hpQ.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Receipt, Sparkles } from "lucide-react";
//#region src/features/payment/components/TransactionHistoryPage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
var fmtDate = (d) => {
	const date = new Date(d);
	return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")} ${date.toLocaleDateString("vi-VN", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	})}`;
};
var statusMap = {
	PAID: {
		label: "Thành công",
		cls: "bg-emerald-500/10 text-emerald-600"
	},
	PENDING: {
		label: "Đang xử lý",
		cls: "bg-amber-500/10 text-amber-600"
	},
	FAILED: {
		label: "Thất bại",
		cls: "bg-destructive/10 text-destructive"
	},
	CANCELLED: {
		label: "Đã hủy",
		cls: "bg-muted text-muted-foreground"
	}
};
function TransactionHistoryPage() {
	const [txs, setTxs] = useState([]);
	useEffect(() => {
		let alive = true;
		paymentApi.getTransactions().then((d) => {
			if (alive) setTxs(d);
		});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between gap-4 flex-wrap",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Lịch sử giao dịch"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Các giao dịch mua gói Premium gần đây của bạn"
			})] }), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "bg-gradient-brand shadow-brand hover:opacity-90",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/premium",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }), " Nâng cấp gói"]
				})
			})]
		}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
			className: "text-base flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(Receipt, { className: "h-4 w-4 text-muted-foreground" }), " Giao dịch"]
		}) }), /* @__PURE__ */ jsx(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableHead, { children: "Mã GD" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Số tiền" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Phương thức" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Ngày" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" })
			] }) }), /* @__PURE__ */ jsx(TableBody, { children: txs.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
				colSpan: 6,
				className: "h-24 text-center text-muted-foreground",
				children: "Chưa có giao dịch nào"
			}) }) : txs.map((t) => {
				const statusInfo = statusMap[t.status] || {
					label: t.status,
					cls: "bg-muted text-muted-foreground"
				};
				return /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsxs(TableCell, {
						className: "font-mono text-xs",
						children: [t.id.slice(0, 8), "..."]
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "font-medium",
						children: t.planName
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "font-medium",
						children: fmtVnd(t.amount)
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-muted-foreground",
						children: t.paymentMethod || "PayOS"
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-muted-foreground",
						children: fmtDate(t.createdAt)
					}),
					/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
						variant: "secondary",
						className: cn(statusInfo.cls),
						children: statusInfo.label
					}) })
				] }, t.id);
			}) })] })
		})] })]
	});
}
//#endregion
//#region src/routes/_authenticated/transactions.tsx?tsr-split=component
var SplitComponent = TransactionHistoryPage;
//#endregion
export { SplitComponent as component };
