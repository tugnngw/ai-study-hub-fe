// TODO(backend): api<T>("/api/payment...")
import type { TransactionItem, PlanOption, TopUpMethod } from "../types/admin.types";
const EMPTY_BANK = { bankName:"",bankShort:"",accountName:"",accountNumber:"",transferContent:"" };
export const paymentApi = {
  getTransactions: (): Promise<TransactionItem[]> => Promise.resolve([]),
  getPlanOptions: (): Promise<PlanOption[]> => Promise.resolve([]),
  getTopUpMethods: (): Promise<TopUpMethod[]> => Promise.resolve([]),
  getBankInfo: () => Promise.resolve({ ...EMPTY_BANK }),
};
