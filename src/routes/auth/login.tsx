// src/routes/auth/login.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Facebook, AlertTriangle, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { authApi } from "@/lib/realApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  username: z.string().trim().min(1, "Vui lòng nhập tên đăng nhập"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [emailVerifyError, setEmailVerifyError] = useState(false);

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
    setEmailVerifyError(false);
    try {
      await login(form.username, form.password);
      toast.success("Chào mừng trở lại!");
      // Navigate after token saved
      await navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      console.error("❌ Login error:", err);
      const msg = err instanceof Error ? err.message : "Đăng nhập thất bại";
      if (
        msg.includes("xác thực") ||
        msg.includes("verify") ||
        msg.includes("Email chưa")
      ) {
        setEmailVerifyError(true);
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    try {
      // User not authenticated yet — use public endpoint with username
      await authApi.resendVerificationByUsername(form.username);
      toast.success("Email xác thực đã được gửi lại! Nếu tài khoản hợp lệ, bạn sẽ nhận được email.");
    } catch {
      toast.error("Không thể gửi lại email xác thực. Vui lòng thử lại sau.");
    }
  };

  const onSocialLogin = (provider: string) => {
    window.location.href = `${import.meta.env.VITE_API_BASE}/oauth2/authorization/google`;
  };

  return (
    <Card className="backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-display">
          Chào mừng trở lại
        </CardTitle>
        <CardDescription>
          Đăng nhập vào không gian làm việc AI Study Hub
        </CardDescription>
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
            {errors.username && (
              <p className="text-xs text-destructive">{errors.username}</p>
            )}
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
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          {emailVerifyError && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  <p className="font-medium mb-1">Email chưa được xác thực</p>
                  <p>Vui lòng kiểm tra hộp thư và nhấn vào liên kết xác thực.</p>
                  <button
                    type="button"
                    onClick={resendVerification}
                    className="inline-flex items-center gap-1 mt-2 text-primary hover:underline"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Gửi lại email xác thực
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="relative py-1">
            <Separator />
            <span className="absolute inset-0 -top-2.5 flex items-center justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">
                hoặc
              </span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onSocialLogin("Google")}
            >
              <Mail className="h-4 w-4" />
              Google
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
    </Card>
  );
}
