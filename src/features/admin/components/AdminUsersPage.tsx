// src/features/admin/components/AdminUsersPage.tsx
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Lock, Unlock, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlanBadge } from "./PlanBadge";
import { useAdminUsers, useToggleUserStatus, useDeleteUser } from "../hooks";

export const AdminUsersPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data: users = [] } = useAdminUsers();
  const toggleStatus = useToggleUserStatus();
  const deleteUser = useDeleteUser();

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase())
      ),
    [users, query]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">Quản lý Users</h1>
          <p className="text-muted-foreground mt-1 text-sm">Quản lý tài khoản thành viên trong hệ thống</p>
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
          <span className="text-sm text-muted-foreground">{filtered.length} thành viên</span>
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
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Không tìm thấy thành viên
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-muted text-sm">{u.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell><PlanBadge plan={u.plan} /></TableCell>
                    <TableCell>
                      <Badge variant={u.status === "Hoạt động" ? "secondary" : "destructive"}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toggleStatus.mutate(u.id, {
                              onSuccess: () =>
                                toast.success(u.status === "Hoạt động" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản"),
                            })
                          }
                        >
                          {u.status === "Hoạt động" ? <Lock /> : <Unlock />}
                          {u.status === "Hoạt động" ? "Khóa" : "Mở khóa"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            if (window.confirm("Xóa thành viên?"))
                              deleteUser.mutate(u.id, { onSuccess: () => toast.success("Đã xóa thành viên") });
                          }}
                        >
                          <Trash2 /> Xóa
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
