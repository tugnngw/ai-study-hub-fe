import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Facebook, ShieldCheck, Home } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  username: z.string().trim().min(1, "Vui lòng nhập tên đăng nhập"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const u = await login(form.username, form.password);
      toast.success("Chào mừng trở lại!");
      // Admin -> khu quản trị, user thường -> dashboard
      navigate(u.role === "ADMIN" ? "/admin" : "/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const onSocialLogin = (provider: string) => {
    toast.info(`Đăng nhập bằng ${provider} sẽ sớm được hỗ trợ`);
  };

  return (
    <Card className="backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Chào mừng trở lại</CardTitle>
        <CardDescription>Đăng nhập vào không gian làm việc AI Study Hub</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link
                to="/auth/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">hoặc</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onSocialLogin("Gmail")}
            >
              <Mail className="h-4 w-4" />
              Gmail
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onSocialLogin("Facebook")}
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Chưa có tài khoản?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </CardContent>
      <div className="border-t border-border/60 px-6 py-4 flex items-center justify-center gap-5">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-3.5 w-3.5" />
          Về trang chủ
        </Link>
        <span className="h-3.5 w-px bg-border" />
        <button
          type="button"
          onClick={() => navigate("/admin/login")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Cổng quản trị
        </button>
      </div>
    </Card>
  );
}
