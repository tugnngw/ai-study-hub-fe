import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import { workspaceApi, storageApi, CURRENT_USER } from '../api/workspaceApi';
import { NavigateFn } from '../App';
import { formatBytes } from './formatBytes';
import { Cloud, Database, HardDrive } from 'lucide-react';

const UserCloud: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [docCount, setDocCount] = useState(0);

  useEffect(() => {
    workspaceApi.getDocuments().then((d) => setDocCount(d.length));
  }, []);

  const used = storageApi.usedBytes();
  const total = storageApi.totalBytes;
  const pct = (used / total) * 100;

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userCloud" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Dung lượng Cloud" />
        <main className="flex-1 animate-fade-in-up p-8 max-w-3xl">
          <div className="bg-card border border-line rounded-2xl shadow-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                <Cloud size={24} strokeWidth={2} />
              </div>
              <div>
                <div className="text-ink-soft text-[13.5px] font-semibold">Tổng dung lượng đã dùng</div>
                <div className="font-display text-[26px] font-bold tracking-tight">
                  {formatBytes(used)} <span className="text-base text-ink-soft font-semibold">/ {formatBytes(total)}</span>
                </div>
              </div>
            </div>
            <div className="w-full h-2.5 bg-surface-alt rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-snappy" style={{ width: `${Math.min(100, pct)}%` }} />
            </div>
            <div className="text-ink-faint text-[12.5px] font-semibold">{pct.toFixed(4)}% đã sử dụng</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div className="bg-card border border-line rounded-2xl p-5 flex items-center gap-3 shadow-card">
              <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                <Database size={20} strokeWidth={2.25} />
              </div>
              <div>
                <div className="text-ink-soft text-[13.5px] font-semibold">Số tài liệu</div>
                <div className="font-display text-[22px] font-bold">{docCount}</div>
              </div>
            </div>
            <div className="bg-card border border-line rounded-2xl p-5 flex items-center gap-3 shadow-card">
              <div className="h-11 w-11 rounded-xl bg-success-bg text-success flex items-center justify-center">
                <HardDrive size={20} strokeWidth={2.25} />
              </div>
              <div>
                <div className="text-ink-soft text-[13.5px] font-semibold">Còn trống</div>
                <div className="font-display text-[22px] font-bold">{formatBytes(total - used)}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserCloud;
