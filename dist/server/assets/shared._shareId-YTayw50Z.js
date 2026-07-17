import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/_authenticated/shared.$shareId.tsx
var $$splitComponentImporter = () => import("./shared._shareId-CQAGvaoA.js");
var searchSchema = z.object({ docId: z.string().optional() });
var Route = createFileRoute("/_authenticated/shared/$shareId")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
