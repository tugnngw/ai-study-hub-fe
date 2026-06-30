import { createFileRoute } from "@tanstack/react-router";
import { PremiumUpgradePage } from "@/features/payment";

export const Route = createFileRoute("/_authenticated/premium")({
  component: PremiumUpgradePage,
});
