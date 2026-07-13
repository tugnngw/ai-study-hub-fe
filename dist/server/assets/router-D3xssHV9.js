import { t as AuthProvider } from "./auth-C8wjnF5I.js";
import { n as themeInitScript, t as ThemeProvider } from "./theme-DyHR6V10.js";
import { t as Route$31 } from "./reset-password-Hsv2ssMP.js";
import { t as Route$32 } from "./ai-D-F-G5lW.js";
import { t as Route$33 } from "./folders._id-BZVlRBGU.js";
import { t as Route$34 } from "./documents._id-DMLRrBTs.js";
import { Component, useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-BPthyNMX.css";
//#endregion
//#region src/lib/error-reporting.ts
function reportClientError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__errorReportingEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/lib/ErrorBoundary.tsx
var ErrorBoundary = class extends Component {
	state = {
		hasError: false,
		error: null
	};
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught:", error, errorInfo);
	}
	render() {
		if (this.state.hasError) return this.props.fallback || /* @__PURE__ */ jsx("div", {
			className: "min-h-screen flex items-center justify-center bg-background",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-md text-center",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold text-destructive mb-4",
						children: "Something went wrong"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground mb-6",
						children: this.state.error?.message || "An unexpected error occurred."
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => window.location.reload(),
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Reload page"
					})
				]
			})
		});
		return this.props.children;
	}
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportClientError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$30 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "DocuMind — AI Document Workspace" },
			{
				name: "description",
				content: "Organize documents and ask AI questions about them."
			},
			{
				property: "og:title",
				content: "DocuMind — AI Document Workspace"
			},
			{
				name: "twitter:title",
				content: "DocuMind — AI Document Workspace"
			},
			{
				property: "og:description",
				content: "Organize documents and ask AI questions about them."
			},
			{
				name: "twitter:description",
				content: "Organize documents and ask AI questions about them."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [/* @__PURE__ */ jsx(HeadContent, {}), /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: themeInitScript } })] }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$30.useRouteContext();
	return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] }) })
	}) });
}
//#endregion
//#region src/routes/oauth-success.tsx
var $$splitComponentImporter$28 = () => import("./oauth-success-CO-_ZeZF.js");
var Route$29 = createFileRoute("/oauth-success")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
//#endregion
//#region src/routes/auth/route.tsx
var $$splitNotFoundComponentImporter = () => import("./route-BmVhYqFh.js");
var $$splitComponentImporter$27 = () => import("./route-CY9EWtH7.js");
var Route$28 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$27, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
//#region src/routes/admin_panel/route.tsx
var $$splitComponentImporter$26 = () => import("./route-DHbZuKEx.js");
var Route$27 = createFileRoute("/admin_panel")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
//#endregion
//#region src/routes/_authenticated/route.tsx
var $$splitComponentImporter$25 = () => import("./route-bEZdKjJK.js");
var Route$26 = createFileRoute("/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$24 = () => import("./routes-mls_ZdWi.js");
var Route$25 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
//#endregion
//#region src/routes/auth/index.tsx
var Route$24 = createFileRoute("/auth/")({ beforeLoad: () => {
	throw redirect({ to: "/auth/login" });
} });
//#endregion
//#region src/routes/admin_panel/index.tsx
var $$splitComponentImporter$23 = () => import("./admin_panel-C0OSPl8n.js");
var Route$23 = createFileRoute("/admin_panel/")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
//#endregion
//#region src/routes/auth/register.tsx
var $$splitComponentImporter$22 = () => import("./register-DgDfMUzm.js");
var Route$22 = createFileRoute("/auth/register")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
//#endregion
//#region src/routes/auth/login.tsx
var $$splitComponentImporter$21 = () => import("./login-CaEcgrYD.js");
var Route$21 = createFileRoute("/auth/login")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
//#endregion
//#region src/routes/auth/forgot-password.tsx
var $$splitComponentImporter$20 = () => import("./forgot-password-e74fZ6a5.js");
var Route$20 = createFileRoute("/auth/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
//#endregion
//#region src/routes/admin_panel/users.tsx
var $$splitComponentImporter$19 = () => import("./users-cdHKLawF.js");
var Route$19 = createFileRoute("/admin_panel/users")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
//#endregion
//#region src/routes/admin_panel/trash.tsx
var $$splitComponentImporter$18 = () => import("./trash-ptNFlAAd.js");
var Route$18 = createFileRoute("/admin_panel/trash")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
//#endregion
//#region src/routes/admin_panel/transactions.tsx
var $$splitComponentImporter$17 = () => import("./transactions-l3LS0gtJ.js");
var Route$17 = createFileRoute("/admin_panel/transactions")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
//#endregion
//#region src/routes/admin_panel/report_history.tsx
var $$splitComponentImporter$16 = () => import("./report_history-m2P_tKda.js");
var Route$16 = createFileRoute("/admin_panel/report_history")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
//#endregion
//#region src/routes/admin_panel/profile.tsx
var $$splitComponentImporter$15 = () => import("./profile-UKUro2DM.js");
var Route$15 = createFileRoute("/admin_panel/profile")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
//#endregion
//#region src/routes/admin_panel/premium.tsx
var $$splitComponentImporter$14 = () => import("./premium-BJ9Xf5Gn.js");
var Route$14 = createFileRoute("/admin_panel/premium")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
//#endregion
//#region src/routes/admin_panel/files.tsx
var $$splitComponentImporter$13 = () => import("./files-DVH_Hoe7.js");
var Route$13 = createFileRoute("/admin_panel/files")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
//#endregion
//#region src/routes/admin_panel/approvals.tsx
var $$splitComponentImporter$12 = () => import("./approvals-sgYxfJAG.js");
var Route$12 = createFileRoute("/admin_panel/approvals")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
//#endregion
//#region src/routes/_authenticated/trash.tsx
var $$splitComponentImporter$11 = () => import("./trash-DGpvuN00.js");
var Route$11 = createFileRoute("/_authenticated/trash")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
//#endregion
//#region src/routes/_authenticated/transactions.tsx
var $$splitComponentImporter$10 = () => import("./transactions-DuveI28M.js");
var Route$10 = createFileRoute("/_authenticated/transactions")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
//#endregion
//#region src/routes/_authenticated/shared.tsx
var $$splitComponentImporter$9 = () => import("./shared-DyEuCUeG.js");
var Route$9 = createFileRoute("/_authenticated/shared")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
//#endregion
//#region src/routes/_authenticated/profile.tsx
var $$splitComponentImporter$8 = () => import("./profile-CCi7aFHy.js");
var Route$8 = createFileRoute("/_authenticated/profile")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
//#endregion
//#region src/routes/_authenticated/premium.tsx
var $$splitComponentImporter$7 = () => import("./premium--J6DzD8v.js");
var Route$7 = createFileRoute("/_authenticated/premium")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/_authenticated/folders.tsx
var $$splitComponentImporter$6 = () => import("./folders-YO7Zg7bd.js");
var Route$6 = createFileRoute("/_authenticated/folders")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/_authenticated/documents.tsx
var $$splitComponentImporter$5 = () => import("./documents-ByPc_aXf.js");
var Route$5 = createFileRoute("/_authenticated/documents")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/_authenticated/dashboard.tsx
var $$splitComponentImporter$4 = () => import("./dashboard-DhEmbXRI.js");
var Route$4 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/_authenticated/cloud.tsx
var $$splitComponentImporter$3 = () => import("./cloud-BF-u3Fly.js");
var Route$3 = createFileRoute("/_authenticated/cloud")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/_authenticated/admin.tsx
var $$splitComponentImporter$2 = () => import("./admin-BWvleQVi.js");
var Route$2 = createFileRoute("/_authenticated/admin")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/_authenticated/payment.success.tsx
var $$splitComponentImporter$1 = () => import("./payment.success-BTk4WPtd.js");
var Route$1 = createFileRoute("/_authenticated/payment/success")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/_authenticated/payment.cancel.tsx
var $$splitComponentImporter = () => import("./payment.cancel-DADbB9bx.js");
var Route = createFileRoute("/_authenticated/payment/cancel")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var OauthSuccessRoute = Route$29.update({
	id: "/oauth-success",
	path: "/oauth-success",
	getParentRoute: () => Route$30
});
var AuthRouteRoute = Route$28.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$30
});
var Admin_panelRouteRoute = Route$27.update({
	id: "/admin_panel",
	path: "/admin_panel",
	getParentRoute: () => Route$30
});
var AuthenticatedRouteRoute = Route$26.update({
	id: "/_authenticated",
	getParentRoute: () => Route$30
});
var IndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$30
});
var AuthIndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthRouteRoute
});
var Admin_panelIndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => Admin_panelRouteRoute
});
var AuthResetPasswordRoute = Route$31.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => AuthRouteRoute
});
var AuthRegisterRoute = Route$22.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => AuthRouteRoute
});
var AuthLoginRoute = Route$21.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AuthRouteRoute
});
var AuthForgotPasswordRoute = Route$20.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => AuthRouteRoute
});
var Admin_panelUsersRoute = Route$19.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => Admin_panelRouteRoute
});
var Admin_panelTrashRoute = Route$18.update({
	id: "/trash",
	path: "/trash",
	getParentRoute: () => Admin_panelRouteRoute
});
var Admin_panelTransactionsRoute = Route$17.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => Admin_panelRouteRoute
});
var Admin_panelReport_historyRoute = Route$16.update({
	id: "/report_history",
	path: "/report_history",
	getParentRoute: () => Admin_panelRouteRoute
});
var Admin_panelProfileRoute = Route$15.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Admin_panelRouteRoute
});
var Admin_panelPremiumRoute = Route$14.update({
	id: "/premium",
	path: "/premium",
	getParentRoute: () => Admin_panelRouteRoute
});
var Admin_panelFilesRoute = Route$13.update({
	id: "/files",
	path: "/files",
	getParentRoute: () => Admin_panelRouteRoute
});
var Admin_panelApprovalsRoute = Route$12.update({
	id: "/approvals",
	path: "/approvals",
	getParentRoute: () => Admin_panelRouteRoute
});
var AuthenticatedTrashRoute = Route$11.update({
	id: "/trash",
	path: "/trash",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTransactionsRoute = Route$10.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSharedRoute = Route$9.update({
	id: "/shared",
	path: "/shared",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$8.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPremiumRoute = Route$7.update({
	id: "/premium",
	path: "/premium",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFoldersRoute = Route$6.update({
	id: "/folders",
	path: "/folders",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDocumentsRoute = Route$5.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCloudRoute = Route$3.update({
	id: "/cloud",
	path: "/cloud",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAiRoute = Route$32.update({
	id: "/ai",
	path: "/ai",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRoute = Route$2.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPaymentSuccessRoute = Route$1.update({
	id: "/payment/success",
	path: "/payment/success",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPaymentCancelRoute = Route.update({
	id: "/payment/cancel",
	path: "/payment/cancel",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFoldersIdRoute = Route$33.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedFoldersRoute
});
var AuthenticatedDocumentsRouteChildren = { AuthenticatedDocumentsIdRoute: Route$34.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedDocumentsRoute
}) };
var AuthenticatedDocumentsRouteWithChildren = AuthenticatedDocumentsRoute._addFileChildren(AuthenticatedDocumentsRouteChildren);
var AuthenticatedFoldersRouteChildren = { AuthenticatedFoldersIdRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute,
	AuthenticatedAiRoute,
	AuthenticatedCloudRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedDocumentsRoute: AuthenticatedDocumentsRouteWithChildren,
	AuthenticatedFoldersRoute: AuthenticatedFoldersRoute._addFileChildren(AuthenticatedFoldersRouteChildren),
	AuthenticatedPremiumRoute,
	AuthenticatedProfileRoute,
	AuthenticatedSharedRoute,
	AuthenticatedTransactionsRoute,
	AuthenticatedTrashRoute,
	AuthenticatedPaymentCancelRoute,
	AuthenticatedPaymentSuccessRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var Admin_panelRouteRouteChildren = {
	Admin_panelApprovalsRoute,
	Admin_panelFilesRoute,
	Admin_panelPremiumRoute,
	Admin_panelProfileRoute,
	Admin_panelReport_historyRoute,
	Admin_panelTransactionsRoute,
	Admin_panelTrashRoute,
	Admin_panelUsersRoute,
	Admin_panelIndexRoute
};
var Admin_panelRouteRouteWithChildren = Admin_panelRouteRoute._addFileChildren(Admin_panelRouteRouteChildren);
var AuthRouteRouteChildren = {
	AuthForgotPasswordRoute,
	AuthLoginRoute,
	AuthRegisterRoute,
	AuthResetPasswordRoute,
	AuthIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	Admin_panelRouteRoute: Admin_panelRouteRouteWithChildren,
	AuthRouteRoute: AuthRouteRoute._addFileChildren(AuthRouteRouteChildren),
	OauthSuccessRoute
};
var routeTree = Route$30._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
