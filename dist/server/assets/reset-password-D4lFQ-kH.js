import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/auth/reset-password.tsx
var $$splitComponentImporter = () => import("./reset-password-CZcQq0N2.js");
var searchSchema = z.object({ email: z.string().optional().default("") });
var Route = createFileRoute("/auth/reset-password")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
