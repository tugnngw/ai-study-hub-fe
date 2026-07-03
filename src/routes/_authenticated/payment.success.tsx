import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute("/_authenticated/payment/success")({
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const { reloadUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PaymentSuccessPage mounted. User before refresh:", user);
    reloadUser().then(() => {
      console.log("User reload completed successfully");
    }).catch(err => {
      console.error("User reload failed in PaymentSuccessPage:", err);
    });
    
    // Redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      navigate({ to: "/dashboard" });
    }, 5000);

    return () => clearTimeout(timer);
  }, [reloadUser, navigate, user]); // Dependency on user too, in case it changes

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
      <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-full">
        <CheckCircle2 className="h-16 w-16" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Thanh toán thành công!</h1>
      <p className="text-muted-foreground max-w-md">
        Cảm ơn bạn đã nâng cấp Premium. Tài khoản của bạn đã được cập nhật.
        Hệ thống sẽ tự động chuyển hướng về trang chủ sau vài giây.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate({ to: "/dashboard" })}>
          Quay lại trang chủ
        </Button>
      </div>
    </div>
  );
}
