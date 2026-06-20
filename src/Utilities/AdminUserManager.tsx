import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import Avatar from '../components/Avatar';
import StatusBadge from '../components/StatusBadge';
import TableActionButton from '../components/TableActionButton';
import AdminPagination from '../components/AdminPagination';
import EmptyState from '../components/EmptyState';
import { userApi, UserItem } from '../api/userApi';
import { AllPages } from '../App';
import { Lock, Unlock, Trash2, Users } from 'lucide-react';

const AdminUserManager: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const fetchUsers = () => userApi.getUsers().then(setUsers);
  useEffect(() => { fetchUsers(); }, []);

  const filtered = useMemo(
    () => users.filter(
      (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
    ),
    [users, query]
  );

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <AdminSidebar onNavigate={onNavigate} activeTab="adminUserManager" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Quản lý Users" placeholder="Tìm kiếm tên hoặc email..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <main className="flex-1 p-8 flex flex-col gap-5">
          <div className="w-full bg-card border border-line rounded-2xl shadow-[0_1px_2px_rgba(20,15,40,0.04)] overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="text-[17px] font-extrabold">Danh sách thành viên</h2>
              <span className="text-ink-soft text-[13.5px] font-semibold">{filtered.length} thành viên</span>
            </div>

            {filtered.length === 0 ? (
              <EmptyState icon={<Users size={24} strokeWidth={1.75} />} title="Không tìm thấy thành viên" description="Thử thay đổi từ khóa tìm kiếm." />
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-alt h-[52px] text-[13px] font-bold text-ink-soft uppercase tracking-wide border-b border-line">
                    <th className="px-6 w-[40%]">Thành viên</th>
                    <th className="px-6 w-[30%]">Email</th>
                    <th className="px-6 w-[15%]">Trạng Thái</th>
                    <th className="px-6 w-[15%] text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="h-[72px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-colors">
                      <td className="px-6">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} />
                          <span className="font-bold text-[14.5px]">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 text-ink-soft font-medium text-[14.5px]">{u.email}</td>
                      <td className="px-6">
                        <StatusBadge label={u.status} tone={u.status === 'Hoạt động' ? 'success' : 'danger'} />
                      </td>
                      <td className="px-6">
                        <div className="flex justify-end gap-2">
                          <TableActionButton
                            label={u.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}
                            icon={u.status === 'Hoạt động' ? <Lock size={14} /> : <Unlock size={14} />}
                            onClick={async () => { await userApi.toggleStatus(u.id); fetchUsers(); }}
                          />
                          <TableActionButton
                            label="Xóa"
                            icon={<Trash2 size={14} />}
                            variant="danger"
                            onClick={async () => { if (window.confirm('Xóa thành viên?')) { await userApi.deleteUser(u.id); fetchUsers(); } }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <AdminPagination currentPage={page} totalPages={1} onPageChange={setPage} />
        </main>
      </div>
    </div>
  );
};

export default AdminUserManager;
