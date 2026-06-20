export interface DashboardStats {
  totalUsers: number;
  totalUsersTrend: number;
  totalDocs: number;
  totalDocsTrend: number;
  totalDownloads: number;
  totalDownloadsTrend: number;
  pendingApprovals: number;
}

export interface ActivityItem {
  id: number;
  title: string;
  actor: string;
  type: 'user' | 'upload' | 'report' | 'delete';
  time: string;
}

const mockActivity: ActivityItem[] = [
  { id: 1, title: 'User mới đăng ký', actor: 'Nguyễn Văn F', type: 'user', time: '5 phút trước' },
  { id: 2, title: 'Upload tài liệu', actor: 'Nguyễn Thị Thị B', type: 'upload', time: '12 phút trước' },
  { id: 3, title: 'Báo cáo vi phạm', actor: 'Lê Văn C', type: 'report', time: '28 phút trước' },
  { id: 4, title: 'Xóa tài liệu', actor: 'Admin Accounts', type: 'delete', time: '1 giờ trước' },
];

export const dashboardApi = {
  getStats: (): Promise<DashboardStats> =>
    Promise.resolve({
      totalUsers: 1248,
      totalUsersTrend: 12,
      totalDocs: 15432,
      totalDocsTrend: 8,
      totalDownloads: 8912,
      totalDownloadsTrend: 23,
      pendingApprovals: 14,
    }),
  getRecentActivity: (): Promise<ActivityItem[]> => Promise.resolve([...mockActivity]),
};
