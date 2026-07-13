import { n as useAuth } from "./auth-C8wjnF5I.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { r as useDashboard } from "./queries-BQoAyQ7j.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { n as SEMESTERS } from "./config-CGxDyaH-.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FileText, FolderKanban, MoreHorizontal, Plus } from "lucide-react";
//#region src/routes/_authenticated/dashboard.tsx?tsr-split=component
var NOTE_GRADIENTS = [
	"from-violet-400 to-violet-600",
	"from-indigo-400 to-violet-500",
	"from-purple-400 to-fuchsia-500"
];
var SUBJECT_TONES = [
	"bg-blue-50 text-blue-500",
	"bg-emerald-50 text-emerald-500",
	"bg-violet-50 text-violet-500"
];
function relativeTime(iso) {
	if (!iso) return "";
	const diff = Date.now() - new Date(iso).getTime();
	const mins = Math.floor(diff / 6e4);
	if (mins < 60) return `${Math.max(1, mins)} phút trước`;
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) return `${hrs} giờ trước`;
	return `${Math.floor(hrs / 24)} ngày trước`;
}
function fmtSize(bytes) {
	if (!bytes) return "";
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}kb`;
	return `${(bytes / 1024 / 1024).toFixed(1)}mb`;
}
function Dashboard() {
	const dashboard = useDashboard();
	const { user } = useAuth();
	const navigate = useNavigate();
	const isAdmin = user?.role === "ADMIN";
	useEffect(() => {
		if (isAdmin) navigate({
			to: "/admin_panel",
			replace: true
		});
	}, [isAdmin, navigate]);
	const data = dashboard.data;
	const loading = dashboard.isLoading;
	const allSubjects = data?.subjects ?? [];
	const semesters = SEMESTERS;
	const [activeSem, setActiveSem] = useState(1);
	useEffect(() => {
		if (semesters.length && !semesters.includes(activeSem)) setActiveSem(semesters[0]);
	}, [semesters, activeSem]);
	const subjectsInSem = useMemo(() => allSubjects.filter((s) => s.semester === activeSem), [allSubjects, activeSem]);
	const docCountBySubject = data?.docCountBySubject ?? {};
	const recentNotes = data?.recentNotes ?? [];
	const recentDocs = (data?.recentDocuments ?? []).slice(0, 3);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-9",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display font-bold text-2xl text-foreground",
				children: "Chào mừng trở lại"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground text-sm mt-0.5",
				children: "Truy cập nhanh vào tài liệu của bạn"
			})] }),
			/* @__PURE__ */ jsxs("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display font-semibold text-lg",
					children: "Sổ ghi chú gần đây"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: loading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-36 rounded-2xl" }, i)) : recentNotes.length === 0 ? /* @__PURE__ */ jsx("div", {
						className: "col-span-full text-sm text-muted-foreground py-8 text-center border border-dashed rounded-2xl",
						children: "Chưa có sổ ghi chú nào."
					}) : recentNotes.map((f, i) => /* @__PURE__ */ jsxs(Link, {
						to: "/ai",
						search: { folderId: f.id },
						className: cn("relative h-36 rounded-2xl p-5 text-white overflow-hidden bg-gradient-to-br shadow-soft transition-transform hover:-translate-y-0.5", NOTE_GRADIENTS[i % NOTE_GRADIENTS.length]),
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center",
									children: /* @__PURE__ */ jsx(FolderKanban, { className: "h-4.5 w-4.5" })
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[11px] font-medium bg-white/20 rounded-full px-2 py-0.5",
									children: [f.documentCount ?? 0, " tài liệu"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute bottom-5 left-5 right-5",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-semibold truncate",
									children: f.name
								}), /* @__PURE__ */ jsx("div", {
									className: "text-white/75 text-xs mt-0.5 truncate",
									children: f.description || f.aiSummary || relativeTime(f.updatedAt ?? f.createdAt)
								})]
							})
						]
					}, f.id))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display font-semibold text-lg",
						children: "Tài liệu gần đây"
					}), /* @__PURE__ */ jsxs(Link, {
						to: "/documents",
						className: "text-primary text-sm font-medium hover:underline flex items-center gap-1",
						children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Tạo mới"]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "rounded-2xl border border-border/60 divide-y divide-border/60 overflow-hidden bg-card",
					children: loading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx("div", {
						className: "p-4",
						children: /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-full" })
					}, i)) : recentDocs.length === 0 ? /* @__PURE__ */ jsx("div", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "Chưa có tài liệu."
					}) : recentDocs.map((d) => /* @__PURE__ */ jsxs(Link, {
						to: "/ai",
						search: {
							folderId: d.folderId ?? "",
							docId: d.id
						},
						className: "flex items-center gap-3 p-4 hover:bg-accent/40 transition-colors",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-sm font-semibold truncate",
								children: d.title
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-xs text-muted-foreground",
								children: [
									(d.mimeType?.split("/").pop() ?? "FILE").toUpperCase(),
									fmtSize(d.fileSize) ? ` · ${fmtSize(d.fileSize)}` : "",
									" ·",
									" ",
									relativeTime(d.createdAt)
								]
							})]
						})]
					}, d.id))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display font-semibold text-lg",
					children: "Môn học theo kỳ"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: semesters.map((s) => /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setActiveSem(s),
						className: cn("px-4 py-1.5 rounded-full text-sm font-medium border transition-colors", activeSem === s ? "bg-gradient-brand text-white border-transparent shadow-soft" : "bg-card text-muted-foreground border-border hover:border-primary/40"),
						children: ["Kỳ ", s]
					}, s))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "font-display font-semibold text-lg",
					children: ["Môn học kỳ ", activeSem]
				}), loading ? /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-20 rounded-2xl" }, i))
				}) : subjectsInSem.length === 0 ? /* @__PURE__ */ jsx("div", {
					className: "text-sm text-muted-foreground py-8 text-center border border-dashed rounded-2xl",
					children: "Chưa có môn học nào trong kỳ này."
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: subjectsInSem.map((s, i) => /* @__PURE__ */ jsxs(Link, {
						to: "/documents",
						className: "flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 hover:shadow-soft transition-all group",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0", SUBJECT_TONES[i % SUBJECT_TONES.length]),
								children: /* @__PURE__ */ jsx(FolderKanban, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-sm font-semibold truncate",
									children: [
										s.code,
										" - ",
										s.name
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-xs text-muted-foreground",
									children: [docCountBySubject[s.id] ?? 0, " tài liệu"]
								})]
							}),
							/* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })
						]
					}, s.id))
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
