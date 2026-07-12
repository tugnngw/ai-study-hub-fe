import { t as Button } from "./button-OuFjfcpS.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as paymentApi } from "./paymentApi-JLvr4dSN.js";
import { i as mbToGb, r as formatStorage, t as MB_PER_GB } from "./config-CGxDyaH-.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DJOO1b-0.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BgKcOzjx.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as useAdminTransactions } from "./useAdminTransactions-DvE_HvOP.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Clock, Crown, Loader2, Pencil, Save, TrendingDown, TrendingUp, Wallet, X, XCircle } from "lucide-react";
//#region src/features/admin/hooks/usePayment.ts
function useAdminPlans() {
	return useQuery({
		queryKey: adminKeys.adminPlans(),
		queryFn: () => paymentApi.adminGetPlans()
	});
}
function useUpdatePlan() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, ...body }) => paymentApi.adminUpdatePlan(id, body),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.adminPlans() });
			qc.invalidateQueries({ queryKey: adminKeys.planOptions() });
			qc.invalidateQueries({ queryKey: ["plans"] });
		}
	});
}
//#endregion
//#region src/features/admin/components/AdminPremiumPage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
var fmtDate = (date) => new Date(date).toLocaleString("vi-VN");
function StatCard({ label, value, trend, icon, tone }) {
	const up = trend >= 0;
	return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
		className: "pt-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					className: `h-11 w-11 rounded-xl flex items-center justify-center ${tone}`,
					children: icon
				}), /* @__PURE__ */ jsxs("span", {
					className: `inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`,
					children: [
						up ? /* @__PURE__ */ jsx(TrendingUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(TrendingDown, { className: "h-3.5 w-3.5" }),
						Math.abs(trend),
						"%"
					]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground text-sm font-medium mt-4",
				children: label
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl font-bold tracking-tight mt-1 font-display",
				children: value
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground mt-0.5",
				children: "so với tháng trước"
			})
		]
	}) });
}
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
function PlanConfigCard() {
	const { data: plans, isLoading } = useAdminPlans();
	const updatePlan = useUpdatePlan();
	const [editingId, setEditingId] = useState(null);
	const [draft, setDraft] = useState(null);
	const startEdit = (p) => {
		setEditingId(p.id);
		const useMb = p.storageGb < 1;
		setDraft({
			price: p.price,
			storageValue: useMb ? Math.round(p.storageGb * MB_PER_GB) : p.storageGb,
			storageUnit: useMb ? "MB" : "GB",
			aiQuestions: p.aiQuestions,
			description: p.description,
			isActive: p.isActive
		});
	};
	const cancel = () => {
		setEditingId(null);
		setDraft(null);
	};
	const save = async (id) => {
		if (!draft) return;
		const storageGb = draft.storageUnit === "MB" ? mbToGb(draft.storageValue) : draft.storageValue;
		try {
			await updatePlan.mutateAsync({
				id,
				price: draft.price,
				storageGb,
				aiQuestions: draft.aiQuestions,
				description: draft.description,
				isActive: draft.isActive
			});
			toast.success("Đã cập nhật gói");
			cancel();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Cập nhật thất bại");
		}
	};
	return /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
		className: "text-base",
		children: "Cấu hình gói nâng cấp"
	}), /* @__PURE__ */ jsx("p", {
		className: "text-sm text-muted-foreground",
		children: "Chỉnh sửa giá (30 ngày), dung lượng lưu trữ và số câu hỏi AI của từng gói."
	})] }), /* @__PURE__ */ jsx(CardContent, {
		className: "p-0",
		children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
			className: "[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground",
			children: [
				/* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Giá / 30 ngày" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Lưu trữ" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Câu hỏi AI" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
				/* @__PURE__ */ jsx(TableHead, {
					className: "text-right",
					children: "Hành động"
				})
			]
		}) }), /* @__PURE__ */ jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
			colSpan: 6,
			className: "h-20 text-center",
			children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin mx-auto text-primary" })
		}) }) : (plans ?? []).length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
			colSpan: 6,
			className: "h-20 text-center text-muted-foreground",
			children: "Chưa có gói nào"
		}) }) : (plans ?? []).map((p) => {
			const editing = editingId === p.id;
			return /* @__PURE__ */ jsxs(TableRow, {
				className: "[&>td]:py-3",
				children: [
					/* @__PURE__ */ jsx(TableCell, {
						className: "font-semibold",
						children: p.name
					}),
					/* @__PURE__ */ jsx(TableCell, { children: editing ? /* @__PURE__ */ jsx(Input, {
						type: "number",
						className: "w-32 h-8",
						value: draft?.price ?? 0,
						onChange: (e) => setDraft((d) => d && {
							...d,
							price: Number(e.target.value)
						})
					}) : fmtVnd(p.price) }),
					/* @__PURE__ */ jsx(TableCell, { children: editing ? /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx(Input, {
							type: "number",
							min: 0,
							step: "any",
							className: "w-24 h-8",
							value: draft?.storageValue ?? 0,
							onChange: (e) => setDraft((d) => d && {
								...d,
								storageValue: Number(e.target.value)
							})
						}), /* @__PURE__ */ jsxs("select", {
							className: "h-8 rounded-md border border-input bg-background px-2 text-sm",
							value: draft?.storageUnit ?? "GB",
							onChange: (e) => setDraft((d) => {
								if (!d) return d;
								const nextUnit = e.target.value;
								if (nextUnit === d.storageUnit) return d;
								const value = nextUnit === "MB" ? Math.round(d.storageValue * MB_PER_GB * 1e3) / 1e3 : Math.round(d.storageValue / MB_PER_GB * 1e3) / 1e3;
								return {
									...d,
									storageUnit: nextUnit,
									storageValue: value
								};
							}),
							children: [/* @__PURE__ */ jsx("option", {
								value: "MB",
								children: "MB"
							}), /* @__PURE__ */ jsx("option", {
								value: "GB",
								children: "GB"
							})]
						})]
					}) : formatStorage(p.storageGb) }),
					/* @__PURE__ */ jsx(TableCell, { children: editing ? /* @__PURE__ */ jsx(Input, {
						type: "number",
						className: "w-24 h-8",
						value: draft?.aiQuestions ?? 0,
						onChange: (e) => setDraft((d) => d && {
							...d,
							aiQuestions: Number(e.target.value)
						})
					}) : p.aiQuestions > 9999 ? "Không giới hạn" : p.aiQuestions }),
					/* @__PURE__ */ jsx(TableCell, { children: editing ? /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => setDraft((d) => d && {
							...d,
							isActive: !d.isActive
						}),
						children: draft?.isActive ? "Đang bật" : "Đang tắt"
					}) : /* @__PURE__ */ jsx(Badge, {
						variant: "secondary",
						className: p.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600",
						children: p.isActive ? "Đang bật" : "Đang tắt"
					}) }),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-right",
						children: editing ? /* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ jsxs(Button, {
								size: "sm",
								onClick: () => save(p.id),
								disabled: updatePlan.isPending,
								children: [/* @__PURE__ */ jsx(Save, { className: "h-3.5 w-3.5 mr-1" }), " Lưu"]
							}), /* @__PURE__ */ jsx(Button, {
								size: "sm",
								variant: "outline",
								onClick: cancel,
								children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
							})]
						}) : /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => startEdit(p),
							children: [/* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5 mr-1" }), " Sửa"]
						})
					})
				]
			}, p.id);
		}) })] })
	})] });
}
var AdminPremiumPage = () => {
	const [tab, setTab] = useState("all");
	const { data, isLoading } = useAdminTransactions(0, 50);
	const transactions = data?.content || [];
	const totalPaid = transactions.filter((t) => t.status === "PAID").length;
	const totalRevenue = transactions.filter((t) => t.status === "PAID").reduce((sum, t) => sum + t.amount, 0);
	const filtered = useMemo(() => tab === "all" ? transactions : transactions.filter((t) => t.status === tab), [transactions, tab]);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center min-h-[400px]",
		children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Quản lý Premium"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Theo dõi gói trả phí và lịch sử giao dịch nâng cấp"
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ jsx(StatCard, {
						label: "Total Premium Users",
						value: String(totalPaid),
						trend: 0,
						icon: /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5" }),
						tone: "bg-primary/10 text-primary"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Pending Requests",
						value: String(transactions.filter((t) => t.status === "PENDING").length),
						trend: 0,
						icon: /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }),
						tone: "bg-amber-500/10 text-amber-600"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Revenue This Month",
						value: fmtVnd(totalRevenue),
						trend: 0,
						icon: /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" }),
						tone: "bg-emerald-500/10 text-emerald-600"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Total Transactions",
						value: String(transactions.length),
						trend: 0,
						icon: /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5" }),
						tone: "bg-destructive/10 text-destructive"
					})
				]
			}),
			/* @__PURE__ */ jsx(PlanConfigCard, {}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
				className: "flex-row items-center justify-between space-y-0",
				children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-base",
					children: "Lịch sử giao dịch thanh toán"
				}), /* @__PURE__ */ jsx(Tabs, {
					value: tab,
					onValueChange: (v) => setTab(v),
					children: /* @__PURE__ */ jsxs(TabsList, { children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "all",
							children: "Tất cả"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "PAID",
							children: "Thành công"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "PENDING",
							children: "Chờ xử lý"
						})
					] })
				})]
			}), /* @__PURE__ */ jsx(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
					className: "[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground",
					children: [
						/* @__PURE__ */ jsx(TableHead, { children: "User" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Email" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Số tiền" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Ngày tạo" })
					]
				}) }), /* @__PURE__ */ jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
					colSpan: 6,
					className: "h-24 text-center text-muted-foreground",
					children: "Không có giao dịch nào"
				}) }) : filtered.map((tx) => {
					const s = statusBadge[tx.status] || statusBadge.PENDING;
					return /* @__PURE__ */ jsxs(TableRow, {
						className: "[&>td]:py-4 [&>td]:text-[15px]",
						children: [
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
			})] })
		]
	});
};
//#endregion
//#region src/routes/admin_panel/premium.tsx?tsr-split=component
var SplitComponent = AdminPremiumPage;
//#endregion
export { SplitComponent as component };
