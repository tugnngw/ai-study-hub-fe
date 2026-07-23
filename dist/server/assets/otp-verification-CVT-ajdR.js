import { t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Loader2, Minus, RefreshCw } from "lucide-react";
import { OTPInput, OTPInputContext } from "input-otp";
//#region src/components/ui/input-otp.tsx
var InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsx(OTPInput, {
	ref,
	containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
	className: cn("disabled:cursor-not-allowed", className),
	...props
}));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex items-center", className),
	...props
}));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
	const { char, hasFakeCaret, isActive } = React.useContext(OTPInputContext).slots[index];
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
var InputOTPSeparator = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	role: "separator",
	...props,
	children: /* @__PURE__ */ jsx(Minus, {})
}));
InputOTPSeparator.displayName = "InputOTPSeparator";
//#endregion
//#region src/components/ui/otp-verification.tsx
var COOLDOWN_SECONDS = 60;
function OtpVerification({ email, loading, onVerify, onResend, onChangeEmail, mode = "otp", verifyLabel = "Xác nhận", errorMessage }) {
	const [otp, setOtp] = useState("");
	const [localError, setLocalError] = useState("");
	const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
	const [resending, setResending] = useState(false);
	const intervalRef = useRef(null);
	const error = errorMessage ?? localError;
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCooldown((prev) => {
				if (prev <= 1) {
					if (intervalRef.current) clearInterval(intervalRef.current);
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (mode === "otp" && otp.length !== 6) {
			setLocalError("Vui lòng nhập đủ 6 số");
			return;
		}
		setLocalError("");
		await onVerify(mode === "otp" ? otp : void 0);
	};
	const handleResend = async () => {
		if (resending || cooldown > 0) return;
		setResending(true);
		try {
			await onResend();
			setOtp("");
			setLocalError("");
			setCooldown(COOLDOWN_SECONDS);
		} finally {
			setResending(false);
		}
	};
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit,
		className: "space-y-4",
		children: [
			mode === "otp" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2 flex flex-col items-center",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-muted-foreground text-center",
						children: [
							"Mã xác thực đã gửi tới",
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "font-medium text-foreground",
								children: email
							})
						]
					}),
					/* @__PURE__ */ jsx(InputOTP, {
						maxLength: 6,
						value: otp,
						onChange: (v) => {
							setOtp(v);
							setLocalError("");
						},
						autoComplete: "one-time-code",
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
						className: "text-xs text-destructive",
						children: error
					})
				]
			}),
			mode === "otp" && /* @__PURE__ */ jsx(Button, {
				type: "submit",
				className: "w-full bg-gradient-brand shadow-brand hover:opacity-90",
				disabled: loading || otp.length !== 6,
				children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }), "Đang xác nhận..."] }) : verifyLabel
			}),
			error && mode === "resend-only" && /* @__PURE__ */ jsx("p", {
				className: "text-xs text-destructive text-center",
				children: error
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-2 pt-1",
				children: [onChangeEmail && /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onChangeEmail,
					children: "Đổi email khác"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					disabled: cooldown > 0 || resending,
					onClick: handleResend,
					className: onChangeEmail ? "" : "ml-auto",
					children: resending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin mr-1" }), "Đang gửi..."] }) : cooldown > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1" }),
						"Gửi lại (",
						cooldown,
						"s)"
					] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1" }), "Gửi lại mã"] })
				})]
			})
		]
	});
}
//#endregion
export { OtpVerification as t };
