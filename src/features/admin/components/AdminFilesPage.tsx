// src/features/admin/components/AdminFilesPage.tsx
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

  return (
    <div className="space-y-6">
      <div>
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
    </div>
  );
};
