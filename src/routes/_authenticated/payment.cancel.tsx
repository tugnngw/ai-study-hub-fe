import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/payment/cancel")({
  component: PaymentCancelPage,
});

function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
      <div className="bg-destructive/10 text-destructive p-4 rounded-full">
        <XCircle className="h-16 w-16" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Giao dịch đã bị hủy</h1>
      <p className="text-muted-foreground max-w-md">
        Bạn đã hủy giao dịch thanh toán hoặc phiên thanh toán đã hết hạn.
        Bạn có thể thử lại bất cứ lúc nào.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate({ to: "/premium" })}>
          Thử lại
        </Button>
        <Button onClick={() => navigate({ to: "/dashboard" })}>
          Quay lại trang chủ
        </Button>
      </div>
    </div>
  );
}
