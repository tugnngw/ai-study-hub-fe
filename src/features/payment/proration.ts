// src/features/payment/proration.ts
// -----------------------------------------------------------------------------
// Tính toán đổi/nâng gói theo NGUYÊN TẮC: không đổi gói trực tiếp giữa chừng.
// Thay vào đó quy đổi số ngày còn lại của gói hiện tại thành tiền, trừ vào
// giá của gói mới, ra số tiền thực phải trả cho phần ngày còn lại.
//
// Ví dụ (theo yêu cầu):
//   Đang gói PLUS 99k / 30 ngày, đã dùng 10 ngày → còn 20 ngày.
//   Giá trị còn lại = 99k * 20/30 = 66k.
//   Nâng lên PREMIUM 159k / 30 ngày cho phần 20 ngày còn lại:
//     giá premium cho 20 ngày = 159k * 20/30 = 106k
//   => nhưng theo yêu cầu người dùng: 159 - 66 = 93k cho 20 ngày còn lại.
//   (Tức: trả thẳng chênh lệch giá 30 ngày trừ đi giá trị còn lại của gói cũ.)
// -----------------------------------------------------------------------------

const CYCLE_DAYS = 30;

export interface PlanLike {
  name: string;
  price: number; // giá cho 1 chu kỳ CYCLE_DAYS ngày
}

export interface ProrationResult {
  remainingDays: number;
  remainingValue: number; // giá trị quy đổi số ngày còn lại của gói CŨ
  amountDue: number; // số tiền phải trả
  daysCovered: number; // số ngày gói mới sẽ áp dụng
}

// Số ngày còn lại tính từ ngày hết hạn.
export function remainingDaysUntil(expiresAt?: string | null): number {
  if (!expiresAt) return 0;
  const end = new Date(expiresAt).getTime();
  const now = Date.now();
  if (Number.isNaN(end) || end <= now) return 0;
  return Math.ceil((end - now) / 86_400_000);
}

// Giá trị quy đổi của số ngày còn lại theo giá gói CŨ.
export function remainingValue(currentPrice: number, remainingDays: number): number {
  return Math.round((currentPrice * remainingDays) / CYCLE_DAYS);
}

/**
 * Tính số tiền phải trả khi nâng cấp giữa chừng.
 * @param current  gói hiện tại (giá 30 ngày)
 * @param target   gói muốn nâng lên (giá 30 ngày)
 * @param expiresAt thời điểm hết hạn của gói hiện tại
 */
export function computeUpgrade(
  current: PlanLike | null,
  target: PlanLike,
  expiresAt?: string | null,
): ProrationResult {
  const remainingDays = remainingDaysUntil(expiresAt);
  const rv = current ? remainingValue(current.price, remainingDays) : 0;
  // Trả chênh lệch: giá gói mới (1 chu kỳ) trừ đi giá trị còn lại của gói cũ.
  const amountDue = Math.max(0, target.price - rv);
  return {
    remainingDays,
    remainingValue: rv,
    amountDue,
    // Phần ngày còn lại của chu kỳ được giữ nguyên cho gói mới.
    daysCovered: remainingDays > 0 ? remainingDays : CYCLE_DAYS,
  };
}

/**
 * Mua mới theo số ngày người dùng chọn (không đổi gói — chỉ FREE → trả phí,
 * hoặc gia hạn cùng gói). Giá = đơn giá/ngày * số ngày.
 */
export function priceForDays(planPrice: number, days: number): number {
  const daily = planPrice / CYCLE_DAYS;
  return Math.round(daily * days);
}

export const PRORATION_CYCLE_DAYS = CYCLE_DAYS;
