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
const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "PLUS",
    name: "Premium Plus",
    price: 99_000, // VND / tháng
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
    price: 199_000, // VND / tháng
    tagline: "Toàn bộ tính năng, dành cho người dùng chuyên sâu",
    features: [
      "Lưu trữ 200 GB",
      "Trợ lý AI nâng cao",
      "Ưu tiên xử lý",
      "Hỗ trợ 24/7",
      "Chia sẻ nhóm",
    ],
    highlighted: true, // gói được đánh dấu "Phổ biến"
  },
];

// ─────────── PHƯƠNG THỨC NẠP TIỀN (sửa ở đây) ───────────
const TOP_UP_METHODS: TopUpMethod[] = [
  {
    id: "bank",
    category: "CHUYỂN KHOẢN",
    title: "Nạp qua ngân hàng ACB",
    description: "Chuyển khoản với nội dung — hệ thống tự động cộng tiền ngay sau 1 phút.",
    instant: true,
    recommended: true,
  },
  {
    id: "card",
    category: "THẺ ĐIỆN THOẠI",
    title: "Nạp thẻ cào",
    description: "Hỗ trợ Viettel, Vinaphone, Mobifone, Zing, Garena với chiết khấu hấp dẫn – tự động cộng số dư.",
    instant: true,
  },
];

// ─────────── THÔNG TIN CHUYỂN KHOẢN (sửa ở đây) ───────────
const BANK_INFO = {
  bankName: "ACB Bank",
  bankShort: "ACB",
  accountName: "NGO THI HUYEN",
  accountNumber: "22554141",
  transferContent: "W23758B",
};

export const paymentApi = {
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
  getBankInfo: () => Promise.resolve({ ...BANK_INFO }),
};
