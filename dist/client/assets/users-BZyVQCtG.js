import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./useQuery-B1LFZ_NG.js";
import { t as i } from "./useMutation-DACFodZO.js";
import { n as a } from "./api-BDRotG0l.js";
import { _ as o, l as s } from "./index-CDVqwL1-.js";
import { t as c } from "./createLucideIcon-p5NglK5C.js";
import { t as l } from "./lock-DSt9OY4h.js";
import { t as u } from "./search-C2LZVwX8.js";
import { t as d } from "./trash-2-CVEVc4it.js";
import { t as f } from "./button-CQzuWDyd.js";
import { a as p, i as m, n as h, t as g } from "./card-Ds71aSGU.js";
import { t as _ } from "./input-CDAzVnuz.js";
import {
  a as v,
  i as y,
  n as b,
  o as x,
  r as S,
  t as C,
} from "./table-BQnHMmbP.js";
import { t as w } from "./badge-924rRAMD.js";
import { t as T } from "./PlanBadge-CBoHFiOM.js";
import { n as E, t as D } from "./avatar-CfdU8K4o.js";
import { t as O } from "./adminKeys-C_-9jrwr.js";
var k = c(`lock-open`, [
    [
      `rect`,
      {
        width: `18`,
        height: `11`,
        x: `3`,
        y: `11`,
        rx: `2`,
        ry: `2`,
        key: `1w4ew1`,
      },
    ],
    [`path`, { d: `M7 11V7a5 5 0 0 1 9.9-1`, key: `1mm8w8` }],
  ]),
  A = {
    getUsers: () => a(`/api/admin/users`),
    toggleStatus: (e) =>
      a(`/api/admin/users/${e}/toggle-status`, { method: `POST` }),
    deleteUser: (e) => a(`/api/admin/users/${e}`, { method: `DELETE` }),
  };
