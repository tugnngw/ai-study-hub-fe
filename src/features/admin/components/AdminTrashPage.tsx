// src/features/admin/components/AdminTrashPage.tsx
import React, { useState } from "react";
import { toast } from "sonner";
import { FileText, RotateCcw, Trash2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  useDeletedFiles, useDeletedAccounts, usePermanentDelete, useRestoreItem,
} from "../hooks";
import type { TrashItemType, TrashAction } from "../types/admin.types";

function CountdownBadge({ days }: { days: number }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        days <= 5
          ? "bg-destructive/10 text-destructive"
          : "bg-amber-500/10 text-amber-600"
      )}
    >
      {days} ngày
    </Badge>
  );
}

export const AdminTrashPage: React.FC = () => {
  const [subTab, setSubTab] = useState<TrashItemType>("file");
  const { data: delFiles = [] } = useDeletedFiles();
  const { data: delAccs = [] } = useDeletedAccounts();
  const permanentDelete = usePermanentDelete();
  const restoreItem = useRestoreItem();

  const handleAction = (id: number, type: TrashItemType, act: TrashAction) => {
    if (act === "delete") {
      if (!window.confirm("Xóa vĩnh viễn mục này?")) return;
      permanentDelete.mutate({ id, type }, { onSuccess: () => toast.success("Đã xóa vĩnh viễn") });
    } else {
      restoreItem.mutate({ id, type }, { onSuccess: () => toast.success("Đã khôi phục") });
    }
  };

  const ActionButtons = ({ id, type }: { id: number; type: TrashItemType }) => (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm" onClick={() => handleAction(id, type, "restore")}>
        <RotateCcw /> Khôi phục
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-destructive hover:text-destructive"
        onClick={() => handleAction(id, type, "delete")}
      >
        <Trash2 /> Xóa vĩnh viễn
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">Thùng rác</h1>
        <p className="text-muted-foreground mt-1 text-sm">Khôi phục hoặc xóa vĩnh viễn các mục đã xóa</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Thùng rác</CardTitle>
          <Tabs value={subTab} onValueChange={(v) => setSubTab(v as TrashItemType)}>
            <TabsList>
              <TabsTrigger value="file">File</TabsTrigger>
              <TabsTrigger value="account">Tài khoản</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={subTab}>
            <TabsContent value="file" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên File</TableHead>
                    <TableHead>Ngày xóa</TableHead>
                    <TableHead>Còn lại</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {delFiles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        Thùng rác trống
                      </TableCell>
                    </TableRow>
                  ) : (
                    delFiles.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-9 w-9 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                              <FileText className="h-4 w-4" />
                            </div>
                            <span className="font-medium truncate">{f.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{f.deletedDate}</TableCell>
                        <TableCell><CountdownBadge days={f.remainingDays} /></TableCell>
                        <TableCell className="text-right"><ActionButtons id={f.id} type="file" /></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="account" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chủ tài khoản</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Còn lại</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {delAccs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        Thùng rác trống
                      </TableCell>
                    </TableRow>
                  ) : (
                    delAccs.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>
                          <div className="flex items-center gap-3 min-w-0">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-muted text-sm">{a.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium truncate">{a.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{a.email}</TableCell>
                        <TableCell><CountdownBadge days={a.remainingDays} /></TableCell>
                        <TableCell className="text-right"><ActionButtons id={a.id} type="account" /></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-2 px-6 py-3.5 border-t border-border bg-muted/30">
            <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <p className="text-muted-foreground text-xs">
              Các mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
