import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { l as r, u as i } from "./index-CDVqwL1-.js";
import { t as a } from "./file-text-CjI-82n2.js";
import { t as o } from "./folder-kanban-GiHqoFzz.js";
import { t as s } from "./pencil-IIPXBv2r.js";
import { t as c } from "./save-CZQFla_P.js";
import { t as l } from "./share-2-Bnxevpbe.js";
import { t as u } from "./x-CZ5V7eis.js";
import { t as d } from "./button-CQzuWDyd.js";
import { a as f, i as p, n as m, t as h } from "./card-Ds71aSGU.js";
import { t as g } from "./input-CDAzVnuz.js";
import { t as _ } from "./label-CsVxXoyT.js";
import { f as v, g as y, o as b } from "./queries-DL6sGd2E.js";
var x = e(t()),
  S = n();
function C() {
  let { user: e } = i(),
    t = b(),
    n = v(),
    C = y(),
    [w, T] = (0, x.useState)(!1),
    E = (0, x.useMemo)(
      () => ({
        fullName: e?.fullName ?? ``,
        username: e?.username ?? ``,
        email: e?.email ?? ``,
      }),
      [e],
    ),
    [D, O] = (0, x.useState)(E),
    k = (e, t) => O((n) => ({ ...n, [e]: t })),
    A = (e) => {
      (e.preventDefault(), r.success(`Đã cập nhật hồ sơ`), T(!1));
    },
    j = () => {
      (O(E), T(!1));
    },
    M = [
      {
        label: `Tài liệu`,
        value: t.data?.length ?? 0,
        icon: a,
        cls: `text-blue-600 bg-blue-50`,
      },
      {
        label: `Thư mục`,
        value: n.data?.length ?? 0,
        icon: o,
        cls: `text-violet-600 bg-violet-50`,
      },
      {
        label: `Chia sẻ`,
        value: C.data?.length ?? 0,
        icon: l,
        cls: `text-emerald-600 bg-emerald-50`,
      },
    ];
  return (0, S.jsxs)(`div`, {
    className: `space-y-6 max-w-3xl`,
    children: [
      (0, S.jsxs)(`div`, {
        className: `flex items-center justify-between`,
        children: [
          (0, S.jsxs)(`div`, {
            children: [
              (0, S.jsx)(`h1`, {
                className: `text-3xl font-semibold tracking-tight`,
                children: `Hồ sơ`,
              }),
              (0, S.jsx)(`p`, {
                className: `text-muted-foreground mt-1`,
                children: `Thông tin tài khoản và thống kê hoạt động`,
              }),
            ],
          }),
          w
            ? null
            : (0, S.jsxs)(d, {
                onClick: () => T(!0),
                variant: `outline`,
                children: [
                  (0, S.jsx)(s, { className: `h-4 w-4 mr-2` }),
                  ` Chỉnh sửa`,
                ],
              }),
        ],
      }),
      (0, S.jsx)(`div`, {
        className: `grid grid-cols-1 sm:grid-cols-3 gap-4`,
        children: M.map((e) =>
          (0, S.jsx)(
            h,
            {
              children: (0, S.jsxs)(m, {
                className: `flex items-center gap-3 p-4`,
                children: [
                  (0, S.jsx)(`div`, {
                    className: `h-10 w-10 rounded-lg flex items-center justify-center ${e.cls}`,
                    children: (0, S.jsx)(e.icon, { className: `h-5 w-5` }),
                  }),
                  (0, S.jsxs)(`div`, {
                    children: [
                      (0, S.jsx)(`div`, {
                        className: `text-2xl font-semibold leading-none`,
                        children: e.value,
                      }),
                      (0, S.jsx)(`div`, {
                        className: `text-xs text-muted-foreground mt-1`,
                        children: e.label,
                      }),
                    ],
                  }),
                ],
              }),
            },
            e.label,
          ),
        ),
      }),
      (0, S.jsxs)(`form`, {
        onSubmit: A,
        children: [
          (0, S.jsxs)(h, {
            children: [
              (0, S.jsx)(p, {
                children: (0, S.jsx)(f, {
                  className: `text-base`,
                  children: `Thông tin tài khoản`,
                }),
              }),
              (0, S.jsxs)(m, {
                className: `space-y-5`,
                children: [
                  (0, S.jsxs)(`div`, {
                    className: `flex items-center gap-4 pb-4 border-b border-border`,
                    children: [
                      (0, S.jsx)(`div`, {
                        className: `h-16 w-16 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xl font-semibold`,
                        children: D.fullName?.[0]?.toUpperCase() ?? `U`,
                      }),
                      w &&
                        (0, S.jsx)(d, {
                          type: `button`,
                          variant: `outline`,
                          size: `sm`,
                          children: `Đổi ảnh đại diện`,
                        }),
                    ],
                  }),
                  (0, S.jsxs)(`div`, {
                    className: `grid sm:grid-cols-2 gap-4`,
                    children: [
                      (0, S.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, S.jsx)(_, { children: `Họ và tên` }),
                          (0, S.jsx)(g, {
                            value: D.fullName,
                            onChange: (e) => k(`fullName`, e.target.value),
                            disabled: !w,
                          }),
                        ],
                      }),
                      (0, S.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, S.jsx)(_, { children: `Tên đăng nhập` }),
                          (0, S.jsx)(g, {
                            value: D.username,
                            onChange: (e) => k(`username`, e.target.value),
                            disabled: !w,
                          }),
                        ],
                      }),
                      (0, S.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, S.jsx)(_, { children: `Email` }),
                          (0, S.jsx)(g, {
                            type: `email`,
                            value: D.email,
                            onChange: (e) => k(`email`, e.target.value),
                            disabled: !w,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          w &&
            (0, S.jsxs)(`div`, {
              className: `flex justify-end gap-2 mt-4`,
              children: [
                (0, S.jsxs)(d, {
                  type: `button`,
                  variant: `outline`,
                  onClick: j,
                  children: [
                    (0, S.jsx)(u, { className: `h-4 w-4 mr-2` }),
                    ` Huỷ`,
                  ],
                }),
                (0, S.jsxs)(d, {
                  type: `submit`,
                  children: [
                    (0, S.jsx)(c, { className: `h-4 w-4 mr-2` }),
                    ` Lưu thay đổi`,
                  ],
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
export { C as component };
