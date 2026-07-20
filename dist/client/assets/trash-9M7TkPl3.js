import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { l as r } from "./index-CDVqwL1-.js";
import { t as i } from "./createLucideIcon-p5NglK5C.js";
import { t as a } from "./file-text-CjI-82n2.js";
import { t as o } from "./rotate-ccw-lOW0Aj6U.js";
import { t as s } from "./trash-2-CVEVc4it.js";
import { t as c } from "./utils-BUTip_f_.js";
import { t as l } from "./button-CQzuWDyd.js";
import { a as u, i as d, n as f, t as p } from "./card-Ds71aSGU.js";
import {
  a as m,
  i as h,
  n as g,
  o as _,
  r as v,
  t as y,
} from "./table-BQnHMmbP.js";
import { t as b } from "./badge-924rRAMD.js";
import { i as x, n as S, r as C, t as w } from "./tabs-5v--eYsn.js";
import { n as T, t as E } from "./avatar-CfdU8K4o.js";
import { i as D, n as O, o as k, t as A } from "./useAdminFiles-CpI03-cl.js";
var j = i(`info`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 16v-4`, key: `1dtifu` }],
    [`path`, { d: `M12 8h.01`, key: `e9boi3` }],
  ]),
  M = e(t(), 1),
  N = n();
function P({ days: e }) {
  return (0, N.jsxs)(b, {
    variant: `secondary`,
    className: c(
      e <= 5
        ? `bg-destructive/10 text-destructive`
        : `bg-amber-500/10 text-amber-600`,
    ),
    children: [e, ` ngày`],
  });
}
var F = () => {
  let [e, t] = (0, M.useState)(`file`),
    { data: n = [] } = O(),
    { data: i = [] } = A(),
    c = D(),
    b = k(),
    F = (e, t, n) => {
      if (n === `delete`) {
        if (!window.confirm(`Xóa vĩnh viễn mục này?`)) return;
        c.mutate(
          { id: e, type: t },
          { onSuccess: () => r.success(`Đã xóa vĩnh viễn`) },
        );
      } else
        b.mutate(
          { id: e, type: t },
          { onSuccess: () => r.success(`Đã khôi phục`) },
        );
    },
    I = ({ id: e, type: t }) =>
      (0, N.jsxs)(`div`, {
        className: `flex justify-end gap-2`,
        children: [
          (0, N.jsxs)(l, {
            variant: `outline`,
            size: `sm`,
            onClick: () => F(e, t, `restore`),
            children: [(0, N.jsx)(o, {}), ` Khôi phục`],
          }),
          (0, N.jsxs)(l, {
            variant: `outline`,
            size: `sm`,
            className: `text-destructive hover:text-destructive`,
            onClick: () => F(e, t, `delete`),
            children: [(0, N.jsx)(s, {}), ` Xóa vĩnh viễn`],
          }),
        ],
      });
  return (0, N.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, N.jsxs)(`div`, {
        children: [
          (0, N.jsx)(`h1`, {
            className: `text-2xl font-bold tracking-tight font-display`,
            children: `Thùng rác`,
          }),
          (0, N.jsx)(`p`, {
            className: `text-muted-foreground mt-1 text-sm`,
            children: `Khôi phục hoặc xóa vĩnh viễn các mục đã xóa`,
          }),
        ],
      }),
      (0, N.jsxs)(p, {
        children: [
          (0, N.jsxs)(d, {
            className: `flex-row items-center justify-between space-y-0`,
            children: [
              (0, N.jsx)(u, { className: `text-base`, children: `Thùng rác` }),
              (0, N.jsx)(w, {
                value: e,
                onValueChange: (e) => t(e),
                children: (0, N.jsxs)(C, {
                  children: [
                    (0, N.jsx)(x, { value: `file`, children: `File` }),
                    (0, N.jsx)(x, { value: `account`, children: `Tài khoản` }),
                  ],
                }),
              }),
            ],
          }),
          (0, N.jsxs)(f, {
            className: `p-0`,
            children: [
              (0, N.jsxs)(w, {
                value: e,
                children: [
                  (0, N.jsx)(S, {
                    value: `file`,
                    className: `m-0`,
                    children: (0, N.jsxs)(y, {
                      children: [
                        (0, N.jsx)(m, {
                          children: (0, N.jsxs)(_, {
                            children: [
                              (0, N.jsx)(h, { children: `Tên File` }),
                              (0, N.jsx)(h, { children: `Ngày xóa` }),
                              (0, N.jsx)(h, { children: `Còn lại` }),
                              (0, N.jsx)(h, {
                                className: `text-right`,
                                children: `Hành động`,
                              }),
                            ],
                          }),
                        }),
                        (0, N.jsx)(g, {
                          children:
                            n.length === 0
                              ? (0, N.jsx)(_, {
                                  children: (0, N.jsx)(v, {
                                    colSpan: 4,
                                    className: `h-24 text-center text-muted-foreground`,
                                    children: `Thùng rác trống`,
                                  }),
                                })
                              : n.map((e) =>
                                  (0, N.jsxs)(
                                    _,
                                    {
                                      children: [
                                        (0, N.jsx)(v, {
                                          children: (0, N.jsxs)(`div`, {
                                            className: `flex items-center gap-3 min-w-0`,
                                            children: [
                                              (0, N.jsx)(`div`, {
                                                className: `h-9 w-9 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0`,
                                                children: (0, N.jsx)(a, {
                                                  className: `h-4 w-4`,
                                                }),
                                              }),
                                              (0, N.jsx)(`span`, {
                                                className: `font-medium truncate`,
                                                children: e.name,
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, N.jsx)(v, {
                                          className: `text-muted-foreground`,
                                          children: e.deletedDate,
                                        }),
                                        (0, N.jsx)(v, {
                                          children: (0, N.jsx)(P, {
                                            days: e.remainingDays,
                                          }),
                                        }),
                                        (0, N.jsx)(v, {
                                          className: `text-right`,
                                          children: (0, N.jsx)(I, {
                                            id: e.id,
                                            type: `file`,
                                          }),
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                        }),
                      ],
                    }),
                  }),
                  (0, N.jsx)(S, {
                    value: `account`,
                    className: `m-0`,
                    children: (0, N.jsxs)(y, {
                      children: [
                        (0, N.jsx)(m, {
                          children: (0, N.jsxs)(_, {
                            children: [
                              (0, N.jsx)(h, { children: `Chủ tài khoản` }),
                              (0, N.jsx)(h, { children: `Email` }),
                              (0, N.jsx)(h, { children: `Còn lại` }),
                              (0, N.jsx)(h, {
                                className: `text-right`,
                                children: `Hành động`,
                              }),
                            ],
                          }),
                        }),
                        (0, N.jsx)(g, {
                          children:
                            i.length === 0
                              ? (0, N.jsx)(_, {
                                  children: (0, N.jsx)(v, {
                                    colSpan: 4,
                                    className: `h-24 text-center text-muted-foreground`,
                                    children: `Thùng rác trống`,
                                  }),
                                })
                              : i.map((e) =>
                                  (0, N.jsxs)(
                                    _,
                                    {
                                      children: [
                                        (0, N.jsx)(v, {
                                          children: (0, N.jsxs)(`div`, {
                                            className: `flex items-center gap-3 min-w-0`,
                                            children: [
                                              (0, N.jsx)(E, {
                                                className: `h-9 w-9`,
                                                children: (0, N.jsx)(T, {
                                                  className: `bg-muted text-sm`,
                                                  children: e.name.charAt(0),
                                                }),
                                              }),
                                              (0, N.jsx)(`span`, {
                                                className: `font-medium truncate`,
                                                children: e.name,
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, N.jsx)(v, {
                                          className: `text-muted-foreground`,
                                          children: e.email,
                                        }),
                                        (0, N.jsx)(v, {
                                          children: (0, N.jsx)(P, {
                                            days: e.remainingDays,
                                          }),
                                        }),
                                        (0, N.jsx)(v, {
                                          className: `text-right`,
                                          children: (0, N.jsx)(I, {
                                            id: e.id,
                                            type: `account`,
                                          }),
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              (0, N.jsxs)(`div`, {
                className: `flex items-center gap-2 px-6 py-3.5 border-t border-border bg-muted/30`,
                children: [
                  (0, N.jsx)(j, {
                    className: `h-3.5 w-3.5 text-muted-foreground shrink-0`,
                  }),
                  (0, N.jsx)(`p`, {
                    className: `text-muted-foreground text-xs`,
                    children: `Các mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày.`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export { F as component };
