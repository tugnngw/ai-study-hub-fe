import { n as useAuth } from "./auth-DZc1y93h.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { _ as useSharedDocuments, d as useFolders, o as useDocuments } from "./queries-CTUrUBWQ.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { FileText, FolderKanban, Pencil, Save, Share2, X } from "lucide-react";
//#region src/routes/_authenticated/profile.tsx?tsr-split=component
function ProfilePage() {
	const { user } = useAuth();
	const docs = useDocuments();
	const folders = useFolders();
	const sharedDocs = useSharedDocuments();
	const [editing, setEditing] = useState(false);
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
	const save = (e) => {
		e.preventDefault();
		toast.success("Đã cập nhật hồ sơ");
		setEditing(false);
	};
	const cancel = () => {
		setForm(initialForm);
		setEditing(false);
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
		className: "space-y-6 max-w-3xl",
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
								children: [/* @__PURE__ */ jsx(Label, { children: "Email" }), /* @__PURE__ */ jsx(Input, {
									type: "email",
									value: form.email,
									onChange: (e) => update("email", e.target.value),
									disabled: !editing
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
						children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4 mr-2" }), " Huỷ"]
					}), /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						children: [/* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-2" }), " Lưu thay đổi"]
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
