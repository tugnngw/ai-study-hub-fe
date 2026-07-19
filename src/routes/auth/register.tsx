<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// src/routes/auth.register.tsx
=======
// src/routes/auth/register.tsx
>>>>>>> origin/test/share-document-cloudinary
=======
// src/routes/auth.register.tsx
>>>>>>> origin/uichange
=======
// src/routes/auth.register.tsx
>>>>>>> origin/admin-added
=======
// src/routes/auth.register.tsx
>>>>>>> origin/update/feature/share
=======
// src/routes/auth.register.tsx
>>>>>>> origin/update/feature/AI/Quiz
=======
// src/routes/auth.register.tsx
>>>>>>> origin/Flashcards-fix
=======
// src/routes/auth.register.tsx
>>>>>>> origin/admin-added-fix
=======
// src/routes/auth.register.tsx
>>>>>>> origin/Flashcars
=======
// src/routes/auth.register.tsx
>>>>>>> origin/final/demo-v1
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { ArrowLeft } from "lucide-react";
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Tối thiểu 3 ký tự")
      .max(10, "Tối đa 10 ký tự")
      .regex(/^[a-zA-Z0-9_]+$/, "Chỉ gồm chữ, số và dấu gạch dưới"),
    fullName: z
      .string()
      .trim()
      .min(2, "Vui lòng nhập họ và tên")
      .max(30, "Tối đa 30 ký tự"),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    birthDay: z.string().min(1, "Chọn ngày"),
    birthMonth: z.string().min(1, "Chọn tháng"),
    birthYear: z.string().min(1, "Chọn năm"),
    gender: z.string().min(1, "Chọn giới tính"),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
    email: z.string().trim().email("Email không hợp lệ"),
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 70 }, (_, i) => String(CURRENT_YEAR - i));

const initial = {
  username: "",
  fullName: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  gender: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      // NOTE: backend hiện chỉ nhận username, fullName, password.
      // Khi backend bổ sung birthday/gender/phone/email thì thêm
      // các field tương ứng vào đối tượng dưới đây (và RegisterRequest type).
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
      await register({
        username: form.username,
        fullName: form.fullName,
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
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
            <Label htmlFor="username">Tên đăng nhập (tối đa 10 ký tự)</Label>
            <Input
              id="username"
              autoComplete="username"
              value={form.username}
              onChange={update("username")}
            />
            {errors.username && (
              <p className="text-xs text-destructive">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên (tối đa 30 ký tự)</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={update("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
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
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-500 py-8 px-4 flex items-start justify-center">
      <div className="w-full max-w-xl bg-card rounded-3xl shadow-2xl p-8 my-auto">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            type="button"
            onClick={() => navigate({ to: "/auth/login" })}
            className="absolute left-0 h-9 w-9 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Quay lại"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold font-display">Tạo Tài Khoản</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Tên đăng nhập */}
          <Field label="Tên Đăng Nhập" error={errors.username}>
            <Input
              placeholder="Nhập tên đăng nhập"
              autoComplete="username"
              value={form.username}
              onChange={(e) => set("username", e.target.value)}
            />
          </Field>

          {/* Họ và tên */}
          <Field label="Họ và Tên" error={errors.fullName}>
            <Input
              placeholder="Nhập họ và tên"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
            />
          </Field>

          {/* Ngày sinh */}
          <Field
            label="Ngày Sinh"
            error={errors.birthDay || errors.birthMonth || errors.birthYear}
          >
            <div className="grid grid-cols-3 gap-3">
              <Select
                value={form.birthDay}
                onValueChange={(v) => set("birthDay", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ngày" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={form.birthMonth}
                onValueChange={(v) => set("birthMonth", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tháng" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m) => (
                    <SelectItem key={m} value={m}>
                      Tháng {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={form.birthYear}
                onValueChange={(v) => set("birthYear", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Năm" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Field>

          {/* Giới tính */}
          <Field label="Giới Tính" error={errors.gender}>
            <Select
              value={form.gender}
              onValueChange={(v) => set("gender", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Số điện thoại */}
          <Field label="Số Điện Thoại" error={errors.phone}>
            <Input
              placeholder="Số điện thoại"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>

          {/* Email */}
          <Field label="Email" error={errors.email}>
            <Input
              type="email"
              placeholder="your.email@example.com"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>

          {/* Mật khẩu */}
          <Field label="Mật Khẩu" error={errors.password}>
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
            />
          </Field>

          {/* Xác nhận mật khẩu */}
          <Field label="Xác Nhận Mật Khẩu" error={errors.confirmPassword}>
            <Input
              type="password"
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
            />
          </Field>

          <p className="text-[11px] text-muted-foreground text-center pt-1">
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với{" "}
            <span className="text-primary">Điều khoản</span> và{" "}
            <span className="text-primary">Chính sách quyền riêng tư</span> của
            chúng tôi.
          </p>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-brand shadow-brand hover:opacity-90 font-semibold tracking-wide"
            disabled={loading}
          >
            {loading ? "ĐANG TẠO..." : "ĐĂNG KÝ"}
          </Button>

          <p className="text-sm text-center text-foreground">
            Đã có tài khoản?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
              Đăng nhập
            </Link>
          </p>
        </form>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      </CardContent>
    </Card>
=======
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="font-semibold">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
>>>>>>> origin/test/share-document-cloudinary
  );
}
=======
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
      </CardContent>
    </Card>
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
