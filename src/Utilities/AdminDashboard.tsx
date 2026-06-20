import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import StatCard from '../components/StatCard';
import Avatar from '../components/Avatar';
import AdminPagination from '../components/AdminPagination';
import { dashboardApi, DashboardStats, ActivityItem } from '../api/dashboardApi';
import { AllPages } from '../App';
import { Users, FileStack, Download, UserPlus, Upload, Flag, Trash } from 'lucide-react';

const activityIcon: Record<ActivityItem['type'], React.ReactNode> = {
  user: <UserPlus size={16} strokeWidth={2.25} />,
  upload: <Upload size={16} strokeWidth={2.25} />,
  report: <Flag size={16} strokeWidth={2.25} />,
  delete: <Trash size={16} strokeWidth={2.25} />,
};

const activityTone: Record<ActivityItem['type'], string> = {
  user: 'bg-brand-50 text-brand-500',
  upload: 'bg-success-bg text-success',
  report: 'bg-warning-bg text-warning',
  delete: 'bg-danger-bg text-danger',
};

const AdminDashboard: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    dashboardApi.getStats().then(setStats);
    dashboardApi.getRecentActivity().then(setActivity);
  }, []);

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <AdminSidebar onNavigate={onNavigate} activeTab="adminDashboard" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Dashboard" placeholder="Tìm kiếm số liệu..." />
        <main className="flex-1 animate-fade-in-up p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            <StatCard
              label="Tổng Users"
              value={stats?.totalUsers.toLocaleString('vi-VN') ?? '—'}
              trend={stats?.totalUsersTrend}
              icon={<Users size={20} strokeWidth={2.25} />}
              accent="brand"
            />
            <StatCard
              label="Tổng Tài liệu"
              value={stats?.totalDocs.toLocaleString('vi-VN') ?? '—'}
              trend={stats?.totalDocsTrend}
              icon={<FileStack size={20} strokeWidth={2.25} />}
              accent="success"
            />
            <StatCard
              label="Download"
              value={stats?.totalDownloads.toLocaleString('vi-VN') ?? '—'}
              trend={stats?.totalDownloadsTrend}
              icon={<Download size={20} strokeWidth={2.25} />}
              accent="warning"
            />
          </div>

          <div className="w-full bg-card border border-line rounded-2xl shadow-card">
            <div className="h-[64px] border-b border-line flex items-center px-6">
              <h2 className="font-display text-[17px] font-bold">Hoạt động gần đây</h2>
            </div>
            <div>
              {activity.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 h-[68px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-snappy">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${activityTone[item.type]}`}>
                    {activityIcon[item.type]}
                  </div>
                  <Avatar name={item.actor} size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[14.5px] truncate">{item.title}</p>
                    <p className="text-ink-soft text-[13px] truncate">{item.actor}</p>
                  </div>
                  <span className="text-ink-faint text-[13px] font-medium shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
            <div className="px-6">
              <AdminPagination currentPage={1} totalPages={1} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
