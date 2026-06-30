import { createFileRoute } from "@tanstack/react-router";
import { AdminPremiumPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/premium")({
  component: AdminPremiumPage,
});
