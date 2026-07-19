import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "../services/paymentApi";
import { adminKeys } from "./adminKeys";

export function useAdminTransactions(page: number = 0, size: number = 20) {
  return useQuery({
    queryKey: adminKeys.transactions(page, size),
    queryFn: () => paymentApi.getAllTransactions(page, size),
  });
}

export function useAdminTransactionsByUser(accountId: string, page: number = 0, size: number = 20) {
  return useQuery({
    queryKey: adminKeys.transactionsByUser(accountId, page, size),
    queryFn: () => paymentApi.getTransactionsByUser(accountId, page, size),
    enabled: !!accountId,
  });
}

export function useAdminTransactionsByStatus(status: string, page: number = 0, size: number = 20) {
  return useQuery({
    queryKey: adminKeys.transactionsByStatus(status, page, size),
    queryFn: () => paymentApi.getTransactionsByStatus(status, page, size),
  });
}
