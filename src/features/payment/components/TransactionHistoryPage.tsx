// src/features/payment/components/TransactionHistoryPage.tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Receipt, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
<<<<<<< HEAD
<<<<<<< HEAD
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
=======
=======
>>>>>>> origin/final/demo-v1
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
=======
>>>>>>> origin/final/demo-v1
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PlanBadge } from "@/features/admin/components/PlanBadge";
import { paymentApi } from "@/features/admin/services/paymentApi";
<<<<<<< HEAD
<<<<<<< HEAD
import type { TransactionItem, TransactionStatus } from "@/features/admin/types/admin.types";
=======
import type {
  TransactionItem,
  TransactionStatus,
} from "@/features/admin/types/admin.types";
>>>>>>> origin/Flashcars

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";

const statusCls: Record<TransactionStatus, string> = {
  "Thành công": "bg-emerald-500/10 text-emerald-600",
  "Đang xử lý": "bg-amber-500/10 text-amber-600",
  "Thất bại": "bg-destructive/10 text-destructive",
};

export function TransactionHistoryPage() {
  const [txs, setTxs] = useState<TransactionItem[]>([]);

  useEffect(() => {
    let alive = true;
<<<<<<< HEAD
    paymentApi.getTransactions().then((d) => { if (alive) setTxs(d); });
    return () => { alive = false; };
=======
=======

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { 
  day: "2-digit", 
  month: "2-digit", 
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

const statusMap: Record<string, { label: string; cls: string }> = {
  PAID: { label: "Thành công", cls: "bg-emerald-500/10 text-emerald-600" },
  PENDING: { label: "Đang xử lý", cls: "bg-amber-500/10 text-amber-600" },
  FAILED: { label: "Thất bại", cls: "bg-destructive/10 text-destructive" },
  CANCELLED: { label: "Đã hủy", cls: "bg-muted text-muted-foreground" },
};

interface TransactionData {
  id: string;
  accountId: string;
  planName: string;
  amount: number;
  status: string;
  description: string;
  transactionId: string;
  payosOrderCode: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export function TransactionHistoryPage() {
  const [txs, setTxs] = useState<TransactionData[]>([]);

  useEffect(() => {
    let alive = true;
>>>>>>> origin/final/demo-v1
    paymentApi.getTransactions().then((d) => {
      if (alive) setTxs(d);
    });
    return () => {
      alive = false;
    };
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
<<<<<<< HEAD
<<<<<<< HEAD
          <h1 className="text-2xl font-bold tracking-tight font-display">Lịch sử giao dịch</h1>
          <p className="text-muted-foreground mt-1 text-sm">Các giao dịch mua gói Premium gần đây của bạn</p>
        </div>
        <Button asChild className="bg-gradient-brand shadow-brand hover:opacity-90">
          <Link to="/premium"><Sparkles className="h-4 w-4 mr-2" /> Nâng cấp gói</Link>
=======
=======
>>>>>>> origin/final/demo-v1
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Lịch sử giao dịch
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Các giao dịch mua gói Premium gần đây của bạn
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-brand shadow-brand hover:opacity-90"
        >
          <Link to="/premium">
            <Sparkles className="h-4 w-4 mr-2" /> Nâng cấp gói
          </Link>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Receipt className="h-4 w-4 text-muted-foreground" /> Giao dịch
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GD</TableHead>
                <TableHead>Gói</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txs.length === 0 ? (
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
                    Chưa có giao dịch nào
                  </TableCell>
                </TableRow>
              ) : (
<<<<<<< HEAD
                txs.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
<<<<<<< HEAD
                    <TableCell><PlanBadge plan={t.plan} /></TableCell>
                    <TableCell className="font-medium">{fmtVnd(t.amount)}</TableCell>
                    <TableCell className="text-muted-foreground">{t.method}</TableCell>
                    <TableCell className="text-muted-foreground">{t.date}</TableCell>
                    <TableCell><Badge variant="secondary" className={cn(statusCls[t.status])}>{t.status}</Badge></TableCell>
=======
                    <TableCell>
                      <PlanBadge plan={t.plan} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {fmtVnd(t.amount)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.method}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(statusCls[t.status])}
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
>>>>>>> origin/Flashcars
                  </TableRow>
                ))
=======
                txs.map((t) => {
                  const statusInfo = statusMap[t.status] || { label: t.status, cls: "bg-muted text-muted-foreground" };
                  return (
                    <TableRow key={t.id}>
                      <TableCell className="font-mono text-xs">{t.id.slice(0, 8)}...</TableCell>
                      <TableCell className="font-medium">{t.planName}</TableCell>
                      <TableCell className="font-medium">
                        {fmtVnd(t.amount)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {t.paymentMethod || "PayOS"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {fmtDate(t.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(statusInfo.cls)}
                        >
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
>>>>>>> origin/final/demo-v1
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
