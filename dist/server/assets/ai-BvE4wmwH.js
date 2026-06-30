import { o as quizApi } from "./realApi-Id31-bN7.js";
import { t as Route } from "./ai-BPMCDuxa.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import {
  a as useDocument,
  d as useFolder,
  p as useGenerateFlashcards,
  s as useDocumentsByFolder,
  t as useAskRag,
  u as useFlashcardsByDocument,
  v as useUpdateFlashcardProgress,
} from "./queries-FJFABj7o.js";
import {
  a as SelectValue,
  i as SelectTrigger,
  n as SelectContent,
  r as SelectItem,
  t as Select,
} from "./select-Dg1urBTx.js";
import { t as usePinnedDocuments } from "./preferences-D2yi1BRo.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as DocumentActionsMenu } from "./document-actions-menu-DgSr9x6K.js";
import { t as DocumentViewer } from "./DocumentViewer-CFF__tti.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Files,
  Filter,
  FolderClosed,
  Loader2,
  Pin,
  RotateCw,
  Send,
  Settings2,
  Shuffle,
  Sparkles,
  X,
} from "lucide-react";
//#region src/components/document-workspace/QuizzesTab.tsx
var TYPE_LABELS = {
  multiple_choice: "Trắc nghiệm (1 đáp án)",
  true_false: "Đúng / Sai",
  multiple_answer: "Nhiều đáp án",
};
function QuizzesTab({ folderId, docId, title }) {
  const docs = useDocumentsByFolder(folderId).data ?? [];
  const [scope, setScope] = useState(docId ?? "all");
  const [types, setTypes] = useState(["multiple_choice"]);
  const [count, setCount] = useState(5);
  useEffect(() => {
    setScope(docId ?? "all");
  }, [docId]);
  const [phase, setPhase] = useState("setup");
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const toggleType = (t) =>
    setTypes((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t],
    );
  const generate = async () => {
    if (types.length === 0) {
      toast.error("Chọn ít nhất 1 loại câu hỏi");
      return;
    }
    setLoading(true);
    try {
      const opts = {
        scope,
        types,
        questionCount: count,
      };
      setQuizzes(await quizApi.generateAdvanced(opts));
      setAnswers({});
      setSubmitted(false);
      setPhase("doing");
    } catch {
      toast.error("Tạo quiz thất bại");
    } finally {
      setLoading(false);
    }
  };
  const score = useMemo(
    () =>
      quizzes.reduce((s, q, i) => {
        const picked = (answers[i] ?? []).slice().sort().join(",");
        const correct = q.correctAnswers.slice().sort().join(",");
        return picked && picked === correct ? s + 1 : s;
      }, 0),
    [answers, quizzes],
  );
  const pick = (qi, oi, multi) => {
    setAnswers((a) => {
      const cur = a[qi] ?? [];
      if (multi)
        return {
          ...a,
          [qi]: cur.includes(oi) ? cur.filter((x) => x !== oi) : [...cur, oi],
        };
      return {
        ...a,
        [qi]: [oi],
      };
    });
  };
  if (phase === "setup")
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-full flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "space-y-6 w-full max-w-md",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsxs("h2", {
                className:
                  "text-xl font-bold flex items-center gap-2 text-gradient-brand font-display",
                children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }),
                  " Tạo AI Quiz",
                ],
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-xs text-muted-foreground mt-1",
                children: "Tùy chỉnh trước khi tạo bộ câu hỏi",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [
              /* @__PURE__ */ jsxs("label", {
                className: "text-sm font-semibold flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(Files, { className: "h-4 w-4" }),
                  " Tài liệu tham chiếu",
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "grid gap-2",
                children: [
                  /* @__PURE__ */ jsxs("button", {
                    onClick: () => setScope("all"),
                    className: cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                      scope === "all"
                        ? "border-primary bg-brand-soft/60"
                        : "border-border hover:bg-accent",
                    ),
                    children: [
                      /* @__PURE__ */ jsx(Files, { className: "h-4 w-4" }),
                      " Tất cả tài liệu trong thư mục",
                      /* @__PURE__ */ jsxs("span", {
                        className: "ml-auto text-xs text-muted-foreground",
                        children: [docs.length, " tệp"],
                      }),
                    ],
                  }),
                  docs.map((d) =>
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setScope(d.id),
                        className: cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                          scope === d.id
                            ? "border-primary bg-brand-soft/60"
                            : "border-border hover:bg-accent",
                        ),
                        children: [
                          /* @__PURE__ */ jsx(FileText, {
                            className: "h-4 w-4 shrink-0",
                          }),
                          " ",
                          /* @__PURE__ */ jsx("span", {
                            className: "truncate",
                            children: d.title,
                          }),
                        ],
                      },
                      d.id,
                    ),
                  ),
                  docs.length === 0 &&
                    /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-muted-foreground",
                      children: "Thư mục chưa có tài liệu.",
                    }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [
              /* @__PURE__ */ jsxs("label", {
                className: "text-sm font-semibold flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(Settings2, { className: "h-4 w-4" }),
                  " Loại câu hỏi",
                ],
              }),
              /* @__PURE__ */ jsx("div", {
                className: "grid gap-2",
                children: Object.keys(TYPE_LABELS).map((t) =>
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => toggleType(t),
                      className: cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                        types.includes(t)
                          ? "border-primary bg-brand-soft/60"
                          : "border-border hover:bg-accent",
                      ),
                      children: [
                        /* @__PURE__ */ jsx("span", {
                          className: cn(
                            "h-4 w-4 rounded border flex items-center justify-center",
                            types.includes(t)
                              ? "bg-gradient-brand border-transparent"
                              : "border-border",
                          ),
                          children:
                            types.includes(t) &&
                            /* @__PURE__ */ jsx(Check, {
                              className: "h-3 w-3 text-white",
                            }),
                        }),
                        TYPE_LABELS[t],
                      ],
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [
              /* @__PURE__ */ jsxs("label", {
                className: "text-sm font-semibold",
                children: [
                  "Số câu hỏi: ",
                  /* @__PURE__ */ jsx("span", {
                    className: "text-gradient-brand",
                    children: count,
                  }),
                ],
              }),
              /* @__PURE__ */ jsx("input", {
                type: "range",
                min: 3,
                max: 20,
                value: count,
                onChange: (e) => setCount(Number(e.target.value)),
                className: "w-full accent-[var(--primary)]",
              }),
            ],
          }),
          /* @__PURE__ */ jsx(Button, {
            onClick: generate,
            disabled: loading,
            className: "w-full bg-gradient-brand shadow-brand",
            children: loading
              ? /* @__PURE__ */ jsxs(Fragment, {
                  children: [
                    /* @__PURE__ */ jsx(Loader2, {
                      className: "h-4 w-4 mr-2 animate-spin",
                    }),
                    " Đang tạo…",
                  ],
                })
              : /* @__PURE__ */ jsxs(Fragment, {
                  children: [
                    /* @__PURE__ */ jsx(Sparkles, {
                      className: "h-4 w-4 mr-2",
                    }),
                    " Tạo Quiz",
                  ],
                }),
          }),
        ],
      }),
    });
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsxs("h2", {
                className:
                  "text-xl font-bold flex items-center gap-2 text-gradient-brand font-display",
                children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }),
                  " AI Quizzes",
                ],
              }),
              /* @__PURE__ */ jsxs("p", {
                className: "text-xs text-muted-foreground mt-1",
                children: [
                  scope === "all" ? `Toàn bộ thư mục` : `Từ "${title}"`,
                  " · ",
                  quizzes.length,
                  " câu",
                ],
              }),
            ],
          }),
          submitted &&
            /* @__PURE__ */ jsxs("div", {
              className: "text-sm font-semibold",
              children: [
                "Điểm: ",
                /* @__PURE__ */ jsxs("span", {
                  className: "text-gradient-brand",
                  children: [score, " / ", quizzes.length],
                }),
              ],
            }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "space-y-4",
        children: quizzes.map((quiz, qi) => {
          const multi = quiz.type === "multiple_answer";
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-lg border border-border p-4",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  className: "font-medium text-sm mb-1",
                  children: ["Câu ", qi + 1, ". ", quiz.question],
                }),
                /* @__PURE__ */ jsx("div", {
                  className: "text-[11px] text-muted-foreground mb-3",
                  children: TYPE_LABELS[quiz.type],
                }),
                /* @__PURE__ */ jsx("div", {
                  className: "space-y-2",
                  children: quiz.options.map((opt, oi) => {
                    const picked = (answers[qi] ?? []).includes(oi);
                    const isCorrect = quiz.correctAnswers.includes(oi);
                    const showCorrect = submitted && isCorrect;
                    const showWrong = submitted && picked && !isCorrect;
                    return /* @__PURE__ */ jsxs(
                      "button",
                      {
                        disabled: submitted,
                        onClick: () => pick(qi, oi, multi),
                        className: cn(
                          "w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors",
                          showCorrect && "border-emerald-400 bg-emerald-50/60",
                          showWrong && "border-red-400 bg-red-50/60",
                          !submitted &&
                            picked &&
                            "border-primary bg-brand-soft/60",
                          !submitted &&
                            !picked &&
                            "border-border hover:bg-accent",
                        ),
                        children: [
                          /* @__PURE__ */ jsx("span", {
                            className: cn(
                              "h-5 w-5 flex items-center justify-center text-[10px] font-bold shrink-0 border",
                              multi ? "rounded" : "rounded-full",
                              showCorrect &&
                                "bg-emerald-500 text-white border-emerald-500",
                              showWrong &&
                                "bg-red-500 text-white border-red-500",
                              !submitted &&
                                picked &&
                                "bg-gradient-brand text-white border-transparent",
                            ),
                            children: showCorrect
                              ? /* @__PURE__ */ jsx(Check, {
                                  className: "h-3 w-3",
                                })
                              : showWrong
                                ? /* @__PURE__ */ jsx(X, {
                                    className: "h-3 w-3",
                                  })
                                : String.fromCharCode(65 + oi),
                          }),
                          /* @__PURE__ */ jsx("span", { children: opt }),
                        ],
                      },
                      oi,
                    );
                  }),
                }),
              ],
            },
            qi,
          );
        }),
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex justify-between gap-2",
        children: [
          /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            onClick: () => setPhase("setup"),
            children: "← Tùy chọn",
          }),
          submitted
            ? /* @__PURE__ */ jsxs(Button, {
                variant: "outline",
                onClick: () => {
                  setAnswers({});
                  setSubmitted(false);
                },
                children: [
                  /* @__PURE__ */ jsx(RotateCw, { className: "h-4 w-4 mr-2" }),
                  " Làm lại",
                ],
              })
            : /* @__PURE__ */ jsx(Button, {
                onClick: () => {
                  if (Object.keys(answers).length < quizzes.length) {
                    toast.error("Vui lòng trả lời tất cả câu hỏi");
                    return;
                  }
                  setSubmitted(true);
                },
                children: "Nộp bài",
              }),
        ],
      }),
    ],
  });
}
//#endregion
//#region src/components/document-workspace/FlashcardsTab.tsx
function progressKey(documentId) {
  return `ai-study-hub:flashcard-progress:${documentId}`;
}
function loadProgress(documentId) {
  try {
    const raw = window.localStorage.getItem(progressKey(documentId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveProgress(documentId, map) {
  try {
    window.localStorage.setItem(progressKey(documentId), JSON.stringify(map));
  } catch {}
}
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
var STATUS_LABEL = {
  all: "Tất cả",
  new: "Mới",
  learning: "Đang học",
  mastered: "Đã thuộc",
};
function FlashcardsTab({ documentId, title }) {
  const { data, isLoading } = useFlashcardsByDocument(documentId);
  const generate = useGenerateFlashcards();
  const updateProgress = useUpdateFlashcardProgress();
  const [order, setOrder] = useState([]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState("all");
  const [progress, setProgress] = useState({});
  const cards = data ?? [];
  useEffect(() => {
    if (!documentId) return;
    setProgress(loadProgress(documentId));
    setFilter("all");
    setFlipped(false);
  }, [documentId]);
  useEffect(() => {
    setOrder(
      cards
        .map((_, i) => i)
        .filter(
          (i) =>
            filter === "all" || (progress[cards[i].id] ?? "new") === filter,
        ),
    );
    setPos(0);
    setFlipped(false);
  }, [cards.length, filter, documentId]);
  const current = order.length > 0 ? cards[order[pos]] : void 0;
  const currentStatus = current ? (progress[current.id] ?? "new") : "new";
  const counts = useMemo(() => {
    const c = {
      all: cards.length,
      new: 0,
      learning: 0,
      mastered: 0,
    };
    cards.forEach((card) => {
      const s = progress[card.id] ?? "new";
      c[s]++;
    });
    return c;
  }, [cards, progress]);
  const goNext = () => {
    if (order.length === 0) return;
    setFlipped(false);
    setPos((p) => (p + 1) % order.length);
  };
  const goPrev = () => {
    if (order.length === 0) return;
    setFlipped(false);
    setPos((p) => (p - 1 + order.length) % order.length);
  };
  const handleShuffle = () => {
    setOrder((o) => shuffleArray(o));
    setPos(0);
    setFlipped(false);
  };
  const markStatus = (status) => {
    if (!current) return;
    const next = {
      ...progress,
      [current.id]: status,
    };
    setProgress(next);
    saveProgress(documentId, next);
    updateProgress.mutate({
      flashcardId: current.id,
      status,
      documentId,
    });
  };
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [order.length]);
  if (!documentId)
    return /* @__PURE__ */ jsx("div", {
      className: "text-sm text-muted-foreground text-center mt-16",
      children: "Chọn một tài liệu để xem flashcards.",
    });
  if (isLoading)
    return /* @__PURE__ */ jsx("div", {
      className: "flex items-center justify-center h-64",
      children: /* @__PURE__ */ jsx(Loader2, {
        className: "h-8 w-8 animate-spin text-primary",
      }),
    });
  if (cards.length === 0)
    return /* @__PURE__ */ jsxs("div", {
      className:
        "flex flex-col items-center justify-center h-64 gap-3 text-center",
      children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-8 w-8 text-primary/60" }),
        /* @__PURE__ */ jsxs("p", {
          className: "text-sm text-muted-foreground",
          children: ['Chưa có flashcards cho tài liệu "', title, '".'],
        }),
        /* @__PURE__ */ jsxs(Button, {
          size: "sm",
          onClick: () => generate.mutate(documentId),
          disabled: generate.isPending,
          className: "bg-gradient-brand text-white",
          children: [
            generate.isPending
              ? /* @__PURE__ */ jsx(Loader2, {
                  className: "h-4 w-4 mr-2 animate-spin",
                })
              : /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
            "Tạo Flashcards bằng AI",
          ],
        }),
      ],
    });
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between gap-3 flex-wrap",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsxs("h2", {
                className:
                  "text-xl font-bold flex items-center gap-2 text-gradient-brand font-display",
                children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }),
                  " AI Flashcards",
                ],
              }),
              /* @__PURE__ */ jsxs("p", {
                className: "text-xs text-muted-foreground mt-1",
                children: [
                  'Thẻ ghi nhớ từ "',
                  title,
                  '" — bấm vào thẻ để lật mặt, dùng ← → để chuyển thẻ',
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Filter, {
                className: "h-3.5 w-3.5 text-muted-foreground",
              }),
              /* @__PURE__ */ jsxs(Select, {
                value: filter,
                onValueChange: (v) => setFilter(v),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, {
                    className: "h-8 w-[150px] text-xs",
                    children: /* @__PURE__ */ jsx(SelectValue, {}),
                  }),
                  /* @__PURE__ */ jsx(SelectContent, {
                    children: Object.keys(STATUS_LABEL).map((s) =>
                      /* @__PURE__ */ jsxs(
                        SelectItem,
                        {
                          value: s,
                          className: "text-xs",
                          children: [STATUS_LABEL[s], " (", counts[s], ")"],
                        },
                        s,
                      ),
                    ),
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Button, {
                size: "sm",
                variant: "outline",
                onClick: handleShuffle,
                disabled: order.length < 2,
                title: "Xáo trộn thẻ",
                children: /* @__PURE__ */ jsx(Shuffle, {
                  className: "h-3.5 w-3.5",
                }),
              }),
              /* @__PURE__ */ jsx(Button, {
                size: "sm",
                variant: "outline",
                onClick: () => generate.mutate(documentId),
                disabled: generate.isPending,
                title: "Tạo thêm flashcards bằng AI",
                children: generate.isPending
                  ? /* @__PURE__ */ jsx(Loader2, {
                      className: "h-3.5 w-3.5 animate-spin",
                    })
                  : /* @__PURE__ */ jsx(RotateCw, { className: "h-3.5 w-3.5" }),
              }),
            ],
          }),
        ],
      }),
      !current
        ? /* @__PURE__ */ jsxs("div", {
            className:
              "flex flex-col items-center justify-center h-48 gap-2 text-center text-sm text-muted-foreground",
            children: [
              'Không có thẻ nào khớp với bộ lọc "',
              STATUS_LABEL[filter],
              '".',
            ],
          })
        : /* @__PURE__ */ jsxs(Fragment, {
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "text-xs text-muted-foreground text-right",
                children: [pos + 1, " / ", order.length],
              }),
              /* @__PURE__ */ jsxs("button", {
                onClick: () => setFlipped((f) => !f),
                className:
                  "w-full min-h-[220px] rounded-xl border-2 border-primary/20 bg-gradient-soft p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md [perspective:1000px]",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    className:
                      "text-[11px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2",
                    children: [
                      flipped ? "Định nghĩa" : "Thuật ngữ",
                      /* @__PURE__ */ jsx("span", {
                        className: cn(
                          "px-1.5 py-0.5 rounded-full text-[9px] font-medium",
                          currentStatus === "mastered" &&
                            "bg-emerald-500/15 text-emerald-600",
                          currentStatus === "learning" &&
                            "bg-amber-500/15 text-amber-600",
                          currentStatus === "new" &&
                            "bg-muted text-muted-foreground",
                        ),
                        children: STATUS_LABEL[currentStatus],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className: cn(
                      "font-semibold",
                      flipped ? "text-base leading-relaxed" : "text-2xl",
                    ),
                    children: flipped
                      ? current.backContent
                      : current.frontContent,
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className: "text-xs text-muted-foreground mt-4",
                    children: "Bấm để lật thẻ",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                  /* @__PURE__ */ jsxs(Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: goPrev,
                    disabled: order.length < 2,
                    children: [
                      /* @__PURE__ */ jsx(ChevronLeft, {
                        className: "h-4 w-4 mr-1",
                      }),
                      " Trước",
                    ],
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsx(Button, {
                        size: "sm",
                        variant:
                          currentStatus === "learning" ? "default" : "outline",
                        onClick: () => markStatus("learning"),
                        className: "text-xs h-8",
                        children: "Đang học",
                      }),
                      /* @__PURE__ */ jsxs(Button, {
                        size: "sm",
                        variant:
                          currentStatus === "mastered" ? "default" : "outline",
                        onClick: () => markStatus("mastered"),
                        className: cn(
                          "text-xs h-8",
                          currentStatus === "mastered" &&
                            "bg-emerald-600 hover:bg-emerald-600/90",
                        ),
                        children: [
                          /* @__PURE__ */ jsx(Check, {
                            className: "h-3.5 w-3.5 mr-1",
                          }),
                          " Đã thuộc",
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs(Button, {
                    size: "sm",
                    onClick: goNext,
                    disabled: order.length < 2,
                    children: [
                      "Tiếp ",
                      /* @__PURE__ */ jsx(ChevronRight, {
                        className: "h-4 w-4 ml-1",
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx("div", {
                className: "flex gap-1 justify-center flex-wrap",
                children: order.map((cardIdx, i) =>
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setPos(i);
                        setFlipped(false);
                      },
                      className: cn(
                        "h-1.5 rounded-full transition-all",
                        i === pos
                          ? "w-6 bg-gradient-brand"
                          : "w-1.5 bg-muted hover:bg-muted-foreground/40",
                      ),
                    },
                    cards[cardIdx].id,
                  ),
                ),
              }),
            ],
          }),
    ],
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
  if (name.endsWith(".pdf") || d.mimeType?.includes("pdf"))
    return {
      icon: "text-red-500",
      soft: "bg-red-50",
    };
  if (
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    d.mimeType?.includes("word")
  )
    return {
      icon: "text-blue-500",
      soft: "bg-blue-50",
    };
  return {
    icon: "text-primary",
    soft: "bg-muted",
  };
}
function AIChat({ folderId, docId }) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const doc = useDocument(docId ?? 0);
  const ask = useAskRag();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const { isMarked: isPinned } = usePinnedDocuments();
  const docs = [...(folderDocs.data ?? [])].sort(
    (a, b) => Number(isPinned(b.id)) - Number(isPinned(a.id)),
  );
  const totalSize = docs.reduce((s, d) => s + (d.fileSize ?? 0), 0);
  useEffect(() => {
    setMessages([]);
  }, [docId]);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, ask.isPending]);
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
    setMessages((m) => [
      ...m,
      {
        role: "user",
        content: q,
      },
    ]);
    try {
      const res = await ask.mutateAsync({
        id: docId,
        question: q,
      });
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: res.answer,
        },
      ]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Đã xảy ra lỗi");
    } finally {
      inputRef.current?.focus();
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className:
      "grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_360px] gap-4 h-[calc(100vh-9rem)] w-full",
    children: [
      /* @__PURE__ */ jsxs("aside", {
        className:
          "hidden lg:flex flex-col h-full bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "text-[10px] font-semibold tracking-wider text-muted-foreground mb-2",
            children: "THƯ MỤC ĐANG DÙNG",
          }),
          /* @__PURE__ */ jsxs("div", {
            className:
              "rounded-xl bg-gradient-soft p-3 border border-border/50 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsx("div", {
                className:
                  "h-9 w-9 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0",
                children: /* @__PURE__ */ jsx(FolderClosed, {
                  className: "h-4.5 w-4.5 text-white",
                }),
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className: "text-sm font-semibold font-display truncate",
                    children: folder.data?.name ?? "—",
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "text-[11px] text-muted-foreground",
                    children: [
                      formatBytes(totalSize),
                      " · ",
                      docs.length,
                      " tài liệu",
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Link, {
                to: "/folders",
                className:
                  "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0",
                title: "Quản lý thư mục",
                children: /* @__PURE__ */ jsx(FolderClosed, {
                  className: "h-4 w-4",
                }),
              }),
            ],
          }),
          /* @__PURE__ */ jsx("div", {
            className:
              "text-[10px] font-semibold tracking-wider text-muted-foreground mt-5 mb-2",
            children: "TÀI LIỆU ĐANG CÓ",
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-1 overflow-y-auto flex-1 -mx-1 px-1",
            children: [
              folderDocs.isLoading &&
                Array.from({ length: 4 }).map((_, i) =>
                  /* @__PURE__ */ jsx(
                    Skeleton,
                    { className: "h-10 rounded-lg" },
                    i,
                  ),
                ),
              docs.map((d) => {
                const active = d.id === docId;
                const tone = fileTone(d);
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "group flex items-center gap-2 rounded-lg pl-2 pr-1 py-2 transition-colors",
                      active
                        ? "bg-red-50 border-l-2 border-red-400"
                        : "hover:bg-accent border-l-2 border-transparent",
                    ),
                    children: [
                      /* @__PURE__ */ jsxs(Link, {
                        to: "/ai",
                        search: {
                          folderId,
                          docId: d.id,
                        },
                        className: "flex items-center gap-2 min-w-0 flex-1",
                        children: [
                          /* @__PURE__ */ jsx(FileText, {
                            className: cn("h-4 w-4 shrink-0", tone.icon),
                          }),
                          /* @__PURE__ */ jsx("span", {
                            className: cn(
                              "truncate text-sm",
                              active
                                ? "font-medium text-foreground"
                                : "text-foreground/90",
                            ),
                            children: d.title,
                          }),
                          isPinned(d.id) &&
                            /* @__PURE__ */ jsx(Pin, {
                              className:
                                "h-3 w-3 shrink-0 fill-amber-400 text-amber-500",
                            }),
                        ],
                      }),
                      /* @__PURE__ */ jsx(DocumentActionsMenu, {
                        documentId: d.id,
                        folderId,
                        title: d.title,
                        className:
                          "h-6 w-6 rounded-md hover:bg-background flex items-center justify-center text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100",
                        iconClassName: "h-3.5 w-3.5",
                      }),
                    ],
                  },
                  d.id,
                );
              }),
              !folderDocs.isLoading &&
                docs.length === 0 &&
                /* @__PURE__ */ jsx("div", {
                  className: "text-xs text-muted-foreground px-2",
                  children: "Chưa có tài liệu",
                }),
            ],
          }),
          /* @__PURE__ */ jsxs(Link, {
            to: "/folders",
            className:
              "mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white text-sm font-medium py-2.5 shadow-brand hover:opacity-90 transition-opacity",
            children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
              " Quay về",
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("section", {
        className:
          "h-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "px-4 pt-3 border-b border-border",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-6 overflow-x-auto",
              children: [
                /* @__PURE__ */ jsx("button", {
                  onClick: () => setActiveTab("content"),
                  className: cn(
                    "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                    activeTab === "content"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ),
                  children: "Original Content",
                }),
                /* @__PURE__ */ jsx("button", {
                  onClick: () => setActiveTab("summary"),
                  className: cn(
                    "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                    activeTab === "summary"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ),
                  children: "AI Summary",
                }),
                /* @__PURE__ */ jsx("button", {
                  onClick: () => setActiveTab("flashcards"),
                  className: cn(
                    "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                    activeTab === "flashcards"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ),
                  children: "AI Flashcards",
                }),
                /* @__PURE__ */ jsx("button", {
                  onClick: () => setActiveTab("quizzes"),
                  className: cn(
                    "pb-3 text-sm font-medium border-b-2 whitespace-nowrap",
                    activeTab === "quizzes"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ),
                  children: "AI Quizzes",
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsxs("div", {
            className:
              "flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center",
            children: [
              /* @__PURE__ */ jsx("button", {
                onClick: () =>
                  navigate({
                    to: "/ai",
                    search: { folderId },
                  }),
                className: cn(
                  "px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0",
                  !docId
                    ? "bg-gradient-brand text-white"
                    : "bg-muted text-foreground hover:bg-accent",
                ),
                children: "All",
              }),
              docs.map((d) =>
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/ai",
                    search: {
                      folderId,
                      docId: d.id,
                    },
                    className: cn(
                      "px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0",
                      d.id === docId
                        ? "bg-gradient-brand text-white"
                        : "bg-brand-soft text-primary hover:bg-accent",
                    ),
                    children: d.title,
                  },
                  d.id,
                ),
              ),
              docs.length > 3 &&
                /* @__PURE__ */ jsx("span", {
                  className:
                    "h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0",
                  children: /* @__PURE__ */ jsx(ChevronRight, {
                    className: "h-4 w-4",
                  }),
                }),
            ],
          }),
          activeTab === "content" &&
            /* @__PURE__ */ jsx("div", {
              className: "flex-1 overflow-y-auto",
              children:
                docId && doc.data?.status === "ready"
                  ? /* @__PURE__ */ jsx(DocumentViewer, { document: doc.data })
                  : doc.data?.status === "processing"
                    ? /* @__PURE__ */ jsx("div", {
                        className: "flex items-center justify-center h-full",
                        children: /* @__PURE__ */ jsxs("div", {
                          className: "flex flex-col items-center gap-2 p-8",
                          children: [
                            /* @__PURE__ */ jsx(Loader2, {
                              className: "h-8 w-8 animate-spin text-primary",
                            }),
                            /* @__PURE__ */ jsx("p", {
                              className: "text-sm text-muted-foreground",
                              children: "Đang xử lý tài liệu...",
                            }),
                          ],
                        }),
                      })
                    : doc.data?.status === "failed"
                      ? /* @__PURE__ */ jsx("div", {
                          className:
                            "flex items-center justify-center h-full p-8",
                          children: /* @__PURE__ */ jsx("p", {
                            className: "text-red-500 text-center",
                            children: "Tài liệu đã xảy ra lỗi khi xử lý",
                          }),
                        })
                      : docId && !doc.data
                        ? /* @__PURE__ */ jsx("div", {
                            className:
                              "flex items-center justify-center h-full p-8",
                            children: /* @__PURE__ */ jsx(Loader2, {
                              className: "h-8 w-8 animate-spin text-primary",
                            }),
                          })
                        : /* @__PURE__ */ jsxs("div", {
                            className:
                              "grid grid-cols-2 sm:grid-cols-3 gap-4 p-5",
                            children: [
                              folderDocs.isLoading &&
                                Array.from({ length: 6 }).map((_, i) =>
                                  /* @__PURE__ */ jsx(
                                    Skeleton,
                                    { className: "h-40 rounded-xl" },
                                    i,
                                  ),
                                ),
                              docs.map((d) => {
                                const active = d.id === docId;
                                const tone = fileTone(d);
                                return /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    className: cn(
                                      "group relative flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5",
                                      active &&
                                        "border-primary ring-2 ring-primary/20 shadow-soft",
                                    ),
                                    children: /* @__PURE__ */ jsxs(Link, {
                                      to: "/ai",
                                      search: {
                                        folderId,
                                        docId: d.id,
                                      },
                                      className:
                                        "flex flex-col items-center w-full",
                                      children: [
                                        /* @__PURE__ */ jsx("div", {
                                          className:
                                            "flex-1 flex items-center justify-center w-full py-4",
                                          children: /* @__PURE__ */ jsx("div", {
                                            className: cn(
                                              "h-16 w-16 rounded-xl flex items-center justify-center",
                                              tone.soft,
                                            ),
                                            children: /* @__PURE__ */ jsx(
                                              FileText,
                                              {
                                                className: cn(
                                                  "h-8 w-8",
                                                  tone.icon,
                                                ),
                                              },
                                            ),
                                          }),
                                        }),
                                        /* @__PURE__ */ jsx("div", {
                                          className:
                                            "text-xs font-medium text-primary truncate w-full",
                                          children: d.title,
                                        }),
                                      ],
                                    }),
                                  },
                                  d.id,
                                );
                              }),
                              !folderDocs.isLoading &&
                                docs.length === 0 &&
                                /* @__PURE__ */ jsx("div", {
                                  className:
                                    "col-span-full text-sm text-muted-foreground text-center py-10",
                                  children:
                                    "Chưa có tài liệu trong thư mục này.",
                                }),
                            ],
                          }),
            }),
          " ",
          activeTab === "summary" &&
            /* @__PURE__ */ jsx("div", {
              className: "flex-1 overflow-y-auto p-6",
              children: !docId
                ? /* @__PURE__ */ jsx("div", {
                    className:
                      "text-sm text-muted-foreground text-center mt-16",
                    children: "Chọn một tài liệu để xem tóm tắt AI.",
                  })
                : doc.data?.summary
                  ? /* @__PURE__ */ jsx("div", {
                      className:
                        "prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed",
                      children: doc.data.summary,
                    })
                  : /* @__PURE__ */ jsx("div", {
                      className:
                        "text-sm text-muted-foreground text-center mt-16",
                      children: "Tài liệu này chưa có tóm tắt AI.",
                    }),
            }),
          activeTab === "flashcards" &&
            /* @__PURE__ */ jsx("div", {
              className: "flex-1 overflow-y-auto p-6",
              children: /* @__PURE__ */ jsx(FlashcardsTab, {
                documentId: docId ?? 0,
                title: doc.data?.title ?? "tài liệu",
              }),
            }),
          activeTab === "quizzes" &&
            /* @__PURE__ */ jsx("div", {
              className: "flex-1 overflow-y-auto p-6",
              children: /* @__PURE__ */ jsx(QuizzesTab, {
                folderId,
                docId,
                title: doc.data?.title ?? "tài liệu",
              }),
            }),
        ],
      }),
      /* @__PURE__ */ jsxs("aside", {
        className:
          "h-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "px-4 py-3.5 border-b border-border text-center",
            children: /* @__PURE__ */ jsx("div", {
              className: "text-sm font-semibold font-display truncate",
              children: doc.data?.title ?? "Chưa chọn tài liệu",
            }),
          }),
          /* @__PURE__ */ jsxs("div", {
            ref: scrollRef,
            className: "flex-1 overflow-y-auto p-4 space-y-3",
            children: [
              messages.length === 0
                ? /* @__PURE__ */ jsxs("div", {
                    className:
                      "flex flex-col items-center justify-center h-full text-center px-4 py-8",
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className:
                          "h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3",
                        children: /* @__PURE__ */ jsx(Sparkles, {
                          className: "h-7 w-7 text-primary",
                        }),
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "text-base font-semibold font-display",
                        children: "Trò chuyện với AI",
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className:
                          "text-sm text-muted-foreground mt-1 max-w-sm",
                        children: docId
                          ? "Hỏi AI để tóm tắt, giải thích hoặc kiểm tra kiến thức từ tài liệu này."
                          : "Chọn một tài liệu để bắt đầu trò chuyện.",
                      }),
                    ],
                  })
                : messages.map((m, i) =>
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "text-sm rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed whitespace-pre-wrap",
                          m.role === "user"
                            ? "bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft"
                            : "bg-muted text-foreground rounded-bl-md",
                        ),
                        children: m.content,
                      },
                      i,
                    ),
                  ),
              ask.isPending &&
                /* @__PURE__ */ jsxs("div", {
                  className:
                    "text-sm bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%] inline-flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "h-1.5 w-1.5 rounded-full bg-primary animate-pulse",
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:200ms]",
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]",
                    }),
                  ],
                }),
            ],
          }),
          /* @__PURE__ */ jsxs("form", {
            onSubmit: (e) => {
              e.preventDefault();
              submitChat();
            },
            className: "p-3 border-t border-border flex gap-2",
            children: [
              /* @__PURE__ */ jsx(Input, {
                ref: inputRef,
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Nhập câu hỏi của bạn….",
                className:
                  "text-sm rounded-xl bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-input",
                disabled: !docId,
              }),
              /* @__PURE__ */ jsx(Button, {
                type: "submit",
                size: "icon",
                disabled: ask.isPending || !input.trim() || !docId,
                className:
                  "bg-gradient-brand hover:opacity-90 rounded-xl shrink-0",
                children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region src/routes/_authenticated/ai.tsx?tsr-split=component
function AIChatPage() {
  const { folderId, docId } = Route.useSearch();
  return /* @__PURE__ */ jsx(AIChat, {
    folderId,
    docId,
  });
}
//#endregion
export { AIChatPage as component };
