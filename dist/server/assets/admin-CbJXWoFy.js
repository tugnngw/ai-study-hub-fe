import { n as useAuth } from "./auth-DMiM-CCq.js";
import { t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ChevronRight, KeyRound, Monitor, Pencil, Shield, Smartphone } from "lucide-react";
//#region src/routes/_authenticated/admin.tsx?tsr-split=component
var MOCK_SESSIONS = [
	{
		id: "1",
		device: "Chrome - Windows 11",
		location: "TP.HCM, Việt Nam",
		lastActive: "Hiện tại",
		current: true
	},
	{
		id: "2",
		device: "Safari - iPhone 15",
		location: "TP.HCM, Việt Nam",
		lastActive: "2 giờ trước",
		current: false
	},
	{
		id: "3",
		device: "Firefox - macOS",
		location: "Hà Nội, Việt Nam",
		lastActive: "1 ngày trước",
		current: false
	}
];
function initials(name) {
	if (!name) return "U";
	return name.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase();
}
function SettingsPage() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [twoFA, setTwoFA] = useState(false);
	const [twoFAOpen, setTwoFAOpen] = useState(false);
	const [pwdOpen, setPwdOpen] = useState(false);
	const [sessionsOpen, setSessionsOpen] = useState(false);
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
	const confirm2FA = () => {
		setTwoFA(true);
		setTwoFAOpen(false);
		toast.success("Đã bật xác thực 2 lớp");
	};
	const revokeSession = (id) => {
		setSessions((s) => s.filter((x) => x.id !== id));
		toast.success("Đã đăng xuất khỏi phiên");
	};
	const revokeAll = () => {
		setSessions((s) => s.filter((x) => x.current));
		toast.success("Đã đăng xuất tất cả thiết bị khác");
	};
	const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "—";
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 max-w-4xl",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Cài đặt"
			}),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-5",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-semibold mb-4",
					children: "Thông tin tài khoản"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4 min-w-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-14 w-14 rounded-full bg-gradient-brand text-white flex items-center justify-center text-lg font-semibold shrink-0",
							children: initials(user?.fullName)
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "font-semibold text-lg truncate",
									children: user?.fullName ?? "Người dùng"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground truncate",
									children: user?.email ?? ""
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: ["Thành viên từ ", memberSince]
								})
							]
						})]
					}), /* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						onClick: () => navigate({ to: "/profile" }),
						children: [/* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4 mr-2" }), " Chỉnh sửa thông tin"]
					})]
				})]
			}) }),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-5",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-semibold mb-1",
					children: "Bảo mật"
				}), /* @__PURE__ */ jsxs("div", {
					className: "divide-y divide-border",
					children: [
						/* @__PURE__ */ jsx(SettingRow, {
							icon: /* @__PURE__ */ jsx(KeyRound, { className: "h-4 w-4" }),
							title: "Đổi mật khẩu",
							desc: "Cập nhật mật khẩu để bảo vệ tài khoản bạn",
							onClick: () => setPwdOpen(true)
						}),
						/* @__PURE__ */ jsx(SettingRow, {
							icon: /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }),
							title: "Xác thực 2 lớp",
							desc: "Thêm vào lớp bảo mật để bảo vệ tài khoản của bạn",
							badge: twoFA ? "Đang bật" : "Đã tắt",
							badgeTone: twoFA ? "on" : "off",
							onClick: () => setTwoFAOpen(true)
						}),
						/* @__PURE__ */ jsx(SettingRow, {
							icon: /* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4" }),
							title: "Phiên đăng nhập",
							desc: "Quản lý các thiết bị đã đăng nhập vào tài khoản",
							onClick: () => setSessionsOpen(true)
						})
					]
				})]
			}) }),
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
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: twoFA ? "Tắt xác thực 2 lớp" : "Bật xác thực 2 lớp" }), /* @__PURE__ */ jsx(DialogDescription, { children: twoFA ? "Tài khoản sẽ không còn yêu cầu mã OTP khi đăng nhập." : "Quét mã QR bằng Google Authenticator hoặc Authy" })] }),
					!twoFA && /* @__PURE__ */ jsxs("div", {
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
					}), twoFA ? /* @__PURE__ */ jsx(Button, {
						variant: "destructive",
						onClick: () => {
							setTwoFA(false);
							setTwoFAOpen(false);
							toast.success("Đã tắt xác thực 2 lớp");
						},
						children: "Tắt"
					}) : /* @__PURE__ */ jsx(Button, {
						onClick: confirm2FA,
						children: "Xác nhận"
					})] })
				] })
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: sessionsOpen,
				onOpenChange: setSessionsOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [
					/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Monitor, { className: "h-5 w-5 text-primary" }), " Phiên đăng nhập"]
					}) }),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-2",
						children: sessions.map((s) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-3 p-3 rounded-lg border border-border",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0",
									children: s.device.includes("iPhone") ? /* @__PURE__ */ jsx(Smartphone, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-sm font-medium truncate",
										children: s.device
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											s.location,
											" • ",
											s.lastActive
										]
									})]
								})]
							}), s.current ? /* @__PURE__ */ jsx("span", {
								className: "text-[11px] bg-primary text-white px-2 py-1 rounded-full font-medium shrink-0",
								children: "Hiện tại"
							}) : /* @__PURE__ */ jsx(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive shrink-0",
								onClick: () => revokeSession(s.id),
								children: "Đăng xuất"
							})]
						}, s.id))
					}),
					/* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						className: "w-full text-destructive",
						onClick: revokeAll,
						children: "Đăng xuất tất cả thiết bị khác"
					}) })
				] })
			})
		]
	});
}
function SettingRow({ icon, title, desc, badge, badgeTone, onClick }) {
	return /* @__PURE__ */ jsxs("button", {
		onClick,
		className: "w-full flex items-center gap-3 py-4 text-left hover:bg-accent/40 transition-colors -mx-2 px-2 rounded-lg",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0",
				children: icon
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-sm font-medium flex items-center gap-2",
					children: [title, badge && /* @__PURE__ */ jsx("span", {
						className: "text-[10px] px-1.5 py-0.5 rounded font-medium " + (badgeTone === "on" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"),
						children: badge
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: desc
				})]
			}),
			/* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
		]
	});
}
//#endregion
export { SettingsPage as component };
