// src/features/admin/components/AdminReportHistoryPage.tsx
import React from "react";
import { FileText, Check, X, Flag, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useReportHistory } from "../hooks";

export const AdminReportHistoryPage: React.FC = () => {
  const { data: history = [], isLoading } = useReportHistory();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "rejected":
      case "removed":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "Đã chấp nhận";
      case "rejected":
      case "removed":
        return "Không chấp nhận";
      case "pending":
        return "Chấp nhận";
      default:
        return status || "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Lịch sử Xử lý Báo cáo
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Xem lại lịch sử các báo cáo đã xử lý và đang chờ
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Tất cả báo cáo</CardTitle>
          <span className="text-sm text-muted-foreground">
            {history.length} mục
          </span>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Người tải lên</TableHead>
                <TableHead>Lý do báo cáo</TableHead>
                <TableHead>Người báo cáo</TableHead>
                <TableHead>Ngày báo cáo</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              ) : history.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Không có báo cáo nào
                  </TableCell>
                </TableRow>
              ) : (
                history.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                          <Flag className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium truncate block">
                            {item.title || item.name || "Unknown"}
                          </span>
                          <span className="text-xs text-muted-foreground truncate block">
                            ID: {item.documentId?.slice(0, 8) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="bg-muted text-xs">
                            {item.uploader?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground truncate">
                          {item.uploader}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="text-sm line-clamp-2">
                            {item.reason || "Không có lý do"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.reporter || "Anonymous"}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(item.status)} font-medium`}
                      >
                        {item.decision || getStatusText(item.status)}
                      </Badge>
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
