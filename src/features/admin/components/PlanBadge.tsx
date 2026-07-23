// src/features/admin/components/PlanBadge.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PlanId } from "../types/admin.types";

const styles: Record<PlanId, string> = {
  FREE: "bg-muted text-muted-foreground border-transparent",
  BASIC: "bg-primary/10 text-primary border-transparent",
  PRO: "bg-gradient-brand text-white border-transparent shadow-sm",
  PREMIUM: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const labels: Record<PlanId, string> = {
  FREE: "Free",
  BASIC: "Basic",
  PRO: "Pro",
  PREMIUM: "Premium",
};

export const PlanBadge: React.FC<{ plan: PlanId; className?: string }> = ({
  plan,
  className,
}) => (
  <Badge variant="secondary" className={cn(styles[plan], className)}>
    {labels[plan]}
  </Badge>
);
