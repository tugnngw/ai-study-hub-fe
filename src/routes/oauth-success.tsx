// src/routes/oauth-success.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { tokenStore } from "@/lib/api"; // Import tokenStore
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
import { tokenStore } from "@/lib/api"; // Import tokenStore
>>>>>>> origin/admin-added
=======
import { tokenStore } from "@/lib/api"; // Import tokenStore
>>>>>>> origin/update/feature/share
=======
import { tokenStore } from "@/lib/api"; // Import tokenStore
>>>>>>> origin/update/feature/AI/Quiz
=======
import { tokenStore } from "@/lib/api"; // Import tokenStore
>>>>>>> origin/Flashcards-fix
=======
import { tokenStore } from "@/lib/api"; // Import tokenStore
>>>>>>> origin/admin-added-fix

export const Route = createFileRoute("/oauth-success")({
  component: OAuthSuccessPage,
});

function OAuthSuccessPage() {
  const navigate = useNavigate();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  const { refresh } = useAuth(); // useAuth hook để gọi hàm refresh
  const hasRunRef = useRef(false); // Track if effect has already run

  useEffect(() => {
    // Prevent running multiple times due to StrictMode or re-renders
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const handleOAuth = async () => {
      // DEBUG: Log the full URL to understand what's being passed
      console.log("=============== OAUTH DEBUG ===============");
      console.log("Full URL:", window.location.href);
      console.log("Search params:", window.location.search);

      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");
      const userId = params.get("user_id");
      const refreshToken = params.get("refresh_token"); // Lấy refresh_token từ URL

      console.log("Parsed parameters:");
      console.log("  accessToken:", accessToken ? `${accessToken.substring(0, 20)}...` : "NULL");
      console.log("  refreshToken:", refreshToken ? `${refreshToken.substring(0, 20)}...` : "NULL");
      console.log("  userId:", userId);

      // Log all available parameters
      console.log("All URL parameters:");
      for (const [key, value] of params.entries()) {
        console.log(`  ${key}: ${String(value).substring(0, 30)}...`);
      }
      console.log("=========================================");

      // Kiểm tra xem tất cả các thông tin cần thiết có tồn tại không
      if (!accessToken || !refreshToken || !userId) {
        console.error("OAuth failed: Missing access token, refresh token, or user ID in URL.");
        console.error(`Missing: ${!accessToken ? "accessToken " : ""}${!refreshToken ? "refreshToken " : ""}${!userId ? "userId" : ""}`);
        // Nếu thiếu, chuyển hướng về trang login
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
        navigate({ to: "/auth/login", replace: true });
        return;
      }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
      // Lưu tokens và user ID vào localStorage
      tokenStore.set(accessToken);           // Lưu access_token
      tokenStore.setRefresh(refreshToken);   // Lưu refresh_token
      localStorage.setItem("user_id", userId); // Lưu user_id

      console.log("OAuth successful. Tokens and user ID stored.");

      // Gọi hàm refresh của useAuth (nó sẽ fetch user info)
      try {
        await refresh(); // Hàm refresh này sẽ gọi accountApi.me() và cập nhật user context
      } catch (error) {
        console.error("Failed to fetch user info after OAuth success:", error);
        // Nếu fetch user info sau khi refresh thất bại, điều hướng về login
        navigate({ to: "/auth/login", replace: true }); // Giả định có /login route
        return;
      }

      // Sau khi xử lý thành công, điều hướng đến trang dashboard
      navigate({
        to: "/dashboard", // Thay '/dashboard' bằng route thực tế của bạn
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
        replace: true,
      });
    };

    handleOAuth();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  }, []); // ⚠️ Empty dependency array - only run once on mount
=======
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
>>>>>>> origin/test/share-document-cloudinary
=======
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
>>>>>>> origin/uichange
=======
  }, []); // ⚠️ Empty dependency array - only run once on mount
>>>>>>> origin/admin-added
=======
  }, []); // ⚠️ Empty dependency array - only run once on mount
>>>>>>> origin/update/feature/share
=======
  }, []); // ⚠️ Empty dependency array - only run once on mount
>>>>>>> origin/update/feature/AI/Quiz
=======
  }, []); // ⚠️ Empty dependency array - only run once on mount
>>>>>>> origin/Flashcards-fix
=======
  }, []); // ⚠️ Empty dependency array - only run once on mount
>>>>>>> origin/admin-added-fix

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
