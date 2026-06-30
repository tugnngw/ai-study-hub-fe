import { n as CardContent, t as Card } from "./card-CkAivaVl.js";
import { o as useDocuments } from "./queries-I4d4VPTX.js";
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
	const used = docs.data?.reduce((sum, d) => sum + (d.fileSize ?? 0), 0) ?? 0;
	const total = 15 * 1024 * 1024 * 1024;
	const pct = used / total * 100;
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
						className: "h-2"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "text-xs text-muted-foreground",
						children: [pct.toFixed(4), "% đã sử dụng"]
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
					children: [/* @__PURE__ */ jsx(HardDrive, { className: "h-8 w-8 text-emerald-500" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground",
						children: "Còn trống"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-2xl font-semibold",
						children: formatBytes(total - used)
					})] })]
				}) })]
			})
		]
	});
}
//#endregion
export { CloudPage as component };
