import { n as useAuth } from "./auth-Dc8GweY_.js";
import { t as Button } from "./button-BkEeRci-.js";
import {
  a as CardTitle,
  i as CardHeader,
  n as CardContent,
  t as Card,
} from "./card-CtX3ithx.js";
import { f as useFolders, o as useDocuments } from "./queries-FJFABj7o.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import {
  ArrowRight,
  Clock,
  FileText,
  FolderKanban,
  Sparkles,
  Upload,
} from "lucide-react";
//#region src/routes/_authenticated/dashboard.tsx?tsr-split=component
function Dashboard() {
  const folders = useFolders();
  const docs = useDocuments();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "ADMIN";
  useEffect(() => {
    if (isAdmin)
      navigate({
        to: "/admin_panel",
        replace: true,
      });
  }, [isAdmin, navigate]);
  const recent = (docs.data ?? [])
    .slice()
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 5);
  const stats = [
    {
      label: "Thư mục",
      value: folders.data?.length ?? 0,
      icon: FolderKanban,
      iconBg: "bg-primary/10 text-primary",
    },
    {
      label: "Tài liệu",
      value: docs.data?.length ?? 0,
      icon: FileText,
      iconBg: "bg-violet/10 text-violet",
    },
    {
      label: "Đã tải lên",
      value: recent.length,
      icon: Upload,
      iconBg: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "7 ngày qua",
      value: recent.filter((d) => {
        if (!d.createdAt) return false;
        return Date.now() - new Date(d.createdAt).getTime() < 7 * 864e5;
      }).length,
      icon: Clock,
      iconBg: "bg-amber-500/10 text-amber-600",
    },
  ];
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-8",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className:
          "relative overflow-hidden rounded-3xl bg-gradient-brand p-6 md:p-8 text-white shadow-brand",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl",
          }),
          /* @__PURE__ */ jsx("div", {
            className:
              "absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-white/5 blur-3xl",
          }),
          /* @__PURE__ */ jsxs("div", {
            className:
              "relative flex flex-col md:flex-row md:items-center md:justify-between gap-4",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "min-w-0",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    className:
                      "flex items-center gap-2 text-white/80 text-xs font-medium",
                    children: [
                      /* @__PURE__ */ jsx(Sparkles, {
                        className: "h-3.5 w-3.5",
                      }),
                      " AI STUDY HUB",
                    ],
                  }),
                  /* @__PURE__ */ jsxs("h1", {
                    className:
                      "font-display font-bold text-2xl md:text-3xl mt-2",
                    children: [
                      "Chào mừng trở lại, ",
                      user?.fullName?.split(" ").pop() ?? "bạn",
                      " 👋",
                    ],
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "text-white/80 text-sm mt-1.5 max-w-md",
                    children:
                      "Tiếp tục học cùng AI — tóm tắt, flashcards và quizzes từ tài liệu của bạn.",
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Button, {
                asChild: true,
                variant: "secondary",
                className: "bg-white text-primary hover:bg-white/90",
                children: /* @__PURE__ */ jsxs(Link, {
                  to: "/folders",
                  children: [
                    "Mở thư mục ",
                    /* @__PURE__ */ jsx(ArrowRight, {
                      className: "h-4 w-4 ml-1.5",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        children: stats.map((s) =>
          /* @__PURE__ */ jsx(
            Card,
            {
              className: "border-border/60 shadow-soft",
              children: /* @__PURE__ */ jsx(CardContent, {
                className: "p-5",
                children: /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      children: [
                        /* @__PURE__ */ jsx("div", {
                          className:
                            "text-xs text-muted-foreground font-medium",
                          children: s.label,
                        }),
                        /* @__PURE__ */ jsx("div", {
                          className: "text-3xl font-bold font-display mt-2",
                          children:
                            folders.isLoading || docs.isLoading
                              ? /* @__PURE__ */ jsx(Skeleton, {
                                  className: "h-8 w-12",
                                })
                              : s.value,
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("div", {
                      className: `h-11 w-11 rounded-xl flex items-center justify-center ${s.iconBg}`,
                      children: /* @__PURE__ */ jsx(s.icon, {
                        className: "h-5 w-5",
                      }),
                    }),
                  ],
                }),
              }),
            },
            s.label,
          ),
        ),
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid gap-6 lg:grid-cols-2",
        children: [
          /* @__PURE__ */ jsxs(Card, {
            className: "shadow-soft",
            children: [
              /* @__PURE__ */ jsx(CardHeader, {
                children: /* @__PURE__ */ jsx(CardTitle, {
                  className: "text-base font-display",
                  children: "Tài liệu gần đây",
                }),
              }),
              /* @__PURE__ */ jsxs(CardContent, {
                className: "space-y-1.5",
                children: [
                  docs.isLoading &&
                    Array.from({ length: 3 }).map((_, i) =>
                      /* @__PURE__ */ jsx(
                        Skeleton,
                        { className: "h-14 rounded-xl" },
                        i,
                      ),
                    ),
                  !docs.isLoading &&
                    recent.length === 0 &&
                    /* @__PURE__ */ jsx("div", {
                      className:
                        "text-sm text-muted-foreground py-6 text-center",
                      children: "Chưa có tài liệu.",
                    }),
                  recent.map((d) =>
                    /* @__PURE__ */ jsxs(
                      Link,
                      {
                        to: "/documents/$id",
                        params: { id: String(d.id) },
                        className:
                          "flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group",
                        children: [
                          /* @__PURE__ */ jsx("div", {
                            className:
                              "h-9 w-9 rounded-lg bg-gradient-soft flex items-center justify-center shrink-0 group-hover:bg-gradient-brand transition-colors",
                            children: /* @__PURE__ */ jsx(FileText, {
                              className:
                                "h-4 w-4 text-primary group-hover:text-white",
                            }),
                          }),
                          /* @__PURE__ */ jsxs("div", {
                            className: "flex-1 min-w-0",
                            children: [
                              /* @__PURE__ */ jsx("div", {
                                className: "text-sm font-medium truncate",
                                children: d.title,
                              }),
                              /* @__PURE__ */ jsx("div", {
                                className:
                                  "text-xs text-muted-foreground truncate",
                                children: d.description,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsx(ArrowRight, {
                            className:
                              "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
                          }),
                        ],
                      },
                      d.id,
                    ),
                  ),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs(Card, {
            className: "shadow-soft",
            children: [
              /* @__PURE__ */ jsx(CardHeader, {
                children: /* @__PURE__ */ jsx(CardTitle, {
                  className: "text-base font-display",
                  children: "Thư mục của bạn",
                }),
              }),
              /* @__PURE__ */ jsxs(CardContent, {
                className: "space-y-1.5",
                children: [
                  folders.isLoading &&
                    Array.from({ length: 3 }).map((_, i) =>
                      /* @__PURE__ */ jsx(
                        Skeleton,
                        { className: "h-14 rounded-xl" },
                        i,
                      ),
                    ),
                  !folders.isLoading &&
                    (folders.data?.length ?? 0) === 0 &&
                    /* @__PURE__ */ jsx("div", {
                      className:
                        "text-sm text-muted-foreground py-6 text-center",
                      children: "Chưa có thư mục.",
                    }),
                  (folders.data ?? []).slice(0, 5).map((f) =>
                    /* @__PURE__ */ jsxs(
                      Link,
                      {
                        to: "/folders/$id",
                        params: { id: String(f.id) },
                        className:
                          "flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group",
                        children: [
                          /* @__PURE__ */ jsx("div", {
                            className:
                              "h-9 w-9 rounded-lg bg-gradient-soft flex items-center justify-center shrink-0 group-hover:bg-gradient-brand transition-colors",
                            children: /* @__PURE__ */ jsx(FolderKanban, {
                              className:
                                "h-4 w-4 text-primary group-hover:text-white",
                            }),
                          }),
                          /* @__PURE__ */ jsxs("div", {
                            className: "flex-1 min-w-0",
                            children: [
                              /* @__PURE__ */ jsx("div", {
                                className: "text-sm font-medium truncate",
                                children: f.name,
                              }),
                              /* @__PURE__ */ jsx("div", {
                                className:
                                  "text-xs text-muted-foreground truncate",
                                children: f.aiSummary || "Chưa có tóm tắt",
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsx(ArrowRight, {
                            className:
                              "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
                          }),
                        ],
                      },
                      f.id,
                    ),
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
export { Dashboard as component };
