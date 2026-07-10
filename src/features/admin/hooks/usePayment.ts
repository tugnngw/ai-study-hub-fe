import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "../services";
import type { AdminPlan } from "../services/paymentApi";
import { adminKeys } from "./adminKeys";

export function useTransactions() {
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
}
