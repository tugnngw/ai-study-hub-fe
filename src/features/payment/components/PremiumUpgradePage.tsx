// src/features/payment/components/PremiumUpgradePage.tsx
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, Crown, CheckCircle2, CalendarClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { usePlans } from "@/lib/queries";
import { formatStorage } from "@/lib/config";
import {
  computeUpgrade,
  priceForDays,
  remainingDaysUntil,
  PRORATION_CYCLE_DAYS,
} from "../proration";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("vi-VN") : "—";

// Thứ tự cấp bậc để phân biệt NÂNG cấp và HẠ cấp.
const RANK: Record<string, number> = { FREE: 0, BASIC: 1, PRO: 2, PLUS: 2, PREMIUM: 3 };

export function PremiumUpgradePage() {
  const plansQuery = usePlans();
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<AdminPlan | null>(null);
  const [days, setDays] = useState<number>(PRORATION_CYCLE_DAYS);
  const { user, reloadUser } = useAuth();

  // Danh sách gói (đồng bộ với chỉnh sửa của admin). Ẩn Free/Basic, chỉ gói đang bật.
  const plans = useMemo(
    () =>
      (plansQuery.data ?? []).filter(
        (p) => p.isActive && p.name !== "Free" && p.name !== "Basic",
      ),
    [plansQuery.data],
  );

  useEffect(() => {
    if (user?.plan) setCurrentPlan(String(user.plan).toUpperCase());
    if (user?.planExpiresAt) setExpiresAt(user.planExpiresAt);
  }, [user?.plan, user?.planExpiresAt]);

  const currentPlanObj = useMemo(
    () => plans.find((p) => p.name.toUpperCase() === currentPlan) ?? null,
    [plans, currentPlan],
  );

  const remainingDays = remainingDaysUntil(expiresAt);
  const isPaidActive = currentPlan !== "FREE" && remainingDays > 0;

  const isCurrent = (p: AdminPlan) => p.name.toUpperCase() === currentPlan;
  const isUpgrade = (p: AdminPlan) =>
    (RANK[p.name.toUpperCase()] ?? 0) > (RANK[currentPlan] ?? 0);
  const isDowngrade = (p: AdminPlan) =>
    (RANK[p.name.toUpperCase()] ?? 0) < (RANK[currentPlan] ?? 0);

  // Preview số tiền cho lựa chọn hiện tại trong dialog.
  const quote = useMemo(() => {
    if (!selected) return null;
    const upgrading = isPaidActive && isUpgrade(selected);
    if (upgrading) {
      // NÂNG cấp giữa chừng: bù trừ giá trị ngày còn lại của gói cũ.
      return computeUpgrade(
        currentPlanObj
          ? { name: currentPlanObj.name, price: currentPlanObj.price }
          : null,
        { name: selected.name, price: selected.price },
        expiresAt,
      );
    }
    // Mua mới / gia hạn theo số ngày người dùng chọn.
    return {
      remainingDays: 0,
      remainingValue: 0,
      amountDue: priceForDays(selected.price, days),
      daysCovered: days,
    };
  }, [selected, days, isPaidActive, currentPlanObj, expiresAt]);

  const openCheckout = (p: AdminPlan) => {
    setSelected(p);
    setDays(PRORATION_CYCLE_DAYS);
  };

  const handlePay = async () => {
    if (!selected || !quote) return;
    setLoading(true);
    try {
      const upgrading = isPaidActive && isUpgrade(selected);
      const res = upgrading
        ? await paymentApi.createPaymentByDays(selected.id, quote.daysCovered)
        : await paymentApi.createPaymentByDays(selected.id, days);

      const url = res.checkoutUrl ?? "";
      const isMockSuccess =
        url.includes("upgraded=1") ||
        (typeof window !== "undefined" &&
          url.startsWith(window.location.origin) &&
          url.includes("/premium"));

      if (isMockSuccess) {
        // MOCK: gói đã được cập nhật ở BE giả — nạp lại user để phản ánh ngay.
        await reloadUser();
        const u = await accountApi.me();
        if (u?.plan) setCurrentPlan(String(u.plan).toUpperCase());
        setExpiresAt(u?.planExpiresAt ?? null);
        setSelected(null);
        toast.success(`Đã nâng cấp lên ${selected.name}!`);
      } else if (url) {
        // Thật: chuyển tới cổng thanh toán.
        window.location.href = url;
        return;
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
      toast.success("Đã cập nhật thông tin gói");
    } catch {
      toast.error("Không thể cập nhật thông tin");
    }
  };

  const upgrading = selected ? isPaidActive && isUpgrade(selected) : false;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Nâng cấp Premium
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Chọn gói và số ngày sử dụng phù hợp với nhu cầu của bạn
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refresh}>
          Làm mới
        </Button>
      </div>

      {/* Thẻ trạng thái gói hiện tại + hạn dùng */}
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
          const highlighted = p.name.toUpperCase() === "PREMIUM";
          const downgrade = isPaidActive && isDowngrade(p);
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
                    / {PRORATION_CYCLE_DAYS} ngày
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Lưu trữ{" "}
                    {formatStorage(p.storageGb)}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                    {p.aiQuestions > 9999
                      ? "Không giới hạn câu hỏi AI"
                      : `${p.aiQuestions} câu hỏi AI`}
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

      {/* Dialog chọn số ngày & xem bù trừ khi nâng cấp */}
      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {upgrading ? `Nâng lên ${selected?.name}` : `Mua gói ${selected?.name}`}
            </DialogTitle>
            <DialogDescription>
              {upgrading
                ? "Nâng cấp cho phần ngày còn lại của gói hiện tại. Số tiền đã trừ giá trị chưa dùng."
                : "Chọn số ngày bạn muốn sử dụng."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {!upgrading && (
              <div className="space-y-2">
                <Label>Số ngày sử dụng</Label>
                <Input
                  type="number"
                  min={1}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                />
                <div className="flex gap-2">
                  {[7, 30, 90, 180, 365].map((d) => (
                    <Button
                      key={d}
                      type="button"
                      size="sm"
                      variant={days === d ? "default" : "outline"}
                      onClick={() => setDays(d)}
                    >
                      {d}n
                    </Button>
                  ))}
                </div>
              </div>
            )}

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
                      label={`Giá ${selected?.name} (30 ngày)`}
                      value={fmtVnd(selected?.price ?? 0)}
                    />
                    <div className="border-t my-1" />
                  </>
                )}
                {!upgrading && (
                  <Row
                    label={`Đơn giá / ngày`}
                    value={fmtVnd(
                      Math.round((selected?.price ?? 0) / PRORATION_CYCLE_DAYS),
                    )}
                  />
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
