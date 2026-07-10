// src/lib/config.ts
// -----------------------------------------------------------------------------
// Cấu hình toàn cục chỉnh trong CODE (không qua giao diện admin).
// -----------------------------------------------------------------------------

// Số kỳ học của chương trình. Muốn thêm/bớt kỳ chỉ cần đổi con số này.
// Ví dụ: đổi thành 8 nếu chương trình có 8 kỳ, 10 nếu có 10 kỳ.
export const SEMESTER_COUNT = 9;

// Danh sách kỳ [1..SEMESTER_COUNT] — dùng cho các ô chọn kỳ.
export const SEMESTERS: number[] = Array.from(
  { length: SEMESTER_COUNT },
  (_, i) => i + 1,
);

// -----------------------------------------------------------------------------
// Tiện ích dung lượng: hệ thống lưu gói theo GB (cho phép số thập phân),
// nhưng admin có thể nhập theo MB hoặc GB. 1 GB = 1024 MB.
// -----------------------------------------------------------------------------
export const MB_PER_GB = 1024;

// Quy đổi GB → MB.
export const gbToMb = (gb: number): number => gb * MB_PER_GB;
// Quy đổi MB → GB.
export const mbToGb = (mb: number): number => mb / MB_PER_GB;

// Hiển thị dung lượng ở đơn vị dễ đọc nhất (MB nếu < 1 GB, ngược lại GB).
export function formatStorage(gb: number): string {
  if (gb == null || Number.isNaN(gb)) return "—";
  if (gb < 1) {
    const mb = Math.round(gb * MB_PER_GB);
    return `${mb} MB`;
  }
  // Bỏ số 0 thừa: 5.00 → 5, 1.50 → 1.5
  const val = Number.isInteger(gb) ? gb : Number(gb.toFixed(2));
  return `${val} GB`;
}
