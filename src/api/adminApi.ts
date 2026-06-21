export interface AdminAccount {
  fullName: string;
  email: string;
  role: string;
  phone: string;
  joinedLabel: string;
}

// Tài khoản quản trị viên hiện đang đăng nhập (mock — thay bằng API thật khi tích hợp backend)
export const CURRENT_ADMIN: AdminAccount = {
  fullName: 'Nguyen Van A',
  email: 'admin@aistudyhub.vn',
  role: 'Quản trị viên',
  phone: '',
  joinedLabel: 'tháng 6, 2026',
};
