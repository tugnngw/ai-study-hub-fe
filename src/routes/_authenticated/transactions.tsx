import { createFileRoute } from "@tanstack/react-router";
import { TransactionHistoryPage } from "@/features/payment";

export const Route = createFileRoute("/_authenticated/transactions")({
  component: TransactionHistoryPage,
});
