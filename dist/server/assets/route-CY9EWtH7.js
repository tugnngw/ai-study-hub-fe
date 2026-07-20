import { Outlet } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/auth/route.tsx?tsr-split=component
function AuthLayout() {
  return /* @__PURE__ */ jsxs("div", {
    className:
      "min-h-screen flex items-center justify-center bg-background relative overflow-hidden",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "absolute inset-0 -z-10 opacity-40",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "absolute top-0 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl",
          }),
          /* @__PURE__ */ jsx("div", {
            className:
              "absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl",
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "w-full max-w-md p-4",
        children: /* @__PURE__ */ jsx(Outlet, {}),
      }),
    ],
  });
}
//#endregion
export { AuthLayout as component };
