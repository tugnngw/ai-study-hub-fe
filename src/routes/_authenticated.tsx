import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  // Auth guard disabled — FE-only mode. Re-enable when backend is connected.
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
