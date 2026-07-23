import { r as tokenStore } from "./api-DDxKl-Hx.js";
import { n as authApi } from "./realApi-C3h-htfj.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CzWHiRuJ.js";
import { t as OtpVerification } from "./otp-verification-CVT-ajdR.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
//#region src/routes/verify-email.tsx?tsr-split=component
function VerifyEmailPage() {
	const navigate = useNavigate();
	const [state, setState] = useState("idle");
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(false);
	const verifiedRef = useRef(false);
	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get("token");
		if (!token) return;
		if (verifiedRef.current) return;
		setState("verifying");
		const doVerify = async () => {
			try {
				await authApi.verifyEmail(token);
				verifiedRef.current = true;
				setState("success");
				toast.success("Xác thực email thành công!");
				setTimeout(() => {
					navigate({
						to: "/auth/login",
						replace: true
					});
				}, 3e3);
			} catch (err) {
				const msg = err instanceof Error ? err.message : "";
				setState("error");
				if (msg.includes("đã được sử dụng") || msg.includes("already been used")) setErrorMsg("Liên kết này đã được sử dụng. Vui lòng đăng nhập.");
				else if (msg.includes("hết hạn") || msg.includes("expired")) setErrorMsg("Liên kết đã hết hạn. Vui lòng yêu cầu gửi lại email xác thực.");
				else setErrorMsg(msg || "Liên kết không hợp lệ hoặc đã hết hạn.");
			}
		};
		doVerify();
	}, [navigate]);
	const handleResend = async () => {
		if (!tokenStore.get()) {
			const errText = "Vui lòng đăng nhập để gửi lại email xác thực.";
			toast.error(errText);
			setErrorMsg(errText);
			throw new Error(errText);
		}
		setLoading(true);
		setErrorMsg(null);
		try {
			await authApi.resendVerification();
			toast.success("Email xác thực đã được gửi lại!");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Không thể gửi lại email xác thực. Vui lòng thử lại sau.";
			toast.error(msg);
			setErrorMsg(msg);
			throw err;
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex items-center justify-center bg-background relative overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 -z-10 opacity-40",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" })]
		}), /* @__PURE__ */ jsx("div", {
			className: "w-full max-w-md p-4",
			children: /* @__PURE__ */ jsxs(Card, {
				className: "backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl",
				children: [/* @__PURE__ */ jsxs(CardHeader, {
					className: "text-center",
					children: [/* @__PURE__ */ jsx(CardTitle, {
						className: "text-2xl font-display",
						children: state === "idle" ? "Xác thực email" : state === "verifying" ? "Đang xác thực..." : state === "success" ? "Xác thực thành công!" : "Xác thực thất bại"
					}), /* @__PURE__ */ jsxs(CardDescription, { children: [
						state === "idle" && "Vui lòng kiểm tra hộp thư email của bạn",
						state === "verifying" && "Vui lòng đợi trong giây lát...",
						state === "success" && "Email của bạn đã được xác thực. Đang chuyển hướng...",
						state === "error" && errorMsg
					] })]
				}), /* @__PURE__ */ jsxs(CardContent, {
					className: "text-center space-y-6",
					children: [
						state === "idle" && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ jsx("div", {
									className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center",
									children: /* @__PURE__ */ jsx(Mail, { className: "h-8 w-8 text-primary" })
								})
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Chúng tôi đã gửi email xác thực đến địa chỉ email của bạn.",
									/* @__PURE__ */ jsx("br", {}),
									"Vui lòng kiểm tra hộp thư đến (và thư mục Spam) và nhấn vào liên kết xác thực."
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-600 dark:text-amber-400",
								children: [
									"Không thấy email? Kiểm tra thư mục Spam hoặc",
									" ",
									/* @__PURE__ */ jsx("button", {
										onClick: () => navigate({ to: "/auth/login" }),
										className: "underline hover:no-underline",
										children: "đăng nhập"
									}),
									" ",
									"để gửi lại."
								]
							}),
							/* @__PURE__ */ jsx(OtpVerification, {
								email: "",
								loading,
								onVerify: async () => {},
								onResend: handleResend,
								errorMessage: errorMsg,
								mode: "resend-only"
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "link",
								className: "w-full",
								onClick: () => navigate({ to: "/auth/login" }),
								children: "Đi đến đăng nhập"
							})
						] }),
						state === "verifying" && /* @__PURE__ */ jsx("div", {
							className: "flex justify-center py-8",
							children: /* @__PURE__ */ jsx(Loader2, { className: "h-12 w-12 animate-spin text-primary" })
						}),
						state === "success" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx("div", {
								className: "w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center",
								children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-8 w-8 text-emerald-500" })
							})
						}), /* @__PURE__ */ jsx(Button, {
							className: "w-full bg-gradient-brand shadow-brand hover:opacity-90",
							onClick: () => navigate({
								to: "/auth/login",
								replace: true
							}),
							children: "Đăng nhập ngay"
						})] }),
						state === "error" && /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ jsx("div", {
									className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center",
									children: /* @__PURE__ */ jsx(XCircle, { className: "h-8 w-8 text-destructive" })
								})
							}),
							/* @__PURE__ */ jsx(OtpVerification, {
								email: "",
								loading,
								onVerify: async () => {},
								onResend: handleResend,
								errorMessage: errorMsg,
								mode: "resend-only"
							}),
							/* @__PURE__ */ jsx(Button, {
								className: "w-full bg-gradient-brand shadow-brand hover:opacity-90",
								onClick: () => navigate({
									to: "/auth/login",
									replace: true
								}),
								children: "Đi đến đăng nhập"
							})
						] })
					]
				})]
			})
		})]
	});
}
//#endregion
export { VerifyEmailPage as component };
