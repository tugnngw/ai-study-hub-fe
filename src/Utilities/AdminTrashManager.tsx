import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import SubTabFilter from '../components/SubTabFilter';
import TableActionButton from '../components/TableActionButton';
import AdminPagination from '../components/AdminPagination';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import { fileApi, DeletedFileItem, DeletedAccountItem } from '../api/fileApi';
import { AllPages } from '../App';
import { FileText, RotateCcw, Trash2, Info } from 'lucide-react';

const CountdownBadge: React.FC<{ days: number }> = ({ days }) => {
  const tone = days <= 5 ? 'text-danger bg-danger-bg' : 'text-warning bg-warning-bg';
  return <span className={`inline-block px-2.5 py-1 rounded-full text-[12.5px] font-bold ${tone}`}>{days} ngày</span>;
};

const AdminTrashManager: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [subTab, setSubTab] = useState<'file' | 'account'>('file');
  const [delFiles, setDelFiles] = useState<DeletedFileItem[]>([]);
  const [delAccs, setDelAccs] = useState<DeletedAccountItem[]>([]);

  const fetchTrash = () => { fileApi.getDeletedFiles().then(setDelFiles); fileApi.getDeletedAccounts().then(setDelAccs); };
  useEffect(() => { fetchTrash(); }, []);

  const handleAction = async (id: number, type: 'file' | 'account', action: 'restore' | 'delete') => {
    if (action === 'delete' && !window.confirm('Xóa vĩnh viễn mục này?')) return;
    if (action === 'delete') await fileApi.permanentDelete(id, type);
    else await fileApi.restoreItem(id, type);
    fetchTrash();
  };

  const isEmpty = subTab === 'file' ? delFiles.length === 0 : delAccs.length === 0;

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <AdminSidebar onNavigate={onNavigate} activeTab="adminTrashManager" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Thùng rác" placeholder="Tìm nội dung trong thùng rác..." />
        <main className="flex-1 p-8 flex flex-col gap-5">
          <div className="w-full bg-card border border-line rounded-2xl shadow-[0_1px_2px_rgba(20,15,40,0.04)] overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="text-[17px] font-extrabold">Thùng rác</h2>
              <SubTabFilter tabs={[{ id: 'file', label: 'File' }, { id: 'account', label: 'Tài khoản' }]} activeTab={subTab} onChange={setSubTab} />
            </div>

            {isEmpty ? (
              <EmptyState icon={<Trash2 size={24} strokeWidth={1.75} />} title="Thùng rác trống" description="Các mục đã xóa sẽ xuất hiện ở đây trong 30 ngày." />
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-alt h-[52px] text-[13px] font-bold text-ink-soft uppercase tracking-wide border-b border-line">
                    <th className="px-6 w-[42%]">{subTab === 'file' ? 'Tên File' : 'Chủ tài khoản'}</th>
                    <th className="px-6 w-[22%]">{subTab === 'file' ? 'Ngày xóa' : 'Email'}</th>
                    <th className="px-6 w-[14%]">Còn lại</th>
                    <th className="px-6 w-[22%] text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {subTab === 'file'
                    ? delFiles.map((f) => (
                        <tr key={f.id} className="h-[72px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-colors">
                          <td className="px-6">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-surface-alt text-ink-soft flex items-center justify-center shrink-0">
                                <FileText size={18} strokeWidth={2} />
                              </div>
                              <span className="font-bold text-[14.5px] truncate">{f.name}</span>
                            </div>
                          </td>
                          <td className="px-6 text-ink-soft font-medium text-[14px]">{f.deletedDate}</td>
                          <td className="px-6"><CountdownBadge days={f.remainingDays} /></td>
                          <td className="px-6">
                            <div className="flex justify-end gap-2">
                              <TableActionButton label="Khôi phục" icon={<RotateCcw size={14} />} onClick={() => handleAction(f.id, 'file', 'restore')} />
                              <TableActionButton label="Xóa vĩnh viễn" icon={<Trash2 size={14} />} variant="danger" onClick={() => handleAction(f.id, 'file', 'delete')} />
                            </div>
                          </td>
                        </tr>
                      ))
                    : delAccs.map((a) => (
                        <tr key={a.id} className="h-[72px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-colors">
                          <td className="px-6">
                            <div className="flex items-center gap-3 min-w-0">
                              <Avatar name={a.name} size={34} />
                              <span className="font-bold text-[14.5px] truncate">{a.name}</span>
                            </div>
                          </td>
                          <td className="px-6 text-ink-soft font-medium text-[14px]">{a.email}</td>
                          <td className="px-6"><CountdownBadge days={a.remainingDays} /></td>
                          <td className="px-6">
                            <div className="flex justify-end gap-2">
                              <TableActionButton label="Khôi phục" icon={<RotateCcw size={14} />} onClick={() => handleAction(a.id, 'account', 'restore')} />
                              <TableActionButton label="Xóa vĩnh viễn" icon={<Trash2 size={14} />} variant="danger" onClick={() => handleAction(a.id, 'account', 'delete')} />
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}

            {!isEmpty && (
              <div className="flex items-center gap-2 px-6 py-4 border-t border-line bg-surface-alt/50">
                <Info size={14} className="text-ink-faint shrink-0" />
                <p className="text-ink-soft text-[12.5px]">
                  Bạn có thể khôi phục hoặc xóa vĩnh viễn các mục trong thùng rác. Các mục sẽ được xóa vĩnh viễn sau 30 ngày.
                </p>
              </div>
            )}
          </div>

          <AdminPagination currentPage={1} totalPages={1} />
        </main>
      </div>
    </div>
  );
};

export default AdminTrashManager;
