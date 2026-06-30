// src/features/admin/components/AdminUsersPage.tsx
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Lock, Unlock, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlanBadge } from "./PlanBadge";
import { useAdminUsers, useDeleteUser, useLockUser, useUnlockUser } from "../hooks";

export const AdminUsersPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data: usersResponse = [], isLoading } = useAdminUsers();
  const users = Array.isArray(usersResponse) ? usersResponse : [];
  const lockUser = useLockUser();
  const unlockUser = useUnlockUser();
  const deleteUser = useDeleteUser();

  const filtered = useMemo(
      () =>
          users.filter(
              (u) =>
                   u.name?.toLowerCase().includes(query.toLowerCase()) ||
                   u.email?.toLowerCase().includes(query.toLowerCase()),
          ),
      [users, query],
  );

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-display">
              Quản lý Users
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Quản lý tài khoản thành viên trong hệ thống
            </p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
                placeholder="Tìm tên hoặc email…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
            />
          </div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Danh sách thành viên</CardTitle>
            <span className="text-sm text-muted-foreground">
            {filtered.length} thành viên
          </span>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thành viên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Gói</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                          colSpan={5}
                          className="h-24 text-center text-muted-foreground"
                      >
                        {users.length === 0 ? "Không có thành viên nào" : "Không tìm thấy thành viên"}
                      </TableCell>
                    </TableRow>
                ) : (
                    filtered.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-muted text-sm">
                                  {u.name?.charAt(0).toUpperCase() ?? "?"}
                                </AvatarFallback>
                              </Avatar>
                               <span className="font-medium">{u.name ?? "-"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {u.email}
                          </TableCell>
                          <TableCell>
                            <PlanBadge plan={u.plan} />
                          </TableCell>
                          <TableCell>
                               <Badge
                                 variant={
                                   u.status === "Hoạt động" ? "secondary" :
                                   u.status === "Ngưng hoạt động (Khóa)" ? "outline" : "destructive"
                                 }
                               >
                                 {u.status}
                               </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={lockUser.isPending || unlockUser.isPending}
          onClick={() =>
            u.status === "Hoạt động"
              ? lockUser.mutate(u.id, { onSuccess: () => toast.success("Đã khóa tài khoản") })
              : unlockUser.mutate(u.id, { onSuccess: () => toast.success("Đã mở khóa tài khoản") })
          }
        >
          {u.status === "Hoạt động" ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
          {u.status === "Hoạt động" ? "Khóa" : "Mở khóa"}
        </Button>
                              <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  disabled={deleteUser.isPending}
                                  onClick={() => {
                                     if (window.confirm(`Xóa thành viên "${u.name ?? ""}"?`))
                                      deleteUser.mutate(u.id, {
                                        onSuccess: () =>
                                            toast.success("Đã xóa thành viên"),
                                      });
                                  }}
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Xóa
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