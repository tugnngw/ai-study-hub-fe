import { n as useAuth } from "./auth-DMiM-CCq.js";
import { n as formatBytes, t as cn } from "./utils-BlvTLkCV.js";
import { A as useSemesters, n as useDashboard, p as useFolders } from "./queries-BZClv1r5.js";
import { t as Skeleton } from "./skeleton-GQcXPnHo.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, ChevronDown, ChevronRight, FileText, FolderKanban, MoreHorizontal, Plus } from "lucide-react";
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
function Dashboard() {
	const dashboard = useDashboard();
	const { data: semesters = [], isLoading: semLoading } = useSemesters();
	const { data: allFolders = [] } = useFolders();
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
	const [activeSemId, setActiveSemId] = useState("");
	useEffect(() => {
		if (!activeSemId && semesters.length > 0) setActiveSemId(semesters[0].id);
	}, [semesters, activeSemId]);
	const subjectsInSem = useMemo(() => (data?.subjects ?? []).filter((s) => s.semesterId === activeSemId), [data?.subjects, activeSemId]);
	const [expandedSubjectId, setExpandedSubjectId] = useState(null);
	const foldersBySubject = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		allFolders.forEach((f) => {
			if (f.subjectId) {
				const list = map.get(f.subjectId) ?? [];
				list.push(f);
				map.set(f.subjectId, list);
			}
		});
		return map;
	}, [allFolders]);
	const recentNotes = data?.recentNotes ?? [];
	const recentDocs = (data?.recentDocuments ?? []).slice(0, 3);
	const activeSem = semesters.find((s) => s.id === activeSemId);
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
									formatBytes(d.fileSize) ? ` · ${formatBytes(d.fileSize)}` : "",
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
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display font-semibold text-lg",
						children: "Môn học theo kỳ"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap gap-2",
						children: semLoading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-20 rounded-full" }, i)) : semesters.map((s) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => {
								setActiveSemId(s.id);
								setExpandedSubjectId(null);
							},
							className: cn("px-4 py-1.5 rounded-full text-sm font-medium border transition-colors", activeSemId === s.id ? "bg-gradient-brand text-white border-transparent shadow-soft" : "bg-card text-muted-foreground border-border hover:border-primary/40"),
							children: s.name
						}, s.id))
					}),
					activeSem && /* @__PURE__ */ jsxs("section", {
						className: "space-y-3",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "font-display font-semibold text-base text-foreground/80",
							children: ["Môn học ", activeSem.name]
						}), subjectsInSem.length === 0 ? /* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground py-8 text-center border border-dashed rounded-2xl",
							children: "Chưa có môn học nào trong kỳ này."
						}) : /* @__PURE__ */ jsx("div", {
							className: "space-y-2",
							children: subjectsInSem.map((s, i) => {
								const folders = foldersBySubject.get(s.id) ?? [];
								const isExpanded = expandedSubjectId === s.id;
								return /* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl border border-border/60 bg-card overflow-hidden",
									children: [/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setExpandedSubjectId(isExpanded ? null : s.id),
										className: "flex items-center gap-3 w-full p-4 hover:bg-accent/30 transition-colors text-left",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0", SUBJECT_TONES[i % SUBJECT_TONES.length]),
												children: /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" })
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "text-sm font-semibold truncate flex items-center gap-2",
													children: [s.code && /* @__PURE__ */ jsx("span", {
														className: "text-xs font-mono text-muted-foreground",
														children: s.code
													}), /* @__PURE__ */ jsx("span", { children: s.name })]
												}), /* @__PURE__ */ jsxs("div", {
													className: "text-xs text-muted-foreground",
													children: [folders.length, " thư mục"]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Link, {
													to: "/subjects/$id",
													params: { id: s.id },
													className: "text-xs text-primary font-medium hover:underline",
													onClick: (e) => e.stopPropagation(),
													children: "Xem tất cả"
												}), isExpanded ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
											})
										]
									}), isExpanded && /* @__PURE__ */ jsx("div", {
										className: "border-t border-border/60 divide-y divide-border/40",
										children: folders.length === 0 ? /* @__PURE__ */ jsx("div", {
											className: "px-4 py-6 text-center text-sm text-muted-foreground",
											children: "Chưa có thư mục nào trong môn này."
										}) : folders.map((f) => /* @__PURE__ */ jsxs(Link, {
											to: "/ai",
											search: { folderId: f.id },
											className: "flex items-center gap-3 px-4 py-3 hover:bg-accent/20 transition-colors group",
											children: [
												/* @__PURE__ */ jsx("div", {
													className: "h-8 w-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0",
													children: /* @__PURE__ */ jsx(FolderKanban, { className: "h-4 w-4" })
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ jsx("div", {
														className: "text-sm font-medium truncate",
														children: f.name
													}), f.description && /* @__PURE__ */ jsx("div", {
														className: "text-xs text-muted-foreground truncate",
														children: f.description
													})]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "text-xs text-muted-foreground shrink-0",
													children: [f.documentCount ?? 0, " tài liệu"]
												}),
												/* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" })
											]
										}, f.id))
									})]
								}, s.id);
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
