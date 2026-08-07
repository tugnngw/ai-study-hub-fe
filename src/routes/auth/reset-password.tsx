import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
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

const searchSchema = z.object({
  email: z.string().optional().default(""),
  otp: z.string().optional().default(""),
});

const schema = z
  .object({
    password: z.string().min(8, "Tối thiểu 8 ký tự").max(128, "Tối đa 128 ký tự"),
    confirmPassword: z.string().min(8, "Tối thiểu 8 ký tự").max(128, "Tối đa 128 ký tự"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export const Route = createFileRoute("/auth/reset-password")({
  validateSearch: searchSchema,
  component: ResetPasswordPage,
});

function Counter({ value, max }: { value: number; max: number }) {
  return (
    <span className={`text-xs ml-auto ${value > max ? "text-destructive" : "text-muted-foreground"}`}>
      {value} / {max}
    </span>
  );
}

function ResetPasswordPage() {
  const { email, otp } = Route.useSearch();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email || otp) {
      window.history.replaceState({}, "", "/auth/reset-password");
    }
  }, [email, otp]);

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
      await resetPassword(email, otp, form.password);
      toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      navigate({ to: "/auth/login" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-display">
          Đặt lại mật khẩu
        </CardTitle>
        <CardDescription>
          Tạo mật khẩu mới cho tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mật khẩu mới</Label>
              <Counter value={form.password.length} max={128} />
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              maxLength={128}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              maxLength={128}
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
            disabled={loading}
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Đang lưu...</> : "Đổi mật khẩu"}
          </Button>
        </form>
        <Link
          to="/auth/login"
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại đăng nhập
        </Link>
      </CardContent>
    </Card>
  );
}
