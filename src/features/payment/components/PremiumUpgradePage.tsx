import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { paymentApi } from "@/features/admin/services/paymentApi";
import type { PlanOption } from "@/features/admin/types/admin.types";

const fmtVnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";

export function PremiumUpgradePage() {
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [loading, setLoading] = useState(false);

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
        {plans.map((p) => (
          <Card
            key={p.id}
            className={cn(
              "relative",
              p.highlighted && "border-primary shadow-brand",
            )}
          >
            {p.highlighted && (
              <Badge className="absolute -top-2.5 left-5 bg-gradient-brand text-white border-transparent">
                Phổ biến
              </Badge>
            )}
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Crown
                  className={cn(
                    "h-5 w-5",
                    p.highlighted ? "text-primary" : "text-muted-foreground",
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
                  p.highlighted
                    ? "bg-gradient-brand shadow-brand hover:opacity-90"
                    : "",
                )}
                variant={p.highlighted ? "default" : "outline"}
                disabled={loading}
                onClick={() => handlePayment(p)}
              >
                {loading ? (
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
        ))}
      </div>
    </div>
  );
}
