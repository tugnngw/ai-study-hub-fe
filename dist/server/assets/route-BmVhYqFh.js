import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/auth/route.tsx?tsr-split=notFoundComponent
function AuthNotFoundComponent() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex items-center justify-center bg-background relative overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 -z-10 opacity-40",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" }), /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md p-4 text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-4xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "This auth page doesn't exist."
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/auth/login",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
					children: "Back to login"
				})
			]
		})]
	});
}
//#endregion
export { AuthNotFoundComponent as notFoundComponent };
