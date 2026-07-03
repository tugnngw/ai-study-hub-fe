import { n as api } from "./api-WaaweWSf.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { t as paymentApi } from "./paymentApi-CVXfEfA8.js";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Check, CheckCircle2, Crown, Loader2 } from "lucide-react";
//#region src/features/auth/services/accountApi.ts
var accountApi = { me: () => api("/api/account/me") };
//#endregion
//#region src/features/payment/components/PremiumUpgradePage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
var planNameToEnum = {
	"Pro": "PRO",
	"Premium": "PREMIUM"
};
function PremiumUpgradePage() {
	const [plans, setPlans] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPlan, setCurrentPlan] = useState("FREE");
	useEffect(() => {
		Promise.all([paymentApi.getPlanOptions(), accountApi.me().catch(() => null)]).then(([plansData, userData]) => {
			setPlans(plansData);
			if (userData?.plan) setCurrentPlan(userData.plan.toUpperCase());
		});
	}, []);
	const handlePayment = async (selectedPlan) => {
		setLoading(true);
		try {
			const response = await paymentApi.createPayment(selectedPlan.id);
			if (response.checkoutUrl) window.location.href = response.checkoutUrl;
		} catch (error) {
			toast.error("Lỗi tạo link thanh toán");
			setLoading(false);
		}
	};
	const isPlanPurchased = (planName) => {
		return currentPlan === planNameToEnum[planName];
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight font-display",
			children: "Nâng cấp Premium"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1 text-sm",
			children: "Chọn gói phù hợp với nhu cầu của bạn"
		})] }), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl",
			children: plans.map((p) => {
				const purchased = isPlanPurchased(p.name);
				return /* @__PURE__ */ jsxs(Card, {
					className: cn("relative", p.highlighted && "border-primary shadow-brand", purchased && "border-emerald-500 bg-emerald-50/50"),
					children: [
						p.highlighted && /* @__PURE__ */ jsx(Badge, {
							className: "absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent",
							children: "Phổ biến"
						}),
						purchased && /* @__PURE__ */ jsxs(Badge, {
							className: "absolute -top-2.5 right-5 bg-emerald-600 text-white border-transparent flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-3 w-3" }), "Đang sử dụng"]
						}),
						/* @__PURE__ */ jsxs(CardContent, {
							className: "pt-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Crown, { className: cn("h-5 w-5", p.highlighted ? "text-primary" : purchased ? "text-emerald-600" : "text-muted-foreground") }), /* @__PURE__ */ jsx("h3", {
										className: "text-lg font-bold font-display",
										children: p.name
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-muted-foreground text-sm mt-1",
									children: p.tagline
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 flex items-baseline gap-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-3xl font-bold font-display",
										children: fmtVnd(p.price)
									}), /* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground text-sm",
										children: "/ tháng"
									})]
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "mt-4 space-y-2",
									children: p.features.map((f) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2 text-sm",
										children: [
											/* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600 shrink-0" }),
											" ",
											f
										]
									}, f))
								}),
								/* @__PURE__ */ jsx(Button, {
									className: cn("w-full mt-5", p.highlighted && !purchased ? "bg-gradient-brand shadow-brand hover:opacity-90" : "", purchased ? "bg-emerald-600 hover:bg-emerald-700" : ""),
									variant: purchased ? "default" : p.highlighted ? "default" : "outline",
									disabled: loading || purchased,
									onClick: () => handlePayment(p),
									children: purchased ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 mr-2" }), "Đang sử dụng"] }) : loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Đang tạo link..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Chọn ", p.name] })
								})
							]
						})
					]
				}, p.id);
			})
		})]
	});
}
//#endregion
//#region src/routes/_authenticated/premium.tsx?tsr-split=component
var SplitComponent = PremiumUpgradePage;
//#endregion
export { SplitComponent as component };
