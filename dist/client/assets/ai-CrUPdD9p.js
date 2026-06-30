import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./link-BbWDPsL2.js";
import { I as i, l as a, m as o, r as s } from "./index-CDVqwL1-.js";
import { t as c } from "./createLucideIcon-p5NglK5C.js";
import { t as l } from "./check-BgZ0eYb5.js";
import { a as u, i as d, n as f, r as p, t as m } from "./select-XZLYu5Ge.js";
import { t as h } from "./chevron-left-BaVOn7Pd.js";
import { t as g } from "./chevron-right-BOXqmgO9.js";
import { n as _, t as v } from "./document-actions-menu-umnsmVZt.js";
import { n as y, r as b, t as x } from "./DocumentViewer-BP9VP5MG.js";
import { t as S } from "./file-text-CjI-82n2.js";
import { t as C } from "./loader-circle-gML4jCQ4.js";
import { t as w } from "./sparkles-BqvYif3p.js";
import { t as T } from "./x-CZ5V7eis.js";
import { t as E } from "./utils-BUTip_f_.js";
import { t as D } from "./button-CQzuWDyd.js";
import { t as O } from "./input-CDAzVnuz.js";
import {
  a as k,
  d as A,
  p as j,
  s as M,
  t as N,
  u as P,
  v as F,
} from "./queries-DL6sGd2E.js";
import { t as I } from "./preferences-DAJJQJU8.js";
import { t as L } from "./skeleton-BEGUT5fr.js";
var R = c(`files`, [
    [
      `path`,
      {
        d: `M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8`,
        key: `14sh0y`,
      },
    ],
    [
      `path`,
      {
        d: `M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z`,
        key: `1970lx`,
      },
    ],
    [
      `path`,
      {
        d: `M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1`,
        key: `l4dndm`,
      },
    ],
  ]),
  z = c(`folder-closed`, [
    [
      `path`,
      {
        d: `M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`,
        key: `1kt360`,
      },
    ],
    [`path`, { d: `M2 10h20`, key: `1ir3d8` }],
  ]),
  B = c(`funnel`, [
    [
      `path`,
      {
        d: `M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z`,
        key: `sc7q7i`,
      },
    ],
  ]),
  V = c(`settings-2`, [
    [`path`, { d: `M14 17H5`, key: `gfn3mx` }],
    [`path`, { d: `M19 7h-9`, key: `6i9tg` }],
    [`circle`, { cx: `17`, cy: `17`, r: `3`, key: `18b49y` }],
    [`circle`, { cx: `7`, cy: `7`, r: `3`, key: `dfmy0x` }],
  ]),
  H = c(`shuffle`, [
    [`path`, { d: `m18 14 4 4-4 4`, key: `10pe0f` }],
    [`path`, { d: `m18 2 4 4-4 4`, key: `pucp1d` }],
    [
      `path`,
      {
        d: `M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22`,
        key: `1ailkh`,
      },
    ],
    [`path`, { d: `M2 6h1.972a4 4 0 0 1 3.6 2.2`, key: `km57vx` }],
    [`path`, { d: `M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45`, key: `os18l9` }],
  ]),
  U = e(t()),
  W = n(),
  G = {
    multiple_choice: `Trắc nghiệm (1 đáp án)`,
    true_false: `Đúng / Sai`,
    multiple_answer: `Nhiều đáp án`,
  };
