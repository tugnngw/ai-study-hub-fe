// src/features/payment/components/TransactionHistoryPage.tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Receipt, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PlanBadge } from "@/features/admin/components/PlanBadge";
import { paymentApi } from "@/features/admin/services/paymentApi";
import type { TransactionItem, TransactionStatus } from "@/features/admin/types/admin.types";

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
    paymentApi.getTransactions().then((d) => { if (alive) setTxs(d); });
    return () => { alive = false; };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">Lịch sử giao dịch</h1>
          <p className="text-muted-foreground mt-1 text-sm">Các giao dịch mua gói Premium gần đây của bạn</p>
        </div>
        <Button asChild className="bg-gradient-brand shadow-brand hover:opacity-90">
          <Link to="/premium"><Sparkles className="h-4 w-4 mr-2" /> Nâng cấp gói</Link>
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
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Chưa có giao dịch nào
                  </TableCell>
                </TableRow>
              ) : (
                txs.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell><PlanBadge plan={t.plan} /></TableCell>
                    <TableCell className="font-medium">{fmtVnd(t.amount)}</TableCell>
                    <TableCell className="text-muted-foreground">{t.method}</TableCell>
                    <TableCell className="text-muted-foreground">{t.date}</TableCell>
                    <TableCell><Badge variant="secondary" className={cn(statusCls[t.status])}>{t.status}</Badge></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
