import { n as api } from "./api-vGJ7qemV.js";
import {
  a as CardTitle,
  i as CardHeader,
  n as CardContent,
  t as Card,
} from "./card-CtX3ithx.js";
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from "./table-C0WYWEQX.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { t as PlanBadge } from "./PlanBadge-BSmh8FV-.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.js";
import { t as adminKeys } from "./adminKeys-Dq_NNZ6Y.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import {
  Clock,
  Crown,
  FileCheck,
  TrendingDown,
  TrendingUp,
  Wallet,
  XCircle,
} from "lucide-react";
//#region src/features/admin/services/premiumApi.ts
var premiumApi = {
  getStats: () => api("/api/admin/premium/stats"),
  getRequests: () => api("/api/admin/premium/requests"),
  decide: (id, decision) =>
    api(`/api/admin/premium/requests/${id}/decision`, {
      method: "POST",
      body: { decision },
    }),
};
//#endregion
//#region src/features/admin/hooks/usePremium.ts
function usePremiumStats() {
  return useQuery({
    queryKey: adminKeys.premiumStats(),
    queryFn: () => premiumApi.getStats(),
  });
}
function usePremiumRequests() {
  return useQuery({
    queryKey: adminKeys.premiumRequests(),
    queryFn: () => premiumApi.getRequests(),
  });
}
//#endregion
//#region src/features/admin/components/AdminPremiumPage.tsx
var fmtVnd = (n) => n.toLocaleString("vi-VN") + " ₫";
function StatCard({ label, value, trend, icon, tone }) {
  const up = trend >= 0;
  return /* @__PURE__ */ jsx(Card, {
    children: /* @__PURE__ */ jsxs(CardContent, {
      className: "pt-6",
      children: [
        /* @__PURE__ */ jsxs("div", {
          className: "flex items-start justify-between",
          children: [
            /* @__PURE__ */ jsx("div", {
              className: `h-11 w-11 rounded-xl flex items-center justify-center ${tone}`,
              children: icon,
            }),
            /* @__PURE__ */ jsxs("span", {
              className: `inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`,
              children: [
                up
                  ? /* @__PURE__ */ jsx(TrendingUp, {
                      className: "h-3.5 w-3.5",
                    })
                  : /* @__PURE__ */ jsx(TrendingDown, {
                      className: "h-3.5 w-3.5",
                    }),
                Math.abs(trend),
                "%",
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground text-sm font-medium mt-4",
          children: label,
        }),
        /* @__PURE__ */ jsx("h3", {
          className: "text-2xl font-bold tracking-tight mt-1 font-display",
          children: value,
        }),
        /* @__PURE__ */ jsx("p", {
          className: "text-xs text-muted-foreground mt-0.5",
          children: "so với tháng trước",
        }),
      ],
    }),
  });
}
var statusBadge = {
  Pending: {
    label: "Pending",
    cls: "bg-amber-500/10 text-amber-600",
  },
  Approved: {
    label: "Approved",
    cls: "bg-emerald-500/10 text-emerald-600",
  },
  Rejected: {
    label: "Rejected",
    cls: "bg-destructive/10 text-destructive",
  },
};
var AdminPremiumPage = () => {
  const { data: stats } = usePremiumStats();
  const { data: requests = [] } = usePremiumRequests();
  const [tab, setTab] = useState("all");
  const filtered = useMemo(
    () => (tab === "all" ? requests : requests.filter((r) => r.plan === tab)),
    [requests, tab],
  );
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-bold tracking-tight font-display",
            children: "Quản lý Premium",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground mt-1 text-sm",
            children: "Theo dõi gói trả phí và lịch sử giao dịch nâng cấp",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
        children: [
          /* @__PURE__ */ jsx(StatCard, {
            label: "Total Premium Users",
            value: String(stats?.totalPremiumUsers ?? "—"),
            trend: stats?.totalPremiumTrend ?? 0,
            icon: /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5" }),
            tone: "bg-primary/10 text-primary",
          }),
          /* @__PURE__ */ jsx(StatCard, {
            label: "Pending Requests",
            value: String(stats?.pendingRequests ?? "—"),
            trend: stats?.pendingRequestsTrend ?? 0,
            icon: /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }),
            tone: "bg-amber-500/10 text-amber-600",
          }),
          /* @__PURE__ */ jsx(StatCard, {
            label: "Revenue This Month",
            value: stats ? fmtVnd(stats.revenueThisMonth) : "—",
            trend: stats?.revenueTrend ?? 0,
            icon: /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" }),
            tone: "bg-emerald-500/10 text-emerald-600",
          }),
          /* @__PURE__ */ jsx(StatCard, {
            label: "Expired Subscriptions",
            value: String(stats?.expiredSubscriptions ?? "—"),
            trend: stats?.expiredTrend ?? 0,
            icon: /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5" }),
            tone: "bg-destructive/10 text-destructive",
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
                children: "Lịch sử giao dịch nâng cấp",
              }),
              /* @__PURE__ */ jsx(Tabs, {
                value: tab,
                onValueChange: (v) => setTab(v),
                children: /* @__PURE__ */ jsxs(TabsList, {
                  children: [
                    /* @__PURE__ */ jsx(TabsTrigger, {
                      value: "all",
                      children: "Tất cả",
                    }),
                    /* @__PURE__ */ jsx(TabsTrigger, {
                      value: "PLUS",
                      children: "Plus",
                    }),
                    /* @__PURE__ */ jsx(TabsTrigger, {
                      value: "PRO",
                      children: "Pro",
                    }),
                  ],
                }),
              }),
            ],
          }),
          /* @__PURE__ */ jsx(CardContent, {
            className: "p-0",
            children: /* @__PURE__ */ jsxs(Table, {
              children: [
                /* @__PURE__ */ jsx(TableHeader, {
                  children: /* @__PURE__ */ jsxs(TableRow, {
                    className:
                      "[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground",
                    children: [
                      /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
                      /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
                      /* @__PURE__ */ jsx(TableHead, { children: "Plan" }),
                      /* @__PURE__ */ jsx(TableHead, {
                        children: "Registration Date",
                      }),
                      /* @__PURE__ */ jsx(TableHead, {
                        children: "Payment Proof",
                      }),
                      /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
                    ],
                  }),
                }),
                /* @__PURE__ */ jsx(TableBody, {
                  children:
                    filtered.length === 0
                      ? /* @__PURE__ */ jsx(TableRow, {
                          children: /* @__PURE__ */ jsx(TableCell, {
                            colSpan: 6,
                            className: "h-24 text-center text-muted-foreground",
                            children: "Không có giao dịch nào",
                          }),
                        })
                      : filtered.map((r) => {
                          const s = statusBadge[r.status];
                          return /* @__PURE__ */ jsxs(
                            TableRow,
                            {
                              className: "[&>td]:py-4 [&>td]:text-[15px]",
                              children: [
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "font-semibold",
                                  children: r.name,
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-muted-foreground",
                                  children: r.email,
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsx(PlanBadge, {
                                    plan: r.plan,
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-muted-foreground",
                                  children: r.registrationDate,
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsxs("span", {
                                    className:
                                      "inline-flex items-center gap-1.5 text-muted-foreground",
                                    children: [
                                      /* @__PURE__ */ jsx(FileCheck, {
                                        className: "h-4 w-4",
                                      }),
                                      " ",
                                      r.paymentMethod,
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsx(Badge, {
                                    variant: "secondary",
                                    className: `${s.cls} text-[13px] px-2.5 py-1`,
                                    children: s.label,
                                  }),
                                }),
                              ],
                            },
                            r.id,
                          );
                        }),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
//#endregion
//#region src/routes/admin_panel/premium.tsx?tsr-split=component
var SplitComponent = AdminPremiumPage;
//#endregion
export { SplitComponent as component };
