// src/features/admin/components/AdminFilesPage.tsx
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import { toast } from "sonner";
import { FileText, AlertTriangle, Flag, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useReportedFiles, useHandleReportDecision } from "../hooks";
import type { ReportedFileItem, ReportDecision } from "../types/admin.types";

export const AdminFilesPage: React.FC = () => {
  const { data: files = [] } = useReportedFiles();
  const handleDecision = useHandleReportDecision();

  const [selected, setSelected] = useState<ReportedFileItem | null>(null);
  const [decision, setDecision] = useState<ReportDecision | "">("");
  const [note, setNote] = useState("");
  const [resolved, setResolved] = useState(false);

  const open = (file: ReportedFileItem) => {
    setSelected(file);
    setDecision("");
    setNote("");
    setResolved(false);
  };
  const close = () => setSelected(null);

  const confirm = () => {
    if (!selected || !decision) return;
    handleDecision.mutate(
      { id: selected.id, decision },
      {
        onSuccess: () => {
          setResolved(true);
          toast.success(decision === "remove" ? "Đã gỡ tài liệu" : "Đã từ chối báo cáo");
        },
      }
    );
  };
=======
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { FileText, Trash2, CheckCircle2, XCircle, RotateCcw, Search, AlertTriangle } from "lucide-react";
=======
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { FileText, Trash2, CheckCircle2, XCircle, RotateCcw, Search, AlertTriangle, Eye } from "lucide-react";
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD

type TabValue = "all" | "pending" | "approved" | "rejected" | "trash";
=======
import { FilePreviewDialog } from "./FilePreviewDialog";

type TabValue = "all" | "pending" | "approved" | "rejected";
>>>>>>> origin/final/demo-v1

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

<<<<<<< HEAD
=======
  // File đang xem trước + tập hợp id đã được admin xem (để bắt buộc xem trước khi duyệt).
  const [preview, setPreview] = useState<{ title: string; url?: string | null; mimeType?: string | null } | null>(null);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

  return (
    <div className="space-y-6">
      <div>
<<<<<<< HEAD
<<<<<<< HEAD
        <h1 className="text-2xl font-bold tracking-tight font-display">Quản lý Tài liệu</h1>
        <p className="text-muted-foreground mt-1 text-sm">Xử lý các tài liệu bị báo cáo vi phạm</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Tài liệu bị báo cáo</CardTitle>
          <span className="text-sm text-muted-foreground">{files.length} tài liệu</span>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên File</TableHead>
                <TableHead>Người đăng</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Báo cáo</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Không có báo cáo nào
                  </TableCell>
                </TableRow>
              ) : (
                files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-medium truncate">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{file.uploader}</TableCell>
                    <TableCell className="text-muted-foreground">{file.size}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-destructive font-semibold">
                        <Flag className="h-3.5 w-3.5" />
                        {file.reports}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => open(file)}>
                        <AlertTriangle /> Xử lý
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-md">
          {selected && !resolved && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  Báo cáo tài liệu
                </DialogTitle>
                <DialogDescription>Xem xét và đưa ra quyết định xử lý.</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{selected.name}</p>
                    <p className="text-muted-foreground text-xs">Tải lên bởi {selected.uploader}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-muted text-[10px]">{selected.reporter.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">Báo cáo bởi {selected.reporter}</span>
                  </div>
                  <p className="text-destructive font-semibold text-xs mb-1">Lý do báo cáo</p>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-sm leading-relaxed">
                    {selected.reason}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Quyết định xử lý *</Label>
                  <RadioGroup value={decision} onValueChange={(v) => setDecision(v as ReportDecision)} className="space-y-2">
                    <label className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      decision === "remove" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    )}>
                      <RadioGroupItem value="remove" className="mt-1" />
                      <span>
                        <span className="block font-medium text-sm">Gỡ tài liệu xuống</span>
                        <span className="block text-muted-foreground text-xs">Xóa tài liệu và thông báo người tải</span>
                      </span>
                    </label>
                    <label className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      decision === "reject" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    )}>
                      <RadioGroupItem value="reject" className="mt-1" />
                      <span>
                        <span className="block font-medium text-sm">Từ chối báo cáo</span>
                        <span className="block text-muted-foreground text-xs">Tài liệu không vi phạm</span>
                      </span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="note" className="mb-1.5 block">Ghi chú (tùy chọn)</Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Nội dung thông báo gửi tới người liên quan…"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={close}>Hủy</Button>
                <Button disabled={!decision} onClick={confirm}>Xác nhận xử lý</Button>
              </DialogFooter>
            </>
          )}

          {selected && resolved && (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold mb-1.5">Đã giải quyết báo cáo</h3>
              <p className="text-muted-foreground text-sm max-w-[300px] mb-6">
                {decision === "remove"
                  ? "Tài liệu đã được gỡ xuống và người dùng đã được thông báo."
                  : "Báo cáo đã được từ chối, tài liệu vẫn được giữ nguyên."}
              </p>
              <Button className="w-full" onClick={close}>Đóng</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
              <TabsTrigger value="trash">Thùng rác</TabsTrigger>
            </TabsList>

            {["all", "pending", "approved", "rejected", "trash"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
=======
            </TabsList>

            {["all", "pending", "approved", "rejected"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {tab === "trash" && (
                  <div className="px-4 py-3 bg-muted/50 rounded-lg border border-muted">
                    <p className="text-sm text-muted-foreground">
                      💡 File trong thùng rác có thể được khôi phục lại cho user. Admin không thể xóa vĩnh viễn file tại đây.
                    </p>
                  </div>
                )}
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
                      <TableHead>Trạng thái</TableHead>
=======
                      <TableHead>{tab === "trash" ? "Thời gian xóa" : "Trạng thái"}</TableHead>
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
                            <Badge variant={d.status === "READY" ? "secondary" : d.status === "REJECT" ? "destructive" : "outline"}>
                              {statusLabel[d.status as string] ?? d.status}
                            </Badge>
=======
                            {tab === "trash" && d.deletedAt ? (
                              <span className="text-sm text-muted-foreground">
                                {new Date(d.deletedAt).toLocaleDateString("vi-VN", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            ) : (
                              <Badge variant={d.status === "READY" ? "secondary" : d.status === "REJECT" ? "destructive" : "outline"}>
                                {statusLabel[d.status as string] ?? d.status}
                              </Badge>
                            )}
>>>>>>> origin/final/demo-v1
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {d.fileSize ? `${(d.fileSize / 1024).toFixed(1)} KB` : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
<<<<<<< HEAD
=======
                              {tab !== "trash" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setPreview({
                                      title: d.title,
                                      url: d.cloudinaryUrl,
                                      mimeType: d.mimeType,
                                    });
                                    setReviewedIds((prev) => new Set(prev).add(d.id));
                                  }}
                                >
                                  <Eye className="h-3.5 w-3.5" /> Xem
                                </Button>
                              )}
>>>>>>> origin/final/demo-v1
                              {activeTab === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
<<<<<<< HEAD
                                    disabled={approveDocument.isPending}
=======
                                    disabled={approveDocument.isPending || !reviewedIds.has(d.id)}
                                    title={!reviewedIds.has(d.id) ? "Bạn cần xem file trước khi duyệt" : undefined}
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
                                    disabled={rejectDocument.isPending}
=======
                                    disabled={rejectDocument.isPending || !reviewedIds.has(d.id)}
                                    title={!reviewedIds.has(d.id) ? "Bạn cần xem file trước khi từ chối" : undefined}
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
                              {activeTab === "trash" ? (
=======
                              {activeTab === "trash" && (
>>>>>>> origin/final/demo-v1
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={restoreDocument.isPending}
<<<<<<< HEAD
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
=======
                                  onClick={() => {
                                    if (window.confirm(`Khôi phục file "${d.title}" cho user?`)) {
                                      restoreDocument.mutate(d.id, {
                                        onSuccess: () => toast.success("Đã khôi phục file"),
                                        onError: (err) => toast.error("Lỗi: " + err.message),
>>>>>>> origin/final/demo-v1
                                      });
                                    }
                                  }}
                                >
<<<<<<< HEAD
                                  <Trash2 className="h-3.5 w-3.5" /> Xóa
=======
                                  <RotateCcw className="h-3.5 w-3.5" /> Khôi phục
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======

      <FilePreviewDialog
        open={!!preview}
        onOpenChange={(v) => !v && setPreview(null)}
        title={preview?.title ?? ""}
        url={preview?.url}
        mimeType={preview?.mimeType}
      />
>>>>>>> origin/final/demo-v1
    </div>
  );
};
