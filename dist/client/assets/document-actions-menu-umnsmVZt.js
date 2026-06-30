import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { I as r, l as i } from "./index-CDVqwL1-.js";
import { t as a } from "./createLucideIcon-p5NglK5C.js";
import { o } from "./select-XZLYu5Ge.js";
import { t as s } from "./download-DnK76xKD.js";
import { t as c } from "./flag-BU0E1vrh.js";
import { t as l } from "./trash-2-CVEVc4it.js";
import { t as u } from "./button-CQzuWDyd.js";
import { t as d } from "./label-CsVxXoyT.js";
import {
  a as f,
  i as p,
  n as m,
  o as h,
  r as g,
  t as _,
} from "./dialog-5tbKv0U3.js";
import { c as v, m as y, r as b } from "./queries-DL6sGd2E.js";
import { n as x, o as S, r as C, t as w } from "./dropdown-menu-g7D8ZjbS.js";
import { t as T } from "./preferences-DAJJQJU8.js";
import { t as E } from "./textarea-DEF6Vte7.js";
import { n as D, t as O } from "./radio-group-CbIALWBK.js";
var k = a(`ellipsis-vertical`, [
    [`circle`, { cx: `12`, cy: `12`, r: `1`, key: `41hilf` }],
    [`circle`, { cx: `12`, cy: `5`, r: `1`, key: `gxeob9` }],
    [`circle`, { cx: `12`, cy: `19`, r: `1`, key: `lyex9k` }],
  ]),
  A = a(`pin-off`, [
    [`path`, { d: `M12 17v5`, key: `bb1du9` }],
    [
      `path`,
      { d: `M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89`, key: `znwnzq` },
    ],
    [`path`, { d: `m2 2 20 20`, key: `1ooewy` }],
    [
      `path`,
      {
        d: `M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11`,
        key: `c9qhm2`,
      },
    ],
  ]),
  j = a(`pin`, [
    [`path`, { d: `M12 17v5`, key: `bb1du9` }],
    [
      `path`,
      {
        d: `M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z`,
        key: `1nkz8b`,
      },
    ],
  ]),
  M = e(t()),
  N = n(),
  P = [
    { value: `copyright`, label: `Nội dung vi phạm bản quyền` },
    { value: `misinformation`, label: `Thông tin sai lệch / gây hiểu lầm` },
    { value: `inappropriate`, label: `Nội dung không phù hợp / phản cảm` },
    { value: `privacy`, label: `Vi phạm quyền riêng tư` },
    { value: `other`, label: `Lý do khác` },
  ];
