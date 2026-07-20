import { n as authApi } from "./realApi-3S4ICjaY.js";
import { n as useAuth } from "./auth-D2WdPR2y.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import { M as useSharedDocuments, p as useFolders, s as useDocuments } from "./queries-BaPhj2xN.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { n as remainingDaysUntil } from "./proration-Ckm1ViPG.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { BadgeCheck, Crown, FileText, FolderKanban, Pencil, Save, Send, Share2, X } from "lucide-react";
//#region src/routes/_authenticated/profile.tsx?tsr-split=component
function ProfilePage() {
	const { user, updateProfile, reloadUser } = useAuth();
	const docs = useDocuments();
	const folders = useFolders();
	const sharedDocs = useSharedDocuments();
	const [editing, setEditing] = useState(false);
	const [saving, setSaving] = useState(false);
	const initialForm = useMemo(() => ({
		fullName: user?.fullName ?? "",
		username: user?.username ?? "",
		email: user?.email ?? ""
	}), [user]);
	const [form, setForm] = useState(initialForm);
	const update = (k, v) => setForm((p) => ({
		...p,
		[k]: v
	}));
	const planRemainingDays = remainingDaysUntil(user?.planExpiresAt);
	const save = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			const payload = {};
			if (form.fullName !== user?.fullName) payload.fullName = form.fullName;
			if (form.email !== (user?.email ?? "")) {
				if (form.email.trim() && !/^[^\s@]+@[^\s@]+$/.test(form.email.trim())) {
					toast.error("Email không hợp lệ");
					setSaving(false);
					return;
				}
				payload.email = form.email.trim() || void 0;
			}
			if (Object.keys(payload).length > 0) await updateProfile(payload);
			toast.success("Đã cập nhật hồ sơ");
			setEditing(false);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Cập nhật thất bại");
		} finally {
			setSaving(false);
		}
	};
	const cancel = () => {
		setForm(initialForm);
		setEditing(false);
	};
	const resendVerification = async () => {
		if (!user?.email) return;
		try {
			await authApi.sendVerification(user.email);
			toast.success("Email xác thực đã được gửi");
		} catch {
			toast.error("Gửi thất bại");
		}
	};
	const stats = [
		{
			label: "Tài liệu",
			value: docs.data?.length ?? 0,
			icon: FileText,
			cls: "text-blue-600 bg-blue-50"
		},
		{
			label: "Thư mục",
			value: folders.data?.length ?? 0,
			icon: FolderKanban,
			cls: "text-violet-600 bg-violet-50"
		},
		{
			label: "Chia sẻ",
			value: sharedDocs.data?.length ?? 0,
			icon: Share2,
			cls: "text-emerald-600 bg-emerald-50"
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 max-w-5xl",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Hồ sơ"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-1",
					children: "Thông tin tài khoản và thống kê hoạt động"
				})] }), !editing ? /* @__PURE__ */ jsxs(Button, {
					onClick: () => setEditing(true),
					variant: "outline",
					children: [/* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4 mr-2" }), " Chỉnh sửa"]
				}) : null]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: stats.map((s) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
					className: "flex items-center gap-3 p-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: `h-10 w-10 rounded-lg flex items-center justify-center ${s.cls}`,
						children: /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-2xl font-semibold leading-none",
						children: s.value
					}), /* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground mt-1",
						children: s.label
					})] })]
				}) }, s.label))
			}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
				className: "text-base flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(Crown, { className: "h-4 w-4 text-primary" }), " Gói dịch vụ"]
			}) }), /* @__PURE__ */ jsxs(CardContent, {
				className: "flex flex-wrap items-center gap-x-10 gap-y-3",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: "Gói hiện tại"
					}), /* @__PURE__ */ jsx("div", {
						className: "font-semibold text-lg",
						children: String(user?.plan ?? "FREE").toUpperCase()
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: "Ngày hết hạn"
					}), /* @__PURE__ */ jsx("div", {
						className: "font-semibold",
						children: planRemainingDays > 0 ? new Date(user?.planExpiresAt).toLocaleDateString("vi-VN") : "Không giới hạn (Free)"
					})] }),
					planRemainingDays > 0 && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: "Còn lại"
					}), /* @__PURE__ */ jsxs("div", {
						className: "font-semibold text-primary",
						children: [planRemainingDays, " ngày"]
					})] }),
					/* @__PURE__ */ jsx("div", {
						className: "ml-auto",
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/premium",
								children: "Quản lý gói"
							})
						})
					})
				]
			})] }),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: save,
				children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
					className: "text-base",
					children: "Thông tin tài khoản"
				}) }), /* @__PURE__ */ jsxs(CardContent, {
					className: "space-y-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4 pb-4 border-b border-border",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-16 w-16 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xl font-semibold",
							children: form.fullName?.[0]?.toUpperCase() ?? "U"
						}), editing && /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							children: "Đổi ảnh đại diện"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Họ và tên" }), /* @__PURE__ */ jsx(Input, {
									value: form.fullName,
									onChange: (e) => update("fullName", e.target.value),
									disabled: !editing
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Tên đăng nhập" }), /* @__PURE__ */ jsx(Input, {
									value: form.username,
									onChange: (e) => update("username", e.target.value),
									disabled: !editing
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Email" }), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2 items-start",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex-1",
										children: /* @__PURE__ */ jsx(Input, {
											type: "email",
											value: form.email,
											onChange: (e) => update("email", e.target.value),
											disabled: !editing
										})
									}), !editing && user?.email && /* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-2 pt-1 shrink-0",
										children: user.emailVerified ? /* @__PURE__ */ jsxs(Badge, {
											variant: "outline",
											className: "border-green-500/30 text-green-600 bg-green-500/5 gap-1",
											children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "h-3 w-3" }), " Đã xác thực"]
										}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "border-amber-500/30 text-amber-600 bg-amber-500/5",
											children: "Chưa xác thực"
										}), /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: resendVerification,
											className: "h-7 text-xs gap-1",
											children: [/* @__PURE__ */ jsx(Send, { className: "h-3 w-3" }), " Gửi lại"]
										})] })
									})]
								})]
							})
						]
					})]
				})] }), editing && /* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 mt-4",
					children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						onClick: cancel,
						disabled: saving,
						children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4 mr-2" }), " Huỷ"]
					}), /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: saving,
						children: [
							/* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-2" }),
							" ",
							saving ? "Đang lưu..." : "Lưu thay đổi"
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
