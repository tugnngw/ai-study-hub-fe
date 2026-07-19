// src/features/admin/components/AdminApprovalsPage.tsx
import React from "react";
import { toast } from "sonner";
import { FileText, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApprovals, useApprovalAction } from "../hooks";
import type { ApprovalAction } from "../types/admin.types";

export const AdminApprovalsPage: React.FC = () => {
  const { data: list = [] } = useApprovals();
  const action = useApprovalAction();

  const handle = (id: number, act: ApprovalAction) =>
    action.mutate(
      { id, action: act },
      { onSuccess: () => toast.success(act === "approve" ? "Đã duyệt tài liệu" : "Đã từ chối tài liệu") }
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">Phê duyệt tài liệu</h1>
        <p className="text-muted-foreground mt-1 text-sm">Xét duyệt các tài liệu đang chờ</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Đang chờ duyệt</CardTitle>
          <span className="text-sm text-muted-foreground">{list.length} mục</span>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên tài liệu</TableHead>
                <TableHead>Người tải lên</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    Không có tài liệu chờ duyệt
                  </TableCell>
                </TableRow>
              ) : (
                list.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-medium truncate">{item.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="bg-muted text-xs">{item.uploader.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{item.uploader}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handle(item.id, "reject")}
                        >
                          <X /> Từ chối
                        </Button>
                        <Button size="sm" onClick={() => handle(item.id, "approve")}>
                          <Check /> Duyệt
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
