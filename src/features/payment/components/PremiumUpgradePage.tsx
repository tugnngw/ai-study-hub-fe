// src/features/payment/components/PremiumUpgradePage.tsx
<<<<<<< HEAD
// Luồng nâng cấp Premium (user): chọn gói -> chọn phương thức -> chuyển khoản.
// Tải dữ liệu trong effect (client-only). TODO(backend): nối paymentApi thật.

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
<<<<<<< HEAD
  Check, ChevronRight, Landmark, Smartphone, Zap, Copy, Loader2, ArrowLeft, Crown,
=======
  Check,
  ChevronRight,
  Landmark,
  Smartphone,
  Zap,
  Copy,
  Loader2,
  ArrowLeft,
  Crown,
>>>>>>> origin/Flashcars
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { paymentApi } from "@/features/admin/services/paymentApi";
<<<<<<< HEAD
import type { PlanOption, TopUpMethod } from "@/features/admin/types/admin.types";
=======
import type {
  PlanOption,
  TopUpMethod,
} from "@/features/admin/types/admin.types";
>>>>>>> origin/Flashcars

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
type Step = "plan" | "method" | "bank";

interface BankInfo {
<<<<<<< HEAD
  bankName: string; bankShort: string; accountName: string;
  accountNumber: string; transferContent: string;
=======
  bankName: string;
  bankShort: string;
  accountName: string;
  accountNumber: string;
  transferContent: string;
>>>>>>> origin/Flashcars
}

export function PremiumUpgradePage() {
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [methods, setMethods] = useState<TopUpMethod[]>([]);
  const [bank, setBank] = useState<BankInfo | null>(null);

  const [step, setStep] = useState<Step>("plan");
  const [plan, setPlan] = useState<PlanOption | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([
      paymentApi.getPlanOptions(),
      paymentApi.getTopUpMethods(),
      paymentApi.getBankInfo(),
    ]).then(([p, m, b]) => {
      if (!alive) return;
<<<<<<< HEAD
      setPlans(p); setMethods(m); setBank(b);
    });
    return () => { alive = false; };
=======
      setPlans(p);
      setMethods(m);
      setBank(b);
    });
    return () => {
      alive = false;
    };
>>>>>>> origin/Flashcars
  }, []);

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success(`Đã copy ${label}`),
<<<<<<< HEAD
      () => toast.error("Không copy được")
=======
      () => toast.error("Không copy được"),
