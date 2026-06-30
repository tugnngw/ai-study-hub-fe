import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useForceLightTheme } from "@/lib/theme";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  // Các trang xác thực (đăng nhập, đăng ký, quên/đặt lại mật khẩu) luôn
  // hiển thị ở chế độ sáng, bất kể người dùng đã từng bật dark mode ở nơi
  // khác.
  useForceLightTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>
      <div className="w-full max-w-md p-4">
        <Outlet />
      </div>
    </div>
  );
}
