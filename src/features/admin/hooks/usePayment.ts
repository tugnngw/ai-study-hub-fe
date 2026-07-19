// src/features/admin/hooks/usePayment.ts
import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "../services";
import { adminKeys } from "./adminKeys";

export function useTransactions() {
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
}
