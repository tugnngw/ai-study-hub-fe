// src/features/payment/components/PremiumUpgradePage.tsx
import { useEffect, useMemo, useState, useRef } from "react";
import { toast } from "sonner";
import { Check, Loader2, Crown, CheckCircle2, CalendarClock, ExternalLink, QrCode, Clock, Smartphone } from "lucide-react";
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
import { useQueryClient } from "@tanstack/react-query";
import { formatStorage } from "@/lib/config";
import {
  computeUpgrade,
  remainingDaysUntil,
} from "../proration";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("vi-VN") : "—";

const getPlanRank = (plan: AdminPlan): number => plan.tier ?? 0;


export function PremiumUpgradePage() {
  const plansQuery = usePlans();
  const subQuery = useMySubscription();
  const queryClient = useQueryClient();

  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<AdminPlan | null>(null);
  const { user, reloadUser } = useAuth();
  const [paymentInfo, setPaymentInfo] = useState<{checkoutUrl: string; orderCode: number; amount: number} | null>(null);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3 phút

  const plans = useMemo(
    () =>
      (plansQuery.data ?? []).filter(
        (p) => p.isActive && p.name !== "Free" && p.name !== "Basic",
      ),
    [plansQuery.data],
  );

  useEffect(() => {
    // Ưu tiên data từ subQuery nếu có
    if (subQuery.data) {
      setCurrentPlan(subQuery.data.planName.toUpperCase());
      setExpiresAt(subQuery.data.endDate);
    } else if (user?.plan) {
      setCurrentPlan(String(user.plan).toUpperCase());
      setExpiresAt(user.planExpiresAt);
    }
  }, [user?.plan, user?.planExpiresAt, subQuery.data]);


  const currentPlanObj = useMemo(
    () => plans.find((p) => p.name.toUpperCase() === currentPlan) ?? null,
    [plans, currentPlan],
  );

  const remainingDays = remainingDaysUntil(expiresAt);
  const isPaidActive = currentPlan !== "FREE" && remainingDays > 0;

  const currentTier = currentPlanObj?.tier ?? 0;
  const isCurrent = (p: AdminPlan) => p.name.toUpperCase() === currentPlan;
  const isUpgrade = (p: AdminPlan) => getPlanRank(p) > currentTier;
  const isDowngrade = (p: AdminPlan) => getPlanRank(p) < currentTier;

  const quote = useMemo(() => {
    if (!selected) return null;
    const upgrading = isPaidActive && isUpgrade(selected);
    const planDuration = selected.durationDays || 30;
    
    if (upgrading) {
      // Tính bù trừ cho gói đang dùng (chỉ để hiển thị cho user biết)
      return computeUpgrade(
        currentPlanObj
          ? { name: currentPlanObj.name, price: currentPlanObj.price, durationDays: currentPlanObj.durationDays }
          : null,
        { name: selected.name, price: selected.price, durationDays: selected.durationDays },
        expiresAt,
      );
    }
    
    return {
      remainingDays: 0,
      remainingValue: 0,
      amountDue: selected.price,
      daysCovered: planDuration,
    };
  }, [selected, isPaidActive, currentPlanObj, expiresAt]);

  const openCheckout = (p: AdminPlan) => {
    setSelected(p);
  };

  const handlePay = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await paymentApi.createPayment(selected.id);

      const url = res.checkoutUrl ?? "";
      const isMockSuccess =
        url.includes("upgraded=1") ||
        (typeof window !== "undefined" &&
          url.startsWith(window.location.origin) &&
          url.includes("/premium"));

      if (isMockSuccess) {
        await reloadUser();
        const u = await accountApi.me();
        if (u?.plan) setCurrentPlan(String(u.plan).toUpperCase());
        setExpiresAt(u?.planExpiresAt ?? null);
        queryClient.invalidateQueries({ queryKey: ["my-subscription"] });
        queryClient.invalidateQueries({ queryKey: ["quota"] });
        setSelected(null);
        toast.success(`Đã nâng cấp lên ${selected.name}!`);
      } else if (url) {
        // Lưu thông tin payment và hiển thị QR code modal
        setPaymentInfo({
          checkoutUrl: url,
          orderCode: res.orderCode,
          amount: res.amount
        });
        setQrCodeModal(true);
        setCountdown(180);
        setSelected(null); // Đóng dialog cũ
        // Tự động mở trang thanh toán
        window.open(url, "_blank", "noopener,noreferrer");
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

  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let poller: NodeJS.Timeout;

    if (qrCodeModal && paymentInfo) {
      // Countdown
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            clearInterval(poller);
            setQrCodeModal(false);
            setPaymentInfo(null);
            toast.error("Đã hết thời gian thanh toán");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Polling
      poller = setInterval(async () => {
        try {
          const u = await accountApi.me();
          if (u && u.plan && String(u.plan).toUpperCase() !== currentPlan) {
            clearInterval(timer);
            clearInterval(poller);
            setQrCodeModal(false);
            setPaymentInfo(null);
            await reloadUser();
            toast.success("Thanh toán thành công! Gói đã được cập nhật.");
            refresh();
          }
        } catch (e) {
          console.error("Error checking subscription status", e);
        }
      }, 30000); // Polling mỗi 30 giây
    }
    return () => {
      clearInterval(timer);
      clearInterval(poller);
    };
  }, [qrCodeModal, paymentInfo, currentPlan]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          const highlighted = false; // Tắt badge "Phổ biến"
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
                      ? "Không giới hạn flashcards"
                      : p.flashcardLimit === 0
                      ? "Không có flashcards"
                      : `${p.flashcardLimit} flashcards`}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                    {p.questionLimit === -1
                      ? "Không giới hạn câu hỏi quiz"
                      : p.questionLimit === 0
                      ? "Không có quiz"
                      : `${p.questionLimit} câu hỏi quiz`}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                    {p.summaryLimit === -1
                      ? "Không giới hạn tóm tắt"
                      : p.summaryLimit === 0
                      ? "Không có tóm tắt"
                      : `${p.summaryLimit} tóm tắt AI`}
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
            {quote && (
              <div className="rounded-lg border bg-muted/40 p-4 space-y-1.5 text-sm">
                {upgrading && (
                  <>
                    <Row label="Gói hiện tại" value={currentPlan} />
                    <Row
                      label="Ngày còn lại"
                      value={`${quote.remainingDays} ngày`}
                    />
                    <Row
                      label="Giá trị chưa dùng (trừ đi)"
                      value={`- ${fmtVnd(quote.remainingValue)}`}
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
                  value={`${quote.daysCovered} ngày`}
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold">Thành tiền</span>
                  <span className="text-lg font-bold text-primary">
                    {fmtVnd(quote.amountDue)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Huỷ
            </Button>
            <Button onClick={handlePay} disabled={loading}>
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
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-primary flex items-center justify-center gap-2">
                <Clock className="h-8 w-8" />
                {formatCountdown(countdown)}
              </div>
               <p className="text-sm text-muted-foreground mt-2">
                  Quét mã QR bằng app ngân hàng hoặc mở link bên dưới
                </p>
            </div>
            <div className="border p-2 rounded-lg bg-white">
              {paymentInfo?.checkoutUrl && (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentInfo.checkoutUrl)}`}
                  className="w-[300px] h-[300px]"
                  alt="QR thanh toán"
                />
              )}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(paymentInfo?.checkoutUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Mở trang thanh toán
            </Button>
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
