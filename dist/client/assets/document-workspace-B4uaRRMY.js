import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./link-BbWDPsL2.js";
import { I as i, l as a } from "./index-CDVqwL1-.js";
import { t as o } from "./check-BgZ0eYb5.js";
import { t as s } from "./chevron-left-BaVOn7Pd.js";
import { t as c } from "./chevron-right-BOXqmgO9.js";
import { t as l } from "./download-DnK76xKD.js";
import { n as u, r as d, t as f } from "./DocumentViewer-BP9VP5MG.js";
import { t as p } from "./file-text-CjI-82n2.js";
import { t as m } from "./loader-circle-gML4jCQ4.js";
import { t as h } from "./sparkles-BqvYif3p.js";
import { t as g } from "./trash-2-CVEVc4it.js";
import { t as _ } from "./upload-MwgHKO99.js";
import { t as v } from "./x-CZ5V7eis.js";
import { t as y } from "./utils-BUTip_f_.js";
import { t as b } from "./button-CQzuWDyd.js";
import { t as x } from "./input-CDAzVnuz.js";
import { t as S } from "./label-CsVxXoyT.js";
import { a as C, i as w, n as T, o as E, t as D } from "./dialog-5tbKv0U3.js";
import {
  a as O,
  b as k,
  c as A,
  d as j,
  r as M,
  s as N,
  t as P,
} from "./queries-DL6sGd2E.js";
import { t as F } from "./skeleton-BEGUT5fr.js";
import { t as I } from "./textarea-DEF6Vte7.js";
var L = e(t()),
  R = n(),
  z = [
    {
      id: `memo`,
      label: `Thẻ ghi nhớ`,
      cls: `bg-orange-100 text-orange-700 hover:bg-orange-200`,
    },
    {
      id: `quiz`,
      label: `Bài kiểm tra`,
      cls: `bg-green-100 text-green-700 hover:bg-green-200`,
    },
    {
      id: `summary`,
      label: `Tóm Tắt`,
      cls: `bg-blue-100 text-blue-700 hover:bg-blue-200`,
    },
    {
      id: `idea`,
      label: `Ý Chính`,
      cls: `bg-purple-100 text-purple-700 hover:bg-purple-200`,
    },
  ];
