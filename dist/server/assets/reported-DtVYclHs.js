import { i as CardHeader, t as Card } from "./card-CzWHiRuJ.js";
import { _ as useMySubmittedReports } from "./queries-DNol5grK.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BtNG4hpQ.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BRwfIiZL.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/_authenticated/reported.tsx?tsr-split=component
var REPORT_REASON_LABELS = {
	copyright: "Vi phạm bản quyền",
	misinformation: "Thông tin sai lệch",
	inappropriate: "Nội dung không phù hợp",
	privacy: "Vi phạm quyền riêng tư",
	other: "Lý do khác"
};
var getReasonLabel = (reason) => {
	if (!reason) return "Không có lý do";
	return REPORT_REASON_LABELS[reason] || reason;
};
var getStatusBadge = (status) => {
	switch (status?.toLowerCase()) {
		case "pending": return /* @__PURE__ */ jsx(Badge, {
			variant: "outline",
			children: "Đang chờ"
		});
		case "accepted":
		case "approved": return /* @__PURE__ */ jsx(Badge, {
			variant: "default",
			className: "bg-green-600",
			children: "Đã chấp nhận"
		});
		case "rejected":
		case "removed": return /* @__PURE__ */ jsx(Badge, {
			variant: "destructive",
			children: "Đã từ chối"
		});
		default: return /* @__PURE__ */ jsx(Badge, {
			variant: "secondary",
			children: status
		});
	}
};
function ReportedDocumentsPage() {
	const [activeTab, setActiveTab] = useState("all");
	const { data, isLoading } = useMySubmittedReports();
	console.log("[ReportedDocumentsPage] raw data:", data);
	const myReports = Array.isArray(data) ? data : data?.content || [];
	console.log("[ReportedDocumentsPage] processed reports:", myReports);
	const pendingReports = useMemo(() => myReports.filter((r) => r.status === "pending"), [myReports]);
	const handledReports = useMemo(() => myReports.filter((r) => r.status !== "pending"), [myReports]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Báo cáo của tôi"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Theo dõi các báo cáo bạn đã gửi"
		})] }), /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(Tabs, {
			value: activeTab,
			onValueChange: setActiveTab,
			children: [
				/* @__PURE__ */ jsxs(TabsList, { children: [
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "all",
						children: [
							"Tất cả (",
							myReports.length,
							")"
						]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "pending",
						children: [
							"Chờ duyệt (",
							pendingReports.length,
							")"
						]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "handled",
						children: [
							"Đã xử lý (",
							handledReports.length,
							")"
						]
					})
				] }),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "all",
					children: /* @__PURE__ */ jsx(ReportsTable, {
						reports: myReports,
						isLoading
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "pending",
					children: /* @__PURE__ */ jsx(ReportsTable, {
						reports: pendingReports,
						isLoading
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "handled",
					children: /* @__PURE__ */ jsx(ReportsTable, {
						reports: handledReports,
						isLoading
					})
				})
			]
		}) }) })]
	});
}
function ReportsTable({ reports, isLoading }) {
	return /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
		/* @__PURE__ */ jsx(TableHead, { children: "Tài liệu" }),
		/* @__PURE__ */ jsx(TableHead, { children: "Lý do" }),
		/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
		/* @__PURE__ */ jsx(TableHead, { children: "Ghi chú admin" })
	] }) }), /* @__PURE__ */ jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
		colSpan: 4,
		className: "text-center py-10",
		children: "Đang tải..."
	}) }) : reports.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
		colSpan: 4,
		className: "text-center py-10",
		children: "Không có báo cáo nào"
	}) }) : reports.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
		/* @__PURE__ */ jsx(TableCell, {
			className: "font-medium",
			children: r.documentTitle
		}),
		/* @__PURE__ */ jsx(TableCell, { children: getReasonLabel(r.reason) }),
		/* @__PURE__ */ jsx(TableCell, { children: getStatusBadge(r.status) }),
		/* @__PURE__ */ jsx(TableCell, {
			className: "text-muted-foreground",
			children: r.adminComment || "-"
		})
	] }, r.id)) })] });
}
//#endregion
export { ReportedDocumentsPage as component };