>>>>>>> origin/Flashcars
    );
  };

  // ── Bước 1: chọn gói ──
  if (step === "plan") {
    return (
      <div className="space-y-6">
        <div>
<<<<<<< HEAD
          <h1 className="text-2xl font-bold tracking-tight font-display">Nâng cấp Premium</h1>
          <p className="text-muted-foreground mt-1 text-sm">Chọn gói phù hợp với nhu cầu của bạn</p>
=======
=======
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
>>>>>>> origin/final/demo-v1
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Nâng cấp Premium
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
<<<<<<< HEAD
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
>>>>>>> origin/Flashcars
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {plans.map((p) => (
<<<<<<< HEAD
            <Card key={p.id} className={cn("relative", p.highlighted && "border-primary shadow-brand")}>
=======
=======
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
>>>>>>> origin/final/demo-v1
            <Card
              key={p.id}
              className={cn(
                "relative",
<<<<<<< HEAD
                p.highlighted && "border-primary shadow-brand",
              )}
            >
>>>>>>> origin/Flashcars
              {p.highlighted && (
=======
                highlighted && "border-primary shadow-brand",
                current && "border-emerald-500 bg-emerald-50/50",
              )}
            >
              {highlighted && (
>>>>>>> origin/final/demo-v1
                <Badge className="absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent">
                  Phổ biến
                </Badge>
              )}
<<<<<<< HEAD
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
<<<<<<< HEAD
                  <Crown className={cn("h-5 w-5", p.highlighted ? "text-primary" : "text-muted-foreground")} />
                  <h3 className="text-lg font-bold font-display">{p.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mt-1">{p.tagline}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-display">{fmtVnd(p.price)}</span>
=======
                  <Crown
                    className={cn(
                      "h-5 w-5",
                      p.highlighted ? "text-primary" : "text-muted-foreground",
=======
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
>>>>>>> origin/final/demo-v1
                    )}
                  />
                  <h3 className="text-lg font-bold font-display">{p.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
<<<<<<< HEAD
                  {p.tagline}
=======
                  {p.description}
>>>>>>> origin/final/demo-v1
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-display">
                    {fmtVnd(p.price)}
                  </span>
<<<<<<< HEAD
>>>>>>> origin/Flashcars
                  <span className="text-muted-foreground text-sm">/ tháng</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
<<<<<<< HEAD
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" /> {f}
=======
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                      {f}
>>>>>>> origin/Flashcars
                    </li>
                  ))}
                </ul>
                <Button
<<<<<<< HEAD
                  className={cn("w-full mt-5", p.highlighted ? "bg-gradient-brand shadow-brand hover:opacity-90" : "")}
                  variant={p.highlighted ? "default" : "outline"}
                  onClick={() => { setPlan(p); setStep("method"); }}
=======
                  className={cn(
                    "w-full mt-5",
                    p.highlighted
                      ? "bg-gradient-brand shadow-brand hover:opacity-90"
                      : "",
                  )}
                  variant={p.highlighted ? "default" : "outline"}
                  onClick={() => {
                    setPlan(p);
                    setStep("method");
                  }}
>>>>>>> origin/Flashcars
                >
                  Chọn {p.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
<<<<<<< HEAD
        <p className="text-xs text-muted-foreground">* Chi tiết quyền lợi từng gói sẽ được cập nhật sau.</p>
=======
        <p className="text-xs text-muted-foreground">
          * Chi tiết quyền lợi từng gói sẽ được cập nhật sau.
        </p>
>>>>>>> origin/Flashcars
      </div>
    );
  }

  // ── Bước 2: chọn phương thức nạp tiền ──
  if (step === "method") {
    const icon = (id: string) =>
<<<<<<< HEAD
      id === "bank" ? <Landmark className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />;
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button onClick={() => setStep("plan")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Chọn lại gói
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display uppercase">Chọn hình thức nạp tiền</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Thanh toán cho <span className="font-medium text-foreground">{plan?.name}</span> — {plan ? fmtVnd(plan.price) : ""}
=======
      id === "bank" ? (
        <Landmark className="h-6 w-6" />
      ) : (
        <Smartphone className="h-6 w-6" />
      );
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button
          onClick={() => setStep("plan")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Chọn lại gói
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display uppercase">
            Chọn hình thức nạp tiền
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Thanh toán cho{" "}
            <span className="font-medium text-foreground">{plan?.name}</span> —{" "}
            {plan ? fmtVnd(plan.price) : ""}
>>>>>>> origin/Flashcars
          </p>
        </div>

        <div className="space-y-3">
          {methods.map((m) => (
            <button
              key={m.id}
<<<<<<< HEAD
              onClick={() => { if (m.id === "bank") setStep("bank"); else toast.info("Phương thức này sẽ bổ sung sau."); }}
              className={cn(
                "w-full text-left rounded-2xl border bg-card p-4 flex items-center gap-4 transition-colors hover:border-primary/60",
                m.recommended ? "border-primary/50" : "border-border"
              )}
            >
              <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center shrink-0",
                m.id === "bank" ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-600")}>
=======
              onClick={() => {
                if (m.id === "bank") setStep("bank");
                else toast.info("Phương thức này sẽ bổ sung sau.");
              }}
              className={cn(
                "w-full text-left rounded-2xl border bg-card p-4 flex items-center gap-4 transition-colors hover:border-primary/60",
                m.recommended ? "border-primary/50" : "border-border",
              )}
            >
              <div
                className={cn(
                  "h-14 w-14 rounded-xl flex items-center justify-center shrink-0",
                  m.id === "bank"
                    ? "bg-primary/10 text-primary"
                    : "bg-emerald-500/10 text-emerald-600",
                )}
              >
>>>>>>> origin/Flashcars
                {icon(m.id)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
<<<<<<< HEAD
                  <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{m.category}</span>
                  {m.recommended && <Badge variant="secondary" className="bg-primary/10 text-primary border-transparent">Khuyến nghị</Badge>}
                </div>
                <div className="font-bold mt-0.5">{m.title}</div>
                <p className="text-sm text-muted-foreground mt-0.5">{m.description}</p>
=======
                  <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {m.category}
                  </span>
                  {m.recommended && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-transparent"
                    >
                      Khuyến nghị
                    </Badge>
                  )}
                </div>
                <div className="font-bold mt-0.5">{m.title}</div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {m.description}
                </p>
>>>>>>> origin/Flashcars
                {m.instant && (
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <Zap className="h-3 w-3" /> Xử lý tức thì
                  </span>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Bước 3: màn chuyển khoản ACB (chờ xác nhận) ──
  return (
    <div className="space-y-6 max-w-xl mx-auto">
<<<<<<< HEAD
      <button onClick={() => setStep("method")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
=======
      <button
        onClick={() => setStep("method")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
>>>>>>> origin/Flashcars
        <ArrowLeft className="h-4 w-4" /> Chọn lại phương thức
      </button>

      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="bg-gradient-brand text-white px-5 py-4 flex items-center justify-between">
          <div>
<<<<<<< HEAD
            <div className="text-[11px] uppercase tracking-wider text-white/70">Ngân hàng</div>
            <div className="font-bold text-lg">{bank?.bankName}</div>
          </div>
          <Badge className="bg-white/20 text-white border-transparent text-base px-3 py-1">{bank?.bankShort}</Badge>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-white/70">Số tài khoản</div>
            <div className="font-bold text-lg tracking-wide">{bank?.accountNumber}</div>
=======
            <div className="text-[11px] uppercase tracking-wider text-white/70">
              Ngân hàng
            </div>
            <div className="font-bold text-lg">{bank?.bankName}</div>
          </div>
          <Badge className="bg-white/20 text-white border-transparent text-base px-3 py-1">
            {bank?.bankShort}
          </Badge>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-white/70">
              Số tài khoản
            </div>
            <div className="font-bold text-lg tracking-wide">
              {bank?.accountNumber}
            </div>
>>>>>>> origin/Flashcars
          </div>
        </div>

        <div className="bg-card p-5 grid sm:grid-cols-[1fr_auto] gap-5">
          <div className="space-y-4">
<<<<<<< HEAD
            <Field label="Chủ tài khoản" value={bank?.accountName ?? ""} onCopy={() => copy(bank?.accountName ?? "", "tên chủ TK")} />
            <Field label="Số tài khoản" value={bank?.accountNumber ?? ""} onCopy={() => copy(bank?.accountNumber ?? "", "số TK")} />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Nội dung chuyển khoản</div>
=======
            <Field
              label="Chủ tài khoản"
              value={bank?.accountName ?? ""}
              onCopy={() => copy(bank?.accountName ?? "", "tên chủ TK")}
            />
            <Field
              label="Số tài khoản"
              value={bank?.accountNumber ?? ""}
              onCopy={() => copy(bank?.accountNumber ?? "", "số TK")}
            />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                Nội dung chuyển khoản
              </div>
>>>>>>> origin/Flashcars
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-primary/5 border border-primary/20 text-primary font-bold rounded-lg px-3 py-2">
                  {bank?.transferContent}
                </code>
<<<<<<< HEAD
                <Button variant="outline" size="sm" onClick={() => copy(bank?.transferContent ?? "", "nội dung CK")}>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </Button>
              </div>
              <p className="text-xs text-amber-600 mt-1">⚠ Nhập đúng nội dung để hệ thống tự động xác nhận.</p>
=======
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copy(bank?.transferContent ?? "", "nội dung CK")
                  }
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </Button>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                ⚠ Nhập đúng nội dung để hệ thống tự động xác nhận.
              </p>
>>>>>>> origin/Flashcars
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
<<<<<<< HEAD
            <div className="h-36 w-36 rounded-lg border border-border bg-[conic-gradient(at_center,_#000_25%,_#fff_0_50%,_#000_0_75%,_#fff_0)] bg-[length:16px_16px] opacity-90" aria-label="QR mock" />
            <span className="text-xs text-muted-foreground">Quét QR để chuyển tiền</span>
=======
            <div
              className="h-36 w-36 rounded-lg border border-border bg-[conic-gradient(at_center,_#000_25%,_#fff_0_50%,_#000_0_75%,_#fff_0)] bg-[length:16px_16px] opacity-90"
              aria-label="QR mock"
            />
            <span className="text-xs text-muted-foreground">
              Quét QR để chuyển tiền
            </span>
>>>>>>> origin/Flashcars
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 flex items-center gap-2 text-sm">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        Đang chờ xác nhận chuyển khoản…
      </div>

      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
<<<<<<< HEAD
        <div className="font-semibold text-destructive flex items-center gap-2 mb-2">⚠ Lưu ý quan trọng</div>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
          <li>Nhập chính xác nội dung chuyển khoản để hệ thống tự động cộng tiền.</li>
          <li>Thay đổi nội dung sẽ khiến giao dịch không được xác nhận.</li>
          <li>Không nhận được tiền sau 30 phút, vui lòng liên hệ fanpage để được hỗ trợ.</li>
=======
        <div className="font-semibold text-destructive flex items-center gap-2 mb-2">
          ⚠ Lưu ý quan trọng
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
          <li>
            Nhập chính xác nội dung chuyển khoản để hệ thống tự động cộng tiền.
          </li>
          <li>Thay đổi nội dung sẽ khiến giao dịch không được xác nhận.</li>
          <li>
            Không nhận được tiền sau 30 phút, vui lòng liên hệ fanpage để được
            hỗ trợ.
          </li>
>>>>>>> origin/Flashcars
        </ul>
      </div>
=======
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
>>>>>>> origin/final/demo-v1
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
function Field({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <span className="flex-1 font-semibold">{value}</span>
        <Button variant="outline" size="sm" onClick={onCopy}><Copy className="h-3.5 w-3.5" /> Copy</Button>
=======
function Field({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-1 font-semibold">{value}</span>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-3.5 w-3.5" /> Copy
        </Button>
>>>>>>> origin/Flashcars
      </div>
=======
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
>>>>>>> origin/final/demo-v1
    </div>
  );
}
