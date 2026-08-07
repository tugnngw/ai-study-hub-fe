import { v as useMySubmittedReports } from "./queries-BOxd9l6F.js";
import { t as cn } from "./utils-CZKD4yH6.js";
import { i as CardHeader, t as Card } from "./card-D4JpMjWP.js";
import { t as Badge } from "./badge-CXVSNBvN.js";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-C9-cV9dF.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CvauYBoD.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CK6O_EHq.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FileText, Flag, Scale } from "lucide-react";
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
var isAppeal = (r) => (r.type ?? "").toUpperCase() === "APPEAL";
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
var TypeBadge = ({ r }) => {
	const appeal = isAppeal(r);
	return /* @__PURE__ */ jsxs("span", {
		className: cn("inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0", appeal ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"),
		children: [appeal ? /* @__PURE__ */ jsx(Scale, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(Flag, { className: "h-3 w-3" }), appeal ? "Kháng cáo" : "Báo cáo"]
	});
};
function ReportedDocumentsPage() {
	const [activeTab, setActiveTab] = useState("all");
	const { data, isLoading } = useMySubmittedReports();
	console.log("[ReportedDocumentsPage] raw data:", data);
	const myReports = Array.isArray(data) ? data : data?.content || [];
	console.log("[ReportedDocumentsPage] processed reports:", myReports);
	const reports = useMemo(() => myReports.filter((r) => !isAppeal(r)), [myReports]);
	const appeals = useMemo(() => myReports.filter((r) => isAppeal(r)), [myReports]);
	const pendingReports = useMemo(() => myReports.filter((r) => r.status === "pending"), [myReports]);
	const handledReports = useMemo(() => myReports.filter((r) => r.status !== "pending"), [myReports]);
	const shown = activeTab === "reports" ? reports : activeTab === "appeals" ? appeals : activeTab === "pending" ? pendingReports : activeTab === "handled" ? handledReports : myReports;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Báo cáo của tôi"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Theo dõi báo cáo bạn đã gửi và kháng cáo của bạn"
		})] }), /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(Tabs, {
			value: activeTab,
			onValueChange: setActiveTab,
			children: [/* @__PURE__ */ jsxs(TabsList, {
				className: "flex-wrap",
				children: [
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "all",
						children: [
							"Tất cả (",
							myReports.length,
							")"
						]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "reports",
						children: [
							"Báo cáo (",
							reports.length,
							")"
						]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "appeals",
						children: [
							"Kháng cáo (",
							appeals.length,
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
				]
			}), /* @__PURE__ */ jsx(TabsContent, {
				value: activeTab,
				children: /* @__PURE__ */ jsx(ReportsTable, {
					reports: shown,
					isLoading
				})
			})]
		}) }) })]
	});
}
function ReportsTable({ reports, isLoading }) {
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto w-full border border-border/60 rounded-lg",
		children: /* @__PURE__ */ jsxs(Table, {
			className: "min-w-[800px]",
			children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableHead, {
					className: "w-[120px]",
					children: "Loại"
				}),
				/* @__PURE__ */ jsx(TableHead, {
					className: "w-[220px]",
					children: "Tài liệu"
				}),
				/* @__PURE__ */ jsx(TableHead, {
					className: "w-[200px]",
					children: "Lý do"
				}),
				/* @__PURE__ */ jsx(TableHead, {
					className: "w-[120px]",
					children: "Trạng thái"
				}),
				/* @__PURE__ */ jsx(TableHead, { children: "Ghi chú admin" })
			] }) }), /* @__PURE__ */ jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
				colSpan: 5,
				className: "text-center py-10",
				children: "Đang tải..."
			}) }) : reports.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
				colSpan: 5,
				className: "text-center py-10",
				children: "Không có mục nào"
			}) }) : reports.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(TypeBadge, { r }) }),
				/* @__PURE__ */ jsx(TableCell, {
					className: "font-medium max-w-[220px]",
					children: /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-2 min-w-0",
						children: [/* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }), /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsx("span", {
								className: "truncate block cursor-help",
								children: r.documentTitle
							})
						}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: r.documentTitle }) })] }) })]
					})
				}),
				/* @__PURE__ */ jsx(TableCell, {
					className: "max-w-[200px]",
					children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx("span", {
							className: "truncate block cursor-help",
							children: getReasonLabel(r.reason)
						})
					}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: getReasonLabel(r.reason) }) })] }) })
				}),
				/* @__PURE__ */ jsx(TableCell, { children: getStatusBadge(r.status) }),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-muted-foreground max-w-[250px]",
					children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx("span", {
							className: "truncate block cursor-help",
							children: r.adminComment || "—"
						})
					}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", {
						className: "max-w-xs break-all",
						children: r.adminComment || "Chưa có phản hồi"
					}) })] }) })
				})
			] }, r.id)) })]
		})
	});
}
//#endregion
export { ReportedDocumentsPage as component };
