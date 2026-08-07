// src/routes/auth.register.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import type { RegisterRequest } from "@/lib/types";
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

const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Tối thiểu 3 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .regex(/^[a-zA-Z0-9_]+$/, "Chỉ gồm chữ, số và dấu gạch dưới"),
    fullName: z
      .string()
      .trim()
      .min(2, "Vui lòng nhập họ và tên")
      .max(30, "Tối đa 30 ký tự"),
    password: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .max(128, "Tối đa 128 ký tự"),
    confirmPassword: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .max(128, "Tối đa 128 ký tự"),
    email: z
      .string()
      .trim()
      .max(255, "Tối đa 255 ký tự")
      .email("Email không hợp lệ")
      .optional()
      .or(z.literal("")),
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
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
      const payload: RegisterRequest = {
        username: form.username,
        fullName: form.fullName,
        password: form.password,
      };
      if (form.email.trim()) {
        payload.email = form.email.trim();
      }
      await register(payload);
      if (form.email.trim()) {
        toast.success("Tạo tài khoản thành công! Vui lòng kiểm tra email để xác thực.");
        navigate({ to: "/verify-email" });
      } else {
        toast.success("Tạo tài khoản thành công! Chào mừng bạn.");
        navigate({ to: "/dashboard", replace: true });
      }
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
        <CardDescription>
          Bắt đầu tổ chức tài liệu học tập với AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="username">Tên đăng nhập</Label>
            </div>
            <Input
              id="username"
              autoComplete="username"
              value={form.username}
              onChange={update("username")}
              maxLength={50}
            />
            {errors.username && (
              <p className="text-xs text-destructive">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="fullName">Họ và tên</Label>
            </div>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={update("fullName")}
              maxLength={30}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="email">Email (không bắt buộc)</Label>
            </div>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={update("email")}
              maxLength={255}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mật khẩu (8–128 ký tự)</Label>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={update("password")}
              maxLength={128}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            </div>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              maxLength={128}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword}
              </p>
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
