// src/features/admin/hooks/usePremium.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { premiumApi } from "../services";
import type { PremiumDecision } from "../types/admin.types";
import { adminKeys } from "./adminKeys";

export function usePremiumStats() {
  return useQuery({ queryKey: adminKeys.premiumStats(), queryFn: () => premiumApi.getStats() });
}
export function usePremiumRequests() {
  return useQuery({ queryKey: adminKeys.premiumRequests(), queryFn: () => premiumApi.getRequests() });
}
export function usePremiumDecision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, decision }: { id: number; decision: PremiumDecision }) =>
      premiumApi.decide(id, decision),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.premiumRequests() });
      qc.invalidateQueries({ queryKey: adminKeys.premiumStats() });
    },
  });
}
