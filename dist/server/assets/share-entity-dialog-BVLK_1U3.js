import { t as API_BASE } from "./api-DeanpG7g.js";
import { t as Button } from "./button-OuFjfcpS.js";
import { t as Input } from "./input-CITjGSX3.js";
import { t as Label } from "./label-BPuF5-mq.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B5SRUUUO.js";
import { S as useShareFolder, _ as useOwnedShares } from "./queries-BQoAyQ7j.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Check, Copy, FileText, FolderKanban, Users } from "lucide-react";
//#region src/components/share-entity-dialog.tsx
/**
* Dialog chia sẻ dùng chung cho CẢ folder lẫn file (document).
* Truyền đúng 1 trong 2: folderId hoặc documentId.
*/
function ShareEntityDialog({ open, onOpenChange, title, folderId, documentId }) {
	const share = useShareFolder();
	const { data: shares, isLoading } = useOwnedShares();
	const [value, setValue] = useState("");
	const [copied, setCopied] = useState(false);
	const isFolder = !!folderId;
	const targetId = folderId ?? documentId ?? "";
	useEffect(() => {
		if (!open) {
			setValue("");
			setCopied(false);
		}
	}, [open]);
	const link = isFolder ? `${API_BASE}/shared/folder/${targetId}` : `${API_BASE}/shared/document/${targetId}`;
	const relevantShares = (shares ?? []).filter((s) => isFolder ? s.folderId === targetId : s.documentId === targetId);
	const handleInvite = async () => {
		const v = value.trim();
		if (!v) return;
		const isEmail = /^\S+@\S+\.\S+$/.test(v);
		try {
			await share.mutateAsync({
				folderId: isFolder ? targetId : void 0,
				documentId: isFolder ? void 0 : targetId,
				email: isEmail ? v : void 0,
				username: isEmail ? void 0 : v
			});
			setValue("");
			toast.success(`Đã mời ${v}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Mời thất bại");
		}
	};
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			toast.success("Đã sao chép liên kết");
			setTimeout(() => setCopied(false), 1500);
		} catch {
			toast.error("Không thể sao chép liên kết");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
				className: "truncate flex items-center gap-2",
				children: [
					isFolder ? /* @__PURE__ */ jsx(FolderKanban, { className: "h-4 w-4 text-primary shrink-0" }) : /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary shrink-0" }),
					"Chia sẻ ",
					isFolder ? "thư mục" : "tài liệu",
					" \"",
					title,
					"\""
				]
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Mời người khác xem hoặc sao chép liên kết chia sẻ." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Mời người dùng" }), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Input, {
								type: "text",
								placeholder: "email@example.com hoặc username",
								value,
								onChange: (e) => setValue(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleInvite();
									}
								}
							}), /* @__PURE__ */ jsx(Button, {
								onClick: handleInvite,
								disabled: share.isPending || !value.trim(),
								children: share.isPending ? "Đang mời..." : "Mời"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1.5 text-sm font-medium",
							children: [
								/* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
								"Đã chia sẻ (",
								isLoading ? "..." : relevantShares.length,
								")"
							]
						}), relevantShares.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Chưa chia sẻ với ai."
						}) : /* @__PURE__ */ jsx("ul", {
							className: "space-y-1 max-h-32 overflow-y-auto",
							children: relevantShares.map((s) => /* @__PURE__ */ jsx("li", {
								className: "text-sm rounded-md bg-muted/50 px-2.5 py-1.5 truncate",
								children: s.sharedUsername ?? s.sharedEmail ?? "Unknown"
							}, s.id))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Liên kết chia sẻ" }), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Input, {
								value: link,
								readOnly: true,
								className: "text-muted-foreground"
							}), /* @__PURE__ */ jsx(Button, {
								variant: "outline",
								size: "icon",
								onClick: handleCopy,
								title: "Sao chép liên kết",
								children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Đóng"
			}) })
		] })
	});
}
//#endregion
export { ShareEntityDialog as t };
