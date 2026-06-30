import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-BkEeRci-.js";
import { n as CardContent, t as Card } from "./card-CtX3ithx.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { t as paymentApi } from "./paymentApi-C9EkvKqB.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  Crown,
  Landmark,
  Loader2,
  Smartphone,
  Zap,
} from "lucide-react";
//#region src/features/payment/components/PremiumUpgradePage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
function PremiumUpgradePage() {
  const [plans, setPlans] = useState([]);
  const [methods, setMethods] = useState([]);
  const [bank, setBank] = useState(null);
  const [step, setStep] = useState("plan");
  const [plan, setPlan] = useState(null);
  useEffect(() => {
    let alive = true;
    Promise.all([
      paymentApi.getPlanOptions(),
      paymentApi.getTopUpMethods(),
      paymentApi.getBankInfo(),
    ]).then(([p, m, b]) => {
      if (!alive) return;
      setPlans(p);
      setMethods(m);
      setBank(b);
    });
    return () => {
      alive = false;
    };
  }, []);
  const copy = (text, label) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success(`Đã copy ${label}`),
      () => toast.error("Không copy được"),
    );
  };
  if (step === "plan")
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", {
          children: [
            /* @__PURE__ */ jsx("h1", {
              className: "text-2xl font-bold tracking-tight font-display",
              children: "Nâng cấp Premium",
            }),
            /* @__PURE__ */ jsx("p", {
              className: "text-muted-foreground mt-1 text-sm",
              children: "Chọn gói phù hợp với nhu cầu của bạn",
            }),
          ],
        }),
        /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl",
          children: plans.map((p) =>
            /* @__PURE__ */ jsxs(
              Card,
              {
                className: cn(
                  "relative",
                  p.highlighted && "border-primary shadow-brand",
                ),
                children: [
                  p.highlighted &&
                    /* @__PURE__ */ jsx(Badge, {
                      className:
                        "absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent",
                      children: "Phổ biến",
                    }),
                  /* @__PURE__ */ jsxs(CardContent, {
                    className: "pt-6",
                    children: [
                      /* @__PURE__ */ jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsx(Crown, {
                            className: cn(
                              "h-5 w-5",
                              p.highlighted
                                ? "text-primary"
                                : "text-muted-foreground",
                            ),
                          }),
                          /* @__PURE__ */ jsx("h3", {
                            className: "text-lg font-bold font-display",
                            children: p.name,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className: "text-muted-foreground text-sm mt-1",
                        children: p.tagline,
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        className: "mt-4 flex items-baseline gap-1",
                        children: [
                          /* @__PURE__ */ jsx("span", {
                            className: "text-3xl font-bold font-display",
                            children: fmtVnd(p.price),
                          }),
                          /* @__PURE__ */ jsx("span", {
                            className: "text-muted-foreground text-sm",
                            children: "/ tháng",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsx("ul", {
                        className: "mt-4 space-y-2",
                        children: p.features.map((f) =>
                          /* @__PURE__ */ jsxs(
                            "li",
                            {
                              className: "flex items-center gap-2 text-sm",
                              children: [
                                /* @__PURE__ */ jsx(Check, {
                                  className:
                                    "h-4 w-4 text-emerald-600 shrink-0",
                                }),
                                " ",
                                f,
                              ],
                            },
                            f,
                          ),
                        ),
                      }),
                      /* @__PURE__ */ jsxs(Button, {
                        className: cn(
                          "w-full mt-5",
                          p.highlighted
                            ? "bg-gradient-brand shadow-brand hover:opacity-90"
                            : "",
                        ),
                        variant: p.highlighted ? "default" : "outline",
                        onClick: () => {
                          setPlan(p);
                          setStep("method");
                        },
                        children: ["Chọn ", p.name],
                      }),
                    ],
                  }),
                ],
              },
              p.id,
            ),
          ),
        }),
        /* @__PURE__ */ jsx("p", {
          className: "text-xs text-muted-foreground",
          children: "* Chi tiết quyền lợi từng gói sẽ được cập nhật sau.",
        }),
      ],
    });
  if (step === "method") {
    const icon = (id) =>
      id === "bank"
        ? /* @__PURE__ */ jsx(Landmark, { className: "h-6 w-6" })
        : /* @__PURE__ */ jsx(Smartphone, { className: "h-6 w-6" });
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6 max-w-3xl mx-auto",
      children: [
        /* @__PURE__ */ jsxs("button", {
          onClick: () => setStep("plan"),
          className:
            "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Chọn lại gói",
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          children: [
            /* @__PURE__ */ jsx("h1", {
              className:
                "text-2xl font-bold tracking-tight font-display uppercase",
              children: "Chọn hình thức nạp tiền",
            }),
            /* @__PURE__ */ jsxs("p", {
              className: "text-muted-foreground mt-1 text-sm",
              children: [
                "Thanh toán cho ",
                /* @__PURE__ */ jsx("span", {
                  className: "font-medium text-foreground",
                  children: plan?.name,
                }),
                " — ",
                plan ? fmtVnd(plan.price) : "",
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsx("div", {
          className: "space-y-3",
          children: methods.map((m) =>
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  if (m.id === "bank") setStep("bank");
                  else toast.info("Phương thức này sẽ bổ sung sau.");
                },
                className: cn(
                  "w-full text-left rounded-2xl border bg-card p-4 flex items-center gap-4 transition-colors hover:border-primary/60",
                  m.recommended ? "border-primary/50" : "border-border",
                ),
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className: cn(
                      "h-14 w-14 rounded-xl flex items-center justify-center shrink-0",
                      m.id === "bank"
                        ? "bg-primary/10 text-primary"
                        : "bg-emerald-500/10 text-emerald-600",
                    ),
                    children: icon(m.id),
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "min-w-0 flex-1",
                    children: [
                      /* @__PURE__ */ jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsx("span", {
                            className:
                              "text-[11px] font-semibold tracking-wider text-muted-foreground uppercase",
                            children: m.category,
                          }),
                          m.recommended &&
                            /* @__PURE__ */ jsx(Badge, {
                              variant: "secondary",
                              className:
                                "bg-primary/10 text-primary border-transparent",
                              children: "Khuyến nghị",
                            }),
                        ],
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "font-bold mt-0.5",
                        children: m.title,
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className: "text-sm text-muted-foreground mt-0.5",
                        children: m.description,
                      }),
                      m.instant &&
                        /* @__PURE__ */ jsxs("span", {
                          className:
                            "inline-flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full",
                          children: [
                            /* @__PURE__ */ jsx(Zap, { className: "h-3 w-3" }),
                            " Xử lý tức thì",
                          ],
                        }),
                    ],
                  }),
                  /* @__PURE__ */ jsx(ChevronRight, {
                    className: "h-5 w-5 text-muted-foreground shrink-0",
                  }),
                ],
              },
              m.id,
            ),
          ),
        }),
      ],
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6 max-w-xl mx-auto",
    children: [
      /* @__PURE__ */ jsxs("button", {
        onClick: () => setStep("method"),
        className:
          "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Chọn lại phương thức",
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "rounded-2xl overflow-hidden border border-border",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className:
              "bg-gradient-brand text-white px-5 py-4 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxs("div", {
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className:
                      "text-[11px] uppercase tracking-wider text-white/70",
                    children: "Ngân hàng",
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className: "font-bold text-lg",
                    children: bank?.bankName,
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Badge, {
                className:
                  "bg-white/20 text-white border-transparent text-base px-3 py-1",
                children: bank?.bankShort,
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "text-right",
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className:
                      "text-[11px] uppercase tracking-wider text-white/70",
                    children: "Số tài khoản",
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className: "font-bold text-lg tracking-wide",
                    children: bank?.accountNumber,
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "bg-card p-5 grid sm:grid-cols-[1fr_auto] gap-5",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsx(Field, {
                    label: "Chủ tài khoản",
                    value: bank?.accountName ?? "",
                    onCopy: () => copy(bank?.accountName ?? "", "tên chủ TK"),
                  }),
                  /* @__PURE__ */ jsx(Field, {
                    label: "Số tài khoản",
                    value: bank?.accountNumber ?? "",
                    onCopy: () => copy(bank?.accountNumber ?? "", "số TK"),
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className:
                          "text-[11px] uppercase tracking-wider text-muted-foreground mb-1",
                        children: "Nội dung chuyển khoản",
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsx("code", {
                            className:
                              "flex-1 bg-primary/5 border border-primary/20 text-primary font-bold rounded-lg px-3 py-2",
                            children: bank?.transferContent,
                          }),
                          /* @__PURE__ */ jsxs(Button, {
                            variant: "outline",
                            size: "sm",
                            onClick: () =>
                              copy(bank?.transferContent ?? "", "nội dung CK"),
                            children: [
                              /* @__PURE__ */ jsx(Copy, {
                                className: "h-3.5 w-3.5",
                              }),
                              " Copy",
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className: "text-xs text-amber-600 mt-1",
                        children:
                          "⚠ Nhập đúng nội dung để hệ thống tự động xác nhận.",
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex flex-col items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className:
                      "h-36 w-36 rounded-lg border border-border bg-[conic-gradient(at_center,_#000_25%,_#fff_0_50%,_#000_0_75%,_#fff_0)] bg-[length:16px_16px] opacity-90",
                    "aria-label": "QR mock",
                  }),
                  /* @__PURE__ */ jsx("span", {
                    className: "text-xs text-muted-foreground",
                    children: "Quét QR để chuyển tiền",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "rounded-xl border border-border bg-muted/40 px-4 py-3 flex items-center gap-2 text-sm",
        children: [
          /* @__PURE__ */ jsx(Loader2, {
            className: "h-4 w-4 animate-spin text-primary",
          }),
          "Đang chờ xác nhận chuyển khoản…",
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "rounded-xl border border-destructive/20 bg-destructive/5 p-4",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "font-semibold text-destructive flex items-center gap-2 mb-2",
            children: "⚠ Lưu ý quan trọng",
          }),
          /* @__PURE__ */ jsxs("ul", {
            className:
              "space-y-1.5 text-sm text-muted-foreground list-disc pl-5",
            children: [
              /* @__PURE__ */ jsx("li", {
                children:
                  "Nhập chính xác nội dung chuyển khoản để hệ thống tự động cộng tiền.",
              }),
              /* @__PURE__ */ jsx("li", {
                children:
                  "Thay đổi nội dung sẽ khiến giao dịch không được xác nhận.",
              }),
              /* @__PURE__ */ jsx("li", {
                children:
                  "Không nhận được tiền sau 30 phút, vui lòng liên hệ fanpage để được hỗ trợ.",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Field({ label, value, onCopy }) {
  return /* @__PURE__ */ jsxs("div", {
    children: [
      /* @__PURE__ */ jsx("div", {
        className:
          "text-[11px] uppercase tracking-wider text-muted-foreground mb-1",
        children: label,
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsx("span", {
            className: "flex-1 font-semibold",
            children: value,
          }),
          /* @__PURE__ */ jsxs(Button, {
            variant: "outline",
            size: "sm",
            onClick: onCopy,
            children: [
              /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5" }),
              " Copy",
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region src/routes/_authenticated/premium.tsx?tsr-split=component
var SplitComponent = PremiumUpgradePage;
//#endregion
export { SplitComponent as component };
