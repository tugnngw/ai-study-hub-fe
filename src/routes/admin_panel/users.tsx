import { createFileRoute } from "@tanstack/react-router";
import { AdminUsersPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/users")({
  component: AdminUsersPage,
});
