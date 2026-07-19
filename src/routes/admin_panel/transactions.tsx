import { createFileRoute } from "@tanstack/react-router";
import { AdminTransactionsPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/transactions")({
  component: AdminTransactionsPage,
});
