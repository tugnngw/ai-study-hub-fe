import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/_authenticated/folders.tsx
var $$splitComponentImporter = () => import("./folders-DU-f2Pmj.js");
var Route = createFileRoute("/_authenticated/folders")({
	validateSearch: z.object({ createFolder: z.string().optional() }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
