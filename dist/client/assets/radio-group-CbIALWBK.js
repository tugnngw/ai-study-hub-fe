import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./circle-BahSx_IZ.js";
import { o as i, t as a } from "./utils-BUTip_f_.js";
import { t as o } from "./dist-D9ZlzrYt.js";
import { i as s, r as c, t as l } from "./dist-Cc8O5o4E.js";
import { t as u } from "./dist-DTO6IMEA.js";
import { t as d } from "./dist-CRdtlBZ-.js";
import { t as f } from "./dist-CSSZD7LS.js";
import { i as p, n as m, r as h, t as g } from "./dist-DTuj8fZP.js";
var _ = e(t(), 1),
  v = n(),
  y = `Radio`,
  [b, x] = u(y),
  [S, C] = b(y);
function w(e) {
  let {
      __scopeRadio: t,
      checked: n = !1,
      children: r,
      disabled: i,
      form: a,
      name: o,
      onCheck: s,
      required: c,
      value: l = `on`,
      internal_do_not_use_render: u,
    } = e,
    [d, f] = _.useState(null),
    [p, m] = _.useState(null),
    h = {
      checked: n,
      disabled: i,
      required: c,
      name: o,
      form: a,
      value: l,
      control: d,
      setControl: f,
      hasConsumerStoppedPropagationRef: _.useRef(!1),
      isFormControl: d ? !!a || !!d.closest(`form`) : !0,
      bubbleInput: p,
      setBubbleInput: m,
      onCheck: () => s?.(),
    };
  return (0, v.jsx)(S, { scope: t, ...h, children: M(u) ? u(h) : r });
}
var T = `RadioTrigger`,
  E = _.forwardRef(({ __scopeRadio: e, onClick: t, ...n }, r) => {
    let {
        checked: a,
        disabled: c,
        value: l,
        setControl: u,
        onCheck: d,
        hasConsumerStoppedPropagationRef: f,
        isFormControl: p,
        bubbleInput: m,
      } = C(T, e),
      h = i(r, u);
    return (0, v.jsx)(o.button, {
      type: `button`,
      role: `radio`,
      "aria-checked": a,
      "data-state": N(a),
      "data-disabled": c ? `` : void 0,
      disabled: c,
      value: l,
      ...n,
      ref: h,
      onClick: s(t, (e) => {
        (a || d(),
          m &&
            p &&
            ((f.current = e.isPropagationStopped()),
            f.current || e.stopPropagation()));
      }),
    });
  });
E.displayName = T;
var D = _.forwardRef((e, t) => {
  let {
    __scopeRadio: n,
    name: r,
    checked: i,
    required: a,
    disabled: o,
    value: s,
    onCheck: c,
    form: l,
    ...u
  } = e;
  return (0, v.jsx)(w, {
    __scopeRadio: n,
    checked: i,
    disabled: o,
    required: a,
    onCheck: c,
    name: r,
    form: l,
    value: s,
    internal_do_not_use_render: ({ isFormControl: e }) =>
      (0, v.jsxs)(v.Fragment, {
        children: [
          (0, v.jsx)(E, { ...u, ref: t, __scopeRadio: n }),
          e && (0, v.jsx)(j, { __scopeRadio: n }),
        ],
      }),
  });
});
D.displayName = y;
var O = `RadioIndicator`,
  k = _.forwardRef((e, t) => {
    let { __scopeRadio: n, forceMount: r, ...i } = e,
      a = C(O, n);
    return (0, v.jsx)(l, {
      present: r || a.checked,
      children: (0, v.jsx)(o.span, {
        "data-state": N(a.checked),
        "data-disabled": a.disabled ? `` : void 0,
        ...i,
        ref: t,
      }),
    });
  });
k.displayName = O;
var A = `RadioBubbleInput`,
  j = _.forwardRef(({ __scopeRadio: e, ...t }, n) => {
    let {
        control: r,
        checked: a,
        required: s,
        disabled: c,
        name: l,
        value: u,
        form: p,
        bubbleInput: m,
        setBubbleInput: h,
        hasConsumerStoppedPropagationRef: g,
      } = C(A, e),
      y = i(n, h),
      b = d(a),
      x = f(r);
    _.useEffect(() => {
      let e = m;
      if (!e) return;
      let t = window.HTMLInputElement.prototype,
        n = Object.getOwnPropertyDescriptor(t, `checked`).set,
        r = !g.current;
      if (b !== a && n) {
        let t = new Event(`click`, { bubbles: r });
        (n.call(e, a), e.dispatchEvent(t));
      }
    }, [m, b, a, g]);
    let S = _.useRef(a);
    return (0, v.jsx)(o.input, {
      type: `radio`,
      "aria-hidden": !0,
      defaultChecked: S.current,
      required: s,
      disabled: c,
      name: l,
      value: u,
      form: p,
      ...t,
      tabIndex: -1,
      ref: y,
      style: {
        ...t.style,
        ...x,
        position: `absolute`,
        pointerEvents: `none`,
        opacity: 0,
        margin: 0,
        transform: `translateX(-100%)`,
      },
    });
  });
