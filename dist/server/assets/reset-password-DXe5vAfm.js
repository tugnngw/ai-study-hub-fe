import { n as useAuth } from "./auth-DMiM-CCq.js";
import { t as Route } from "./reset-password-BgZk4qKV.js";
import { t as Button } from "./button-BkEeRci-.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CtX3ithx.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
//#region src/routes/auth/reset-password.tsx?tsr-split=component
var schema = z.object({
	password: z.string().min(6, "Tối thiểu 6 ký tự"),
	confirmPassword: z.string().min(6, "Tối thiểu 6 ký tự")
}).refine((d) => d.password === d.confirmPassword, {
	path: ["confirmPassword"],
	message: "Mật khẩu xác nhận không khớp"
});
function ResetPasswordPage() {
	const { email } = Route.useSearch();
	const { resetPassword } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
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
		try {
			await resetPassword(email, form.password);
			toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
			navigate({ to: "/auth/login" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Đổi mật khẩu thất bại");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl",
		children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
			className: "text-2xl font-display",
			children: "Đặt lại mật khẩu"
		}), /* @__PURE__ */ jsx(CardDescription, { children: "Tạo mật khẩu mới cho tài khoản của bạn" })] }), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsxs("form", {
			onSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "password",
							children: "Mật khẩu mới"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "password",
							type: "password",
							autoComplete: "new-password",
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
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "confirmPassword",
							children: "Xác nhận mật khẩu mới"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "confirmPassword",
							type: "password",
							autoComplete: "new-password",
							value: form.confirmPassword,
							onChange: (e) => setForm({
								...form,
								confirmPassword: e.target.value
							})
						}),
						errors.confirmPassword && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-destructive",
							children: errors.confirmPassword
						})
					]
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "submit",
					className: "w-full bg-gradient-brand shadow-brand hover:opacity-90",
					disabled: loading,
					children: loading ? "Đang lưu..." : "Đổi mật khẩu"
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
export { ResetPasswordPage as component };
