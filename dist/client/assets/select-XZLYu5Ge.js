import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./react-dom-CQULHNBr.js";
import { t as i } from "./createLucideIcon-p5NglK5C.js";
import { t as a } from "./check-BgZ0eYb5.js";
import { i as o, o as s, t as c } from "./utils-BUTip_f_.js";
import { t as l } from "./dist-D9ZlzrYt.js";
import { i as u, n as d, r as f, t as p } from "./dist-Cc8O5o4E.js";
import { t as m } from "./dist-DTO6IMEA.js";
import { n as h, t as g } from "./dist-CeE5QqrL.js";
import { t as _ } from "./dist-CRdtlBZ-.js";
import {
  a as v,
  i as y,
  n as b,
  o as x,
  r as S,
  t as C,
} from "./es2015-CtULDcww.js";
import { a as w, i as T } from "./dist-DTuj8fZP.js";
import {
  c as E,
  d as D,
  l as O,
  s as k,
  u as A,
} from "./dropdown-menu-g7D8ZjbS.js";
var j = i(`chevron-down`, [[`path`, { d: `m6 9 6 6 6-6`, key: `qrunsl` }]]),
  M = i(`chevron-up`, [[`path`, { d: `m18 15-6-6-6 6`, key: `153udz` }]]),
  ee = i(`folder-open`, [
    [
      `path`,
      {
        d: `m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2`,
        key: `usdka0`,
      },
    ],
  ]),
  N = e(t(), 1),
  P = e(r(), 1);
