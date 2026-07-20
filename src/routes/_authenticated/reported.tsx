// src/routes/_authenticated/reported.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMySubmittedReports } from "@/lib/queries";

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

function ReportedDocumentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { data, isLoading } = useMySubmittedReports();
  console.log("[ReportedDocumentsPage] raw data:", data);
  const myReports = Array.isArray(data) ? data : (data as any)?.content || [];
  console.log("[ReportedDocumentsPage] processed reports:", myReports);

  const pendingReports = useMemo(() => myReports.filter((r: any) => r.status === 'pending'), [myReports]);
  const handledReports = useMemo(() => myReports.filter((r: any) => r.status !== 'pending'), [myReports]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Báo cáo của tôi</h1>
        <p className="text-muted-foreground mt-1">Theo dõi các báo cáo bạn đã gửi</p>
      </div>

      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tất cả ({myReports.length})</TabsTrigger>
              <TabsTrigger value="pending">Chờ duyệt ({pendingReports.length})</TabsTrigger>
              <TabsTrigger value="handled">Đã xử lý ({handledReports.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ReportsTable reports={myReports} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="pending">
              <ReportsTable reports={pendingReports} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="handled">
              <ReportsTable reports={handledReports} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}

function ReportsTable({ reports, isLoading }: { reports: any[], isLoading: boolean }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tài liệu</TableHead>
          <TableHead>Lý do</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Ghi chú admin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow><TableCell colSpan={4} className="text-center py-10">Đang tải...</TableCell></TableRow>
        ) : reports.length === 0 ? (
          <TableRow><TableCell colSpan={4} className="text-center py-10">Không có báo cáo nào</TableCell></TableRow>
        ) : (
          reports.map((r: any) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.documentTitle}</TableCell>
              <TableCell>{getReasonLabel(r.reason)}</TableCell>
              <TableCell>{getStatusBadge(r.status)}</TableCell>
              <TableCell className="text-muted-foreground">{r.adminComment || "-"}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
