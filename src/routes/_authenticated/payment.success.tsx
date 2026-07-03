import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export const Route = createFileRoute("/_authenticated/payment/success")({
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { reloadUser } = useAuth();
  const [reloading, setReloading] = useState(true);

  useEffect(() => {
    const reloadUserInfo = async () => {
      try {
        await reloadUser();
        console.log("✅ User info reloaded after payment");
      } catch (err) {
        console.error("❌ Failed to reload user:", err);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          await reloadUser();
          console.log("✅ User info reloaded on retry");
        } catch (retryErr) {
          console.error("❌ Retry failed:", retryErr);
        }
      } finally {
        setReloading(false);
      }
    };

    reloadUserInfo();
  }, [reloadUser]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
      <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-full">
        <CheckCircle2 className="h-16 w-16" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Thanh toán thành công!</h1>
      {reloading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p>Đang cập nhật thông tin tài khoản...</p>
        </div>
      ) : (
        <p className="text-muted-foreground max-w-md">
          Tài khoản của bạn đã được cập nhật thành công!
        </p>
      )}
      <div className="flex gap-4">
        <Button onClick={() => navigate({ to: "/premium" })} disabled={reloading}>
          Xem gói đã mua
        </Button>
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })} disabled={reloading}>
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
