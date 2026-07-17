import { t as Button } from "./button-pc6NSNyO.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { XCircle } from "lucide-react";
//#region src/routes/_authenticated/payment.cancel.tsx?tsr-split=component
function PaymentCancelPage() {
	const navigate = useNavigate();
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "bg-destructive/10 text-destructive p-4 rounded-full",
				children: /* @__PURE__ */ jsx(XCircle, { className: "h-16 w-16" })
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Giao dịch đã bị hủy"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground max-w-md",
				children: "Bạn đã hủy giao dịch thanh toán hoặc phiên thanh toán đã hết hạn. Bạn có thể thử lại bất cứ lúc nào."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => navigate({ to: "/premium" }),
					children: "Thử lại"
				}), /* @__PURE__ */ jsx(Button, {
					onClick: () => navigate({ to: "/dashboard" }),
					children: "Quay lại trang chủ"
				})]
			})
		]
	});
}
//#endregion
export { PaymentCancelPage as component };
