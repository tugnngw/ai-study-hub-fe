// src/features/admin/components/AdminFilesPage.tsx
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { FileText, Trash2, CheckCircle2, XCircle, RotateCcw, Search, AlertTriangle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminDocuments, useApproveDocument, useRejectDocument, useDeleteDocument, useRestoreDocument } from "../hooks";

type TabValue = "all" | "pending" | "approved" | "rejected" | "trash";

const statusLabel: Record<string, string> = {
  COMPLETED: "Đã upload",
  READY: "Đã duyệt",
  REJECT: "Từ chối",
  PROCESSING: "Đang xử lý",
  FAILED: "Lỗi",
};

export const AdminFilesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [query, setQuery] = useState("");

  const { data: documentsResponse = [], isLoading } = useAdminDocuments(activeTab);
  const approveDocument = useApproveDocument();
  const rejectDocument = useRejectDocument();
  const deleteDocument = useDeleteDocument();
  const restoreDocument = useRestoreDocument();

  const documents = Array.isArray(documentsResponse) ? documentsResponse : [];

  const filtered = useMemo(
    () =>
      documents.filter(
        (d) =>
          d.title?.toLowerCase().includes(query.toLowerCase()) ||
          d.ownerId?.toLowerCase().includes(query.toLowerCase()),
      ),
    [documents, query],
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Quản lý File
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Xem toàn bộ file user đã upload lên hệ thống
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Tất cả file</CardTitle>
            <span className="text-sm text-muted-foreground">
              {filtered.length} file
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>
              <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
              <TabsTrigger value="rejected">Từ chối</TabsTrigger>
              <TabsTrigger value="trash">Thùng rác</TabsTrigger>
            </TabsList>

            {["all", "pending", "approved", "rejected", "trash"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <div className="relative w-full max-w-xs">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Tìm theo tên file hoặc owner…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          Không có file nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((d) => (
                        <TableRow key={d.id}>
                          <TableCell>
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium truncate">{d.title}</p>
                                <p className="text-muted-foreground text-xs">
                                  {d.fileSize ? `${(d.fileSize / 1024 / 1024).toFixed(2)} MB` : ""}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {d.ownerId?.slice(0, 8)}...
                          </TableCell>
                          <TableCell>
                            <Badge variant={d.status === "READY" ? "secondary" : d.status === "REJECT" ? "destructive" : "outline"}>
                              {statusLabel[d.status as string] ?? d.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {d.fileSize ? `${(d.fileSize / 1024).toFixed(1)} KB` : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {activeTab === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={approveDocument.isPending}
                                    onClick={() => {
                                      approveDocument.mutate(d.id, {
                                        onSuccess: () => toast.success("Đã duyệt file"),
                                        onError: (err) => toast.error("Lỗi: " + err.message),
                                      });
                                    }}
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Duyệt
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={rejectDocument.isPending}
                                    onClick={() => {
                                      rejectDocument.mutate(d.id, {
                                        onSuccess: () => toast.success("Đã từ chối file"),
                                        onError: (err) => toast.error("Lỗi: " + err.message),
                                      });
                                    }}
                                  >
                                    <XCircle className="h-3.5 w-3.5" /> Từ chối
                                  </Button>
                                </>
                              )}
                              {activeTab === "trash" ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={restoreDocument.isPending}
                                  onClick={() =>
                                    restoreDocument.mutate(d.id, {
                                      onSuccess: () => toast.success("Đã khôi phục file"),
                                    })
                                  }
                                >
                                  <RotateCcw className="h-3.5 w-3.5" /> Khôi phục
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  disabled={deleteDocument.isPending}
                                  onClick={() => {
                                    if (window.confirm("Xóa file này?")) {
                                      deleteDocument.mutate(d.id, {
                                        onSuccess: () => toast.success("Đã xóa file"),
                                      });
                                    }
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> Xóa
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
