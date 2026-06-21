export type NotificationType =
  | 'approval' // tài liệu được duyệt
  | 'rejected' // tài liệu bị từ chối
  | 'report' // báo cáo vi phạm
  | 'pending' // tài liệu chờ duyệt (admin)
  | 'newUser' // user mới đăng ký (admin)
  | 'share' // được chia sẻ tài liệu
  | 'storage' // cảnh báo dung lượng
  | 'system'; // thông báo hệ thống chung

export type NotificationRole = 'user' | 'admin';

export interface AppNotification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Dữ liệu mẫu tách riêng theo role — nội dung admin xoay quanh việc VẬN HÀNH
// hệ thống (duyệt tài liệu, báo cáo vi phạm, user mới...), còn nội dung user
// xoay quanh TÀI LIỆU CỦA CHÍNH HỌ (được duyệt/từ chối, được chia sẻ...).
// Module-level để giữ trạng thái "đã đọc" trong suốt phiên làm việc, kể cả
// khi AdminHeader unmount/mount lại lúc điều hướng qua các trang khác nhau.

let mockUserNotifications: AppNotification[] = [
  {
    id: 1,
    type: 'approval',
    title: 'Tài liệu đã được duyệt',
    message: '"Báo cáo Thực tập Tốt nghiệp.pdf" đã được phê duyệt và xuất bản.',
    time: '5 phút trước',
    read: false,
  },
  {
    id: 2,
    type: 'share',
    title: 'Tài liệu được chia sẻ với bạn',
    message: 'Trần Thị Hoa đã chia sẻ thư mục "Đồ án Cơ sở dữ liệu" với bạn.',
    time: '32 phút trước',
    read: false,
  },
  {
    id: 3,
    type: 'rejected',
    title: 'Tài liệu bị từ chối',
    message: '"Tiểu luận Triết học.docx" không đáp ứng tiêu chuẩn kiểm duyệt nội dung.',
    time: '1 giờ trước',
    read: false,
  },
  {
    id: 4,
    type: 'storage',
    title: 'Dung lượng lưu trữ sắp đầy',
    message: 'Bạn đã sử dụng 92% dung lượng Cloud được cấp. Hãy dọn dẹp bớt Thùng rác.',
    time: '3 giờ trước',
    read: true,
  },
  {
    id: 5,
    type: 'report',
    title: 'Tài liệu của bạn bị báo cáo',
    message: '"Slide Bài giảng Java.pptx" vừa nhận được 1 báo cáo vi phạm bản quyền.',
    time: 'Hôm qua',
    read: true,
  },
  {
    id: 6,
    type: 'system',
    title: 'Cập nhật hệ thống',
    message: 'Hệ thống vừa được nâng cấp, tốc độ tải lên/tải xuống tài liệu nhanh hơn.',
    time: '2 ngày trước',
    read: true,
  },
];

let mockAdminNotifications: AppNotification[] = [
  {
    id: 1,
    type: 'pending',
    title: 'Tài liệu mới chờ duyệt',
    message: '3 tài liệu vừa được tải lên đang chờ bạn phê duyệt nội dung.',
    time: '4 phút trước',
    read: false,
  },
  {
    id: 2,
    type: 'report',
    title: 'Báo cáo vi phạm mới',
    message: '"Đề thi Cuối kỳ Giải tích.pdf" vừa bị báo cáo vi phạm bản quyền.',
    time: '20 phút trước',
    read: false,
  },
  {
    id: 3,
    type: 'newUser',
    title: 'Người dùng mới đăng ký',
    message: 'Phạm Văn Minh vừa tạo tài khoản và đang chờ xác minh email.',
    time: '45 phút trước',
    read: false,
  },
  {
    id: 4,
    type: 'storage',
    title: 'Dung lượng hệ thống sắp đầy',
    message: 'Hệ thống đã sử dụng 88% tổng dung lượng lưu trữ được cấp.',
    time: '2 giờ trước',
    read: true,
  },
  {
    id: 5,
    type: 'approval',
    title: 'Đã xử lý xong báo cáo',
    message: 'Báo cáo vi phạm #1042 đã được admin Lê Thị D xử lý: gỡ tài liệu.',
    time: 'Hôm qua',
    read: true,
  },
  {
    id: 6,
    type: 'system',
    title: 'Cập nhật hệ thống',
    message: 'Hệ thống vừa được nâng cấp, tốc độ tải lên/tải xuống tài liệu nhanh hơn.',
    time: '2 ngày trước',
    read: true,
  },
];

const storeOf = (role: NotificationRole) => (role === 'admin' ? mockAdminNotifications : mockUserNotifications);

export const notificationApi = {
  getAll: (role: NotificationRole): Promise<AppNotification[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...storeOf(role)]), 350);
    });
  },

  getUnreadCount: (role: NotificationRole): Promise<number> => {
    return Promise.resolve(storeOf(role).filter((n) => !n.read).length);
  },

  markAsRead: (id: number, role: NotificationRole): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updated = storeOf(role).map((n) => (n.id === id ? { ...n, read: true } : n));
        if (role === 'admin') mockAdminNotifications = updated;
        else mockUserNotifications = updated;
        resolve(true);
      }, 150);
    });
  },

  markAllAsRead: (role: NotificationRole): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updated = storeOf(role).map((n) => ({ ...n, read: true }));
        if (role === 'admin') mockAdminNotifications = updated;
        else mockUserNotifications = updated;
        resolve(true);
      }, 200);
    });
  },
};
