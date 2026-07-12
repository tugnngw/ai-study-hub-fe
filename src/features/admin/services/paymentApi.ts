import { api } from "@/lib/api";
import type { PlanOption, TransactionItem } from "../types/admin.types";

interface BackendPlan {
  id: string;
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

const PLAN_ID_MAP: Record<string, number> = {
  PRO: 2,
  PLUS: 3,
};

// Gói trả về nguyên bản từ BE (dùng cho trang quản trị chỉnh sửa giá trị).
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
}

// Kết quả tính toán khi user đổi/nâng gói giữa chừng (proration).
// Nguyên tắc: KHÔNG đổi gói trực tiếp. Quy đổi số ngày còn lại của gói cũ ra
// tiền, trừ vào giá gói mới để ra số tiền phải trả cho phần ngày còn lại.
export interface UpgradeQuote {
  currentPlan: string;
  targetPlan: string;
  remainingDays: number;     // số ngày còn lại của gói hiện tại
  remainingValue: number;    // giá trị quy đổi của số ngày còn lại (VNĐ)
  targetDailyPrice: number;  // đơn giá/ngày của gói mới
  daysCovered: number;       // số ngày gói mới được cấp sau khi bù trừ
  amountDue: number;         // số tiền thực phải trả
}

export const paymentApi = {
  // ── ADMIN: quản lý giá trị các gói ────────────────────────
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

  // ── PUBLIC: user đọc danh sách gói (đã đồng bộ với chỉnh sửa của admin) ──
  // Ưu tiên endpoint công khai; nếu BE chưa có, fallback dùng /api/admin/plans.
  getPlans: async (): Promise<AdminPlan[]> => {
    try {
      return await api<AdminPlan[]>("/api/plans");
    } catch {
      return await api<AdminPlan[]>("/api/admin/plans");
    }
  },

  // ── Đổi/nâng gói theo số ngày (proration) ─────────────────
  // FE gọi để BE báo lại số tiền phải trả sau khi bù trừ ngày còn lại.
  getUpgradeQuote: (planId: number, days: number): Promise<UpgradeQuote> =>
    api<UpgradeQuote>(`/api/payment/quote?planId=${planId}&days=${days}`),
  // Tạo link thanh toán theo số ngày người dùng chọn (thay vì cố định 1 tháng).
  createPaymentByDays: (planId: number, days: number): Promise<PaymentResponse> =>
    api("/api/payment/create", { method: "POST", body: { planId, days } }),

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
