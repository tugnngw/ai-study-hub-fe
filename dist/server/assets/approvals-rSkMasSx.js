import { r as documentApi } from "./realApi-13UTssC_.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-C3MnOk9C.js";
import { t as Textarea } from "./textarea-CY1CNB-1.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BtNG4hpQ.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-BG3uUdrA.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as reportApi } from "./reportApi-D_0ZpbsG.js";
import { t as FilePreviewDialog } from "./FilePreviewDialog-D5_9lu5r.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertCircle, Check, Eye, Flag, X } from "lucide-react";
//#region src/features/admin/services/approvalApi.ts
var approvalApi = {
	getPendingList: async () => {
		try {
			const reports = await reportApi.getReports();
			const data = reports.filter((r) => !r.status || r.status === "pending").map((r) => ({
				id: r.id,
				documentId: r.documentId,
				title: r.name || "Unknown",
				uploader: r.uploader,
				date: new Date(r.createdAt).toLocaleDateString("vi-VN"),
				size: r.size,
				reporter: r.reporter,
				reason: r.reason
			}));
			console.log("[approvalApi.getPendingList] returning pending reports length:", data.length, "total reports:", reports.length);
			return JSON.parse(JSON.stringify(data));
		} catch {
			return [];
		}
	},
	approve: async (id) => {
		await reportApi.handleReportDecision(id, "approve");
		return true;
	},
	reject: async (id, reason) => {
		await reportApi.handleReportDecision(id, "reject", reason);
		return true;
	}
};
//#endregion
//#region src/features/admin/hooks/useAdminApprovals.ts
function useApprovals() {
	const query = useQuery({
		queryKey: adminKeys.approvals(),
		queryFn: async () => {
			console.log("[useApprovals] queryFn called - stack:", (/* @__PURE__ */ new Error()).stack?.split("\n").slice(0, 3).join("\n"));
			const data = await approvalApi.getPendingList();
			const cloned = JSON.parse(JSON.stringify(data));
			console.log("[useApprovals] queryFn data (cloned):", cloned);
			return cloned;
		},
		refetchOnWindowFocus: false,
		refetchInterval: false,
		structuralSharing: false,
		notifyOnChangeProps: "all"
	});
	console.log("[useApprovals] query state:", query);
	return query;
}
function useApprovalAction() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, action, reason }) => {
			console.log("[useApprovalAction] mutating:", {
				id,
				action,
				reason
			});
			return action === "approve" ? approvalApi.approve(id) : approvalApi.reject(id, reason || "");
		},
		onSuccess: async (_, variables) => {
			console.log("[useApprovalAction] mutation settled, clearing cache");
			try {
				await qc.cancelQueries({ queryKey: adminKeys.approvals() });
				await qc.cancelQueries({ queryKey: adminKeys.reportedFiles() });
				await qc.refetchQueries({ queryKey: adminKeys.approvals() });
				await qc.refetchQueries({ queryKey: adminKeys.reportedFiles() });
				console.log("[useApprovalAction] cache cleared and refetched");
			} catch (err) {
				console.error("[useApprovalAction] reset error:", err);
			}
		},
		onError: (err) => {
			console.error("[useApprovalAction] error:", err);
		}
	});
}
//#endregion
//#region src/features/admin/components/AdminApprovalsPage.tsx
var REPORT_REASON_LABELS = {
	copyright: "Nội dung vi phạm bản quyền",
	misinformation: "Thông tin sai lệch / gây hiểu lầm",
	inappropriate: "Nội dung không phù hợp / phản cảm",
	privacy: "Vi phạm quyền riêng tư",
	other: "Lý do khác"
};
var getReasonLabel = (reason) => {
	if (!reason) return "Không có lý do";
	return REPORT_REASON_LABELS[reason] || reason;
};
var AdminApprovalsPage = () => {
	const query = useApprovals();
	const action = useApprovalAction();
	const [list, setList] = useState(query.data || []);
	const [_, setForceUpdate] = useState(0);
	const [preview, setPreview] = useState(null);
	const [reviewedIds, setReviewedIds] = useState(/* @__PURE__ */ new Set());
	const [loadingPreview, setLoadingPreview] = useState(null);
	const openPreview = async (item) => {
		setReviewedIds((prev) => new Set(prev).add(item.id));
		if (item.cloudinaryUrl) {
			setPreview({
				title: item.title,
				url: item.cloudinaryUrl,
				mimeType: item.mimeType
			});
			return;
		}
		if (!item.documentId) {
			setPreview({
				title: item.title,
				url: null
			});
			return;
		}
		try {
			setLoadingPreview(item.id);
			const doc = await documentApi.getById(item.documentId);
			setPreview({
				title: item.title,
				url: doc.cloudinaryUrl,
				mimeType: doc.mimeType
			});
		} catch {
			toast.error("Không tải được nội dung file");
			setPreview({
				title: item.title,
				url: null
			});
		} finally {
			setLoadingPreview(null);
		}
	};
	useEffect(() => {
		if (query.data) {
			const newData = query.data || [];
			setList(newData);
			console.log("[AdminApprovalsPage] data changed, list.length:", newData.length);
		}
	}, [query.data]);
	useEffect(() => {
		if (action.isSuccess) {
			console.log("[AdminApprovalsPage] mutation success, forcing list refresh");
			setForceUpdate((prev) => prev + 1);
		}
	}, [action.isSuccess]);
	console.log("[AdminApprovalsPage] render, list.length:", list.length, "query.status:", query.status);
	const [rejectId, setRejectId] = useState(null);
	const [rejectReason, setRejectReason] = useState("");
	const handle = (id, act) => {
		if (act === "reject") {
			setRejectId(id);
			return;
		}
		console.log("[AdminApprovalsPage] handle called:", {
			id,
			act
		});
		return action.mutate({
			id,
			action: act
		}, {
			onSuccess: () => {
				console.log("[AdminApprovalsPage] mutation success");
				toast.success("Đã chấp nhận báo cáo");
				setForceUpdate((prev) => prev + 1);
			},
			onError: (err) => {
				console.error("[AdminApprovalsPage] mutation error:", err);
				toast.error("Xử lý thất bại");
			}
		});
	};
	const submitReject = () => {
		if (!rejectId) return;
		action.mutate({
			id: rejectId,
			action: "reject",
			reason: rejectReason
		}, {
			onSuccess: () => {
				toast.success("Đã từ chối file");
				setRejectId(null);
				setRejectReason("");
				setForceUpdate((prev) => prev + 1);
			},
			onError: (err) => {
				console.error("[AdminApprovalsPage] mutation error:", err);
				toast.error("Xử lý thất bại: " + err.message);
			}
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Báo cáo File"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Xử lý các file bị người dùng báo cáo vi phạm"
			})] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
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
					/* @__PURE__ */ jsx(TableHead, { children: "Lý do từ chối (Admin)" }),
					/* @__PURE__ */ jsx(TableHead, {
						className: "text-right",
						children: "Hành động"
					})
				] }) }), /* @__PURE__ */ jsx(TableBody, { children: list.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
					colSpan: 6,
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
								children: getReasonLabel(item.reason)
							})]
						})
					}) }),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-muted-foreground",
						children: item.reporter || "Anonymous"
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-muted-foreground text-sm",
						children: item.adminComment || "—"
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-2",
							children: [
								/* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									disabled: loadingPreview === item.id,
									onClick: () => openPreview(item),
									children: [
										/* @__PURE__ */ jsx(Eye, {}),
										" ",
										loadingPreview === item.id ? "Đang mở..." : "Xem file"
									]
								}),
								/* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									className: "text-destructive hover:text-destructive",
									disabled: !reviewedIds.has(item.id) || action.isPending,
									title: !reviewedIds.has(item.id) ? "Xem file trước khi xử lý" : void 0,
									onClick: () => handle(item.id, "reject"),
									children: [/* @__PURE__ */ jsx(X, {}), " Từ chối file"]
								}),
								/* @__PURE__ */ jsxs(Button, {
									size: "sm",
									disabled: !reviewedIds.has(item.id),
									title: !reviewedIds.has(item.id) ? "Xem file trước khi xử lý" : void 0,
									onClick: () => handle(item.id, "approve"),
									children: [/* @__PURE__ */ jsx(Check, {}), " Chấp nhận báo cáo"]
								})
							]
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
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: !!rejectId,
				onOpenChange: () => setRejectId(null),
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Từ chối file bị báo cáo" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Vui lòng nhập lý do từ chối để thông báo cho người upload." })] }),
					/* @__PURE__ */ jsx(Textarea, {
						placeholder: "Nhập lý do từ chối...",
						value: rejectReason,
						onChange: (e) => setRejectReason(e.target.value)
					}),
					/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => setRejectId(null),
						children: "Hủy"
					}), /* @__PURE__ */ jsx(Button, {
						variant: "destructive",
						disabled: action.isPending,
						onClick: submitReject,
						children: "Xác nhận từ chối"
					})] })
				] })
			})
		]
	});
};
//#endregion
//#region src/routes/admin_panel/approvals.tsx?tsr-split=component
var SplitComponent = AdminApprovalsPage;
//#endregion
export { SplitComponent as component };
