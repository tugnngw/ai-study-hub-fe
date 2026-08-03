import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  trend?: number; // Thay đổi thành optional, nếu không có trend thì không hiển thị
  icon: React.ReactNode;
  tone: string;
}

export function StatCard({ label, value, trend, icon, tone }: StatCardProps) {
  const up = trend !== undefined ? trend >= 0 : true; // Mặc định là true nếu không có trend
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center", tone)}>
            {icon}
          </div>
          {trend !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full",
                up ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"
              )}
            >
              {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm font-medium mt-4">{label}</p>
        <h3 className="text-2xl font-bold tracking-tight mt-1 font-display">{value}</h3>
        {trend !== undefined && (
          <p className="text-xs text-muted-foreground mt-0.5">so với tháng trước</p>
        )}
      </CardContent>
    </Card>
  );
}
