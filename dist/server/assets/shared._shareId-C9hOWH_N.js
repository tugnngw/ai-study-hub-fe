import { r as documentApi } from "./realApi-C3h-htfj.js";
import { t as Route } from "./shared._shareId-DZdEFRG4.js";
import { t as cn } from "./utils-BlvTLkCV.js";
import { t as Button } from "./button-pc6NSNyO.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { t as Label } from "./label-B39qiR2q.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-C3MnOk9C.js";
import { p as useFolders } from "./queries-DNol5grK.js";
import { t as Skeleton } from "./skeleton-GQcXPnHo.js";
import { t as Textarea } from "./textarea-CY1CNB-1.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CBPWXxKu.js";
import { t as DocumentViewer } from "./DocumentViewer-Cuff7KT2.js";
import { n as ReportDocumentDialog, t as sharesApi } from "./shareApi-C-VU6NvM.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2, FileText, Flag, FolderKanban, Loader2, Save, XCircle } from "lucide-react";
//#region src/features/shares/hooks/useSharedWorkspace.ts
var sharedWorkspaceKeys = {
	all: ["shared-workspace"],
	folder: (shareToken) => [
		...sharedWorkspaceKeys.all,
		"folder",
		shareToken
	],
	documents: (folderId) => [
		...sharedWorkspaceKeys.all,
		"documents",
		folderId
	],
	document: (docId) => [
		...sharedWorkspaceKeys.all,
		"document",
		docId
	]
};
function useSharedFolder(shareToken) {
	return useQuery({
		queryKey: sharedWorkspaceKeys.folder(shareToken),
		queryFn: async () => {
			const share = (await sharesApi.getSharedWithMe()).find((s) => s.id === shareToken);
			if (share) return {
				folderId: share.isDocument ? "" : share.actualFolderId,
				folderName: share.name,
				shareDbId: share.shareId,
				isDocument: share.isDocument ?? false,
				documentId: share.documentId
			};
			const ownedShare = (await sharesApi.getSharedByMe()).find((s) => s.id === shareToken);
			if (ownedShare) return {
				folderId: ownedShare.documentId ? "" : ownedShare.actualFolderId,
				folderName: ownedShare.name,
				shareDbId: ownedShare.shareId,
				isDocument: !!ownedShare.documentId,
				documentId: ownedShare.documentId
			};
			throw new Error("Không tìm thấy thông tin chia sẻ");
		},
		enabled: !!shareToken
	});
}
function useSharedDocuments(folderId) {
	return useQuery({
		queryKey: sharedWorkspaceKeys.documents(folderId),
		queryFn: () => documentApi.listSharedFolder(folderId),
		enabled: !!folderId
	});
}
function useSharedDocument(docId) {
	return useQuery({
		queryKey: sharedWorkspaceKeys.document(docId),
		queryFn: () => documentApi.getSharedById(docId),
		enabled: !!docId
	});
}
function useSaveToMyFolder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ shareId, folderId, title, description }) => sharesApi.saveShared(shareId, {
			folderId,
			title,
			description
		}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["documents"] });
			qc.invalidateQueries({ queryKey: ["folders"] });
		}
	});
}
//#endregion
//#region src/components/shared-workspace/SharedWorkspace.tsx
function SharedWorkspace({ shareToken, docId }) {
	const navigate = useNavigate();
	const folderInfo = useSharedFolder(shareToken);
	const folderId = folderInfo.data?.folderId ?? "";
	const folderName = folderInfo.data?.folderName ?? "Tài liệu được chia sẻ";
	const shareDbId = folderInfo.data?.shareDbId ?? shareToken;
	const isDocument = folderInfo.data?.isDocument ?? false;
	const shareDocId = folderInfo.data?.documentId ?? "";
	const docsQuery = useSharedDocuments(folderId);
	const singleDocQuery = useSharedDocument(isDocument ? shareDocId : "");
	const docs = isDocument ? singleDocQuery.data ? [singleDocQuery.data] : [] : docsQuery.data ?? [];
	const selectedDoc = isDocument ? singleDocQuery.data ?? null : docs.find((d) => d.id === docId) ?? null;
	const saveMutation = useSaveToMyFolder();
	const myFolders = useFolders();
	const [saveDialogOpen, setSaveDialogOpen] = useState(false);
	const [saveFolderId, setSaveFolderId] = useState("");
	const [saveTitle, setSaveTitle] = useState("");
	const [saveDesc, setSaveDesc] = useState("");
	const [saveResult, setSaveResult] = useState(null);
	const [reportOpen, setReportOpen] = useState(false);
	const [reportDocId, setReportDocId] = useState("");
	const [reportDocTitle, setReportDocTitle] = useState("");
	const openDoc = (id) => {
		navigate({
			to: "/shared/$shareId",
			params: { shareId: shareToken },
			search: { docId: id }
		});
	};
	const resetSaveDialog = (isDocumentMode) => {
		setSaveFolderId("");
		if (isDocumentMode) {
			setSaveTitle(selectedDoc?.title ?? "");
			setSaveDesc(selectedDoc?.description ?? "");
		} else {
			setSaveTitle("");
			setSaveDesc("");
		}
		setSaveResult(null);
		setSaveDialogOpen(true);
	};
	const handleSave = async () => {
		if (!saveFolderId) {
			toast.error("Chọn thư mục đích");
			return;
		}
		try {
			setSaveResult(await saveMutation.mutateAsync({
				shareId: shareDbId,
				folderId: saveFolderId,
				title: saveTitle.trim() || void 0,
				description: saveDesc.trim() || void 0
			}));
		} catch {
			toast.error("Lưu thất bại");
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 h-[calc(100vh-7rem)] min-h-[480px]",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: "hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-gradient-soft p-3 border border-border/50",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm font-semibold font-display truncate",
							children: folderName
						}), /* @__PURE__ */ jsx("div", {
							className: "text-[11px] text-muted-foreground mt-0.5",
							children: isDocument ? "1 tài liệu" : (docsQuery.data?.length || 0) + " tài liệu"
						})]
					}),
					!isDocument && /* @__PURE__ */ jsxs(Button, {
						variant: "default",
						size: "sm",
						className: "mt-3 w-full bg-gradient-brand shadow-brand hover:opacity-90",
						onClick: () => resetSaveDialog(false),
						disabled: saveMutation.isPending,
						children: [/* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-1.5" }), "Lưu vào thư mục của tôi"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 flex-1 min-h-0 flex flex-col",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-[10px] font-semibold tracking-wider text-muted-foreground mb-2 px-1",
							children: "TÀI LIỆU"
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1 overflow-y-auto flex-1 -mx-1 px-1",
							children: [
								(isDocument ? singleDocQuery.isLoading : docsQuery.isLoading) && Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-9 rounded-lg" }, i)),
								docs.filter((d) => {
									if (isDocument) return true;
									const s = d.status?.toUpperCase();
									return s !== "BANNED" && s !== "REJECT" && s !== "COMPLETED";
								}).map((d) => {
									return /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1 group",
										children: [/* @__PURE__ */ jsxs("button", {
											onClick: () => !isDocument && openDoc(d.id),
											className: cn("flex items-center gap-2 text-sm px-2.5 py-2 rounded-lg transition-colors flex-1 min-w-0 text-left", (isDocument ? true : d.id === docId) ? "bg-gradient-brand text-white font-medium shadow-soft" : "hover:bg-accent text-foreground/90"),
											children: [/* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: d.title
											})]
										}), /* @__PURE__ */ jsx("button", {
											onClick: (e) => {
												e.stopPropagation();
												setReportDocId(d.id);
												setReportDocTitle(d.title);
												setReportOpen(true);
											},
											className: "h-7 w-7 shrink-0 rounded-lg flex items-center justify-center border border-border/60 text-muted-foreground/60 hover:border-red-300 hover:bg-red-500/10 hover:text-red-500 transition-all",
											title: "Báo cáo",
											children: /* @__PURE__ */ jsx(Flag, { className: "h-3.5 w-3.5" })
										})]
									}, d.id);
								}),
								!docsQuery.isLoading && !singleDocQuery.isLoading && docs.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground px-2",
									children: "Chưa có tài liệu"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
				children: selectedDoc ? /* @__PURE__ */ jsx(DocumentViewer, {
					document: selectedDoc,
					className: "flex-1 w-full h-full",
					onReport: () => {
						setReportDocId(selectedDoc.id);
						setReportDocTitle(selectedDoc.title);
						setReportOpen(true);
					}
				}) : isDocument && singleDocQuery.isLoading ? /* @__PURE__ */ jsx("div", {
					className: "flex-1 p-6 flex items-center justify-center",
					children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
				}) : /* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-y-auto p-6",
					children: docsQuery.isLoading ? /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
						children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-40 rounded-xl" }, i))
					}) : /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
						children: [docs.filter((d) => {
							const s = d.status?.toUpperCase();
							return s !== "BANNED" && s !== "REJECT" && s !== "COMPLETED";
						}).map((d) => /* @__PURE__ */ jsxs("button", {
							onClick: () => openDoc(d.id),
							className: "group flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex-1 flex items-center justify-center w-full py-4",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-16 w-16 rounded-xl bg-gradient-soft flex items-center justify-center group-hover:bg-gradient-brand transition-colors",
									children: /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-primary group-hover:text-white" })
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs font-medium text-foreground truncate w-full",
								children: d.title
							})]
						}, d.id)), docs.length === 0 && /* @__PURE__ */ jsx("div", {
							className: "col-span-full text-sm text-muted-foreground text-center py-10",
							children: "Thư mục chia sẻ chưa có tài liệu"
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: saveDialogOpen,
				onOpenChange: (open) => {
					if (!open) setSaveResult(null);
					setSaveDialogOpen(open);
				},
				children: /* @__PURE__ */ jsx(DialogContent, {
					className: "sm:max-w-lg",
					children: saveResult ? /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" }), "Kết quả lưu"]
						}), /* @__PURE__ */ jsx(DialogDescription, { children: saveResult.message })] }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-4 justify-center py-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center gap-1",
									children: [
										/* @__PURE__ */ jsx(CheckCircle2, { className: "h-8 w-8 text-green-500" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-2xl font-bold",
											children: saveResult.copied
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: "Đã sao chép"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center gap-1",
									children: [
										/* @__PURE__ */ jsx(AlertCircle, { className: "h-8 w-8 text-amber-500" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-2xl font-bold",
											children: saveResult.skipped
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: "Đã bỏ qua"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center gap-1",
									children: [
										/* @__PURE__ */ jsx(XCircle, { className: "h-8 w-8 text-red-500" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-2xl font-bold",
											children: saveResult.failed
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: "Thất bại"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, {
							onClick: () => {
								setSaveResult(null);
								setSaveDialogOpen(false);
							},
							children: "Đóng"
						}) })
					] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Save, { className: "h-5 w-5 text-primary" }), " Lưu vào thư mục của tôi"]
						}), /* @__PURE__ */ jsx(DialogDescription, { children: isDocument ? "Chọn thư mục đích và tùy chỉnh tiêu đề / mô tả" : "Chọn thư mục đích trong bộ sưu tập của bạn" })] }),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Thư mục đích" }), /* @__PURE__ */ jsxs(Select, {
									value: saveFolderId,
									onValueChange: setSaveFolderId,
									children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Chọn thư mục" }) }), /* @__PURE__ */ jsx(SelectContent, { children: (myFolders.data ?? []).map((f) => /* @__PURE__ */ jsx(SelectItem, {
										value: f.id,
										children: /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsx(FolderKanban, { className: "h-3.5 w-3.5" }),
												" ",
												f.name
											]
										})
									}, f.id)) })]
								})]
							}), isDocument && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "save-title",
									children: "Tiêu đề"
								}), /* @__PURE__ */ jsx(Input, {
									id: "save-title",
									value: saveTitle,
									onChange: (e) => setSaveTitle(e.target.value),
									placeholder: "Tiêu đề (không bắt buộc)"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "save-desc",
									children: "Mô tả"
								}), /* @__PURE__ */ jsx(Textarea, {
									id: "save-desc",
									value: saveDesc,
									onChange: (e) => setSaveDesc(e.target.value),
									placeholder: "Mô tả (không bắt buộc)",
									rows: 2
								})]
							})] })]
						}),
						/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							onClick: () => setSaveDialogOpen(false),
							children: "Hủy"
						}), /* @__PURE__ */ jsx(Button, {
							onClick: handleSave,
							disabled: saveMutation.isPending,
							className: "bg-gradient-brand shadow-brand hover:opacity-90",
							children: saveMutation.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-1 animate-spin" }), "Đang lưu..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-1" }), " Lưu"] })
						})] })
					] })
				})
			}),
			/* @__PURE__ */ jsx(ReportDocumentDialog, {
				open: reportOpen,
				onOpenChange: setReportOpen,
				documentId: reportDocId,
				documentTitle: reportDocTitle
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/shared.$shareId.tsx?tsr-split=component
function SharedRoute() {
	const { shareId } = Route.useParams();
	const { docId } = Route.useSearch();
	return /* @__PURE__ */ jsx(SharedWorkspace, {
		shareToken: shareId,
		docId
	});
}
//#endregion
export { SharedRoute as component };
