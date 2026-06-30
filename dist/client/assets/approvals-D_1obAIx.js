import "./chunk-CMxvf4Kt.js";
import { n as e, t } from "./jsx-runtime-D0Gpvp3q.js";
import { t as n } from "./useQuery-B1LFZ_NG.js";
import { t as r } from "./useMutation-DACFodZO.js";
import { n as i } from "./api-BDRotG0l.js";
import { _ as a, l as o } from "./index-CDVqwL1-.js";
import { t as s } from "./check-BgZ0eYb5.js";
import { t as c } from "./file-text-CjI-82n2.js";
import { t as l } from "./x-CZ5V7eis.js";
import { t as u } from "./button-CQzuWDyd.js";
import { a as d, i as f, n as p, t as m } from "./card-Ds71aSGU.js";
import {
  a as h,
  i as g,
  n as _,
  o as v,
  r as y,
  t as b,
} from "./table-BQnHMmbP.js";
import { n as x, t as S } from "./avatar-CfdU8K4o.js";
import { t as C } from "./adminKeys-C_-9jrwr.js";
var w = {
  getPendingList: () => i(`/api/admin/approvals`),
  approve: (e) => i(`/api/admin/approvals/${e}/approve`, { method: `POST` }),
  reject: (e) => i(`/api/admin/approvals/${e}/reject`, { method: `POST` }),
};
function T() {
  return n({ queryKey: C.approvals(), queryFn: () => w.getPendingList() });
}
function E() {
  let e = a();
  return r({
    mutationFn: ({ id: e, action: t }) =>
      t === `approve` ? w.approve(e) : w.reject(e),
    onSuccess: () => e.invalidateQueries({ queryKey: C.approvals() }),
  });
}
e();
var D = t(),
  O = () => {
    let { data: e = [] } = T(),
      t = E(),
      n = (e, n) =>
        t.mutate(
          { id: e, action: n },
          {
            onSuccess: () =>
              o.success(
                n === `approve` ? `Đã duyệt tài liệu` : `Đã từ chối tài liệu`,
              ),
          },
        );
    return (0, D.jsxs)(`div`, {
      className: `space-y-6`,
      children: [
        (0, D.jsxs)(`div`, {
          children: [
            (0, D.jsx)(`h1`, {
              className: `text-2xl font-bold tracking-tight font-display`,
              children: `Phê duyệt tài liệu`,
            }),
            (0, D.jsx)(`p`, {
              className: `text-muted-foreground mt-1 text-sm`,
              children: `Xét duyệt các tài liệu đang chờ`,
            }),
          ],
        }),
        (0, D.jsxs)(m, {
          children: [
            (0, D.jsxs)(f, {
              className: `flex-row items-center justify-between space-y-0`,
              children: [
                (0, D.jsx)(d, {
                  className: `text-base`,
                  children: `Đang chờ duyệt`,
                }),
                (0, D.jsxs)(`span`, {
                  className: `text-sm text-muted-foreground`,
                  children: [e.length, ` mục`],
                }),
              ],
            }),
            (0, D.jsx)(p, {
              className: `p-0`,
              children: (0, D.jsxs)(b, {
                children: [
                  (0, D.jsx)(h, {
                    children: (0, D.jsxs)(v, {
                      children: [
                        (0, D.jsx)(g, { children: `Tên tài liệu` }),
                        (0, D.jsx)(g, { children: `Người tải lên` }),
                        (0, D.jsx)(g, { children: `Ngày gửi` }),
                        (0, D.jsx)(g, {
                          className: `text-right`,
                          children: `Hành động`,
                        }),
                      ],
                    }),
                  }),
                  (0, D.jsx)(_, {
                    children:
                      e.length === 0
                        ? (0, D.jsx)(v, {
                            children: (0, D.jsx)(y, {
                              colSpan: 4,
                              className: `h-24 text-center text-muted-foreground`,
                              children: `Không có tài liệu chờ duyệt`,
                            }),
                          })
                        : e.map((e) =>
                            (0, D.jsxs)(
                              v,
                              {
                                children: [
                                  (0, D.jsx)(y, {
                                    children: (0, D.jsxs)(`div`, {
                                      className: `flex items-center gap-3 min-w-0`,
                                      children: [
                                        (0, D.jsx)(`div`, {
                                          className: `h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0`,
                                          children: (0, D.jsx)(c, {
                                            className: `h-4 w-4`,
                                          }),
                                        }),
                                        (0, D.jsx)(`span`, {
                                          className: `font-medium truncate`,
                                          children: e.title,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, D.jsx)(y, {
                                    children: (0, D.jsxs)(`div`, {
                                      className: `flex items-center gap-2.5`,
                                      children: [
                                        (0, D.jsx)(S, {
                                          className: `h-7 w-7`,
                                          children: (0, D.jsx)(x, {
                                            className: `bg-muted text-xs`,
                                            children: e.uploader.charAt(0),
                                          }),
                                        }),
                                        (0, D.jsx)(`span`, {
                                          className: `text-muted-foreground`,
                                          children: e.uploader,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, D.jsx)(y, {
                                    className: `text-muted-foreground`,
                                    children: e.date,
                                  }),
                                  (0, D.jsx)(y, {
                                    className: `text-right`,
                                    children: (0, D.jsxs)(`div`, {
                                      className: `flex justify-end gap-2`,
                                      children: [
                                        (0, D.jsxs)(u, {
                                          variant: `outline`,
                                          size: `sm`,
                                          className: `text-destructive hover:text-destructive`,
                                          onClick: () => n(e.id, `reject`),
                                          children: [
                                            (0, D.jsx)(l, {}),
                                            ` Từ chối`,
                                          ],
                                        }),
                                        (0, D.jsxs)(u, {
                                          size: `sm`,
                                          onClick: () => n(e.id, `approve`),
                                          children: [
                                            (0, D.jsx)(s, {}),
                                            ` Duyệt`,
                                          ],
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
export { O as component };
