import { Outlet } from "react-router-dom";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";

export function AdminLayout() {
  // Việc kiểm tra quyền truy cập (chỉ ADMIN) do BE đảm nhiệm — FE không guard ở đây.
  // Người dùng vào cổng quản trị qua trang đăng nhập riêng /admin/login.
  return (
    <div className="w-full min-h-screen bg-[#F7F7FB] flex font-sans text-black antialiased">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
