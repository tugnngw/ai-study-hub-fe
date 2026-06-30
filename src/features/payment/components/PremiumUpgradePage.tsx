// src/features/payment/components/PremiumUpgradePage.tsx
// Luồng nâng cấp Premium (user): chọn gói -> chọn phương thức -> chuyển khoản.
// Tải dữ liệu trong effect (client-only). TODO(backend): nối paymentApi thật.

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Check, ChevronRight, Landmark, Smartphone, Zap, Copy, Loader2, ArrowLeft, Crown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { paymentApi } from "@/features/admin/services/paymentApi";
import type { PlanOption, TopUpMethod } from "@/features/admin/types/admin.types";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";
type Step = "plan" | "method" | "bank";

interface BankInfo {
  bankName: string; bankShort: string; accountName: string;
  accountNumber: string; transferContent: string;
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
      setPlans(p); setMethods(m); setBank(b);
    });
    return () => { alive = false; };
  }, []);

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success(`Đã copy ${label}`),
      () => toast.error("Không copy được")
    );
  };

  // ── Bước 1: chọn gói ──
  if (step === "plan") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">Nâng cấp Premium</h1>
          <p className="text-muted-foreground mt-1 text-sm">Chọn gói phù hợp với nhu cầu của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {plans.map((p) => (
            <Card key={p.id} className={cn("relative", p.highlighted && "border-primary shadow-brand")}>
              {p.highlighted && (
                <Badge className="absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent">
                  Phổ biến
                </Badge>
              )}
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Crown className={cn("h-5 w-5", p.highlighted ? "text-primary" : "text-muted-foreground")} />
                  <h3 className="text-lg font-bold font-display">{p.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mt-1">{p.tagline}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-display">{fmtVnd(p.price)}</span>
                  <span className="text-muted-foreground text-sm">/ tháng</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn("w-full mt-5", p.highlighted ? "bg-gradient-brand shadow-brand hover:opacity-90" : "")}
                  variant={p.highlighted ? "default" : "outline"}
                  onClick={() => { setPlan(p); setStep("method"); }}
                >
                  Chọn {p.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">* Chi tiết quyền lợi từng gói sẽ được cập nhật sau.</p>
      </div>
    );
  }

  // ── Bước 2: chọn phương thức nạp tiền ──
  if (step === "method") {
    const icon = (id: string) =>
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
          </p>
        </div>

        <div className="space-y-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => { if (m.id === "bank") setStep("bank"); else toast.info("Phương thức này sẽ bổ sung sau."); }}
              className={cn(
                "w-full text-left rounded-2xl border bg-card p-4 flex items-center gap-4 transition-colors hover:border-primary/60",
                m.recommended ? "border-primary/50" : "border-border"
              )}
            >
              <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center shrink-0",
                m.id === "bank" ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-600")}>
                {icon(m.id)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{m.category}</span>
                  {m.recommended && <Badge variant="secondary" className="bg-primary/10 text-primary border-transparent">Khuyến nghị</Badge>}
                </div>
                <div className="font-bold mt-0.5">{m.title}</div>
                <p className="text-sm text-muted-foreground mt-0.5">{m.description}</p>
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
      <button onClick={() => setStep("method")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Chọn lại phương thức
      </button>

      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="bg-gradient-brand text-white px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/70">Ngân hàng</div>
            <div className="font-bold text-lg">{bank?.bankName}</div>
          </div>
          <Badge className="bg-white/20 text-white border-transparent text-base px-3 py-1">{bank?.bankShort}</Badge>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-white/70">Số tài khoản</div>
            <div className="font-bold text-lg tracking-wide">{bank?.accountNumber}</div>
          </div>
        </div>

        <div className="bg-card p-5 grid sm:grid-cols-[1fr_auto] gap-5">
          <div className="space-y-4">
            <Field label="Chủ tài khoản" value={bank?.accountName ?? ""} onCopy={() => copy(bank?.accountName ?? "", "tên chủ TK")} />
            <Field label="Số tài khoản" value={bank?.accountNumber ?? ""} onCopy={() => copy(bank?.accountNumber ?? "", "số TK")} />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Nội dung chuyển khoản</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-primary/5 border border-primary/20 text-primary font-bold rounded-lg px-3 py-2">
                  {bank?.transferContent}
                </code>
                <Button variant="outline" size="sm" onClick={() => copy(bank?.transferContent ?? "", "nội dung CK")}>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </Button>
              </div>
              <p className="text-xs text-amber-600 mt-1">⚠ Nhập đúng nội dung để hệ thống tự động xác nhận.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-36 w-36 rounded-lg border border-border bg-[conic-gradient(at_center,_#000_25%,_#fff_0_50%,_#000_0_75%,_#fff_0)] bg-[length:16px_16px] opacity-90" aria-label="QR mock" />
            <span className="text-xs text-muted-foreground">Quét QR để chuyển tiền</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 flex items-center gap-2 text-sm">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        Đang chờ xác nhận chuyển khoản…
      </div>

      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
        <div className="font-semibold text-destructive flex items-center gap-2 mb-2">⚠ Lưu ý quan trọng</div>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
          <li>Nhập chính xác nội dung chuyển khoản để hệ thống tự động cộng tiền.</li>
          <li>Thay đổi nội dung sẽ khiến giao dịch không được xác nhận.</li>
          <li>Không nhận được tiền sau 30 phút, vui lòng liên hệ fanpage để được hỗ trợ.</li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <span className="flex-1 font-semibold">{value}</span>
        <Button variant="outline" size="sm" onClick={onCopy}><Copy className="h-3.5 w-3.5" /> Copy</Button>
      </div>
    </div>
  );
}
