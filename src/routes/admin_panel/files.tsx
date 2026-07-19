import { createFileRoute } from "@tanstack/react-router";
import { AdminFilesPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/files")({
  component: AdminFilesPage,
});
