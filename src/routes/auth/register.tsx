// src/routes/auth.register.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z
    .object({
      username: z
          .string()
          .trim()
          .min(3, "Tối thiểu 3 ký tự")
          .max(10, "Tối đa 10 ký tự")
          .regex(/^[a-zA-Z0-9_]+$/, "Chỉ gồm chữ, số và dấu gạch dưới"),
      fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên").max(30, "Tối đa 30 ký tự"),
      email: z.string().email("Email không hợp lệ").max(40, "Tối đa 40 ký tự"),
      password: z.string().min(6, "Tối thiểu 6 ký tự"),
      confirmPassword: z.string().min(6, "Tối thiểu 6 ký tự"),
    })
    .refine((d) => d.password === d.confirmPassword, {
      path: ["confirmPassword"],
      message: "Mật khẩu xác nhận không khớp",
    });

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

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
      await register({
        username: form.username,
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      toast.success("Tạo tài khoản thành công! Vui lòng đăng nhập.");
      navigate({ to: "/auth/login" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Card className="backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-display">Tạo tài khoản</CardTitle>
          <CardDescription>Bắt đầu tổ chức tài liệu học tập với AI</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập (tối đa 10 ký tự)</Label>
              <Input
                  id="username"
                  autoComplete="username"
                  value={form.username}
                  onChange={update("username")}
              />
              {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên (tối đa 30 ký tự)</Label>
              <Input id="fullName" value={form.fullName} onChange={update("fullName")} />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (tối đa 40 ký tự)</Label>
              <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu (tối thiểu 6 ký tự)</Label>
              <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={update("password")}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={update("confirmPassword")}
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
              {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Đã có tài khoản?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
  );
}