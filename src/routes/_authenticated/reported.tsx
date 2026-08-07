// src/routes/_authenticated/reported.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { FileText, Flag, Scale } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMySubmittedReports } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/reported")({
  component: ReportedDocumentsPage,
});

const REPORT_REASON_LABELS: Record<string, string> = {
  copyright: "Vi phạm bản quyền",
  misinformation: "Thông tin sai lệch",
  inappropriate: "Nội dung không phù hợp",
  privacy: "Vi phạm quyền riêng tư",
  other: "Lý do khác",
};

const getReasonLabel = (reason: string | undefined): string => {
  if (!reason) return "Không có lý do";
  return REPORT_REASON_LABELS[reason] || reason;
};

const isAppeal = (r: any) => (r.type ?? "").toUpperCase() === "APPEAL";

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return <Badge variant="outline">Đang chờ</Badge>;
    case "accepted":
    case "approved":
      return <Badge variant="default" className="bg-green-600">Đã chấp nhận</Badge>;
    case "rejected":
    case "removed":
      return <Badge variant="destructive">Đã từ chối</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const TypeBadge = ({ r }: { r: any }) => {
  const appeal = isAppeal(r);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0",
        appeal
          ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
          : "bg-destructive/10 text-destructive border border-destructive/20",
      )}
    >
      {appeal ? <Scale className="h-3 w-3" /> : <Flag className="h-3 w-3" />}
      {appeal ? "Kháng cáo" : "Báo cáo"}
    </span>
  );
};

function ReportedDocumentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { data, isLoading } = useMySubmittedReports();
  console.log("[ReportedDocumentsPage] raw data:", data);
  const myReports = Array.isArray(data) ? data : (data as any)?.content || [];
  console.log("[ReportedDocumentsPage] processed reports:", myReports);

  const reports = useMemo(() => myReports.filter((r: any) => !isAppeal(r)), [myReports]);
  const appeals = useMemo(() => myReports.filter((r: any) => isAppeal(r)), [myReports]);
  const pendingReports = useMemo(() => myReports.filter((r: any) => r.status === 'pending'), [myReports]);
  const handledReports = useMemo(() => myReports.filter((r: any) => r.status !== 'pending'), [myReports]);

  const shown =
    activeTab === "reports" ? reports :
    activeTab === "appeals" ? appeals :
    activeTab === "pending" ? pendingReports :
    activeTab === "handled" ? handledReports : myReports;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Báo cáo của tôi</h1>
        <p className="text-muted-foreground mt-1">Theo dõi báo cáo bạn đã gửi và kháng cáo của bạn</p>
      </div>

      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">Tất cả ({myReports.length})</TabsTrigger>
              <TabsTrigger value="reports">Báo cáo ({reports.length})</TabsTrigger>
              <TabsTrigger value="appeals">Kháng cáo ({appeals.length})</TabsTrigger>
              <TabsTrigger value="pending">Chờ duyệt ({pendingReports.length})</TabsTrigger>
              <TabsTrigger value="handled">Đã xử lý ({handledReports.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <ReportsTable reports={shown} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}

function ReportsTable({ reports, isLoading }: { reports: any[], isLoading: boolean }) {
  return (
    <div className="overflow-x-auto w-full border border-border/60 rounded-lg">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Loại</TableHead>
            <TableHead className="w-[220px]">Tài liệu</TableHead>
            <TableHead className="w-[200px]">Lý do</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead>Ghi chú admin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow><TableCell colSpan={5} className="text-center py-10">Đang tải...</TableCell></TableRow>
          ) : reports.length === 0 ? (
            <TableRow><TableCell colSpan={5} className="text-center py-10">Không có mục nào</TableCell></TableRow>
          ) : (
            reports.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell><TypeBadge r={r} /></TableCell>
                <TableCell className="font-medium max-w-[220px]">
                  <span className="flex items-center gap-2 min-w-0">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate block cursor-help">{r.documentTitle}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{r.documentTitle}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block cursor-help">{getReasonLabel(r.reason)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getReasonLabel(r.reason)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{getStatusBadge(r.status)}</TableCell>
                <TableCell className="text-muted-foreground max-w-[250px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate block cursor-help">{r.adminComment || "—"}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs break-all">{r.adminComment || "Chưa có phản hồi"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
