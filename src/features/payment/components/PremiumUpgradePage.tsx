// src/features/payment/components/PremiumUpgradePage.tsx
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, Crown, CheckCircle2, CalendarClock, QrCode, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuotaDisplay } from "@/components/ui/QuotaDisplay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { paymentApi } from "@/features/admin/services/paymentApi";
import type { AdminPlan } from "@/features/admin/services/paymentApi";
import { accountApi } from "@/features/auth/services";
import { useAuth } from "@/lib/auth";
import { usePlans, useMySubscription } from "@/lib/queries";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { formatStorage } from "@/lib/config";
import QRCode from "qrcode";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("vi-VN") : "—";

export function PremiumUpgradePage() {
  const plansQuery = usePlans();
  const subQuery = useMySubscription();
  const queryClient = useQueryClient();

  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<AdminPlan | null>(null);
  const { user, reloadUser } = useAuth();
  const [paymentInfo, setPaymentInfo] = useState<{checkoutUrl: string; orderCode: number; amount: number; expiredAt: string; qrCode: string | null} | null>(null);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!qrCodeModal || !paymentInfo?.qrCode) { setQrDataUrl(null); return; }
    QRCode.toDataURL(paymentInfo.qrCode, { width: 300, margin: 2 })
      .then(url => setQrDataUrl(url))
      .catch(() => {});
  }, [qrCodeModal]);

  const plans = useMemo(
    () =>
      (plansQuery.data ?? []).filter(
        (p) => p.isActive && p.tier > 0,
      ),
    [plansQuery.data],
  );

  useEffect(() => {
    if (subQuery.data) {
      setCurrentPlan(subQuery.data.planName.toUpperCase());
      setExpiresAt(subQuery.data.endDate ?? null);
    } else if (user?.plan) {
      setCurrentPlan(String(user.plan).toUpperCase());
      setExpiresAt(user.planExpiresAt);
    }
  }, [user?.plan, user?.planExpiresAt, subQuery.data]);

  // Dùng daysRemaining từ backend thay vì tính trên FE
  const remainingDays = subQuery.data?.daysRemaining ?? 0;
  const isPaidActive = currentPlan !== "FREE" && remainingDays > 0;

  const currentPlanId = subQuery.data?.planId;
  const currentTier = subQuery.data?.tierGranted ?? 0;
  const isCurrent = (p: AdminPlan) =>
    currentPlanId ? p.id === currentPlanId : p.name.toUpperCase() === currentPlan;
  const isUpgrade = (p: AdminPlan) => !isCurrent(p) && p.tier > currentTier;
  const isDowngrade = (p: AdminPlan) => !isCurrent(p) && p.tier < currentTier;

  // ✅ SỬA: Gọi API preview từ server - không tính trên FE
  const { data: preview, isLoading: previewLoading } = useQuery({
    queryKey: ['upgradePreview', selected?.id],
    queryFn: () => paymentApi.previewUpgrade(selected!.id),
    enabled: !!selected && isPaidActive && isUpgrade(selected),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Hiển thị thông tin từ server preview, không tính lại
  const quoteFromPreview = useMemo(() => {
    if (!selected) return null;
    const upgrading = isPaidActive && isUpgrade(selected);

    if (upgrading && preview) {
      return {
        remainingDays: preview.remainingDays,
        remainingValue: preview.remainingCredit,
        amountDue: preview.amountToPay,
        daysCovered: selected.durationDays || 30,
      };
    }

    if (!upgrading) {
      return {
        remainingDays: 0,
        remainingValue: 0,
        amountDue: selected.price,
        daysCovered: selected.durationDays || 30,
      };
    }

    return null;
  }, [selected, isPaidActive, preview]);

  const openCheckout = (p: AdminPlan) => {
    setSelected(p);
  };

  const handlePay = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await paymentApi.createPayment(selected.id);

      const url = res.checkoutUrl ?? "";

      if (url) {
        setPaymentInfo({
          checkoutUrl: url,
          orderCode: res.orderCode,
          amount: res.amount,
          expiredAt: res.expiredAt,
          qrCode: res.qrCode,
        });
        setRemainingSeconds(Math.max(0, Math.floor((new Date(res.expiredAt).getTime() - Date.now()) / 1000)));
        setQrCodeModal(true);
        setSelected(null);
      }
    } catch (e) {
      toast.error("Lỗi tạo link thanh toán");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      const u = await accountApi.me();
      if (u?.plan) setCurrentPlan(String(u.plan).toUpperCase());
      setExpiresAt(u?.planExpiresAt ?? null);
      await plansQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
      queryClient.invalidateQueries({ queryKey: ["quota"] });
      toast.success("Đã cập nhật thông tin gói");
    } catch {
      toast.error("Không thể cập nhật thông tin");
    }
  };

  const upgrading = selected ? isPaidActive && isUpgrade(selected) : false;

  const checkPaymentStatus = (poller: NodeJS.Timeout | null, ticker: NodeJS.Timeout | null) => {
    if (!paymentInfo?.orderCode) return;
    paymentApi.getTransactionStatus(paymentInfo.orderCode)
      .then((tx) => {
        if (tx?.paid) {
          if (poller) clearInterval(poller);
          if (ticker) clearInterval(ticker);
          setQrCodeModal(false);
          setPaymentInfo(null);
          reloadUser().then(() => {
            queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
            queryClient.invalidateQueries({ queryKey: ["quota"] });
            toast.success("Thanh toán thành công! Gói đã được cập nhật.");
            refresh();
          });
        } else if (tx?.failed) {
          if (poller) clearInterval(poller);
          if (ticker) clearInterval(ticker);
          setQrCodeModal(false);
          setPaymentInfo(null);
          toast.error("Giao dịch không thành công hoặc đã hết hạn.");
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    let ticker: NodeJS.Timeout | null = null;
    let poller: NodeJS.Timeout | null = null;

    if (qrCodeModal && paymentInfo) {
      ticker = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(ticker!);
            checkPaymentStatus(poller, ticker);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      poller = setInterval(() => checkPaymentStatus(poller, ticker), 3000);

      const onVisibilityChange = () => {
        if (document.visibilityState === 'visible') checkPaymentStatus(poller, ticker);
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      return () => {
        if (ticker) clearInterval(ticker);
        if (poller) clearInterval(poller);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    }
  }, [qrCodeModal, paymentInfo]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Nâng cấp Premium
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refresh}>
          Làm mới
        </Button>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Gói hiện tại</div>
              <div className="font-semibold">{currentPlan}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Hết hạn</div>
              <div className="font-semibold">
                {isPaidActive ? (
                  <>
                    {fmtDate(expiresAt)}{" "}
                    <span className="text-muted-foreground font-normal">
                      (còn {remainingDays} ngày)
                    </span>
                  </>
                ) : (
                  "Không giới hạn (Free)"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((p) => {
          const current = isCurrent(p);
          const highlighted = false;
          const downgrade = isPaidActive && isDowngrade(p);
          const durationDays = p.durationDays || 30;
          return (
            <Card
              key={p.id}
              className={cn(
                "relative",
                highlighted && "border-primary shadow-brand",
                current && "border-emerald-500 bg-emerald-50/50",
              )}
            >
              {highlighted && (
                <Badge className="absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent">
                  Phổ biến
                </Badge>
              )}
              {current && (
                <Badge className="absolute -top-2.5 right-5 bg-emerald-600 text-white border-transparent flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Đang sử dụng
                </Badge>
              )}
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Crown
                    className={cn(
                      "h-5 w-5",
                      highlighted
                        ? "text-primary"
                        : current
                          ? "text-emerald-600"
                          : "text-muted-foreground",
                    )}
                  />
                  <h3 className="text-lg font-bold font-display">{p.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  {p.description}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-display">
                    {fmtVnd(p.price)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    / {durationDays} ngày
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Lưu trữ{" "}
                    {formatStorage(p.storageGb)}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                    {p.chatLimit == null ? "—" : p.chatLimit === -1
                      ? "Không giới hạn chat AI"
                      : p.chatLimit === 0
                      ? "Không có chat AI"
                      : `Chat AI: ${p.chatLimit} lượt`}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                    {p.flashcardLimit === -1
                      ? "Không giới hạn tạo flashcard"
                      : p.flashcardLimit === 0
                      ? "Không có flashcard"
                      : `Tạo flashcard: ${p.flashcardLimit} lượt`}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                    {p.questionLimit === -1
                      ? "Không giới hạn tạo quiz"
                      : p.questionLimit === 0
                      ? "Không có quiz"
                      : `Tạo quiz: ${p.questionLimit} lượt`}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                    {p.summaryLimit === -1
                      ? "Không giới hạn tóm tắt"
                      : p.summaryLimit === 0
                      ? "Không có tóm tắt"
                      : `Tóm tắt: ${p.summaryLimit} lượt`}
                  </li>
                </ul>

                <Button
                  className={cn(
                    "w-full mt-5",
                    highlighted && !current
                      ? "bg-gradient-brand shadow-brand hover:opacity-90"
                      : "",
                    current ? "bg-emerald-600 hover:bg-emerald-700" : "",
                  )}
                  variant={current || highlighted ? "default" : "outline"}
                  disabled={loading || current || downgrade}
                  onClick={() => openCheckout(p)}
                  title={
                    downgrade
                      ? "Không thể hạ gói khi đang còn hạn sử dụng"
                      : undefined
                  }
                >
                  {current ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Đang sử dụng
                    </>
                  ) : downgrade ? (
                    "Không thể hạ gói"
                  ) : isPaidActive && isUpgrade(p) ? (
                    <>Nâng lên {p.name}</>
                  ) : (
                    <>Chọn {p.name}</>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {upgrading ? `Nâng lên ${selected?.name}` : `Mua gói ${selected?.name}`}
            </DialogTitle>
            <DialogDescription>
              {upgrading
                ? "Nâng cấp gói. Giá trị số ngày chưa dùng của gói hiện tại sẽ được bù trừ."
                : `Gói ${selected?.name} - ${selected?.durationDays || 30} ngày sử dụng`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {previewLoading && upgrading && (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            )}
            {quoteFromPreview && (
              <div className="rounded-lg border bg-muted/40 p-4 space-y-1.5 text-sm">
                {upgrading && (
                  <>
                    <Row label="Gói hiện tại" value={currentPlan} />
                    <Row
                      label="Ngày còn lại"
                      value={`${quoteFromPreview.remainingDays} ngày`}
                    />
                    <Row
                      label="Giá trị chưa dùng (trừ đi)"
                      value={`- ${fmtVnd(quoteFromPreview.remainingValue)}`}
                    />
                    <Row
                      label={`Giá ${selected?.name} (${selected?.durationDays || 30} ngày)`}
                      value={fmtVnd(selected?.price ?? 0)}
                    />
                    <div className="border-t my-1" />
                  </>
                )}
                <Row
                  label="Số ngày áp dụng"
                  value={`${quoteFromPreview.daysCovered} ngày`}
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold">Thành tiền</span>
                  <span className="text-lg font-bold text-primary">
                    {fmtVnd(quoteFromPreview.amountDue)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Huỷ
            </Button>
            <Button onClick={handlePay} disabled={loading || (upgrading && previewLoading)}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang tạo link...
                </>
              ) : (
                "Thanh toán"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={qrCodeModal} onOpenChange={(v) => !v && setQrCodeModal(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <QrCode className="h-5 w-5" /> Thanh toán QR
            </DialogTitle>
            <DialogDescription>
              Quét mã QR bằng app ngân hàng hoặc bấm nút bên dưới để mở trang thanh toán.
              Sau khi thanh toán xong, quay lại tab này để tiếp tục.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-primary flex items-center justify-center gap-2">
                <Clock className="h-8 w-8" />
                {String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}:{String(remainingSeconds % 60).padStart(2, '0')}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Tự động cập nhật trạng thái sau mỗi 3 giây</p>
            </div>
            <div className="border p-2 rounded-lg bg-white">
              {qrDataUrl ? (
                <img src={qrDataUrl} className="w-[300px] h-[300px]" alt="QR thanh toán" />
              ) : (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentInfo?.checkoutUrl ?? "")}`}
                  className="w-[300px] h-[300px]"
                  alt="QR thanh toán"
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-xs">
              Sau khi thanh toán thành công, trang sẽ tự động cập nhật. Nếu không thấy, bấm nút "Làm mới" bên trên.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
