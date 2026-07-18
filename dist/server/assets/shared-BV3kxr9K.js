import { t as cn } from "./utils-BlvTLkCV.js";
import { n as CardContent, t as Card } from "./card-CzWHiRuJ.js";
import { t as Input } from "./input-BoKhRU1T.js";
import { n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-CMUoSIKJ.js";
import { r as useStarredSharedDocuments } from "./preferences-D2yi1BRo.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CBPWXxKu.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BRwfIiZL.js";
import { t as sharesApi } from "./shareApi-BT85Q9Gp.js";
import { useEffect, useMemo, useState } from "react";
import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Download, Folder, FolderOpen, Link2, MoreHorizontal, Search, Star, Trash2 } from "lucide-react";
//#region src/features/shares/hooks/useShares.tsx
var PAGE_SIZE = 4;
function useShares() {
	const [withMe, setWithMe] = useState([]);
	const [byMe, setByMe] = useState([]);
	const [loading, setLoading] = useState(true);
	const [q, setQ] = useState("");
	const [sort, setSort] = useState("oldest");
	const [pageWithMe, setPageWithMe] = useState(1);
	const [pageByMe, setPageByMe] = useState(1);
	useEffect(() => {
		let alive = true;
		setLoading(true);
		Promise.all([sharesApi.getSharedWithMe(), sharesApi.getSharedByMe()]).then(([a, b]) => {
			if (alive) {
				setWithMe(a);
				setByMe(b);
			}
		}).finally(() => {
			if (alive) setLoading(false);
		});
		return () => {
			alive = false;
		};
	}, []);
	useEffect(() => {
		setPageWithMe(1);
		setPageByMe(1);
	}, [q, sort]);
	const match = (s) => s.toLowerCase().includes(q.toLowerCase());
	const sortFn = (a, b) => sort === "newest" ? b.order - a.order : a.order - b.order;
	const filteredWithMe = useMemo(() => withMe.filter((x) => match(x.name) || match(x.sharedBy.name)).sort(sortFn), [
		withMe,
		q,
		sort
	]);
	const filteredByMe = useMemo(() => byMe.filter((x) => match(x.name)).sort(sortFn), [
		byMe,
		q,
		sort
	]);
	const pagedWithMe = filteredWithMe.slice((pageWithMe - 1) * PAGE_SIZE, pageWithMe * PAGE_SIZE);
	const pagedByMe = filteredByMe.slice((pageByMe - 1) * PAGE_SIZE, pageByMe * PAGE_SIZE);
	return {
		loading,
		q,
		setQ,
		sort,
		setSort,
		withMeCount: filteredWithMe.length,
		pagedWithMe,
		pageWithMe,
		setPageWithMe,
		totalPagesWithMe: Math.max(1, Math.ceil(filteredWithMe.length / PAGE_SIZE)),
		byMeCount: filteredByMe.length,
		pagedByMe,
		pageByMe,
		setPageByMe,
		totalPagesByMe: Math.max(1, Math.ceil(filteredByMe.length / PAGE_SIZE)),
		removeWithMeLocal: (id) => setWithMe((l) => l.filter((x) => x.id !== id)),
		removeByMeLocal: (id) => setByMe((l) => l.filter((x) => x.id !== id))
	};
}
//#endregion
//#region src/features/shares/hooks/useShareActions.tsx
function useShareActions(opts) {
	const navigate = useNavigate();
	const openInAI = (id, folderId) => {
		navigate({
			to: "/ai",
			search: { folderId: folderId ?? `shared-${id}` }
		});
	};
	const download = async (id, name) => {
		try {
			const { url } = await sharesApi.getDownloadUrl(id);
			const a = document.createElement("a");
			a.href = url;
			a.download = name;
			a.target = "_blank";
			a.rel = "noopener";
			document.body.appendChild(a);
			a.click();
			a.remove();
			toast.success(`Đang tải xuống "${name}"`);
		} catch {
			toast.error("Không tải xuống được");
		}
	};
	const removeWithMe = async (id, name) => {
		try {
			await sharesApi.deleteShared(id);
			opts?.onRemovedWithMe?.(id);
			toast.success(`Đã chuyển "${name}" vào Thùng rác`);
		} catch {
			toast.error("Không xóa được");
		}
	};
	const removeByMe = async (id, name) => {
		try {
			await sharesApi.deleteShared(id);
			opts?.onRemovedByMe?.(id);
			toast.success(`Đã chuyển "${name}" vào Thùng rác`);
		} catch {
			toast.error("Không xóa được");
		}
	};
	const copyLink = async (id, name) => {
		try {
			const { url } = await sharesApi.getShareLink(id);
			await navigator.clipboard?.writeText(url);
			toast.success(`Đã sao chép link "${name}"`);
		} catch {
			toast.error("Không sao chép được link");
		}
	};
	return {
		openInAI,
		download,
		removeWithMe,
		removeByMe,
		copyLink
	};
}
//#endregion
//#region src/features/shares/components/ShareToolbar.tsx
function ShareToolbar({ q, onQ, sort, onSort, tab, onTab }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 flex-wrap",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative flex-1 min-w-[240px]",
			children: [/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
				value: q,
				onChange: (e) => onQ(e.target.value),
				placeholder: "Tìm kiếm theo thư mục, người dùng…",
				className: "pl-9"
			})]
		}), /* @__PURE__ */ jsxs(Select, {
			value: sort,
			onValueChange: (v) => onSort(v),
			children: [/* @__PURE__ */ jsx(SelectTrigger, {
				className: "w-[160px]",
				children: /* @__PURE__ */ jsx(SelectValue, {})
			}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
				value: "oldest",
				children: "Sắp xếp: Cũ nhất"
			}), /* @__PURE__ */ jsx(SelectItem, {
				value: "newest",
				children: "Sắp xếp: Mới nhất"
			})] })]
		})]
	}), /* @__PURE__ */ jsx(Tabs, {
		value: tab,
		onValueChange: (v) => onTab(v),
		children: /* @__PURE__ */ jsxs(TabsList, { children: [
			/* @__PURE__ */ jsx(TabsTrigger, {
				value: "all",
				children: "Tất cả"
			}),
			/* @__PURE__ */ jsx(TabsTrigger, {
				value: "with-me",
				children: "Được chia sẻ với tôi"
			}),
			/* @__PURE__ */ jsx(TabsTrigger, {
				value: "by-me",
				children: "Tôi đã chia sẻ"
			})
		] })
	})] });
}
//#endregion
//#region src/features/shares/components/ItemIcon.tsx
function ItemIcon() {
	return /* @__PURE__ */ jsx("div", {
		className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
		children: /* @__PURE__ */ jsx(Folder, { className: "h-4.5 w-4.5" })
	});
}
//#endregion
//#region src/features/shares/components/avatar-utils.ts
var PALETTE = [
	"#F4F0FF",
	"#EAFBF1",
	"#FFF6E7",
	"#FDEEF1",
	"#E7F4FF"
];
function avatarColor(name) {
	let h = 0;
	for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
	return PALETTE[h % PALETTE.length];
}
var initial = (n) => (n?.trim()?.[0] ?? "?").toUpperCase();
//#endregion
//#region src/features/shares/components/PersonAvatar.tsx
function PersonAvatar({ person, size = 28 }) {
	const { name, avatarUrl } = person;
	if (avatarUrl) return /* @__PURE__ */ jsx("img", {
		src: avatarUrl,
		alt: name,
		title: name,
		className: "rounded-full object-cover ring-2 ring-background shrink-0",
		style: {
			width: size,
			height: size
		}
	});
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex items-center justify-center rounded-full font-semibold text-[11px] text-foreground/70 ring-2 ring-background shrink-0",
		style: {
			width: size,
			height: size,
			backgroundColor: avatarColor(name)
		},
		title: name,
		children: initial(name)
	});
}
//#endregion
//#region src/features/shares/components/RowMenu.tsx
function RowMenu({ items }) {
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			className: "h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
			children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" })
		})
	}), /* @__PURE__ */ jsx(DropdownMenuContent, {
		align: "end",
		className: "w-44",
		children: items.map((it) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
			onClick: it.onClick,
			className: cn("cursor-pointer", it.danger && "text-destructive focus:text-destructive"),
			children: [it.icon, /* @__PURE__ */ jsx("span", {
				className: "ml-2",
				children: it.label
			})]
		}, it.label))
	})] });
}
//#endregion
//#region src/features/shares/components/Pager.tsx
function Pager({ page, totalPages, onChange }) {
	if (totalPages <= 1) return null;
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	const btn = "h-8 min-w-8 px-2 rounded-lg flex items-center justify-center text-sm transition-colors disabled:opacity-40 disabled:pointer-events-none";
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-center gap-1.5 pt-1",
		children: [
			/* @__PURE__ */ jsx("button", {
				className: cn(btn, "hover:bg-accent"),
				onClick: () => onChange(page - 1),
				disabled: page === 1,
				"aria-label": "Trang trước",
				children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
			}),
			pages.map((p) => /* @__PURE__ */ jsx("button", {
				onClick: () => onChange(p),
				className: cn(btn, p === page ? "bg-gradient-brand text-white shadow-brand font-medium" : "hover:bg-accent text-muted-foreground"),
				children: p
			}, p)),
			/* @__PURE__ */ jsx("button", {
				className: cn(btn, "hover:bg-accent"),
				onClick: () => onChange(page + 1),
				disabled: page === totalPages,
				"aria-label": "Trang sau",
				children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
			})
		]
	});
}
//#endregion
//#region src/features/shares/components/SharedWithMeTable.tsx
function SharedWithMeTable({ items, count, page, totalPages, onPage, onOpen, onDownload, onRemove }) {
	const { isMarked: isStarred, toggle: toggleStar } = useStarredSharedDocuments();
	const sortedItems = [...items].sort((a, b) => Number(isStarred(b.id)) - Number(isStarred(a.id)));
	return /* @__PURE__ */ jsxs("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "flex items-center gap-2 font-bold",
				children: ["Được chia sẻ với tôi", /* @__PURE__ */ jsx("span", {
					className: "inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground",
					children: count
				})]
			}),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "p-0",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-[28px_1fr_220px_160px_44px] items-center px-4 h-11 bg-muted/40 rounded-t-xl text-xs font-semibold text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx("div", {}),
						/* @__PURE__ */ jsx("div", { children: "Tên tài liệu" }),
						/* @__PURE__ */ jsx("div", { children: "Được chia sẻ bởi" }),
						/* @__PURE__ */ jsx("div", { children: "Thời gian" }),
						/* @__PURE__ */ jsx("div", {})
					]
				}), count === 0 ? /* @__PURE__ */ jsx("div", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Không có mục nào"
				}) : sortedItems.map((it, i) => {
					const starred = isStarred(it.id);
					return /* @__PURE__ */ jsxs("div", {
						className: cn("grid grid-cols-[28px_1fr_220px_160px_44px] items-center px-4 py-3 hover:bg-muted/30 transition-colors", i !== sortedItems.length - 1 && "border-b border-border"),
						children: [
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => toggleStar(it.id),
								title: starred ? "Bỏ gắn sao" : "Gắn sao",
								className: "h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent shrink-0",
								children: /* @__PURE__ */ jsx(Star, { className: cn("h-4 w-4", starred && "fill-amber-400 text-amber-500") })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ jsx(ItemIcon, {}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-medium truncate",
										children: it.name
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-xs text-muted-foreground",
										children: [
											it.size,
											" · ",
											it.items,
											" mục"
										]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 min-w-0",
								children: [/* @__PURE__ */ jsx(PersonAvatar, { person: it.sharedBy }), /* @__PURE__ */ jsx("span", {
									className: "text-sm truncate",
									children: it.sharedBy.name
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-muted-foreground",
								children: it.time
							}),
							/* @__PURE__ */ jsx(RowMenu, { items: [
								{
									icon: /* @__PURE__ */ jsx(FolderOpen, { className: "h-4 w-4" }),
									label: "Mở",
									onClick: () => onOpen(it.id)
								},
								{
									icon: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
									label: "Tải xuống",
									onClick: () => onDownload(it.id, it.name)
								},
								{
									icon: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
									label: "Xóa",
									danger: true,
									onClick: () => onRemove(it.id, it.name)
								},
								{
									icon: /* @__PURE__ */ jsx(Star, { className: cn("h-4 w-4", starred && "fill-amber-400 text-amber-500") }),
									label: starred ? "Bỏ gắn sao" : "Gắn sao",
									onClick: () => toggleStar(it.id)
								}
							] })
						]
					}, it.id);
				})]
			}) }),
			/* @__PURE__ */ jsx(Pager, {
				page,
				totalPages,
				onChange: onPage
			})
		]
	});
}
//#endregion
//#region src/features/shares/components/SharedByMeTable.tsx
function SharedByMeTable({ items, count, page, totalPages, onPage, onOpen, onCopyLink, onRemove }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "flex items-center gap-2 font-bold",
				children: ["Tôi đã chia sẻ", /* @__PURE__ */ jsx("span", {
					className: "inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground",
					children: count
				})]
			}),
			/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
				className: "p-0",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-[1fr_220px_160px_44px] items-center px-4 h-11 bg-muted/40 rounded-t-xl text-xs font-semibold text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx("div", { children: "Tên tài liệu" }),
						/* @__PURE__ */ jsx("div", { children: "Chia sẻ với" }),
						/* @__PURE__ */ jsx("div", { children: "Thời gian" }),
						/* @__PURE__ */ jsx("div", {})
					]
				}), count === 0 ? /* @__PURE__ */ jsx("div", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Không có mục nào"
				}) : items.map((it, i) => /* @__PURE__ */ jsxs("div", {
					className: cn("grid grid-cols-[1fr_220px_160px_44px] items-center px-4 py-3 hover:bg-muted/30 transition-colors", i !== items.length - 1 && "border-b border-border"),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ jsx(ItemIcon, {}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-medium truncate",
									children: it.name
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-xs text-muted-foreground",
									children: [
										it.size,
										" · ",
										it.items,
										" mục"
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [
								it.sharedWith[0] && /* @__PURE__ */ jsx(PersonAvatar, { person: it.sharedWith[0] }),
								/* @__PURE__ */ jsx("span", {
									className: "text-sm truncate",
									children: it.sharedWith[0]?.name ?? "—"
								}),
								it.sharedWith.length > 1 && /* @__PURE__ */ jsxs("span", {
									className: "text-xs font-medium text-muted-foreground shrink-0",
									children: ["+", it.sharedWith.length - 1]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground",
							children: it.time
						}),
						/* @__PURE__ */ jsx(RowMenu, { items: [
							{
								icon: /* @__PURE__ */ jsx(FolderOpen, { className: "h-4 w-4" }),
								label: "Mở",
								onClick: () => onOpen(it.id)
							},
							{
								icon: /* @__PURE__ */ jsx(Link2, { className: "h-4 w-4" }),
								label: "Sao chép link",
								onClick: () => onCopyLink(it.id, it.name)
							},
							{
								icon: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
								label: "Xóa",
								danger: true,
								onClick: () => onRemove(it.id, it.name)
							}
						] })
					]
				}, it.id))]
			}) }),
			/* @__PURE__ */ jsx(Pager, {
				page,
				totalPages,
				onChange: onPage
			})
		]
	});
}
//#endregion
//#region src/features/shares/components/SharePage.tsx
function SharePage() {
	const s = useShares();
	const [tab, setTab] = useState("all");
	const navigate = useNavigate();
	const actions = useShareActions({
		onRemovedWithMe: s.removeWithMeLocal,
		onRemovedByMe: s.removeByMeLocal,
		onOpenInAI: (folderId) => {}
	});
	const showWithMe = tab === "all" || tab === "with-me";
	const showByMe = tab === "all" || tab === "by-me";
	const handleOpenWithMe = (shareToken) => {
		navigate({
			to: "/shared/$shareId",
			params: { shareId: shareToken }
		});
	};
	const handleOpenByMe = (shareToken) => {
		navigate({
			to: "/shared/$shareId",
			params: { shareId: shareToken }
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold tracking-tight font-display",
				children: "Chia sẻ"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: "Quản lý tài liệu bạn được chia sẻ và những tài liệu bạn đã chia sẻ"
			})] }),
			/* @__PURE__ */ jsx(ShareToolbar, {
				q: s.q,
				onQ: s.setQ,
				sort: s.sort,
				onSort: s.setSort,
				tab,
				onTab: setTab
			}),
			showWithMe && /* @__PURE__ */ jsx(SharedWithMeTable, {
				items: s.pagedWithMe,
				count: s.withMeCount,
				page: s.pageWithMe,
				totalPages: s.totalPagesWithMe,
				onPage: s.setPageWithMe,
				onOpen: (id) => {
					handleOpenWithMe(id);
				},
				onDownload: actions.download,
				onRemove: actions.removeWithMe
			}),
			showByMe && /* @__PURE__ */ jsx(SharedByMeTable, {
				items: s.pagedByMe,
				count: s.byMeCount,
				page: s.pageByMe,
				totalPages: s.totalPagesByMe,
				onPage: s.setPageByMe,
				onOpen: (id) => {
					handleOpenByMe(id);
				},
				onCopyLink: actions.copyLink,
				onRemove: actions.removeByMe
			})
		]
	});
}
//#endregion
//#region src/routes/_authenticated/shared.tsx?tsr-split=component
function SharedLayout() {
	if (useMatchRoute()({ to: "/shared" })) return /* @__PURE__ */ jsx(SharePage, {});
	return /* @__PURE__ */ jsx(Outlet, {});
}
//#endregion
export { SharedLayout as component };
