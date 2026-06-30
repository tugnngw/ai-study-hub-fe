import { createFileRoute } from "@tanstack/react-router";
import { AdminTrashPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/trash")({
  component: AdminTrashPage,
});
