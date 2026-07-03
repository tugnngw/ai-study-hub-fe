import { n as useAuth } from "./auth-C9Am8HSb.js";
import { n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { o as useDocuments } from "./queries-DZC_51lm.js";
import { t as Progress } from "./progress-BaJBfUMd.js";
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
	const { user } = useAuth();
	const used = docs.data?.reduce((sum, d) => sum + (d.fileSize ?? 0), 0) ?? 0;
	const total = (user?.storageGb || 1) * 1024 * 1024 * 1024;
	const pct = Math.min(used / total * 100, 100);
	const free = total - used;
	const isOverLimit = used > total;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 max-w-3xl",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Cloud đã sài"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "Theo dõi dung lượng lưu trữ của bạn"
			})] }),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Cloud, { className: "h-6 w-6 text-primary" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground",
							children: "Tổng dung lượng đã dùng"
						}), /* @__PURE__ */ jsxs("div", {
							className: "text-2xl font-semibold",
							children: [
								formatBytes(used),
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "text-base text-muted-foreground",
									children: ["/ ", formatBytes(total)]
								})
							]
						})] })]
					}),
					/* @__PURE__ */ jsx(Progress, {
						value: pct,
						className: `h-2 ${isOverLimit ? "bg-destructive/20" : ""}`
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ jsxs("span", { children: [pct.toFixed(2), "% đã sử dụng"] }), isOverLimit && /* @__PURE__ */ jsx("span", {
							className: "text-destructive font-semibold",
							children: "Đã vượt quá giới hạn!"
						})]
					})
				]
			}) }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
					className: "p-5 flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Database, { className: "h-8 w-8 text-violet-500" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground",
						children: "Số tài liệu"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-2xl font-semibold",
						children: docs.data?.length ?? 0
					})] })]
				}) }), /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
					className: "p-5 flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(HardDrive, { className: `h-8 w-8 ${isOverLimit ? "text-destructive" : "text-emerald-500"}` }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground",
						children: "Còn trống"
					}), /* @__PURE__ */ jsx("div", {
						className: `text-2xl font-semibold ${isOverLimit ? "text-destructive" : ""}`,
						children: isOverLimit ? "0 B" : formatBytes(free)
					})] })]
				}) })]
			}),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, {
				className: "p-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-4 text-sm",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Giới hạn:"
						}), /* @__PURE__ */ jsx("span", {
							className: "ml-2 font-medium",
							children: formatBytes(total)
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Đã dùng:"
						}), /* @__PURE__ */ jsx("span", {
							className: "ml-2 font-medium",
							children: formatBytes(used)
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Còn trống:"
						}), /* @__PURE__ */ jsx("span", {
							className: `ml-2 font-medium ${isOverLimit ? "text-destructive" : ""}`,
							children: isOverLimit ? "0 B" : formatBytes(free)
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Trạng thái:"
						}), /* @__PURE__ */ jsx("span", {
							className: `ml-2 font-medium ${isOverLimit ? "text-destructive" : "text-emerald-500"}`,
							children: isOverLimit ? "⚠️ Vượt giới hạn" : "✅ Bình thường"
						})] })
					]
				})
			}) })
		]
	});
}
//#endregion
export { CloudPage as component };
