import { B as useTrash, I as useSubjects, M as useRestoreFromTrash, N as useSemesters, j as useRestoreFolderFromTrash, m as useFolders, p as useFolderTrash, u as useEmptyTrash, x as usePermanentDeleteFolder } from "./queries-BOxd9l6F.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, FileText, Folder, Loader2, RotateCcw, Trash2 } from "lucide-react";
//#region src/routes/_authenticated/trash.tsx?tsr-split=component
function TrashPage() {
	const docs = useTrash();
	const folders = useFolderTrash();
	const restore = useRestoreFromTrash();
	const erase = useEmptyTrash();
	const restoreFolder = useRestoreFolderFromTrash();
	const eraseFolder = usePermanentDeleteFolder();
	const activeFolders = useFolders();
	const subjects = useSubjects();
	const semesters = useSemesters();
	const subjectMap = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		(subjects.data ?? []).forEach((s) => map.set(s.id, s));
		return map;
	}, [subjects.data]);
	const semesterMap = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		(semesters.data ?? []).forEach((s) => map.set(s.id, s));
		return map;
	}, [semesters.data]);
	const activeFolderMap = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		(activeFolders.data ?? []).forEach((f) => map.set(f.id, f));
		(folders.data ?? []).forEach((f) => {
			if (!map.has(f.id)) map.set(f.id, f);
		});
		return map;
	}, [activeFolders.data, folders.data]);
	const isLoading = docs.isLoading || folders.isLoading;
	const items = [...(folders.data ?? []).map((f) => ({
		...f,
		_type: "folder"
	})), ...(docs.data ?? []).map((d) => ({
		...d,
		_type: "document"
	}))];
	const getFolderInfo = (folderId) => {
		if (!folderId) return {
			folder: null,
			subject: null,
			semester: null
		};
		const folder = activeFolderMap.get(folderId);
		if (!folder) return {
			folder: null,
			subject: null,
			semester: null
		};
		const subject = folder.subjectId ? subjectMap.get(folder.subjectId) : null;
		const semester = subject?.semesterId ? semesterMap.get(subject.semesterId) : null;
		return {
			folder: folder.name,
			subject: subject?.name,
			semester: semester?.name
		};
	};
	const getSubjectSemester = (subjectId) => {
		if (!subjectId) return {
			folder: null,
			subject: null,
			semester: null
		};
		const subject = subjectMap.get(subjectId);
		const semester = subject?.semesterId ? semesterMap.get(subject.semesterId) : null;
		return {
			folder: null,
			subject: (subject?.name ?? subject?.code) || null,
			semester: semester?.name ?? null
		};
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Thùng rác"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "Các tài liệu và thư mục đã xoá sẽ ở đây. Bạn có thể khôi phục hoặc xoá vĩnh viễn."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3",
				children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-amber-700 dark:text-amber-500",
					children: "Tài liệu đã xoá mềm vẫn được tính vào tổng dung lượng lưu trữ của bạn cho đến khi bị xoá vĩnh viễn."
				})]
			}),
			isLoading ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Đang tải…"]
			}) }) : items.length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-16 text-center",
				children: [/* @__PURE__ */ jsx(Trash2, { className: "h-10 w-10 mx-auto text-muted-foreground/50" }), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "Thùng rác trống"
				})]
			}) }) : /* @__PURE__ */ jsx("div", {
				className: "border border-border rounded-lg overflow-hidden",
				children: items.map((d) => {
					const info = d._type === "folder" ? getSubjectSemester(d.subjectId) : getFolderInfo(d.folderId);
					return /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 px-4 py-3 border-b border-border last:border-0",
						children: [
							d._type === "folder" ? /* @__PURE__ */ jsx(Folder, { className: "h-4 w-4 text-primary shrink-0" }) : /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-sm font-medium truncate",
									children: [d.name || d.title, /* @__PURE__ */ jsx("span", {
										className: "ml-2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full",
										children: d._type === "folder" ? "Thư mục" : "Tài liệu"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-1 mt-0.5",
									children: [
										d._type === "folder" && info?.semester && /* @__PURE__ */ jsx(Badge, {
											variant: "secondary",
											className: "text-[10px] px-1.5 py-0 h-auto",
											children: info.semester
										}),
										d._type === "folder" && info?.subject && /* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "text-[10px] px-1.5 py-0 h-auto",
											children: info.subject
										}),
										d._type !== "folder" && info?.folder && /* @__PURE__ */ jsx(Badge, {
											variant: "secondary",
											className: "text-[10px] px-1.5 py-0 h-auto",
											children: info.folder
										}),
										d._type !== "folder" && info?.subject && /* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "text-[10px] px-1.5 py-0 h-auto",
											children: info.subject
										}),
										d._type !== "folder" && info?.semester && /* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground",
											children: info.semester
										})
									]
								})]
							}),
							d._type !== "folder" && /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground shrink-0 whitespace-nowrap",
								children: d.formattedFileSize || "—"
							}),
							/* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => d._type === "folder" ? restoreFolder.mutate(d.id) : restore.mutate(d.id),
								disabled: restore.isPending || restoreFolder.isPending,
								children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-2" }), " Khôi phục"]
							}),
							/* @__PURE__ */ jsx(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => {
									if (confirm(`Xoá vĩnh viễn ${d.name || d.title}?`)) d._type === "folder" ? eraseFolder.mutate(d.id) : erase.mutate(d.id);
								},
								children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, d.id);
				})
			})
		]
	});
}
//#endregion
export { TrashPage as component };