function B({ folderId: e, docId: t }) {
  let n = j(e),
    o = N(e),
    c = O(t ?? ``);
  console.log(`DOC DATA`, c.data);
  let v = M(),
    S = P(),
    C = A(),
    w = i(),
    [T, E] = (0, L.useState)(`original`),
    [D, k] = (0, L.useState)(``),
    [B, G] = (0, L.useState)([]),
    [K, q] = (0, L.useState)(``),
    [J, Y] = (0, L.useState)(!1),
    X = (0, L.useRef)(null);
  (0, L.useEffect)(() => {
    X.current?.scrollTo({ top: X.current.scrollHeight, behavior: `smooth` });
  }, [B]);
  let Z = async () => {
    if (!K.trim() || !t) return;
    let e = K.trim();
    (q(``), G((t) => [...t, { role: `user`, content: e }]));
    try {
      let n = await S.mutateAsync({ id: t, question: e });
      G((e) => [...e, { role: `assistant`, content: n.answer }]);
    } catch (e) {
      a.error(e instanceof Error ? e.message : `Failed`);
    }
  };
  return (0, R.jsxs)(`div`, {
    className: `grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-4 h-[calc(100vh-9rem)]`,
    children: [
      (0, R.jsxs)(`aside`, {
        className: `hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft`,
        children: [
          (0, R.jsxs)(r, {
            to: `/folders`,
            className: `flex items-center gap-1.5 text-primary font-medium text-sm mb-4 hover:gap-2.5 transition-all`,
            children: [(0, R.jsx)(s, { className: `h-4 w-4` }), ` Quay về`],
          }),
          (0, R.jsxs)(`div`, {
            className: `rounded-xl bg-gradient-soft p-3 border border-border/50`,
            children: [
              (0, R.jsx)(`div`, {
                className: `text-[10px] font-semibold tracking-wider text-muted-foreground mb-1`,
                children: `THƯ MỤC ĐANG DÙNG`,
              }),
              (0, R.jsx)(`div`, {
                className: `text-sm font-semibold font-display`,
                children: n.data?.name ?? `—`,
              }),
              (0, R.jsxs)(`div`, {
                className: `text-xs text-muted-foreground mt-0.5`,
                children: [o.data?.length ?? 0, ` tài liệu`],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            className: `mt-5 flex-1 min-h-0 flex flex-col`,
            children: [
              (0, R.jsx)(`div`, {
                className: `text-[10px] font-semibold tracking-wider text-muted-foreground mb-2 px-1`,
                children: `TÀI LIỆU ĐANG CÓ`,
              }),
              (0, R.jsxs)(`div`, {
                className: `space-y-1 overflow-y-auto flex-1 -mx-1 px-1`,
                children: [
                  o.isLoading &&
                    Array.from({ length: 3 }).map((e, t) =>
                      (0, R.jsx)(F, { className: `h-9 rounded-lg` }, t),
                    ),
                  (o.data ?? []).map((n) => {
                    let i = n.id === t;
                    return (0, R.jsxs)(
                      r,
                      {
                        to: `/folders/$id`,
                        params: { id: String(e) },
                        search: { docId: n.id },
                        className: y(
                          `flex items-center gap-2 text-sm px-2.5 py-2 rounded-lg transition-colors`,
                          i
                            ? `bg-gradient-brand text-white font-medium shadow-soft`
                            : `hover:bg-accent text-foreground/90`,
                        ),
                        children: [
                          (0, R.jsx)(p, { className: `h-3.5 w-3.5 shrink-0` }),
                          (0, R.jsx)(`span`, {
                            className: `truncate`,
                            children: n.title,
                          }),
                        ],
                      },
                      n.id,
                    );
                  }),
                  !o.isLoading &&
                    (o.data ?? []).length === 0 &&
                    (0, R.jsx)(`div`, {
                      className: `text-xs text-muted-foreground px-2`,
                      children: `Chưa có tài liệu`,
                    }),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(b, {
            variant: `outline`,
            size: `sm`,
            className: `mt-4 justify-start border-dashed hover:border-primary hover:text-primary hover:bg-primary/5`,
            onClick: () => Y(!0),
            children: [
              (0, R.jsx)(_, { className: `h-3.5 w-3.5 mr-2` }),
              ` Tải lên tài liệu`,
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft`,
        children: [
          (0, R.jsx)(`div`, {
            className: `flex gap-1.5 p-3 border-b border-border bg-gradient-soft overflow-x-auto`,
            children: [
              { id: `original`, label: `Nội dung gốc` },
              { id: `notes`, label: `Ghi chú AI` },
              { id: `summary`, label: `Tóm tắt AI` },
              { id: `flashcards`, label: `Flashcards AI` },
              { id: `quizzes`, label: `Quizzes AI` },
            ].map((e) =>
              (0, R.jsx)(
                `button`,
                {
                  onClick: () => E(e.id),
                  className: y(
                    `px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all whitespace-nowrap`,
                    T === e.id
                      ? `bg-gradient-brand text-white shadow-soft`
                      : `bg-card text-foreground/70 border border-border hover:text-foreground hover:border-primary/40`,
                  ),
                  children: e.label,
                },
                e.id,
              ),
            ),
          }),
          T === `original` &&
            (o.data?.length ?? 0) > 0 &&
            (0, R.jsxs)(`div`, {
              className: `flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center`,
              children: [
                (0, R.jsx)(`button`, {
                  onClick: () =>
                    w({
                      to: `/folders/$id`,
                      params: { id: String(e) },
                      search: {},
                    }),
                  className: y(
                    `px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors`,
                    t
                      ? `bg-muted text-foreground hover:bg-accent`
                      : `bg-gradient-brand text-white`,
                  ),
                  children: `Tất cả`,
                }),
                (o.data ?? []).map((n) =>
                  (0, R.jsx)(
                    r,
                    {
                      to: `/folders/$id`,
                      params: { id: String(e) },
                      search: { docId: n.id },
                      className: y(
                        `px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors`,
                        n.id === t
                          ? `bg-gradient-brand text-white`
                          : `bg-brand-soft text-primary hover:bg-accent`,
                      ),
                      children: n.title,
                    },
                    n.id,
                  ),
                ),
              ],
            }),
          (0, R.jsx)(`div`, {
            className: `flex-1 overflow-y-auto p-6`,
            children:
              T === `original`
                ? t && c.data
                  ? (0, R.jsx)(f, { document: c.data })
                  : c.isLoading
                    ? (0, R.jsx)(`div`, {
                        className: `flex items-center justify-center h-full`,
                        children: (0, R.jsxs)(`div`, {
                          className: `flex flex-col items-center gap-2`,
                          children: [
                            (0, R.jsx)(m, {
                              className: `h-8 w-8 animate-spin text-primary`,
                            }),
                            (0, R.jsx)(`p`, {
                              className: `text-sm text-muted-foreground`,
                              children: `Đang tải tài liệu...`,
                            }),
                          ],
                        }),
                      })
                    : t
                      ? (0, R.jsx)(`div`, {
                          className: `flex items-center justify-center h-full`,
                          children: (0, R.jsxs)(`div`, {
                            className: `flex flex-col items-center gap-2`,
                            children: [
                              (0, R.jsx)(`p`, {
                                className: `text-sm text-muted-foreground`,
                                children: `Không thể tải tài liệu`,
                              }),
                              (0, R.jsxs)(b, {
                                variant: `outline`,
                                size: `sm`,
                                onClick: () => window.location.reload(),
                                children: [
                                  (0, R.jsx)(d, { className: `h-4 w-4 mr-2` }),
                                  `Thử lại`,
                                ],
                              }),
                            ],
                          }),
                        })
                      : (0, R.jsxs)(`div`, {
                          className: `grid grid-cols-2 sm:grid-cols-3 gap-4`,
                          children: [
                            o.isLoading &&
                              Array.from({ length: 6 }).map((e, t) =>
                                (0, R.jsx)(
                                  F,
                                  { className: `h-40 rounded-xl` },
                                  t,
                                ),
                              ),
                            (o.data ?? []).map((n) => {
                              let i = n.id === t;
                              return (0, R.jsxs)(
                                r,
                                {
                                  to: `/folders/$id`,
                                  params: { id: String(e) },
                                  search: { docId: n.id },
                                  className: y(
                                    `group flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5`,
                                    i &&
                                      `border-primary ring-2 ring-primary/20 shadow-soft`,
                                  ),
                                  children: [
                                    (0, R.jsx)(`div`, {
                                      className: `flex-1 flex items-center justify-center w-full py-4`,
                                      children: (0, R.jsx)(`div`, {
                                        className: `h-16 w-16 rounded-xl bg-gradient-soft flex items-center justify-center group-hover:bg-gradient-brand transition-colors`,
                                        children: (0, R.jsx)(p, {
                                          className: `h-8 w-8 text-primary group-hover:text-white`,
                                        }),
                                      }),
                                    }),
                                    (0, R.jsx)(`div`, {
                                      className: `text-xs font-medium text-foreground truncate w-full`,
                                      children: n.title,
                                    }),
                                  ],
                                },
                                n.id,
                              );
                            }),
                            !o.isLoading &&
                              (o.data ?? []).length === 0 &&
                              (0, R.jsx)(`div`, {
                                className: `col-span-full text-sm text-muted-foreground text-center py-10`,
                                children: `Chưa có tài liệu. Bấm "Tải lên tài liệu" để bắt đầu.`,
                              }),
                          ],
                        })
                : t
                  ? c.isLoading
                    ? (0, R.jsxs)(`div`, {
                        className: `space-y-3`,
                        children: [
                          (0, R.jsx)(F, { className: `h-6 w-48` }),
                          (0, R.jsx)(F, { className: `h-4 w-96` }),
                        ],
                      })
                    : T === `notes`
                      ? (0, R.jsxs)(`div`, {
                          className: `space-y-3`,
                          children: [
                            (0, R.jsxs)(`div`, {
                              className: `flex flex-wrap gap-1 border border-border rounded-lg px-2 py-1.5 text-xs text-muted-foreground bg-muted/40`,
                              children: [
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer font-bold`,
                                  children: `B`,
                                }),
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer italic`,
                                  children: `I`,
                                }),
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer underline`,
                                  children: `U`,
                                }),
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer`,
                                  children: `H1`,
                                }),
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer`,
                                  children: `H2`,
                                }),
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer`,
                                  children: `• List`,
                                }),
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer`,
                                  children: `1. List`,
                                }),
                                (0, R.jsx)(`span`, {
                                  className: `px-2 py-0.5 hover:bg-accent rounded cursor-pointer`,
                                  children: `Link`,
                                }),
                              ],
                            }),
                            (0, R.jsx)(`h2`, {
                              className: `text-xl font-bold text-gradient-brand font-display`,
                              children: `Ghi chú AI`,
                            }),
                            (0, R.jsx)(I, {
                              value: D,
                              onChange: (e) => k(e.target.value),
                              placeholder: `Ghi chú của bạn về tài liệu này...`,
                              className: `min-h-[300px] resize-none`,
                            }),
                          ],
                        })
                      : T === `summary`
                        ? (0, R.jsx)(H, {
                            title: c.data?.title ?? ``,
                            description: c.data?.description ?? ``,
                          })
                        : T === `flashcards`
                          ? (0, R.jsx)(U, { title: c.data?.title ?? `` })
                          : (0, R.jsx)(W, { title: c.data?.title ?? `` })
                  : (0, R.jsx)(`div`, {
                      className: `text-sm text-muted-foreground text-center mt-16`,
                      children: `Chọn một tài liệu để xem nội dung.`,
                    }),
          }),
          t &&
            (0, R.jsxs)(`div`, {
              className: `p-3 border-t border-border flex items-center gap-2`,
              children: [
                (0, R.jsxs)(b, {
                  variant: `outline`,
                  size: `sm`,
                  onClick: async () => {
                    if (t)
                      try {
                        let e = await C.mutateAsync(t);
                        window.open(e.url, `_blank`);
                      } catch (e) {
                        a.error(
                          e instanceof Error ? e.message : `Tải xuống thất bại`,
                        );
                      }
                  },
                  disabled: C.isPending,
                  children: [
                    (0, R.jsx)(l, { className: `h-3.5 w-3.5 mr-2` }),
                    ` `,
                    C.isPending ? `Đang tải…` : `Tải xuống`,
                  ],
                }),
                (0, R.jsxs)(b, {
                  variant: `ghost`,
                  size: `sm`,
                  onClick: async () => {
                    if (
                      t &&
                      confirm(`Xoá tài liệu này (chuyển vào Thùng rác)?`)
                    )
                      try {
                        (await v.mutateAsync(t),
                          a.success(`Đã chuyển vào thùng rác`),
                          w({
                            to: `/folders/$id`,
                            params: { id: String(e) },
                            search: {},
                          }));
                      } catch (e) {
                        a.error(e instanceof Error ? e.message : `Failed`);
                      }
                  },
                  className: `text-destructive`,
                  children: [
                    (0, R.jsx)(g, { className: `h-3.5 w-3.5 mr-2` }),
                    ` Xoá`,
                  ],
                }),
              ],
            }),
        ],
      }),
      (0, R.jsxs)(`aside`, {
        className: `bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft`,
        children: [
          (0, R.jsxs)(`div`, {
            className: `p-4 border-b border-border bg-gradient-soft space-y-3`,
            children: [
              (0, R.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [
                  (0, R.jsx)(`div`, {
                    className: `h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center`,
                    children: (0, R.jsx)(h, {
                      className: `h-4 w-4 text-white`,
                    }),
                  }),
                  (0, R.jsxs)(`div`, {
                    className: `min-w-0`,
                    children: [
                      (0, R.jsx)(`div`, {
                        className: `text-[10px] uppercase tracking-wider text-muted-foreground font-semibold`,
                        children: `AI Assistant`,
                      }),
                      (0, R.jsx)(`div`, {
                        className: `text-sm font-semibold truncate font-display`,
                        children: c.data?.title ?? `Chưa chọn tài liệu`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, R.jsx)(`div`, {
                className: `flex flex-wrap gap-1.5`,
                children: z.map((e) =>
                  (0, R.jsx)(
                    `button`,
                    {
                      onClick: () => a.info(`${e.label} — đang phát triển`),
                      className: y(
                        `px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors`,
                        e.cls,
                      ),
                      children: e.label,
                    },
                    e.id,
                  ),
                ),
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            ref: X,
            className: `flex-1 overflow-y-auto p-3 space-y-3`,
            children: [
              B.length === 0
                ? (0, R.jsxs)(`div`, {
                    className: `flex flex-col items-center justify-center h-full text-center px-4 py-8`,
                    children: [
                      (0, R.jsx)(`div`, {
                        className: `h-12 w-12 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3`,
                        children: (0, R.jsx)(h, {
                          className: `h-6 w-6 text-primary`,
                        }),
                      }),
                      (0, R.jsx)(`div`, {
                        className: `text-sm font-medium`,
                        children: `Hỏi AI về tài liệu`,
                      }),
                      (0, R.jsx)(`div`, {
                        className: `text-xs text-muted-foreground mt-1`,
                        children: `Tóm tắt, giải thích, hỏi đáp — tất cả trong một`,
                      }),
                    ],
                  })
                : B.map((e, t) =>
                    (0, R.jsx)(
                      `div`,
                      {
                        className: y(
                          `text-sm rounded-2xl px-3.5 py-2.5 max-w-[88%] leading-relaxed`,
                          e.role === `user`
                            ? `bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft`
                            : `bg-muted text-foreground rounded-bl-md`,
                        ),
                        children: e.content,
                      },
                      t,
                    ),
                  ),
              S.isPending &&
                (0, R.jsxs)(`div`, {
                  className: `text-sm bg-muted rounded-2xl rounded-bl-md px-3.5 py-2.5 max-w-[88%] inline-flex items-center gap-1.5`,
                  children: [
                    (0, R.jsx)(`span`, {
                      className: `h-1.5 w-1.5 rounded-full bg-primary animate-pulse`,
                    }),
                    (0, R.jsx)(`span`, {
                      className: `h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:200ms]`,
                    }),
                    (0, R.jsx)(`span`, {
                      className: `h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]`,
                    }),
                  ],
                }),
            ],
          }),
          (0, R.jsxs)(`form`, {
            onSubmit: (e) => {
              (e.preventDefault(), Z());
            },
            className: `p-3 border-t border-border flex gap-2`,
            children: [
              (0, R.jsx)(x, {
                value: K,
                onChange: (e) => q(e.target.value),
                placeholder: `Hỏi AI bất cứ điều gì…`,
                className: `text-sm rounded-xl bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-input`,
                disabled: !t,
              }),
              (0, R.jsx)(b, {
                type: `submit`,
                size: `icon`,
                disabled: S.isPending || !K.trim() || !t,
                className: `bg-gradient-brand hover:opacity-90 rounded-xl shrink-0`,
                children: (0, R.jsx)(u, { className: `h-4 w-4` }),
              }),
            ],
          }),
        ],
      }),
      (0, R.jsx)(V, { open: J, onOpenChange: Y, folderId: e }),
    ],
  });
}
function V({ open: e, onOpenChange: t, folderId: n }) {
  let r = k(),
    [i, o] = (0, L.useState)(null),
    [s, c] = (0, L.useState)(``),
    [l, u] = (0, L.useState)(``);
  return (0, R.jsx)(D, {
    open: e,
    onOpenChange: t,
    children: (0, R.jsxs)(T, {
      children: [
        (0, R.jsx)(C, {
          children: (0, R.jsx)(E, { children: `Tải lên tài liệu` }),
        }),
        (0, R.jsxs)(`div`, {
          className: `space-y-4`,
          children: [
            (0, R.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, R.jsx)(S, { children: `File` }),
                (0, R.jsx)(x, {
                  type: `file`,
                  onChange: (e) => o(e.target.files?.[0] ?? null),
                }),
              ],
            }),
            (0, R.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, R.jsx)(S, { children: `Tiêu đề` }),
                (0, R.jsx)(x, { value: s, onChange: (e) => c(e.target.value) }),
              ],
            }),
            (0, R.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, R.jsx)(S, { children: `Mô tả` }),
                (0, R.jsx)(I, { value: l, onChange: (e) => u(e.target.value) }),
              ],
            }),
          ],
        }),
        (0, R.jsxs)(w, {
          children: [
            (0, R.jsx)(b, {
              variant: `outline`,
              onClick: () => t(!1),
              children: `Huỷ`,
            }),
            (0, R.jsx)(b, {
              onClick: async () => {
                if (!i) return a.error(`Chọn file`);
                if (!s.trim()) return a.error(`Nhập tiêu đề`);
                try {
                  (await r.mutateAsync({
                    file: i,
                    folderId: n,
                    title: s,
                    description: l,
                  }),
                    a.success(`Đã tải lên`),
                    t(!1),
                    o(null),
                    c(``),
                    u(``));
                } catch (e) {
                  a.error(e instanceof Error ? e.message : `Upload failed`);
                }
              },
              disabled: r.isPending,
              children: r.isPending ? `Đang tải…` : `Tải lên`,
            }),
          ],
        }),
      ],
    }),
  });
}
function H({ title: e, description: t }) {
  let [n, r] = (0, L.useState)(!0),
    [i, a] = (0, L.useState)(0);
  (0, L.useEffect)(() => {
    r(!0);
    let e = setTimeout(() => r(!1), 700);
    return () => clearTimeout(e);
  }, [e, i]);
  let o = (0, L.useMemo)(
    () => [
      `Tài liệu “${e}” cung cấp kiến thức nền tảng và thuật ngữ cốt lõi cho người học.`,
      `Trình bày khái niệm theo trình tự từ cơ bản đến nâng cao, kèm ví dụ minh hoạ.`,
      `Nhấn mạnh các thuật ngữ tiếng Anh chuyên ngành và cách dùng trong ngữ cảnh thực tế.`,
      `Đưa ra bài tập vận dụng giúp người đọc tự kiểm tra mức độ hiểu bài.`,
      `Kết luận tổng kết các điểm quan trọng cần ghi nhớ sau khi đọc xong tài liệu.`,
    ],
    [e],
  );
  return (0, R.jsxs)(`div`, {
    className: `space-y-5`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `flex items-center justify-between`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsxs)(`h2`, {
                className: `text-xl font-bold flex items-center gap-2 text-gradient-brand font-display`,
                children: [
                  (0, R.jsx)(h, { className: `h-5 w-5` }),
                  ` AI Summary`,
                ],
              }),
              (0, R.jsx)(`p`, {
                className: `text-xs text-muted-foreground mt-1`,
                children: `Tóm tắt được tạo tự động bởi AI dựa trên nội dung tài liệu`,
              }),
            ],
          }),
          (0, R.jsxs)(b, {
            size: `sm`,
            variant: `outline`,
            onClick: () => a((e) => e + 1),
            children: [
              (0, R.jsx)(d, { className: `h-3.5 w-3.5 mr-2` }),
              ` Tạo lại`,
            ],
          }),
        ],
      }),
      n
        ? (0, R.jsxs)(`div`, {
            className: `space-y-2`,
            children: [
              (0, R.jsx)(F, { className: `h-4 w-3/4` }),
              (0, R.jsx)(F, { className: `h-4 w-full` }),
              (0, R.jsx)(F, { className: `h-4 w-5/6` }),
              (0, R.jsx)(F, { className: `h-4 w-2/3` }),
            ],
          })
        : (0, R.jsxs)(R.Fragment, {
            children: [
              (0, R.jsxs)(`div`, {
                className: `rounded-lg border border-primary/20 bg-brand-soft/60 p-4`,
                children: [
                  (0, R.jsx)(`div`, {
                    className: `text-xs font-semibold text-primary mb-1`,
                    children: `Tóm tắt ngắn`,
                  }),
                  (0, R.jsx)(`p`, {
                    className: `text-sm leading-relaxed`,
                    children:
                      t ||
                      `Tài liệu “${e}” tổng hợp các kiến thức cốt lõi và thuật ngữ quan trọng, giúp người đọc nắm chắc lý thuyết và áp dụng vào thực tế.`,
                  }),
                ],
              }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`div`, {
                    className: `text-sm font-semibold mb-2`,
                    children: `Điểm chính`,
                  }),
                  (0, R.jsx)(`ul`, {
                    className: `space-y-2 text-sm`,
                    children: o.map((e, t) =>
                      (0, R.jsxs)(
                        `li`,
                        {
                          className: `flex gap-2`,
                          children: [
                            (0, R.jsx)(`span`, {
                              className: `h-5 w-5 shrink-0 rounded-full bg-gradient-brand text-white text-xs font-bold flex items-center justify-center`,
                              children: t + 1,
                            }),
                            (0, R.jsx)(`span`, { children: e }),
                          ],
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
    ],
  });
}
function U({ title: e }) {
  let t = (0, L.useMemo)(
      () => [
        {
          front: `Algorithm`,
          back: `Tập hợp các bước cụ thể để giải quyết một bài toán.`,
        },
        {
          front: `Variable`,
          back: `Vùng nhớ có tên, dùng để lưu trữ giá trị có thể thay đổi.`,
        },
        {
          front: `Function`,
          back: `Khối lệnh có thể tái sử dụng, nhận đầu vào và trả về kết quả.`,
        },
        {
          front: `Loop`,
          back: `Cấu trúc lặp lại một khối lệnh nhiều lần theo điều kiện.`,
        },
        {
          front: `Class`,
          back: `Khuôn mẫu định nghĩa thuộc tính và hành vi của đối tượng (OOP).`,
        },
      ],
      [],
    ),
    [n, r] = (0, L.useState)(0),
    [i, a] = (0, L.useState)(!1);
  return (
    (0, L.useEffect)(() => a(!1), [n]),
    (0, R.jsxs)(`div`, {
      className: `space-y-5`,
      children: [
        (0, R.jsxs)(`div`, {
          className: `flex items-center justify-between`,
          children: [
            (0, R.jsxs)(`div`, {
              children: [
                (0, R.jsxs)(`h2`, {
                  className: `text-xl font-bold flex items-center gap-2 text-gradient-brand font-display`,
                  children: [
                    (0, R.jsx)(h, { className: `h-5 w-5` }),
                    ` AI Flashcards`,
                  ],
                }),
                (0, R.jsxs)(`p`, {
                  className: `text-xs text-muted-foreground mt-1`,
                  children: [
                    `Thẻ ghi nhớ từ “`,
                    e,
                    `” — bấm vào thẻ để lật mặt`,
                  ],
                }),
              ],
            }),
            (0, R.jsxs)(`div`, {
              className: `text-xs text-muted-foreground`,
              children: [n + 1, ` / `, t.length],
            }),
          ],
        }),
        (0, R.jsxs)(`button`, {
          onClick: () => a((e) => !e),
          className: `w-full min-h-[220px] rounded-xl border-2 border-primary/20 bg-gradient-soft p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md`,
          children: [
            (0, R.jsx)(`div`, {
              className: `text-[11px] uppercase tracking-wider text-muted-foreground mb-3`,
              children: i ? `Định nghĩa` : `Thuật ngữ`,
            }),
            (0, R.jsx)(`div`, {
              className: y(
                `font-semibold`,
                i ? `text-base leading-relaxed` : `text-2xl`,
              ),
              children: i ? t[n].back : t[n].front,
            }),
            (0, R.jsx)(`div`, {
              className: `text-xs text-muted-foreground mt-4`,
              children: `Bấm để lật thẻ`,
            }),
          ],
        }),
        (0, R.jsxs)(`div`, {
          className: `flex items-center justify-between`,
          children: [
            (0, R.jsxs)(b, {
              variant: `outline`,
              size: `sm`,
              onClick: () => r((e) => (e - 1 + t.length) % t.length),
              children: [
                (0, R.jsx)(s, { className: `h-4 w-4 mr-1` }),
                ` Trước`,
              ],
            }),
            (0, R.jsx)(`div`, {
              className: `flex gap-1`,
              children: t.map((e, t) =>
                (0, R.jsx)(
                  `div`,
                  {
                    className: y(
                      `h-1.5 rounded-full transition-all`,
                      t === n ? `w-6 bg-gradient-brand` : `w-1.5 bg-muted`,
                    ),
                  },
                  t,
                ),
              ),
            }),
            (0, R.jsxs)(b, {
              size: `sm`,
              onClick: () => r((e) => (e + 1) % t.length),
              children: [`Tiếp `, (0, R.jsx)(c, { className: `h-4 w-4 ml-1` })],
            }),
          ],
        }),
      ],
    })
  );
}
function W({ title: e }) {
  let t = (0, L.useMemo)(
      () => [
        {
          q: `Thuật ngữ “Algorithm” có nghĩa là gì?`,
          options: [
            `Một loại ngôn ngữ lập trình`,
            `Tập hợp các bước giải quyết bài toán`,
            `Một loại biến trong bộ nhớ`,
            `Tên gọi của một framework`,
          ],
          answer: 1,
        },
        {
          q: `Cấu trúc nào dùng để lặp lại một khối lệnh?`,
          options: [`Function`, `Variable`, `Loop`, `Class`],
          answer: 2,
        },
        {
          q: `Trong OOP, “Class” là gì?`,
          options: [
            `Một biến toàn cục`,
            `Khuôn mẫu định nghĩa đối tượng`,
            `Một hàm trả về số`,
            `Một loại vòng lặp`,
          ],
          answer: 1,
        },
      ],
      [],
    ),
    [n, r] = (0, L.useState)({}),
    [i, s] = (0, L.useState)(!1),
    c = (0, L.useMemo)(
      () => t.reduce((e, t, r) => (n[r] === t.answer ? e + 1 : e), 0),
      [n, t],
    );
  return (0, R.jsxs)(`div`, {
    className: `space-y-5`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `flex items-center justify-between`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsxs)(`h2`, {
                className: `text-xl font-bold flex items-center gap-2 text-gradient-brand font-display`,
                children: [
                  (0, R.jsx)(h, { className: `h-5 w-5` }),
                  ` AI Quizzes`,
                ],
              }),
              (0, R.jsxs)(`p`, {
                className: `text-xs text-muted-foreground mt-1`,
                children: [`Câu hỏi trắc nghiệm từ “`, e, `”`],
              }),
            ],
          }),
          i &&
            (0, R.jsxs)(`div`, {
              className: `text-sm font-semibold`,
              children: [
                `Điểm:`,
                ` `,
                (0, R.jsxs)(`span`, {
                  className: `text-gradient-brand`,
                  children: [c, ` / `, t.length],
                }),
              ],
            }),
        ],
      }),
      (0, R.jsx)(`div`, {
        className: `space-y-4`,
        children: t.map((e, t) =>
          (0, R.jsxs)(
            `div`,
            {
              className: `rounded-lg border border-border p-4`,
              children: [
                (0, R.jsxs)(`div`, {
                  className: `font-medium text-sm mb-3`,
                  children: [`Câu `, t + 1, `. `, e.q],
                }),
                (0, R.jsx)(`div`, {
                  className: `space-y-2`,
                  children: e.options.map((a, s) => {
                    let c = n[t] === s,
                      l = i && s === e.answer,
                      u = i && c && s !== e.answer;
                    return (0, R.jsxs)(
                      `button`,
                      {
                        disabled: i,
                        onClick: () => r((e) => ({ ...e, [t]: s })),
                        className: y(
                          `w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors`,
                          l && `border-emerald-400 bg-emerald-50/60`,
                          u && `border-red-400 bg-red-50/60`,
                          !i && c && `border-primary bg-brand-soft/60`,
                          !i && !c && `border-border hover:bg-accent`,
                        ),
                        children: [
                          (0, R.jsx)(`span`, {
                            className: y(
                              `h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0`,
                              l &&
                                `bg-emerald-500 text-white border-emerald-500`,
                              u && `bg-red-500 text-white border-red-500`,
                              !i &&
                                c &&
                                `bg-gradient-brand text-white border-transparent`,
                            ),
                            children: l
                              ? (0, R.jsx)(o, { className: `h-3 w-3` })
                              : u
                                ? (0, R.jsx)(v, { className: `h-3 w-3` })
                                : String.fromCharCode(65 + s),
                          }),
                          (0, R.jsx)(`span`, { children: a }),
                        ],
                      },
                      s,
                    );
                  }),
                }),
              ],
            },
            t,
          ),
        ),
      }),
      (0, R.jsx)(`div`, {
        className: `flex justify-end gap-2`,
        children: i
          ? (0, R.jsxs)(b, {
              variant: `outline`,
              onClick: () => {
                (r({}), s(!1));
              },
              children: [
                (0, R.jsx)(d, { className: `h-4 w-4 mr-2` }),
                ` Làm lại`,
              ],
            })
          : (0, R.jsx)(b, {
              onClick: () => {
                if (Object.keys(n).length < t.length) {
                  a.error(`Vui lòng trả lời tất cả câu hỏi`);
                  return;
                }
                s(!0);
              },
              children: `Nộp bài`,
            }),
      }),
    ],
  });
}
export { B as t };
