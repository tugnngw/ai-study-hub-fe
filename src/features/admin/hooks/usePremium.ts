// src/features/admin/hooks/usePremium.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { premiumApi } from "../services";
import type { PremiumDecision } from "../types/admin.types";
import { adminKeys } from "./adminKeys";

export function usePremiumStats() {
<<<<<<< HEAD
<<<<<<< HEAD
  return useQuery({ queryKey: adminKeys.premiumStats(), queryFn: () => premiumApi.getStats() });
}
export function usePremiumRequests() {
  return useQuery({ queryKey: adminKeys.premiumRequests(), queryFn: () => premiumApi.getRequests() });
=======
=======
>>>>>>> origin/final/demo-v1
  return useQuery({
    queryKey: adminKeys.premiumStats(),
    queryFn: () => premiumApi.getStats(),
  });
}
export function usePremiumRequests() {
  return useQuery({
    queryKey: adminKeys.premiumRequests(),
    queryFn: () => premiumApi.getRequests(),
  });
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
}
export function usePremiumDecision() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: ({ id, decision }: { id: number; decision: PremiumDecision }) =>
=======
    mutationFn: ({ id, decision }: { id: string; decision: PremiumDecision }) =>
>>>>>>> origin/Flashcars
=======
    mutationFn: ({ id, decision }: { id: string; decision: PremiumDecision }) =>
>>>>>>> origin/final/demo-v1
      premiumApi.decide(id, decision),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.premiumRequests() });
      qc.invalidateQueries({ queryKey: adminKeys.premiumStats() });
    },
  });
}
