import { n as useAuth } from "./auth-yPizCUlZ.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CzWHiRuJ.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { z } from "zod";
//#region src/routes/auth/register.tsx?tsr-split=component
var schema = z.object({
	username: z.string().trim().min(3, "Tối thiểu 3 ký tự").max(10, "Tối đa 10 ký tự").regex(/^[a-zA-Z0-9_]+$/, "Chỉ gồm chữ, số và dấu gạch dưới"),
	fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên").max(30, "Tối đa 30 ký tự"),
	password: z.string().min(6, "Tối thiểu 6 ký tự"),
	confirmPassword: z.string().min(6, "Tối thiểu 6 ký tự"),
	email: z.string().trim().max(100, "Tối đa 100 ký tự").email("Email không hợp lệ").optional().or(z.literal(""))
}).refine((d) => d.password === d.confirmPassword, {
	path: ["confirmPassword"],
	message: "Mật khẩu xác nhận không khớp"
});
function RegisterPage() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: "",
		fullName: "",
		password: "",
		confirmPassword: "",
		email: ""
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const update = (field) => (e) => setForm((f) => ({
		...f,
		[field]: e.target.value
	}));
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
			const payload = {
				username: form.username,
				fullName: form.fullName,
				password: form.password
			};
			if (form.email.trim()) payload.email = form.email.trim();
			await register(payload);
			if (form.email.trim()) {
				toast.success("Tạo tài khoản thành công! Vui lòng kiểm tra email để xác thực.");
				navigate({ to: "/verify-email" });
			} else {
				toast.success("Tạo tài khoản thành công! Chào mừng bạn.");
				navigate({
					to: "/dashboard",
					replace: true
				});
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Đăng ký thất bại");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl",
		children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
			className: "text-2xl font-display",
			children: "Tạo tài khoản"
		}), /* @__PURE__ */ jsx(CardDescription, { children: "Bắt đầu tổ chức tài liệu học tập với AI" })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
			onSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "username",
							children: "Tên đăng nhập (tối đa 10 ký tự)"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "username",
							autoComplete: "username",
							value: form.username,
							onChange: update("username")
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
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "fullName",
							children: "Họ và tên (tối đa 30 ký tự)"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "fullName",
							value: form.fullName,
							onChange: update("fullName")
						}),
						errors.fullName && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-destructive",
							children: errors.fullName
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "email",
							children: "Email (không bắt buộc)"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "email",
							type: "email",
							autoComplete: "email",
							placeholder: "email@example.com",
							value: form.email,
							onChange: update("email")
						}),
						errors.email && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-destructive",
							children: errors.email
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "password",
							children: "Mật khẩu (tối thiểu 6 ký tự)"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "password",
							type: "password",
							autoComplete: "new-password",
							value: form.password,
							onChange: update("password")
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
							children: "Xác nhận mật khẩu"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "confirmPassword",
							type: "password",
							autoComplete: "new-password",
							value: form.confirmPassword,
							onChange: update("confirmPassword")
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
					children: loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-sm text-muted-foreground text-center",
					children: [
						"Đã có tài khoản?",
						" ",
						/* @__PURE__ */ jsx(Link, {
							to: "/auth/login",
							className: "text-primary hover:underline",
							children: "Đăng nhập"
						})
					]
				})
			]
		}) })]
	});
}
//#endregion
export { RegisterPage as component };
