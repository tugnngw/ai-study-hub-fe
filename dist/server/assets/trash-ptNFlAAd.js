import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DJOO1b-0.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BgKcOzjx.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-CcHbQ4nc.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as adminDocumentApi } from "./documentApi-DC7RT3tC.js";
import { t as reportApi } from "./reportApi-BIOQvol3.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileText, Info, RotateCcw, Trash2 } from "lucide-react";
//#region src/features/admin/services/fileApi.ts
function calculateRemainingDays(deletedAt) {
	const diff = 30 - Math.floor((Date.now() - new Date(deletedAt).getTime()) / (1e3 * 60 * 60 * 24));
	return Math.max(0, diff);
}
var adminFileApi = {
	getReportedFiles: async () => {
		try {
			return (await reportApi.getReports()).map((r) => ({
				id: r.documentId,
				name: r.documentTitle || "Unknown",
				uploader: r.reporterId || "Unknown",
				size: "N/A",
				reports: 1,
				reporter: r.reporterUsername || "Unknown",
				reason: r.reason,
				createdAt: r.createdAt
			}));
		} catch {
			return [];
		}
	},
	handleReportDecision: async (id, decision) => {
		if (decision === "remove") await adminDocumentApi.reject(id);
		else await adminDocumentApi.approve(id);
		return true;
	},
	getDeletedFiles: async () => {
		try {
			return (await adminDocumentApi.getTrash()).map((doc) => ({
				id: doc.id,
				name: doc.title,
				deletedDate: doc.deletedAt || doc.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
				remainingDays: calculateRemainingDays(doc.deletedAt || doc.updatedAt || (/* @__PURE__ */ new Date()).toISOString())
			}));
		} catch {
			return [];
		}
	},
	getDeletedAccounts: async () => {
		return [];
	},
	permanentDelete: async (id, type) => {
		if (type === "file") await adminDocumentApi.delete(id);
		return true;
	},
	restoreItem: async (id, type) => {
		if (type === "file") await adminDocumentApi.restore(id);
		return true;
	}
};
//#endregion
//#region src/features/admin/hooks/useAdminFiles.ts
function useDeletedFiles() {
	return useQuery({
		queryKey: adminKeys.deletedFiles(),
		queryFn: () => adminFileApi.getDeletedFiles()
	});
}
function useDeletedAccounts() {
	return useQuery({
		queryKey: adminKeys.deletedAccounts(),
		queryFn: () => adminFileApi.getDeletedAccounts()
	});
}
function usePermanentDelete() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, type }) => adminFileApi.permanentDelete(id, type),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
			qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
		}
	});
}
function useRestoreItem() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, type }) => adminFileApi.restoreItem(id, type),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.deletedFiles() });
			qc.invalidateQueries({ queryKey: adminKeys.deletedAccounts() });
		}
	});
}
//#endregion
//#region src/features/admin/components/AdminTrashPage.tsx
function CountdownBadge({ days }) {
	return /* @__PURE__ */ jsxs(Badge, {
		variant: "secondary",
		className: cn(days <= 5 ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"),
		children: [days, " ngày"]
	});
}
var AdminTrashPage = () => {
	const [subTab, setSubTab] = useState("file");
	const { data: delFiles = [] } = useDeletedFiles();
	const { data: delAccs = [] } = useDeletedAccounts();
	const permanentDelete = usePermanentDelete();
	const restoreItem = useRestoreItem();
	const handleAction = (id, type, act) => {
		if (act === "delete") {
			if (!window.confirm("Xóa vĩnh viễn mục này?")) return;
			permanentDelete.mutate({
				id,
				type
			}, { onSuccess: () => toast.success("Đã xóa vĩnh viễn") });
		} else restoreItem.mutate({
			id,
			type
		}, { onSuccess: () => toast.success("Đã khôi phục") });
	};
	const ActionButtons = ({ id, type }) => /* @__PURE__ */ jsxs("div", {
		className: "flex justify-end gap-2",
		children: [/* @__PURE__ */ jsxs(Button, {
			variant: "outline",
			size: "sm",
			onClick: () => handleAction(id, type, "restore"),
			children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Khôi phục"]
		}), /* @__PURE__ */ jsxs(Button, {
			variant: "outline",
			size: "sm",
			className: "text-destructive hover:text-destructive",
			onClick: () => handleAction(id, type, "delete"),
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Xóa vĩnh viễn"]
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight font-display",
			children: "Thùng rác"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1 text-sm",
			children: "Khôi phục hoặc xóa vĩnh viễn các mục đã xóa"
		})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "flex-row items-center justify-between space-y-0",
			children: [/* @__PURE__ */ jsx(CardTitle, {
				className: "text-base",
				children: "Thùng rác"
			}), /* @__PURE__ */ jsx(Tabs, {
				value: subTab,
				onValueChange: (v) => setSubTab(v),
				children: /* @__PURE__ */ jsxs(TabsList, { children: [/* @__PURE__ */ jsx(TabsTrigger, {
					value: "file",
					children: "File"
				}), /* @__PURE__ */ jsx(TabsTrigger, {
					value: "account",
					children: "Tài khoản"
				})] })
			})]
		}), /* @__PURE__ */ jsxs(CardContent, {
			className: "p-0",
			children: [/* @__PURE__ */ jsxs(Tabs, {
				value: subTab,
				children: [/* @__PURE__ */ jsx(TabsContent, {
					value: "file",
					className: "m-0",
					children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableHead, { children: "Tên File" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Ngày xóa" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Còn lại" }),
						/* @__PURE__ */ jsx(TableHead, {
							className: "text-right",
							children: "Hành động"
						})
					] }) }), /* @__PURE__ */ jsx(TableBody, { children: delFiles.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
						colSpan: 4,
						className: "h-24 text-center text-muted-foreground",
						children: "Thùng rác trống"
					}) }) : delFiles.map((f) => /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsx("span", {
								className: "font-medium truncate",
								children: f.name
							})]
						}) }),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-muted-foreground",
							children: f.deletedDate
						}),
						/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(CountdownBadge, { days: f.remainingDays }) }),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ jsx(ActionButtons, {
								id: f.id,
								type: "file"
							})
						})
					] }, f.id)) })] })
				}), /* @__PURE__ */ jsx(TabsContent, {
					value: "account",
					className: "m-0",
					children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableHead, { children: "Chủ tài khoản" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Email" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Còn lại" }),
						/* @__PURE__ */ jsx(TableHead, {
							className: "text-right",
							children: "Hành động"
						})
					] }) }), /* @__PURE__ */ jsx(TableBody, { children: delAccs.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
						colSpan: 4,
						className: "h-24 text-center text-muted-foreground",
						children: "Thùng rác trống"
					}) }) : delAccs.map((a) => /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ jsx(Avatar, {
								className: "h-9 w-9",
								children: /* @__PURE__ */ jsx(AvatarFallback, {
									className: "bg-muted text-sm",
									children: a.name.charAt(0)
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "font-medium truncate",
								children: a.name
							})]
						}) }),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-muted-foreground",
							children: a.email
						}),
						/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(CountdownBadge, { days: a.remainingDays }) }),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ jsx(ActionButtons, {
								id: a.id,
								type: "account"
							})
						})
					] }, a.id)) })] })
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 px-6 py-3.5 border-t border-border bg-muted/30",
				children: [/* @__PURE__ */ jsx(Info, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-xs",
					children: "Các mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày."
				})]
			})]
		})] })]
	});
};
//#endregion
//#region src/routes/admin_panel/trash.tsx?tsr-split=component
var SplitComponent = AdminTrashPage;
//#endregion
export { SplitComponent as component };
