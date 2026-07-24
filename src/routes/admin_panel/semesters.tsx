import { createFileRoute } from "@tanstack/react-router";
import { AdminSemestersPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/semesters")({
  component: AdminSemestersPage,
});
