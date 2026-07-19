// src/features/admin/components/AdminApprovalsPage.tsx
<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import { toast } from "sonner";
import { FileText, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
=======
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileText, Check, X, Flag, AlertCircle } from "lucide-react";
=======
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileText, Check, X, Flag, AlertCircle, Eye } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
>>>>>>> origin/Flashcars
import { useApprovals, useApprovalAction } from "../hooks";
import type { ApprovalAction } from "../types/admin.types";

export const AdminApprovalsPage: React.FC = () => {
<<<<<<< HEAD
  const { data: list = [] } = useApprovals();
  const action = useApprovalAction();

  const handle = (id: number, act: ApprovalAction) =>
    action.mutate(
      { id, action: act },
      { onSuccess: () => toast.success(act === "approve" ? "Đã duyệt tài liệu" : "Đã từ chối tài liệu") }
    );
=======
=======
import { useApprovals, useApprovalAction } from "../hooks";
import type { ApprovalAction } from "../types/admin.types";
import { FilePreviewDialog } from "./FilePreviewDialog";
import { documentApi } from "@/lib/realApi";

export const AdminApprovalsPage: React.FC = () => {
>>>>>>> origin/final/demo-v1
  const query = useApprovals();
  const action = useApprovalAction();
  const [list, setList] = useState<(typeof query.data)[number][] | []>(query.data || []);
  const [_, setForceUpdate] = useState(0);

<<<<<<< HEAD
=======
  // Xem trước file trước khi ra quyết định.
  const [preview, setPreview] = useState<{ title: string; url?: string | null; mimeType?: string | null } | null>(null);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [loadingPreview, setLoadingPreview] = useState<string | null>(null);

  const openPreview = async (item: any) => {
    setReviewedIds((prev) => new Set(prev).add(item.id));
    // Nếu đã có url thì dùng luôn, nếu chưa thì lấy chi tiết document.
    if (item.cloudinaryUrl) {
      setPreview({ title: item.title, url: item.cloudinaryUrl, mimeType: item.mimeType });
      return;
    }
    if (!item.documentId) {
      setPreview({ title: item.title, url: null });
      return;
    }
    try {
      setLoadingPreview(item.id);
      const doc = await documentApi.getById(item.documentId);
      setPreview({ title: item.title, url: doc.cloudinaryUrl, mimeType: doc.mimeType });
    } catch {
      toast.error("Không tải được nội dung file");
      setPreview({ title: item.title, url: null });
    } finally {
      setLoadingPreview(null);
    }
  };

>>>>>>> origin/final/demo-v1
  useEffect(() => {
    if (query.data) {
      const newData = query.data || [];
      setList(newData);
      console.log("[AdminApprovalsPage] data changed, list.length:", newData.length);
    }
  }, [query.data]);

  useEffect(() => {
    if (action.isSuccess) {
      console.log("[AdminApprovalsPage] mutation success, forcing list refresh");
      setForceUpdate(prev => prev + 1);
    }
  }, [action.isSuccess]);

  console.log("[AdminApprovalsPage] render, list.length:", list.length, "query.status:", query.status);

  const handle = (id: string, act: ApprovalAction) => {
    console.log("[AdminApprovalsPage] handle called:", { id, act });
    return action.mutate(
      { id, action: act },
      {
        onSuccess: () => {
          console.log("[AdminApprovalsPage] mutation success");
          toast.success(
            act === "approve" ? "Đã chấp nhận báo cáo" : "Đã từ chối file",
          );
          setForceUpdate(prev => prev + 1);
        },
        onError: (err) => {
          console.error("[AdminApprovalsPage] mutation error:", err);
          toast.error("Xử lý thất bại");
        },
      },
    );
  };
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

  return (
    <div className="space-y-6">
      <div>
<<<<<<< HEAD
<<<<<<< HEAD
        <h1 className="text-2xl font-bold tracking-tight font-display">Phê duyệt tài liệu</h1>
        <p className="text-muted-foreground mt-1 text-sm">Xét duyệt các tài liệu đang chờ</p>
=======
=======
>>>>>>> origin/final/demo-v1
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Báo cáo File
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Xử lý các file bị người dùng báo cáo vi phạm
        </p>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
<<<<<<< HEAD
<<<<<<< HEAD
          <CardTitle className="text-base">Đang chờ duyệt</CardTitle>
          <span className="text-sm text-muted-foreground">{list.length} mục</span>
=======
=======
>>>>>>> origin/final/demo-v1
          <CardTitle className="text-base">File bị báo cáo</CardTitle>
          <span className="text-sm text-muted-foreground">
            {list.length} mục
          </span>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
<<<<<<< HEAD
<<<<<<< HEAD
                <TableHead>Tên tài liệu</TableHead>
                <TableHead>Người tải lên</TableHead>
                <TableHead>Ngày gửi</TableHead>
=======
=======
>>>>>>> origin/final/demo-v1
                <TableHead>File</TableHead>
                <TableHead>Người tải lên</TableHead>
                <TableHead>Lý do báo cáo</TableHead>
                <TableHead>Người báo cáo</TableHead>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
<<<<<<< HEAD
<<<<<<< HEAD
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    Không có tài liệu chờ duyệt
                  </TableCell>
                </TableRow>
              ) : (
                list.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-medium truncate">{item.title}</span>
=======
=======
>>>>>>> origin/final/demo-v1
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Không có báo cáo nào
                  </TableCell>
                </TableRow>
              ) : (
                list.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                          <Flag className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium truncate block">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground truncate block">
                            {item.date}
                          </span>
                        </div>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
<<<<<<< HEAD
<<<<<<< HEAD
                          <AvatarFallback className="bg-muted text-xs">{item.uploader.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{item.uploader}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
=======
=======
>>>>>>> origin/final/demo-v1
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
<<<<<<< HEAD
                         <Button
>>>>>>> origin/Flashcars
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handle(item.id, "reject")}
                        >
<<<<<<< HEAD
                          <X /> Từ chối
                        </Button>
                        <Button size="sm" onClick={() => handle(item.id, "approve")}>
                          <Check /> Duyệt
                        </Button>
=======
                          <X /> Từ chối file
                        </Button>
                         <Button
                           size="sm"
                           onClick={() => handle(item.id, "approve")}
                         >
                           <Check /> Chấp nhận báo cáo
                         </Button>
>>>>>>> origin/Flashcars
=======
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={loadingPreview === item.id}
                          onClick={() => openPreview(item)}
                        >
                          <Eye /> {loadingPreview === item.id ? "Đang mở..." : "Xem file"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          disabled={!reviewedIds.has(item.id)}
                          title={!reviewedIds.has(item.id) ? "Xem file trước khi xử lý" : undefined}
                          onClick={() => handle(item.id, "reject")}
                        >
                          <X /> Từ chối file
                        </Button>
                        <Button
                          size="sm"
                          disabled={!reviewedIds.has(item.id)}
                          title={!reviewedIds.has(item.id) ? "Xem file trước khi xử lý" : undefined}
                          onClick={() => handle(item.id, "approve")}
                        >
                          <Check /> Chấp nhận báo cáo
                        </Button>
>>>>>>> origin/final/demo-v1
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
<<<<<<< HEAD
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
