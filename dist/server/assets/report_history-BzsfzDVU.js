import { r as documentApi } from "./realApi-BCKVeZFR.js";
import { r as formatDateTime, t as cn } from "./utils-CZKD4yH6.js";
import { t as Button } from "./button-C90jjaif.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-D4JpMjWP.js";
import { t as Badge } from "./badge-CXVSNBvN.js";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-C9-cV9dF.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CvauYBoD.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-BW_ewuzj.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as reportApi } from "./reportApi-QKDKc5vq.js";
import { t as FilePreviewDialog } from "./FilePreviewDialog-CSk5SO24.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertCircle, Eye, Flag, Loader2, Scale } from "lucide-react";
//#region src/features/admin/hooks/useAdminReportHistory.ts
function useReportHistory() {
	return useQuery({
		queryKey: adminKeys.reportHistory(),
		queryFn: () => reportApi.getReportHistory()
	});
}
function useReportsByType(type) {
	return useQuery({
		queryKey: [
			"reports",
			"type",
			type ?? "all"
		],
		queryFn: () => type ? reportApi.getReports(type) : Promise.resolve([]),
		enabled: !!type
	});
}
//#endregion
//#region src/features/admin/components/AdminReportHistoryPage.tsx
var REPORT_REASON_LABELS = {
	copyright: "Nội dung vi phạm bản quyền",
	misinformation: "Thông tin sai lệch / gây hiểu lầm",
	inappropriate: "Nội dung không phù hợp / phản cảm",
	privacy: "Vi phạm quyền riêng tư",
	other: "Lý do khác"
};
var isAppeal = (type) => (type ?? "").toUpperCase() === "APPEAL";
var getReasonLabel = (reason) => {
	if (!reason) return "Không có lý do";
	return REPORT_REASON_LABELS[reason] || reason;
};
var getStatusColor = (status) => {
	switch (status) {
		case "approved": return "bg-green-500/10 text-green-600 border-green-500/20";
		case "rejected":
		case "removed": return "bg-red-500/10 text-red-600 border-red-500/20";
		case "pending": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
		default: return "bg-muted text-muted-foreground";
	}
};
var getStatusText = (status) => {
	switch (status?.toLowerCase()) {
		case "accepted": return "Đã chấp nhận";
		case "rejected":
		case "removed": return "Không chấp nhận";
		case "pending": return "Chờ xử lý";
		default: return status || "Unknown";
	}
};
var AdminReportHistoryPage = () => {
	const { data: history = [], isLoading } = useReportHistory();
	const [activeTab, setActiveTab] = useState("reports");
	const [preview, setPreview] = useState(null);
	const [loadingPreview, setLoadingPreview] = useState(null);
	const tabItems = useReportsByType(activeTab === "appeals" ? "APPEAL" : activeTab === "reports" ? "REPORT" : void 0);
	const shownItems = activeTab === "all" ? history : tabItems.data ?? [];
	const shownCount = shownItems.length;
	const typeBadge = (item) => {
		const appeal = isAppeal(item.type);
		return /* @__PURE__ */ jsxs("span", {
			className: cn("inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0", appeal ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"),
			children: [appeal ? /* @__PURE__ */ jsx(Scale, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(Flag, { className: "h-3 w-3" }), appeal ? "Kháng cáo" : "Báo cáo"]
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold tracking-tight font-display",
					children: "Lịch sử Xử lý Báo cáo"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-1 text-sm",
					children: "Phân biệt rõ báo cáo (từ người dùng) và kháng cáo (phản hồi của người upload)"
				})] }), /* @__PURE__ */ jsx("div", {
					className: "flex rounded-lg border border-border/70 bg-muted/40 p-0.5",
					children: [
						"reports",
						"appeals",
						"all"
					].map((t) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setActiveTab(t),
						className: cn("px-3 py-1.5 text-sm rounded-md transition-colors", activeTab === t ? "bg-background shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"),
						children: t === "reports" ? "Báo cáo" : t === "appeals" ? "Kháng cáo" : "Tất cả"
					}, t))
				})]
			}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
				className: "flex-row items-center justify-between space-y-0",
				children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-base",
					children: activeTab === "appeals" ? "Kháng cáo đã xử lý" : activeTab === "reports" ? "Báo cáo đã xử lý" : "Tất cả"
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-sm text-muted-foreground",
					children: [shownCount, " mục"]
				})]
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto w-full border border-border/60 rounded-lg",
					children: /* @__PURE__ */ jsxs(Table, {
						className: "min-w-[800px]",
						children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
							/* @__PURE__ */ jsx(TableHead, { children: "Loại" }),
							/* @__PURE__ */ jsx(TableHead, { children: "File" }),
							/* @__PURE__ */ jsx(TableHead, { children: "Người tải lên" }),
							/* @__PURE__ */ jsx(TableHead, { children: "Lý do" }),
							/* @__PURE__ */ jsx(TableHead, { children: "Người gửi" }),
							/* @__PURE__ */ jsx(TableHead, { children: activeTab === "appeals" ? "Appeal Time" : "Report Time" }),
							/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
							/* @__PURE__ */ jsx(TableHead, {
								className: "text-right",
								children: "Hành động"
							})
						] }) }), /* @__PURE__ */ jsx(TableBody, { children: isLoading || activeTab !== "all" && tabItems.isLoading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
							colSpan: 8,
							className: "h-24 text-center text-muted-foreground",
							children: "Đang tải dữ liệu..."
						}) }) : shownCount === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsxs(TableCell, {
							colSpan: 8,
							className: "h-24 text-center text-muted-foreground",
							children: [
								"Không có ",
								activeTab === "appeals" ? "kháng cáo" : "báo cáo",
								" nào"
							]
						}) }) : shownItems.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
							/* @__PURE__ */ jsx(TableCell, { children: typeBadge(item) }),
							/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", isAppeal(item.type) ? "bg-blue-500/10 text-blue-600" : "bg-destructive/10 text-destructive"),
									children: isAppeal(item.type) ? /* @__PURE__ */ jsx(Scale, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Flag, { className: "h-4 w-4" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ jsx("span", {
											className: "font-medium truncate block cursor-help",
											children: item.title || item.name || "Unknown"
										})
									}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: item.title || item.name || "Unknown" }) })] }) }), /* @__PURE__ */ jsxs("span", {
										className: "text-xs text-muted-foreground truncate block",
										children: ["ID: ", item.documentId?.slice(0, 8) || "N/A"]
									})]
								})]
							}) }),
							/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ jsx(Avatar, {
									className: "h-7 w-7",
									children: /* @__PURE__ */ jsx(AvatarFallback, {
										className: "bg-muted text-xs",
										children: item.uploader?.charAt(0) || "U"
									})
								}), /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
									asChild: true,
									children: /* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground truncate cursor-help",
										children: item.uploader
									})
								}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: item.uploader }) })] }) })]
							}) }),
							/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", {
								className: "max-w-xs",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ jsx("span", {
											className: "text-sm line-clamp-2 cursor-help",
											children: getReasonLabel(item.reason)
										})
									}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", {
										className: "max-w-xs break-all",
										children: getReasonLabel(item.reason)
									}) })] }) })]
								})
							}) }),
							/* @__PURE__ */ jsx(TableCell, {
								className: "text-muted-foreground max-w-[130px]",
								children: /* @__PURE__ */ jsx("span", {
									className: "truncate block",
									children: item.reporter || "Anonymous"
								})
							}),
							/* @__PURE__ */ jsx(TableCell, {
								className: "text-muted-foreground whitespace-nowrap",
								children: formatDateTime(item.createdAt)
							}),
							/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								className: `${getStatusColor(item.status)} font-medium`,
								children: item.decision || getStatusText(item.status)
							}) }),
							/* @__PURE__ */ jsx(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ jsxs(Button, {
									variant: "ghost",
									size: "sm",
									disabled: loadingPreview === item.id,
									onClick: async () => {
										if (item.cloudinaryUrl) {
											setPreview({
												title: item.name,
												url: item.cloudinaryUrl,
												mimeType: item.mimeType
											});
											return;
										}
										if (!item.documentId) {
											setPreview({
												title: item.name,
												url: null
											});
											return;
										}
										try {
											setLoadingPreview(item.id);
											const doc = await documentApi.getById(item.documentId);
											setPreview({
												title: item.name,
												url: doc.cloudinaryUrl,
												mimeType: doc.mimeType
											});
										} catch {
											toast.error("Không tải được nội dung file");
											setPreview({
												title: item.name,
												url: null
											});
										} finally {
											setLoadingPreview(null);
										}
									},
									children: [loadingPreview === item.id ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 mr-1" }), loadingPreview === item.id ? "Đang tải..." : "Xem"]
								})
							})
						] }, item.id)) })]
					})
				})
			})] }),
			/* @__PURE__ */ jsx(FilePreviewDialog, {
				open: !!preview,
				onOpenChange: (v) => !v && setPreview(null),
				title: preview?.title ?? "",
				url: preview?.url,
				mimeType: preview?.mimeType
			})
		]
	});
};
//#endregion
//#region src/routes/admin_panel/report_history.tsx?tsr-split=component
var SplitComponent = AdminReportHistoryPage;
//#endregion
export { SplitComponent as component };
