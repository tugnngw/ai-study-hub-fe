import { d as subjectApi, l as semesterApi } from "./realApi-FsHlyiEI.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-C3MnOk9C.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DbHTFeLL.js";
import { t as adminKeys } from "./adminKeys-DApJpp5s.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookOpen, ChevronDown, ChevronRight, GraduationCap, Loader2, Plus, Trash2 } from "lucide-react";
//#region src/features/admin/hooks/useAdminSemesters.ts
function useAdminSemesters() {
	return useQuery({
		queryKey: adminKeys.semesters(),
		queryFn: () => semesterApi.list()
	});
}
function useCreateSemester() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (name) => semesterApi.create(name),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.semesters() });
			toast.success("Đã tạo kỳ học mới");
		},
		onError: (err) => {
			toast.error(err?.message || "Không thể tạo kỳ học");
		}
	});
}
function useDeleteSemester() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => semesterApi.delete(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.semesters() });
			toast.success("Đã xoá kỳ học");
		},
		onError: (err) => {
			toast.error(err?.message || "Không thể xoá kỳ học");
		}
	});
}
function useAdminSubjects(semesterId) {
	return useQuery({
		queryKey: [...adminKeys.subjects(), semesterId],
		queryFn: () => subjectApi.listBySemester(semesterId),
		enabled: !!semesterId
	});
}
function useCreateSubject() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body) => subjectApi.create(body),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.subjects() });
			qc.invalidateQueries({ queryKey: ["subjects"] });
			toast.success("Đã tạo môn học mới");
		},
		onError: (err) => {
			toast.error(err?.message || "Không thể tạo môn học");
		}
	});
}
function useDeleteSubject() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => subjectApi.delete(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.subjects() });
			qc.invalidateQueries({ queryKey: ["subjects"] });
			toast.success("Đã xoá môn học");
		},
		onError: (err) => {
			toast.error(err?.message || "Không thể xoá môn học");
		}
	});
}
//#endregion
//#region src/features/admin/components/AdminSemestersPage.tsx
function AdminSemestersPage() {
	const semesters = useAdminSemesters();
	const createSem = useCreateSemester();
	const deleteSem = useDeleteSemester();
	const [expandedSem, setExpandedSem] = useState(null);
	const [semesterOpen, setSemesterOpen] = useState(false);
	const [subjectOpen, setSubjectOpen] = useState(false);
	const [selectedSemId, setSelectedSemId] = useState("");
	const [deleteTarget, setDeleteTarget] = useState(null);
	const [newSemName, setNewSemName] = useState("");
	const [newSubjCode, setNewSubjCode] = useState("");
	const [newSubjName, setNewSubjName] = useState("");
	const subjects = useAdminSubjects(expandedSem ?? void 0);
	const createSemester = async () => {
		if (!newSemName.trim()) return toast.error("Nhập tên kỳ học");
		await createSem.mutateAsync(newSemName.trim());
		setNewSemName("");
		setSemesterOpen(false);
	};
	const createSubject = async () => {
		if (!newSubjCode.trim()) return toast.error("Nhập mã môn");
		if (!newSubjName.trim()) return toast.error("Nhập tên môn");
		await createSubj.mutateAsync({
			semesterId: selectedSemId,
			code: newSubjCode.trim(),
			name: newSubjName.trim()
		});
		setNewSubjCode("");
		setNewSubjName("");
		setSubjectOpen(false);
	};
	const createSubj = useCreateSubject();
	const deleteSubj = useDeleteSubject();
	const doDelete = () => {
		if (!deleteTarget) return;
		if (deleteTarget.type === "semester") deleteSem.mutate(deleteTarget.id);
		else deleteSubj.mutate(deleteTarget.id);
		setDeleteTarget(null);
	};
	const isSemPending = createSem.isPending || deleteSem.isPending;
	const isSubjPending = createSubj.isPending || deleteSubj.isPending;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Quản lý Kỳ học & Môn học"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground mt-1",
					children: "Thêm, xoá kỳ học và môn học trong hệ thống"
				})] }), /* @__PURE__ */ jsxs(Button, {
					onClick: () => setSemesterOpen(true),
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }), " Thêm kỳ học"]
				})]
			}),
			semesters.isLoading ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-12 text-center flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Đang tải…"]
			}) }) : (semesters.data ?? []).length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "py-16 text-center",
				children: [/* @__PURE__ */ jsx(GraduationCap, { className: "h-10 w-10 mx-auto text-muted-foreground/50" }), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "Chưa có kỳ học nào"
				})]
			}) }) : /* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: (semesters.data ?? []).map((sem) => {
					const isExpanded = expandedSem === sem.id;
					return /* @__PURE__ */ jsxs(Card, {
						className: "overflow-hidden",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 p-4 cursor-pointer hover:bg-accent/30 transition-colors",
							onClick: () => {
								setExpandedSem(isExpanded ? null : sem.id);
							},
							children: [
								/* @__PURE__ */ jsx(Button, {
									variant: "ghost",
									size: "sm",
									className: "p-0 h-auto",
									onClick: (e) => {
										e.stopPropagation();
										setExpandedSem(isExpanded ? null : sem.id);
									},
									children: isExpanded ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
								}),
								/* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5 text-primary shrink-0" }),
								/* @__PURE__ */ jsx("div", {
									className: "flex-1 min-w-0",
									children: /* @__PURE__ */ jsx("div", {
										className: "font-semibold truncate",
										children: sem.name
									})
								}),
								/* @__PURE__ */ jsx(Button, {
									variant: "ghost",
									size: "sm",
									className: "text-destructive",
									disabled: isSemPending,
									onClick: (e) => {
										e.stopPropagation();
										setDeleteTarget({
											id: sem.id,
											name: sem.name,
											type: "semester"
										});
									},
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
								})
							]
						}), isExpanded && /* @__PURE__ */ jsxs("div", {
							className: "border-t border-border px-4 py-3 space-y-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-semibold tracking-wider text-muted-foreground",
									children: "MÔN HỌC"
								}), /* @__PURE__ */ jsxs(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										setSelectedSemId(sem.id);
										setSubjectOpen(true);
									},
									children: [/* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }), " Thêm môn"]
								})]
							}), subjects.isLoading ? /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 py-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }), " Đang tải…"]
							}) : (subjects.data ?? []).length === 0 ? /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground py-2",
								children: "Chưa có môn học nào"
							}) : /* @__PURE__ */ jsx("div", {
								className: "divide-y divide-border/50",
								children: (subjects.data ?? []).map((subj) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 py-2",
									children: [
										/* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
										/* @__PURE__ */ jsx("div", {
											className: "flex-1 min-w-0",
											children: /* @__PURE__ */ jsxs("div", {
												className: "text-sm truncate",
												children: [
													subj.code && /* @__PURE__ */ jsx("span", {
														className: "font-mono text-xs text-muted-foreground mr-1.5",
														children: subj.code
													}),
													subj.name,
													subj.defaultSubject && /* @__PURE__ */ jsx(Badge, {
														variant: "secondary",
														className: "ml-2 text-[10px] px-1.5 py-0 h-auto",
														children: "Mặc định"
													})
												]
											})
										}),
										!subj.defaultSubject && /* @__PURE__ */ jsx(Button, {
											variant: "ghost",
											size: "sm",
											className: "text-destructive",
											disabled: isSubjPending,
											onClick: () => setDeleteTarget({
												id: subj.id,
												name: `${subj.code} - ${subj.name}`,
												type: "subject"
											}),
											children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								}, subj.id))
							})]
						})]
					}, sem.id);
				})
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: semesterOpen,
				onOpenChange: setSemesterOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [
					/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Thêm kỳ học mới" }) }),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Tên kỳ học" }), /* @__PURE__ */ jsx(Input, {
								value: newSemName,
								onChange: (e) => setNewSemName(e.target.value),
								placeholder: "VD: Spring 2025"
							})]
						})
					}),
					/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => setSemesterOpen(false),
						children: "Huỷ"
					}), /* @__PURE__ */ jsx(Button, {
						onClick: createSemester,
						disabled: createSem.isPending || !newSemName.trim(),
						children: createSem.isPending ? "Đang tạo…" : "Tạo"
					})] })
				] })
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: subjectOpen,
				onOpenChange: setSubjectOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, { children: [
					/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Thêm môn học mới" }) }),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Mã môn" }), /* @__PURE__ */ jsx(Input, {
								value: newSubjCode,
								onChange: (e) => setNewSubjCode(e.target.value),
								placeholder: "VD: SWP391"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Tên môn" }), /* @__PURE__ */ jsx(Input, {
								value: newSubjName,
								onChange: (e) => setNewSubjName(e.target.value),
								placeholder: "VD: Software Development Project"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => setSubjectOpen(false),
						children: "Huỷ"
					}), /* @__PURE__ */ jsx(Button, {
						onClick: createSubject,
						disabled: createSubj.isPending || !newSubjCode.trim() || !newSubjName.trim(),
						children: createSubj.isPending ? "Đang tạo…" : "Tạo"
					})] })
				] })
			}),
			/* @__PURE__ */ jsx(AlertDialog, {
				open: !!deleteTarget,
				onOpenChange: () => setDeleteTarget(null),
				children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsxs(AlertDialogTitle, { children: [
					"Xoá ",
					deleteTarget?.type === "semester" ? "kỳ học" : "môn học",
					"?"
				] }), /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
					"Bạn có chắc muốn xoá ",
					/* @__PURE__ */ jsx("strong", { children: deleteTarget?.name }),
					"?",
					deleteTarget?.type === "semester" && " Các môn học trong kỳ này cũng sẽ bị xoá."
				] })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Huỷ" }), /* @__PURE__ */ jsx(AlertDialogAction, {
					onClick: doDelete,
					className: "bg-destructive text-destructive-foreground",
					children: "Xoá"
				})] })] })
			})
		]
	});
}
//#endregion
//#region src/routes/admin_panel/semesters.tsx?tsr-split=component
var SplitComponent = AdminSemestersPage;
//#endregion
export { SplitComponent as component };
