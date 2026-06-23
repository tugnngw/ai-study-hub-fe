import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/_authenticated/ai.tsx
var $$splitComponentImporter = () => import("./ai-rpMOB6yA.js");
var searchSchema = z.object({
	folderId: z.string(),
	docId: z.coerce.number().optional()
});
var Route = createFileRoute("/_authenticated/ai")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
