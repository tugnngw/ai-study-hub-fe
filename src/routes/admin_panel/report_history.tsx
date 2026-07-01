import { createFileRoute } from "@tanstack/react-router";
import { AdminReportHistoryPage } from "@/features/admin";

export const Route = createFileRoute("/admin_panel/report_history")({
  component: AdminReportHistoryPage,
});
