// src/routes/oauth-success.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/oauth-success")({
  component: OAuthSuccessPage,
});

function OAuthSuccessPage() {
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const processed = useRef(false);

  console.log("📱 OAuthSuccessPage MOUNTED");

  useEffect(() => {
    console.log("📱 OAuthSuccessPage useEffect FIRED");
    const handleOAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token");
      const userId = params.get("user_id");

      console.log("📱 OAuthSuccessPage: token exists?", !!token, "userId exists?", !!userId);

      if (!token) {
        console.log("📱 OAuthSuccessPage: NO TOKEN, redirecting to /auth/login");
        navigate({ to: "/auth/login", replace: true });
        return;
      }

      console.log("📱 OAuthSuccessPage: SAVING token to localStorage");
      localStorage.setItem("auth_token", token);

      if (userId) {
        console.log("📱 OAuthSuccessPage: SAVING userId to localStorage");
        localStorage.setItem("user_id", userId);
      }

      console.log("📱 OAuthSuccessPage: CALLING refresh()");
      await refresh();
      console.log("📱 OAuthSuccessPage: refresh() COMPLETED");

      console.log("📱 OAuthSuccessPage: NAVIGATING to /dashboard");
      navigate({
        to: "/dashboard",
        replace: true,
      });
    };

    handleOAuth();
   // eslint-disable-next-line react-hooks/exhaustive-deps
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
