import "./chunk-CMxvf4Kt.js";
import { n as e, t } from "./jsx-runtime-D0Gpvp3q.js";
import { t as n } from "./utils-BUTip_f_.js";
import { t as r } from "./badge-924rRAMD.js";
e();
var i = t(),
  a = {
    FREE: `bg-muted text-muted-foreground border-transparent`,
    PLUS: `bg-primary/10 text-primary border-transparent`,
    PRO: `bg-gradient-brand text-white border-transparent shadow-sm`,
  },
  o = { FREE: `Free`, PLUS: `Plus`, PRO: `Pro` },
  s = ({ plan: e, className: t }) =>
    (0, i.jsx)(r, {
      variant: `secondary`,
      className: n(a[e], t),
      children: o[e],
    });
export { s as t };