function F({ open: e, onOpenChange: t, documentId: n, documentTitle: r }) {
  let a = y(),
    [o, s] = (0, M.useState)(``),
    [c, l] = (0, M.useState)(``);
  return (
    (0, M.useEffect)(() => {
      e || (s(``), l(``));
    }, [e]),
    (0, N.jsx)(_, {
      open: e,
      onOpenChange: t,
      children: (0, N.jsxs)(m, {
        children: [
          (0, N.jsxs)(f, {
            children: [
              (0, N.jsxs)(h, {
                className: `truncate`,
                children: [`Báo cáo "`, r, `"`],
              }),
              (0, N.jsx)(g, {
                children: `Cho chúng tôi biết vấn đề bạn gặp phải với tài liệu này.`,
              }),
            ],
          }),
          (0, N.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, N.jsxs)(`div`, {
                className: `space-y-2`,
                children: [
                  (0, N.jsx)(d, { children: `Lý do báo cáo` }),
                  (0, N.jsx)(O, {
                    value: o,
                    onValueChange: s,
                    className: `space-y-2`,
                    children: P.map((e) =>
                      (0, N.jsxs)(
                        `label`,
                        {
                          className: `flex items-center gap-2 text-sm rounded-md border border-border/60 px-3 py-2 cursor-pointer hover:bg-accent/40`,
                          children: [
                            (0, N.jsx)(D, { value: e.value }),
                            e.label,
                          ],
                        },
                        e.value,
                      ),
                    ),
                  }),
                ],
              }),
              (0, N.jsxs)(`div`, {
                className: `space-y-2`,
                children: [
                  (0, N.jsx)(d, { children: `Mô tả thêm (tùy chọn)` }),
                  (0, N.jsx)(E, {
                    value: c,
                    onChange: (e) => l(e.target.value),
                    placeholder: `Cung cấp chi tiết để chúng tôi xử lý nhanh hơn...`,
                    rows: 3,
                  }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(p, {
            children: [
              (0, N.jsx)(u, {
                variant: `outline`,
                onClick: () => t(!1),
                children: `Hủy`,
              }),
              (0, N.jsx)(u, {
                variant: `destructive`,
                onClick: async () => {
                  if (!o) {
                    i.error(`Vui lòng chọn lý do báo cáo`);
                    return;
                  }
                  try {
                    (await a.mutateAsync({
                      id: n,
                      reason: o,
                      description: c.trim() || void 0,
                    }),
                      i.success(`Đã gửi báo cáo, cảm ơn bạn!`),
                      t(!1));
                  } catch (e) {
                    i.error(
                      e instanceof Error ? e.message : `Gửi báo cáo thất bại`,
                    );
                  }
                },
                disabled: a.isPending,
                children: a.isPending ? `Đang gửi...` : `Gửi báo cáo`,
              }),
            ],
          }),
        ],
      }),
    })
  );
}
function I({
  open: e,
  onOpenChange: t,
  title: n,
  description: r,
  onConfirm: i,
  isPending: a,
}) {
  return (0, N.jsx)(_, {
    open: e,
    onOpenChange: t,
    children: (0, N.jsxs)(m, {
      children: [
        (0, N.jsxs)(f, {
          children: [
            (0, N.jsxs)(h, {
              className: `truncate`,
              children: [`Xóa "`, n, `"?`],
            }),
            (0, N.jsx)(g, {
              children:
                r ??
                `Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác.`,
            }),
          ],
        }),
        (0, N.jsxs)(p, {
          children: [
            (0, N.jsx)(u, {
              variant: `outline`,
              onClick: () => t(!1),
              children: `Hủy`,
            }),
            (0, N.jsx)(u, {
              variant: `destructive`,
              onClick: i,
              disabled: a,
              children: a ? `Đang xóa...` : `Xóa`,
            }),
          ],
        }),
      ],
    }),
  });
}
function L({
  documentId: e,
  folderId: t,
  title: n,
  className: a,
  iconClassName: u,
}) {
  let d = r(),
    f = b(),
    p = v(),
    { isMarked: m, toggle: h } = T(),
    g = m(e),
    [_, y] = (0, M.useState)(!1),
    [E, D] = (0, M.useState)(!1);
  return (0, N.jsxs)(N.Fragment, {
    children: [
      (0, N.jsxs)(w, {
        children: [
          (0, N.jsx)(S, {
            asChild: !0,
            children: (0, N.jsx)(`button`, {
              type: `button`,
              onClick: (e) => e.stopPropagation(),
              className:
                a ??
                `h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0`,
              title: `Tùy chọn`,
              children: (0, N.jsx)(k, { className: u ?? `h-4 w-4` }),
            }),
          }),
          (0, N.jsxs)(x, {
            align: `end`,
            onClick: (e) => e.stopPropagation(),
            children: [
              (0, N.jsxs)(C, {
                onClick: () =>
                  d({ to: `/ai`, search: { folderId: t, docId: e } }),
                children: [
                  (0, N.jsx)(o, { className: `h-3.5 w-3.5 mr-2` }),
                  ` Mở`,
                ],
              }),
              (0, N.jsxs)(C, {
                onClick: async () => {
                  try {
                    let t = await p.mutateAsync(e);
                    window.open(t.url, `_blank`);
                  } catch (e) {
                    i.error(
                      e instanceof Error ? e.message : `Tải xuống thất bại`,
                    );
                  }
                },
                disabled: p.isPending,
                children: [
                  (0, N.jsx)(s, { className: `h-3.5 w-3.5 mr-2` }),
                  ` Tải xuống`,
                ],
              }),
              (0, N.jsxs)(C, {
                onClick: () => y(!0),
                children: [
                  (0, N.jsx)(c, { className: `h-3.5 w-3.5 mr-2` }),
                  ` Báo cáo`,
                ],
              }),
              (0, N.jsxs)(C, {
                onClick: () => D(!0),
                className: `text-destructive focus:text-destructive`,
                children: [
                  (0, N.jsx)(l, { className: `h-3.5 w-3.5 mr-2` }),
                  ` Xóa`,
                ],
              }),
              (0, N.jsxs)(C, {
                onClick: () => {
                  (h(e),
                    i.success(g ? `Đã bỏ ghim tài liệu` : `Đã ghim tài liệu`));
                },
                children: [
                  g
                    ? (0, N.jsx)(A, { className: `h-3.5 w-3.5 mr-2` })
                    : (0, N.jsx)(j, { className: `h-3.5 w-3.5 mr-2` }),
                  g ? `Bỏ ghim` : `Ghim`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, N.jsx)(F, {
        open: _,
        onOpenChange: y,
        documentId: e,
        documentTitle: n,
      }),
      (0, N.jsx)(I, {
        open: E,
        onOpenChange: D,
        title: n,
        onConfirm: async () => {
          try {
            (await f.mutateAsync(e), i.success(`Đã xóa tài liệu`), D(!1));
          } catch (e) {
            i.error(e instanceof Error ? e.message : `Xóa thất bại`);
          }
        },
        isPending: f.isPending,
      }),
    ],
  });
}
export { j as n, L as t };
