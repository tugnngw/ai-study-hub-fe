import { n as api } from "./api-vGJ7qemV.js";
import { t as Button } from "./button-BkEeRci-.js";
import {
  a as CardTitle,
  i as CardHeader,
  n as CardContent,
  t as Card,
} from "./card-CtX3ithx.js";
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from "./table-C0WYWEQX.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-CiQwCJNR.js";
import { t as adminKeys } from "./adminKeys-Dq_NNZ6Y.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, FileText, X } from "lucide-react";
//#region src/features/admin/services/approvalApi.ts
var approvalApi = {
  getPendingList: () => api("/api/admin/approvals"),
  approve: (id) =>
    api(`/api/admin/approvals/${id}/approve`, { method: "POST" }),
  reject: (id) => api(`/api/admin/approvals/${id}/reject`, { method: "POST" }),
};
//#endregion
//#region src/features/admin/hooks/useAdminApprovals.ts
function useApprovals() {
  return useQuery({
    queryKey: adminKeys.approvals(),
    queryFn: () => approvalApi.getPendingList(),
  });
}
function useApprovalAction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }) =>
      action === "approve" ? approvalApi.approve(id) : approvalApi.reject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.approvals() }),
  });
}
//#endregion
//#region src/features/admin/components/AdminApprovalsPage.tsx
var AdminApprovalsPage = () => {
  const { data: list = [] } = useApprovals();
  const action = useApprovalAction();
  const handle = (id, act) =>
    action.mutate(
      {
        id,
        action: act,
      },
      {
        onSuccess: () =>
          toast.success(
            act === "approve" ? "Đã duyệt tài liệu" : "Đã từ chối tài liệu",
          ),
      },
    );
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-bold tracking-tight font-display",
            children: "Phê duyệt tài liệu",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground mt-1 text-sm",
            children: "Xét duyệt các tài liệu đang chờ",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs(Card, {
        children: [
          /* @__PURE__ */ jsxs(CardHeader, {
            className: "flex-row items-center justify-between space-y-0",
            children: [
              /* @__PURE__ */ jsx(CardTitle, {
                className: "text-base",
                children: "Đang chờ duyệt",
              }),
              /* @__PURE__ */ jsxs("span", {
                className: "text-sm text-muted-foreground",
                children: [list.length, " mục"],
              }),
            ],
          }),
          /* @__PURE__ */ jsx(CardContent, {
            className: "p-0",
            children: /* @__PURE__ */ jsxs(Table, {
              children: [
                /* @__PURE__ */ jsx(TableHeader, {
                  children: /* @__PURE__ */ jsxs(TableRow, {
                    children: [
                      /* @__PURE__ */ jsx(TableHead, {
                        children: "Tên tài liệu",
                      }),
                      /* @__PURE__ */ jsx(TableHead, {
                        children: "Người tải lên",
                      }),
                      /* @__PURE__ */ jsx(TableHead, { children: "Ngày gửi" }),
                      /* @__PURE__ */ jsx(TableHead, {
                        className: "text-right",
                        children: "Hành động",
                      }),
                    ],
                  }),
                }),
                /* @__PURE__ */ jsx(TableBody, {
                  children:
                    list.length === 0
                      ? /* @__PURE__ */ jsx(TableRow, {
                          children: /* @__PURE__ */ jsx(TableCell, {
                            colSpan: 4,
                            className: "h-24 text-center text-muted-foreground",
                            children: "Không có tài liệu chờ duyệt",
                          }),
                        })
                      : list.map((item) =>
                          /* @__PURE__ */ jsxs(
                            TableRow,
                            {
                              children: [
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsxs("div", {
                                    className:
                                      "flex items-center gap-3 min-w-0",
                                    children: [
                                      /* @__PURE__ */ jsx("div", {
                                        className:
                                          "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0",
                                        children: /* @__PURE__ */ jsx(
                                          FileText,
                                          { className: "h-4 w-4" },
                                        ),
                                      }),
                                      /* @__PURE__ */ jsx("span", {
                                        className: "font-medium truncate",
                                        children: item.title,
                                      }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsxs("div", {
                                    className: "flex items-center gap-2.5",
                                    children: [
                                      /* @__PURE__ */ jsx(Avatar, {
                                        className: "h-7 w-7",
                                        children: /* @__PURE__ */ jsx(
                                          AvatarFallback,
                                          {
                                            className: "bg-muted text-xs",
                                            children: item.uploader.charAt(0),
                                          },
                                        ),
                                      }),
                                      /* @__PURE__ */ jsx("span", {
                                        className: "text-muted-foreground",
                                        children: item.uploader,
                                      }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-muted-foreground",
                                  children: item.date,
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-right",
                                  children: /* @__PURE__ */ jsxs("div", {
                                    className: "flex justify-end gap-2",
                                    children: [
                                      /* @__PURE__ */ jsxs(Button, {
                                        variant: "outline",
                                        size: "sm",
                                        className:
                                          "text-destructive hover:text-destructive",
                                        onClick: () =>
                                          handle(item.id, "reject"),
                                        children: [
                                          /* @__PURE__ */ jsx(X, {}),
                                          " Từ chối",
                                        ],
                                      }),
                                      /* @__PURE__ */ jsxs(Button, {
                                        size: "sm",
                                        onClick: () =>
                                          handle(item.id, "approve"),
                                        children: [
                                          /* @__PURE__ */ jsx(Check, {}),
                                          " Duyệt",
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            item.id,
                          ),
                        ),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
//#endregion
//#region src/routes/admin_panel/approvals.tsx?tsr-split=component
var SplitComponent = AdminApprovalsPage;
//#endregion
export { SplitComponent as component };
