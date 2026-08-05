import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentViewer } from "@/components/document-viewer/DocumentViewer";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  const { isAuthenticated, isInitializing, user } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated and not initializing.
    if (!isInitializing && !isAuthenticated) {
      // Use navigate for client-side routing if preferred, but window.location.href
      // works directly for immediate redirection, especially during initial load.
      window.location.href = "/auth/login";
    }
  }, [isAuthenticated, isInitializing, user]);

  // Redirect khi phiên hết hạn giữa chừng (401 → refresh thất bại).
  useEffect(() => {
    const handleUnauthorized = () => {
      window.location.href = "/auth/login";
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

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

  // If not authenticated after init, do not render anything to avoid flashing login.
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
