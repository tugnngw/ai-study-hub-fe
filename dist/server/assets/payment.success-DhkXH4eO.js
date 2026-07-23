import { n as useAuth } from "./auth-yPizCUlZ.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { t as paymentApi } from "./paymentApi-vb5qpUKI.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
//#region src/routes/_authenticated/payment.success.tsx?tsr-split=component
function PaymentSuccessPage() {
	const navigate = useNavigate();
	const { reloadUser } = useAuth();
	const queryClient = useQueryClient();
	const search = useSearch({ from: "/_authenticated/payment/success" });
	const [status, setStatus] = useState("verifying");
	const [message, setMessage] = useState("Đang xác nhận giao dịch...");
	const pollRef = useRef(null);
	const attemptRef = useRef(0);
	const orderCode = search.orderCode;
	useEffect(() => {
		if (!orderCode) {
			setStatus("failed");
			setMessage("Không tìm thấy mã giao dịch. Vui lòng kiểm tra lại.");
			return;
		}
		const pollStatus = async () => {
			attemptRef.current++;
			try {
				const tx = await paymentApi.getTransactionStatus(Number(orderCode));
				if (tx?.status === "PAID") {
					if (pollRef.current) clearInterval(pollRef.current);
					await reloadUser();
					queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
					queryClient.invalidateQueries({ queryKey: ["quota"] });
					queryClient.invalidateQueries({ queryKey: ["account", "me"] });
					setStatus("success");
					setMessage("Tài khoản của bạn đã được cập nhật thành công!");
				} else if (tx?.status === "FAILED" || tx?.status === "CANCELLED" || tx?.status === "EXPIRED") {
					if (pollRef.current) clearInterval(pollRef.current);
					setStatus("failed");
					setMessage(`Giao dịch không thành công (${tx.status}). Vui lòng thử lại.`);
				} else setMessage(`Đang chờ xác nhận giao dịch... (${attemptRef.current}s)`);
			} catch {
				setMessage(`Đang chờ xác nhận giao dịch... (${attemptRef.current}s)`);
			}
		};
		pollRef.current = setInterval(pollStatus, 3e3);
		pollStatus();
		return () => {
			if (pollRef.current) clearInterval(pollRef.current);
		};
	}, [
		orderCode,
		reloadUser,
		queryClient
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6",
		children: [
			status === "verifying" && /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("div", {
					className: "bg-amber-500/10 text-amber-600 p-4 rounded-full",
					children: /* @__PURE__ */ jsx(Loader2, { className: "h-16 w-16 animate-spin" })
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Đang xác nhận thanh toán"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground max-w-md",
					children: message
				}),
				/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => navigate({ to: "/premium" }),
					children: "Quay lại"
				})
			] }),
			status === "success" && /* @__PURE__ */ jsxs(Fragment, { children: [
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
					children: message
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ jsx(Button, {
						onClick: () => navigate({ to: "/premium" }),
						children: "Xem gói đã mua"
					}), /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => navigate({ to: "/dashboard" }),
						children: "Về trang chủ"
					})]
				})
			] }),
			status === "failed" && /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("div", {
					className: "bg-destructive/10 text-destructive p-4 rounded-full",
					children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-16 w-16" })
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Giao dịch thất bại"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground max-w-md",
					children: message
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => navigate({ to: "/premium" }),
						children: "Thử lại"
					}), /* @__PURE__ */ jsx(Button, {
						onClick: () => navigate({ to: "/dashboard" }),
						children: "Về trang chủ"
					})]
				})
			] })
		]
	});
}
//#endregion
export { PaymentSuccessPage as component };
