import { t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-C3MnOk9C.js";
import { t as paymentApi } from "./paymentApi-OJffO5NS.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BtNG4hpQ.js";
import { n as formatStorage, r as mbToGb, t as MB_PER_GB } from "./config-Dso0kZ37.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BRwfIiZL.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { t as useAdminTransactions } from "./useAdminTransactions-BUQQTH2W.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Clock, Crown, Loader2, Pencil, Plus, RotateCcw, Trash2, TrendingDown, TrendingUp, Wallet, XCircle } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
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
function useCreatePlan() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body) => paymentApi.adminCreatePlan(body),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.adminPlans() });
			qc.invalidateQueries({ queryKey: adminKeys.planOptions() });
			qc.invalidateQueries({ queryKey: ["plans"] });
		}
	});
}
function useDeletePlan() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => paymentApi.adminDeletePlan(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.adminPlans() });
			qc.invalidateQueries({ queryKey: adminKeys.planOptions() });
			qc.invalidateQueries({ queryKey: ["plans"] });
		}
	});
}
function useRestorePlan() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => paymentApi.adminRestorePlan(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.adminPlans() });
			qc.invalidateQueries({ queryKey: adminKeys.planOptions() });
			qc.invalidateQueries({ queryKey: ["plans"] });
		}
	});
}
//#endregion
//#region src/components/ui/switch.tsx
var Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/features/admin/components/PlanFormModal.tsx
var PlanFormModal = ({ open, onOpenChange, plan, mode, createPlan, updatePlan, existingPlans = [] }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [durationDays, setDurationDays] = useState(30);
	const [storageValue, setStorageValue] = useState(1);
	const [storageUnit, setStorageUnit] = useState("GB");
	const [flashcardLimit, setFlashcardLimit] = useState(0);
	const [questionLimit, setQuestionLimit] = useState(0);
	const [summaryLimit, setSummaryLimit] = useState(0);
	const [chatLimit, setChatLimit] = useState(0);
	const [aiQuestions, setAiQuestions] = useState(0);
	const [tier, setTier] = useState(0);
	const [isActive, setIsActive] = useState(true);
	const createMutation = createPlan;
	const updateMutation = updatePlan;
	useEffect(() => {
		if (plan) {
			setName(plan.name || "");
			setPrice(plan.price || 0);
			setDurationDays(plan.durationDays || 30);
			const useMb = (plan.storageGb || 0) < 1;
			setStorageValue(useMb ? Math.round(plan.storageGb * MB_PER_GB) : plan.storageGb);
			setStorageUnit(useMb ? "MB" : "GB");
			setAiQuestions(plan.aiQuestions ?? 0);
			setFlashcardLimit(plan.flashcardLimit || 0);
			setQuestionLimit(plan.questionLimit || 0);
			setSummaryLimit(plan.summaryLimit || 0);
			setChatLimit(plan.chatLimit || 0);
			setTier(plan.tier ?? 0);
			setIsActive(plan.isActive !== void 0 ? plan.isActive : true);
		} else if (mode === "create") {
			setName("");
			setPrice(0);
			setDurationDays(30);
			setStorageValue(1);
			setStorageUnit("GB");
			setAiQuestions(10);
			setFlashcardLimit(0);
			setQuestionLimit(0);
			setSummaryLimit(0);
			setChatLimit(0);
			setTier(0);
			setIsActive(true);
		}
	}, [
		plan,
		mode,
		open
	]);
	const validateForm = () => {
		if (!name.trim()) return {
			valid: false,
			message: "Tên gói không được để trống"
		};
		if (price < 0) return {
			valid: false,
			message: "Giá không được nhỏ hơn 0"
		};
		if (durationDays < -1) return {
			valid: false,
			message: "Thời hạn không được nhỏ hơn -1 (-1 là vĩnh viễn)"
		};
		if (storageValue < 0) return {
			valid: false,
			message: "Dung lượng không được nhỏ hơn 0"
		};
		if (aiQuestions < 0) return {
			valid: false,
			message: "Số câu hỏi AI không được nhỏ hơn 0"
		};
		if (flashcardLimit < -1) return {
			valid: false,
			message: "Giới hạn flashcard không hợp lệ"
		};
		if (questionLimit < -1) return {
			valid: false,
			message: "Giới hạn câu hỏi không hợp lệ"
		};
		if (summaryLimit < -1) return {
			valid: false,
			message: "Giới hạn tóm tắt không hợp lệ"
		};
		if (chatLimit < -1) return {
			valid: false,
			message: "Giới hạn chat không hợp lệ"
		};
		if (tier < 0) return {
			valid: false,
			message: "Cấp độ (tier) không được nhỏ hơn 0"
		};
		return { valid: true };
	};
	const handleSubmit = async () => {
		const validation = validateForm();
		if (!validation.valid) {
			toast.error(validation.message);
			return;
		}
		const storageGb = storageUnit === "MB" ? mbToGb(storageValue) : storageValue;
		try {
			if (mode === "create") {
				await createMutation.mutateAsync({
					name,
					price,
					durationDays,
					storageGb,
					aiQuestions,
					flashcardLimit,
					questionLimit,
					summaryLimit,
					chatLimit,
					tier
				});
				toast.success("Đã tạo gói mới");
			} else if (plan) {
				await updateMutation.mutateAsync({
					id: plan.id,
					name,
					price,
					durationDays,
					storageGb,
					aiQuestions,
					flashcardLimit,
					questionLimit,
					summaryLimit,
					chatLimit,
					tier,
					isActive
				});
				toast.success("Đã cập nhật gói");
			}
			onOpenChange(false);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : `${mode === "create" ? "Tạo" : "Cập nhật"} thất bại`);
		}
	};
	const limitHint = (val) => val === -1 ? "(không giới hạn)" : val === 0 ? "(tắt)" : "";
	const tierMap = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		for (const p of existingPlans) {
			const t = p.tier ?? 0;
			if (!map.has(t)) map.set(t, []);
			map.get(t).push(p);
		}
		return map;
	}, [existingPlans]);
	const sortedTiers = useMemo(() => Array.from(tierMap.entries()).sort(([a], [b]) => a - b), [tierMap]);
	const tierConflict = useMemo(() => {
		const existing = tierMap.get(tier) ?? [];
		if (existing.length === 0) return null;
		if (mode === "edit" && plan && existing.length === 1 && existing[0].id === plan.id) return null;
		return `Tier ${tier} đã được dùng bởi: ${existing.map((p) => p.name).join(", ")}`;
	}, [
		tier,
		tierMap,
		mode,
		plan
	]);
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: mode === "create" ? "Tạo gói nâng cấp mới" : `Sửa gói "${plan?.name}"` }), /* @__PURE__ */ jsx(DialogDescription, { children: mode === "create" ? "Điền thông tin để tạo gói nâng cấp mới" : "Chỉnh sửa thông tin gói nâng cấp" })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-5 py-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "name",
								children: "Tên gói *"
							}), /* @__PURE__ */ jsx(Input, {
								id: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Ví dụ: Pro, Premium"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "price",
									children: "Giá (VNĐ) *"
								}), /* @__PURE__ */ jsx(Input, {
									id: "price",
									type: "number",
									value: price,
									onChange: (e) => setPrice(Number(e.target.value)),
									placeholder: "99000"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "durationDays",
										children: "Thời hạn (ngày) *"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "durationDays",
										type: "number",
										value: durationDays,
										onChange: (e) => setDurationDays(Number(e.target.value)),
										placeholder: "30"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "-1 = vĩnh viễn"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "storage",
									children: "Dung lượng lưu trữ *"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx(Input, {
										id: "storage",
										type: "number",
										step: "any",
										value: storageValue,
										onChange: (e) => setStorageValue(Number(e.target.value)),
										className: "flex-1",
										placeholder: "1"
									}), /* @__PURE__ */ jsxs("select", {
										className: "rounded-md border border-input bg-background px-3 py-2 text-sm",
										value: storageUnit,
										onChange: (e) => setStorageUnit(e.target.value),
										children: [/* @__PURE__ */ jsx("option", {
											value: "MB",
											children: "MB"
										}), /* @__PURE__ */ jsx("option", {
											value: "GB",
											children: "GB"
										})]
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "aiQuestions",
										children: "Số câu hỏi Quiz AI *"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "aiQuestions",
										type: "number",
										value: aiQuestions,
										onChange: (e) => setAiQuestions(Number(e.target.value)),
										placeholder: "100"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "Số câu hỏi cho mỗi bài Quiz (mỗi lần tạo)"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "text-sm font-medium text-muted-foreground mb-3",
							children: ["Giới hạn tính năng ", /* @__PURE__ */ jsx("span", {
								className: "text-xs font-normal",
								children: "(-1 = không giới hạn, 0 = tắt)"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-x-4 gap-y-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "flashcardLimit",
											children: "Flashcard (lượt) *"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "flashcardLimit",
											type: "number",
											value: flashcardLimit,
											onChange: (e) => setFlashcardLimit(Number(e.target.value)),
											placeholder: "0"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground h-4",
											children: limitHint(flashcardLimit)
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "questionLimit",
											children: "Quiz (lượt) *"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "questionLimit",
											type: "number",
											value: questionLimit,
											onChange: (e) => setQuestionLimit(Number(e.target.value)),
											placeholder: "0"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground h-4",
											children: limitHint(questionLimit)
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "summaryLimit",
											children: "Tóm tắt (lượt) *"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "summaryLimit",
											type: "number",
											value: summaryLimit,
											onChange: (e) => setSummaryLimit(Number(e.target.value)),
											placeholder: "0"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground h-4",
											children: limitHint(summaryLimit)
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "chatLimit",
											children: "AI Chat (lượt) *"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "chatLimit",
											type: "number",
											value: chatLimit,
											onChange: (e) => setChatLimit(Number(e.target.value)),
											placeholder: "0"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground h-4",
											children: limitHint(chatLimit)
										})
									]
								})
							]
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										htmlFor: "tier",
										children: "Cấp độ (Tier) *"
									}),
									/* @__PURE__ */ jsx(Input, {
										id: "tier",
										type: "number",
										value: tier,
										onChange: (e) => setTier(Number(e.target.value)),
										placeholder: "0",
										className: tierConflict ? "border-red-500 focus-visible:ring-red-500" : ""
									}),
									tierConflict ? /* @__PURE__ */ jsxs("p", {
										className: "text-xs text-red-500 flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx("span", { children: "⚠" }),
											" ",
											tierConflict
										]
									}) : /* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "Số càng cao = gói càng cao. Không nên trùng tier giữa các gói."
									}),
									sortedTiers.length > 0 && /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-1.5 mt-1",
										children: sortedTiers.map(([t, plans]) => {
											const isCurrentTier = t === tier;
											const isOwn = mode === "edit" && plan && plans.length === 1 && plans[0].id === plan.id;
											return /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: () => setTier(t),
												className: `
                          inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border
                          ${isCurrentTier && !isOwn ? "bg-red-50 border-red-200 text-red-600" : isCurrentTier ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/50 border-border text-muted-foreground hover:border-primary/30"}
                          ${isOwn ? "ring-1 ring-primary/30" : ""}
                        `,
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-mono",
													children: t
												}), /* @__PURE__ */ jsx("span", { children: plans.map((p) => p.name).join(", ") })]
											}, t);
										})
									})
								]
							}), mode === "edit" && /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Trạng thái" }), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 pt-2",
									children: [/* @__PURE__ */ jsx(Switch, {
										id: "isActive",
										checked: isActive,
										onCheckedChange: setIsActive
									}), /* @__PURE__ */ jsx(Badge, {
										variant: isActive ? "secondary" : "outline",
										children: isActive ? "Đang bật" : "Đã ẩn"
									})]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					disabled: createMutation.isPending || updateMutation.isPending,
					children: "Hủy"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: handleSubmit,
					disabled: createMutation.isPending || updateMutation.isPending,
					children: createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu gói"
				})] })
			]
		})
	});
};
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
	const createPlan = useCreatePlan();
	const deletePlan = useDeletePlan();
	const restorePlan = useRestorePlan();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("create");
	const [selectedPlan, setSelectedPlan] = useState(null);
	const openCreateModal = () => {
		setSelectedPlan(null);
		setModalMode("create");
		setModalOpen(true);
	};
	const openEditModal = (plan) => {
		setSelectedPlan(plan);
		setModalMode("edit");
		setModalOpen(true);
	};
	const handleDelete = async (id, name) => {
		if (!confirm(`Ẩn gói "${name}"?`)) return;
		try {
			await deletePlan.mutateAsync(id);
			toast.success("Đã ẩn gói");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Ẩn thất bại");
		}
	};
	const handleRestore = async (id) => {
		try {
			await restorePlan.mutateAsync(id);
			toast.success("Đã khôi phục gói");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Khôi phục thất bại");
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
		className: "flex-row items-center justify-between space-y-0",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(CardTitle, {
			className: "text-base",
			children: "Cấu hình gói nâng cấp"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "Quản lý giá, dung lượng, thời hạn và tính năng của từng gói."
		})] }), /* @__PURE__ */ jsxs(Button, {
			size: "sm",
			onClick: openCreateModal,
			children: [/* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }), " Tạo gói"]
		})]
	}), /* @__PURE__ */ jsx(CardContent, {
		className: "p-0",
		children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, {
			className: "[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground",
			children: [
				/* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Giá" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Cấp độ" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Thời hạn" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Lưu trữ" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Quiz AI (số câu)" }),
				/* @__PURE__ */ jsx(TableHead, { children: "AI Chat (lượt)" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Tạo Quiz (lượt)" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Tạo Flashcard (lượt)" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Tóm tắt (lượt)" }),
				/* @__PURE__ */ jsx(TableHead, { children: "Trạng thái" }),
				/* @__PURE__ */ jsx(TableHead, {
					className: "text-right",
					children: "Hành động"
				})
			]
		}) }), /* @__PURE__ */ jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
			colSpan: 12,
			className: "h-20 text-center",
			children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin mx-auto text-primary" })
		}) }) : (plans ?? []).length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
			colSpan: 12,
			className: "h-20 text-center text-muted-foreground",
			children: "Chưa có gói nào"
		}) }) : (plans ?? []).map((p) => /* @__PURE__ */ jsxs(TableRow, {
			className: "[&>td]:py-3",
			children: [
				/* @__PURE__ */ jsxs(TableCell, {
					className: "font-semibold",
					children: [p.name, !p.isActive && /* @__PURE__ */ jsx(Badge, {
						variant: "secondary",
						className: "ml-2 text-xs bg-gray-100 text-gray-500",
						children: "Đã ẩn"
					})]
				}),
				/* @__PURE__ */ jsx(TableCell, { children: fmtVnd(p.price) }),
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", {
					className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm",
					children: p.tier ?? 0
				}) }),
				/* @__PURE__ */ jsx(TableCell, { children: p.durationDays === 0 || p.durationDays === -1 ? "Vĩnh viễn" : p.durationDays ? `${p.durationDays} ngày` : "—" }),
				/* @__PURE__ */ jsx(TableCell, { children: formatStorage(p.storageGb) }),
				/* @__PURE__ */ jsx(TableCell, { children: p.aiQuestions == null ? "—" : p.aiQuestions > 9999 ? "Không giới hạn" : `${p.aiQuestions} câu` }),
				/* @__PURE__ */ jsx(TableCell, { children: p.chatLimit == null ? "—" : p.chatLimit > 9999 ? "Không giới hạn" : `${p.chatLimit} lượt` }),
				/* @__PURE__ */ jsx(TableCell, { children: p.questionLimit == null ? "—" : p.questionLimit > 9999 ? "Không giới hạn" : `${p.questionLimit} lượt` }),
				/* @__PURE__ */ jsx(TableCell, { children: p.flashcardLimit == null ? "—" : p.flashcardLimit > 9999 ? "Không giới hạn" : `${p.flashcardLimit} lượt` }),
				/* @__PURE__ */ jsx(TableCell, { children: p.summaryLimit == null ? "—" : p.summaryLimit > 9999 ? "Không giới hạn" : `${p.summaryLimit} lượt` }),
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
					variant: "secondary",
					className: p.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600",
					children: p.isActive ? "Đang bật" : "Đang tắt"
				}) }),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ jsxs(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => openEditModal(p),
							children: [/* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5 mr-1" }), " Sửa"]
						}), p.isActive ? /* @__PURE__ */ jsx(Button, {
							size: "sm",
							variant: "outline",
							className: "text-destructive hover:bg-destructive/10",
							onClick: () => handleDelete(p.id, p.name),
							disabled: deletePlan.isPending,
							children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
						}) : /* @__PURE__ */ jsx(Button, {
							size: "sm",
							variant: "outline",
							className: "text-emerald-600 hover:bg-emerald-500/10",
							onClick: () => handleRestore(p.id),
							disabled: restorePlan.isPending,
							children: /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" })
						})]
					})
				})
			]
		}, p.id)) })] })
	})] }), /* @__PURE__ */ jsx(PlanFormModal, {
		open: modalOpen,
		onOpenChange: setModalOpen,
		plan: selectedPlan,
		mode: modalMode,
		createPlan,
		updatePlan,
		existingPlans: plans
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
