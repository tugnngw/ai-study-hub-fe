// src/features/admin/components/AdminReportHistoryPage.tsx
import React, { useState } from "react";
import { toast } from "sonner";
import { FileText, Check, X, Flag, AlertCircle, Eye, Scale, Loader2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useReportHistory, useReportsByType } from "../hooks";
import { cn, formatDateTime } from "@/lib/utils";
import { FilePreviewDialog } from "./FilePreviewDialog";
import { documentApi } from "@/lib/realApi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const REPORT_REASON_LABELS: Record<string, string> = {
  copyright: "Nội dung vi phạm bản quyền",
  misinformation: "Thông tin sai lệch / gây hiểu lầm",
  inappropriate: "Nội dung không phù hợp / phản cảm",
  privacy: "Vi phạm quyền riêng tư",
  other: "Lý do khác",
};

const isAppeal = (type?: string) =>
  (type ?? "").toUpperCase() === "APPEAL";

const getReasonLabel = (reason: string | undefined): string => {
  if (!reason) return "Không có lý do";
  return REPORT_REASON_LABELS[reason] || reason;
};

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
      return "Chờ xử lý";
    default:
      return status || "Unknown";
  }
};

export const AdminReportHistoryPage: React.FC = () => {
  const { data: history = [], isLoading } = useReportHistory();
  const [activeTab, setActiveTab] = useState<"reports" | "appeals" | "all">("reports");
  const [preview, setPreview] = useState<{ title: string; url?: string | null; mimeType?: string | null } | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<string | null>(null);

  // Nếu item có type = APPEAL (từ BE), filter theo type; ngược lại dùng endpoint chuyên biệt
  const tabItems = useReportsByType(activeTab === "appeals" ? "APPEAL" : activeTab === "reports" ? "REPORT" : undefined);

  const shown = activeTab === "all"
      ? history
      : (tabItems.data ?? []);

  const shownItems = shown;
  const shownCount = shownItems.length;

  const typeBadge = (item: any) => {
    const appeal = isAppeal(item.type);
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

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-display">
              Lịch sử Xử lý Báo cáo
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Phân biệt rõ báo cáo (từ người dùng) và kháng cáo (phản hồi của người upload)
            </p>
          </div>
          <div className="flex rounded-lg border border-border/70 bg-muted/40 p-0.5">
            {(["reports", "appeals", "all"] as const).map((t) => (
                <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTab(t)}
                    className={cn(
                        "px-3 py-1.5 text-sm rounded-md transition-colors",
                        activeTab === t
                            ? "bg-background shadow-sm font-medium"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                  {t === "reports" ? "Báo cáo" : t === "appeals" ? "Kháng cáo" : "Tất cả"}
                </button>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">
              {activeTab === "appeals" ? "Kháng cáo đã xử lý" : activeTab === "reports" ? "Báo cáo đã xử lý" : "Tất cả"}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {shownCount} mục
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto w-full border border-border/60 rounded-lg">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Loại</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Người tải lên</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Người gửi</TableHead>
                    <TableHead>{activeTab === "appeals" ? "Appeal Time" : "Report Time"}</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading || (activeTab !== "all" && tabItems.isLoading) ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      Đang tải dữ liệu...
                    </TableCell>
                  </TableRow>
                ) : shownCount === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      Không có {activeTab === "appeals" ? "kháng cáo" : "báo cáo"} nào
                    </TableCell>
                  </TableRow>
                ) : (
                  shownItems.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{typeBadge(item)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={cn(
                                "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                                isAppeal(item.type)
                                    ? "bg-blue-500/10 text-blue-600"
                                    : "bg-destructive/10 text-destructive",
                            )}>
                              {isAppeal(item.type) ? <Scale className="h-4 w-4" /> : <Flag className="h-4 w-4" />}
                            </div>
                            <div className="min-w-0">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="font-medium truncate block cursor-help">
                                      {item.title || item.name || "Unknown"}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{item.title || item.name || "Unknown"}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
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
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-muted-foreground truncate cursor-help">
                                    {item.uploader}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.uploader}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="text-sm line-clamp-2 cursor-help">
                                      {getReasonLabel(item.reason)}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs break-all">{getReasonLabel(item.reason)}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-[130px]">
                          <span className="truncate block">{item.reporter || "Anonymous"}</span>
                        </TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">
                          {formatDateTime(item.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(item.status)} font-medium`}>
                            {item.decision || getStatusText(item.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                              variant="ghost"
                              size="sm"
                              disabled={loadingPreview === item.id}
                              onClick={async () => {
                                if (item.cloudinaryUrl) {
                                  setPreview({ title: item.name, url: item.cloudinaryUrl, mimeType: item.mimeType });
                                  return;
                                }
                                if (!item.documentId) {
                                  setPreview({ title: item.name, url: null });
                                  return;
                                }
                                try {
                                  setLoadingPreview(item.id);
                                  const doc = await documentApi.getById(item.documentId);
                                  setPreview({ title: item.name, url: doc.cloudinaryUrl, mimeType: doc.mimeType });
                                } catch {
                                  toast.error("Không tải được nội dung file");
                                  setPreview({ title: item.name, url: null });
                                } finally {
                                  setLoadingPreview(null);
                                }
                              }}
                          >
                            {loadingPreview === item.id ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Eye className="h-4 w-4 mr-1" />
                            )}
                            {loadingPreview === item.id ? "Đang tải..." : "Xem"}
                          </Button>
                        </TableCell>
                      </TableRow>
                  ))
                )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <FilePreviewDialog
            open={!!preview}
            onOpenChange={(v) => !v && setPreview(null)}
            title={preview?.title ?? ""}
            url={preview?.url}
            mimeType={preview?.mimeType}
        />
      </div>
  );
};