function j() {
  return r({ queryKey: O.users(), queryFn: () => A.getUsers() });
}
function M() {
  let e = o();
  return i({
    mutationFn: (e) => A.toggleStatus(e),
    onSuccess: () => e.invalidateQueries({ queryKey: O.users() }),
  });
}
function N() {
  let e = o();
  return i({
    mutationFn: (e) => A.deleteUser(e),
    onSuccess: () => e.invalidateQueries({ queryKey: O.users() }),
  });
}
var P = e(t(), 1),
  F = n(),
  I = () => {
    let [e, t] = (0, P.useState)(``),
      { data: n = [] } = j(),
      r = M(),
      i = N(),
      a = (0, P.useMemo)(
        () =>
          n.filter(
            (t) =>
              t.name.toLowerCase().includes(e.toLowerCase()) ||
              t.email.toLowerCase().includes(e.toLowerCase()),
          ),
        [n, e],
      );
    return (0, F.jsxs)(`div`, {
      className: `space-y-6`,
      children: [
        (0, F.jsxs)(`div`, {
          className: `flex items-center justify-between gap-4 flex-wrap`,
          children: [
            (0, F.jsxs)(`div`, {
              children: [
                (0, F.jsx)(`h1`, {
                  className: `text-2xl font-bold tracking-tight font-display`,
                  children: `Quản lý Users`,
                }),
                (0, F.jsx)(`p`, {
                  className: `text-muted-foreground mt-1 text-sm`,
                  children: `Quản lý tài khoản thành viên trong hệ thống`,
                }),
              ],
            }),
            (0, F.jsxs)(`div`, {
              className: `relative w-full max-w-xs`,
              children: [
                (0, F.jsx)(u, {
                  className: `h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground`,
                }),
                (0, F.jsx)(_, {
                  placeholder: `Tìm tên hoặc email…`,
                  value: e,
                  onChange: (e) => t(e.target.value),
                  className: `pl-9`,
                }),
              ],
            }),
          ],
        }),
        (0, F.jsxs)(g, {
          children: [
            (0, F.jsxs)(m, {
              className: `flex-row items-center justify-between space-y-0`,
              children: [
                (0, F.jsx)(p, {
                  className: `text-base`,
                  children: `Danh sách thành viên`,
                }),
                (0, F.jsxs)(`span`, {
                  className: `text-sm text-muted-foreground`,
                  children: [a.length, ` thành viên`],
                }),
              ],
            }),
            (0, F.jsx)(h, {
              className: `p-0`,
              children: (0, F.jsxs)(C, {
                children: [
                  (0, F.jsx)(v, {
                    children: (0, F.jsxs)(x, {
                      children: [
                        (0, F.jsx)(y, { children: `Thành viên` }),
                        (0, F.jsx)(y, { children: `Email` }),
                        (0, F.jsx)(y, { children: `Gói` }),
                        (0, F.jsx)(y, { children: `Trạng thái` }),
                        (0, F.jsx)(y, {
                          className: `text-right`,
                          children: `Hành động`,
                        }),
                      ],
                    }),
                  }),
                  (0, F.jsx)(b, {
                    children:
                      a.length === 0
                        ? (0, F.jsx)(x, {
                            children: (0, F.jsx)(S, {
                              colSpan: 5,
                              className: `h-24 text-center text-muted-foreground`,
                              children: `Không tìm thấy thành viên`,
                            }),
                          })
                        : a.map((e) =>
                            (0, F.jsxs)(
                              x,
                              {
                                children: [
                                  (0, F.jsx)(S, {
                                    children: (0, F.jsxs)(`div`, {
                                      className: `flex items-center gap-3`,
                                      children: [
                                        (0, F.jsx)(D, {
                                          className: `h-9 w-9`,
                                          children: (0, F.jsx)(E, {
                                            className: `bg-muted text-sm`,
                                            children: e.name.charAt(0),
                                          }),
                                        }),
                                        (0, F.jsx)(`span`, {
                                          className: `font-medium`,
                                          children: e.name,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, F.jsx)(S, {
                                    className: `text-muted-foreground`,
                                    children: e.email,
                                  }),
                                  (0, F.jsx)(S, {
                                    children: (0, F.jsx)(T, { plan: e.plan }),
                                  }),
                                  (0, F.jsx)(S, {
                                    children: (0, F.jsx)(w, {
                                      variant:
                                        e.status === `Hoạt động`
                                          ? `secondary`
                                          : `destructive`,
                                      children: e.status,
                                    }),
                                  }),
                                  (0, F.jsx)(S, {
                                    className: `text-right`,
                                    children: (0, F.jsxs)(`div`, {
                                      className: `flex justify-end gap-2`,
                                      children: [
                                        (0, F.jsxs)(f, {
                                          variant: `outline`,
                                          size: `sm`,
                                          onClick: () =>
                                            r.mutate(e.id, {
                                              onSuccess: () =>
                                                s.success(
                                                  e.status === `Hoạt động`
                                                    ? `Đã khóa tài khoản`
                                                    : `Đã mở khóa tài khoản`,
                                                ),
                                            }),
                                          children: [
                                            e.status === `Hoạt động`
                                              ? (0, F.jsx)(l, {})
                                              : (0, F.jsx)(k, {}),
                                            e.status === `Hoạt động`
                                              ? `Khóa`
                                              : `Mở khóa`,
                                          ],
                                        }),
                                        (0, F.jsxs)(f, {
                                          variant: `outline`,
                                          size: `sm`,
                                          className: `text-destructive hover:text-destructive`,
                                          onClick: () => {
                                            window.confirm(`Xóa thành viên?`) &&
                                              i.mutate(e.id, {
                                                onSuccess: () =>
                                                  s.success(
                                                    `Đã xóa thành viên`,
                                                  ),
                                              });
                                          },
                                          children: [(0, F.jsx)(d, {}), ` Xóa`],
                                        }),
                                      ],
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
      ],
    });
  };
export { I as component };