j.displayName = A;
function M(e) {
  return typeof e == `function`;
}
function N(e) {
  return e ? `checked` : `unchecked`;
}
var P = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`],
  F = `RadioGroup`,
  [I, ee] = u(F, [h, x]),
  L = h(),
  R = x(),
  [z, B] = I(F),
  V = _.forwardRef((e, t) => {
    let {
        __scopeRadioGroup: n,
        name: r,
        defaultValue: i,
        value: a,
        required: s = !1,
        disabled: l = !1,
        orientation: u,
        dir: d,
        loop: f = !0,
        onValueChange: h,
        ...g
      } = e,
      _ = L(n),
      y = p(d),
      [b, x] = c({ prop: a, defaultProp: i ?? null, onChange: h, caller: F });
    return (0, v.jsx)(z, {
      scope: n,
      name: r,
      required: s,
      disabled: l,
      value: b,
      onValueChange: x,
      children: (0, v.jsx)(m, {
        asChild: !0,
        ..._,
        orientation: u,
        dir: y,
        loop: f,
        children: (0, v.jsx)(o.div, {
          role: `radiogroup`,
          "aria-required": s,
          "aria-orientation": u,
          "data-disabled": l ? `` : void 0,
          dir: y,
          ...g,
          ref: t,
        }),
      }),
    });
  });
V.displayName = F;
var H = `RadioGroupItem`,
  U = `RadioGroupItemProvider`,
  W = `RadioGroupItemTrigger`,
  G = `RadioGroupItemBubbleInput`;
function K(e) {
  let {
      __scopeRadioGroup: t,
      value: n,
      disabled: r,
      children: i,
      internal_do_not_use_render: a,
    } = e,
    o = B(U, t),
    s = R(t),
    c = o.disabled || r;
  return (0, v.jsx)(w, {
    ...s,
    checked: o.value === n,
    disabled: c,
    required: o.required,
    name: o.name,
    value: n,
    onCheck: () => o.onValueChange(n),
    internal_do_not_use_render: a,
    children: i,
  });
}
var q = _.forwardRef((e, t) => {
  let { __scopeRadioGroup: n, ...r } = e,
    a = L(n),
    o = R(n),
    { checked: c, disabled: l } = C(W, o.__scopeRadio),
    u = _.useRef(null),
    d = i(t, u),
    f = _.useRef(!1);
  return (
    _.useEffect(() => {
      let e = (e) => {
          P.includes(e.key) && (f.current = !0);
        },
        t = () => (f.current = !1);
      return (
        document.addEventListener(`keydown`, e),
        document.addEventListener(`keyup`, t),
        () => {
          (document.removeEventListener(`keydown`, e),
            document.removeEventListener(`keyup`, t));
        }
      );
    }, []),
    (0, v.jsx)(g, {
      asChild: !0,
      ...a,
      focusable: !l,
      active: c,
      children: (0, v.jsx)(E, {
        ...o,
        ...r,
        ref: d,
        onKeyDown: s(r.onKeyDown, (e) => {
          e.key === `Enter` && e.preventDefault();
        }),
        onFocus: s(r.onFocus, () => {
          f.current && u.current?.click();
        }),
      }),
    })
  );
});
q.displayName = W;
var J = _.forwardRef((e, t) => {
  let { __scopeRadioGroup: n, value: r, disabled: i, ...a } = e;
  return (0, v.jsx)(K, {
    __scopeRadioGroup: n,
    value: r,
    disabled: i,
    internal_do_not_use_render: ({ isFormControl: e }) =>
      (0, v.jsxs)(v.Fragment, {
        children: [
          (0, v.jsx)(q, { ...a, ref: t, __scopeRadioGroup: n }),
          e && (0, v.jsx)(Y, { __scopeRadioGroup: n }),
        ],
      }),
  });
});
J.displayName = H;
var Y = _.forwardRef((e, t) => {
  let { __scopeRadioGroup: n, ...r } = e;
  return (0, v.jsx)(j, { ...R(n), ...r, ref: t });
});
Y.displayName = G;
var X = `RadioGroupIndicator`,
  Z = _.forwardRef((e, t) => {
    let { __scopeRadioGroup: n, ...r } = e;
    return (0, v.jsx)(k, { ...R(n), ...r, ref: t });
  });
Z.displayName = X;
var Q = _.forwardRef(({ className: e, ...t }, n) =>
  (0, v.jsx)(V, { className: a(`grid gap-2`, e), ...t, ref: n }),
);
Q.displayName = V.displayName;
var $ = _.forwardRef(({ className: e, ...t }, n) =>
  (0, v.jsx)(J, {
    ref: n,
    className: a(
      `aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
      e,
    ),
    ...t,
    children: (0, v.jsx)(Z, {
      className: `flex items-center justify-center`,
      children: (0, v.jsx)(r, { className: `h-3.5 w-3.5 fill-primary` }),
    }),
  }),
);
$.displayName = J.displayName;
export { $ as n, Q as t };
