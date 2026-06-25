import { createFileRoute } from "@tanstack/react-router";
import { AdminProfilePage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/profile")({
  component: AdminProfilePage,
});
