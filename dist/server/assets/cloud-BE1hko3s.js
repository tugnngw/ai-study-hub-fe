import { n as formatBytes } from "./utils-BlvTLkCV.js";
import { n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { T as useQuota, s as useDocuments } from "./queries-gXAr1tOQ.js";
import { t as Progress } from "./progress-BS38uVhb.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Cloud, Database, HardDrive } from "lucide-react";
//#region src/routes/_authenticated/cloud.tsx?tsr-split=component
function CloudPage() {
	const docs = useDocuments();
	const quota = useQuota();
	const usedFormatted = formatBytes(quota.data?.storageUsedBytes) || "0 B";
	const totalFormatted = formatBytes(quota.data?.storageLimitBytes) || "1 GB";
	const freeFormatted = formatBytes(quota.data?.storageRemainingBytes) || "0 B";
	const pct = quota.data?.storageLimitBytes ? Math.min(100, Math.round(quota.data.storageUsedBytes / quota.data.storageLimitBytes * 100)) : 0;
	const isOverLimit = quota.data?.overQuota ?? false;
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
									usedFormatted,
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "text-base text-muted-foreground font-normal",
										children: ["/ ", totalFormatted]
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
								children: totalFormatted
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
								children: freeFormatted
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
