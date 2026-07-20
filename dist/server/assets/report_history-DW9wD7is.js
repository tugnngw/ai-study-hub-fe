import { r as documentApi } from "./realApi-3S4ICjaY.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BtNG4hpQ.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-BG3uUdrA.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as reportApi } from "./reportApi-Dmeb3Sig.js";
import { t as FilePreviewDialog } from "./FilePreviewDialog-D5_9lu5r.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertCircle, Eye, Flag } from "lucide-react";
//#region src/features/admin/hooks/useAdminReportHistory.ts
function useReportHistory() {
	return useQuery({
		queryKey: adminKeys.reportHistory(),
		queryFn: () => reportApi.getReportHistory()
	});
}
//#endregion
//#region src/features/admin/components/AdminReportHistoryPage.tsx
var AdminReportHistoryPage = () => {
	const { data: history = [], isLoading } = useReportHistory();
	const [preview, setPreview] = useState(null);
	const [loadingPreview, setLoadingPreview] = useState(null);
	const REPORT_REASON_LABELS = {
		copyright: "Nội dung vi phạm bản quyền",
		misinformation: "Thông tin sai lệch / gây hiểu lầm",
		inappropriate: "Nội dung không phù hợp / phản cảm",
		privacy: "Vi phạm quyền riêng tư",
		other: "Lý do khác"
	};
	const getReasonLabel = (reason) => {
		if (!reason) return "Không có lý do";
		return REPORT_REASON_LABELS[reason] || reason;
	};
	const getStatusColor = (status) => {
		switch (status) {
			case "approved": return "bg-green-500/10 text-green-600 border-green-500/20";
			case "rejected":
			case "removed": return "bg-red-500/10 text-red-600 border-red-500/20";
			case "pending": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
			default: return "bg-muted text-muted-foreground";
		}
	};
	const getStatusText = (status) => {
		switch (status?.toLowerCase()) {
			case "accepted": return "Đã chấp nhận";
			case "rejected":
			case "removed": return "Không chấp nhận";
			case "pending": return "Chấp nhận";
			default: return status || "Unknown";
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Lịch sử Xử lý Báo cáo"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Xem lại lịch sử các báo cáo đã xử lý và đang chờ"
			})] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
				className: "flex-row items-center justify-between space-y-0",
				children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-base",
					children: "Tất cả báo cáo"
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-sm text-muted-foreground",
					children: [history.length, " mục"]
				})]
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsx(TableHead, { children: "File" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Người tải lên" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Lý do báo cáo" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Người báo cáo" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Ngày báo cáo" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Hành động" })
				] }) }), /* @__PURE__ */ jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
					colSpan: 7,
					className: "h-24 text-center text-muted-foreground",
					children: "Đang tải dữ liệu..."
				}) }) : history.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
					colSpan: 7,
					className: "h-24 text-center text-muted-foreground",
					children: "Không có báo cáo nào"
				}) }) : history.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(Flag, { className: "h-4 w-4" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium truncate block",
								children: item.title || item.name || "Unknown"
							}), /* @__PURE__ */ jsxs("span", {
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
						}), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground truncate",
							children: item.uploader
						})]
					}) }),
					/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", {
						className: "max-w-xs",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("span", {
								className: "text-sm line-clamp-2",
								children: getReasonLabel(item.reason)
							})]
						})
					}) }),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-muted-foreground",
						children: item.reporter || "Anonymous"
					}),
					/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: new Date(item.createdAt).toLocaleDateString("vi-VN")
					}) }),
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
							children: [/* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 mr-1" }), loadingPreview === item.id ? "Đang tải..." : "Xem"]
						})
					})
				] }, item.id)) })] })
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
