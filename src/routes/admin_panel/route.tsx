import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { AdminShell } from "@/features/admin";

export const Route = createFileRoute("/admin_panel")({
  component: AdminLayoutRoute,
});

function AdminLayoutRoute() {
  const { isAuthenticated, isInitializing, user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (isInitializing) return;
    if (!isAuthenticated) navigate({ to: "/auth/login", replace: true });
    else if (!isAdmin) navigate({ to: "/dashboard", replace: true });
  }, [isAuthenticated, isInitializing, isAdmin, navigate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated || !isAdmin) return null;
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
