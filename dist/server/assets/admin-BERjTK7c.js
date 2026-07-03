import { n as useAuth } from "./auth-DOqqG6CJ.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B5SRUUUO.js";
import * as React$1 from "react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { KeyRound, LogOut, Monitor, Shield, Smartphone } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
//#region src/components/ui/switch.tsx
var Switch = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/routes/_authenticated/admin.tsx?tsr-split=component
var MOCK_SESSIONS = [
	{
		id: "1",
		device: "Chrome trên Windows",
		location: "Hà Nội, Việt Nam",
		lastActive: "Đang hoạt động",
		current: true
	},
	{
		id: "2",
		device: "Safari trên iPhone",
		location: "Hà Nội, Việt Nam",
		lastActive: "2 giờ trước",
		current: false
	},
	{
		id: "3",
		device: "Chrome trên macOS",
		location: "TP.HCM, Việt Nam",
		lastActive: "3 ngày trước",
		current: false
	}
];
function SettingsPage() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [twoFA, setTwoFA] = useState(false);
	const [twoFAOpen, setTwoFAOpen] = useState(false);
	const [pwdOpen, setPwdOpen] = useState(false);
	const [sessions, setSessions] = useState(MOCK_SESSIONS);
	const [pwd, setPwd] = useState({
		current: "",
		next: "",
		confirm: ""
	});
	const submitPwd = (e) => {
		e.preventDefault();
		if (!pwd.current || !pwd.next) return toast.error("Vui lòng nhập đầy đủ");
		if (pwd.next.length < 6) return toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
		if (pwd.next !== pwd.confirm) return toast.error("Mật khẩu xác nhận không khớp");
		toast.success("Đã đổi mật khẩu");
		setPwd({
			current: "",
			next: "",
			confirm: ""
		});
		setPwdOpen(false);
	};
	const toggle2FA = (v) => {
		if (v) setTwoFAOpen(true);
		else {
			setTwoFA(false);
			toast.success("Đã tắt xác thực 2 lớp");
		}
	};
	const confirm2FA = () => {
		setTwoFA(true);
		setTwoFAOpen(false);
		toast.success("Đã bật xác thực 2 lớp");
	};
	const revokeSession = (id) => {
		setSessions((s) => s.filter((x) => x.id !== id));
		toast.success("Đã đăng xuất khỏi phiên");
	};
	const handleLogout = async () => {
		await logout();
		navigate({ to: "/auth/login" });
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 max-w-3xl",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Cài đặt & Quyền riêng tư"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "Bảo vệ tài khoản và quản lý các phiên đăng nhập"
			})] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
				className: "text-base flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(KeyRound, { className: "h-4 w-4" }), " Mật khẩu"]
			}) }), /* @__PURE__ */ jsxs(CardContent, {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-sm text-muted-foreground",
					children: "Cập nhật mật khẩu thường xuyên để giữ an toàn cho tài khoản"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => setPwdOpen(true),
					children: "Đổi mật khẩu"
				})]
			})] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
				className: "text-base flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }), " Xác thực 2 lớp"]
			}) }), /* @__PURE__ */ jsxs(CardContent, {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-sm",
						children: [twoFA ? "Đang bật" : "Đang tắt", " — bảo vệ tài khoản bằng mã OTP"]
					}), /* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: "Yêu cầu mã từ ứng dụng xác thực mỗi khi đăng nhập"
					})]
				}), /* @__PURE__ */ jsx(Switch, {
					checked: twoFA,
					onCheckedChange: toggle2FA
				})]
			})] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
				className: "text-base flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4" }), " Phiên đăng nhập"]
			}) }), /* @__PURE__ */ jsx(CardContent, {
				className: "space-y-2",
				children: sessions.map((s) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between p-3 rounded-md border border-border",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-md bg-muted flex items-center justify-center",
							children: s.device.includes("iPhone") ? /* @__PURE__ */ jsx(Smartphone, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "text-sm font-medium flex items-center gap-2",
							children: [s.device, s.current && /* @__PURE__ */ jsx("span", {
								className: "text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium",
								children: "Hiện tại"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "text-xs text-muted-foreground",
							children: [
								s.location,
								" • ",
								s.lastActive
							]
						})] })]
					}), !s.current && /* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: "ghost",
						className: "text-destructive",
						onClick: () => revokeSession(s.id),
						children: "Đăng xuất"
					})]
				}, s.id))
			})] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
				className: "text-base",
				children: "Đăng xuất tài khoản"
			}) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Button, {
				variant: "destructive",
				onClick: handleLogout,
				children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-2" }), " Đăng xuất"]
			}) })] }),
			/* @__PURE__ */ jsx(Dialog, {
				open: pwdOpen,
				onOpenChange: setPwdOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Đổi mật khẩu" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Nhập mật khẩu hiện tại và mật khẩu mới" })] }), /* @__PURE__ */ jsxs("form", {
					onSubmit: submitPwd,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Mật khẩu hiện tại" }), /* @__PURE__ */ jsx(Input, {
								type: "password",
								value: pwd.current,
								onChange: (e) => setPwd((p) => ({
									...p,
									current: e.target.value
								}))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Mật khẩu mới" }), /* @__PURE__ */ jsx(Input, {
								type: "password",
								value: pwd.next,
								onChange: (e) => setPwd((p) => ({
									...p,
									next: e.target.value
								}))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Xác nhận mật khẩu" }), /* @__PURE__ */ jsx(Input, {
								type: "password",
								value: pwd.confirm,
								onChange: (e) => setPwd((p) => ({
									...p,
									confirm: e.target.value
								}))
							})]
						}),
						/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setPwdOpen(false),
							children: "Huỷ"
						}), /* @__PURE__ */ jsx(Button, {
							type: "submit",
							children: "Cập nhật"
						})] })
					]
				})] })
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: twoFAOpen,
				onOpenChange: setTwoFAOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Bật xác thực 2 lớp" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Quét mã QR bằng Google Authenticator hoặc Authy" })] }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-4 py-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-44 w-44 bg-gradient-to-br from-muted to-muted/60 border rounded-md flex items-center justify-center text-xs text-muted-foreground",
							children: "QR Code (mock)"
						}), /* @__PURE__ */ jsxs("div", {
							className: "w-full space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Mã xác thực 6 chữ số" }), /* @__PURE__ */ jsx(Input, {
								placeholder: "123456",
								maxLength: 6
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => setTwoFAOpen(false),
						children: "Huỷ"
					}), /* @__PURE__ */ jsx(Button, {
						onClick: confirm2FA,
						children: "Xác nhận"
					})] })
				] })
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
