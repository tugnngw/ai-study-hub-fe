// src/features/shares/components/avatar-utils.ts
// Tiện ích cho avatar (màu nền theo tên, chữ cái đầu).
const PALETTE = ["#F4F0FF", "#EAFBF1", "#FFF6E7", "#FDEEF1", "#E7F4FF"];
export function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
export const initial = (n: string) => (n?.trim()?.[0] ?? "?").toUpperCase();
