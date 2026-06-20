import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import StatCard from '../components/StatCard';
import EmptyState from '../components/EmptyState';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { DocumentItem, FolderItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { FolderKanban, FileText, Upload, Clock, FileQuestion } from 'lucide-react';

const UserDashboard: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([workspaceApi.getFolders(), workspaceApi.getDocuments()]).then(([f, d]) => {
      setFolders(f);
      setDocs(d);
      setLoading(false);
    });
  }, []);

  const recent = [...docs]
    .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
    .slice(0, 5);

  const last7Days = recent.filter((d) => {
    if (!d.createdAt) return false;
    return Date.now() - new Date(d.createdAt).getTime() < 7 * 86400000;
  }).length;

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userDashboard" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Dashboard" placeholder="Tìm kiếm tài liệu, thư mục..." />
        <main className="flex-1 animate-fade-in-up p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
            <StatCard
              label="Thư mục"
              value={loading ? '—' : folders.length}
              icon={<FolderKanban size={20} strokeWidth={2.25} />}
              accent="brand"
            />
            <StatCard
              label="Tài liệu"
              value={loading ? '—' : docs.length}
              icon={<FileText size={20} strokeWidth={2.25} />}
              accent="success"
            />
            <StatCard
              label="Tải lên gần đây"
              value={loading ? '—' : recent.length}
              icon={<Upload size={20} strokeWidth={2.25} />}
              accent="warning"
            />
            <StatCard
              label="7 ngày qua"
              value={loading ? '—' : last7Days}
              icon={<Clock size={20} strokeWidth={2.25} />}
              accent="brand"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="w-full bg-card border border-line rounded-2xl shadow-card overflow-hidden">
              <div className="h-[64px] border-b border-line flex items-center px-6">
                <h2 className="font-display text-[17px] font-bold">Tài liệu gần đây</h2>
              </div>
              {recent.length === 0 ? (
                <EmptyState icon={<FileQuestion size={24} strokeWidth={1.75} />} title="Chưa có tài liệu nào" />
              ) : (
                <div>
                  {recent.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => onNavigate('userDocumentDetail', { docId: d.id })}
                      className="w-full flex items-center gap-3 px-6 h-[68px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-colors text-left cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                        <FileText size={18} strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[14.5px] truncate">{d.title}</p>
                        <p className="text-ink-soft text-[13px] truncate">{d.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full bg-card border border-line rounded-2xl shadow-card overflow-hidden">
              <div className="h-[64px] border-b border-line flex items-center px-6">
                <h2 className="font-display text-[17px] font-bold">Thư mục của bạn</h2>
              </div>
              {folders.length === 0 ? (
                <EmptyState icon={<FolderKanban size={24} strokeWidth={1.75} />} title="Chưa có thư mục nào" />
              ) : (
                <div>
                  {folders.slice(0, 5).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onNavigate('userFolderDetail', { folderId: f.id })}
                      className="w-full flex items-center gap-3 px-6 h-[68px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-colors text-left cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-success-bg text-success flex items-center justify-center shrink-0">
                        <FolderKanban size={18} strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[14.5px] truncate">{f.name}</p>
                        <p className="text-ink-soft text-[13px] truncate">{f.description || 'Không có mô tả'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
