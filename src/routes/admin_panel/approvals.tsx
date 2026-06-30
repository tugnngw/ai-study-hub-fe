import { createFileRoute } from "@tanstack/react-router";
import { AdminApprovalsPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/approvals")({
  component: AdminApprovalsPage,
});
