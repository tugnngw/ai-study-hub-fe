// src/routes/auth/verify-email.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authApi } from "@/lib/realApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
});

type VerifyState = "idle" | "verifying" | "success" | "error";

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<VerifyState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) return;

    setState("verifying");

    const doVerify = async () => {
      try {
        await authApi.verifyEmail(token);
        setState("success");
        toast.success("Xác thực email thành công!");

        setTimeout(() => {
          navigate({ to: "/auth/login", replace: true });
        }, 3000);
      } catch (err: any) {
        setState("error");
        setErrorMsg(err instanceof Error ? err.message : "Liên kết không hợp lệ hoặc đã hết hạn.");
      }
    };

    doVerify();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>
      <div className="w-full max-w-md p-4">
        <Card className="backdrop-blur-xl bg-card/60 border-border/60 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display">
              {state === "idle" ? "Xác thực email" :
               state === "verifying" ? "Đang xác thực..." :
               state === "success" ? "Xác thực thành công!" :
               "Xác thực thất bại"}
            </CardTitle>
            <CardDescription>
              {state === "idle" && "Vui lòng kiểm tra hộp thư email của bạn"}
              {state === "verifying" && "Vui lòng đợi trong giây lát..."}
              {state === "success" && "Email của bạn đã được xác thực. Đang chuyển hướng..."}
              {state === "error" && errorMsg}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {state === "idle" && (
              <>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Chúng tôi đã gửi email xác thực đến địa chỉ email của bạn.
                  <br />
                  Vui lòng kiểm tra hộp thư đến (và thư mục Spam) và nhấn vào liên kết xác thực.
                </p>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-600 dark:text-amber-400">
                  Không thấy email? Kiểm tra thư mục Spam hoặc{" "}
                  <button
                    onClick={() => navigate({ to: "/auth/login" })}
                    className="underline hover:no-underline"
                  >
                    đăng nhập
                  </button>{" "}
                  để gửi lại.
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: "/auth/login" })}
                >
                  Đi đến đăng nhập
                </Button>
              </>
            )}

            {state === "verifying" && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            )}

            {state === "success" && (
              <>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
                  onClick={() => navigate({ to: "/auth/login", replace: true })}
                >
                  Đăng nhập ngay
                </Button>
              </>
            )}

            {state === "error" && (
              <>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-destructive" />
                  </div>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-xs text-destructive">
                  {errorMsg}
                </div>

                <Button
                  className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
                  onClick={() => navigate({ to: "/auth/login", replace: true })}
                >
                  Đi đến đăng nhập
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
