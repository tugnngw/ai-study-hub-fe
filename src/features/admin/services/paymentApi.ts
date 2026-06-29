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
  getPlanOptions: (): Promise<PlanOption[]> => Promise.resolve([...PLAN_OPTIONS]),
  getTopUpMethods: (): Promise<TopUpMethod[]> => Promise.resolve([...TOP_UP_METHODS]),
  getBankInfo: () => Promise.resolve({ ...BANK_INFO }),
};
