<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// src/features/admin/services/paymentApi.ts
// Service Payment/Premium (phía user).
//
// ⚙️ CHỈNH THÔNG TIN GÓI PLUS / PRO Ở ĐÂY:
//    Sửa mảng PLAN_OPTIONS bên dưới (tên, giá, quyền lợi, gói nổi bật).
//    Tương tự có TOP_UP_METHODS (phương thức nạp) và BANK_INFO (màn chuyển khoản).
//
// TODO(backend): khi có API thật, thay các Promise.resolve(...) bằng
//    api<T>("/api/payment/..."). Lúc đó có thể xoá các hằng cứng bên dưới.

import type { TransactionItem, PlanOption, TopUpMethod } from "../types/admin.types";

// ─────────── NỘI DUNG GÓI (sửa ở đây) ───────────
=======
// Service Payment/Premium (user). Nội dung gói/bank/methods để cứng ở đây cho
// dễ chỉnh; lịch sử giao dịch lấy qua api() từ backend.
import { api } from "@/lib/api";
import type {
  TransactionItem,
  PlanOption,
  TopUpMethod,
} from "../types/admin.types";

// ⚙️ CHỈNH GÓI PLUS / PRO Ở ĐÂY
>>>>>>> origin/Flashcars
const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "PLUS",
    name: "Premium Plus",
<<<<<<< HEAD
    price: 99_000, // VND / tháng
=======
    price: 99_000,
>>>>>>> origin/Flashcars
    tagline: "Phù hợp cho cá nhân học tập nghiêm túc",
    features: [
      "Lưu trữ 50 GB",
      "Tải lên không giới hạn",
      "Trợ lý AI cơ bản",
      "Không quảng cáo",
    ],
  },
  {
    id: "PRO",
    name: "Premium Pro",
<<<<<<< HEAD
    price: 199_000, // VND / tháng
=======
    price: 199_000,
>>>>>>> origin/Flashcars
    tagline: "Toàn bộ tính năng, dành cho người dùng chuyên sâu",
    features: [
      "Lưu trữ 200 GB",
      "Trợ lý AI nâng cao",
      "Ưu tiên xử lý",
      "Hỗ trợ 24/7",
      "Chia sẻ nhóm",
    ],
<<<<<<< HEAD
    highlighted: true, // gói được đánh dấu "Phổ biến"
  },
];

// ─────────── PHƯƠNG THỨC NẠP TIỀN (sửa ở đây) ───────────
=======
    highlighted: true,
  },
];
>>>>>>> origin/Flashcars
const TOP_UP_METHODS: TopUpMethod[] = [
  {
    id: "bank",
    category: "CHUYỂN KHOẢN",
    title: "Nạp qua ngân hàng ACB",
<<<<<<< HEAD
    description: "Chuyển khoản với nội dung — hệ thống tự động cộng tiền ngay sau 1 phút.",
=======
    description:
      "Chuyển khoản với nội dung — hệ thống tự động cộng tiền ngay sau 1 phút.",
>>>>>>> origin/Flashcars
    instant: true,
    recommended: true,
  },
  {
    id: "card",
    category: "THẺ ĐIỆN THOẠI",
    title: "Nạp thẻ cào",
<<<<<<< HEAD
    description: "Hỗ trợ Viettel, Vinaphone, Mobifone, Zing, Garena với chiết khấu hấp dẫn – tự động cộng số dư.",
    instant: true,
  },
];

// ─────────── THÔNG TIN CHUYỂN KHOẢN (sửa ở đây) ───────────
=======
    description:
      "Hỗ trợ Viettel, Vinaphone, Mobifone, Zing, Garena – tự động cộng số dư.",
    instant: true,
  },
];
>>>>>>> origin/Flashcars
const BANK_INFO = {
  bankName: "ACB Bank",
  bankShort: "ACB",
  accountName: "NGO THI HUYEN",
  accountNumber: "22554141",
  transferContent: "W23758B",
};

export const paymentApi = {
<<<<<<< HEAD
  // Lịch sử giao dịch — để rỗng, lấy từ backend khi sẵn sàng.
  getTransactions: (): Promise<TransactionItem[]> => Promise.resolve([]),

=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
// Service Payment/Premium (user). Nội dung gói/bank/methods để cứng ở đây cho
// dễ chỉnh; lịch sử giao dịch lấy qua api() từ backend.
import { api } from "@/lib/api";
import type { TransactionItem, PlanOption, TopUpMethod } from "../types/admin.types";

// ⚙️ CHỈNH GÓI PLUS / PRO Ở ĐÂY
const PLAN_OPTIONS: PlanOption[] = [
  { id: "PLUS", name: "Premium Plus", price: 99_000, tagline: "Phù hợp cho cá nhân học tập nghiêm túc",
    features: ["Lưu trữ 50 GB", "Tải lên không giới hạn", "Trợ lý AI cơ bản", "Không quảng cáo"] },
  { id: "PRO", name: "Premium Pro", price: 199_000, tagline: "Toàn bộ tính năng, dành cho người dùng chuyên sâu",
    features: ["Lưu trữ 200 GB", "Trợ lý AI nâng cao", "Ưu tiên xử lý", "Hỗ trợ 24/7", "Chia sẻ nhóm"], highlighted: true },
];
const TOP_UP_METHODS: TopUpMethod[] = [
  { id: "bank", category: "CHUYỂN KHOẢN", title: "Nạp qua ngân hàng ACB", description: "Chuyển khoản với nội dung — hệ thống tự động cộng tiền ngay sau 1 phút.", instant: true, recommended: true },
  { id: "card", category: "THẺ ĐIỆN THOẠI", title: "Nạp thẻ cào", description: "Hỗ trợ Viettel, Vinaphone, Mobifone, Zing, Garena – tự động cộng số dư.", instant: true },
];
const BANK_INFO = { bankName: "ACB Bank", bankShort: "ACB", accountName: "NGO THI HUYEN", accountNumber: "22554141", transferContent: "W23758B" };

export const paymentApi = {
  getTransactions: () => api<TransactionItem[]>("/api/payment/transactions"),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
  getPlanOptions: (): Promise<PlanOption[]> => Promise.resolve([...PLAN_OPTIONS]),
  getTopUpMethods: (): Promise<TopUpMethod[]> => Promise.resolve([...TOP_UP_METHODS]),
=======
  getTransactions: () => api<TransactionItem[]>("/api/payment/transactions"),
  getPlanOptions: (): Promise<PlanOption[]> =>
    Promise.resolve([...PLAN_OPTIONS]),
  getTopUpMethods: (): Promise<TopUpMethod[]> =>
    Promise.resolve([...TOP_UP_METHODS]),
>>>>>>> origin/Flashcars
  getBankInfo: () => Promise.resolve({ ...BANK_INFO }),
=======
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
  id: number;
  name: string;
  description: string;
  storageGb: number;
  aiQuestions: number;
  price: number;      // giá cho 30 ngày (VNĐ)
  isActive: boolean;
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
  adminUpdatePlan: (id: number, body: Partial<Omit<AdminPlan, "id">>): Promise<AdminPlan> =>
    api<AdminPlan>(`/api/admin/plans/${id}`, { method: "PUT", body }),

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
>>>>>>> origin/final/demo-v1
};
