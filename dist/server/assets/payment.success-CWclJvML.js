import { t as Button } from "./button-OuFjfcpS.js";
import { t as accountApi } from "./accountApi-CQ81gS9F.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, Loader2 } from "lucide-react";
//#region src/routes/_authenticated/payment.success.tsx?tsr-split=component
function PaymentSuccessPage() {
	const navigate = useNavigate();
	const [reloading, setReloading] = useState(true);
	useEffect(() => {
		const reloadUserInfo = async () => {
			await new Promise((resolve) => setTimeout(resolve, 2e3));
			try {
				await accountApi.me();
				console.log("✅ User info reloaded after payment");
			} catch (err) {
				console.error("❌ Failed to reload user:", err);
			} finally {
				setReloading(false);
			}
		};
		reloadUserInfo();
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "bg-emerald-500/10 text-emerald-600 p-4 rounded-full",
				children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-16 w-16" })
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Thanh toán thành công!"
			}),
			reloading ? /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ jsx("p", { children: "Đang cập nhật thông tin tài khoản..." })]
			}) : /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground max-w-md",
				children: "Tài khoản của bạn đã được cập nhật thành công!"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ jsx(Button, {
					onClick: () => navigate({ to: "/premium" }),
					disabled: reloading,
					children: "Xem gói đã mua"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => navigate({ to: "/dashboard" }),
					disabled: reloading,
					children: "Về trang chủ"
				})]
			})
		]
	});
}
//#endregion
export { PaymentSuccessPage as component };
