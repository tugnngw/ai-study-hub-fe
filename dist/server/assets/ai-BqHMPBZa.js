import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/_authenticated/ai.tsx
var $$splitComponentImporter = () => import("./ai-zz2MbSM6.js");
var Route = createFileRoute("/_authenticated/ai")({
	validateSearch: z.object({
		f: z.string().optional(),
		d: z.string().optional()
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
