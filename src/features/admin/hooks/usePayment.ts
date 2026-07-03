import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "../services";
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
