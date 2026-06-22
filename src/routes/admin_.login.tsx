import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth";

// Route phẳng /admin/login — hậu tố "_" để KHÔNG bị bọc layout _admin (sidebar).
export const Route = createFileRoute("/admin_/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success("Đăng nhập quản trị thành công");
      // Quyền truy cập do BE kiểm soát; FE chỉ điều hướng vào cổng quản trị.
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1020] px-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-7">
          <div className="h-14 w-14 rounded-2xl bg-gradient-brand mx-auto flex items-center justify-center shadow-brand">
            <ShieldCheck className="h-7 w-7 text-white" strokeWidth={2.2} />
          </div>
          <h1 className="font-display font-bold text-2xl text-white mt-4">Cổng quản trị</h1>
          <p className="text-white/50 text-sm mt-1">Đăng nhập bằng tài khoản quản trị viên</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl p-7 shadow-2xl space-y-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Tên đăng nhập</label>
            <input
              autoFocus
              value={form.username}
              onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
              placeholder="admin"
              className="w-full h-11 rounded-xl border border-input px-3.5 text-[14px] outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Mật khẩu</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full h-11 rounded-xl border border-input px-3.5 text-[14px] outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-brand text-white font-semibold text-[14px] hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <div className="flex flex-col items-center gap-2 pt-1">
            <Link to="/auth/login" className="flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Quay lại đăng nhập người dùng
            </Link>
            <Link to="/" className="text-[13px] text-muted-foreground hover:text-foreground">
              Về trang chủ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
