import { Outlet } from "react-router-dom";

import { AppShell } from "@/components/app-shell";

export function AuthLayout() {
  // Auth guard disabled — FE-only mode. Re-enable when backend is connected.
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
