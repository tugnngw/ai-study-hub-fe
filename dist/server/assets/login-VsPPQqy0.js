import { n as authApi } from "./realApi-C3h-htfj.js";
import { n as useAuth } from "./auth-yPizCUlZ.js";
import { t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CzWHiRuJ.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { z } from "zod";
import { AlertTriangle, Facebook, Mail, RefreshCw } from "lucide-react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
//#region src/components/ui/separator.tsx
var Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = SeparatorPrimitive.Root.displayName;
//#endregion
//#region src/routes/auth/login.tsx?tsr-split=component
var schema = z.object({
	username: z.string().trim().min(1, "Vui lòng nhập tên đăng nhập"),
	password: z.string().min(1, "Vui lòng nhập mật khẩu")
});
function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: "",
		password: ""
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [emailVerifyError, setEmailVerifyError] = useState(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			const errs = {};
			parsed.error.issues.forEach((i) => errs[String(i.path[0])] = i.message);
			setErrors(errs);
			return;
		}
		setErrors({});
		setLoading(true);
		setEmailVerifyError(false);
		try {
			await login(form.username, form.password);
			toast.success("Chào mừng trở lại!");
			await navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (err) {
			console.error("❌ Login error:", err);
			const msg = err instanceof Error ? err.message : "Đăng nhập thất bại";
			if (msg.includes("xác thực") || msg.includes("verify") || msg.includes("Email chưa")) setEmailVerifyError(true);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};
	const resendVerification = async () => {
		try {
			await authApi.resendVerificationByUsername(form.username);
			toast.success("Email xác thực đã được gửi lại! Nếu tài khoản hợp lệ, bạn sẽ nhận được email.");
		} catch {
			toast.error("Không thể gửi lại email xác thực. Vui lòng thử lại sau.");
		}
	};
	const onSocialLogin = (provider) => {
		window.location.href = `http://localhost:4040/oauth2/authorization/google`;
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl",
		children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
			className: "text-2xl font-display",
			children: "Chào mừng trở lại"
		}), /* @__PURE__ */ jsx(CardDescription, { children: "Đăng nhập vào không gian làm việc AI Study Hub" })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
			onSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "username",
							children: "Tên đăng nhập"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "username",
							autoComplete: "username",
							value: form.username,
							onChange: (e) => setForm({
								...form,
								username: e.target.value
							})
						}),
						errors.username && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-destructive",
							children: errors.username
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "password",
								children: "Mật khẩu"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/auth/forgot-password",
								className: "text-xs text-primary hover:underline",
								children: "Quên mật khẩu?"
							})]
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "password",
							type: "password",
							autoComplete: "current-password",
							value: form.password,
							onChange: (e) => setForm({
								...form,
								password: e.target.value
							})
						}),
						errors.password && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-destructive",
							children: errors.password
						})
					]
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "submit",
					className: "w-full bg-gradient-brand shadow-brand hover:opacity-90",
					disabled: loading,
					children: loading ? "Đang đăng nhập..." : "Đăng nhập"
				}),
				emailVerifyError && /* @__PURE__ */ jsx("div", {
					className: "rounded-lg border border-amber-500/20 bg-amber-500/10 p-3",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4 mt-0.5 text-amber-500 shrink-0" }), /* @__PURE__ */ jsxs("div", {
							className: "text-xs text-amber-600 dark:text-amber-400",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "font-medium mb-1",
									children: "Email chưa được xác thực"
								}),
								/* @__PURE__ */ jsx("p", { children: "Vui lòng kiểm tra hộp thư và nhấn vào liên kết xác thực." }),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: resendVerification,
									className: "inline-flex items-center gap-1 mt-2 text-primary hover:underline",
									children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-3 w-3" }), "Gửi lại email xác thực"]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative py-1",
					children: [/* @__PURE__ */ jsx(Separator, {}), /* @__PURE__ */ jsx("span", {
						className: "absolute inset-0 -top-2.5 flex items-center justify-center",
						children: /* @__PURE__ */ jsx("span", {
							className: "bg-card px-2 text-xs text-muted-foreground",
							children: "hoặc"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						className: "w-full",
						onClick: () => onSocialLogin("Google"),
						children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }), "Google"]
					}), /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						className: "w-full",
						onClick: () => onSocialLogin("Facebook"),
						children: [/* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" }), "Facebook"]
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-muted-foreground text-center",
					children: [
						"Chưa có tài khoản?",
						" ",
						/* @__PURE__ */ jsx(Link, {
							to: "/auth/register",
							className: "text-primary hover:underline",
							children: "Đăng ký ngay"
						})
					]
				})
			]
		}) })]
	});
}
//#endregion
export { LoginPage as component };
