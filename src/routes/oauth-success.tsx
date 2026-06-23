// src/routes/oauth-success.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/oauth-success")({
  component: OAuthSuccessPage,
});

function OAuthSuccessPage() {
  const navigate = useNavigate();
  const { refresh } = useAuth();

  useEffect(() => {
    const handleOAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token");
      const userId = params.get("user_id");

      if (!token) {
        navigate({ to: "/auth/login", replace: true });
        return;
      }

      localStorage.setItem("auth_token", token);

      if (userId) {
        localStorage.setItem("user_id", userId);
      }

      await refresh();

      navigate({
        to: "/dashboard",
        replace: true,
      });
    };

    handleOAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
