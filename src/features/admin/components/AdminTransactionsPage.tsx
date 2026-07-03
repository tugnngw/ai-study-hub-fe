import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAdminTransactions } from "../hooks";
import { Loader2 } from "lucide-react";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (date: string) => new Date(date).toLocaleString("vi-VN");

const statusBadge: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Chờ xử lý", cls: "bg-amber-500/10 text-amber-600" },
  PAID: { label: "Thành công", cls: "bg-emerald-500/10 text-emerald-600" },
  FAILED: { label: "Thất bại", cls: "bg-destructive/10 text-destructive" },
  CANCELLED: { label: "Đã hủy", cls: "bg-gray-500/10 text-gray-600" },
};

export const AdminTransactionsPage: React.FC = () => {
  const [page] = useState(0);
  const { data, isLoading } = useAdminTransactions(page, 50);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const transactions = data?.content || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Lịch sử giao dịch
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Xem tất cả giao dịch thanh toán của người dùng
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Tất cả giao dịch ({data?.totalElements || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="[&>th]:text-[14px] [&>th]:font-semibold [&>th]:text-foreground">
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gói</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Chưa có giao dịch nào
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => {
                  const s = statusBadge[tx.status] || statusBadge.PENDING;
                  return (
                    <TableRow
                      key={tx.id}
                      className="[&>td]:py-4 [&>td]:text-[15px]"
                    >
                      <TableCell className="font-mono text-sm">
                        {tx.id}
                      </TableCell>
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
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${s.cls} text-[13px] px-2.5 py-1`}
                        >
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
