import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import {
  a as CardTitle,
  i as CardHeader,
  n as CardContent,
  t as Card,
} from "./card-CtX3ithx.js";
import { t as Label } from "./label-DBD1bRRP.js";
import {
  a as DialogHeader,
  i as DialogFooter,
  n as DialogContent,
  o as DialogTitle,
  r as DialogDescription,
  t as Dialog,
} from "./dialog-CwLzEEob.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import {
  n as RadioGroupItem,
  t as RadioGroup,
} from "./radio-group-BJ3sdkEm.js";
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from "./table-C0WYWEQX.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-CiQwCJNR.js";
import {
  a as useReportedFiles,
  r as useHandleReportDecision,
} from "./useAdminFiles-CbAl_W0n.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, FileText, Flag } from "lucide-react";
//#region src/features/admin/components/AdminFilesPage.tsx
var AdminFilesPage = () => {
  const { data: files = [] } = useReportedFiles();
  const handleDecision = useHandleReportDecision();
  const [selected, setSelected] = useState(null);
  const [decision, setDecision] = useState("");
  const [note, setNote] = useState("");
  const [resolved, setResolved] = useState(false);
  const open = (file) => {
    setSelected(file);
    setDecision("");
    setNote("");
    setResolved(false);
  };
  const close = () => setSelected(null);
  const confirm = () => {
    if (!selected || !decision) return;
    handleDecision.mutate(
      {
        id: selected.id,
        decision,
      },
      {
        onSuccess: () => {
          setResolved(true);
          toast.success(
            decision === "remove" ? "Đã gỡ tài liệu" : "Đã từ chối báo cáo",
          );
        },
      },
    );
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-bold tracking-tight font-display",
            children: "Quản lý Tài liệu",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground mt-1 text-sm",
            children: "Xử lý các tài liệu bị báo cáo vi phạm",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs(Card, {
        children: [
          /* @__PURE__ */ jsxs(CardHeader, {
            className: "flex-row items-center justify-between space-y-0",
            children: [
              /* @__PURE__ */ jsx(CardTitle, {
                className: "text-base",
                children: "Tài liệu bị báo cáo",
              }),
              /* @__PURE__ */ jsxs("span", {
                className: "text-sm text-muted-foreground",
                children: [files.length, " tài liệu"],
              }),
            ],
          }),
          /* @__PURE__ */ jsx(CardContent, {
            className: "p-0",
            children: /* @__PURE__ */ jsxs(Table, {
              children: [
                /* @__PURE__ */ jsx(TableHeader, {
                  children: /* @__PURE__ */ jsxs(TableRow, {
                    children: [
                      /* @__PURE__ */ jsx(TableHead, { children: "Tên File" }),
                      /* @__PURE__ */ jsx(TableHead, {
                        children: "Người đăng",
                      }),
                      /* @__PURE__ */ jsx(TableHead, {
                        children: "Kích thước",
                      }),
                      /* @__PURE__ */ jsx(TableHead, { children: "Báo cáo" }),
                      /* @__PURE__ */ jsx(TableHead, {
                        className: "text-right",
                        children: "Hành động",
                      }),
                    ],
                  }),
                }),
                /* @__PURE__ */ jsx(TableBody, {
                  children:
                    files.length === 0
                      ? /* @__PURE__ */ jsx(TableRow, {
                          children: /* @__PURE__ */ jsx(TableCell, {
                            colSpan: 5,
                            className: "h-24 text-center text-muted-foreground",
                            children: "Không có báo cáo nào",
                          }),
                        })
                      : files.map((file) =>
                          /* @__PURE__ */ jsxs(
                            TableRow,
                            {
                              children: [
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsxs("div", {
                                    className:
                                      "flex items-center gap-3 min-w-0",
                                    children: [
                                      /* @__PURE__ */ jsx("div", {
                                        className:
                                          "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
                                        children: /* @__PURE__ */ jsx(
                                          FileText,
                                          { className: "h-4 w-4" },
                                        ),
                                      }),
                                      /* @__PURE__ */ jsx("span", {
                                        className: "font-medium truncate",
                                        children: file.name,
                                      }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-muted-foreground",
                                  children: file.uploader,
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-muted-foreground",
                                  children: file.size,
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsxs("span", {
                                    className:
                                      "inline-flex items-center gap-1 text-destructive font-semibold",
                                    children: [
                                      /* @__PURE__ */ jsx(Flag, {
                                        className: "h-3.5 w-3.5",
                                      }),
                                      file.reports,
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-right",
                                  children: /* @__PURE__ */ jsxs(Button, {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: () => open(file),
                                    children: [
                                      /* @__PURE__ */ jsx(AlertTriangle, {}),
                                      " Xử lý",
                                    ],
                                  }),
                                }),
                              ],
                            },
                            file.id,
                          ),
                        ),
                }),
              ],
            }),
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Dialog, {
        open: !!selected,
        onOpenChange: (o) => !o && close(),
        children: /* @__PURE__ */ jsxs(DialogContent, {
          className: "max-w-md",
          children: [
            selected &&
              !resolved &&
              /* @__PURE__ */ jsxs(Fragment, {
                children: [
                  /* @__PURE__ */ jsxs(DialogHeader, {
                    children: [
                      /* @__PURE__ */ jsxs(DialogTitle, {
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsx("span", {
                            className:
                              "h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center",
                            children: /* @__PURE__ */ jsx(AlertTriangle, {
                              className: "h-4 w-4",
                            }),
                          }),
                          "Báo cáo tài liệu",
                        ],
                      }),
                      /* @__PURE__ */ jsx(DialogDescription, {
                        children: "Xem xét và đưa ra quyết định xử lý.",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "space-y-4",
                    children: [
                      /* @__PURE__ */ jsxs("div", {
                        className:
                          "flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border",
                        children: [
                          /* @__PURE__ */ jsx("div", {
                            className:
                              "h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
                            children: /* @__PURE__ */ jsx(FileText, {
                              className: "h-5 w-5",
                            }),
                          }),
                          /* @__PURE__ */ jsxs("div", {
                            className: "min-w-0",
                            children: [
                              /* @__PURE__ */ jsx("p", {
                                className: "font-medium truncate",
                                children: selected.name,
                              }),
                              /* @__PURE__ */ jsxs("p", {
                                className: "text-muted-foreground text-xs",
                                children: ["Tải lên bởi ", selected.uploader],
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        children: [
                          /* @__PURE__ */ jsxs("div", {
                            className: "flex items-center gap-2 mb-2",
                            children: [
                              /* @__PURE__ */ jsx(Avatar, {
                                className: "h-6 w-6",
                                children: /* @__PURE__ */ jsx(AvatarFallback, {
                                  className: "bg-muted text-[10px]",
                                  children: selected.reporter.charAt(0),
                                }),
                              }),
                              /* @__PURE__ */ jsxs("span", {
                                className: "text-sm text-muted-foreground",
                                children: ["Báo cáo bởi ", selected.reporter],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsx("p", {
                            className:
                              "text-destructive font-semibold text-xs mb-1",
                            children: "Lý do báo cáo",
                          }),
                          /* @__PURE__ */ jsx("div", {
                            className:
                              "bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-sm leading-relaxed",
                            children: selected.reason,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        children: [
                          /* @__PURE__ */ jsx(Label, {
                            className: "mb-2 block",
                            children: "Quyết định xử lý *",
                          }),
                          /* @__PURE__ */ jsxs(RadioGroup, {
                            value: decision,
                            onValueChange: (v) => setDecision(v),
                            className: "space-y-2",
                            children: [
                              /* @__PURE__ */ jsxs("label", {
                                className: cn(
                                  "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                  decision === "remove"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:bg-muted/50",
                                ),
                                children: [
                                  /* @__PURE__ */ jsx(RadioGroupItem, {
                                    value: "remove",
                                    className: "mt-1",
                                  }),
                                  /* @__PURE__ */ jsxs("span", {
                                    children: [
                                      /* @__PURE__ */ jsx("span", {
                                        className: "block font-medium text-sm",
                                        children: "Gỡ tài liệu xuống",
                                      }),
                                      /* @__PURE__ */ jsx("span", {
                                        className:
                                          "block text-muted-foreground text-xs",
                                        children:
                                          "Xóa tài liệu và thông báo người tải",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs("label", {
                                className: cn(
                                  "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                  decision === "reject"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:bg-muted/50",
                                ),
                                children: [
                                  /* @__PURE__ */ jsx(RadioGroupItem, {
                                    value: "reject",
                                    className: "mt-1",
                                  }),
                                  /* @__PURE__ */ jsxs("span", {
                                    children: [
                                      /* @__PURE__ */ jsx("span", {
                                        className: "block font-medium text-sm",
                                        children: "Từ chối báo cáo",
                                      }),
                                      /* @__PURE__ */ jsx("span", {
                                        className:
                                          "block text-muted-foreground text-xs",
                                        children: "Tài liệu không vi phạm",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        children: [
                          /* @__PURE__ */ jsx(Label, {
                            htmlFor: "note",
                            className: "mb-1.5 block",
                            children: "Ghi chú (tùy chọn)",
                          }),
                          /* @__PURE__ */ jsx(Textarea, {
                            id: "note",
                            value: note,
                            onChange: (e) => setNote(e.target.value),
                            rows: 2,
                            placeholder:
                              "Nội dung thông báo gửi tới người liên quan…",
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs(DialogFooter, {
                    children: [
                      /* @__PURE__ */ jsx(Button, {
                        variant: "outline",
                        onClick: close,
                        children: "Hủy",
                      }),
                      /* @__PURE__ */ jsx(Button, {
                        disabled: !decision,
                        onClick: confirm,
                        children: "Xác nhận xử lý",
                      }),
                    ],
                  }),
                ],
              }),
            selected &&
              resolved &&
              /* @__PURE__ */ jsxs("div", {
                className: "py-6 flex flex-col items-center text-center",
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className:
                      "h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4",
                    children: /* @__PURE__ */ jsx(CheckCircle2, {
                      className: "h-7 w-7",
                    }),
                  }),
                  /* @__PURE__ */ jsx("h3", {
                    className: "text-lg font-bold mb-1.5",
                    children: "Đã giải quyết báo cáo",
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className:
                      "text-muted-foreground text-sm max-w-[300px] mb-6",
                    children:
                      decision === "remove"
                        ? "Tài liệu đã được gỡ xuống và người dùng đã được thông báo."
                        : "Báo cáo đã được từ chối, tài liệu vẫn được giữ nguyên.",
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    className: "w-full",
                    onClick: close,
                    children: "Đóng",
                  }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
};
//#endregion
//#region src/routes/admin_panel/files.tsx?tsr-split=component
var SplitComponent = AdminFilesPage;
//#endregion
export { SplitComponent as component };
