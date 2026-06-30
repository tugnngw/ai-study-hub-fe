import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { l as r } from "./index-CDVqwL1-.js";
import { t as i } from "./createLucideIcon-p5NglK5C.js";
import { t as a } from "./file-text-CjI-82n2.js";
import { t as o } from "./flag-BU0E1vrh.js";
import { t as s } from "./utils-BUTip_f_.js";
import { t as c } from "./button-CQzuWDyd.js";
import { a as l, i as u, n as d, t as f } from "./card-Ds71aSGU.js";
import { t as p } from "./label-CsVxXoyT.js";
import {
  a as m,
  i as h,
  n as g,
  o as _,
  r as v,
  t as y,
} from "./dialog-5tbKv0U3.js";
import { t as b } from "./textarea-DEF6Vte7.js";
import { n as x, t as S } from "./radio-group-CbIALWBK.js";
import {
  a as C,
  i as w,
  n as T,
  o as E,
  r as D,
  t as O,
} from "./table-BQnHMmbP.js";
import { n as k, t as A } from "./avatar-CfdU8K4o.js";
import { a as j, r as M } from "./useAdminFiles-CpI03-cl.js";
var N = i(`circle-check`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `m9 12 2 2 4-4`, key: `dzmm74` }],
  ]),
  P = i(`triangle-alert`, [
    [
      `path`,
      {
        d: `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,
        key: `wmoenq`,
      },
    ],
    [`path`, { d: `M12 9v4`, key: `juzpu7` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  F = e(t(), 1),
  I = n(),
  L = () => {
    let { data: e = [] } = j(),
      t = M(),
      [n, i] = (0, F.useState)(null),
      [L, R] = (0, F.useState)(``),
      [z, B] = (0, F.useState)(``),
      [V, H] = (0, F.useState)(!1),
      U = (e) => {
        (i(e), R(``), B(``), H(!1));
      },
      W = () => i(null);
    return (0, I.jsxs)(`div`, {
      className: `space-y-6`,
      children: [
        (0, I.jsxs)(`div`, {
          children: [
            (0, I.jsx)(`h1`, {
              className: `text-2xl font-bold tracking-tight font-display`,
              children: `Quản lý Tài liệu`,
            }),
            (0, I.jsx)(`p`, {
              className: `text-muted-foreground mt-1 text-sm`,
              children: `Xử lý các tài liệu bị báo cáo vi phạm`,
            }),
          ],
        }),
        (0, I.jsxs)(f, {
          children: [
            (0, I.jsxs)(u, {
              className: `flex-row items-center justify-between space-y-0`,
              children: [
                (0, I.jsx)(l, {
                  className: `text-base`,
                  children: `Tài liệu bị báo cáo`,
                }),
                (0, I.jsxs)(`span`, {
                  className: `text-sm text-muted-foreground`,
                  children: [e.length, ` tài liệu`],
                }),
              ],
            }),
            (0, I.jsx)(d, {
              className: `p-0`,
              children: (0, I.jsxs)(O, {
                children: [
                  (0, I.jsx)(C, {
                    children: (0, I.jsxs)(E, {
                      children: [
                        (0, I.jsx)(w, { children: `Tên File` }),
                        (0, I.jsx)(w, { children: `Người đăng` }),
                        (0, I.jsx)(w, { children: `Kích thước` }),
                        (0, I.jsx)(w, { children: `Báo cáo` }),
                        (0, I.jsx)(w, {
                          className: `text-right`,
                          children: `Hành động`,
                        }),
                      ],
                    }),
                  }),
                  (0, I.jsx)(T, {
                    children:
                      e.length === 0
                        ? (0, I.jsx)(E, {
                            children: (0, I.jsx)(D, {
                              colSpan: 5,
                              className: `h-24 text-center text-muted-foreground`,
                              children: `Không có báo cáo nào`,
                            }),
                          })
                        : e.map((e) =>
                            (0, I.jsxs)(
                              E,
                              {
                                children: [
                                  (0, I.jsx)(D, {
                                    children: (0, I.jsxs)(`div`, {
                                      className: `flex items-center gap-3 min-w-0`,
                                      children: [
                                        (0, I.jsx)(`div`, {
                                          className: `h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0`,
                                          children: (0, I.jsx)(a, {
                                            className: `h-4 w-4`,
                                          }),
                                        }),
                                        (0, I.jsx)(`span`, {
                                          className: `font-medium truncate`,
                                          children: e.name,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, I.jsx)(D, {
                                    className: `text-muted-foreground`,
                                    children: e.uploader,
                                  }),
                                  (0, I.jsx)(D, {
                                    className: `text-muted-foreground`,
                                    children: e.size,
                                  }),
                                  (0, I.jsx)(D, {
                                    children: (0, I.jsxs)(`span`, {
                                      className: `inline-flex items-center gap-1 text-destructive font-semibold`,
                                      children: [
                                        (0, I.jsx)(o, {
                                          className: `h-3.5 w-3.5`,
                                        }),
                                        e.reports,
                                      ],
                                    }),
                                  }),
                                  (0, I.jsx)(D, {
                                    className: `text-right`,
                                    children: (0, I.jsxs)(c, {
                                      variant: `outline`,
                                      size: `sm`,
                                      onClick: () => U(e),
                                      children: [(0, I.jsx)(P, {}), ` Xử lý`],
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
        (0, I.jsx)(y, {
          open: !!n,
          onOpenChange: (e) => !e && W(),
          children: (0, I.jsxs)(g, {
            className: `max-w-md`,
            children: [
              n &&
                !V &&
                (0, I.jsxs)(I.Fragment, {
                  children: [
                    (0, I.jsxs)(m, {
                      children: [
                        (0, I.jsxs)(_, {
                          className: `flex items-center gap-2`,
                          children: [
                            (0, I.jsx)(`span`, {
                              className: `h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center`,
                              children: (0, I.jsx)(P, { className: `h-4 w-4` }),
                            }),
                            `Báo cáo tài liệu`,
                          ],
                        }),
                        (0, I.jsx)(v, {
                          children: `Xem xét và đưa ra quyết định xử lý.`,
                        }),
                      ],
                    }),
                    (0, I.jsxs)(`div`, {
                      className: `space-y-4`,
                      children: [
                        (0, I.jsxs)(`div`, {
                          className: `flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border`,
                          children: [
                            (0, I.jsx)(`div`, {
                              className: `h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0`,
                              children: (0, I.jsx)(a, { className: `h-5 w-5` }),
                            }),
                            (0, I.jsxs)(`div`, {
                              className: `min-w-0`,
                              children: [
                                (0, I.jsx)(`p`, {
                                  className: `font-medium truncate`,
                                  children: n.name,
                                }),
                                (0, I.jsxs)(`p`, {
                                  className: `text-muted-foreground text-xs`,
                                  children: [`Tải lên bởi `, n.uploader],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, I.jsxs)(`div`, {
                          children: [
                            (0, I.jsxs)(`div`, {
                              className: `flex items-center gap-2 mb-2`,
                              children: [
                                (0, I.jsx)(A, {
                                  className: `h-6 w-6`,
                                  children: (0, I.jsx)(k, {
                                    className: `bg-muted text-[10px]`,
                                    children: n.reporter.charAt(0),
                                  }),
                                }),
                                (0, I.jsxs)(`span`, {
                                  className: `text-sm text-muted-foreground`,
                                  children: [`Báo cáo bởi `, n.reporter],
                                }),
                              ],
                            }),
                            (0, I.jsx)(`p`, {
                              className: `text-destructive font-semibold text-xs mb-1`,
                              children: `Lý do báo cáo`,
                            }),
                            (0, I.jsx)(`div`, {
                              className: `bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-sm leading-relaxed`,
                              children: n.reason,
                            }),
                          ],
                        }),
                        (0, I.jsxs)(`div`, {
                          children: [
                            (0, I.jsx)(p, {
                              className: `mb-2 block`,
                              children: `Quyết định xử lý *`,
                            }),
                            (0, I.jsxs)(S, {
                              value: L,
                              onValueChange: (e) => R(e),
                              className: `space-y-2`,
                              children: [
                                (0, I.jsxs)(`label`, {
                                  className: s(
                                    `flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors`,
                                    L === `remove`
                                      ? `border-primary bg-primary/5`
                                      : `border-border hover:bg-muted/50`,
                                  ),
                                  children: [
                                    (0, I.jsx)(x, {
                                      value: `remove`,
                                      className: `mt-1`,
                                    }),
                                    (0, I.jsxs)(`span`, {
                                      children: [
                                        (0, I.jsx)(`span`, {
                                          className: `block font-medium text-sm`,
                                          children: `Gỡ tài liệu xuống`,
                                        }),
                                        (0, I.jsx)(`span`, {
                                          className: `block text-muted-foreground text-xs`,
                                          children: `Xóa tài liệu và thông báo người tải`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, I.jsxs)(`label`, {
                                  className: s(
                                    `flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors`,
                                    L === `reject`
                                      ? `border-primary bg-primary/5`
                                      : `border-border hover:bg-muted/50`,
                                  ),
                                  children: [
                                    (0, I.jsx)(x, {
                                      value: `reject`,
                                      className: `mt-1`,
                                    }),
                                    (0, I.jsxs)(`span`, {
                                      children: [
                                        (0, I.jsx)(`span`, {
                                          className: `block font-medium text-sm`,
                                          children: `Từ chối báo cáo`,
                                        }),
                                        (0, I.jsx)(`span`, {
                                          className: `block text-muted-foreground text-xs`,
                                          children: `Tài liệu không vi phạm`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, I.jsxs)(`div`, {
                          children: [
                            (0, I.jsx)(p, {
                              htmlFor: `note`,
                              className: `mb-1.5 block`,
                              children: `Ghi chú (tùy chọn)`,
                            }),
                            (0, I.jsx)(b, {
                              id: `note`,
                              value: z,
                              onChange: (e) => B(e.target.value),
                              rows: 2,
                              placeholder: `Nội dung thông báo gửi tới người liên quan…`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, I.jsxs)(h, {
                      children: [
                        (0, I.jsx)(c, {
                          variant: `outline`,
                          onClick: W,
                          children: `Hủy`,
                        }),
                        (0, I.jsx)(c, {
                          disabled: !L,
                          onClick: () => {
                            !n ||
                              !L ||
                              t.mutate(
                                { id: n.id, decision: L },
                                {
                                  onSuccess: () => {
                                    (H(!0),
                                      r.success(
                                        L === `remove`
                                          ? `Đã gỡ tài liệu`
                                          : `Đã từ chối báo cáo`,
                                      ));
                                  },
                                },
                              );
                          },
                          children: `Xác nhận xử lý`,
                        }),
                      ],
                    }),
                  ],
                }),
              n &&
                V &&
                (0, I.jsxs)(`div`, {
                  className: `py-6 flex flex-col items-center text-center`,
                  children: [
                    (0, I.jsx)(`div`, {
                      className: `h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4`,
                      children: (0, I.jsx)(N, { className: `h-7 w-7` }),
                    }),
                    (0, I.jsx)(`h3`, {
                      className: `text-lg font-bold mb-1.5`,
                      children: `Đã giải quyết báo cáo`,
                    }),
                    (0, I.jsx)(`p`, {
                      className: `text-muted-foreground text-sm max-w-[300px] mb-6`,
                      children:
                        L === `remove`
                          ? `Tài liệu đã được gỡ xuống và người dùng đã được thông báo.`
                          : `Báo cáo đã được từ chối, tài liệu vẫn được giữ nguyên.`,
                    }),
                    (0, I.jsx)(c, {
                      className: `w-full`,
                      onClick: W,
                      children: `Đóng`,
                    }),
                  ],
                }),
            ],
          }),
        }),
      ],
    });
  };
export { L as component };
