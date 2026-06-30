import { t as Button } from "./button-OuFjfcpS.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DJOO1b-0.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-CcHbQ4nc.js";
import { t as adminKeys } from "./adminKeys-DCGILVa1.js";
import { t as reportApi } from "./reportApi-DViSOVqh.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertCircle, Check, Flag, X } from "lucide-react";
//#region src/features/admin/services/approvalApi.ts
var approvalApi = {
	getPendingList: async () => {
		try {
			return (await reportApi.getReports()).map((r) => ({
				id: r.id,
				title: r.name || "Unknown",
				uploader: r.uploader,
				date: new Date(r.createdAt).toLocaleDateString("vi-VN"),
				size: r.size,
				reporter: r.reporter,
				reason: r.reason
			}));
		} catch {
			return [];
		}
	},
	approve: async (id) => {
		await reportApi.handleReportDecision(id, "approve");
		return true;
	},
	reject: async (id) => {
		await reportApi.handleReportDecision(id, "reject");
		return true;
	}
};
//#endregion
//#region src/features/admin/hooks/useAdminApprovals.ts
function useApprovals() {
	return useQuery({
		queryKey: adminKeys.approvals(),
		queryFn: () => approvalApi.getPendingList()
	});
}
function useApprovalAction() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, action }) => action === "approve" ? approvalApi.approve(id) : approvalApi.reject(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.approvals() })
	});
}
//#endregion
//#region src/features/admin/components/AdminApprovalsPage.tsx
var AdminApprovalsPage = () => {
	const { data: list = [] } = useApprovals();
	const action = useApprovalAction();
	const handle = (id, act) => action.mutate({
		id,
		action: act
	}, { onSuccess: () => toast.success(act === "approve" ? "Đã bỏ qua báo cáo" : "Đã xử lý báo cáo") });
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight font-display",
			children: "Báo cáo File"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1 text-sm",
			children: "Xử lý các file bị người dùng báo cáo vi phạm"
		})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "flex-row items-center justify-between space-y-0",
			children: [/* @__PURE__ */ jsx(CardTitle, {
				className: "text-base",
				children: "File bị báo cáo"
			}), /* @__PURE__ */ jsxs("span", {
				className: "text-sm text-muted-foreground",
				children: [list.length, " mục"]
			})]
		}), /* @__PURE__ */ jsx(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableHead, { children: "File" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Người tải lên" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Lý do báo cáo" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Người báo cáo" }),
				/* @__PURE__ */ jsx(TableHead, {
					className: "text-right",
					children: "Hành động"
				})
			] }) }), /* @__PURE__ */ jsx(TableBody, { children: list.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
				colSpan: 5,
				className: "h-24 text-center text-muted-foreground",
				children: "Không có báo cáo nào"
			}) }) : list.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 min-w-0",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-9 w-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ jsx(Flag, { className: "h-4 w-4" })
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-medium truncate block",
							children: item.title
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground truncate block",
							children: item.date
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
							children: item.reason || "Không có lý do"
						})]
					})
				}) }),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-muted-foreground",
					children: item.reporter || "Anonymous"
				}),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							className: "text-destructive hover:text-destructive",
							onClick: () => handle(item.id, "reject"),
							children: [/* @__PURE__ */ jsx(X, {}), " Xóa file"]
						}), /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							onClick: () => handle(item.id, "approve"),
							children: [/* @__PURE__ */ jsx(Check, {}), " Bỏ qua"]
						})]
					})
				})
			] }, item.id)) })] })
		})] })]
	});
};
//#endregion
//#region src/routes/admin_panel/approvals.tsx?tsr-split=component
var SplitComponent = AdminApprovalsPage;
//#endregion
export { SplitComponent as component };
