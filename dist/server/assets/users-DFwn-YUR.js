import { n as api } from "./api-vGJ7qemV.js";
import { t as Button } from "./button-BkEeRci-.js";
import {
  a as CardTitle,
  i as CardHeader,
  n as CardContent,
  t as Card,
} from "./card-CtX3ithx.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from "./table-C0WYWEQX.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { t as PlanBadge } from "./PlanBadge-BSmh8FV-.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-CiQwCJNR.js";
import { t as adminKeys } from "./adminKeys-Dq_NNZ6Y.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Lock, Search, Trash2, Unlock } from "lucide-react";
//#region src/features/admin/services/userApi.ts
var adminUserApi = {
  getUsers: () => api("/api/admin/users"),
  toggleStatus: (id) =>
    api(`/api/admin/users/${id}/toggle-status`, { method: "POST" }),
  deleteUser: (id) => api(`/api/admin/users/${id}`, { method: "DELETE" }),
};
//#endregion
//#region src/features/admin/hooks/useAdminUsers.ts
function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users(),
    queryFn: () => adminUserApi.getUsers(),
  });
}
function useToggleUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminUserApi.toggleStatus(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}
function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminUserApi.deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}
//#endregion
//#region src/features/admin/components/AdminUsersPage.tsx
var AdminUsersPage = () => {
  const [query, setQuery] = useState("");
  const { data: users = [] } = useAdminUsers();
  const toggleStatus = useToggleUserStatus();
  const deleteUser = useDeleteUser();
  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase()),
      ),
    [users, query],
  );
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between gap-4 flex-wrap",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("h1", {
                className: "text-2xl font-bold tracking-tight font-display",
                children: "Quản lý Users",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-muted-foreground mt-1 text-sm",
                children: "Quản lý tài khoản thành viên trong hệ thống",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "relative w-full max-w-xs",
            children: [
              /* @__PURE__ */ jsx(Search, {
                className:
                  "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              }),
              /* @__PURE__ */ jsx(Input, {
                placeholder: "Tìm tên hoặc email…",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                className: "pl-9",
              }),
            ],
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
                children: "Danh sách thành viên",
              }),
              /* @__PURE__ */ jsxs("span", {
                className: "text-sm text-muted-foreground",
                children: [filtered.length, " thành viên"],
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
                        children: "Thành viên",
                      }),
                      /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
                      /* @__PURE__ */ jsx(TableHead, { children: "Gói" }),
                      /* @__PURE__ */ jsx(TableHead, {
                        children: "Trạng thái",
                      }),
                      /* @__PURE__ */ jsx(TableHead, {
                        className: "text-right",
                        children: "Hành động",
                      }),
                    ],
                  }),
                }),
                /* @__PURE__ */ jsx(TableBody, {
                  children:
                    filtered.length === 0
                      ? /* @__PURE__ */ jsx(TableRow, {
                          children: /* @__PURE__ */ jsx(TableCell, {
                            colSpan: 5,
                            className: "h-24 text-center text-muted-foreground",
                            children: "Không tìm thấy thành viên",
                          }),
                        })
                      : filtered.map((u) =>
                          /* @__PURE__ */ jsxs(
                            TableRow,
                            {
                              children: [
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsxs("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                      /* @__PURE__ */ jsx(Avatar, {
                                        className: "h-9 w-9",
                                        children: /* @__PURE__ */ jsx(
                                          AvatarFallback,
                                          {
                                            className: "bg-muted text-sm",
                                            children: u.name.charAt(0),
                                          },
                                        ),
                                      }),
                                      /* @__PURE__ */ jsx("span", {
                                        className: "font-medium",
                                        children: u.name,
                                      }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-muted-foreground",
                                  children: u.email,
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsx(PlanBadge, {
                                    plan: u.plan,
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  children: /* @__PURE__ */ jsx(Badge, {
                                    variant:
                                      u.status === "Hoạt động"
                                        ? "secondary"
                                        : "destructive",
                                    children: u.status,
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TableCell, {
                                  className: "text-right",
                                  children: /* @__PURE__ */ jsxs("div", {
                                    className: "flex justify-end gap-2",
                                    children: [
                                      /* @__PURE__ */ jsxs(Button, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: () =>
                                          toggleStatus.mutate(u.id, {
                                            onSuccess: () =>
                                              toast.success(
                                                u.status === "Hoạt động"
                                                  ? "Đã khóa tài khoản"
                                                  : "Đã mở khóa tài khoản",
                                              ),
                                          }),
                                        children: [
                                          u.status === "Hoạt động"
                                            ? /* @__PURE__ */ jsx(Lock, {})
                                            : /* @__PURE__ */ jsx(Unlock, {}),
                                          u.status === "Hoạt động"
                                            ? "Khóa"
                                            : "Mở khóa",
                                        ],
                                      }),
                                      /* @__PURE__ */ jsxs(Button, {
                                        variant: "outline",
                                        size: "sm",
                                        className:
                                          "text-destructive hover:text-destructive",
                                        onClick: () => {
                                          if (window.confirm("Xóa thành viên?"))
                                            deleteUser.mutate(u.id, {
                                              onSuccess: () =>
                                                toast.success(
                                                  "Đã xóa thành viên",
                                                ),
                                            });
                                        },
                                        children: [
                                          /* @__PURE__ */ jsx(Trash2, {}),
                                          " Xóa",
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            u.id,
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
//#region src/routes/admin_panel/users.tsx?tsr-split=component
var SplitComponent = AdminUsersPage;
//#endregion
export { SplitComponent as component };
