import { n as useAuth } from "./auth-Dc8GweY_.js";
import { t as Button } from "./button-BkEeRci-.js";
import {
  a as CardTitle,
  i as CardHeader,
  n as CardContent,
  t as Card,
} from "./card-CtX3ithx.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { KeyRound, Lock, Pencil, Save, ShieldCheck, X } from "lucide-react";
//#region src/features/admin/components/AdminProfilePage.tsx
var AdminProfilePage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const initialForm = useMemo(
    () => ({
      fullName: user?.fullName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
    }),
    [user],
  );
  const [form, setForm] = useState(initialForm);
  const update = (k, v) =>
    setForm((p) => ({
      ...p,
      [k]: v,
    }));
  const save = (e) => {
    e.preventDefault();
    toast.success("Đã cập nhật hồ sơ");
    setEditing(false);
  };
  const cancel = () => {
    setForm(initialForm);
    setEditing(false);
  };
  const [pwd, setPwd] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const updatePwd = (k, v) =>
    setPwd((p) => ({
      ...p,
      [k]: v,
    }));
  const changePassword = (e) => {
    e.preventDefault();
    if (!pwd.current || !pwd.next) {
      toast.error("Vui lòng nhập đầy đủ mật khẩu");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    toast.success("Đã đổi mật khẩu");
    setPwd({
      current: "",
      next: "",
      confirm: "",
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("h1", {
                className: "text-2xl font-bold tracking-tight font-display",
                children: "Hồ sơ quản trị",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-muted-foreground mt-1 text-sm",
                children: "Thông tin tài khoản admin của bạn",
              }),
            ],
          }),
          !editing &&
            /* @__PURE__ */ jsxs(Button, {
              onClick: () => setEditing(true),
              variant: "outline",
              children: [
                /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4 mr-2" }),
                " Chỉnh sửa",
              ],
            }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start",
        children: [
          /* @__PURE__ */ jsxs("form", {
            onSubmit: save,
            children: [
              /* @__PURE__ */ jsxs(Card, {
                children: [
                  /* @__PURE__ */ jsx(CardHeader, {
                    children: /* @__PURE__ */ jsx(CardTitle, {
                      className: "text-base",
                      children: "Thông tin tài khoản",
                    }),
                  }),
                  /* @__PURE__ */ jsxs(CardContent, {
                    className: "space-y-5",
                    children: [
                      /* @__PURE__ */ jsxs("div", {
                        className:
                          "flex items-center gap-4 pb-4 border-b border-border",
                        children: [
                          /* @__PURE__ */ jsx("div", {
                            className:
                              "h-16 w-16 rounded-full bg-gradient-brand text-white flex items-center justify-center text-xl font-semibold shadow-soft",
                            children: form.fullName?.[0]?.toUpperCase() ?? "A",
                          }),
                          /* @__PURE__ */ jsxs("div", {
                            className: "flex-1",
                            children: [
                              /* @__PURE__ */ jsx("div", {
                                className: "font-medium",
                                children: form.fullName || "Quản trị viên",
                              }),
                              /* @__PURE__ */ jsxs(Badge, {
                                variant: "secondary",
                                className: "mt-1 gap-1",
                                children: [
                                  /* @__PURE__ */ jsx(ShieldCheck, {
                                    className: "h-3 w-3",
                                  }),
                                  " Quản trị viên",
                                ],
                              }),
                            ],
                          }),
                          editing &&
                            /* @__PURE__ */ jsx(Button, {
                              type: "button",
                              variant: "outline",
                              size: "sm",
                              children: "Đổi ảnh đại diện",
                            }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        className: "grid sm:grid-cols-2 gap-4",
                        children: [
                          /* @__PURE__ */ jsxs("div", {
                            className: "space-y-2",
                            children: [
                              /* @__PURE__ */ jsx(Label, {
                                children: "Họ và tên",
                              }),
                              /* @__PURE__ */ jsx(Input, {
                                value: form.fullName,
                                onChange: (e) =>
                                  update("fullName", e.target.value),
                                disabled: !editing,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs("div", {
                            className: "space-y-2",
                            children: [
                              /* @__PURE__ */ jsx(Label, {
                                children: "Tên đăng nhập",
                              }),
                              /* @__PURE__ */ jsx(Input, {
                                value: form.username,
                                onChange: (e) =>
                                  update("username", e.target.value),
                                disabled: !editing,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs("div", {
                            className: "space-y-2 sm:col-span-2",
                            children: [
                              /* @__PURE__ */ jsx(Label, { children: "Email" }),
                              /* @__PURE__ */ jsx(Input, {
                                type: "email",
                                value: form.email,
                                onChange: (e) =>
                                  update("email", e.target.value),
                                disabled: !editing,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              editing &&
                /* @__PURE__ */ jsxs("div", {
                  className: "flex justify-end gap-2 mt-4",
                  children: [
                    /* @__PURE__ */ jsxs(Button, {
                      type: "button",
                      variant: "outline",
                      onClick: cancel,
                      children: [
                        /* @__PURE__ */ jsx(X, { className: "h-4 w-4 mr-2" }),
                        " Huỷ",
                      ],
                    }),
                    /* @__PURE__ */ jsxs(Button, {
                      type: "submit",
                      children: [
                        /* @__PURE__ */ jsx(Save, {
                          className: "h-4 w-4 mr-2",
                        }),
                        " Lưu thay đổi",
                      ],
                    }),
                  ],
                }),
            ],
          }),
          /* @__PURE__ */ jsx("form", {
            onSubmit: changePassword,
            children: /* @__PURE__ */ jsxs(Card, {
              children: [
                /* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsxs(CardTitle, {
                    className: "text-base flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(KeyRound, {
                        className: "h-4 w-4 text-muted-foreground",
                      }),
                      " Bảo mật",
                    ],
                  }),
                }),
                /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "space-y-2",
                      children: [
                        /* @__PURE__ */ jsx(Label, {
                          children: "Mật khẩu hiện tại",
                        }),
                        /* @__PURE__ */ jsx(Input, {
                          type: "password",
                          value: pwd.current,
                          onChange: (e) => updatePwd("current", e.target.value),
                          placeholder: "••••••••",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "grid sm:grid-cols-2 gap-4",
                      children: [
                        /* @__PURE__ */ jsxs("div", {
                          className: "space-y-2",
                          children: [
                            /* @__PURE__ */ jsx(Label, {
                              children: "Mật khẩu mới",
                            }),
                            /* @__PURE__ */ jsx(Input, {
                              type: "password",
                              value: pwd.next,
                              onChange: (e) =>
                                updatePwd("next", e.target.value),
                              placeholder: "••••••••",
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          className: "space-y-2",
                          children: [
                            /* @__PURE__ */ jsx(Label, {
                              children: "Xác nhận mật khẩu mới",
                            }),
                            /* @__PURE__ */ jsx(Input, {
                              type: "password",
                              value: pwd.confirm,
                              onChange: (e) =>
                                updatePwd("confirm", e.target.value),
                              placeholder: "••••••••",
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("div", {
                      className: "flex justify-end",
                      children: /* @__PURE__ */ jsxs(Button, {
                        type: "submit",
                        variant: "outline",
                        children: [
                          /* @__PURE__ */ jsx(Lock, {
                            className: "h-4 w-4 mr-2",
                          }),
                          " Đổi mật khẩu",
                        ],
                      }),
                    }),
                  ],
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
//#region src/routes/admin_panel/profile.tsx?tsr-split=component
var SplitComponent = AdminProfilePage;
//#endregion
export { SplitComponent as component };
