// src/features/admin/components/AdminPremiumPage.tsx
import React, { useMemo, useState } from "react";
import {
  Crown,
  Clock,
  Wallet,
  XCircle,
  TrendingUp,
  TrendingDown,
  FileCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { usePremiumStats, usePremiumRequests } from "../hooks";
import type { PremiumRequestStatus } from "../types/admin.types";
import { PlanBadge } from "./PlanBadge";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";

function StatCard({
  label,
  value,
  trend,
  icon,
  tone,
}: {
  label: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  tone: string;
}) {
  const up = trend >= 0;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div
            className={`h-11 w-11 rounded-xl flex items-center justify-center ${tone}`}
          >
            {icon}
          </div>
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}
          >
            {up ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {Math.abs(trend)}%
          </span>
        </div>
        <p className="text-muted-foreground text-sm font-medium mt-4">
          {label}
        </p>
        <h3 className="text-2xl font-bold tracking-tight mt-1 font-display">
          {value}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          so với tháng trước
        </p>
      </CardContent>
    </Card>
  );
}

const statusBadge: Record<
  PremiumRequestStatus,
  { label: string; cls: string }
> = {
  Pending: { label: "Pending", cls: "bg-amber-500/10 text-amber-600" },
  Approved: { label: "Approved", cls: "bg-emerald-500/10 text-emerald-600" },
  Rejected: { label: "Rejected", cls: "bg-destructive/10 text-destructive" },
};

type TabKey = "all" | "PLUS" | "PRO";

export const AdminPremiumPage: React.FC = () => {
  const { data: stats } = usePremiumStats();
  const { data: requests = [] } = usePremiumRequests();
  const [tab, setTab] = useState<TabKey>("all");

  const filtered = useMemo(
    () => (tab === "all" ? requests : requests.filter((r) => r.plan === tab)),
    [requests, tab],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Quản lý Premium
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Theo dõi gói trả phí và lịch sử giao dịch nâng cấp
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Premium Users"
          value={String(stats?.totalPremiumUsers ?? "—")}
          trend={stats?.totalPremiumTrend ?? 0}
          icon={<Crown className="h-5 w-5" />}
          tone="bg-primary/10 text-primary"
        />
        <StatCard
          label="Pending Requests"
          value={String(stats?.pendingRequests ?? "—")}
          trend={stats?.pendingRequestsTrend ?? 0}
          icon={<Clock className="h-5 w-5" />}
          tone="bg-amber-500/10 text-amber-600"
        />
        <StatCard
          label="Revenue This Month"
          value={stats ? fmtVnd(stats.revenueThisMonth) : "—"}
          trend={stats?.revenueTrend ?? 0}
          icon={<Wallet className="h-5 w-5" />}
          tone="bg-emerald-500/10 text-emerald-600"
        />
        <StatCard
          label="Expired Subscriptions"
          value={String(stats?.expiredSubscriptions ?? "—")}
          trend={stats?.expiredTrend ?? 0}
          icon={<XCircle className="h-5 w-5" />}
          tone="bg-destructive/10 text-destructive"
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">
            Lịch sử giao dịch nâng cấp
          </CardTitle>
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="PLUS">Plus</TabsTrigger>
              <TabsTrigger value="PRO">Pro</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Payment Proof</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Không có giao dịch nào
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((r) => {
                  const s = statusBadge[r.status];
                  return (
                    <TableRow
                      key={r.id}
                      className="[&>td]:py-4 [&>td]:text-[15px]"
                    >
                      <TableCell className="font-semibold">{r.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.email}
                      </TableCell>
                      <TableCell>
                        <PlanBadge plan={r.plan} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.registrationDate}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <FileCheck className="h-4 w-4" /> {r.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${s.cls} text-[13px] px-2.5 py-1`}
                        >
                          {s.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
