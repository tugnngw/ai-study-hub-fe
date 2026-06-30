import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const emailSchema = z.string().email("Email không hợp lệ");

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { requestPasswordReset, verifyResetOtp } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await requestPasswordReset(email);
      toast.success("Mã OTP đã được gửi tới email của bạn");
      setStep("otp");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gửi mã OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Vui lòng nhập đủ 6 số");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await verifyResetOtp(email, otp);
      navigate({ to: "/auth/reset-password", search: { email } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Mã OTP không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Quên mật khẩu</CardTitle>
        <CardDescription>
          {step === "email"
            ? "Nhập email để nhận mã xác nhận OTP"
            : `Nhập mã OTP đã gửi tới ${email}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "email" ? (
          <form onSubmit={onSendOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={onVerifyOtp} className="space-y-4">
            <div className="space-y-2 flex flex-col items-center">
              <Label htmlFor="otp" className="self-start">
                Mã OTP
              </Label>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {error && (
                <p className="text-xs text-destructive self-start">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Đang xác nhận..." : "Xác nhận"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("email")}
            >
              Đổi email khác
            </Button>
          </form>
        )}
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
