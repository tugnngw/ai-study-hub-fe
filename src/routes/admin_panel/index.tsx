import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboardPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/")({
  component: AdminDashboardPage,
});
