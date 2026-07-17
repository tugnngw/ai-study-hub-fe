import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '@/features/admin/services/paymentApi';

export const Route = createFileRoute("/_authenticated/payment/success")({
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { reloadUser } = useAuth();
  const queryClient = useQueryClient();
  const search = useSearch({ from: "/_authenticated/payment/success" }) as { orderCode?: string; code?: string; status?: string; id?: string };
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [message, setMessage] = useState('Đang xác nhận giao dịch...');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptRef = useRef(0);

  const orderCode = search.orderCode;

  useEffect(() => {
    if (!orderCode) {
      setStatus('failed');
      setMessage('Không tìm thấy mã giao dịch. Vui lòng kiểm tra lại.');
      return;
    }

    const pollStatus = async () => {
      attemptRef.current++;
      try {
        const res = await paymentApi.getTransactionStatus(Number(orderCode));
        const tx = res as { status?: string };
        if (tx?.status === 'PAID') {
          if (pollRef.current) clearInterval(pollRef.current);
          await reloadUser();
          queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
          queryClient.invalidateQueries({ queryKey: ["quota"] });
          queryClient.invalidateQueries({ queryKey: ["account", "me"] });
          setStatus('success');
          setMessage('Tài khoản của bạn đã được cập nhật thành công!');
        } else if (tx?.status === 'FAILED' || tx?.status === 'CANCELLED' || tx?.status === 'EXPIRED') {
          if (pollRef.current) clearInterval(pollRef.current);
          setStatus('failed');
          setMessage(`Giao dịch không thành công (${tx.status}). Vui lòng thử lại.`);
        } else {
          setMessage(`Đang chờ xác nhận giao dịch... (${attemptRef.current}s)`);
        }
      } catch {
        setMessage(`Đang chờ xác nhận giao dịch... (${attemptRef.current}s)`);
      }
    };

    pollRef.current = setInterval(pollStatus, 3000);
    pollStatus();

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [orderCode, reloadUser, queryClient]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
      {status === 'verifying' && (
        <>
          <div className="bg-amber-500/10 text-amber-600 p-4 rounded-full">
            <Loader2 className="h-16 w-16 animate-spin" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Đang xác nhận thanh toán</h1>
          <p className="text-muted-foreground max-w-md">{message}</p>
          <Button variant="outline" onClick={() => navigate({ to: "/premium" })}>
            Quay lại
          </Button>
        </>
      )}
      {status === 'success' && (
        <>
          <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-full">
            <CheckCircle2 className="h-16 w-16" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Thanh toán thành công!</h1>
          <p className="text-muted-foreground max-w-md">{message}</p>
          <div className="flex gap-4">
            <Button onClick={() => navigate({ to: "/premium" })}>
              Xem gói đã mua
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })}>
              Về trang chủ
            </Button>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <div className="bg-destructive/10 text-destructive p-4 rounded-full">
            <AlertCircle className="h-16 w-16" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Giao dịch thất bại</h1>
          <p className="text-muted-foreground max-w-md">{message}</p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate({ to: "/premium" })}>
              Thử lại
            </Button>
            <Button onClick={() => navigate({ to: "/dashboard" })}>
              Về trang chủ
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