function F(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var I = n(),
  L = Object.freeze({
    position: `absolute`,
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: `hidden`,
    clip: `rect(0, 0, 0, 0)`,
    whiteSpace: `nowrap`,
    wordWrap: `normal`,
  }),
  te = `VisuallyHidden`,
  R = N.forwardRef((e, t) =>
    (0, I.jsx)(l.span, { ...e, ref: t, style: { ...L, ...e.style } }),
  );
R.displayName = te;
var z = [` `, `Enter`, `ArrowUp`, `ArrowDown`],
  B = [` `, `Enter`],
  V = `Select`,
  [H, U, ne] = w(V),
  [W, re] = m(V, [ne, D]),
  G = D(),
  [ie, K] = W(V),
  [q, ae] = W(V),
  oe = `SelectProvider`;
function se(e) {
  let {
      __scopeSelect: t,
      children: n,
      open: r,
      defaultOpen: i,
      onOpenChange: a,
      value: o,
      defaultValue: s,
      onValueChange: c,
      dir: l,
      name: u,
      autoComplete: p,
      disabled: m,
      required: h,
      form: g,
      internal_do_not_use_render: _,
    } = e,
    v = G(t),
    [y, b] = N.useState(null),
    [x, S] = N.useState(null),
    [C, w] = N.useState(!1),
    E = T(l),
    [D, O] = f({ prop: r, defaultProp: i ?? !1, onChange: a, caller: V }),
    [k, j] = f({ prop: o, defaultProp: s, onChange: c, caller: V }),
    M = N.useRef(null),
    ee = y ? !!g || !!y.closest(`form`) : !0,
    [P, F] = N.useState(new Set()),
    L = d(),
    te = Array.from(P)
      .map((e) => e.props.value)
      .join(`;`),
    R = N.useCallback((e) => {
      F((t) => new Set(t).add(e));
    }, []),
    z = N.useCallback((e) => {
      F((t) => {
        let n = new Set(t);
        return (n.delete(e), n);
      });
    }, []),
    B = {
      required: h,
      trigger: y,
      onTriggerChange: b,
      valueNode: x,
      onValueNodeChange: S,
      valueNodeHasChildren: C,
      onValueNodeHasChildrenChange: w,
      contentId: L,
      value: k,
      onValueChange: j,
      open: D,
      onOpenChange: O,
      dir: E,
      triggerPointerDownPosRef: M,
      disabled: m,
      name: u,
      autoComplete: p,
      form: g,
      nativeOptions: P,
      nativeSelectKey: te,
      isFormControl: ee,
    };
  return (0, I.jsx)(A, {
    ...v,
    children: (0, I.jsx)(ie, {
      scope: t,
      ...B,
      children: (0, I.jsx)(H.Provider, {
        scope: t,
        children: (0, I.jsx)(q, {
          scope: t,
          onNativeOptionAdd: R,
          onNativeOptionRemove: z,
          children: nt(_) ? _(B) : n,
        }),
      }),
    }),
  });
}
se.displayName = oe;
var ce = (e) => {
  let { __scopeSelect: t, children: n, ...r } = e;
  return (0, I.jsx)(se, {
    __scopeSelect: t,
    ...r,
    internal_do_not_use_render: ({ isFormControl: e }) =>
      (0, I.jsxs)(I.Fragment, {
        children: [n, e ? (0, I.jsx)(tt, { __scopeSelect: t }) : null],
      }),
  });
};
ce.displayName = V;
var le = `SelectTrigger`,
  ue = N.forwardRef((e, t) => {
    let { __scopeSelect: n, disabled: r = !1, ...i } = e,
      a = G(n),
      o = K(le, n),
      c = o.disabled || r,
      d = s(t, o.onTriggerChange),
      f = U(n),
      p = N.useRef(`touch`),
      [m, h, g] = rt((e) => {
        let t = f().filter((e) => !e.disabled),
          n = it(
            t,
            e,
            t.find((e) => e.value === o.value),
          );
        n !== void 0 && o.onValueChange(n.value);
      }),
      _ = (e) => {
        (c || (o.onOpenChange(!0), g()),
          e &&
            (o.triggerPointerDownPosRef.current = {
              x: Math.round(e.pageX),
              y: Math.round(e.pageY),
            }));
      };
    return (0, I.jsx)(k, {
      asChild: !0,
      ...a,
      children: (0, I.jsx)(l.button, {
        type: `button`,
        role: `combobox`,
        "aria-controls": o.open ? o.contentId : void 0,
        "aria-expanded": o.open,
        "aria-required": o.required,
        "aria-autocomplete": `none`,
        dir: o.dir,
        "data-state": o.open ? `open` : `closed`,
        disabled: c,
        "data-disabled": c ? `` : void 0,
        "data-placeholder": $(o.value) ? `` : void 0,
        ...i,
        ref: d,
        onClick: u(i.onClick, (e) => {
          (e.currentTarget.focus(), p.current !== `mouse` && _(e));
        }),
        onPointerDown: u(i.onPointerDown, (e) => {
          p.current = e.pointerType;
          let t = e.target;
          (t.hasPointerCapture(e.pointerId) &&
            t.releasePointerCapture(e.pointerId),
            e.button === 0 &&
              e.ctrlKey === !1 &&
              e.pointerType === `mouse` &&
              (_(e), e.preventDefault()));
        }),
        onKeyDown: u(i.onKeyDown, (e) => {
          let t = m.current !== ``;
          (!(e.ctrlKey || e.altKey || e.metaKey) &&
            e.key.length === 1 &&
            h(e.key),
            !(t && e.key === ` `) &&
              z.includes(e.key) &&
              (_(), e.preventDefault()));
        }),
      }),
    });
  });
ue.displayName = le;
var de = `SelectValue`,
  fe = N.forwardRef((e, t) => {
    let {
        __scopeSelect: n,
        className: r,
        style: i,
        children: a,
        placeholder: o = ``,
        ...c
      } = e,
      u = K(de, n),
      { onValueNodeHasChildrenChange: d } = u,
      f = a !== void 0,
      p = s(t, u.onValueNodeChange);
    h(() => {
      d(f);
    }, [d, f]);
    let m = $(u.value);
    return (0, I.jsx)(l.span, {
      ...c,
      asChild: m ? !1 : c.asChild,
      ref: p,
      style: { pointerEvents: `none` },
      children: (0, I.jsx)(
        N.Fragment,
        { children: m ? o : a },
        m ? `placeholder` : `value`,
      ),
    });
  });
fe.displayName = de;
var pe = `SelectIcon`,
  me = N.forwardRef((e, t) => {
    let { __scopeSelect: n, children: r, ...i } = e;
    return (0, I.jsx)(l.span, {
      "aria-hidden": !0,
      ...i,
      ref: t,
      children: r || `▼`,
    });
  });
me.displayName = pe;
var he = `SelectPortal`,
  [ge, _e] = W(he, { forceMount: void 0 }),
  ve = (e) => {
    let { __scopeSelect: t, forceMount: n, ...r } = e;
    return (0, I.jsx)(ge, {
      scope: e.__scopeSelect,
      forceMount: n,
      children: (0, I.jsx)(y, { asChild: !0, ...r }),
    });
  };
ve.displayName = he;
var J = `SelectContent`,
  ye = N.forwardRef((e, t) => {
    let n = _e(J, e.__scopeSelect),
      { forceMount: r = n.forceMount, ...i } = e,
      a = K(J, e.__scopeSelect),
      [o, s] = N.useState();
    return (
      h(() => {
        s(new DocumentFragment());
      }, []),
      (0, I.jsx)(p, {
        present: r || a.open,
        children: ({ present: e }) =>
          e
            ? (0, I.jsx)(we, { ...i, ref: t })
            : (0, I.jsx)(be, { ...i, fragment: o }),
      })
    );
  });
ye.displayName = J;
var be = N.forwardRef((e, t) => {
  let { __scopeSelect: n, children: r, fragment: i } = e;
  return i
    ? P.createPortal(
        (0, I.jsx)(xe, {
          scope: n,
          children: (0, I.jsx)(H.Slot, {
            scope: n,
            children: (0, I.jsx)(`div`, { ref: t, children: r }),
          }),
        }),
        i,
      )
    : null;
});
be.displayName = `SelectContentFragment`;
var Y = 10,
  [xe, X] = W(J),
  Se = `SelectContentImpl`,
  Ce = o(`SelectContent.RemoveScroll`),
  we = N.forwardRef((e, t) => {
    let { __scopeSelect: n } = e,
      {
        position: r = `item-aligned`,
        onCloseAutoFocus: i,
        onEscapeKeyDown: a,
        onPointerDownOutside: o,
        side: c,
        sideOffset: l,
        align: d,
        alignOffset: f,
        arrowPadding: p,
        collisionBoundary: m,
        collisionPadding: h,
        sticky: g,
        hideWhenDetached: _,
        avoidCollisions: y,
        ...w
      } = e,
      T = K(J, n),
      [E, D] = N.useState(null),
      [O, k] = N.useState(null),
      A = s(t, (e) => D(e)),
      [j, M] = N.useState(null),
      [ee, P] = N.useState(null),
      F = U(n),
      [L, te] = N.useState(!1),
      R = N.useRef(!1);
    (N.useEffect(() => {
      if (E) return C(E);
    }, [E]),
      S());
    let z = N.useCallback(
        (e) => {
          let [t, ...n] = F().map((e) => e.ref.current),
            [r] = n.slice(-1),
            i = document.activeElement;
          for (let n of e)
            if (
              n === i ||
              (n?.scrollIntoView({ block: `nearest` }),
              n === t && O && (O.scrollTop = 0),
              n === r && O && (O.scrollTop = O.scrollHeight),
              n?.focus(),
              document.activeElement !== i)
            )
              return;
        },
        [F, O],
      ),
      B = N.useCallback(() => z([j, E]), [z, j, E]);
    N.useEffect(() => {
      L && B();
    }, [L, B]);
    let { onOpenChange: V, triggerPointerDownPosRef: H } = T;
    (N.useEffect(() => {
      if (E) {
        let e = { x: 0, y: 0 },
          t = (t) => {
            e = {
              x: Math.abs(Math.round(t.pageX) - (H.current?.x ?? 0)),
              y: Math.abs(Math.round(t.pageY) - (H.current?.y ?? 0)),
            };
          },
          n = (n) => {
            (e.x <= 10 && e.y <= 10
              ? n.preventDefault()
              : n.composedPath().includes(E) || V(!1),
              document.removeEventListener(`pointermove`, t),
              (H.current = null));
          };
        return (
          H.current !== null &&
            (document.addEventListener(`pointermove`, t),
            document.addEventListener(`pointerup`, n, {
              capture: !0,
              once: !0,
            })),
          () => {
            (document.removeEventListener(`pointermove`, t),
              document.removeEventListener(`pointerup`, n, { capture: !0 }));
          }
        );
      }
    }, [E, V, H]),
      N.useEffect(() => {
        let e = () => V(!1);
        return (
          window.addEventListener(`blur`, e),
          window.addEventListener(`resize`, e),
          () => {
            (window.removeEventListener(`blur`, e),
              window.removeEventListener(`resize`, e));
          }
        );
      }, [V]));
    let [ne, W] = rt((e) => {
        let t = F().filter((e) => !e.disabled),
          n = it(
            t,
            e,
            t.find((e) => e.ref.current === document.activeElement),
          );
        n && setTimeout(() => n.ref.current?.focus());
      }),
      re = N.useCallback(
        (e, t, n) => {
          let r = !R.current && !n;
          ((T.value !== void 0 && T.value === t) || r) &&
            (M(e), r && (R.current = !0));
        },
        [T.value],
      ),
      G = N.useCallback(() => E?.focus(), [E]),
      ie = N.useCallback(
        (e, t, n) => {
          let r = !R.current && !n;
          ((T.value !== void 0 && T.value === t) || r) && P(e);
        },
        [T.value],
      ),
      q = r === `popper` ? Oe : Ee,
      ae =
        q === Oe
          ? {
              side: c,
              sideOffset: l,
              align: d,
              alignOffset: f,
              arrowPadding: p,
              collisionBoundary: m,
              collisionPadding: h,
              sticky: g,
              hideWhenDetached: _,
              avoidCollisions: y,
            }
          : {};
    return (0, I.jsx)(xe, {
      scope: n,
      content: E,
      viewport: O,
      onViewportChange: k,
      itemRefCallback: re,
      selectedItem: j,
      onItemLeave: G,
      itemTextRefCallback: ie,
      focusSelectedItem: B,
      selectedItemText: ee,
      position: r,
      isPositioned: L,
      searchRef: ne,
      children: (0, I.jsx)(b, {
        as: Ce,
        allowPinchZoom: !0,
        children: (0, I.jsx)(v, {
          asChild: !0,
          trapped: T.open,
          onMountAutoFocus: (e) => {
            e.preventDefault();
          },
          onUnmountAutoFocus: u(i, (e) => {
            (T.trigger?.focus({ preventScroll: !0 }), e.preventDefault());
          }),
          children: (0, I.jsx)(x, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: a,
            onPointerDownOutside: o,
            onFocusOutside: (e) => e.preventDefault(),
            onDismiss: () => T.onOpenChange(!1),
            children: (0, I.jsx)(q, {
              role: `listbox`,
              id: T.contentId,
              "data-state": T.open ? `open` : `closed`,
              dir: T.dir,
              onContextMenu: (e) => e.preventDefault(),
              ...w,
              ...ae,
              onPlaced: () => te(!0),
              ref: A,
              style: {
                display: `flex`,
                flexDirection: `column`,
                outline: `none`,
                ...w.style,
              },
              onKeyDown: u(w.onKeyDown, (e) => {
                let t = e.ctrlKey || e.altKey || e.metaKey;
                if (
                  (e.key === `Tab` && e.preventDefault(),
                  !t && e.key.length === 1 && W(e.key),
                  [`ArrowUp`, `ArrowDown`, `Home`, `End`].includes(e.key))
                ) {
                  let t = F()
                    .filter((e) => !e.disabled)
                    .map((e) => e.ref.current);
                  if (
                    ([`ArrowUp`, `End`].includes(e.key) &&
                      (t = t.slice().reverse()),
                    [`ArrowUp`, `ArrowDown`].includes(e.key))
                  ) {
                    let n = e.target,
                      r = t.indexOf(n);
                    t = t.slice(r + 1);
                  }
                  (setTimeout(() => z(t)), e.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
we.displayName = Se;
var Te = `SelectItemAlignedPosition`,
  Ee = N.forwardRef((e, t) => {
    let { __scopeSelect: n, onPlaced: r, ...i } = e,
      a = K(J, n),
      o = X(J, n),
      [c, u] = N.useState(null),
      [d, f] = N.useState(null),
      p = s(t, (e) => f(e)),
      m = U(n),
      g = N.useRef(!1),
      _ = N.useRef(!0),
      {
        viewport: v,
        selectedItem: y,
        selectedItemText: b,
        focusSelectedItem: x,
      } = o,
      S = N.useCallback(() => {
        if (a.trigger && a.valueNode && c && d && v && y && b) {
          let e = a.trigger.getBoundingClientRect(),
            t = d.getBoundingClientRect(),
            n = a.valueNode.getBoundingClientRect(),
            i = b.getBoundingClientRect();
          if (a.dir !== `rtl`) {
            let r = i.left - t.left,
              a = n.left - r,
              o = e.left - a,
              s = e.width + o,
              l = Math.max(s, t.width),
              u = window.innerWidth - Y,
              d = F(a, [Y, Math.max(Y, u - l)]);
            ((c.style.minWidth = s + `px`), (c.style.left = d + `px`));
          } else {
            let r = t.right - i.right,
              a = window.innerWidth - n.right - r,
              o = window.innerWidth - e.right - a,
              s = e.width + o,
              l = Math.max(s, t.width),
              u = window.innerWidth - Y,
              d = F(a, [Y, Math.max(Y, u - l)]);
            ((c.style.minWidth = s + `px`), (c.style.right = d + `px`));
          }
          let o = m(),
            s = window.innerHeight - Y * 2,
            l = v.scrollHeight,
            u = window.getComputedStyle(d),
            f = parseInt(u.borderTopWidth, 10),
            p = parseInt(u.paddingTop, 10),
            h = parseInt(u.borderBottomWidth, 10),
            _ = parseInt(u.paddingBottom, 10),
            x = f + p + l + _ + h,
            S = Math.min(y.offsetHeight * 5, x),
            C = window.getComputedStyle(v),
            w = parseInt(C.paddingTop, 10),
            T = parseInt(C.paddingBottom, 10),
            E = e.top + e.height / 2 - Y,
            D = s - E,
            O = y.offsetHeight / 2,
            k = y.offsetTop + O,
            A = f + p + k,
            j = x - A;
          if (A <= E) {
            let e = o.length > 0 && y === o[o.length - 1].ref.current;
            c.style.bottom = `0px`;
            let t = d.clientHeight - v.offsetTop - v.offsetHeight,
              n = A + Math.max(D, O + (e ? T : 0) + t + h);
            c.style.height = n + `px`;
          } else {
            let e = o.length > 0 && y === o[0].ref.current;
            c.style.top = `0px`;
            let t = Math.max(E, f + v.offsetTop + (e ? w : 0) + O) + j;
            ((c.style.height = t + `px`), (v.scrollTop = A - E + v.offsetTop));
          }
          ((c.style.margin = `${Y}px 0`),
            (c.style.minHeight = S + `px`),
            (c.style.maxHeight = s + `px`),
            r?.(),
            requestAnimationFrame(() => (g.current = !0)));
        }
      }, [m, a.trigger, a.valueNode, c, d, v, y, b, a.dir, r]);
    h(() => S(), [S]);
    let [C, w] = N.useState();
    return (
      h(() => {
        d && w(window.getComputedStyle(d).zIndex);
      }, [d]),
      (0, I.jsx)(ke, {
        scope: n,
        contentWrapper: c,
        shouldExpandOnScrollRef: g,
        onScrollButtonChange: N.useCallback(
          (e) => {
            e && _.current === !0 && (S(), x?.(), (_.current = !1));
          },
          [S, x],
        ),
        children: (0, I.jsx)(`div`, {
          ref: u,
          style: {
            display: `flex`,
            flexDirection: `column`,
            position: `fixed`,
            zIndex: C,
          },
          children: (0, I.jsx)(l.div, {
            ...i,
            ref: p,
            style: { boxSizing: `border-box`, maxHeight: `100%`, ...i.style },
          }),
        }),
      })
    );
  });
Ee.displayName = Te;
var De = `SelectPopperPosition`,
  Oe = N.forwardRef((e, t) => {
    let {
        __scopeSelect: n,
        align: r = `start`,
        collisionPadding: i = Y,
        ...a
      } = e,
      o = G(n);
    return (0, I.jsx)(O, {
      ...o,
      ...a,
      ref: t,
      align: r,
      collisionPadding: i,
      style: {
        boxSizing: `border-box`,
        ...a.style,
        "--radix-select-content-transform-origin": `var(--radix-popper-transform-origin)`,
        "--radix-select-content-available-width": `var(--radix-popper-available-width)`,
        "--radix-select-content-available-height": `var(--radix-popper-available-height)`,
        "--radix-select-trigger-width": `var(--radix-popper-anchor-width)`,
        "--radix-select-trigger-height": `var(--radix-popper-anchor-height)`,
      },
    });
  });
Oe.displayName = De;
var [ke, Ae] = W(J, {}),
  je = `SelectViewport`,
  Me = N.forwardRef((e, t) => {
    let { __scopeSelect: n, nonce: r, ...i } = e,
      a = X(je, n),
      o = Ae(je, n),
      c = s(t, a.onViewportChange),
      d = N.useRef(0);
    return (0, I.jsxs)(I.Fragment, {
      children: [
        (0, I.jsx)(`style`, {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`,
          },
          nonce: r,
        }),
        (0, I.jsx)(H.Slot, {
          scope: n,
          children: (0, I.jsx)(l.div, {
            "data-radix-select-viewport": ``,
            role: `presentation`,
            ...i,
            ref: c,
            style: {
              position: `relative`,
              flex: 1,
              overflow: `hidden auto`,
              ...i.style,
            },
            onScroll: u(i.onScroll, (e) => {
              let t = e.currentTarget,
                { contentWrapper: n, shouldExpandOnScrollRef: r } = o;
              if (r?.current && n) {
                let e = Math.abs(d.current - t.scrollTop);
                if (e > 0) {
                  let r = window.innerHeight - Y * 2,
                    i = parseFloat(n.style.minHeight),
                    a = parseFloat(n.style.height),
                    o = Math.max(i, a);
                  if (o < r) {
                    let i = o + e,
                      a = Math.min(r, i),
                      s = i - a;
                    ((n.style.height = a + `px`),
                      n.style.bottom === `0px` &&
                        ((t.scrollTop = s > 0 ? s : 0),
                        (n.style.justifyContent = `flex-end`)));
                  }
                }
              }
              d.current = t.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
Me.displayName = je;
var Ne = `SelectGroup`,
  [Pe, Fe] = W(Ne),
  Ie = N.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e,
      i = d();
    return (0, I.jsx)(Pe, {
      scope: n,
      id: i,
      children: (0, I.jsx)(l.div, {
        role: `group`,
        "aria-labelledby": i,
        ...r,
        ref: t,
      }),
    });
  });
Ie.displayName = Ne;
var Le = `SelectLabel`,
  Re = N.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e,
      i = Fe(Le, n);
    return (0, I.jsx)(l.div, { id: i.id, ...r, ref: t });
  });
Re.displayName = Le;
var Z = `SelectItem`,
  [ze, Be] = W(Z),
  Ve = N.forwardRef((e, t) => {
    let {
        __scopeSelect: n,
        value: r,
        disabled: i = !1,
        textValue: a,
        ...o
      } = e,
      c = K(Z, n),
      f = X(Z, n),
      p = c.value === r,
      [m, h] = N.useState(a ?? ``),
      [g, _] = N.useState(!1),
      v = s(t, (e) => f.itemRefCallback?.(e, r, i)),
      y = d(),
      b = N.useRef(`touch`),
      x = () => {
        i || (c.onValueChange(r), c.onOpenChange(!1));
      };
    return (0, I.jsx)(ze, {
      scope: n,
      value: r,
      disabled: i,
      textId: y,
      isSelected: p,
      onItemTextChange: N.useCallback((e) => {
        h((t) => t || (e?.textContent ?? ``).trim());
      }, []),
      children: (0, I.jsx)(H.ItemSlot, {
        scope: n,
        value: r,
        disabled: i,
        textValue: m,
        children: (0, I.jsx)(l.div, {
          role: `option`,
          "aria-labelledby": y,
          "data-highlighted": g ? `` : void 0,
          "aria-selected": p && g,
          "data-state": p ? `checked` : `unchecked`,
          "aria-disabled": i || void 0,
          "data-disabled": i ? `` : void 0,
          tabIndex: i ? void 0 : -1,
          ...o,
          ref: v,
          onFocus: u(o.onFocus, () => _(!0)),
          onBlur: u(o.onBlur, () => _(!1)),
          onClick: u(o.onClick, () => {
            b.current !== `mouse` && x();
          }),
          onPointerUp: u(o.onPointerUp, () => {
            b.current === `mouse` && x();
          }),
          onPointerDown: u(o.onPointerDown, (e) => {
            b.current = e.pointerType;
          }),
          onPointerMove: u(o.onPointerMove, (e) => {
            ((b.current = e.pointerType),
              i
                ? f.onItemLeave?.()
                : b.current === `mouse` &&
                  e.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: u(o.onPointerLeave, (e) => {
            e.currentTarget === document.activeElement && f.onItemLeave?.();
          }),
          onKeyDown: u(o.onKeyDown, (e) => {
            (f.searchRef?.current !== `` && e.key === ` `) ||
              (B.includes(e.key) && x(), e.key === ` ` && e.preventDefault());
          }),
        }),
      }),
    });
  });
Ve.displayName = Z;
var Q = `SelectItemText`,
  He = N.forwardRef((e, t) => {
    let { __scopeSelect: n, className: r, style: i, ...a } = e,
      o = K(Q, n),
      c = X(Q, n),
      u = Be(Q, n),
      d = ae(Q, n),
      [f, p] = N.useState(null),
      m = s(
        t,
        (e) => p(e),
        u.onItemTextChange,
        (e) => c.itemTextRefCallback?.(e, u.value, u.disabled),
      ),
      g = f?.textContent,
      _ = N.useMemo(
        () =>
          (0, I.jsx)(
            `option`,
            { value: u.value, disabled: u.disabled, children: g },
            u.value,
          ),
        [u.disabled, u.value, g],
      ),
      { onNativeOptionAdd: v, onNativeOptionRemove: y } = d;
    return (
      h(() => (v(_), () => y(_)), [v, y, _]),
      (0, I.jsxs)(I.Fragment, {
        children: [
          (0, I.jsx)(l.span, { id: u.textId, ...a, ref: m }),
          u.isSelected && o.valueNode && !o.valueNodeHasChildren && !$(o.value)
            ? P.createPortal(a.children, o.valueNode)
            : null,
        ],
      })
    );
  });
He.displayName = Q;
var Ue = `SelectItemIndicator`,
  We = N.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e;
    return Be(Ue, n).isSelected
      ? (0, I.jsx)(l.span, { "aria-hidden": !0, ...r, ref: t })
      : null;
  });
We.displayName = Ue;
var Ge = `SelectScrollUpButton`,
  Ke = N.forwardRef((e, t) => {
    let n = X(Ge, e.__scopeSelect),
      r = Ae(Ge, e.__scopeSelect),
      [i, a] = N.useState(!1),
      o = s(t, r.onScrollButtonChange);
    return (
      h(() => {
        if (n.viewport && n.isPositioned) {
          let e = function () {
              a(t.scrollTop > 0);
            },
            t = n.viewport;
          return (
            e(),
            t.addEventListener(`scroll`, e),
            () => t.removeEventListener(`scroll`, e)
          );
        }
      }, [n.viewport, n.isPositioned]),
      i
        ? (0, I.jsx)(Ye, {
            ...e,
            ref: o,
            onAutoScroll: () => {
              let { viewport: e, selectedItem: t } = n;
              e && t && (e.scrollTop -= t.offsetHeight);
            },
          })
        : null
    );
  });
Ke.displayName = Ge;
var qe = `SelectScrollDownButton`,
  Je = N.forwardRef((e, t) => {
    let n = X(qe, e.__scopeSelect),
      r = Ae(qe, e.__scopeSelect),
      [i, a] = N.useState(!1),
      o = s(t, r.onScrollButtonChange);
    return (
      h(() => {
        if (n.viewport && n.isPositioned) {
          let e = function () {
              let e = t.scrollHeight - t.clientHeight;
              a(Math.ceil(t.scrollTop) < e);
            },
            t = n.viewport;
          return (
            e(),
            t.addEventListener(`scroll`, e),
            () => t.removeEventListener(`scroll`, e)
          );
        }
      }, [n.viewport, n.isPositioned]),
      i
        ? (0, I.jsx)(Ye, {
            ...e,
            ref: o,
            onAutoScroll: () => {
              let { viewport: e, selectedItem: t } = n;
              e && t && (e.scrollTop += t.offsetHeight);
            },
          })
        : null
    );
  });
Je.displayName = qe;
var Ye = N.forwardRef((e, t) => {
    let { __scopeSelect: n, onAutoScroll: r, ...i } = e,
      a = X(`SelectScrollButton`, n),
      o = N.useRef(null),
      s = U(n),
      c = N.useCallback(() => {
        o.current !== null &&
          (window.clearInterval(o.current), (o.current = null));
      }, []);
    return (
      N.useEffect(() => () => c(), [c]),
      h(() => {
        s()
          .find((e) => e.ref.current === document.activeElement)
          ?.ref.current?.scrollIntoView({ block: `nearest` });
      }, [s]),
      (0, I.jsx)(l.div, {
        "aria-hidden": !0,
        ...i,
        ref: t,
        style: { flexShrink: 0, ...i.style },
        onPointerDown: u(i.onPointerDown, () => {
          o.current === null && (o.current = window.setInterval(r, 50));
        }),
        onPointerMove: u(i.onPointerMove, () => {
          (a.onItemLeave?.(),
            o.current === null && (o.current = window.setInterval(r, 50)));
        }),
        onPointerLeave: u(i.onPointerLeave, () => {
          c();
        }),
      })
    );
  }),
  Xe = `SelectSeparator`,
  Ze = N.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e;
    return (0, I.jsx)(l.div, { "aria-hidden": !0, ...r, ref: t });
  });
Ze.displayName = Xe;
var Qe = `SelectArrow`,
  $e = N.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e,
      i = G(n);
    return X(Qe, n).position === `popper`
      ? (0, I.jsx)(E, { ...i, ...r, ref: t })
      : null;
  });
$e.displayName = Qe;
var et = `SelectBubbleInput`,
  tt = N.forwardRef(({ __scopeSelect: e, ...t }, n) => {
    let r = K(et, e),
      {
        value: i,
        onValueChange: a,
        required: o,
        disabled: c,
        name: u,
        autoComplete: d,
        form: f,
      } = r,
      { nativeOptions: p, nativeSelectKey: m } = r,
      h = N.useRef(null),
      g = s(n, h),
      v = i ?? ``,
      y = _(v),
      b = Array.from(p).some((e) => (e.props.value ?? ``) === ``);
    return (
      N.useEffect(() => {
        let e = h.current;
        if (!e) return;
        let t = window.HTMLSelectElement.prototype,
          n = Object.getOwnPropertyDescriptor(t, `value`).set;
        if (y !== v && n) {
          let t = new Event(`change`, { bubbles: !0 });
          (n.call(e, v), e.dispatchEvent(t));
        }
      }, [y, v]),
      (0, I.jsxs)(
        l.select,
        {
          "aria-hidden": !0,
          required: o,
          tabIndex: -1,
          name: u,
          autoComplete: d,
          disabled: c,
          form: f,
          onChange: (e) => a(e.target.value),
          ...t,
          style: { ...L, ...t.style },
          ref: g,
          defaultValue: v,
          children: [
            $(i) && !b ? (0, I.jsx)(`option`, { value: `` }) : null,
            Array.from(p),
          ],
        },
        m,
      )
    );
  });
tt.displayName = et;
function nt(e) {
  return typeof e == `function`;
}
function $(e) {
  return e === `` || e === void 0;
}
function rt(e) {
  let t = g(e),
    n = N.useRef(``),
    r = N.useRef(0),
    i = N.useCallback(
      (e) => {
        let i = n.current + e;
        (t(i),
          (function e(t) {
            ((n.current = t),
              window.clearTimeout(r.current),
              t !== `` && (r.current = window.setTimeout(() => e(``), 1e3)));
          })(i));
      },
      [t],
    ),
    a = N.useCallback(() => {
      ((n.current = ``), window.clearTimeout(r.current));
    }, []);
  return (
    N.useEffect(() => () => window.clearTimeout(r.current), []),
    [n, i, a]
  );
}
function it(e, t, n) {
  let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = at(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter((e) => e !== n));
  let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
  return o === n ? void 0 : o;
}
function at(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var ot = ce,
  st = fe,
  ct = N.forwardRef(({ className: e, children: t, ...n }, r) =>
    (0, I.jsxs)(ue, {
      ref: r,
      className: c(
        `flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        e,
      ),
      ...n,
      children: [
        t,
        (0, I.jsx)(me, {
          asChild: !0,
          children: (0, I.jsx)(j, { className: `h-4 w-4 opacity-50` }),
        }),
      ],
    }),
  );
ct.displayName = ue.displayName;
var lt = N.forwardRef(({ className: e, ...t }, n) =>
  (0, I.jsx)(Ke, {
    ref: n,
    className: c(`flex cursor-default items-center justify-center py-1`, e),
    ...t,
    children: (0, I.jsx)(M, { className: `h-4 w-4` }),
  }),
);
lt.displayName = Ke.displayName;
var ut = N.forwardRef(({ className: e, ...t }, n) =>
  (0, I.jsx)(Je, {
    ref: n,
    className: c(`flex cursor-default items-center justify-center py-1`, e),
    ...t,
    children: (0, I.jsx)(j, { className: `h-4 w-4` }),
  }),
);
ut.displayName = Je.displayName;
var dt = N.forwardRef(
  ({ className: e, children: t, position: n = `popper`, ...r }, i) =>
    (0, I.jsx)(ve, {
      children: (0, I.jsxs)(ye, {
        ref: i,
        className: c(
          `relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)`,
          n === `popper` &&
            `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
          e,
        ),
        position: n,
        ...r,
        children: [
          (0, I.jsx)(lt, {}),
          (0, I.jsx)(Me, {
            className: c(
              `p-1`,
              n === `popper` &&
                `h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]`,
            ),
            children: t,
          }),
          (0, I.jsx)(ut, {}),
        ],
      }),
    }),
);
dt.displayName = ye.displayName;
var ft = N.forwardRef(({ className: e, ...t }, n) =>
  (0, I.jsx)(Re, {
    ref: n,
    className: c(`px-2 py-1.5 text-sm font-semibold`, e),
    ...t,
  }),
);
ft.displayName = Re.displayName;
var pt = N.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, I.jsxs)(Ve, {
    ref: r,
    className: c(
      `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      e,
    ),
    ...n,
    children: [
      (0, I.jsx)(`span`, {
        className: `absolute right-2 flex h-3.5 w-3.5 items-center justify-center`,
        children: (0, I.jsx)(We, {
          children: (0, I.jsx)(a, { className: `h-4 w-4` }),
        }),
      }),
      (0, I.jsx)(He, { children: t }),
    ],
  }),
);
pt.displayName = Ve.displayName;
var mt = N.forwardRef(({ className: e, ...t }, n) =>
  (0, I.jsx)(Ze, { ref: n, className: c(`-mx-1 my-1 h-px bg-muted`, e), ...t }),
);
mt.displayName = Ze.displayName;
export { st as a, ct as i, dt as n, ee as o, pt as r, ot as t };
