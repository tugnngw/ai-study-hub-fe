import { n as useAuth } from "./auth-DOqqG6CJ.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from "lucide-react";
//#region src/routes/_authenticated/payment.success.tsx?tsr-split=component
function PaymentSuccessPage() {
	const { refresh } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		refresh().catch(console.error);
		const timer = setTimeout(() => {
			navigate({ to: "/dashboard" });
		}, 5e3);
		return () => clearTimeout(timer);
	}, [refresh, navigate]);
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
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground max-w-md",
				children: "Cảm ơn bạn đã nâng cấp Premium. Tài khoản của bạn đã được cập nhật. Hệ thống sẽ tự động chuyển hướng về trang chủ sau vài giây."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex gap-4",
				children: /* @__PURE__ */ jsx(Button, {
					onClick: () => navigate({ to: "/dashboard" }),
					children: "Quay lại trang chủ"
				})
			})
		]
	});
}
//#endregion
export { PaymentSuccessPage as component };
