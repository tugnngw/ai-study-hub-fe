// src/features/admin/components/AdminPremiumPage.tsx
import React, { useMemo, useState } from "react";
import {
<<<<<<< HEAD
<<<<<<< HEAD
  Crown, Clock, Wallet, XCircle, TrendingUp, TrendingDown, FileCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
=======
=======
>>>>>>> origin/final/demo-v1
  Crown,
  Clock,
  Wallet,
  XCircle,
  TrendingUp,
  TrendingDown,
  FileCheck,
<<<<<<< HEAD
=======
  Pencil,
  Save,
  X,
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { usePremiumStats, usePremiumRequests } from "../hooks";
import type { PremiumRequestStatus } from "../types/admin.types";
import { PlanBadge } from "./PlanBadge";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";

function StatCard({
<<<<<<< HEAD
  label, value, trend, icon, tone,
}: { label: string; value: string; trend: number; icon: React.ReactNode; tone: string }) {
=======
=======
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAdminTransactions, useAdminPlans, useUpdatePlan } from "../hooks";
import { formatStorage, mbToGb, MB_PER_GB } from "@/lib/config";
import { Loader2 } from "lucide-react";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (date: string) => new Date(date).toLocaleString("vi-VN");

function StatCard({
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  const up = trend >= 0;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
<<<<<<< HEAD
<<<<<<< HEAD
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${tone}`}>{icon}</div>
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}>
            {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {Math.abs(trend)}%
          </span>
        </div>
        <p className="text-muted-foreground text-sm font-medium mt-4">{label}</p>
        <h3 className="text-2xl font-bold tracking-tight mt-1 font-display">{value}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">so với tháng trước</p>
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
      </CardContent>
    </Card>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
const statusBadge: Record<PremiumRequestStatus, { label: string; cls: string }> = {
=======
const statusBadge: Record<
  PremiumRequestStatus,
  { label: string; cls: string }
> = {
>>>>>>> origin/Flashcars
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
<<<<<<< HEAD
    [requests, tab]
=======
    [requests, tab],
>>>>>>> origin/Flashcars
  );

  return (
    <div className="space-y-6">
      <div>
<<<<<<< HEAD
        <h1 className="text-2xl font-bold tracking-tight font-display">Quản lý Premium</h1>
        <p className="text-muted-foreground mt-1 text-sm">Theo dõi gói trả phí và lịch sử giao dịch nâng cấp</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Premium Users" value={String(stats?.totalPremiumUsers ?? "—")} trend={stats?.totalPremiumTrend ?? 0} icon={<Crown className="h-5 w-5" />} tone="bg-primary/10 text-primary" />
        <StatCard label="Pending Requests" value={String(stats?.pendingRequests ?? "—")} trend={stats?.pendingRequestsTrend ?? 0} icon={<Clock className="h-5 w-5" />} tone="bg-amber-500/10 text-amber-600" />
        <StatCard label="Revenue This Month" value={stats ? fmtVnd(stats.revenueThisMonth) : "—"} trend={stats?.revenueTrend ?? 0} icon={<Wallet className="h-5 w-5" />} tone="bg-emerald-500/10 text-emerald-600" />
        <StatCard label="Expired Subscriptions" value={String(stats?.expiredSubscriptions ?? "—")} trend={stats?.expiredTrend ?? 0} icon={<XCircle className="h-5 w-5" />} tone="bg-destructive/10 text-destructive" />
=======
=======
const statusBadge: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Chờ xử lý", cls: "bg-amber-500/10 text-amber-600" },
  PAID: { label: "Thành công", cls: "bg-emerald-500/10 text-emerald-600" },
  FAILED: { label: "Thất bại", cls: "bg-destructive/10 text-destructive" },
  CANCELLED: { label: "Đã hủy", cls: "bg-gray-500/10 text-gray-600" },
};

type TabKey = "all" | "PAID" | "PENDING";

// ── Cấu hình giá trị các gói (chỉ admin) ──────────────────────
function PlanConfigCard() {
  const { data: plans, isLoading } = useAdminPlans();
  const updatePlan = useUpdatePlan();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<{
    price: number;
    storageValue: number; // giá trị nhập theo đơn vị đang chọn
    storageUnit: "MB" | "GB";
    aiQuestions: number;
    description: string;
    isActive: boolean;
  } | null>(null);

  const startEdit = (p: NonNullable<typeof plans>[number]) => {
    setEditingId(p.id);
    // Gói < 1 GB → hiển thị & sửa theo MB cho tiện; ngược lại theo GB.
    const useMb = p.storageGb < 1;
    setDraft({
      price: p.price,
      storageValue: useMb ? Math.round(p.storageGb * MB_PER_GB) : p.storageGb,
      storageUnit: useMb ? "MB" : "GB",
      aiQuestions: p.aiQuestions,
      description: p.description,
      isActive: p.isActive,
    });
  };

  const cancel = () => {
    setEditingId(null);
    setDraft(null);
  };

  const save = async (id: number) => {
    if (!draft) return;
    // Quy đổi về GB (đơn vị chuẩn lưu trong hệ thống).
    const storageGb =
      draft.storageUnit === "MB"
        ? mbToGb(draft.storageValue)
        : draft.storageValue;
    try {
      await updatePlan.mutateAsync({
        id,
        price: draft.price,
        storageGb,
        aiQuestions: draft.aiQuestions,
        description: draft.description,
        isActive: draft.isActive,
      });
      toast.success("Đã cập nhật gói");
      cancel();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Cập nhật thất bại");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Cấu hình gói nâng cấp</CardTitle>
        <p className="text-sm text-muted-foreground">
          Chỉnh sửa giá (30 ngày), dung lượng lưu trữ và số câu hỏi AI của từng gói.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground">
              <TableHead>Gói</TableHead>
              <TableHead>Giá / 30 ngày</TableHead>
              <TableHead>Lưu trữ</TableHead>
              <TableHead>Câu hỏi AI</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-20 text-center">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : (plans ?? []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-20 text-center text-muted-foreground">
                  Chưa có gói nào
                </TableCell>
              </TableRow>
            ) : (
              (plans ?? []).map((p) => {
                const editing = editingId === p.id;
                return (
                  <TableRow key={p.id} className="[&>td]:py-3">
                    <TableCell className="font-semibold">{p.name}</TableCell>
                    <TableCell>
                      {editing ? (
                        <Input
                          type="number"
                          className="w-32 h-8"
                          value={draft?.price ?? 0}
                          onChange={(e) =>
                            setDraft((d) => d && { ...d, price: Number(e.target.value) })
                          }
                        />
                      ) : (
                        fmtVnd(p.price)
                      )}
                    </TableCell>
                    <TableCell>
                      {editing ? (
                        <div className="flex items-center gap-1.5">
                          <Input
                            type="number"
                            min={0}
                            step="any"
                            className="w-24 h-8"
                            value={draft?.storageValue ?? 0}
                            onChange={(e) =>
                              setDraft((d) => d && { ...d, storageValue: Number(e.target.value) })
                            }
                          />
                          <select
                            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                            value={draft?.storageUnit ?? "GB"}
                            onChange={(e) =>
                              setDraft((d) => {
                                if (!d) return d;
                                const nextUnit = e.target.value as "MB" | "GB";
                                if (nextUnit === d.storageUnit) return d;
                                // Quy đổi giá trị khi đổi đơn vị để giữ nguyên dung lượng thực.
                                const value =
                                  nextUnit === "MB"
                                    ? Math.round(d.storageValue * MB_PER_GB * 1000) / 1000
                                    : Math.round((d.storageValue / MB_PER_GB) * 1000) / 1000;
                                return { ...d, storageUnit: nextUnit, storageValue: value };
                              })
                            }
                          >
                            <option value="MB">MB</option>
                            <option value="GB">GB</option>
                          </select>
                        </div>
                      ) : (
                        formatStorage(p.storageGb)
                      )}
                    </TableCell>
                    <TableCell>
                      {editing ? (
                        <Input
                          type="number"
                          className="w-24 h-8"
                          value={draft?.aiQuestions ?? 0}
                          onChange={(e) =>
                            setDraft((d) => d && { ...d, aiQuestions: Number(e.target.value) })
                          }
                        />
                      ) : p.aiQuestions > 9999 ? (
                        "Không giới hạn"
                      ) : (
                        p.aiQuestions
                      )}
                    </TableCell>
                    <TableCell>
                      {editing ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setDraft((d) => d && { ...d, isActive: !d.isActive })
                          }
                        >
                          {draft?.isActive ? "Đang bật" : "Đang tắt"}
                        </Button>
                      ) : (
                        <Badge
                          variant="secondary"
                          className={
                            p.isActive
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-gray-500/10 text-gray-600"
                          }
                        >
                          {p.isActive ? "Đang bật" : "Đang tắt"}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editing ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => save(p.id)}
                            disabled={updatePlan.isPending}
                          >
                            <Save className="h-3.5 w-3.5 mr-1" /> Lưu
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancel}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => startEdit(p)}>
                          <Pencil className="h-3.5 w-3.5 mr-1" /> Sửa
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export const AdminPremiumPage: React.FC = () => {
  const [tab, setTab] = useState<TabKey>("all");
  const { data, isLoading } = useAdminTransactions(0, 50);

  const transactions = data?.content || [];
  const totalPaid = transactions.filter(t => t.status === "PAID").length;
  const totalRevenue = transactions
    .filter(t => t.status === "PAID")
    .reduce((sum, t) => sum + t.amount, 0);

  const filtered = useMemo(
    () => (tab === "all" ? transactions : transactions.filter((t) => t.status === tab)),
    [transactions, tab],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
          value={String(stats?.totalPremiumUsers ?? "—")}
          trend={stats?.totalPremiumTrend ?? 0}
=======
          value={String(totalPaid)}
          trend={0}
>>>>>>> origin/final/demo-v1
          icon={<Crown className="h-5 w-5" />}
          tone="bg-primary/10 text-primary"
        />
        <StatCard
          label="Pending Requests"
<<<<<<< HEAD
          value={String(stats?.pendingRequests ?? "—")}
          trend={stats?.pendingRequestsTrend ?? 0}
=======
          value={String(transactions.filter(t => t.status === "PENDING").length)}
          trend={0}
>>>>>>> origin/final/demo-v1
          icon={<Clock className="h-5 w-5" />}
          tone="bg-amber-500/10 text-amber-600"
        />
        <StatCard
          label="Revenue This Month"
<<<<<<< HEAD
          value={stats ? fmtVnd(stats.revenueThisMonth) : "—"}
          trend={stats?.revenueTrend ?? 0}
=======
          value={fmtVnd(totalRevenue)}
          trend={0}
>>>>>>> origin/final/demo-v1
          icon={<Wallet className="h-5 w-5" />}
          tone="bg-emerald-500/10 text-emerald-600"
        />
        <StatCard
<<<<<<< HEAD
          label="Expired Subscriptions"
          value={String(stats?.expiredSubscriptions ?? "—")}
          trend={stats?.expiredTrend ?? 0}
          icon={<XCircle className="h-5 w-5" />}
          tone="bg-destructive/10 text-destructive"
        />
>>>>>>> origin/Flashcars
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
<<<<<<< HEAD
          <CardTitle className="text-base">Lịch sử giao dịch nâng cấp</CardTitle>
=======
          <CardTitle className="text-base">
            Lịch sử giao dịch nâng cấp
          </CardTitle>
>>>>>>> origin/Flashcars
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="PLUS">Plus</TabsTrigger>
              <TabsTrigger value="PRO">Pro</TabsTrigger>
=======
          label="Total Transactions"
          value={String(transactions.length)}
          trend={0}
          icon={<XCircle className="h-5 w-5" />}
          tone="bg-destructive/10 text-destructive"
        />
      </div>

      <PlanConfigCard />

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">
            Lịch sử giao dịch thanh toán
          </CardTitle>
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="PAID">Thành công</TabsTrigger>
              <TabsTrigger value="PENDING">Chờ xử lý</TabsTrigger>
>>>>>>> origin/final/demo-v1
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground">
<<<<<<< HEAD
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Payment Proof</TableHead>
                <TableHead>Status</TableHead>
=======
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gói</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
>>>>>>> origin/final/demo-v1
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
<<<<<<< HEAD
<<<<<<< HEAD
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
=======
=======
>>>>>>> origin/final/demo-v1
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
                    Không có giao dịch nào
                  </TableCell>
                </TableRow>
              ) : (
<<<<<<< HEAD
                filtered.map((r) => {
                  const s = statusBadge[r.status];
                  return (
<<<<<<< HEAD
                    <TableRow key={r.id} className="[&>td]:py-4 [&>td]:text-[15px]">
                      <TableCell className="font-semibold">{r.name}</TableCell>
                      <TableCell className="text-muted-foreground">{r.email}</TableCell>
                      <TableCell><PlanBadge plan={r.plan} /></TableCell>
                      <TableCell className="text-muted-foreground">{r.registrationDate}</TableCell>
=======
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
>>>>>>> origin/Flashcars
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <FileCheck className="h-4 w-4" /> {r.paymentMethod}
                        </span>
                      </TableCell>
<<<<<<< HEAD
                      <TableCell><Badge variant="secondary" className={`${s.cls} text-[13px] px-2.5 py-1`}>{s.label}</Badge></TableCell>
=======
=======
                filtered.map((tx) => {
                  const s = statusBadge[tx.status] || statusBadge.PENDING;
                  return (
                    <TableRow
                      key={tx.id}
                      className="[&>td]:py-4 [&>td]:text-[15px]"
                    >
                      <TableCell className="font-semibold">
                        {tx.userName || "N/A"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tx.userEmail || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{tx.planName}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {fmtVnd(tx.amount)}
                      </TableCell>
>>>>>>> origin/final/demo-v1
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${s.cls} text-[13px] px-2.5 py-1`}
                        >
                          {s.label}
                        </Badge>
                      </TableCell>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
                      <TableCell className="text-muted-foreground text-sm">
                        {fmtDate(tx.createdAt)}
                      </TableCell>
>>>>>>> origin/final/demo-v1
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
