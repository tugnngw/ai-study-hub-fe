import { createFileRoute } from "@tanstack/react-router";
import { SharePage } from "@/features/shares";

export const Route = createFileRoute("/_authenticated/shared")({
  component: SharePage,
});
