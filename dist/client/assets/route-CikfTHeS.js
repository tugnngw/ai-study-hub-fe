import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./link-BbWDPsL2.js";
import { a as i, i as a, n as o, r as s, t as c } from "./user-BAkkjJ-f.js";
import { F as l, I as u, c as d, u as f } from "./index-CDVqwL1-.js";
import { t as p } from "./createLucideIcon-p5NglK5C.js";
import { t as m } from "./cloud-D71LB-BK.js";
import { t as h } from "./crown-DLbHGLoN.js";
import { n as g, t as _ } from "./progress-Dz2lWXX1.js";
import { t as v } from "./file-text-CjI-82n2.js";
import { t as y } from "./folder-kanban-GiHqoFzz.js";
import { t as b } from "./loader-circle-gML4jCQ4.js";
import { t as x } from "./log-out-C3IGTZkL.js";
import { t as S } from "./receipt-CqiIr0dI.js";
import { t as C } from "./search-C2LZVwX8.js";
import { t as w } from "./sparkles-BqvYif3p.js";
import { t as T } from "./trash-2-CVEVc4it.js";
import { t as E } from "./users-Mob6jRmB.js";
import { t as D } from "./utils-BUTip_f_.js";
import { t as O } from "./input-CDAzVnuz.js";
import { a as k, o as A } from "./queries-DL6sGd2E.js";
import {
  a as j,
  i as M,
  n as N,
  o as P,
  r as F,
  t as I,
} from "./dropdown-menu-g7D8ZjbS.js";
var L = p(`moon`, [
    [
      `path`,
      {
        d: `M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,
        key: `kfwtm`,
      },
    ],
  ]),
  R = p(`settings`, [
    [
      `path`,
      {
        d: `M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`,
        key: `1i5ecw`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `3`, key: `1v7zrd` }],
  ]),
  z = p(`sun`, [
    [`circle`, { cx: `12`, cy: `12`, r: `4`, key: `4exip2` }],
    [`path`, { d: `M12 2v2`, key: `tus03m` }],
    [`path`, { d: `M12 20v2`, key: `1lh1kg` }],
    [`path`, { d: `m4.93 4.93 1.41 1.41`, key: `149t6j` }],
    [`path`, { d: `m17.66 17.66 1.41 1.41`, key: `ptbguv` }],
    [`path`, { d: `M2 12h2`, key: `1t8f8n` }],
    [`path`, { d: `M20 12h2`, key: `1q8mjw` }],
    [`path`, { d: `m6.34 17.66-1.41 1.41`, key: `1m8zz5` }],
    [`path`, { d: `m19.07 4.93-1.41 1.41`, key: `1shlcs` }],
  ]),
  B = e(t()),
  V = n(),
  H = [
    { to: `/dashboard`, label: `Dashboard`, icon: a },
    { to: `/folders`, label: `Thư mục`, icon: y },
    { to: `/documents`, label: `Tài liệu`, icon: v },
    { to: `/shared`, label: `Được chia sẻ`, icon: E },
    { to: `/trash`, label: `Thùng rác`, icon: T },
    { to: `/cloud`, label: `Lưu trữ Cloud`, icon: m },
    { to: `/premium`, label: `Nâng cấp Premium`, icon: h },
    { to: `/transactions`, label: `Lịch sử giao dịch`, icon: S },
  ];
function U(e) {
  return e
    ? e < 1024
      ? `${e} B`
      : e < 1024 ** 2
        ? `${(e / 1024).toFixed(1)} KB`
        : e < 1024 ** 3
          ? `${(e / 1024 ** 2).toFixed(1)} MB`
          : `${(e / 1024 ** 3).toFixed(2)} GB`
    : `0 B`;
}
var W = `ai-study-hub:sidebar-collapsed`;
function G() {
  if (typeof window > `u`) return !1;
  try {
    return window.localStorage.getItem(W) === `1`;
  } catch {
    return !1;
  }
}
function K({ children: e }) {
  let { user: t, logout: n } = f(),
    a = u(),
    l = i({ select: (e) => e.location.pathname }),
    p = i({ select: (e) => e.location.search }),
    { data: m } = A(),
    [h, y] = (0, B.useState)(G),
    { theme: b, toggleTheme: S } = d(),
    T = (e) => {
      y(e);
      try {
        window.localStorage.setItem(W, e ? `1` : `0`);
      } catch {}
    },
    E = p?.docId ? Number(p.docId) : void 0,
    K = k(E && !isNaN(E) ? E : 0),
    q = m?.reduce((e, t) => e + (t.fileSize || 0), 0) || 0,
    J = 15 * 1024 * 1024 * 1024,
    Y = Math.min(100, (q / J) * 100),
    X = async () => {
      (await n(), a({ to: `/auth/login` }));
    },
    Z = t?.fullName?.[0]?.toUpperCase() ?? `U`,
    Q = l.startsWith(`/folders/`) || l.startsWith(`/documents/`);
  return (0, V.jsxs)(`div`, {
    className: `min-h-screen flex`,
    children: [
      (0, V.jsxs)(`aside`, {
        className: D(
          `hidden md:flex md:flex-col shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-all duration-300`,
          h ? `md:w-16` : `md:w-64`,
        ),
        children: [
          (0, V.jsxs)(`div`, {
            className: D(
              `px-5 py-5 border-b border-border flex items-center gap-2`,
              h ? `justify-center px-0` : ``,
            ),
            children: [
              (0, V.jsxs)(r, {
                to: `/dashboard`,
                className: `flex items-center gap-2.5 group min-w-0`,
                children: [
                  (0, V.jsx)(`div`, {
                    className: `h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0`,
                    children: (0, V.jsx)(w, {
                      className: `h-4.5 w-4.5 text-white`,
                      strokeWidth: 2.5,
                    }),
                  }),
                  !h &&
                    (0, V.jsxs)(`div`, {
                      className: `min-w-0`,
                      children: [
                        (0, V.jsx)(`div`, {
                          className: `font-display font-bold text-base leading-tight truncate`,
                          children: `AI Study Hub`,
                        }),
                        (0, V.jsx)(`div`, {
                          className: `text-[10px] text-muted-foreground tracking-wider uppercase`,
                          children: `Learn smarter`,
                        }),
                      ],
                    }),
                ],
              }),
              !h &&
                (0, V.jsx)(`button`, {
                  onClick: () => T(!0),
                  className: `p-1 hover:bg-accent rounded-lg ml-auto shrink-0`,
                  children: (0, V.jsx)(s, { className: `h-4 w-4` }),
                }),
              h &&
                (0, V.jsx)(`button`, {
                  onClick: () => T(!1),
                  className: `p-1 hover:bg-accent rounded-lg`,
                  children: (0, V.jsx)(o, { className: `h-4 w-4` }),
                }),
            ],
          }),
          (0, V.jsxs)(`nav`, {
            className: `flex-1 p-3 space-y-0.5 overflow-y-auto`,
            children: [
              !h &&
                (0, V.jsx)(`div`, {
                  className: `text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5`,
                  children: `WORKSPACE`,
                }),
              H.map((e) => {
                let t = l.startsWith(e.to);
                return (0, V.jsxs)(
                  r,
                  {
                    to: e.to,
                    className: D(
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative`,
                      h && `justify-center px-0`,
                      t
                        ? `bg-gradient-brand text-white shadow-brand font-medium`
                        : `text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground`,
                    ),
                    title: h ? e.label : void 0,
                    children: [
                      (0, V.jsx)(e.icon, {
                        className: D(`h-4 w-4 shrink-0`, t && `drop-shadow-sm`),
                        strokeWidth: t ? 2.5 : 2,
                      }),
                      !h &&
                        (0, V.jsx)(`span`, {
                          className: `truncate`,
                          children: e.label,
                        }),
                    ],
                  },
                  e.to,
                );
              }),
            ],
          }),
          !h &&
            (0, V.jsx)(`div`, {
              className: `p-3`,
              children: (0, V.jsxs)(`div`, {
                className: `rounded-xl border border-sidebar-border bg-card/60 p-3.5 space-y-2.5`,
                children: [
                  (0, V.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [
                      (0, V.jsx)(g, { className: `h-3.5 w-3.5 text-primary` }),
                      (0, V.jsx)(`span`, {
                        className: `text-xs font-semibold`,
                        children: `Dung lượng`,
                      }),
                    ],
                  }),
                  (0, V.jsx)(_, { value: Y, className: `h-1.5` }),
                  (0, V.jsxs)(`div`, {
                    className: `text-[11px] text-muted-foreground`,
                    children: [
                      (0, V.jsx)(`span`, {
                        className: `font-medium text-foreground`,
                        children: U(q),
                      }),
                      ` / `,
                      U(J),
                    ],
                  }),
                ],
              }),
            }),
        ],
      }),
      (0, V.jsxs)(`div`, {
        className: `flex-1 min-w-0 flex flex-col`,
        children: [
          (0, V.jsxs)(`header`, {
            className: `h-16 border-b border-border/60 bg-background/70 backdrop-blur-xl flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30`,
            children: [
              (0, V.jsx)(r, {
                to: `/dashboard`,
                className: `md:hidden flex items-center gap-2`,
                children: (0, V.jsx)(`div`, {
                  className: `h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center`,
                  children: (0, V.jsx)(w, { className: `h-4 w-4 text-white` }),
                }),
              }),
              (0, V.jsx)(`button`, {
                onClick: () => T(!h),
                className: `hidden md:flex p-1.5 hover:bg-accent rounded-lg`,
                title: h ? `Mở rộng sidebar` : `Thu gọn sidebar`,
                children: (0, V.jsx)(o, { className: `h-5 w-5` }),
              }),
              (0, V.jsx)(`div`, {
                className: `hidden sm:flex items-center gap-2 flex-1 max-w-md`,
                children:
                  Q && K.data
                    ? (0, V.jsxs)(`div`, {
                        className: `flex items-center gap-2 min-w-0 text-sm font-medium`,
                        children: [
                          (0, V.jsx)(v, {
                            className: `h-4 w-4 text-primary shrink-0`,
                          }),
                          (0, V.jsx)(`span`, {
                            className: `truncate`,
                            children: K.data.title,
                          }),
                        ],
                      })
                    : (0, V.jsxs)(`div`, {
                        className: `relative w-full`,
                        children: [
                          (0, V.jsx)(C, {
                            className: `h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground`,
                          }),
                          (0, V.jsx)(O, {
                            placeholder: `Tìm tài liệu, thư mục…`,
                            className: `pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input`,
                          }),
                        ],
                      }),
              }),
              (0, V.jsxs)(`div`, {
                className: `ml-auto flex items-center gap-2`,
                children: [
                  (0, V.jsx)(`button`, {
                    onClick: S,
                    className: `h-9 w-9 flex items-center justify-center hover:bg-accent rounded-full transition-colors`,
                    title:
                      b === `dark`
                        ? `Chuyển sang Light Mode`
                        : `Chuyển sang Dark Mode`,
                    children:
                      b === `dark`
                        ? (0, V.jsx)(z, { className: `h-4 w-4` })
                        : (0, V.jsx)(L, { className: `h-4 w-4` }),
                  }),
                  (0, V.jsxs)(I, {
                    children: [
                      (0, V.jsx)(P, {
                        asChild: !0,
                        children: (0, V.jsxs)(`button`, {
                          className: `flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors`,
                          children: [
                            (0, V.jsx)(`div`, {
                              className: `h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft`,
                              children: Z,
                            }),
                            (0, V.jsxs)(`div`, {
                              className: `hidden sm:flex flex-col items-start leading-tight`,
                              children: [
                                (0, V.jsx)(`span`, {
                                  className: `text-xs font-medium`,
                                  children: t?.fullName ?? `User`,
                                }),
                                (0, V.jsxs)(`span`, {
                                  className: `text-[10px] text-muted-foreground`,
                                  children: [`@`, t?.username ?? `user`],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, V.jsxs)(N, {
                        align: `end`,
                        className: `w-60`,
                        children: [
                          (0, V.jsx)(M, {
                            className: `pb-2`,
                            children: (0, V.jsxs)(`div`, {
                              className: `flex items-center gap-3`,
                              children: [
                                (0, V.jsx)(`div`, {
                                  className: `h-10 w-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-semibold`,
                                  children: Z,
                                }),
                                (0, V.jsxs)(`div`, {
                                  className: `min-w-0`,
                                  children: [
                                    (0, V.jsx)(`div`, {
                                      className: `font-semibold truncate`,
                                      children: t?.fullName,
                                    }),
                                    (0, V.jsx)(`div`, {
                                      className: `text-xs text-muted-foreground font-normal truncate`,
                                      children: t?.email,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          (0, V.jsx)(j, {}),
                          (0, V.jsx)(F, {
                            asChild: !0,
                            children: (0, V.jsxs)(r, {
                              to: `/profile`,
                              className: `cursor-pointer`,
                              children: [
                                (0, V.jsx)(c, { className: `h-4 w-4 mr-2` }),
                                ` Hồ sơ`,
                              ],
                            }),
                          }),
                          (0, V.jsx)(F, {
                            asChild: !0,
                            children: (0, V.jsxs)(r, {
                              to: `/admin`,
                              className: `cursor-pointer`,
                              children: [
                                (0, V.jsx)(R, { className: `h-4 w-4 mr-2` }),
                                ` Cài đặt`,
                              ],
                            }),
                          }),
                          (0, V.jsx)(j, {}),
                          (0, V.jsxs)(F, {
                            onClick: X,
                            className: `cursor-pointer text-destructive focus:text-destructive`,
                            children: [
                              (0, V.jsx)(x, { className: `h-4 w-4 mr-2` }),
                              ` Đăng xuất`,
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, V.jsx)(`div`, {
            className: `md:hidden border-b border-border bg-card/60 backdrop-blur-md`,
            children: (0, V.jsx)(`nav`, {
              className: `flex overflow-x-auto px-2 py-2 gap-1`,
              children: H.map((e) => {
                let t = l.startsWith(e.to);
                return (0, V.jsxs)(
                  r,
                  {
                    to: e.to,
                    className: D(
                      `flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap`,
                      t
                        ? `bg-gradient-brand text-white`
                        : `text-muted-foreground hover:bg-accent`,
                    ),
                    children: [
                      (0, V.jsx)(e.icon, { className: `h-3.5 w-3.5` }),
                      e.label,
                    ],
                  },
                  e.to,
                );
              }),
            }),
          }),
          (0, V.jsx)(`main`, {
            className: `flex-1 min-w-0`,
            children: Q
              ? e
              : (0, V.jsx)(`div`, {
                  className: `p-6 md:p-8 max-w-7xl mx-auto`,
                  children: e,
                }),
          }),
        ],
      }),
    ],
  });
}
function q() {
  let { isAuthenticated: e, isLoading: t, user: n } = f();
  return (
    (0, B.useEffect)(() => {
      !t && !e && (window.location.href = `/auth/login`);
    }, [e, t, n]),
    t
      ? (0, V.jsx)(`div`, {
          className: `min-h-screen flex items-center justify-center bg-background`,
          children: (0, V.jsxs)(`div`, {
            className: `flex flex-col items-center gap-4`,
            children: [
              (0, V.jsx)(b, {
                className: `h-12 w-12 animate-spin text-primary`,
              }),
              (0, V.jsx)(`p`, {
                className: `text-sm text-muted-foreground`,
                children: `Đang tải...`,
              }),
            ],
          }),
        })
      : e
        ? (0, V.jsx)(K, { children: (0, V.jsx)(l, {}) })
        : null
  );
}
export { q as component };
