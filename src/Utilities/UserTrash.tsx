import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import EmptyState from '../components/EmptyState';
import TableActionButton from '../components/TableActionButton';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { DocumentItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { FileText, Info, RotateCcw, Trash2 } from 'lucide-react';

const UserTrash: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [trash, setTrash] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = () => workspaceApi.getTrash().then((t) => { setTrash(t); setLoading(false); });
  useEffect(() => { fetchTrash(); }, []);

  const handleRestore = async (id: number) => {
    await workspaceApi.restoreFromTrash(id);
    await fetchTrash();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Xóa vĩnh viễn tài liệu này?')) return;
    await workspaceApi.permanentlyDelete(id);
    await fetchTrash();
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userTrash" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Thùng rác" placeholder="Tìm nội dung trong thùng rác..." />
        <main className="flex-1 animate-fade-in-up p-8">
          <div className="w-full bg-card border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="font-display text-[17px] font-bold">Tài liệu đã xóa</h2>
              <span className="text-ink-soft text-[13.5px] font-semibold">{trash.length} mục</span>
            </div>

            {!loading && trash.length === 0 ? (
              <EmptyState icon={<Trash2 size={24} strokeWidth={1.75} />} title="Thùng rác trống" description="Các tài liệu đã xóa sẽ ở đây trong 30 ngày." />
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-alt h-[52px] text-[13px] font-bold text-ink-soft uppercase tracking-wide border-b border-line">
                    <th className="px-6 w-[60%]">Tên tài liệu</th>
                    <th className="px-6 w-[40%] text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {trash.map((d) => (
                    <tr key={d.id} className="h-[72px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-snappy">
                      <td className="px-6">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-surface-alt text-ink-soft flex items-center justify-center shrink-0">
                            <FileText size={18} strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[14.5px] truncate">{d.title}</p>
                            <p className="text-ink-soft text-[12.5px] truncate">{d.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6">
                        <div className="flex justify-end gap-2">
                          <TableActionButton label="Khôi phục" icon={<RotateCcw size={14} />} onClick={() => handleRestore(d.id)} />
                          <TableActionButton label="Xóa vĩnh viễn" icon={<Trash2 size={14} />} variant="danger" onClick={() => handleDelete(d.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loading && trash.length > 0 && (
              <div className="flex items-center gap-2 px-6 py-4 border-t border-line bg-surface-alt/50">
                <Info size={14} className="text-ink-faint shrink-0" />
                <p className="text-ink-soft text-[12.5px]">
                  Bạn có thể khôi phục hoặc xóa vĩnh viễn các mục trong thùng rác. Các mục sẽ bị xóa vĩnh viễn sau 30 ngày.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserTrash;
