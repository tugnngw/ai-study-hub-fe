import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./link-BbWDPsL2.js";
import { t as i } from "./receipt-CqiIr0dI.js";
import { t as a } from "./sparkles-BqvYif3p.js";
import { t as o } from "./utils-BUTip_f_.js";
import { t as s } from "./button-CQzuWDyd.js";
import { a as c, i as l, n as u, t as d } from "./card-Ds71aSGU.js";
import {
  a as f,
  i as p,
  n as m,
  o as h,
  r as g,
  t as _,
} from "./table-BQnHMmbP.js";
import { t as v } from "./badge-924rRAMD.js";
import { t as y } from "./PlanBadge-CBoHFiOM.js";
import { t as b } from "./paymentApi-DmlTO81n.js";
var x = e(t(), 1),
  S = n(),
  C = (e) => e.toLocaleString(`vi-VN`) + ` ₫`,
  w = {
    "Thành công": `bg-emerald-500/10 text-emerald-600`,
    "Đang xử lý": `bg-amber-500/10 text-amber-600`,
    "Thất bại": `bg-destructive/10 text-destructive`,
  };
function T() {
  let [e, t] = (0, x.useState)([]);
  return (
    (0, x.useEffect)(() => {
      let e = !0;
      return (
        b.getTransactions().then((n) => {
          e && t(n);
        }),
        () => {
          e = !1;
        }
      );
    }, []),
    (0, S.jsxs)(`div`, {
      className: `space-y-6`,
      children: [
        (0, S.jsxs)(`div`, {
          className: `flex items-center justify-between gap-4 flex-wrap`,
          children: [
            (0, S.jsxs)(`div`, {
              children: [
                (0, S.jsx)(`h1`, {
                  className: `text-2xl font-bold tracking-tight font-display`,
                  children: `Lịch sử giao dịch`,
                }),
                (0, S.jsx)(`p`, {
                  className: `text-muted-foreground mt-1 text-sm`,
                  children: `Các giao dịch mua gói Premium gần đây của bạn`,
                }),
              ],
            }),
            (0, S.jsx)(s, {
              asChild: !0,
              className: `bg-gradient-brand shadow-brand hover:opacity-90`,
              children: (0, S.jsxs)(r, {
                to: `/premium`,
                children: [
                  (0, S.jsx)(a, { className: `h-4 w-4 mr-2` }),
                  ` Nâng cấp gói`,
                ],
              }),
            }),
          ],
        }),
        (0, S.jsxs)(d, {
          children: [
            (0, S.jsx)(l, {
              children: (0, S.jsxs)(c, {
                className: `text-base flex items-center gap-2`,
                children: [
                  (0, S.jsx)(i, { className: `h-4 w-4 text-muted-foreground` }),
                  ` Giao dịch`,
                ],
              }),
            }),
            (0, S.jsx)(u, {
              className: `p-0`,
              children: (0, S.jsxs)(_, {
                children: [
                  (0, S.jsx)(f, {
                    children: (0, S.jsxs)(h, {
                      children: [
                        (0, S.jsx)(p, { children: `Mã GD` }),
                        (0, S.jsx)(p, { children: `Gói` }),
                        (0, S.jsx)(p, { children: `Số tiền` }),
                        (0, S.jsx)(p, { children: `Phương thức` }),
                        (0, S.jsx)(p, { children: `Ngày` }),
                        (0, S.jsx)(p, { children: `Trạng thái` }),
                      ],
                    }),
                  }),
                  (0, S.jsx)(m, {
                    children:
                      e.length === 0
                        ? (0, S.jsx)(h, {
                            children: (0, S.jsx)(g, {
                              colSpan: 6,
                              className: `h-24 text-center text-muted-foreground`,
                              children: `Chưa có giao dịch nào`,
                            }),
                          })
                        : e.map((e) =>
                            (0, S.jsxs)(
                              h,
                              {
                                children: [
                                  (0, S.jsx)(g, {
                                    className: `font-mono text-xs`,
                                    children: e.id,
                                  }),
                                  (0, S.jsx)(g, {
                                    children: (0, S.jsx)(y, { plan: e.plan }),
                                  }),
                                  (0, S.jsx)(g, {
                                    className: `font-medium`,
                                    children: C(e.amount),
                                  }),
                                  (0, S.jsx)(g, {
                                    className: `text-muted-foreground`,
                                    children: e.method,
                                  }),
                                  (0, S.jsx)(g, {
                                    className: `text-muted-foreground`,
                                    children: e.date,
                                  }),
                                  (0, S.jsx)(g, {
                                    children: (0, S.jsx)(v, {
                                      variant: `secondary`,
                                      className: o(w[e.status]),
                                      children: e.status,
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
    })
  );
}
var E = T;
export { E as component };
