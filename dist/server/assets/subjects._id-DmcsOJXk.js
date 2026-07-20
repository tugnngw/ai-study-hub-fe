import { t as Route } from "./subjects._id-C2lUcq4I.js";
import { t as cn } from "./utils-BlvTLkCV.js";
import { A as useSemesters, p as useFolders } from "./queries-BaPhj2xN.js";
import { t as Skeleton } from "./skeleton-GQcXPnHo.js";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, ChevronLeft, FolderKanban, MoreHorizontal } from "lucide-react";
//#region src/routes/_authenticated/subjects.$id.tsx?tsr-split=component
function SubjectDetailPage() {
	const { id: subjectId } = Route.useParams();
	const { data: semesters = [], isLoading: semLoading } = useSemesters();
	const { data: allFolders = [], isLoading: foldersLoading } = useFolders();
	useMemo(() => {
		return [];
	}, [semesters]);
	const folders = useMemo(() => allFolders.filter((f) => f.subjectId === subjectId), [allFolders, subjectId]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "hover:text-foreground transition-colors",
						children: "Dashboard"
					}),
					/* @__PURE__ */ jsx("span", { children: "/" }),
					/* @__PURE__ */ jsx("span", {
						className: "text-foreground font-medium truncate",
						children: "Subject folders"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
				children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors",
							children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "h-10 w-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-semibold tracking-tight",
							children: "Subject"
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"ID: ",
								subjectId.slice(0, 8),
								"..."
							]
						})] })
					]
				}) })
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "font-display font-semibold text-lg",
					children: [
						"Folders (",
						folders.length,
						")"
					]
				}), foldersLoading ? /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-28 rounded-2xl" }, i))
				}) : folders.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "text-sm text-muted-foreground py-12 text-center border border-dashed rounded-2xl",
					children: [
						/* @__PURE__ */ jsx(FolderKanban, { className: "h-10 w-10 mx-auto text-muted-foreground/50 mb-3" }),
						/* @__PURE__ */ jsx("p", { children: "Chưa có thư mục nào trong môn này." }),
						/* @__PURE__ */ jsx(Link, {
							to: "/folders",
							className: "text-primary font-medium hover:underline mt-2 inline-block",
							children: "Tạo thư mục mới"
						})
					]
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: folders.map((f, i) => /* @__PURE__ */ jsx(Link, {
						to: "/ai",
						search: { folderId: f.id },
						className: cn("group rounded-2xl border border-border/60 bg-card p-5 hover:border-primary/40 hover:shadow-soft transition-all"),
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "h-10 w-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ jsx(FolderKanban, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "font-semibold truncate group-hover:text-primary transition-colors",
											children: f.name
										}),
										f.description && /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground truncate mt-0.5",
											children: f.description
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-xs font-medium text-primary mt-2",
											children: [f.documentCount ?? 0, " tài liệu"]
										})
									]
								}),
								/* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" })
							]
						})
					}, f.id))
				})]
			})
		]
	});
}
//#endregion
export { SubjectDetailPage as component };
