<<<<<<< HEAD
// src/features/admin/hooks/usePayment.ts
import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "../services";
import { adminKeys } from "./adminKeys";

export function useTransactions() {
<<<<<<< HEAD
  return useQuery({ queryKey: adminKeys.transactions(), queryFn: () => paymentApi.getTransactions() });
}
export function usePlanOptions() {
  return useQuery({ queryKey: adminKeys.planOptions(), queryFn: () => paymentApi.getPlanOptions() });
}
export function useTopUpMethods() {
  return useQuery({ queryKey: adminKeys.topUpMethods(), queryFn: () => paymentApi.getTopUpMethods() });
}
export function useBankInfo() {
  return useQuery({ queryKey: adminKeys.bankInfo(), queryFn: () => paymentApi.getBankInfo() });
=======
=======
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "../services";
import type { AdminPlan } from "../services/paymentApi";
import { adminKeys } from "./adminKeys";

export function useTransactions() {
>>>>>>> origin/final/demo-v1
  return useQuery({
    queryKey: adminKeys.transactions(),
    queryFn: () => paymentApi.getTransactions(),
  });
}
export function usePlanOptions() {
  return useQuery({
    queryKey: adminKeys.planOptions(),
    queryFn: () => paymentApi.getPlanOptions(),
  });
}
<<<<<<< HEAD
export function useTopUpMethods() {
  return useQuery({
    queryKey: adminKeys.topUpMethods(),
    queryFn: () => paymentApi.getTopUpMethods(),
  });
}
export function useBankInfo() {
  return useQuery({
    queryKey: adminKeys.bankInfo(),
    queryFn: () => paymentApi.getBankInfo(),
  });
>>>>>>> origin/Flashcars
=======

// ── ADMIN: đọc & sửa giá trị các gói nâng cấp ──────────────
export function useAdminPlans() {
  return useQuery({
    queryKey: adminKeys.adminPlans(),
    queryFn: () => paymentApi.adminGetPlans(),
  });
}

export function useUpdatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number } & Partial<Omit<AdminPlan, "id">>) =>
      paymentApi.adminUpdatePlan(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.adminPlans() });
      qc.invalidateQueries({ queryKey: adminKeys.planOptions() });
      // Đồng bộ sang trang Premium phía user (cùng cache ["plans"]).
      qc.invalidateQueries({ queryKey: ["plans"] });
    },
  });
>>>>>>> origin/final/demo-v1
}
