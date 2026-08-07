import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/_authenticated/documents.tsx
var $$splitComponentImporter = () => import("./documents-Csmt1Jr4.js");
var Route = createFileRoute("/_authenticated/documents")({
	validateSearch: z.object({
		upload: z.string().optional(),
		newFolderId: z.string().optional()
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
