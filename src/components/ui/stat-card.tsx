import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: string;
}

export function StatCard({ label, value, icon, tone }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center", tone)}>
            {icon}
          </div>
        </div>
        <p className="text-muted-foreground text-sm font-medium mt-4">{label}</p>
        <h3 className="text-2xl font-bold tracking-tight mt-1 font-display">{value}</h3>
      </CardContent>
    </Card>
  );
}
