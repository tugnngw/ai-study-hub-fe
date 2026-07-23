import { n as useAuth } from "./auth-yPizCUlZ.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CzWHiRuJ.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import { t as OtpVerification } from "./otp-verification-CVT-ajdR.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
//#region src/routes/auth/forgot-password.tsx?tsr-split=component
var emailSchema = z.string().email("Email không hợp lệ");
function ForgotPasswordPage() {
	const { requestPasswordReset, verifyResetOtp } = useAuth();
	const navigate = useNavigate();
	const [step, setStep] = useState("email");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const onSendOtp = async (e) => {
		e.preventDefault();
		const parsed = emailSchema.safeParse(email);
		if (!parsed.success) {
			setError(parsed.error.issues[0].message);
			return;
		}
		setError("");
		setLoading(true);
		try {
			await requestPasswordReset(email);
			toast.success("Mã OTP đã được gửi tới email của bạn");
			setStep("otp");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Gửi mã OTP thất bại");
		} finally {
			setLoading(false);
		}
	};
	const onVerifyOtp = async (otp) => {
		try {
			await verifyResetOtp(email, otp);
			navigate({
				to: "/auth/reset-password",
				search: {
					email,
					otp
				}
			});
		} catch (err) {
			throw err;
		}
	};
	const onResendOtp = async () => {
		await requestPasswordReset(email);
		toast.success("Mã OTP đã được gửi lại");
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl",
		children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
			className: "text-2xl font-display",
			children: "Quên mật khẩu"
		}), /* @__PURE__ */ jsx(CardDescription, { children: step === "email" ? "Nhập email để nhận mã xác nhận OTP" : "Nhập mã OTP đã gửi tới email của bạn" })] }), /* @__PURE__ */ jsxs(CardContent, { children: [step === "email" ? /* @__PURE__ */ jsxs("form", {
			onSubmit: onSendOtp,
			className: "space-y-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "email",
						children: "Email"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "email",
						type: "email",
						autoComplete: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						disabled: loading
					}),
					error && /* @__PURE__ */ jsx("p", {
						className: "text-xs text-destructive",
						children: error
					})
				]
			}), /* @__PURE__ */ jsx(Button, {
				type: "submit",
				className: "w-full bg-gradient-brand shadow-brand hover:opacity-90",
				disabled: loading,
				children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }), "Đang gửi..."] }) : "Gửi mã OTP"
			})]
		}) : /* @__PURE__ */ jsx(OtpVerification, {
			email,
			loading,
			onVerify: onVerifyOtp,
			onResend: onResendOtp,
			onChangeEmail: () => setStep("email"),
			mode: "otp"
		}), /* @__PURE__ */ jsxs(Link, {
			to: "/auth/login",
			className: "mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
			children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-3.5 w-3.5" }), "Quay lại đăng nhập"]
		})] })]
	});
}
//#endregion
export { ForgotPasswordPage as component };
