// src/features/payment/proration.ts
export interface PlanLike {
  name: string;
  price: number; 
  durationDays?: number; // thời hạn mặc định của gói
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
export function remainingValue(currentPrice: number, currentDurationDays: number, remainingDays: number): number {
  const duration = currentDurationDays || 30;
  return Math.round((currentPrice * remainingDays) / duration);
}

/**
 * Tính số tiền phải trả khi nâng cấp giữa chừng.
 * @param current  gói hiện tại 
 * @param target   gói muốn nâng lên 
 * @param expiresAt thời điểm hết hạn của gói hiện tại
 */
export function computeUpgrade(
  current: PlanLike | null,
  target: PlanLike,
  expiresAt?: string | null,
): ProrationResult {
  const remainingDays = remainingDaysUntil(expiresAt);
  const currentDuration = current?.durationDays || 30;
  const targetDuration = target.durationDays || 30;
  
  const rv = current ? remainingValue(current.price, currentDuration, remainingDays) : 0;
  // Trả chênh lệch: giá gói mới (1 chu kỳ) trừ đi giá trị còn lại của gói cũ.
  const amountDue = Math.max(0, target.price - rv);
  
  return {
    remainingDays,
    remainingValue: rv,
    amountDue,
    daysCovered: targetDuration, // Admin giờ cố định ngày mua
  };
}
