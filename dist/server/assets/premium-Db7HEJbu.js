import { r as api } from "./api-716fJUbz.js";
import { n as useAuth } from "./auth-DMiM-CCq.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { t as paymentApi } from "./paymentApi-ctN60mkD.js";
import { b as usePlans, v as useMySubscription } from "./queries-BnM1O96_.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { n as formatStorage } from "./config-Dso0kZ37.js";
import { n as remainingDaysUntil, t as computeUpgrade } from "./proration-Ckm1ViPG.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarClock, Check, CheckCircle2, Clock, Crown, ExternalLink, Loader2, QrCode } from "lucide-react";
//#region src/features/auth/services/accountApi.ts
var accountApi = { me: () => api("/api/account/me") };
//#endregion
//#region src/features/payment/components/PremiumUpgradePage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
var fmtDate = (d) => d ? new Date(d).toLocaleDateString("vi-VN") : "—";
function PremiumUpgradePage() {
	const plansQuery = usePlans();
	const subQuery = useMySubscription();
	const queryClient = useQueryClient();
	const [currentPlan, setCurrentPlan] = useState("FREE");
	const [expiresAt, setExpiresAt] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(null);
	const { user, reloadUser } = useAuth();
	const [paymentInfo, setPaymentInfo] = useState(null);
	const [qrCodeModal, setQrCodeModal] = useState(false);
	const [countdown, setCountdown] = useState(180);
	const plans = useMemo(() => (plansQuery.data ?? []).filter((p) => p.isActive && p.tier > 0), [plansQuery.data]);
	useEffect(() => {
		if (subQuery.data) {
			setCurrentPlan(subQuery.data.planName.toUpperCase());
			setExpiresAt(subQuery.data.endDate);
		} else if (user?.plan) {
			setCurrentPlan(String(user.plan).toUpperCase());
			setExpiresAt(user.planExpiresAt);
		}
	}, [
		user?.plan,
		user?.planExpiresAt,
		subQuery.data
	]);
	const currentPlanObj = useMemo(() => plans.find((p) => p.name.toUpperCase() === currentPlan) ?? null, [plans, currentPlan]);
	const remainingDays = remainingDaysUntil(expiresAt);
	const isPaidActive = currentPlan !== "FREE" && remainingDays > 0;
	const currentTier = currentPlanObj?.tier ?? 0;
	const isCurrent = (p) => p.tier === currentTier;
	const isUpgrade = (p) => p.tier > currentTier;
	const isDowngrade = (p) => p.tier < currentTier;
	const quote = useMemo(() => {
		if (!selected) return null;
		const upgrading = isPaidActive && isUpgrade(selected);
		const planDuration = selected.durationDays || 30;
		if (upgrading) return computeUpgrade(currentPlanObj ? {
			name: currentPlanObj.name,
			price: currentPlanObj.price,
			durationDays: currentPlanObj.durationDays
		} : null, {
			name: selected.name,
			price: selected.price,
			durationDays: selected.durationDays
		}, expiresAt);
		return {
			remainingDays: 0,
			remainingValue: 0,
			amountDue: selected.price,
			daysCovered: planDuration
		};
	}, [
		selected,
		isPaidActive,
		currentPlanObj,
		expiresAt
	]);
	const openCheckout = (p) => {
		setSelected(p);
	};
	const handlePay = async () => {
		if (!selected) return;
		setLoading(true);
		try {
			const res = await paymentApi.createPayment(selected.id);
			const url = res.checkoutUrl ?? "";
			if (url.includes("upgraded=1") || typeof window !== "undefined" && url.startsWith(window.location.origin) && url.includes("/premium")) {
				await reloadUser();
				const u = await accountApi.me();
				if (u?.plan) setCurrentPlan(String(u.plan).toUpperCase());
				setExpiresAt(u?.planExpiresAt ?? null);
				queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
				queryClient.invalidateQueries({ queryKey: ["quota"] });
				setSelected(null);
				toast.success(`Đã nâng cấp lên ${selected.name}!`);
			} else if (url) {
				setPaymentInfo({
					checkoutUrl: url,
					orderCode: res.orderCode,
					amount: res.amount
				});
				setQrCodeModal(true);
				setCountdown(180);
				setSelected(null);
				window.open(url, "_blank", "noopener,noreferrer");
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
			queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
			queryClient.invalidateQueries({ queryKey: ["quota"] });
			toast.success("Đã cập nhật thông tin gói");
		} catch {
			toast.error("Không thể cập nhật thông tin");
		}
	};
	const upgrading = selected ? isPaidActive && isUpgrade(selected) : false;
	useRef(null);
	useEffect(() => {
		let timer;
		let poller;
		if (qrCodeModal && paymentInfo) {
			timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						clearInterval(poller);
						setQrCodeModal(false);
						setPaymentInfo(null);
						toast.error("Đã hết thời gian thanh toán");
						return 0;
					}
					return prev - 1;
				});
			}, 1e3);
			poller = setInterval(async () => {
				try {
					const u = await accountApi.me();
					if (u && u.plan && String(u.plan).toUpperCase() !== currentPlan) {
						clearInterval(timer);
						clearInterval(poller);
						setQrCodeModal(false);
						setPaymentInfo(null);
						await reloadUser();
						toast.success("Thanh toán thành công! Gói đã được cập nhật.");
						refresh();
					}
				} catch (e) {
					console.error("Error checking subscription status", e);
				}
			}, 3e4);
		}
		return () => {
			clearInterval(timer);
			clearInterval(poller);
		};
	}, [
		qrCodeModal,
		paymentInfo,
		currentPlan
	]);
	const formatCountdown = (seconds) => {
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
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
					children: "Chọn gói phù hợp với nhu cầu của bạn"
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
					const highlighted = false;
					const downgrade = isPaidActive && isDowngrade(p);
					const durationDays = p.durationDays || 30;
					return /* @__PURE__ */ jsxs(Card, {
						className: cn("relative", highlighted, current && "border-emerald-500 bg-emerald-50/50"),
						children: [
							highlighted,
							current && /* @__PURE__ */ jsxs(Badge, {
								className: "absolute -top-2.5 right-5 bg-emerald-600 text-white border-transparent flex items-center gap-1",
								children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3 w-3" }), "Đang sử dụng"]
							}),
							/* @__PURE__ */ jsxs(CardContent, {
								className: "pt-6",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Crown, { className: cn("h-5 w-5", current ? "text-emerald-600" : "text-muted-foreground") }), /* @__PURE__ */ jsx("h3", {
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
												durationDays,
												" ngày"
											]
										})]
									}),
									/* @__PURE__ */ jsxs("ul", {
										className: "mt-4 space-y-2",
										children: [
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
													" Lưu trữ",
													" ",
													formatStorage(p.storageGb)
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
													" ",
													p.chatLimit == null ? "—" : p.chatLimit === -1 ? "Không giới hạn chat AI" : p.chatLimit === 0 ? "Không có chat AI" : `Chat AI: ${p.chatLimit} lượt`
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
													" ",
													p.flashcardLimit === -1 ? "Không giới hạn flashcards" : p.flashcardLimit === 0 ? "Không có flashcards" : `${p.flashcardLimit} flashcards`
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
													" ",
													p.questionLimit === -1 ? "Không giới hạn câu hỏi quiz" : p.questionLimit === 0 ? "Không có quiz" : `${p.questionLimit} câu hỏi quiz`
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
													" ",
													p.summaryLimit === -1 ? "Không giới hạn tóm tắt" : p.summaryLimit === 0 ? "Không có tóm tắt" : `${p.summaryLimit} tóm tắt AI`
												]
											})
										]
									}),
									/* @__PURE__ */ jsx(Button, {
										className: cn("w-full mt-5", "", current ? "bg-emerald-600 hover:bg-emerald-700" : ""),
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
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: upgrading ? `Nâng lên ${selected?.name}` : `Mua gói ${selected?.name}` }), /* @__PURE__ */ jsx(DialogDescription, { children: upgrading ? "Nâng cấp gói. Giá trị số ngày chưa dùng của gói hiện tại sẽ được bù trừ." : `Gói ${selected?.name} - ${selected?.durationDays || 30} ngày sử dụng` })] }),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: quote && /* @__PURE__ */ jsxs("div", {
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
										label: `Giá ${selected?.name} (${selected?.durationDays || 30} ngày)`,
										value: fmtVnd(selected?.price ?? 0)
									}),
									/* @__PURE__ */ jsx("div", { className: "border-t my-1" })
								] }),
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
						})
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
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: qrCodeModal,
				onOpenChange: (v) => !v && setQrCodeModal(false),
				children: /* @__PURE__ */ jsxs(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, {
						className: "flex items-center gap-2 text-primary",
						children: [/* @__PURE__ */ jsx(QrCode, { className: "h-5 w-5" }), " Thanh toán QR"]
					}) }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-4 py-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-4xl font-mono font-bold text-primary flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ jsx(Clock, { className: "h-8 w-8" }), formatCountdown(countdown)]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground mt-2",
									children: "Quét mã QR bằng app ngân hàng hoặc mở link bên dưới"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "border p-2 rounded-lg bg-white",
								children: paymentInfo?.checkoutUrl && /* @__PURE__ */ jsx("img", {
									src: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentInfo.checkoutUrl)}`,
									className: "w-[300px] h-[300px]",
									alt: "QR thanh toán"
								})
							}),
							/* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								className: "w-full",
								onClick: () => window.open(paymentInfo?.checkoutUrl, "_blank"),
								children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-2" }), " Mở trang thanh toán"]
							})
						]
					})]
				})
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