function K({ folderId: e, docId: t, title: n }) {
  let r = M(e).data ?? [],
    [i, s] = (0, U.useState)(t ?? `all`),
    [c, u] = (0, U.useState)([`multiple_choice`]),
    [d, f] = (0, U.useState)(5);
  (0, U.useEffect)(() => {
    s(t ?? `all`);
  }, [t]);
  let [p, m] = (0, U.useState)(`setup`),
    [h, g] = (0, U.useState)(!1),
    [_, v] = (0, U.useState)([]),
    [y, x] = (0, U.useState)({}),
    [O, k] = (0, U.useState)(!1),
    A = (e) => u((t) => (t.includes(e) ? t.filter((t) => t !== e) : [...t, e])),
    j = async () => {
      if (c.length === 0) {
        a.error(`Chọn ít nhất 1 loại câu hỏi`);
        return;
      }
      g(!0);
      try {
        let e = { scope: i, types: c, questionCount: d };
        (v(await o.generateAdvanced(e)), x({}), k(!1), m(`doing`));
      } catch {
        a.error(`Tạo quiz thất bại`);
      } finally {
        g(!1);
      }
    },
    N = (0, U.useMemo)(
      () =>
        _.reduce((e, t, n) => {
          let r = (y[n] ?? []).slice().sort().join(`,`),
            i = t.correctAnswers.slice().sort().join(`,`);
          return r && r === i ? e + 1 : e;
        }, 0),
      [y, _],
    ),
    P = (e, t, n) => {
      x((r) => {
        let i = r[e] ?? [];
        return n
          ? { ...r, [e]: i.includes(t) ? i.filter((e) => e !== t) : [...i, t] }
          : { ...r, [e]: [t] };
      });
    };
  return p === `setup`
    ? (0, W.jsx)(`div`, {
        className: `min-h-full flex items-center justify-center`,
        children: (0, W.jsxs)(`div`, {
          className: `space-y-6 w-full max-w-md`,
          children: [
            (0, W.jsxs)(`div`, {
              children: [
                (0, W.jsxs)(`h2`, {
                  className: `text-xl font-bold flex items-center gap-2 text-gradient-brand font-display`,
                  children: [
                    (0, W.jsx)(w, { className: `h-5 w-5` }),
                    ` Tạo AI Quiz`,
                  ],
                }),
                (0, W.jsx)(`p`, {
                  className: `text-xs text-muted-foreground mt-1`,
                  children: `Tùy chỉnh trước khi tạo bộ câu hỏi`,
                }),
              ],
            }),
            (0, W.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, W.jsxs)(`label`, {
                  className: `text-sm font-semibold flex items-center gap-1.5`,
                  children: [
                    (0, W.jsx)(R, { className: `h-4 w-4` }),
                    ` Tài liệu tham chiếu`,
                  ],
                }),
                (0, W.jsxs)(`div`, {
                  className: `grid gap-2`,
                  children: [
                    (0, W.jsxs)(`button`, {
                      onClick: () => s(`all`),
                      className: E(
                        `flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors`,
                        i === `all`
                          ? `border-primary bg-brand-soft/60`
                          : `border-border hover:bg-accent`,
                      ),
                      children: [
                        (0, W.jsx)(R, { className: `h-4 w-4` }),
                        ` Tất cả tài liệu trong thư mục`,
                        (0, W.jsxs)(`span`, {
                          className: `ml-auto text-xs text-muted-foreground`,
                          children: [r.length, ` tệp`],
                        }),
                      ],
                    }),
                    r.map((e) =>
                      (0, W.jsxs)(
                        `button`,
                        {
                          onClick: () => s(e.id),
                          className: E(
                            `flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors`,
                            i === e.id
                              ? `border-primary bg-brand-soft/60`
                              : `border-border hover:bg-accent`,
                          ),
                          children: [
                            (0, W.jsx)(S, { className: `h-4 w-4 shrink-0` }),
                            ` `,
                            (0, W.jsx)(`span`, {
                              className: `truncate`,
                              children: e.title,
                            }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                    r.length === 0 &&
                      (0, W.jsx)(`p`, {
                        className: `text-xs text-muted-foreground`,
                        children: `Thư mục chưa có tài liệu.`,
                      }),
                  ],
                }),
              ],
            }),
            (0, W.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, W.jsxs)(`label`, {
                  className: `text-sm font-semibold flex items-center gap-1.5`,
                  children: [
                    (0, W.jsx)(V, { className: `h-4 w-4` }),
                    ` Loại câu hỏi`,
                  ],
                }),
                (0, W.jsx)(`div`, {
                  className: `grid gap-2`,
                  children: Object.keys(G).map((e) =>
                    (0, W.jsxs)(
                      `button`,
                      {
                        onClick: () => A(e),
                        className: E(
                          `flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors`,
                          c.includes(e)
                            ? `border-primary bg-brand-soft/60`
                            : `border-border hover:bg-accent`,
                        ),
                        children: [
                          (0, W.jsx)(`span`, {
                            className: E(
                              `h-4 w-4 rounded border flex items-center justify-center`,
                              c.includes(e)
                                ? `bg-gradient-brand border-transparent`
                                : `border-border`,
                            ),
                            children:
                              c.includes(e) &&
                              (0, W.jsx)(l, {
                                className: `h-3 w-3 text-white`,
                              }),
                          }),
                          G[e],
                        ],
                      },
                      e,
                    ),
                  ),
                }),
              ],
            }),
            (0, W.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, W.jsxs)(`label`, {
                  className: `text-sm font-semibold`,
                  children: [
                    `Số câu hỏi: `,
                    (0, W.jsx)(`span`, {
                      className: `text-gradient-brand`,
                      children: d,
                    }),
                  ],
                }),
                (0, W.jsx)(`input`, {
                  type: `range`,
                  min: 3,
                  max: 20,
                  value: d,
                  onChange: (e) => f(Number(e.target.value)),
                  className: `w-full accent-[var(--primary)]`,
                }),
              ],
            }),
            (0, W.jsx)(D, {
              onClick: j,
              disabled: h,
              className: `w-full bg-gradient-brand shadow-brand`,
              children: h
                ? (0, W.jsxs)(W.Fragment, {
                    children: [
                      (0, W.jsx)(C, { className: `h-4 w-4 mr-2 animate-spin` }),
                      ` Đang tạo…`,
                    ],
                  })
                : (0, W.jsxs)(W.Fragment, {
                    children: [
                      (0, W.jsx)(w, { className: `h-4 w-4 mr-2` }),
                      ` Tạo Quiz`,
                    ],
                  }),
            }),
          ],
        }),
      })
    : (0, W.jsxs)(`div`, {
        className: `space-y-5`,
        children: [
          (0, W.jsxs)(`div`, {
            className: `flex items-center justify-between`,
            children: [
              (0, W.jsxs)(`div`, {
                children: [
                  (0, W.jsxs)(`h2`, {
                    className: `text-xl font-bold flex items-center gap-2 text-gradient-brand font-display`,
                    children: [
                      (0, W.jsx)(w, { className: `h-5 w-5` }),
                      ` AI Quizzes`,
                    ],
                  }),
                  (0, W.jsxs)(`p`, {
                    className: `text-xs text-muted-foreground mt-1`,
                    children: [
                      i === `all` ? `Toàn bộ thư mục` : `Từ "${n}"`,
                      ` · `,
                      _.length,
                      ` câu`,
                    ],
                  }),
                ],
              }),
              O &&
                (0, W.jsxs)(`div`, {
                  className: `text-sm font-semibold`,
                  children: [
                    `Điểm: `,
                    (0, W.jsxs)(`span`, {
                      className: `text-gradient-brand`,
                      children: [N, ` / `, _.length],
                    }),
                  ],
                }),
            ],
          }),
          (0, W.jsx)(`div`, {
            className: `space-y-4`,
            children: _.map((e, t) => {
              let n = e.type === `multiple_answer`;
              return (0, W.jsxs)(
                `div`,
                {
                  className: `rounded-lg border border-border p-4`,
                  children: [
                    (0, W.jsxs)(`div`, {
                      className: `font-medium text-sm mb-1`,
                      children: [`Câu `, t + 1, `. `, e.question],
                    }),
                    (0, W.jsx)(`div`, {
                      className: `text-[11px] text-muted-foreground mb-3`,
                      children: G[e.type],
                    }),
                    (0, W.jsx)(`div`, {
                      className: `space-y-2`,
                      children: e.options.map((r, i) => {
                        let a = (y[t] ?? []).includes(i),
                          o = e.correctAnswers.includes(i),
                          s = O && o,
                          c = O && a && !o;
                        return (0, W.jsxs)(
                          `button`,
                          {
                            disabled: O,
                            onClick: () => P(t, i, n),
                            className: E(
                              `w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors`,
                              s && `border-emerald-400 bg-emerald-50/60`,
                              c && `border-red-400 bg-red-50/60`,
                              !O && a && `border-primary bg-brand-soft/60`,
                              !O && !a && `border-border hover:bg-accent`,
                            ),
                            children: [
                              (0, W.jsx)(`span`, {
                                className: E(
                                  `h-5 w-5 flex items-center justify-center text-[10px] font-bold shrink-0 border`,
                                  n ? `rounded` : `rounded-full`,
                                  s &&
                                    `bg-emerald-500 text-white border-emerald-500`,
                                  c && `bg-red-500 text-white border-red-500`,
                                  !O &&
                                    a &&
                                    `bg-gradient-brand text-white border-transparent`,
                                ),
                                children: s
                                  ? (0, W.jsx)(l, { className: `h-3 w-3` })
                                  : c
                                    ? (0, W.jsx)(T, { className: `h-3 w-3` })
                                    : String.fromCharCode(65 + i),
                              }),
                              (0, W.jsx)(`span`, { children: r }),
                            ],
                          },
                          i,
                        );
                      }),
                    }),
                  ],
                },
                t,
              );
            }),
          }),
          (0, W.jsxs)(`div`, {
            className: `flex justify-between gap-2`,
            children: [
              (0, W.jsx)(D, {
                variant: `ghost`,
                onClick: () => m(`setup`),
                children: `← Tùy chọn`,
              }),
              O
                ? (0, W.jsxs)(D, {
                    variant: `outline`,
                    onClick: () => {
                      (x({}), k(!1));
                    },
                    children: [
                      (0, W.jsx)(b, { className: `h-4 w-4 mr-2` }),
                      ` Làm lại`,
                    ],
                  })
                : (0, W.jsx)(D, {
                    onClick: () => {
                      if (Object.keys(y).length < _.length) {
                        a.error(`Vui lòng trả lời tất cả câu hỏi`);
                        return;
                      }
                      k(!0);
                    },
                    children: `Nộp bài`,
                  }),
            ],
          }),
        ],
      });
}
function q(e) {
  return `ai-study-hub:flashcard-progress:${e}`;
}
function J(e) {
  try {
    let t = window.localStorage.getItem(q(e));
    return t ? JSON.parse(t) : {};
  } catch {
    return {};
  }
}
function Y(e, t) {
  try {
    window.localStorage.setItem(q(e), JSON.stringify(t));
  } catch {}
}
function X(e) {
  let t = [...e];
  for (let e = t.length - 1; e > 0; e--) {
    let n = Math.floor(Math.random() * (e + 1));
    [t[e], t[n]] = [t[n], t[e]];
  }
  return t;
}
var Z = {
  all: `Tất cả`,
  new: `Mới`,
  learning: `Đang học`,
  mastered: `Đã thuộc`,
};
function Q({ documentId: e, title: t }) {
  let { data: n, isLoading: r } = P(e),
    i = j(),
    a = F(),
    [o, s] = (0, U.useState)([]),
    [c, _] = (0, U.useState)(0),
    [v, y] = (0, U.useState)(!1),
    [x, S] = (0, U.useState)(`all`),
    [T, O] = (0, U.useState)({}),
    k = n ?? [];
  ((0, U.useEffect)(() => {
    e && (O(J(e)), S(`all`), y(!1));
  }, [e]),
    (0, U.useEffect)(() => {
      (s(
        k
          .map((e, t) => t)
          .filter((e) => x === `all` || (T[k[e].id] ?? `new`) === x),
      ),
        _(0),
        y(!1));
    }, [k.length, x, e]));
  let A = o.length > 0 ? k[o[c]] : void 0,
    M = A ? (T[A.id] ?? `new`) : `new`,
    N = (0, U.useMemo)(() => {
      let e = { all: k.length, new: 0, learning: 0, mastered: 0 };
      return (
        k.forEach((t) => {
          let n = T[t.id] ?? `new`;
          e[n]++;
        }),
        e
      );
    }, [k, T]),
    I = () => {
      o.length !== 0 && (y(!1), _((e) => (e + 1) % o.length));
    },
    L = () => {
      o.length !== 0 && (y(!1), _((e) => (e - 1 + o.length) % o.length));
    },
    R = () => {
      (s((e) => X(e)), _(0), y(!1));
    },
    z = (t) => {
      if (!A) return;
      let n = { ...T, [A.id]: t };
      (O(n),
        Y(e, n),
        a.mutate({ flashcardId: A.id, status: t, documentId: e }));
    };
  return (
    (0, U.useEffect)(() => {
      let e = (e) => {
        let t = e.target?.tagName;
        t === `INPUT` ||
          t === `TEXTAREA` ||
          (e.key === `ArrowRight`
            ? I()
            : e.key === `ArrowLeft`
              ? L()
              : (e.key === ` ` || e.key === `Enter`) &&
                (e.preventDefault(), y((e) => !e)));
      };
      return (
        window.addEventListener(`keydown`, e),
        () => window.removeEventListener(`keydown`, e)
      );
    }, [o.length]),
    e
      ? r
        ? (0, W.jsx)(`div`, {
            className: `flex items-center justify-center h-64`,
            children: (0, W.jsx)(C, {
              className: `h-8 w-8 animate-spin text-primary`,
            }),
          })
        : k.length === 0
          ? (0, W.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center h-64 gap-3 text-center`,
              children: [
                (0, W.jsx)(w, { className: `h-8 w-8 text-primary/60` }),
                (0, W.jsxs)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: [`Chưa có flashcards cho tài liệu "`, t, `".`],
                }),
                (0, W.jsxs)(D, {
                  size: `sm`,
                  onClick: () => i.mutate(e),
                  disabled: i.isPending,
                  className: `bg-gradient-brand text-white`,
                  children: [
                    i.isPending
                      ? (0, W.jsx)(C, {
                          className: `h-4 w-4 mr-2 animate-spin`,
                        })
                      : (0, W.jsx)(w, { className: `h-4 w-4 mr-2` }),
                    `Tạo Flashcards bằng AI`,
                  ],
                }),
              ],
            })
          : (0, W.jsxs)(`div`, {
              className: `space-y-5`,
              children: [
                (0, W.jsxs)(`div`, {
                  className: `flex items-center justify-between gap-3 flex-wrap`,
                  children: [
                    (0, W.jsxs)(`div`, {
                      children: [
                        (0, W.jsxs)(`h2`, {
                          className: `text-xl font-bold flex items-center gap-2 text-gradient-brand font-display`,
                          children: [
                            (0, W.jsx)(w, { className: `h-5 w-5` }),
                            ` AI Flashcards`,
                          ],
                        }),
                        (0, W.jsxs)(`p`, {
                          className: `text-xs text-muted-foreground mt-1`,
                          children: [
                            `Thẻ ghi nhớ từ "`,
                            t,
                            `" — bấm vào thẻ để lật mặt, dùng ← → để chuyển thẻ`,
                          ],
                        }),
                      ],
                    }),
                    (0, W.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, W.jsx)(B, {
                          className: `h-3.5 w-3.5 text-muted-foreground`,
                        }),
                        (0, W.jsxs)(m, {
                          value: x,
                          onValueChange: (e) => S(e),
                          children: [
                            (0, W.jsx)(d, {
                              className: `h-8 w-[150px] text-xs`,
                              children: (0, W.jsx)(u, {}),
                            }),
                            (0, W.jsx)(f, {
                              children: Object.keys(Z).map((e) =>
                                (0, W.jsxs)(
                                  p,
                                  {
                                    value: e,
                                    className: `text-xs`,
                                    children: [Z[e], ` (`, N[e], `)`],
                                  },
                                  e,
                                ),
                              ),
                            }),
                          ],
                        }),
                        (0, W.jsx)(D, {
                          size: `sm`,
                          variant: `outline`,
                          onClick: R,
                          disabled: o.length < 2,
                          title: `Xáo trộn thẻ`,
                          children: (0, W.jsx)(H, { className: `h-3.5 w-3.5` }),
                        }),
                        (0, W.jsx)(D, {
                          size: `sm`,
                          variant: `outline`,
                          onClick: () => i.mutate(e),
                          disabled: i.isPending,
                          title: `Tạo thêm flashcards bằng AI`,
                          children: i.isPending
                            ? (0, W.jsx)(C, {
                                className: `h-3.5 w-3.5 animate-spin`,
                              })
                            : (0, W.jsx)(b, { className: `h-3.5 w-3.5` }),
                        }),
                      ],
                    }),
                  ],
                }),
                A
                  ? (0, W.jsxs)(W.Fragment, {
                      children: [
                        (0, W.jsxs)(`div`, {
                          className: `text-xs text-muted-foreground text-right`,
                          children: [c + 1, ` / `, o.length],
                        }),
                        (0, W.jsxs)(`button`, {
                          onClick: () => y((e) => !e),
                          className: `w-full min-h-[220px] rounded-xl border-2 border-primary/20 bg-gradient-soft p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md [perspective:1000px]`,
                          children: [
                            (0, W.jsxs)(`div`, {
                              className: `text-[11px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2`,
                              children: [
                                v ? `Định nghĩa` : `Thuật ngữ`,
                                (0, W.jsx)(`span`, {
                                  className: E(
                                    `px-1.5 py-0.5 rounded-full text-[9px] font-medium`,
                                    M === `mastered` &&
                                      `bg-emerald-500/15 text-emerald-600`,
                                    M === `learning` &&
                                      `bg-amber-500/15 text-amber-600`,
                                    M === `new` &&
                                      `bg-muted text-muted-foreground`,
                                  ),
                                  children: Z[M],
                                }),
                              ],
                            }),
                            (0, W.jsx)(`div`, {
                              className: E(
                                `font-semibold`,
                                v ? `text-base leading-relaxed` : `text-2xl`,
                              ),
                              children: v ? A.backContent : A.frontContent,
                            }),
                            (0, W.jsx)(`div`, {
                              className: `text-xs text-muted-foreground mt-4`,
                              children: `Bấm để lật thẻ`,
                            }),
                          ],
                        }),
                        (0, W.jsxs)(`div`, {
                          className: `flex items-center justify-between flex-wrap gap-3`,
                          children: [
                            (0, W.jsxs)(D, {
                              variant: `outline`,
                              size: `sm`,
                              onClick: L,
                              disabled: o.length < 2,
                              children: [
                                (0, W.jsx)(h, { className: `h-4 w-4 mr-1` }),
                                ` Trước`,
                              ],
                            }),
                            (0, W.jsxs)(`div`, {
                              className: `flex items-center gap-1.5`,
                              children: [
                                (0, W.jsx)(D, {
                                  size: `sm`,
                                  variant:
                                    M === `learning` ? `default` : `outline`,
                                  onClick: () => z(`learning`),
                                  className: `text-xs h-8`,
                                  children: `Đang học`,
                                }),
                                (0, W.jsxs)(D, {
                                  size: `sm`,
                                  variant:
                                    M === `mastered` ? `default` : `outline`,
                                  onClick: () => z(`mastered`),
                                  className: E(
                                    `text-xs h-8`,
                                    M === `mastered` &&
                                      `bg-emerald-600 hover:bg-emerald-600/90`,
                                  ),
                                  children: [
                                    (0, W.jsx)(l, {
                                      className: `h-3.5 w-3.5 mr-1`,
                                    }),
                                    ` Đã thuộc`,
                                  ],
                                }),
                              ],
                            }),
                            (0, W.jsxs)(D, {
                              size: `sm`,
                              onClick: I,
                              disabled: o.length < 2,
                              children: [
                                `Tiếp `,
                                (0, W.jsx)(g, { className: `h-4 w-4 ml-1` }),
                              ],
                            }),
                          ],
                        }),
                        (0, W.jsx)(`div`, {
                          className: `flex gap-1 justify-center flex-wrap`,
                          children: o.map((e, t) =>
                            (0, W.jsx)(
                              `button`,
                              {
                                onClick: () => {
                                  (_(t), y(!1));
                                },
                                className: E(
                                  `h-1.5 rounded-full transition-all`,
                                  t === c
                                    ? `w-6 bg-gradient-brand`
                                    : `w-1.5 bg-muted hover:bg-muted-foreground/40`,
                                ),
                              },
                              k[e].id,
                            ),
                          ),
                        }),
                      ],
                    })
                  : (0, W.jsxs)(`div`, {
                      className: `flex flex-col items-center justify-center h-48 gap-2 text-center text-sm text-muted-foreground`,
                      children: [
                        `Không có thẻ nào khớp với bộ lọc "`,
                        Z[x],
                        `".`,
                      ],
                    }),
              ],
            })
      : (0, W.jsx)(`div`, {
          className: `text-sm text-muted-foreground text-center mt-16`,
          children: `Chọn một tài liệu để xem flashcards.`,
        })
  );
}
function ee(e) {
  return e
    ? e < 1024
      ? `${e} B`
      : e < 1024 ** 2
        ? `${(e / 1024).toFixed(0)} KB`
        : e < 1024 ** 3
          ? `${(e / 1024 ** 2).toFixed(0)} MB`
          : `${(e / 1024 ** 3).toFixed(2)} GB`
    : `0 MB`;
}
function $(e) {
  let t = (e.title ?? ``).toLowerCase();
  return t.endsWith(`.pdf`) || e.mimeType?.includes(`pdf`)
    ? { icon: `text-red-500`, soft: `bg-red-50` }
    : t.endsWith(`.doc`) || t.endsWith(`.docx`) || e.mimeType?.includes(`word`)
      ? { icon: `text-blue-500`, soft: `bg-blue-50` }
      : { icon: `text-primary`, soft: `bg-muted` };
}
function te({ folderId: e, docId: t }) {
  let n = A(e),
    o = M(e),
    s = k(t ?? 0),
    c = N(),
    l = i(),
    [u, d] = (0, U.useState)([]),
    [f, p] = (0, U.useState)(``),
    [m, b] = (0, U.useState)(`content`),
    T = (0, U.useRef)(null),
    j = (0, U.useRef)(null),
    { isMarked: P } = I(),
    F = [...(o.data ?? [])].sort((e, t) => Number(P(t.id)) - Number(P(e.id))),
    R = F.reduce((e, t) => e + (t.fileSize ?? 0), 0);
  ((0, U.useEffect)(() => {
    d([]);
  }, [t]),
    (0, U.useEffect)(() => {
      T.current?.scrollTo({ top: T.current.scrollHeight, behavior: `smooth` });
    }, [u, c.isPending]),
    (0, U.useEffect)(() => {
      j.current?.focus();
    }, [t]));
  let B = async () => {
    if (!f.trim()) return;
    if (!t) {
      a.info(`Chọn một tài liệu để bắt đầu trò chuyện`);
      return;
    }
    let e = f.trim();
    (p(``), d((t) => [...t, { role: `user`, content: e }]));
    try {
      let n = await c.mutateAsync({ id: t, question: e });
      d((e) => [...e, { role: `assistant`, content: n.answer }]);
    } catch (e) {
      a.error(e instanceof Error ? e.message : `Đã xảy ra lỗi`);
    } finally {
      j.current?.focus();
    }
  };
  return (0, W.jsxs)(`div`, {
    className: `grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_360px] gap-4 h-[calc(100vh-9rem)] w-full`,
    children: [
      (0, W.jsxs)(`aside`, {
        className: `hidden lg:flex flex-col h-full bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft`,
        children: [
          (0, W.jsx)(`div`, {
            className: `text-[10px] font-semibold tracking-wider text-muted-foreground mb-2`,
            children: `THƯ MỤC ĐANG DÙNG`,
          }),
          (0, W.jsxs)(`div`, {
            className: `rounded-xl bg-gradient-soft p-3 border border-border/50 flex items-center gap-3`,
            children: [
              (0, W.jsx)(`div`, {
                className: `h-9 w-9 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0`,
                children: (0, W.jsx)(z, {
                  className: `h-4.5 w-4.5 text-white`,
                }),
              }),
              (0, W.jsxs)(`div`, {
                className: `min-w-0 flex-1`,
                children: [
                  (0, W.jsx)(`div`, {
                    className: `text-sm font-semibold font-display truncate`,
                    children: n.data?.name ?? `—`,
                  }),
                  (0, W.jsxs)(`div`, {
                    className: `text-[11px] text-muted-foreground`,
                    children: [ee(R), ` · `, F.length, ` tài liệu`],
                  }),
                ],
              }),
              (0, W.jsx)(r, {
                to: `/folders`,
                className: `h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0`,
                title: `Quản lý thư mục`,
                children: (0, W.jsx)(z, { className: `h-4 w-4` }),
              }),
            ],
          }),
          (0, W.jsx)(`div`, {
            className: `text-[10px] font-semibold tracking-wider text-muted-foreground mt-5 mb-2`,
            children: `TÀI LIỆU ĐANG CÓ`,
          }),
          (0, W.jsxs)(`div`, {
            className: `space-y-1 overflow-y-auto flex-1 -mx-1 px-1`,
            children: [
              o.isLoading &&
                Array.from({ length: 4 }).map((e, t) =>
                  (0, W.jsx)(L, { className: `h-10 rounded-lg` }, t),
                ),
              F.map((n) => {
                let i = n.id === t,
                  a = $(n);
                return (0, W.jsxs)(
                  `div`,
                  {
                    className: E(
                      `group flex items-center gap-2 rounded-lg pl-2 pr-1 py-2 transition-colors`,
                      i
                        ? `bg-red-50 border-l-2 border-red-400`
                        : `hover:bg-accent border-l-2 border-transparent`,
                    ),
                    children: [
                      (0, W.jsxs)(r, {
                        to: `/ai`,
                        search: { folderId: e, docId: n.id },
                        className: `flex items-center gap-2 min-w-0 flex-1`,
                        children: [
                          (0, W.jsx)(S, {
                            className: E(`h-4 w-4 shrink-0`, a.icon),
                          }),
                          (0, W.jsx)(`span`, {
                            className: E(
                              `truncate text-sm`,
                              i
                                ? `font-medium text-foreground`
                                : `text-foreground/90`,
                            ),
                            children: n.title,
                          }),
                          P(n.id) &&
                            (0, W.jsx)(_, {
                              className: `h-3 w-3 shrink-0 fill-amber-400 text-amber-500`,
                            }),
                        ],
                      }),
                      (0, W.jsx)(v, {
                        documentId: n.id,
                        folderId: e,
                        title: n.title,
                        className: `h-6 w-6 rounded-md hover:bg-background flex items-center justify-center text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100`,
                        iconClassName: `h-3.5 w-3.5`,
                      }),
                    ],
                  },
                  n.id,
                );
              }),
              !o.isLoading &&
                F.length === 0 &&
                (0, W.jsx)(`div`, {
                  className: `text-xs text-muted-foreground px-2`,
                  children: `Chưa có tài liệu`,
                }),
            ],
          }),
          (0, W.jsxs)(r, {
            to: `/folders`,
            className: `mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white text-sm font-medium py-2.5 shadow-brand hover:opacity-90 transition-opacity`,
            children: [(0, W.jsx)(h, { className: `h-4 w-4` }), ` Quay về`],
          }),
        ],
      }),
      (0, W.jsxs)(`section`, {
        className: `h-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft`,
        children: [
          (0, W.jsx)(`div`, {
            className: `px-4 pt-3 border-b border-border`,
            children: (0, W.jsxs)(`div`, {
              className: `flex items-center gap-6 overflow-x-auto`,
              children: [
                (0, W.jsx)(`button`, {
                  onClick: () => b(`content`),
                  className: E(
                    `pb-3 text-sm font-medium border-b-2 whitespace-nowrap`,
                    m === `content`
                      ? `border-primary text-primary`
                      : `border-transparent text-muted-foreground hover:text-foreground`,
                  ),
                  children: `Original Content`,
                }),
                (0, W.jsx)(`button`, {
                  onClick: () => b(`summary`),
                  className: E(
                    `pb-3 text-sm font-medium border-b-2 whitespace-nowrap`,
                    m === `summary`
                      ? `border-primary text-primary`
                      : `border-transparent text-muted-foreground hover:text-foreground`,
                  ),
                  children: `AI Summary`,
                }),
                (0, W.jsx)(`button`, {
                  onClick: () => b(`flashcards`),
                  className: E(
                    `pb-3 text-sm font-medium border-b-2 whitespace-nowrap`,
                    m === `flashcards`
                      ? `border-primary text-primary`
                      : `border-transparent text-muted-foreground hover:text-foreground`,
                  ),
                  children: `AI Flashcards`,
                }),
                (0, W.jsx)(`button`, {
                  onClick: () => b(`quizzes`),
                  className: E(
                    `pb-3 text-sm font-medium border-b-2 whitespace-nowrap`,
                    m === `quizzes`
                      ? `border-primary text-primary`
                      : `border-transparent text-muted-foreground hover:text-foreground`,
                  ),
                  children: `AI Quizzes`,
                }),
              ],
            }),
          }),
          (0, W.jsxs)(`div`, {
            className: `flex gap-2 px-4 py-2.5 border-b border-border overflow-x-auto items-center`,
            children: [
              (0, W.jsx)(`button`, {
                onClick: () => l({ to: `/ai`, search: { folderId: e } }),
                className: E(
                  `px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0`,
                  t
                    ? `bg-muted text-foreground hover:bg-accent`
                    : `bg-gradient-brand text-white`,
                ),
                children: `All`,
              }),
              F.map((n) =>
                (0, W.jsx)(
                  r,
                  {
                    to: `/ai`,
                    search: { folderId: e, docId: n.id },
                    className: E(
                      `px-3.5 py-1 text-xs rounded-full font-medium whitespace-nowrap transition-colors shrink-0`,
                      n.id === t
                        ? `bg-gradient-brand text-white`
                        : `bg-brand-soft text-primary hover:bg-accent`,
                    ),
                    children: n.title,
                  },
                  n.id,
                ),
              ),
              F.length > 3 &&
                (0, W.jsx)(`span`, {
                  className: `h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0`,
                  children: (0, W.jsx)(g, { className: `h-4 w-4` }),
                }),
            ],
          }),
          m === `content` &&
            (0, W.jsx)(`div`, {
              className: `flex-1 overflow-y-auto`,
              children:
                t && s.data?.status === `ready`
                  ? (0, W.jsx)(x, { document: s.data })
                  : s.data?.status === `processing`
                    ? (0, W.jsx)(`div`, {
                        className: `flex items-center justify-center h-full`,
                        children: (0, W.jsxs)(`div`, {
                          className: `flex flex-col items-center gap-2 p-8`,
                          children: [
                            (0, W.jsx)(C, {
                              className: `h-8 w-8 animate-spin text-primary`,
                            }),
                            (0, W.jsx)(`p`, {
                              className: `text-sm text-muted-foreground`,
                              children: `Đang xử lý tài liệu...`,
                            }),
                          ],
                        }),
                      })
                    : s.data?.status === `failed`
                      ? (0, W.jsx)(`div`, {
                          className: `flex items-center justify-center h-full p-8`,
                          children: (0, W.jsx)(`p`, {
                            className: `text-red-500 text-center`,
                            children: `Tài liệu đã xảy ra lỗi khi xử lý`,
                          }),
                        })
                      : t && !s.data
                        ? (0, W.jsx)(`div`, {
                            className: `flex items-center justify-center h-full p-8`,
                            children: (0, W.jsx)(C, {
                              className: `h-8 w-8 animate-spin text-primary`,
                            }),
                          })
                        : (0, W.jsxs)(`div`, {
                            className: `grid grid-cols-2 sm:grid-cols-3 gap-4 p-5`,
                            children: [
                              o.isLoading &&
                                Array.from({ length: 6 }).map((e, t) =>
                                  (0, W.jsx)(
                                    L,
                                    { className: `h-40 rounded-xl` },
                                    t,
                                  ),
                                ),
                              F.map((n) => {
                                let i = n.id === t,
                                  a = $(n);
                                return (0, W.jsx)(
                                  `div`,
                                  {
                                    className: E(
                                      `group relative flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5`,
                                      i &&
                                        `border-primary ring-2 ring-primary/20 shadow-soft`,
                                    ),
                                    children: (0, W.jsxs)(r, {
                                      to: `/ai`,
                                      search: { folderId: e, docId: n.id },
                                      className: `flex flex-col items-center w-full`,
                                      children: [
                                        (0, W.jsx)(`div`, {
                                          className: `flex-1 flex items-center justify-center w-full py-4`,
                                          children: (0, W.jsx)(`div`, {
                                            className: E(
                                              `h-16 w-16 rounded-xl flex items-center justify-center`,
                                              a.soft,
                                            ),
                                            children: (0, W.jsx)(S, {
                                              className: E(`h-8 w-8`, a.icon),
                                            }),
                                          }),
                                        }),
                                        (0, W.jsx)(`div`, {
                                          className: `text-xs font-medium text-primary truncate w-full`,
                                          children: n.title,
                                        }),
                                      ],
                                    }),
                                  },
                                  n.id,
                                );
                              }),
                              !o.isLoading &&
                                F.length === 0 &&
                                (0, W.jsx)(`div`, {
                                  className: `col-span-full text-sm text-muted-foreground text-center py-10`,
                                  children: `Chưa có tài liệu trong thư mục này.`,
                                }),
                            ],
                          }),
            }),
          ` `,
          m === `summary` &&
            (0, W.jsx)(`div`, {
              className: `flex-1 overflow-y-auto p-6`,
              children: t
                ? s.data?.summary
                  ? (0, W.jsx)(`div`, {
                      className: `prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed`,
                      children: s.data.summary,
                    })
                  : (0, W.jsx)(`div`, {
                      className: `text-sm text-muted-foreground text-center mt-16`,
                      children: `Tài liệu này chưa có tóm tắt AI.`,
                    })
                : (0, W.jsx)(`div`, {
                    className: `text-sm text-muted-foreground text-center mt-16`,
                    children: `Chọn một tài liệu để xem tóm tắt AI.`,
                  }),
            }),
          m === `flashcards` &&
            (0, W.jsx)(`div`, {
              className: `flex-1 overflow-y-auto p-6`,
              children: (0, W.jsx)(Q, {
                documentId: t ?? 0,
                title: s.data?.title ?? `tài liệu`,
              }),
            }),
          m === `quizzes` &&
            (0, W.jsx)(`div`, {
              className: `flex-1 overflow-y-auto p-6`,
              children: (0, W.jsx)(K, {
                folderId: e,
                docId: t,
                title: s.data?.title ?? `tài liệu`,
              }),
            }),
        ],
      }),
      (0, W.jsxs)(`aside`, {
        className: `h-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft`,
        children: [
          (0, W.jsx)(`div`, {
            className: `px-4 py-3.5 border-b border-border text-center`,
            children: (0, W.jsx)(`div`, {
              className: `text-sm font-semibold font-display truncate`,
              children: s.data?.title ?? `Chưa chọn tài liệu`,
            }),
          }),
          (0, W.jsxs)(`div`, {
            ref: T,
            className: `flex-1 overflow-y-auto p-4 space-y-3`,
            children: [
              u.length === 0
                ? (0, W.jsxs)(`div`, {
                    className: `flex flex-col items-center justify-center h-full text-center px-4 py-8`,
                    children: [
                      (0, W.jsx)(`div`, {
                        className: `h-14 w-14 rounded-2xl bg-gradient-soft flex items-center justify-center mb-3`,
                        children: (0, W.jsx)(w, {
                          className: `h-7 w-7 text-primary`,
                        }),
                      }),
                      (0, W.jsx)(`div`, {
                        className: `text-base font-semibold font-display`,
                        children: `Trò chuyện với AI`,
                      }),
                      (0, W.jsx)(`div`, {
                        className: `text-sm text-muted-foreground mt-1 max-w-sm`,
                        children: t
                          ? `Hỏi AI để tóm tắt, giải thích hoặc kiểm tra kiến thức từ tài liệu này.`
                          : `Chọn một tài liệu để bắt đầu trò chuyện.`,
                      }),
                    ],
                  })
                : u.map((e, t) =>
                    (0, W.jsx)(
                      `div`,
                      {
                        className: E(
                          `text-sm rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed whitespace-pre-wrap`,
                          e.role === `user`
                            ? `bg-gradient-brand text-white ml-auto rounded-br-md shadow-soft`
                            : `bg-muted text-foreground rounded-bl-md`,
                        ),
                        children: e.content,
                      },
                      t,
                    ),
                  ),
              c.isPending &&
                (0, W.jsxs)(`div`, {
                  className: `text-sm bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%] inline-flex items-center gap-1.5`,
                  children: [
                    (0, W.jsx)(`span`, {
                      className: `h-1.5 w-1.5 rounded-full bg-primary animate-pulse`,
                    }),
                    (0, W.jsx)(`span`, {
                      className: `h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:200ms]`,
                    }),
                    (0, W.jsx)(`span`, {
                      className: `h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]`,
                    }),
                  ],
                }),
            ],
          }),
          (0, W.jsxs)(`form`, {
            onSubmit: (e) => {
              (e.preventDefault(), B());
            },
            className: `p-3 border-t border-border flex gap-2`,
            children: [
              (0, W.jsx)(O, {
                ref: j,
                value: f,
                onChange: (e) => p(e.target.value),
                placeholder: `Nhập câu hỏi của bạn….`,
                className: `text-sm rounded-xl bg-muted/40 border-transparent focus-visible:bg-card focus-visible:border-input`,
                disabled: !t,
              }),
              (0, W.jsx)(D, {
                type: `submit`,
                size: `icon`,
                disabled: c.isPending || !f.trim() || !t,
                className: `bg-gradient-brand hover:opacity-90 rounded-xl shrink-0`,
                children: (0, W.jsx)(y, { className: `h-4 w-4` }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function ne() {
  let { folderId: e, docId: t } = s.useSearch();
  return (0, W.jsx)(te, { folderId: e, docId: t });
}
export { ne as component };
