import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import EmptyState from '../components/EmptyState';
import Avatar from '../components/Avatar';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { SharedDocumentItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { FileText, Users } from 'lucide-react';

const UserShared: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [shared, setShared] = useState<SharedDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workspaceApi.getShared().then((d) => { setShared(d); setLoading(false); });
  }, []);

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userShared" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Được chia sẻ với tôi" placeholder="Tìm kiếm tài liệu được chia sẻ..." />
        <main className="flex-1 animate-fade-in-up p-8">
          <div className="w-full bg-card border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="font-display text-[17px] font-bold">Tài liệu được chia sẻ</h2>
              <span className="text-ink-soft text-[13.5px] font-semibold">{shared.length} tài liệu</span>
            </div>

            {!loading && shared.length === 0 ? (
              <EmptyState icon={<Users size={24} strokeWidth={1.75} />} title="Chưa có tài liệu được chia sẻ" description="Các tài liệu người khác chia sẻ với bạn sẽ xuất hiện ở đây." />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 p-6">
                {shared.map((d) => (
                  <div key={d.id} className="bg-surface-alt/50 border border-line rounded-xl p-4 flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                      <FileText size={18} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[14.5px] truncate">{d.title}</div>
                      <div className="text-ink-soft text-[13px] truncate">{d.description}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar name={d.sharedBy} size={22} />
                        <span className="text-ink-soft text-[12.5px] font-semibold">Chia sẻ bởi {d.sharedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserShared;
