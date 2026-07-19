// src/features/admin/components/PlanBadge.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PlanId } from "../types/admin.types";

const styles: Record<PlanId, string> = {
  FREE: "bg-muted text-muted-foreground border-transparent",
  PLUS: "bg-primary/10 text-primary border-transparent",
  PRO: "bg-gradient-brand text-white border-transparent shadow-sm",
};

const labels: Record<PlanId, string> = {
  FREE: "Free",
  PLUS: "Plus",
  PRO: "Pro",
};

<<<<<<< HEAD
<<<<<<< HEAD
export const PlanBadge: React.FC<{ plan: PlanId; className?: string }> = ({ plan, className }) => (
=======
=======
>>>>>>> origin/final/demo-v1
export const PlanBadge: React.FC<{ plan: PlanId; className?: string }> = ({
  plan,
  className,
}) => (
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  <Badge variant="secondary" className={cn(styles[plan], className)}>
    {labels[plan]}
  </Badge>
);
