// src/features/admin/components/AdminDocumentsPage.tsx
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { FileText, Trash2, CheckCircle2, XCircle, RotateCcw, Search, AlertCircle } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// UUID validation helper
const isValidUUID = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
};

type TabValue = "all" | "pending" | "approved" | "rejected" | "trash";

const statusLabel: Record<string, string> = {
  COMPLETED: "Đã upload",
  READY: "Đã duyệt",
  REJECT: "Từ chối",
};

export const AdminDocumentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [query, setQuery] = useState("");
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

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
          d.ownerName?.toLowerCase().includes(query.toLowerCase()),
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
          Quản lý Tài liệu
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Duyệt và quản lý các tài liệu trong hệ thống
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Tài liệu</CardTitle>
            <span className="text-sm text-muted-foreground">
              {filtered.length} tài liệu
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
                    placeholder="Tìm theo tên tài liệu hoặc người upload…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tài liệu</TableHead>
                      <TableHead>Người upload</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                          Không có tài liệu
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
                            {d.ownerName ?? "-"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant={d.status === "READY" ? "secondary" : d.status === "REJECT" ? "destructive" : "outline"}>
                                {statusLabel[d.status as string] ?? d.status}
                              </Badge>
                              {d.status === "REJECT" && d.rejectReason && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <AlertCircle className="h-4 w-4 text-destructive" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Lý do: {d.rejectReason}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
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
                                      console.log("[DEBUG] Approve clicked, docId:", d.id);
                                      if (!isValidUUID(d.id)) {
                                        toast.error("Invalid document ID format");
                                        return;
                                      }
                                      approveDocument.mutate(d.id, {
                                        onSuccess: () => toast.success("Đã duyệt tài liệu"),
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
                                      if (!d.id) {
                                        toast.error("Tài liệu không có ID hợp lệ");
                                        return;
                                      }
                                      console.log("Button clicked, document ID:", d.id);
                                      setRejectId(d.id);
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
                                  onClick={() => {
                                    if (!isValidUUID(d.id)) {
                                      toast.error("Invalid document ID format");
                                      return;
                                    }
                                    restoreDocument.mutate(d.id, {
                                      onSuccess: () => toast.success("Đã khôi phục tài liệu"),
                                    });
                                  }}
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
                                    if (!isValidUUID(d.id)) {
                                      toast.error("Invalid document ID format");
                                      return;
                                    }
                                    if (window.confirm("Xóa vĩnh viễn tài liệu này?")) {
                                      deleteDocument.mutate(d.id, {
                                        onSuccess: () => toast.success("Đã xóa tài liệu"),
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

      <Dialog open={!!rejectId} onOpenChange={() => setRejectId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối tài liệu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn từ chối tài liệu này không? Vui lòng nhập lý do.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Nhập lý do từ chối..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectId(null)}>Hủy</Button>
            <Button
              variant="destructive"
              disabled={rejectDocument.isPending}
              onClick={() => {
                if (!rejectId) return;
                  rejectDocument.mutate({ 
                    id: rejectId, 
                    reason: rejectReason.trim() === "" ? "" : rejectReason 
                  }, {
                  onSuccess: () => {
                    toast.success("Đã từ chối tài liệu");
                    setRejectId(null);
                    setRejectReason("");
                  },
                  onError: (err: any) => toast.error("Lỗi: " + err.message),
                });
              }}
            >
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
