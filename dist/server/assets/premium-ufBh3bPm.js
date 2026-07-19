import { n as api } from "./api-DeanpG7g.js";
import { n as useAuth } from "./auth-C8wjnF5I.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B5SRUUUO.js";
import { t as paymentApi } from "./paymentApi-JLvr4dSN.js";
import { _ as usePlans } from "./queries-5wiHfXhj.js";
import { r as formatStorage } from "./config-CGxDyaH-.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { n as priceForDays, r as remainingDaysUntil, t as computeUpgrade } from "./proration-C0ClBrLd.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { CalendarClock, Check, CheckCircle2, Crown, Loader2 } from "lucide-react";
//#region src/features/auth/services/accountApi.ts
var accountApi = { me: () => api("/api/account/me") };
//#endregion
//#region src/features/payment/components/PremiumUpgradePage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
var fmtDate = (d) => d ? new Date(d).toLocaleDateString("vi-VN") : "—";
var RANK = {
	FREE: 0,
	BASIC: 1,
	PRO: 2,
	PLUS: 2,
	PREMIUM: 3
};
function PremiumUpgradePage() {
	const plansQuery = usePlans();
	const [currentPlan, setCurrentPlan] = useState("FREE");
	const [expiresAt, setExpiresAt] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(null);
	const [days, setDays] = useState(30);
	const { user, reloadUser } = useAuth();
	const plans = useMemo(() => (plansQuery.data ?? []).filter((p) => p.isActive && p.name !== "Free" && p.name !== "Basic"), [plansQuery.data]);
	useEffect(() => {
		if (user?.plan) setCurrentPlan(String(user.plan).toUpperCase());
		if (user?.planExpiresAt) setExpiresAt(user.planExpiresAt);
	}, [user?.plan, user?.planExpiresAt]);
	const currentPlanObj = useMemo(() => plans.find((p) => p.name.toUpperCase() === currentPlan) ?? null, [plans, currentPlan]);
	const remainingDays = remainingDaysUntil(expiresAt);
	const isPaidActive = currentPlan !== "FREE" && remainingDays > 0;
	const isCurrent = (p) => p.name.toUpperCase() === currentPlan;
	const isUpgrade = (p) => (RANK[p.name.toUpperCase()] ?? 0) > (RANK[currentPlan] ?? 0);
	const isDowngrade = (p) => (RANK[p.name.toUpperCase()] ?? 0) < (RANK[currentPlan] ?? 0);
	const quote = useMemo(() => {
		if (!selected) return null;
		if (isPaidActive && isUpgrade(selected)) return computeUpgrade(currentPlanObj ? {
			name: currentPlanObj.name,
			price: currentPlanObj.price
		} : null, {
			name: selected.name,
			price: selected.price
		}, expiresAt);
		return {
			remainingDays: 0,
			remainingValue: 0,
			amountDue: priceForDays(selected.price, days),
			daysCovered: days
		};
	}, [
		selected,
		days,
		isPaidActive,
		currentPlanObj,
		expiresAt
	]);
	const openCheckout = (p) => {
		setSelected(p);
		setDays(30);
	};
	const handlePay = async () => {
		if (!selected || !quote) return;
		setLoading(true);
		try {
			const url = (isPaidActive && isUpgrade(selected) ? await paymentApi.createPaymentByDays(selected.id, quote.daysCovered) : await paymentApi.createPaymentByDays(selected.id, days)).checkoutUrl ?? "";
			if (url.includes("upgraded=1") || typeof window !== "undefined" && url.startsWith(window.location.origin) && url.includes("/premium")) {
				await reloadUser();
				const u = await accountApi.me();
				if (u?.plan) setCurrentPlan(String(u.plan).toUpperCase());
				setExpiresAt(u?.planExpiresAt ?? null);
				setSelected(null);
				toast.success(`Đã nâng cấp lên ${selected.name}!`);
			} else if (url) {
				window.location.href = url;
				return;
			}
		} catch (e) {
			toast.error("Lỗi tạo link thanh toán");
		} finally {
			setLoading(false);
		}
	};
	const refresh = async () => {
		try {
			const u = await accountApi.me();
			if (u?.plan) setCurrentPlan(String(u.plan).toUpperCase());
			setExpiresAt(u?.planExpiresAt ?? null);
			await plansQuery.refetch();
			toast.success("Đã cập nhật thông tin gói");
		} catch {
			toast.error("Không thể cập nhật thông tin");
		}
	};
	const upgrading = selected ? isPaidActive && isUpgrade(selected) : false;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold tracking-tight font-display",
					children: "Nâng cấp Premium"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-1 text-sm",
					children: "Chọn gói và số ngày sử dụng phù hợp với nhu cầu của bạn"
				})] }), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					size: "sm",
					onClick: refresh,
					children: "Làm mới"
				})]
			}),
			/* @__PURE__ */ jsx(Card, {
				className: "border-primary/30 bg-primary/5",
				children: /* @__PURE__ */ jsxs(CardContent, {
					className: "py-4 flex flex-wrap items-center gap-x-8 gap-y-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Crown, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground",
							children: "Gói hiện tại"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-semibold",
							children: currentPlan
						})] })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(CalendarClock, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground",
							children: "Hết hạn"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-semibold",
							children: isPaidActive ? /* @__PURE__ */ jsxs(Fragment, { children: [
								fmtDate(expiresAt),
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "text-muted-foreground font-normal",
									children: [
										"(còn ",
										remainingDays,
										" ngày)"
									]
								})
							] }) : "Không giới hạn (Free)"
						})] })]
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: plans.map((p) => {
					const current = isCurrent(p);
					const highlighted = p.name.toUpperCase() === "PREMIUM";
					const downgrade = isPaidActive && isDowngrade(p);
					return /* @__PURE__ */ jsxs(Card, {
						className: cn("relative", highlighted && "border-primary shadow-brand", current && "border-emerald-500 bg-emerald-50/50"),
						children: [
							highlighted && /* @__PURE__ */ jsx(Badge, {
								className: "absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent",
								children: "Phổ biến"
							}),
							current && /* @__PURE__ */ jsxs(Badge, {
								className: "absolute -top-2.5 right-5 bg-emerald-600 text-white border-transparent flex items-center gap-1",
								children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3 w-3" }), "Đang sử dụng"]
							}),
							/* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Crown, { className: cn("h-5 w-5", highlighted ? "text-primary" : current ? "text-emerald-600" : "text-muted-foreground") }), /* @__PURE__ */ jsx("h3", {
											className: "text-lg font-bold font-display",
											children: p.name
										})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground text-sm mt-1",
										children: p.description
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-4 flex items-baseline gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-3xl font-bold font-display",
											children: fmtVnd(p.price)
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-muted-foreground text-sm",
											children: [
												"/ ",
												30,
												" ngày"
											]
										})]
									}),
									/* @__PURE__ */ jsxs("ul", {
										className: "mt-4 space-y-2",
										children: [/* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2 text-sm",
											children: [
												/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
												" Lưu trữ",
												" ",
												formatStorage(p.storageGb)
											]
										}), /* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-2 text-sm",
											children: [
												/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
												" ",
												p.aiQuestions > 9999 ? "Không giới hạn câu hỏi AI" : `${p.aiQuestions} câu hỏi AI`
											]
										})]
									}),
									/* @__PURE__ */ jsx(Button, {
										className: cn("w-full mt-5", highlighted && !current ? "bg-gradient-brand shadow-brand hover:opacity-90" : "", current ? "bg-emerald-600 hover:bg-emerald-700" : ""),
										variant: current || highlighted ? "default" : "outline",
										disabled: loading || current || downgrade,
										onClick: () => openCheckout(p),
										title: downgrade ? "Không thể hạ gói khi đang còn hạn sử dụng" : void 0,
										children: current ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 mr-2" }), "Đang sử dụng"] }) : downgrade ? "Không thể hạ gói" : isPaidActive && isUpgrade(p) ? /* @__PURE__ */ jsxs(Fragment, { children: ["Nâng lên ", p.name] }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Chọn ", p.name] })
									})
								]
							})
						]
					}, p.id);
				})
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: !!selected,
				onOpenChange: (v) => !v && setSelected(null),
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: upgrading ? `Nâng lên ${selected?.name}` : `Mua gói ${selected?.name}` }), /* @__PURE__ */ jsx(DialogDescription, { children: upgrading ? "Nâng cấp cho phần ngày còn lại của gói hiện tại. Số tiền đã trừ giá trị chưa dùng." : "Chọn số ngày bạn muốn sử dụng." })] }),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [!upgrading && /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Số ngày sử dụng" }),
								/* @__PURE__ */ jsx(Input, {
									type: "number",
									min: 1,
									value: days,
									onChange: (e) => setDays(Math.max(1, Number(e.target.value)))
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex gap-2",
									children: [
										7,
										30,
										90,
										180,
										365
									].map((d) => /* @__PURE__ */ jsxs(Button, {
										type: "button",
										size: "sm",
										variant: days === d ? "default" : "outline",
										onClick: () => setDays(d),
										children: [d, "n"]
									}, d))
								})
							]
						}), quote && /* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border bg-muted/40 p-4 space-y-1.5 text-sm",
							children: [
								upgrading && /* @__PURE__ */ jsxs(Fragment, { children: [
									/* @__PURE__ */ jsx(Row, {
										label: "Gói hiện tại",
										value: currentPlan
									}),
									/* @__PURE__ */ jsx(Row, {
										label: "Ngày còn lại",
										value: `${quote.remainingDays} ngày`
									}),
									/* @__PURE__ */ jsx(Row, {
										label: "Giá trị chưa dùng (trừ đi)",
										value: `- ${fmtVnd(quote.remainingValue)}`
									}),
									/* @__PURE__ */ jsx(Row, {
										label: `Giá ${selected?.name} (30 ngày)`,
										value: fmtVnd(selected?.price ?? 0)
									}),
									/* @__PURE__ */ jsx("div", { className: "border-t my-1" })
								] }),
								!upgrading && /* @__PURE__ */ jsx(Row, {
									label: `Đơn giá / ngày`,
									value: fmtVnd(Math.round((selected?.price ?? 0) / 30))
								}),
								/* @__PURE__ */ jsx(Row, {
									label: "Số ngày áp dụng",
									value: `${quote.daysCovered} ngày`
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between pt-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold",
										children: "Thành tiền"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-lg font-bold text-primary",
										children: fmtVnd(quote.amountDue)
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => setSelected(null),
						children: "Huỷ"
					}), /* @__PURE__ */ jsx(Button, {
						onClick: handlePay,
						disabled: loading,
						children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), " Đang tạo link..."] }) : "Thanh toán"
					})] })
				] })
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
//#region src/routes/_authenticated/premium.tsx?tsr-split=component
var SplitComponent = PremiumUpgradePage;
//#endregion
export { SplitComponent as component };
