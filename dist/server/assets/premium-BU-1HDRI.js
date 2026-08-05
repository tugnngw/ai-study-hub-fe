import { t as accountApi } from "./realApi-x4p-l9IU.js";
import { n as useAuth } from "./auth-Dx937t2k.js";
import { t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-C3MnOk9C.js";
import { t as paymentApi } from "./paymentApi-DK9J0JWH.js";
import { S as usePlans, y as useMySubscription } from "./queries-BX2on_Xk.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { n as formatStorage } from "./config-Dso0kZ37.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarClock, Check, CheckCircle2, Clock, Crown, Loader2, QrCode } from "lucide-react";
import QRCode from "qrcode";
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
	const [remainingSeconds, setRemainingSeconds] = useState(0);
	const [qrDataUrl, setQrDataUrl] = useState(null);
	useEffect(() => {
		if (!qrCodeModal || !paymentInfo?.qrCode) {
			setQrDataUrl(null);
			return;
		}
		QRCode.toDataURL(paymentInfo.qrCode, {
			width: 300,
			margin: 2
		}).then((url) => setQrDataUrl(url)).catch(() => {});
	}, [qrCodeModal]);
	const plans = useMemo(() => (plansQuery.data ?? []).filter((p) => p.isActive && p.tier > 0), [plansQuery.data]);
	useEffect(() => {
		if (subQuery.data) {
			setCurrentPlan(subQuery.data.planName.toUpperCase());
			setExpiresAt(subQuery.data.endDate ?? null);
		} else if (user?.plan) {
			setCurrentPlan(String(user.plan || "FREE").toUpperCase());
			setExpiresAt(user.planExpiresAt ?? null);
		}
	}, [
		user?.plan,
		user?.planExpiresAt,
		subQuery.data
	]);
	const remainingDays = subQuery.data?.daysRemaining ?? 0;
	const isPaidActive = currentPlan !== "FREE" && remainingDays > 0;
	const currentPlanId = subQuery.data?.planId;
	const currentTier = subQuery.data?.tierGranted ?? 0;
	const isCurrent = (p) => currentPlanId ? p.id === currentPlanId : p.name.toUpperCase() === currentPlan;
	const isUpgrade = (p) => !isCurrent(p) && p.tier > currentTier;
	const isDowngrade = (p) => !isCurrent(p) && p.tier < currentTier;
	const { data: preview, isLoading: previewLoading } = useQuery({
		queryKey: ["upgradePreview", selected?.id],
		queryFn: () => paymentApi.previewUpgrade(selected.id),
		enabled: !!selected && isPaidActive && isUpgrade(selected),
		staleTime: 300 * 1e3,
		retry: 1
	});
	const quoteFromPreview = useMemo(() => {
		if (!selected) return null;
		const upgrading = isPaidActive && isUpgrade(selected);
		if (upgrading && preview) return {
			remainingDays: preview.remainingDays,
			remainingValue: preview.remainingCredit,
			amountDue: preview.amountToPay,
			daysCovered: selected.durationDays || 30
		};
		if (!upgrading) return {
			remainingDays: 0,
			remainingValue: 0,
			amountDue: selected.price,
			daysCovered: selected.durationDays || 30
		};
		return null;
	}, [
		selected,
		isPaidActive,
		preview
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
			if (url) {
				setPaymentInfo({
					checkoutUrl: url,
					orderCode: res.orderCode,
					amount: res.amount,
					expiredAt: res.expiredAt,
					qrCode: res.qrCode
				});
				setRemainingSeconds(Math.max(0, Math.floor((new Date(res.expiredAt).getTime() - Date.now()) / 1e3)));
				setQrCodeModal(true);
				setSelected(null);
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
	const checkPaymentStatus = (poller, ticker) => {
		if (!paymentInfo?.orderCode) return;
		paymentApi.getTransactionStatus(paymentInfo.orderCode).then((tx) => {
			if (tx?.paid) {
				if (poller) clearInterval(poller);
				if (ticker) clearInterval(ticker);
				setQrCodeModal(false);
				setPaymentInfo(null);
				reloadUser().then(() => {
					queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
					queryClient.invalidateQueries({ queryKey: ["quota"] });
					toast.success("Thanh toán thành công! Gói đã được cập nhật.");
					refresh();
				});
			} else if (tx?.failed) {
				if (poller) clearInterval(poller);
				if (ticker) clearInterval(ticker);
				setQrCodeModal(false);
				setPaymentInfo(null);
				toast.error("Giao dịch không thành công hoặc đã hết hạn.");
			}
		}).catch(() => {});
	};
	useEffect(() => {
		let ticker = null;
		let poller = null;
		if (qrCodeModal && paymentInfo) {
			ticker = setInterval(() => {
				setRemainingSeconds((prev) => {
					if (prev <= 1) {
						clearInterval(ticker);
						checkPaymentStatus(poller, ticker);
						return 0;
					}
					return prev - 1;
				});
			}, 1e3);
			poller = setInterval(() => checkPaymentStatus(poller, ticker), 3e3);
			const onVisibilityChange = () => {
				if (document.visibilityState === "visible") checkPaymentStatus(poller, ticker);
			};
			document.addEventListener("visibilitychange", onVisibilityChange);
			return () => {
				if (ticker) clearInterval(ticker);
				if (poller) clearInterval(poller);
				document.removeEventListener("visibilitychange", onVisibilityChange);
			};
		}
	}, [qrCodeModal, paymentInfo]);
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
													p.flashcardLimit === -1 ? "Không giới hạn tạo flashcard" : p.flashcardLimit === 0 ? "Không có flashcard" : `Tạo flashcard: ${p.flashcardLimit} lượt`
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
													" ",
													p.questionLimit === -1 ? "Không giới hạn tạo quiz" : p.questionLimit === 0 ? "Không có quiz" : `Tạo quiz: ${p.questionLimit} lượt`
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "flex items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
													" ",
													p.summaryLimit === -1 ? "Không giới hạn tóm tắt" : p.summaryLimit === 0 ? "Không có tóm tắt" : `Tóm tắt: ${p.summaryLimit} lượt`
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
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [previewLoading && upgrading && /* @__PURE__ */ jsx("div", {
							className: "flex justify-center py-4",
							children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" })
						}), quoteFromPreview && /* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border bg-muted/40 p-4 space-y-1.5 text-sm",
							children: [
								upgrading && /* @__PURE__ */ jsxs(Fragment, { children: [
									/* @__PURE__ */ jsx(Row, {
										label: "Gói hiện tại",
										value: currentPlan
									}),
									/* @__PURE__ */ jsx(Row, {
										label: "Ngày còn lại",
										value: `${quoteFromPreview.remainingDays} ngày`
									}),
									/* @__PURE__ */ jsx(Row, {
										label: "Giá trị chưa dùng (trừ đi)",
										value: `- ${fmtVnd(quoteFromPreview.remainingValue)}`
									}),
									/* @__PURE__ */ jsx(Row, {
										label: `Giá ${selected?.name} (${selected?.durationDays || 30} ngày)`,
										value: fmtVnd(selected?.price ?? 0)
									}),
									/* @__PURE__ */ jsx("div", { className: "border-t my-1" })
								] }),
								/* @__PURE__ */ jsx(Row, {
									label: "Số ngày áp dụng",
									value: `${quoteFromPreview.daysCovered} ngày`
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between pt-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold",
										children: "Thành tiền"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-lg font-bold text-primary",
										children: fmtVnd(quoteFromPreview.amountDue)
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
						disabled: loading || upgrading && previewLoading,
						children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), " Đang tạo link..."] }) : "Thanh toán"
					})] })
				] })
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: qrCodeModal,
				onOpenChange: (v) => !v && setQrCodeModal(false),
				children: /* @__PURE__ */ jsxs(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
						className: "flex items-center gap-2 text-primary",
						children: [/* @__PURE__ */ jsx(QrCode, { className: "h-5 w-5" }), " Thanh toán QR"]
					}), /* @__PURE__ */ jsx(DialogDescription, { children: "Quét mã QR bằng app ngân hàng hoặc bấm nút bên dưới để mở trang thanh toán. Sau khi thanh toán xong, quay lại tab này để tiếp tục." })] }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-4 py-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-4xl font-mono font-bold text-primary flex items-center justify-center gap-2",
									children: [
										/* @__PURE__ */ jsx(Clock, { className: "h-8 w-8" }),
										String(Math.floor(remainingSeconds / 60)).padStart(2, "0"),
										":",
										String(remainingSeconds % 60).padStart(2, "0")
									]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Tự động cập nhật trạng thái sau mỗi 3 giây"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "border p-2 rounded-lg bg-white",
								children: qrDataUrl ? /* @__PURE__ */ jsx("img", {
									src: qrDataUrl,
									className: "w-[300px] h-[300px]",
									alt: "QR thanh toán"
								}) : /* @__PURE__ */ jsx("img", {
									src: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentInfo?.checkoutUrl ?? "")}`,
									className: "w-[300px] h-[300px]",
									alt: "QR thanh toán"
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground text-center max-w-xs",
								children: "Sau khi thanh toán thành công, trang sẽ tự động cập nhật. Nếu không thấy, bấm nút \"Làm mới\" bên trên."
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
