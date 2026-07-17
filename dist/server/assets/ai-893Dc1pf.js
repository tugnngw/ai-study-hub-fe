import { t as Route } from "./ai-DAvgi1BW.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-CwLzEEob.js";
import { C as useQuota, D as useRagStatus, E as useRagSessionDetail, F as useSummary, S as useQuizByDocument, T as useRagSession, a as useDeleteRagSession, c as useDocumentsByFolder, d as useFlashcardsByDocument, f as useFolder, g as useGenerateSummary, h as useGenerateQuiz, m as useGenerateFlashcards, o as useDocument, p as useFolders, w as useRagChat, x as useProcessRag, z as useUploadDocument } from "./queries-BnM1O96_.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BtjXROHi.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as DocumentActionsMenu } from "./document-actions-menu-_dgF4_qe.js";
import { t as DocumentViewer } from "./DocumentViewer-DYZHRHKl.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, FileText, FolderClosed, Infinity as Infinity$1, Info, Loader2, MessageSquare, Plus, RefreshCw, RotateCcw, Send, Shuffle, Sparkles, Trash2, Upload, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//#region src/components/ui/QuotaDisplay.tsx
function QuotaDisplay() {
	const { data, isLoading, error } = useQuota();
	if (isLoading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-28 w-full" });
	if (error) {
		console.error("Quota fetch error:", error);
		return null;
	}
	if (!data) return null;
	const { status, flashcardLimit, flashcardRemaining, questionLimit, questionRemaining, summaryLimit, summaryRemaining, chatLimit, chatRemaining } = data;
	if (status === "NO_SUBSCRIPTION" || status === "NO_PLAN" || status === "EXPIRED") return /* @__PURE__ */ jsx(Card, {
		className: "bg-yellow-50 border-yellow-200",
		children: /* @__PURE__ */ jsx(CardContent, {
			className: "p-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-yellow-800",
				children: [/* @__PURE__ */ jsx(Info, { className: "h-4 w-4" }), /* @__PURE__ */ jsxs("span", {
					className: "text-sm font-medium",
					children: [
						status === "NO_SUBSCRIPTION" && "Bạn chưa đăng ký gói dịch vụ",
						status === "NO_PLAN" && "Không thể xác định gói dịch vụ",
						status === "EXPIRED" && "Gói dịch vụ của bạn đã hết hạn"
					]
				})]
			})
		})
	});
	const renderQuotaBar = (label, limit, remaining) => {
		if (limit === -1) return /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "text-sm font-medium text-muted-foreground",
				children: [label, ":"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(Infinity$1, { className: "h-4 w-4 text-green-600" }), /* @__PURE__ */ jsx("span", {
					className: "text-sm text-green-700",
					children: "Không giới hạn"
				})]
			})]
		});
		if (limit === 0) return /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "text-sm font-medium text-muted-foreground",
				children: [label, ":"]
			}), /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-600",
				children: "Đã tắt"
			})]
		});
		const percentage = Math.max(0, (limit - remaining) / limit * 100);
		const isLow = remaining <= Math.floor(limit * .2);
		return /* @__PURE__ */ jsxs("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-medium text-muted-foreground",
					children: label
				}), /* @__PURE__ */ jsxs("span", {
					className: isLow ? "text-red-600 font-medium" : "text-muted-foreground",
					children: [
						remaining,
						"/",
						limit
					]
				})]
			}), /* @__PURE__ */ jsx(Progress, {
				value: percentage,
				className: "h-2"
			})]
		});
	};
	return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
		className: "p-4 space-y-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(Info, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm font-medium",
				children: "Hạn mức sử dụng"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [
				renderQuotaBar("Flashcard", flashcardLimit, flashcardRemaining),
				renderQuotaBar("Câu hỏi quiz", questionLimit, questionRemaining),
				renderQuotaBar("Tóm tắt", summaryLimit, summaryRemaining),
				renderQuotaBar("Chat AI", chatLimit, chatRemaining)
			]
		})]
	}) });
}
//#endregion
//#region src/features/ai/AISummary.tsx
function AISummary({ docId, onGenerate, isGenerating, summary }) {
	if (!docId) return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center h-full text-center px-6 py-12",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-4",
				children: /* @__PURE__ */ jsx(FileText, { className: "h-7 w-7 text-primary" })
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-base font-semibold mb-1",
				children: "No Document Selected"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground max-w-xs mb-5",
				children: "Select a document from the list to generate an AI Summary."
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col flex-1 min-h-0",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 overflow-y-auto p-4",
			children: isGenerating ? /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center justify-center py-16 gap-3",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Preparing knowledge..."
				})]
			}) : summary ? /* @__PURE__ */ jsx("div", {
				className: "prose prose-base dark:prose-invert max-w-none",
				children: /* @__PURE__ */ jsx(ReactMarkdown, {
					remarkPlugins: [remarkGfm],
					children: summary
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex flex-col items-center justify-center py-16 gap-4",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Click Generate to create an AI Summary for the selected document."
				})
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-4 border-t border-border space-y-3",
			children: [/* @__PURE__ */ jsx(QuotaDisplay, {}), /* @__PURE__ */ jsx("button", {
				onClick: () => onGenerate({
					documentId: docId,
					force: !!summary
				}),
				disabled: isGenerating || !docId,
				className: "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand text-white text-sm font-medium py-2.5 shadow-brand hover:opacity-90 transition-opacity disabled:opacity-50",
				children: isGenerating ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Generating..."] }) : summary ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4" }), "Regenerate Summary"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), "Generate Summary"] })
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/FlashcardViewer.tsx
function FlashcardViewer({ flashcards, isLoading }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [shuffled, setShuffled] = useState([]);
	const [isShuffled, setIsShuffled] = useState(false);
	const cards = isShuffled ? shuffled : flashcards;
	useEffect(() => {
		setCurrentIndex(0);
		setIsFlipped(false);
		setShuffled([]);
		setIsShuffled(false);
	}, [flashcards]);
	const current = cards[currentIndex];
	const goNext = useCallback(() => {
		if (currentIndex < cards.length - 1) {
			setIsFlipped(false);
			setCurrentIndex((i) => i + 1);
		}
	}, [currentIndex, cards.length]);
	const goPrev = useCallback(() => {
		if (currentIndex > 0) {
			setIsFlipped(false);
			setCurrentIndex((i) => i - 1);
		}
	}, [currentIndex]);
	const toggleFlip = useCallback(() => setIsFlipped((f) => !f), []);
	const handleShuffle = useCallback(() => {
		if (isShuffled) setIsShuffled(false);
		else {
			setShuffled([...flashcards].sort(() => Math.random() - .5));
			setIsShuffled(true);
		}
		setCurrentIndex(0);
		setIsFlipped(false);
	}, [flashcards, isShuffled]);
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "ArrowRight") goNext();
			if (e.key === "ArrowLeft") goPrev();
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				toggleFlip();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [
		goNext,
		goPrev,
		toggleFlip
	]);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center h-64",
		children: /* @__PURE__ */ jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" })
	});
	if (!flashcards.length) return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col items-center justify-center h-64 text-muted-foreground",
		children: /* @__PURE__ */ jsx("p", {
			className: "text-sm",
			children: "No flashcards yet."
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center gap-6 py-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: goPrev,
						disabled: currentIndex === 0,
						className: "disabled:opacity-30 hover:text-foreground transition-opacity",
						children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "font-medium tabular-nums min-w-[6rem] text-center",
						children: [
							currentIndex + 1,
							" / ",
							cards.length
						]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: goNext,
						disabled: currentIndex >= cards.length - 1,
						className: "disabled:opacity-30 hover:text-foreground transition-opacity",
						children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "perspective w-full max-w-lg cursor-pointer select-none",
				onClick: toggleFlip,
				style: { height: 260 },
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative w-full h-full transition-transform duration-500",
					style: {
						transformStyle: "preserve-3d",
						transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
					},
					children: [/* @__PURE__ */ jsxs("div", {
						className: "absolute inset-0 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center",
						style: {
							backfaceVisibility: "hidden",
							background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
						},
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-white/60 text-xs font-medium uppercase tracking-widest mb-4",
								children: "Definition"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white text-xl font-semibold leading-relaxed",
								children: current?.frontContent
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white/40 text-xs mt-6",
								children: "Tap to reveal"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "absolute inset-0 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center",
						style: {
							backfaceVisibility: "hidden",
							transform: "rotateY(180deg)",
							background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
						},
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-white/60 text-xs font-medium uppercase tracking-widest mb-4",
							children: "Answer"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-white text-xl font-semibold leading-relaxed",
							children: current?.backContent
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleShuffle,
					className: "gap-2",
					children: [/* @__PURE__ */ jsx(Shuffle, { className: `h-4 w-4 ${isShuffled ? "text-primary" : ""}` }), isShuffled ? "Reset" : "Shuffle"]
				}), /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => {
						setIsFlipped(false);
						setCurrentIndex(0);
					},
					className: "gap-2",
					children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" }), "Start Over"]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-[11px] text-muted-foreground",
				children: "Tap card or Space to flip | Arrow keys to navigate"
			})
		]
	});
}
//#endregion
//#region src/features/ai/FlashcardTab.tsx
function FlashcardTab({ docs, docId }) {
	const [flashcardCount, setFlashcardCount] = useState(5);
	const generateFlashcards = useGenerateFlashcards();
	const flashcardsQuery = useFlashcardsByDocument(docId ?? "");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col flex-1 min-h-0",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 overflow-y-auto p-6",
			children: /* @__PURE__ */ jsx(FlashcardViewer, {
				flashcards: flashcardsQuery.data ?? [],
				isLoading: flashcardsQuery.isLoading
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-4 border-t border-border space-y-3",
			children: [/* @__PURE__ */ jsx(QuotaDisplay, {}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium shrink-0",
						children: "Cards:"
					}),
					/* @__PURE__ */ jsx(Input, {
						type: "number",
						min: "1",
						max: "50",
						value: flashcardCount,
						onChange: (e) => {
							const v = e.target.value;
							if (v === "" || /^\d+$/.test(v)) {
								const n = parseInt(v, 10);
								setFlashcardCount(v === "" ? 0 : n > 50 ? 50 : n);
							}
						},
						onBlur: () => {
							if (flashcardCount < 1) setFlashcardCount(10);
						},
						className: "w-20"
					}),
					/* @__PURE__ */ jsx(Button, {
						disabled: generateFlashcards.isPending || !docId || flashcardCount < 1,
						onClick: () => {
							if (!docId) return toast.error("Select a document first");
							generateFlashcards.mutate({
								documentId: docId,
								numberOfCards: flashcardCount
							}, {
								onSuccess: () => {
									toast.success("Flashcards generated!");
								},
								onError: (err) => toast.error(err instanceof Error ? err.message : "Failed")
							});
						},
						className: "gap-2 flex-1",
						children: generateFlashcards.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Generating..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), "Generate Flashcards"] })
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/QuizViewer.tsx
function QuizViewer({ quizzes, isLoading }) {
	const [currentIdx, setCurrentIdx] = useState(0);
	const [answers, setAnswers] = useState(/* @__PURE__ */ new Map());
	const [revealed, setRevealed] = useState(/* @__PURE__ */ new Set());
	const [finished, setFinished] = useState(false);
	const [shuffledOptions, setShuffledOptions] = useState(/* @__PURE__ */ new Map());
	const [shuffledQuestions, setShuffledQuestions] = useState(null);
	const [isShuffled, setIsShuffled] = useState(false);
	const flatQuestions = [];
	quizzes.forEach((quiz) => {
		(quiz.questions || []).forEach((q) => flatQuestions.push({ q }));
	});
	const allQuestions = shuffledQuestions ?? flatQuestions;
	const current = allQuestions[currentIdx];
	useEffect(() => {
		const newMap = new Map(shuffledOptions);
		allQuestions.forEach(({ q }) => {
			if (!newMap.has(q.id)) {
				const opts = [
					{
						label: "A",
						content: q.optionA
					},
					{
						label: "B",
						content: q.optionB
					},
					{
						label: "C",
						content: q.optionC
					},
					{
						label: "D",
						content: q.optionD
					}
				].sort(() => Math.random() - .5);
				newMap.set(q.id, opts);
			}
		});
		setShuffledOptions(newMap);
	}, [quizzes]);
	const selected = current ? answers.get(current.q.id) : void 0;
	const isRevealed = current ? revealed.has(current.q.id) : false;
	const options = current ? shuffledOptions.get(current.q.id) ?? [] : [];
	const correctLabel = current ? shuffledOptions.get(current.q.id)?.find((o) => o.label === current.q.correctAnswer)?.label ?? "A" : void 0;
	useEffect(() => {
		setCurrentIdx(0);
		setAnswers(/* @__PURE__ */ new Map());
		setRevealed(/* @__PURE__ */ new Set());
		setFinished(false);
		setShuffledQuestions(null);
		setIsShuffled(false);
	}, [quizzes]);
	const selectAnswer = useCallback((opt) => {
		if (!current || isRevealed) return;
		const next = new Map(answers);
		next.set(current.q.id, opt);
		setAnswers(next);
		const nextRevealed = new Set(revealed);
		nextRevealed.add(current.q.id);
		setRevealed(nextRevealed);
	}, [
		current,
		isRevealed,
		answers,
		revealed
	]);
	const goNext = useCallback(() => {
		if (currentIdx < allQuestions.length - 1) setCurrentIdx((i) => i + 1);
		else setFinished(true);
	}, [currentIdx, allQuestions.length]);
	const goPrev = useCallback(() => {
		if (currentIdx > 0) setCurrentIdx((i) => i - 1);
	}, [currentIdx]);
	const reset = useCallback(() => {
		setCurrentIdx(0);
		setAnswers(/* @__PURE__ */ new Map());
		setRevealed(/* @__PURE__ */ new Set());
		setFinished(false);
	}, []);
	const toggleShuffle = useCallback(() => {
		if (isShuffled) {
			setShuffledQuestions(null);
			setIsShuffled(false);
		} else {
			setShuffledQuestions([...flatQuestions].sort(() => Math.random() - .5));
			setIsShuffled(true);
		}
		setCurrentIdx(0);
		setAnswers(/* @__PURE__ */ new Map());
		setRevealed(/* @__PURE__ */ new Set());
		setFinished(false);
	}, [isShuffled, flatQuestions]);
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "ArrowRight") goNext();
			if (e.key === "ArrowLeft") goPrev();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [goNext, goPrev]);
	if (isLoading) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center h-64",
		children: /* @__PURE__ */ jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" })
	});
	if (!allQuestions.length) return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col items-center justify-center h-64 text-muted-foreground",
		children: /* @__PURE__ */ jsx("p", {
			className: "text-sm",
			children: "No questions yet."
		})
	});
	if (finished) {
		const correctCount = allQuestions.filter((item) => {
			return answers.get(item.q.id) === shuffledOptions.get(item.q.id)?.find((o) => o.label === item.q.correctAnswer)?.label;
		}).length;
		return /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center justify-center py-8 gap-4",
			children: [
				/* @__PURE__ */ jsx(CheckCircle2, { className: "h-12 w-12 text-green-500" }),
				/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-semibold",
					children: "Quiz Complete!"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-muted-foreground",
					children: [
						correctCount,
						" / ",
						allQuestions.length,
						" correct"
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					onClick: reset,
					variant: "outline",
					className: "gap-2",
					children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" }), "Retry"]
				})
			]
		});
	}
	const q = current.q;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center gap-4 py-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: goPrev,
						disabled: currentIdx === 0,
						className: "disabled:opacity-30 hover:text-foreground",
						children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "font-medium tabular-nums min-w-[8rem] text-center",
						children: [
							"Q",
							currentIdx + 1,
							" of ",
							allQuestions.length
						]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: goNext,
						disabled: currentIdx >= allQuestions.length - 1,
						className: "disabled:opacity-30 hover:text-foreground",
						children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					onClick: toggleShuffle,
					className: "gap-1.5 text-xs",
					children: [/* @__PURE__ */ jsx("svg", {
						className: cn("h-3.5 w-3.5", isShuffled && "text-primary"),
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						children: /* @__PURE__ */ jsx("path", { d: "M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" })
					}), isShuffled ? "Reset order" : "Shuffle"]
				}), /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					onClick: reset,
					className: "gap-1.5 text-xs",
					children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" }), "Reset"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-lg p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl text-white text-center",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-xs text-white/60 mb-3",
					children: ["Question ", currentIdx + 1]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-lg font-semibold leading-relaxed",
					children: q.content
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "w-full max-w-lg space-y-3",
				children: options.map((opt) => {
					const isSelected = selected === opt.label;
					const isCorrect = correctLabel === opt.label;
					const showAsCorrect = isRevealed && isCorrect;
					const showAsWrong = isRevealed && isSelected && !isCorrect;
					return /* @__PURE__ */ jsxs("button", {
						disabled: isRevealed,
						onClick: () => selectAnswer(opt.label),
						className: cn("w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all", showAsCorrect && "border-green-500 bg-green-50 dark:bg-green-950", showAsWrong && "border-red-500 bg-red-50 dark:bg-red-950", isRevealed && !isSelected && isCorrect && selected !== void 0 && "border-green-500 bg-green-50 dark:bg-green-950", !isRevealed && isSelected && "border-indigo-400 bg-indigo-50 dark:bg-indigo-950", !isRevealed && !isSelected && "border-border bg-card hover:border-indigo-300 hover:bg-accent", isRevealed && !isCorrect && !isSelected && "opacity-50 border-border", isRevealed && isCorrect && "opacity-100"),
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-sm flex-1",
								children: opt.content
							}),
							showAsCorrect && /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-green-500 shrink-0" }),
							showAsWrong && /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5 text-red-500 shrink-0" })
						]
					}, opt.label);
				})
			}),
			isRevealed ? /* @__PURE__ */ jsx(Button, {
				onClick: goNext,
				className: "w-full max-w-lg",
				children: currentIdx < allQuestions.length - 1 ? "Next Question" : "See Results"
			}) : /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Select an answer above"
			})
		]
	});
}
//#endregion
//#region src/features/ai/QuizTab.tsx
function QuizTab({ docs, docId }) {
	const [quizCount, setQuizCount] = useState(5);
	const generateQuiz = useGenerateQuiz();
	const quizQuery = useQuizByDocument(docId ?? "");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col flex-1 min-h-0",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 overflow-y-auto p-6",
			children: /* @__PURE__ */ jsx(QuizViewer, {
				quizzes: quizQuery.data ?? [],
				isLoading: quizQuery.isLoading
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-4 border-t border-border space-y-3",
			children: [/* @__PURE__ */ jsx(QuotaDisplay, {}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium shrink-0",
						children: "Questions:"
					}),
					/* @__PURE__ */ jsx(Input, {
						type: "number",
						min: "1",
						max: "50",
						value: quizCount,
						onChange: (e) => {
							const v = e.target.value;
							if (v === "" || /^\d+$/.test(v)) {
								const n = parseInt(v, 10);
								setQuizCount(v === "" ? 0 : n > 50 ? 50 : n);
							}
						},
						onBlur: () => {
							if (quizCount < 1) setQuizCount(10);
						},
						className: "w-20"
					}),
					/* @__PURE__ */ jsx(Button, {
						disabled: generateQuiz.isPending || !docId || quizCount < 1,
						onClick: () => {
							if (!docId) return toast.error("Select a document first");
							generateQuiz.mutate({
								documentId: docId,
								numberOfQuestions: quizCount
							}, {
								onSuccess: () => {
									toast.success("Quiz generated!");
								},
								onError: (err) => toast.error(err instanceof Error ? err.message : "Failed")
							});
						},
						className: "gap-2 flex-1",
						children: generateQuiz.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Generating..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), "Generate Quiz"] })
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/AIChat.tsx
function formatBytes(n) {
	if (!n) return "0 MB";
	if (n < 1024) return `${n} B`;
	if (n < 1024 ** 2) return `${(n / 1024).toFixed(0)} KB`;
	if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(0)} MB`;
	return `${(n / 1024 ** 3).toFixed(2)} GB`;
}
function fileTone(d) {
	const name = (d.title ?? "").toLowerCase();
	if (name.endsWith(".pdf") || d.mimeType?.includes("pdf")) return {
		icon: "text-red-500",
		soft: "bg-red-50"
	};
	if (name.endsWith(".doc") || name.endsWith(".docx") || d.mimeType?.includes("word")) return {
		icon: "text-blue-500",
		soft: "bg-blue-50"
	};
	return {
		icon: "text-primary",
		soft: "bg-muted"
	};
}
function AIChat({ folderId, docId }) {
	const folder = useFolder(folderId);
	const folderDocs = useDocumentsByFolder(folderId);
	const doc = useDocument(docId ?? "");
	const chat = useRagChat();
	const navigate = useNavigate();
	const allFolders = useFolders();
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [uploadOpen, setUploadOpen] = useState(false);
	const [activeSessionId, setActiveSessionId] = useState(null);
	const sessionsQuery = useRagSession(docId ?? "");
	const sessionDetail = useRagSessionDetail(activeSessionId);
	const deleteSession = useDeleteRagSession();
	const aiStatus = useRagStatus(docId ?? "").data?.status ?? doc.data?.aiStatus ?? "NOT_STARTED";
	const sessions = sessionsQuery.data ?? [];
	useEffect(() => {
		if (sessions.length > 0) setActiveSessionId(sessions[0].id);
		else setActiveSessionId(null);
	}, [sessions, docId]);
	useEffect(() => {
		if (sessionDetail.data?.messages) setMessages(sessionDetail.data.messages.map((m) => ({
			role: m.senderType === "USER" ? "user" : "assistant",
			content: m.content
		})));
		else if (!activeSessionId) setMessages([]);
	}, [sessionDetail.data, activeSessionId]);
	const [activeTab, setActiveTab] = useState("content");
	const scrollRef = useRef(null);
	const inputRef = useRef(null);
	const [chatZoom, setChatZoom] = useState(1);
	const generateSummary = useGenerateSummary();
	const { data: cachedSummary } = useSummary(docId ?? "");
	const [summary, setSummary] = useState(null);
	useEffect(() => {
		if (cachedSummary?.markdown) setSummary(cachedSummary.markdown);
		else setSummary(null);
	}, [docId, cachedSummary?.markdown]);
	const processDoc = useProcessRag();
	const qc = useQueryClient();
	const docs = (folderDocs.data ?? []).filter((d) => d.status?.toUpperCase() !== "BANNED");
	const totalSize = docs.reduce((s, d) => s + (d.fileSize ?? 0), 0);
	const handlePrepareKnowledge = useCallback(async () => {
		if (!docId) return;
		try {
			await processDoc.mutateAsync(docId);
			qc.invalidateQueries({ queryKey: ["rag-status", docId] });
		} catch (e) {
			toast.error(`Xử lý AI thất bại: ${e instanceof Error ? e.message : "Lỗi không xác định"}`);
		}
	}, [
		docId,
		processDoc,
		qc
	]);
	const prevAiStatus = useRef(aiStatus);
	useEffect(() => {
		if (prevAiStatus.current === "PROCESSING" && aiStatus === "COMPLETED") {
			qc.invalidateQueries({ queryKey: ["documents"] });
			toast.success("AI Knowledge đã sẵn sàng!");
		}
		prevAiStatus.current = aiStatus;
	}, [aiStatus, qc]);
	useEffect(() => {
		setMessages([]);
	}, [docId]);
	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, chat.isPending]);
	useEffect(() => {
		inputRef.current?.focus();
	}, [docId]);
	const submitChat = async () => {
		if (!input.trim()) return;
		if (!docId) {
			toast.info("Chọn một tài liệu để bắt đầu trò chuyện");
			return;
		}
		const q = input.trim();
		setInput("");
		const userMsg = {
			role: "user",
			content: q
		};
		setMessages((m) => [...m, userMsg]);
		try {
			const res = await chat.mutateAsync({
				sessionId: activeSessionId ?? null,
				documentId: docId,
				question: q
			});
			if (!activeSessionId && res.sessionId) setActiveSessionId(res.sessionId);
			const aiMsg = {
				role: "assistant",
				content: res.answer
			};
			setMessages((m) => [...m, aiMsg]);
			sessionsQuery.refetch();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Đã xảy ra lỗi");
		} finally {
			inputRef.current?.focus();
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-4 h-[calc(100vh-9rem)]",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: "hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-gradient-soft p-3 border border-border/50 flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx(FolderClosed, { className: "h-4.5 w-4.5 text-white" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold font-display truncate",
									children: folder.data?.name ?? (allFolders.data ?? []).find((f) => String(f.id) === String(folderId))?.name ?? (folder.isLoading ? "Đang tải…" : "Thư mục")
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-[11px] text-muted-foreground mt-0.5",
									children: [
										formatBytes(totalSize),
										" · ",
										docs.length,
										" tài liệu"
									]
								})]
							}),
							/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("button", {
									className: "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0",
									title: "Chọn thư mục khác",
									children: /* @__PURE__ */ jsx(FolderClosed, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								className: "w-56 max-h-72 overflow-y-auto",
								children: [
									/* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Chuyển thư mục" }),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									(allFolders.data ?? []).map((f) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: () => navigate({
											to: "/ai",
											search: { folderId: String(f.id) }
										}),
										className: cn("cursor-pointer", String(f.id) === String(folderId) && "bg-accent font-medium"),
										children: [
											/* @__PURE__ */ jsx(FolderClosed, { className: "h-3.5 w-3.5 mr-2 text-muted-foreground" }),
											/* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: f.name
											}),
											String(f.id) === String(folderId) && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 ml-auto text-primary" })
										]
									}, f.id)),
									(allFolders.data ?? []).length === 0 && /* @__PURE__ */ jsx("div", {
										className: "px-2 py-1.5 text-xs text-muted-foreground",
										children: "Chưa có thư mục"
									}),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									/* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										className: "cursor-pointer",
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/folders",
											children: [/* @__PURE__ */ jsx(FolderClosed, { className: "h-3.5 w-3.5 mr-2" }), " Quản lý thư mục"]
										})
									})
								]
							})] })
						]
					}),
					/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setUploadOpen(true),
						className: "w-full justify-start gap-2 text-primary font-medium text-sm hover:gap-3 transition-all border-primary/30 hover:border-primary hover:bg-primary/5 mb-3",
						children: [/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }), " Tải lên tài liệu"]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-[10px] font-semibold tracking-wider text-muted-foreground mt-5 mb-2",
						children: "TÀI LIỆU ĐANG CÓ"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1 overflow-y-auto flex-1 -mx-1 px-1",
						children: [
							folderDocs.isLoading && Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-10 rounded-lg" }, i)),
							docs.filter((d) => d.status?.toUpperCase() !== "BANNED").map((d) => {
								const active = d.id === docId;
								const tone = fileTone(d);
								return /* @__PURE__ */ jsxs("div", {
									className: cn("group flex items-center gap-2 rounded-lg pl-2 pr-1 py-2 transition-colors", active ? "bg-red-50 border-l-2 border-red-400" : "hover:bg-accent border-l-2 border-transparent"),
									children: [/* @__PURE__ */ jsxs(Link, {
										to: "/ai",
										search: {
											folderId,
											docId: d.id
										},
										className: "flex items-center gap-2 min-w-0 flex-1",
										children: [/* @__PURE__ */ jsx(FileText, { className: cn("h-4 w-4 shrink-0", tone.icon) }), /* @__PURE__ */ jsx("span", {
											className: cn("truncate text-sm", active ? "font-medium text-foreground" : "text-foreground/90"),
											children: d.title
										})]
									}), /* @__PURE__ */ jsx(DocumentActionsMenu, {
										documentId: d.id,
										folderId,
										title: d.title,
										className: "h-6 w-6 rounded-md hover:bg-background flex items-center justify-center text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100",
										iconClassName: "h-3.5 w-3.5"
									})]
								}, d.id);
							}),
							!folderDocs.isLoading && docs.length === 0 && /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground px-2",
								children: "Chưa có tài liệu"
							})
						]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/folders",
						className: "mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white text-sm font-medium py-2.5 shadow-brand hover:opacity-90 transition-opacity",
						children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }), " Quay về"]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "px-4 pt-3 border-b border-border",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-6 overflow-x-auto",
							children: [
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("content"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "content" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "Original Content"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("summary"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "summary" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "AI Summary"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("flashcards"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "flashcards" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "AI Flashcards"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("quizzes"),
									className: cn("pb-3 text-sm font-medium border-b-2 whitespace-nowrap", activeTab === "quizzes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"),
									children: "AI Quizzes"
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => navigate({
									to: "/ai",
									search: { folderId }
								}),
								className: cn("px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0", !docId ? "bg-gradient-brand text-white" : "bg-muted text-foreground hover:bg-accent"),
								children: "All"
							}),
							docs.map((d) => /* @__PURE__ */ jsx(Link, {
								to: "/ai",
								search: {
									folderId,
									docId: d.id
								},
								className: cn("px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0", d.id === docId ? "bg-gradient-brand text-white" : "bg-brand-soft text-primary hover:bg-accent"),
								children: d.title
							}, d.id)),
							docs.length > 3 && /* @__PURE__ */ jsx("span", {
								className: "h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0",
								children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
							})
						]
					}),
					activeTab === "content" && /* @__PURE__ */ jsx("div", {
						className: "flex-1 overflow-y-auto",
						children: docId && doc.data ? /* @__PURE__ */ jsx(DocumentViewer, { document: doc.data }) : docId && !doc.data ? /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center h-full p-8",
							children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
						}) : /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-4 p-5",
							children: [
								folderDocs.isLoading && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-40 rounded-xl" }, i)),
								docs.map((d) => {
									const active = d.id === docId;
									const tone = fileTone(d);
									return /* @__PURE__ */ jsx("div", {
										className: cn("group relative flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5", active && "border-primary ring-2 ring-primary/20 shadow-soft"),
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/ai",
											search: {
												folderId,
												docId: d.id
											},
											className: "flex flex-col items-center w-full",
											children: [/* @__PURE__ */ jsx("div", {
												className: "flex-1 flex items-center justify-center w-full py-4",
												children: /* @__PURE__ */ jsx("div", {
													className: cn("h-16 w-16 rounded-xl flex items-center justify-center", tone.soft),
													children: /* @__PURE__ */ jsx(FileText, { className: cn("h-8 w-8", tone.icon) })
												})
											}), /* @__PURE__ */ jsx("div", {
												className: "text-xs font-medium text-primary truncate w-full",
												children: d.title
											})]
										})
									}, d.id);
								}),
								!folderDocs.isLoading && docs.length === 0 && /* @__PURE__ */ jsx("div", {
									className: "col-span-full text-sm text-muted-foreground text-center py-10",
									children: "Chưa có tài liệu trong thư mục này."
								})
							]
						})
					}),
					" ",
					activeTab === "summary" && (aiStatus === "NOT_STARTED" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-4 p-8",
						children: [
							/* @__PURE__ */ jsx(Sparkles, { className: "h-12 w-12 text-muted-foreground/40" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Knowledge has not been prepared."
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: handlePrepareKnowledge,
								disabled: processDoc.isPending,
								className: "bg-gradient-brand shadow-brand",
								children: processDoc.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-1" }), "Đang xử lý..."] }) : "Prepare Knowledge"
							})
						]
					}) : aiStatus === "PROCESSING" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-3 p-8",
						children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Preparing AI knowledge..."
						})]
					}) : aiStatus === "REJECT" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-4 p-8",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm text-red-500",
							children: "Knowledge preparation failed."
						}), /* @__PURE__ */ jsx(Button, {
							onClick: handlePrepareKnowledge,
							disabled: processDoc.isPending,
							variant: "outline",
							children: "Retry"
						})]
					}) : /* @__PURE__ */ jsx(AISummary, {
						docId,
						docs,
						isGenerating: generateSummary.isPending,
						summary,
						onGenerate: (opts) => generateSummary.mutate(opts, {
							onSuccess: (data) => {
								setSummary(data.markdown);
								toast.success("Summary generated!");
							},
							onError: (err) => toast.error(err.message || "Failed to generate summary")
						})
					})),
					activeTab === "flashcards" && (aiStatus === "NOT_STARTED" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-4 p-8",
						children: [
							/* @__PURE__ */ jsx(Sparkles, { className: "h-12 w-12 text-muted-foreground/40" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Knowledge has not been prepared."
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: handlePrepareKnowledge,
								disabled: processDoc.isPending,
								className: "bg-gradient-brand shadow-brand",
								children: processDoc.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-1" }), "Đang xử lý..."] }) : "Prepare Knowledge"
							})
						]
					}) : aiStatus === "PROCESSING" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-3 p-8",
						children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Preparing AI knowledge..."
						})]
					}) : aiStatus === "REJECT" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-4 p-8",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm text-red-500",
							children: "Knowledge preparation failed."
						}), /* @__PURE__ */ jsx(Button, {
							onClick: handlePrepareKnowledge,
							disabled: processDoc.isPending,
							variant: "outline",
							children: "Retry"
						})]
					}) : /* @__PURE__ */ jsx(FlashcardTab, {
						docs,
						docId
					})),
					activeTab === "quizzes" && (aiStatus === "NOT_STARTED" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-4 p-8",
						children: [
							/* @__PURE__ */ jsx(Sparkles, { className: "h-12 w-12 text-muted-foreground/40" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Knowledge has not been prepared."
							}),
							/* @__PURE__ */ jsx(Button, {
								onClick: handlePrepareKnowledge,
								disabled: processDoc.isPending,
								className: "bg-gradient-brand shadow-brand",
								children: processDoc.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-1" }), "Đang xử lý..."] }) : "Prepare Knowledge"
							})
						]
					}) : aiStatus === "PROCESSING" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-3 p-8",
						children: [/* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Preparing AI knowledge..."
						})]
					}) : aiStatus === "REJECT" ? /* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col items-center justify-center gap-4 p-8",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm text-red-500",
							children: "Knowledge preparation failed."
						}), /* @__PURE__ */ jsx(Button, {
							onClick: handlePrepareKnowledge,
							disabled: processDoc.isPending,
							variant: "outline",
							children: "Retry"
						})]
					}) : /* @__PURE__ */ jsx(QuizTab, {
						docs,
						docId
					}))
				]
			}),
			/* @__PURE__ */ jsxs("aside", {
				className: "bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "px-4 py-2 border-b border-border flex items-center gap-2",
						children: [/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs("button", {
								className: "flex items-center gap-1.5 text-sm font-semibold font-display truncate hover:opacity-80 transition-opacity shrink min-w-0",
								children: [
									/* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 shrink-0 text-primary" }),
									/* @__PURE__ */ jsx("span", {
										className: "truncate",
										children: activeSessionId ? sessions.find((s) => s.id === activeSessionId)?.title ?? "New Chat" : "New Chat"
									}),
									/* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" })
								]
							})
						}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
							align: "start",
							className: "w-64",
							children: [
								/* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Hội thoại" }),
								/* @__PURE__ */ jsxs(DropdownMenuItem, {
									onClick: () => {
										setActiveSessionId(null);
										setMessages([]);
									},
									children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }), "New Chat"]
								}),
								/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
								sessions.length === 0 && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground px-2 py-1",
									children: "Chưa có hội thoại"
								}),
								sessions.map((s) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center group",
									children: [/* @__PURE__ */ jsxs(DropdownMenuItem, {
										className: cn("flex-1 min-w-0", s.id === activeSessionId && "bg-primary/10"),
										onClick: () => setActiveSessionId(s.id),
										children: [/* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 mr-2 shrink-0" }), /* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: s.title ?? "New Chat"
										})]
									}), /* @__PURE__ */ jsx("button", {
										onClick: (e) => {
											e.stopPropagation();
											deleteSession.mutate(s.id, { onSuccess: () => {
												if (activeSessionId === s.id) {
													setActiveSessionId(null);
													setMessages([]);
												}
											} });
										},
										className: "h-7 w-7 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity mr-1",
										children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
									})]
								}, s.id))
							]
						})] }), doc.data?.title && /* @__PURE__ */ jsxs("span", {
							className: "text-xs text-muted-foreground truncate shrink-0 ml-auto max-w-[160px]",
							title: doc.data.title,
							children: [/* @__PURE__ */ jsx(FileText, { className: "h-3 w-3 inline-block mr-1 -mt-0.5" }), doc.data.title]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						ref: scrollRef,
						className: "flex-1 overflow-y-auto p-4 space-y-3",
						style: { fontSize: `${chatZoom}rem` },
						children: [messages.length === 0 ? /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center justify-center h-full text-center px-4 py-8",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3",
									children: /* @__PURE__ */ jsx(Sparkles, { className: "h-7 w-7 text-primary" })
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-base font-semibold font-display",
									children: "Trò chuyện với AI"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground mt-1 max-w-sm",
									children: activeSessionId ? "Tiếp tục trò chuyện hoặc bắt đầu hội thoại mới." : docId ? "Hỏi AI về nội dung của tài liệu đang chọn." : "Chọn một tài liệu để bắt đầu trò chuyện."
								})
							]
						}) : messages.map((m, i) => /* @__PURE__ */ jsx("div", {
							className: cn("text-[1em] rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed", m.role === "user" ? "bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft whitespace-pre-wrap" : "bg-muted text-foreground rounded-bl-md prose prose-sm dark:prose-invert prose-p:m-1 prose-pre:m-1 prose-ul:m-1 prose-ol:m-1"),
							children: m.role === "user" ? m.content : /* @__PURE__ */ jsx(ReactMarkdown, {
								remarkPlugins: [remarkGfm],
								components: {
									code: (props) => {
										const { className, children, ...rest } = props;
										const isInline = props.inline;
										return /* @__PURE__ */ jsx("code", {
											className: cn("rounded px-1.5 py-0.5", isInline ? "bg-slate-700 text-slate-100" : "block bg-slate-800 text-slate-100 overflow-x-auto p-2 my-1"),
											...rest,
											children
										});
									},
									a: ({ children, ...props }) => /* @__PURE__ */ jsx("a", {
										className: "text-blue-500 hover:underline",
										...props,
										children
									})
								},
								children: m.content
							})
						}, i)), chat.isPending && /* @__PURE__ */ jsxs("div", {
							className: "text-sm bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%] inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
								/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:200ms]" }),
								/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]" })
							]
						})]
					}),
					aiStatus === "COMPLETED" ? /* @__PURE__ */ jsxs("form", {
						onSubmit: (e) => {
							e.preventDefault();
							submitChat();
						},
						className: "p-3 border-t border-border flex gap-2",
						children: [/* @__PURE__ */ jsx(Input, {
							ref: inputRef,
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Nhập câu hỏi của bạn….",
							className: "text-sm rounded-xl bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-input",
							disabled: !docId
						}), /* @__PURE__ */ jsx(Button, {
							type: "submit",
							size: "icon",
							disabled: processDoc.isPending || !input.trim() || !docId,
							className: "bg-gradient-brand hover:opacity-90 rounded-xl shrink-0",
							children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
						})]
					}) : aiStatus === "PROCESSING" ? /* @__PURE__ */ jsxs("div", {
						className: "p-3 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Đang xử lý AI..."]
					}) : /* @__PURE__ */ jsx("div", {
						className: "p-3 border-t border-border",
						children: /* @__PURE__ */ jsx(Button, {
							className: "w-full",
							disabled: processDoc.isPending || !docId,
							onClick: () => docId && handlePrepareKnowledge(),
							children: processDoc.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Đang xử lý..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }), " Xử lý AI"] })
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(UploadDialog, {
				open: uploadOpen,
				onOpenChange: setUploadOpen,
				folderId
			})
		]
	});
}
function UploadDialog({ open, onOpenChange, folderId }) {
	const upload = useUploadDocument();
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const submit = async () => {
		if (!file) return toast.error("Chọn file");
		if (!title.trim()) return toast.error("Nhập tiêu đề");
		try {
			await upload.mutateAsync({
				file,
				folderId,
				title,
				description
			});
			toast.success("Đã tải lên");
			onOpenChange(false);
			setFile(null);
			setTitle("");
			setDescription("");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Upload failed");
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, { children: [
			/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Tải lên tài liệu" }) }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "File" }), /* @__PURE__ */ jsx(Input, {
							type: "file",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Tiêu đề" }), /* @__PURE__ */ jsx(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Mô tả" }), /* @__PURE__ */ jsx(Textarea, {
							value: description,
							onChange: (e) => setDescription(e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Huỷ"
			}), /* @__PURE__ */ jsx(Button, {
				onClick: submit,
				disabled: upload.isPending,
				children: upload.isPending ? "Đang tải…" : "Tải lên"
			})] })
		] })
	});
}
//#endregion
//#region src/routes/_authenticated/ai.tsx?tsr-split=component
function AIChatPage() {
	const { folderId, docId } = Route.useSearch();
	const navigate = useNavigate();
	const doc = useDocument(docId ?? "");
	useEffect(() => {
		if (doc.data?.status?.toUpperCase() === "BANNED") navigate({ to: "/documents" });
	}, [doc.data, navigate]);
	return /* @__PURE__ */ jsx(AIChat, {
		folderId,
		docId
	});
}
//#endregion
export { AIChatPage as component };
