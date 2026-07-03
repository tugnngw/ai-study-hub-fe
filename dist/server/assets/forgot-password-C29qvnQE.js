import { n as useAuth } from "./auth-DOqqG6CJ.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import * as React$1 from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft, Minus } from "lucide-react";
import { OTPInput, OTPInputContext } from "input-otp";
//#region src/components/ui/input-otp.tsx
var InputOTP = React$1.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsx(OTPInput, {
	ref,
	containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
	className: cn("disabled:cursor-not-allowed", className),
	...props
}));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex items-center", className),
	...props
}));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = React$1.forwardRef(({ index, className, ...props }, ref) => {
	const { char, hasFakeCaret, isActive } = React$1.useContext(OTPInputContext).slots[index];
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", isActive && "z-10 ring-1 ring-ring", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ jsx("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" })
		})]
	});
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = React$1.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	role: "separator",
	...props,
	children: /* @__PURE__ */ jsx(Minus, {})
}));
InputOTPSeparator.displayName = "InputOTPSeparator";
//#endregion
//#region src/routes/auth/forgot-password.tsx?tsr-split=component
var emailSchema = z.string().email("Email không hợp lệ");
function ForgotPasswordPage() {
	const { requestPasswordReset, verifyResetOtp } = useAuth();
	const navigate = useNavigate();
	const [step, setStep] = useState("email");
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
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
	const onVerifyOtp = async (e) => {
		e.preventDefault();
		if (otp.length !== 6) {
			setError("Vui lòng nhập đủ 6 số");
			return;
		}
		setError("");
		setLoading(true);
		try {
			await verifyResetOtp(email, otp);
			navigate({
				to: "/auth/reset-password",
				search: { email }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Mã OTP không đúng");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl",
		children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
			className: "text-2xl font-display",
			children: "Quên mật khẩu"
		}), /* @__PURE__ */ jsx(CardDescription, { children: step === "email" ? "Nhập email để nhận mã xác nhận OTP" : `Nhập mã OTP đã gửi tới ${email}` })] }), /* @__PURE__ */ jsxs(CardContent, { children: [step === "email" ? /* @__PURE__ */ jsxs("form", {
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
						onChange: (e) => setEmail(e.target.value)
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
				children: loading ? "Đang gửi..." : "Gửi mã OTP"
			})]
		}) : /* @__PURE__ */ jsxs("form", {
			onSubmit: onVerifyOtp,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2 flex flex-col items-center",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "otp",
							className: "self-start",
							children: "Mã OTP"
						}),
						/* @__PURE__ */ jsx(InputOTP, {
							maxLength: 6,
							value: otp,
							onChange: setOtp,
							children: /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
								/* @__PURE__ */ jsx(InputOTPSlot, { index: 0 }),
								/* @__PURE__ */ jsx(InputOTPSlot, { index: 1 }),
								/* @__PURE__ */ jsx(InputOTPSlot, { index: 2 }),
								/* @__PURE__ */ jsx(InputOTPSlot, { index: 3 }),
								/* @__PURE__ */ jsx(InputOTPSlot, { index: 4 }),
								/* @__PURE__ */ jsx(InputOTPSlot, { index: 5 })
							] })
						}),
						error && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-destructive self-start",
							children: error
						})
					]
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "submit",
					className: "w-full bg-gradient-brand shadow-brand hover:opacity-90",
					disabled: loading,
					children: loading ? "Đang xác nhận..." : "Xác nhận"
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "ghost",
					className: "w-full",
					onClick: () => setStep("email"),
					children: "Đổi email khác"
				})
			]
		}), /* @__PURE__ */ jsxs(Link, {
			to: "/auth/login",
			className: "mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
			children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-3.5 w-3.5" }), "Quay lại đăng nhập"]
		})] })]
	});
}
//#endregion
export { ForgotPasswordPage as component };
