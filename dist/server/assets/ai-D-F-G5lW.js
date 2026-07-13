import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/_authenticated/ai.tsx
var $$splitComponentImporter = () => import("./ai-M9TdU-Eq.js");
var searchSchema = z.object({
	folderId: z.string(),
	docId: z.string().optional()
});
var Route = createFileRoute("/_authenticated/ai")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
