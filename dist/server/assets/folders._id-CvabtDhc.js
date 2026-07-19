import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/_authenticated/folders.$id.tsx
var $$splitComponentImporter = () => import("./folders._id-BqVufl8O.js");
var searchSchema = z.object({ docId: z.coerce.number().optional() });
var Route = createFileRoute("/_authenticated/folders/$id")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
