// src/features/admin/components/AdminPremiumPage.tsx
import React, { useMemo, useState } from "react";
import {
  Crown,
  Wallet,
  XCircle,
  Pencil,
  Plus,
  Trash2,
  RotateCcw,
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  useAdminTransactions,
  useAdminPlans,
  useUpdatePlan,
  useCreatePlan,
  useDeletePlan,
  useRestorePlan,
} from "../hooks";
import { formatStorage } from "@/lib/config";
import { Loader2 } from "lucide-react";
import { PlanFormModal } from "./PlanFormModal";
import type { AdminPlan, RevenueStatsResponse } from "../services/paymentApi";
import { paymentApi } from "../services/paymentApi";
import { StatCard } from "@/components/ui/stat-card";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (date: string) => new Date(date).toLocaleString("vi-VN");

const statusBadge: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Chờ thanh toán", cls: "bg-amber-500/10 text-amber-600" },
  PROCESSING: { label: "Đang xử lý", cls: "bg-blue-500/10 text-blue-600" },
  PAID: { label: "Đã thanh toán", cls: "bg-emerald-500/10 text-emerald-600" },
  CANCELLED: { label: "Đã hủy", cls: "bg-muted text-muted-foreground" },
  FAILED: { label: "Thất bại", cls: "bg-destructive/10 text-destructive" },
  EXPIRED: { label: "Hết hạn", cls: "bg-slate-500/10 text-slate-600" },
};

type TabKey = "all" | "PAID" | "PENDING";

function PlanConfigCard() {
  const { data: plans, isLoading } = useAdminPlans();
  const updatePlan = useUpdatePlan();
  const createPlan = useCreatePlan();
  const deletePlan = useDeletePlan();
  const restorePlan = useRestorePlan();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedPlan, setSelectedPlan] = useState<AdminPlan | null>(null);

  const openCreateModal = () => {
    setSelectedPlan(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEditModal = (plan: AdminPlan) => {
    setSelectedPlan(plan);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Ẩn gói "${name}"?`)) return;
    try {
      await deletePlan.mutateAsync(id);
      toast.success("Đã ẩn gói");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ẩn thất bại");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restorePlan.mutateAsync(id);
      toast.success("Đã khôi phục gói");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Khôi phục thất bại");
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Cấu hình gói nâng cấp</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Quản lý giá, dung lượng, thời hạn và tính năng của từng gói.
            </p>
          </div>
          <Button size="sm" onClick={openCreateModal}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Tạo gói
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground">
                <TableHead>Gói</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Cấp độ</TableHead>
                <TableHead>Thời hạn</TableHead>
                <TableHead>Lưu trữ</TableHead>
                <TableHead>Quiz AI (số câu)</TableHead>
                <TableHead>AI Chat (lượt)</TableHead>
                <TableHead>Tạo Quiz (lượt)</TableHead>
                <TableHead>Tạo Flashcard (lượt)</TableHead>
                <TableHead>Tóm tắt (lượt)</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={12} className="h-20 text-center">
                    <Loader2 className="h-5 w-5 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : (plans ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="h-20 text-center text-muted-foreground">
                    Chưa có gói nào
                  </TableCell>
                </TableRow>
              ) : (
                (plans ?? []).map((p) => (
                  <TableRow key={p.id} className="[&>td]:py-3">
                    <TableCell className="font-semibold">
                      {p.name}
                      {!p.isActive && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-gray-100 text-gray-500">
                          Đã ẩn
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{fmtVnd(p.price)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {p.tier ?? 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      {p.durationDays === 0 || p.durationDays === -1 ? "Vĩnh viễn" : p.durationDays ? `${p.durationDays} ngày` : "—"}
                    </TableCell>
                    <TableCell>{formatStorage(p.storageGb)}</TableCell>
                    <TableCell>
                      {p.aiQuestions == null ? "—" : p.aiQuestions > 9999 ? "Không giới hạn" : `${p.aiQuestions} câu`}
                    </TableCell>
                    <TableCell>
                      {p.chatLimit == null ? "—" : p.chatLimit > 9999 ? "Không giới hạn" : `${p.chatLimit} lượt`}
                    </TableCell>
                    <TableCell>
                      {p.questionLimit == null ? "—" : p.questionLimit > 9999 ? "Không giới hạn" : `${p.questionLimit} lượt`}
                    </TableCell>
                    <TableCell>
                      {p.flashcardLimit == null ? "—" : p.flashcardLimit > 9999 ? "Không giới hạn" : `${p.flashcardLimit} lượt`}
                    </TableCell>
                    <TableCell>
                      {p.summaryLimit == null ? "—" : p.summaryLimit > 9999 ? "Không giới hạn" : `${p.summaryLimit} lượt`}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(p)}
                        >
                          <Pencil className="h-3.5 w-3.5 mr-1" /> Sửa
                        </Button>
                        {p.isActive ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(p.id, p.name)}
                            disabled={deletePlan.isPending}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-emerald-600 hover:bg-emerald-500/10"
                            onClick={() => handleRestore(p.id)}
                            disabled={restorePlan.isPending}
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PlanFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        plan={selectedPlan}
        mode={modalMode}
        createPlan={createPlan}
        updatePlan={updatePlan}
        existingPlans={plans}
      />
    </>
  );
}

export const AdminPremiumPage: React.FC = () => {
  const [tab, setTab] = useState<TabKey>("all");
  const { data: transactions, isLoading: transactionsLoading } = useAdminTransactions(0, 50);

  // ✅ SỬA: Dùng API thay vì đếm client
  const { data: stats, isLoading: statsLoading } = useQuery<RevenueStatsResponse>({
    queryKey: ['admin', 'revenue'],
    queryFn: () => paymentApi.getRevenueStats(),
    refetchInterval: 60000, // 1 minute
  });

  const filtered = useMemo(
    () => (tab === "all" ? (transactions?.content || []) : (transactions?.content || []).filter((t) => t.status === tab)),
    [transactions, tab],
  );

  if (transactionsLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">Quản lý Premium</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Theo dõi gói trả phí và lịch sử giao dịch nâng cấp
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Revenue"
          value={fmtVnd(stats?.totalRevenue ?? 0)}
          icon={<Wallet className="h-5 w-5" />}
          tone="bg-emerald-500/10 text-emerald-600"
        />
        <StatCard
          label="Paid Transactions"
          value={String(stats?.totalPaidTransactions ?? 0)}
          icon={<Crown className="h-5 w-5" />}
          tone="bg-primary/10 text-primary"
        />
        <StatCard
          label="Failed Transactions"
          value={String(stats?.totalFailedTransactions ?? 0)}
          icon={<XCircle className="h-5 w-5" />}
          tone="bg-destructive/10 text-destructive"
        />
      </div>

      <PlanConfigCard />

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Lịch sử giao dịch thanh toán</CardTitle>
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="PAID">Thành công</TabsTrigger>
              <TabsTrigger value="PENDING">Chờ xử lý</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground">
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gói</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Không có giao dịch nào
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((tx) => {
                  const s = statusBadge[tx.status] || statusBadge.PENDING;
                  return (
                    <TableRow key={tx.id} className="[&>td]:py-4 [&>td]:text-[15px]">
                      <TableCell className="font-semibold">{tx.userName || "N/A"}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.userEmail || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tx.planName}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{fmtVnd(tx.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`${s.cls} text-[13px] px-2.5 py-1`}>
                          {s.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {fmtDate(tx.createdAt)}
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
