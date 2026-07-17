import { n as useAuth } from "./auth-DMiM-CCq.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { s as useDocuments } from "./queries-BnM1O96_.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Cloud, Database, HardDrive } from "lucide-react";
//#region src/routes/_authenticated/cloud.tsx?tsr-split=component
function formatBytes(n) {
	if (n < 1024) return `${n} B`;
	if (n < 1024 ** 2) return `${(n / 1024).toFixed(2)} KB`;
	if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(2)} MB`;
	return `${(n / 1024 ** 3).toFixed(2)} GB`;
}
function CloudPage() {
	const docs = useDocuments();
	const { user, reloadUser } = useAuth();
	useEffect(() => {
		reloadUser().catch(console.error);
	}, [reloadUser]);
	const used = docs.data?.reduce((sum, d) => sum + (d.fileSize ?? 0), 0) ?? 0;
	const total = (user?.storageGb || 1) * 1024 * 1024 * 1024;
	const pct = Math.min(used / total * 100, 100);
	const free = total - used;
	const isOverLimit = used > total;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl font-bold tracking-tight font-display",
			children: "Lưu trữ Cloud"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1 text-sm",
			children: "Theo dõi dung lượng lưu trữ của bạn"
		})] }), /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
			className: "p-6 space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(Cloud, { className: "h-6 w-6 text-primary" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-sm text-muted-foreground",
								children: "Tổng dung lượng đã dùng"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-2xl font-bold font-display",
								children: [
									formatBytes(used),
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "text-base text-muted-foreground font-normal",
										children: ["/ ", formatBytes(total)]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "text-right shrink-0",
							children: [/* @__PURE__ */ jsx("div", {
								className: `text-sm font-semibold ${isOverLimit ? "text-destructive" : "text-emerald-600"}`,
								children: isOverLimit ? "⚠️ Vượt giới hạn" : "✅ Bình thường"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-xs text-muted-foreground",
								children: [pct.toFixed(2), "% đã dùng"]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx(Progress, {
					value: pct,
					className: `h-2.5 ${isOverLimit ? "bg-destructive/20" : ""}`
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-3 divide-x divide-border border-t border-border pt-4 -mx-6 px-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "px-4 first:pl-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Database, { className: "h-3.5 w-3.5 text-violet-500" }), " Số tài liệu"]
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xl font-bold font-display mt-0.5",
								children: docs.data?.length ?? 0
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx(HardDrive, { className: "h-3.5 w-3.5 text-primary" }), " Giới hạn"]
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xl font-bold font-display mt-0.5",
								children: formatBytes(total)
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ jsx(HardDrive, { className: `h-3.5 w-3.5 ${isOverLimit ? "text-destructive" : "text-emerald-500"}` }),
									" ",
									"Còn trống"
								]
							}), /* @__PURE__ */ jsx("div", {
								className: `text-xl font-bold font-display mt-0.5 ${isOverLimit ? "text-destructive" : ""}`,
								children: isOverLimit ? "0 B" : formatBytes(free)
							})]
						})
					]
				})
			]
		}) })]
	});
}
//#endregion
export { CloudPage as component };
