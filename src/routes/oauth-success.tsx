// src/routes/oauth-success.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { tokenStore, refreshTokens } from "@/lib/api";

export const Route = createFileRoute("/oauth-success")({
  component: OAuthSuccessPage,
});

function OAuthSuccessPage() {
  const navigate = useNavigate();
  const { reloadUser } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    const handleOAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      // Xóa token khỏi URL NGAY — trước khi lưu — để token không nằm lại
      // trong browser history / server logs.
      window.history.replaceState({}, "", "/oauth-success");

      if (!token) {
        navigate({ to: "/auth/login", replace: true });
        return;
      }

      tokenStore.set(token);
      if (refreshToken) {
        tokenStore.setRefresh(refreshToken);
      }

      try {
        await reloadUser();
      } catch {
        // reloadUser thất bại → thử refresh (single-flight, dùng token vừa lưu).
        if (refreshToken) {
          const ok = await refreshTokens();
          if (!ok) throw new Error("OAuth session could not be restored");
        } else {
          throw new Error("OAuth session could not be restored");
        }
      }

      navigate({
        to: "/dashboard",
        replace: true,
      });
    };

    if (!processed.current) {
      processed.current = true;
      handleOAuth();
    }
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
