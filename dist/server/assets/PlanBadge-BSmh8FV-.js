import { t as cn } from "./utils-C_uf36nf.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import "react";
import { jsx } from "react/jsx-runtime";
//#region src/features/admin/components/PlanBadge.tsx
var styles = {
  FREE: "bg-muted text-muted-foreground border-transparent",
  PLUS: "bg-primary/10 text-primary border-transparent",
  PRO: "bg-gradient-brand text-white border-transparent shadow-sm",
};
var labels = {
  FREE: "Free",
  PLUS: "Plus",
  PRO: "Pro",
};
var PlanBadge = ({ plan, className }) =>
  /* @__PURE__ */ jsx(Badge, {
    variant: "secondary",
    className: cn(styles[plan], className),
    children: labels[plan],
  });
//#endregion
export { PlanBadge as t };
