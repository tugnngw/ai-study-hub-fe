import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./link-BbWDPsL2.js";
import { a as i, i as a, n as o, r as s, t as c } from "./user-BAkkjJ-f.js";
import { F as l, I as u, u as d } from "./index-CDVqwL1-.js";
import { t as f } from "./createLucideIcon-p5NglK5C.js";
import { t as p } from "./crown-DLbHGLoN.js";
import { t as m } from "./file-text-CjI-82n2.js";
import { t as h } from "./loader-circle-gML4jCQ4.js";
import { t as g } from "./log-out-C3IGTZkL.js";
import { t as _ } from "./search-C2LZVwX8.js";
import { t as v } from "./shield-check-VeX5LWKp.js";
import { t as y } from "./trash-2-CVEVc4it.js";
import { t as b } from "./users-Mob6jRmB.js";
import { t as x } from "./utils-BUTip_f_.js";
import { t as S } from "./input-CDAzVnuz.js";
import {
  a as C,
  i as w,
  n as T,
  o as E,
  r as D,
  t as O,
} from "./dropdown-menu-g7D8ZjbS.js";
var k = f(`clipboard-check`, [
    [
      `rect`,
      {
        width: `8`,
        height: `4`,
        x: `8`,
        y: `2`,
        rx: `1`,
        ry: `1`,
        key: `tgr4d6`,
      },
    ],
    [
      `path`,
      {
        d: `M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,
        key: `116196`,
      },
    ],
    [`path`, { d: `m9 14 2 2 4-4`, key: `df797q` }],
  ]),
  A = e(t(), 1),
  j = n(),
  M = [
    { to: `/admin_panel`, label: `Dashboard`, icon: a, exact: !0 },
    { to: `/admin_panel/users`, label: `Quản lý Users`, icon: b, exact: !1 },
    { to: `/admin_panel/files`, label: `Quản lý tài liệu`, icon: m, exact: !1 },
    { to: `/admin_panel/approvals`, label: `Phê duyệt`, icon: k, exact: !1 },
    { to: `/admin_panel/trash`, label: `Thùng rác`, icon: y, exact: !1 },
    { to: `/admin_panel/premium`, label: `Premium`, icon: p, exact: !1 },
    { to: `/admin_panel/profile`, label: `Hồ sơ`, icon: c, exact: !1 },
  ],
  N = (e, t, n) => (n ? e === t || e === `${t}/` : e.startsWith(t));
function P({ children: e }) {
  let { user: t, logout: n } = d(),
    a = u(),
    l = i({ select: (e) => e.location.pathname }),
    [f, p] = (0, A.useState)(!1),
    m = async () => {
      (await n(), a({ to: `/auth/login` }));
    },
    h = (t?.fullName?.[0] ?? `A`).toUpperCase();
  return (0, j.jsxs)(`div`, {
    className: `min-h-screen flex`,
    children: [
      (0, j.jsxs)(`aside`, {
        className: x(
          `hidden md:flex md:flex-col shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-all duration-300`,
          f ? `md:w-16` : `md:w-64`,
        ),
        children: [
          (0, j.jsxs)(`div`, {
            className: x(
              `px-5 py-5 border-b border-border flex items-center gap-2`,
              f ? `justify-center px-0` : ``,
            ),
            children: [
              (0, j.jsxs)(r, {
                to: `/admin_panel`,
                className: `flex items-center gap-2.5 group min-w-0`,
                children: [
                  (0, j.jsx)(`div`, {
                    className: `h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0`,
                    children: (0, j.jsx)(v, {
                      className: `h-4.5 w-4.5 text-white`,
                      strokeWidth: 2.5,
                    }),
                  }),
                  !f &&
                    (0, j.jsxs)(`div`, {
                      className: `min-w-0`,
                      children: [
                        (0, j.jsx)(`div`, {
                          className: `font-display font-bold text-base leading-tight truncate`,
                          children: `AI Study Hub`,
                        }),
                        (0, j.jsx)(`div`, {
                          className: `text-[10px] text-muted-foreground tracking-wider uppercase`,
                          children: `Quản trị`,
                        }),
                      ],
                    }),
                ],
              }),
              !f &&
                (0, j.jsx)(`button`, {
                  onClick: () => p(!0),
                  className: `p-1 hover:bg-accent rounded-lg ml-auto shrink-0`,
                  children: (0, j.jsx)(s, { className: `h-4 w-4` }),
                }),
              f &&
                (0, j.jsx)(`button`, {
                  onClick: () => p(!1),
                  className: `p-1 hover:bg-accent rounded-lg`,
                  children: (0, j.jsx)(o, { className: `h-4 w-4` }),
                }),
            ],
          }),
          (0, j.jsxs)(`nav`, {
            className: `flex-1 p-3 space-y-0.5 overflow-y-auto`,
            children: [
              !f &&
                (0, j.jsx)(`div`, {
                  className: `text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5`,
                  children: `QUẢN TRỊ HỆ THỐNG`,
                }),
              M.map((e) => {
                let t = N(l, e.to, e.exact);
                return (0, j.jsxs)(
                  r,
                  {
                    to: e.to,
                    className: x(
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative`,
                      f && `justify-center px-0`,
                      t
                        ? `bg-gradient-brand text-white shadow-brand font-medium`
                        : `text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground`,
                    ),
                    title: f ? e.label : void 0,
                    children: [
                      (0, j.jsx)(e.icon, {
                        className: x(`h-4 w-4 shrink-0`, t && `drop-shadow-sm`),
                        strokeWidth: t ? 2.5 : 2,
                      }),
                      !f &&
                        (0, j.jsx)(`span`, {
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
        ],
      }),
      (0, j.jsxs)(`div`, {
        className: `flex-1 min-w-0 flex flex-col`,
        children: [
          (0, j.jsxs)(`header`, {
            className: `h-16 border-b border-border/60 bg-background/70 backdrop-blur-xl flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30`,
            children: [
              (0, j.jsx)(r, {
                to: `/admin_panel`,
                className: `md:hidden flex items-center gap-2`,
                children: (0, j.jsx)(`div`, {
                  className: `h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center`,
                  children: (0, j.jsx)(v, { className: `h-4 w-4 text-white` }),
                }),
              }),
              (0, j.jsx)(`button`, {
                onClick: () => p(!f),
                className: `hidden md:flex p-1.5 hover:bg-accent rounded-lg`,
                children: (0, j.jsx)(o, { className: `h-5 w-5` }),
              }),
              (0, j.jsx)(`div`, {
                className: `hidden sm:flex items-center gap-2 flex-1 max-w-md`,
                children: (0, j.jsxs)(`div`, {
                  className: `relative w-full`,
                  children: [
                    (0, j.jsx)(_, {
                      className: `h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground`,
                    }),
                    (0, j.jsx)(S, {
                      placeholder: `Tìm kiếm…`,
                      className: `pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input`,
                    }),
                  ],
                }),
              }),
              (0, j.jsx)(`div`, {
                className: `ml-auto flex items-center gap-2`,
                children: (0, j.jsxs)(O, {
                  children: [
                    (0, j.jsx)(E, {
                      asChild: !0,
                      children: (0, j.jsxs)(`button`, {
                        className: `flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors`,
                        children: [
                          (0, j.jsx)(`div`, {
                            className: `h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft`,
                            children: h,
                          }),
                          (0, j.jsxs)(`div`, {
                            className: `hidden sm:flex flex-col items-start leading-tight`,
                            children: [
                              (0, j.jsx)(`span`, {
                                className: `text-xs font-medium`,
                                children: t?.fullName ?? `Admin`,
                              }),
                              (0, j.jsxs)(`span`, {
                                className: `text-[10px] text-muted-foreground`,
                                children: [`@`, t?.username ?? `admin`],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, j.jsxs)(T, {
                      align: `end`,
                      className: `w-60`,
                      children: [
                        (0, j.jsx)(w, {
                          className: `pb-2`,
                          children: (0, j.jsxs)(`div`, {
                            className: `flex items-center gap-3`,
                            children: [
                              (0, j.jsx)(`div`, {
                                className: `h-10 w-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-semibold`,
                                children: h,
                              }),
                              (0, j.jsxs)(`div`, {
                                className: `min-w-0`,
                                children: [
                                  (0, j.jsx)(`div`, {
                                    className: `font-semibold truncate`,
                                    children: t?.fullName ?? `Quản trị viên`,
                                  }),
                                  (0, j.jsx)(`div`, {
                                    className: `text-xs text-muted-foreground font-normal truncate`,
                                    children: t?.email ?? `admin`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, j.jsx)(C, {}),
                        (0, j.jsx)(D, {
                          asChild: !0,
                          children: (0, j.jsxs)(r, {
                            to: `/admin_panel/profile`,
                            className: `cursor-pointer`,
                            children: [
                              (0, j.jsx)(c, { className: `h-4 w-4 mr-2` }),
                              ` Hồ sơ`,
                            ],
                          }),
                        }),
                        (0, j.jsx)(C, {}),
                        (0, j.jsxs)(D, {
                          onClick: m,
                          className: `cursor-pointer text-destructive focus:text-destructive`,
                          children: [
                            (0, j.jsx)(g, { className: `h-4 w-4 mr-2` }),
                            ` Đăng xuất`,
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, j.jsx)(`div`, {
            className: `md:hidden border-b border-border bg-card/60 backdrop-blur-md`,
            children: (0, j.jsx)(`nav`, {
              className: `flex overflow-x-auto px-2 py-2 gap-1`,
              children: M.map((e) => {
                let t = N(l, e.to, e.exact);
                return (0, j.jsxs)(
                  r,
                  {
                    to: e.to,
                    className: x(
                      `flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap`,
                      t
                        ? `bg-gradient-brand text-white`
                        : `text-muted-foreground hover:bg-accent`,
                    ),
                    children: [
                      (0, j.jsx)(e.icon, { className: `h-3.5 w-3.5` }),
                      e.label,
                    ],
                  },
                  e.to,
                );
              }),
            }),
          }),
          (0, j.jsx)(`main`, {
            className: `flex-1 min-w-0`,
            children: (0, j.jsx)(`div`, {
              className: `p-6 md:p-8`,
              children: e,
            }),
          }),
        ],
      }),
    ],
  });
}
function F() {
  let { isAuthenticated: e, isLoading: t, user: n } = d(),
    r = u(),
    i = n?.role === `ADMIN`;
  return (
    (0, A.useEffect)(() => {
      t ||
        (e
          ? i || r({ to: `/dashboard`, replace: !0 })
          : r({ to: `/auth/login`, replace: !0 }));
    }, [e, t, i, r]),
    t
      ? (0, j.jsx)(`div`, {
          className: `min-h-screen flex items-center justify-center bg-background`,
          children: (0, j.jsxs)(`div`, {
            className: `flex flex-col items-center gap-4`,
            children: [
              (0, j.jsx)(h, {
                className: `h-12 w-12 animate-spin text-primary`,
              }),
              (0, j.jsx)(`p`, {
                className: `text-sm text-muted-foreground`,
                children: `Đang tải...`,
              }),
            ],
          }),
        })
      : !e || !i
        ? null
        : (0, j.jsx)(P, { children: (0, j.jsx)(l, {}) })
  );
}
export { F as component };
