import { t as Button } from "./button-OuFjfcpS.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DJOO1b-0.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BgKcOzjx.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as adminDocumentApi } from "./documentApi-DC7RT3tC.js";
import { t as FilePreviewDialog } from "./FilePreviewDialog-58R5X1YC.js";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Eye, FileText, RotateCcw, Search, XCircle } from "lucide-react";
//#region src/features/admin/hooks/useAdminDocuments.ts
var useAdminDocuments = (tab) => {
	const fetchFn = async () => {
		const data = await (async () => {
			switch (tab) {
				case "pending": return adminDocumentApi.getByStatus("COMPLETED");
				case "approved": return adminDocumentApi.getByStatus("READY");
				case "rejected": return adminDocumentApi.getByStatus("REJECT");
				case "trash": return adminDocumentApi.getTrash();
				default: return adminDocumentApi.getAll();
			}
		})();
		console.log("[DEBUG] Documents API response:", data);
		return data ?? [];
	};
	return useQuery({
		queryKey: adminKeys.documents(tab),
		queryFn: fetchFn,
		keepPreviousData: true
	});
};
var useApproveDocument = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => {
			console.log("[DEBUG] Approving document:", id);
			return adminDocumentApi.approve(id);
		},
		onSuccess: () => {
			console.log("[DEBUG] Approve success");
			qc.invalidateQueries({
				queryKey: adminKeys.all,
				exact: false
			});
		},
		onError: (error) => {
			console.error("[DEBUG] Approve error:", error);
		}
	});
};
var useRejectDocument = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => {
			console.log("[DEBUG] Rejecting document:", id);
			return adminDocumentApi.reject(id);
		},
		onSuccess: () => {
			console.log("[DEBUG] Reject success");
			qc.invalidateQueries({
				queryKey: adminKeys.all,
				exact: false
			});
		},
		onError: (error) => {
			console.error("[DEBUG] Reject error:", error);
		}
	});
};
var useDeleteDocument = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => adminDocumentApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() })
	});
};
var useRestoreDocument = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => adminDocumentApi.restore(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.documents() })
	});
};
//#endregion
//#region src/features/admin/components/AdminFilesPage.tsx
var statusLabel = {
	COMPLETED: "Đã upload",
	READY: "Đã duyệt",
	REJECT: "Từ chối",
	PROCESSING: "Đang xử lý",
	FAILED: "Lỗi"
};
var AdminFilesPage = () => {
	const [activeTab, setActiveTab] = useState("all");
	const [query, setQuery] = useState("");
	const { data: documentsResponse = [], isLoading } = useAdminDocuments(activeTab);
	const approveDocument = useApproveDocument();
	const rejectDocument = useRejectDocument();
	useDeleteDocument();
	const restoreDocument = useRestoreDocument();
	const [preview, setPreview] = useState(null);
	const [reviewedIds, setReviewedIds] = useState(/* @__PURE__ */ new Set());
	const documents = Array.isArray(documentsResponse) ? documentsResponse : [];
	const filtered = useMemo(() => documents.filter((d) => d.title?.toLowerCase().includes(query.toLowerCase()) || d.ownerId?.toLowerCase().includes(query.toLowerCase())), [documents, query]);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center h-64",
		children: /* @__PURE__ */ jsx("div", {
			className: "text-muted-foreground",
			children: "Đang tải..."
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Quản lý File"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Xem toàn bộ file user đã upload lên hệ thống"
			})] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, {
				className: "space-y-0",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx(CardTitle, {
						className: "text-base",
						children: "Tất cả file"
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-sm text-muted-foreground",
						children: [filtered.length, " file"]
					})]
				})
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ jsxs(Tabs, {
					value: activeTab,
					onValueChange: (v) => setActiveTab(v),
					children: [/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-4",
						children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "all",
								children: "Tất cả"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "pending",
								children: "Chờ duyệt"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "approved",
								children: "Đã duyệt"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "rejected",
								children: "Từ chối"
							})
						]
					}), [
						"all",
						"pending",
						"approved",
						"rejected"
					].map((tab) => /* @__PURE__ */ jsxs(TabsContent, {
						value: tab,
						className: "space-y-4",
						children: [
							tab === "trash" && /* @__PURE__ */ jsx("div", {
								className: "px-4 py-3 bg-muted/50 rounded-lg border border-muted",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "💡 File trong thùng rác có thể được khôi phục lại cho user. Admin không thể xóa vĩnh viễn file tại đây."
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative w-full max-w-xs",
								children: [/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
									placeholder: "Tìm theo tên file hoặc owner…",
									value: query,
									onChange: (e) => setQuery(e.target.value),
									className: "pl-9"
								})]
							}),
							/* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
								/* @__PURE__ */ jsx(TableHead, { children: "File" }),
								/* @__PURE__ */ jsx(TableHead, { children: "Owner" }),
								/* @__PURE__ */ jsx(TableHead, { children: tab === "trash" ? "Thời gian xóa" : "Trạng thái" }),
								/* @__PURE__ */ jsx(TableHead, { children: "Size" }),
								/* @__PURE__ */ jsx(TableHead, {
									className: "text-right",
									children: "Hành động"
								})
							] }) }), /* @__PURE__ */ jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
								colSpan: 5,
								className: "h-24 text-center text-muted-foreground",
								children: "Không có file nào"
							}) }) : filtered.map((d) => /* @__PURE__ */ jsxs(TableRow, { children: [
								/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 min-w-0",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
										children: /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-medium truncate",
											children: d.title
										}), /* @__PURE__ */ jsx("p", {
											className: "text-muted-foreground text-xs",
											children: d.fileSize ? `${(d.fileSize / 1024 / 1024).toFixed(2)} MB` : ""
										})]
									})]
								}) }),
								/* @__PURE__ */ jsxs(TableCell, {
									className: "text-muted-foreground",
									children: [d.ownerId?.slice(0, 8), "..."]
								}),
								/* @__PURE__ */ jsx(TableCell, { children: tab === "trash" && d.deletedAt ? /* @__PURE__ */ jsx("span", {
									className: "text-sm text-muted-foreground",
									children: new Date(d.deletedAt).toLocaleDateString("vi-VN", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
										hour: "2-digit",
										minute: "2-digit"
									})
								}) : /* @__PURE__ */ jsx(Badge, {
									variant: d.status === "READY" ? "secondary" : d.status === "REJECT" ? "destructive" : "outline",
									children: statusLabel[d.status] ?? d.status
								}) }),
								/* @__PURE__ */ jsx(TableCell, {
									className: "text-muted-foreground",
									children: d.fileSize ? `${(d.fileSize / 1024).toFixed(1)} KB` : "-"
								}),
								/* @__PURE__ */ jsx(TableCell, {
									className: "text-right",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex justify-end gap-2",
										children: [
											tab !== "trash" && /* @__PURE__ */ jsxs(Button, {
												variant: "outline",
												size: "sm",
												onClick: () => {
													setPreview({
														title: d.title,
														url: d.cloudinaryUrl,
														mimeType: d.mimeType
													});
													setReviewedIds((prev) => new Set(prev).add(d.id));
												},
												children: [/* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }), " Xem"]
											}),
											activeTab === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Button, {
												variant: "outline",
												size: "sm",
												disabled: approveDocument.isPending || !reviewedIds.has(d.id),
												title: !reviewedIds.has(d.id) ? "Bạn cần xem file trước khi duyệt" : void 0,
												onClick: () => {
													approveDocument.mutate(d.id, {
														onSuccess: () => toast.success("Đã duyệt file"),
														onError: (err) => toast.error("Lỗi: " + err.message)
													});
												},
												children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }), " Duyệt"]
											}), /* @__PURE__ */ jsxs(Button, {
												variant: "outline",
												size: "sm",
												disabled: rejectDocument.isPending || !reviewedIds.has(d.id),
												title: !reviewedIds.has(d.id) ? "Bạn cần xem file trước khi từ chối" : void 0,
												onClick: () => {
													rejectDocument.mutate(d.id, {
														onSuccess: () => toast.success("Đã từ chối file"),
														onError: (err) => toast.error("Lỗi: " + err.message)
													});
												},
												children: [/* @__PURE__ */ jsx(XCircle, { className: "h-3.5 w-3.5" }), " Từ chối"]
											})] }),
											activeTab === "trash" && /* @__PURE__ */ jsxs(Button, {
												variant: "outline",
												size: "sm",
												disabled: restoreDocument.isPending,
												onClick: () => {
													if (window.confirm(`Khôi phục file "${d.title}" cho user?`)) restoreDocument.mutate(d.id, {
														onSuccess: () => toast.success("Đã khôi phục file"),
														onError: (err) => toast.error("Lỗi: " + err.message)
													});
												},
												children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" }), " Khôi phục"]
											})
										]
									})
								})
							] }, d.id)) })] })
						]
					}, tab))]
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
//#region src/routes/admin_panel/files.tsx?tsr-split=component
var SplitComponent = AdminFilesPage;
//#endregion
export { SplitComponent as component };
