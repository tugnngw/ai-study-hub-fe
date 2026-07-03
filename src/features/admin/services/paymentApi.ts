import { api } from "@/lib/api";
import type { PlanOption, TransactionItem } from "../types/admin.types";

interface BackendPlan {
  id: number;
  name: string;
  description: string;
  storageGb: number;
  aiQuestions: number;
  price: number;
  isActive: boolean;
}

interface PaymentResponse {
  checkoutUrl: string;
  orderCode: number;
  amount: number;
}

interface AdminTransactionResponse {
  id: number;
  accountId: string;
  userEmail: string;
  userName: string;
  planName: string;
  amount: number;
  status: string;
  description: string;
  transactionId: string;
  payosOrderCode: number;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

const PLAN_ID_MAP: Record<string, number> = {
  PRO: 2,
  PLUS: 3,
};

export const paymentApi = {
  getPlanOptions: async (): Promise<PlanOption[]> => {
    const plans = await api<BackendPlan[]>("/api/payment/plans");
    return plans
      .filter((p) => p.name !== "Free" && p.name !== "Basic" && p.isActive)
      .map((p) => {
        const isPremium = p.name === "Premium";
        return {
          id: isPremium ? "PLUS" : "PRO" as any,
          name: p.name,
          price: p.price,
          tagline: p.description || "",
          features: [
            `Lưu trữ ${p.storageGb} GB`,
            p.aiQuestions > 9999 ? "Không giới hạn câu hỏi AI" : `${p.aiQuestions} câu hỏi AI`,
            isPremium ? "Hỗ trợ 24/7" : "Hỗ trợ ưu tiên",
            isPremium ? "Ưu tiên cao nhất" : "Xử lý nhanh",
          ],
          highlighted: isPremium,
        };
      });
  },
  createPayment: (planId: string): Promise<PaymentResponse> =>
    api("/api/payment/create", {
      method: "POST",
      body: { planId: PLAN_ID_MAP[planId] || 2 },
    }),
  getTransactions: () => api<TransactionItem[]>("/api/payment/my-transactions"),
  getAllTransactions: (page: number = 0, size: number = 20) =>
    api<PaginatedResponse<AdminTransactionResponse>>(
      `/api/admin/transactions?page=${page}&size=${size}`
    ),
  getTransactionsByUser: (accountId: string, page: number = 0, size: number = 20) =>
    api<PaginatedResponse<AdminTransactionResponse>>(
      `/api/admin/transactions/user/${accountId}?page=${page}&size=${size}`
    ),
  getTransactionsByStatus: (status: string, page: number = 0, size: number = 20) =>
    api<PaginatedResponse<AdminTransactionResponse>>(
      `/api/admin/transactions/status/${status}?page=${page}&size=${size}`
    ),
};
