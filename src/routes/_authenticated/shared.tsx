import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SharePage } from "@/features/shares";

export const Route = createFileRoute("/_authenticated/shared")({
  component: SharedLayout,
});

function SharedLayout() {
  const isExactIndex = useMatchRoute()({ to: "/shared" });

  if (isExactIndex) {
    return <SharePage />;
  }

  return <Outlet />;
}
