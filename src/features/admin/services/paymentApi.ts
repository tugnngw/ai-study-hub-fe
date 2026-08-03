import { api } from "@/lib/api";
import type { PlanOption, TransactionItem } from "../types/admin.types";

interface BackendPlan {
  id: string;
  name: string;
  description: string;
  storageGb: number;
  aiQuestions: number;
  chatLimit?: number;
  flashcardLimit?: number;
  questionLimit?: number;
  summaryLimit?: number;
  price: number;
  durationDays?: number;
  isActive: boolean;
}

export interface PaymentStatusResponse {
  orderCode: number;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'EXPIRED';
  amount: number;
  createdAt: string;
  updatedAt: string;
  planName: string | null;
  transactionId: string | null;
  paid: boolean;
  pending: boolean;
  failed: boolean;
  statusMessage: string;
}

export interface UpgradePreviewResponse {
  currentPlanName: string;
  newPlanName: string;
  newPlanPrice: number;
  remainingDays: number;
  remainingCredit: number;
  amountToPay: number;
  formattedAmount?: string;
  savingMessage?: string | null;
}

export interface RevenueStatsResponse {
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  totalPaidTransactions: number;
  totalFailedTransactions: number;
  successRate: number;
}

interface PaymentResponse {
  checkoutUrl: string;
  orderCode: number;
  amount: number;
  expiredAt: string;
  qrCode: string | null;
}

interface UserTransactionResponse {
  id: string;
  accountId: string;
  planName: string;
  amount: number;
  status: string;
  description: string;
  transactionId: string;
  payosOrderCode: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminTransactionResponse {
  id: string;
  accountId: string;
  userName?: string;
  userEmail?: string;
  planName: string;
  amount: number;
  status: string;
  description: string;
  transactionId: string;
  payosOrderCode: number;
  paymentMethod: string;
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

export interface AdminPlan {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  durationDays?: number;
  storageGb: number;
  aiQuestions: number;
  features?: string[];
  isPopular?: boolean;
  displayOrder?: number;
  isActive: boolean;
  activeSubscriptionCount?: number;
  flashcardLimit?: number;
  questionLimit?: number;
  summaryLimit?: number;
  chatLimit?: number;
  tier: number;
}

export interface SubscriptionResponse {
  id: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate?: string | null;
  status: string;
  pricePaid: number;
  storageGbGranted?: number;
  aiQuestionsGranted?: number;
  flashcardLimitGranted?: number;
  questionLimitGranted?: number;
  summaryLimitGranted?: number;
  chatLimitGranted?: number;
  tierGranted?: number;
  daysRemaining?: number;
}

export const paymentApi = {
  adminGetPlans: (): Promise<AdminPlan[]> => api<AdminPlan[]>("/api/admin/plans"),
  adminGetPlanById: (id: string): Promise<AdminPlan> => api<AdminPlan>(`/api/admin/plans/${id}`),
  adminCreatePlan: (body: Omit<AdminPlan, "id" | "activeSubscriptionCount">): Promise<AdminPlan> =>
    api<AdminPlan>("/api/admin/plans", { method: "POST", body }),
  adminUpdatePlan: (id: string, body: Partial<Omit<AdminPlan, "id">>): Promise<AdminPlan> =>
    api<AdminPlan>(`/api/admin/plans/${id}`, { method: "PUT", body }),
  adminDeletePlan: (id: string): Promise<void> =>
    api<void>(`/api/admin/plans/${id}`, { method: "DELETE" }),
  adminRestorePlan: (id: string): Promise<void> =>
    api<void>(`/api/admin/plans/${id}/restore`, { method: "PATCH" }),

  getPlans: async (): Promise<AdminPlan[]> => {
    try {
      return await api<AdminPlan[]>("/api/plans");
    } catch {
      return await api<AdminPlan[]>("/api/admin/plans");
    }
  },

  getPlanOptions: async (): Promise<PlanOption[]> => {
    const plans = await api<BackendPlan[]>("/api/payment/plans");
    return plans
      .filter((p) => p.name !== "Free" && p.name !== "Basic" && p.isActive)
      .map((p) => {
        const isPremium = p.name === "Premium";
        return {
          id: p.id,
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
      body: { planId },
    }),

  getMySubscription: (): Promise<SubscriptionResponse> =>
    api<SubscriptionResponse>("/api/payment/my-subscription"),

  previewUpgrade: (planId: string): Promise<UpgradePreviewResponse> =>
    api<UpgradePreviewResponse>(`/api/payment/upgrade-preview?planId=${encodeURIComponent(planId)}`),

  getTransactionStatus: (orderCode: number): Promise<PaymentStatusResponse> =>
    api<PaymentStatusResponse>(`/api/payment/status/${orderCode}`),

  getRevenueStats: (): Promise<RevenueStatsResponse> =>
    api<RevenueStatsResponse>("/api/admin/dashboard/revenue"),

  getTransactions: (): Promise<UserTransactionResponse[]> => 
    api<UserTransactionResponse[]>("/api/payment/my-transactions"),
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
