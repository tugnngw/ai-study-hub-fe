import { useState, useEffect, useRef } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Mode = "otp" | "resend-only";

interface Props {
  /** Email address shown in the UI. */
  email: string;
  /** Whether the verify/submit request is in flight. */
  loading: boolean;
  /** Called when the user clicks Verify (OTP mode) or the parent's main action. */
  onVerify: (otp?: string) => Promise<void>;
  /** Called when the user clicks Resend. */
  onResend: () => Promise<void>;
  /** Optional: show a "Change email" button. */
  onChangeEmail?: () => void;
  /** Optional: mode. "otp" (default) shows OTP input + verify button. "resend-only" shows only the resend section. */
  mode?: Mode;
  /** Optional label for the verify button. Default "Xác nhận". */
  verifyLabel?: string;
  /** Optional: reset error message from parent. */
  errorMessage?: string | null;
}

const COOLDOWN_SECONDS = 60;

export function OtpVerification({
  email,
  loading,
  onVerify,
  onResend,
  onChangeEmail,
  mode = "otp",
  verifyLabel = "Xác nhận",
  errorMessage,
}: Props) {
  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState("");
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const error = errorMessage ?? localError;

  // Countdown timer — starts on mount, resets on resend
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "otp" && otp.length !== 6) {
      setLocalError("Vui lòng nhập đủ 6 số");
      return;
    }
    setLocalError("");
    await onVerify(mode === "otp" ? otp : undefined);
  };

  const handleResend = async () => {
    if (resending || cooldown > 0) return;
    setResending(true);
    try {
      await onResend();
      setOtp("");
      setLocalError("");
      setCooldown(COOLDOWN_SECONDS);
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "otp" && (
        <div className="space-y-2 flex flex-col items-center">
          <p className="text-sm text-muted-foreground text-center">
            Mã xác thực đã gửi tới{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(v) => {
              setOtp(v);
              setLocalError("");
            }}
            autoComplete="one-time-code"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      )}

      {mode === "otp" && (
        <Button
          type="submit"
          className="w-full bg-gradient-brand shadow-brand hover:opacity-90"
          disabled={loading || otp.length !== 6}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Đang xác nhận...
            </>
          ) : (
            verifyLabel
          )}
        </Button>
      )}

      {error && mode === "resend-only" && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}

      <div className="flex items-center justify-between gap-2 pt-1">
        {onChangeEmail && (
          <Button type="button" variant="ghost" size="sm" onClick={onChangeEmail}>
            Đổi email khác
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={cooldown > 0 || resending}
          onClick={handleResend}
          className={onChangeEmail ? "" : "ml-auto"}
        >
          {resending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
              Đang gửi...
            </>
          ) : cooldown > 0 ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Gửi lại ({cooldown}s)
            </>
          ) : (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Gửi lại mã
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
