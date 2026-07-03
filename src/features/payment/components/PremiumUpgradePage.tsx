import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, Crown, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { paymentApi } from "@/features/admin/services/paymentApi";
import type { PlanOption } from "@/features/admin/types/admin.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";

const planNameToEnum: Record<string, string> = {
  "Pro": "PRO",
  "Premium": "PREMIUM",
};

export function PremiumUpgradePage() {
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, refresh } = useAuth();
  const currentPlan = user?.plan?.toUpperCase() || "FREE";

  useEffect(() => {
    paymentApi.getPlanOptions().then(setPlans);
  }, []);

  const handlePayment = async (selectedPlan: PlanOption) => {
    setLoading(true);
    try {
      const response = await paymentApi.createPayment(selectedPlan.id);
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (error) {
      toast.error("Lỗi tạo link thanh toán");
      setLoading(false);
    }
  };

  const isPlanPurchased = (planName: string): boolean => {
    const planEnum = planNameToEnum[planName];
    return currentPlan === planEnum;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Nâng cấp Premium
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Chọn gói phù hợp với nhu cầu của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
        {plans.map((p) => {
          const purchased = isPlanPurchased(p.name);
          return (
            <Card
              key={p.id}
              className={cn(
                "relative",
                p.highlighted && "border-primary shadow-brand",
                purchased && "border-emerald-500 bg-emerald-50/50",
              )}
            >
              {p.highlighted && (
                <Badge className="absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent">
                  Phổ biến
                </Badge>
              )}
              {purchased && (
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
                      p.highlighted
                        ? "text-primary"
                        : purchased
                          ? "text-emerald-600"
                          : "text-muted-foreground",
                    )}
                  />
                  <h3 className="text-lg font-bold font-display">{p.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  {p.tagline}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-display">
                    {fmtVnd(p.price)}
                  </span>
                  <span className="text-muted-foreground text-sm">/ tháng</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full mt-5",
                    p.highlighted && !purchased
                      ? "bg-gradient-brand shadow-brand hover:opacity-90"
                      : "",
                    purchased ? "bg-emerald-600 hover:bg-emerald-700" : "",
                  )}
                  variant={
                    purchased
                      ? "default"
                      : p.highlighted
                        ? "default"
                        : "outline"
                  }
                  disabled={loading || purchased}
                  onClick={() => handlePayment(p)}
                >
                  {purchased ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Đang sử dụng
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Đang tạo link...
                    </>
                  ) : (
                    <>Chọn {p.name}</>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
