import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import Avatar from '../components/Avatar';
import TableActionButton from '../components/TableActionButton';
import AdminPagination from '../components/AdminPagination';
import EmptyState from '../components/EmptyState';
import { approvalApi, ApprovalItem } from '../api/approvalApi';
import { AllPages } from '../App';
import { FileText, Check, X, ClipboardCheck } from 'lucide-react';

const AdminHistoryApproval: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [list, setList] = useState<ApprovalItem[]>([]);

  const fetchList = () => approvalApi.getPendingList().then(setList);
  useEffect(() => { fetchList(); }, []);

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    if (action === 'approve') await approvalApi.approve(id);
    else await approvalApi.reject(id);
    fetchList();
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <AdminSidebar onNavigate={onNavigate} activeTab="adminHistoryApproval" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Phê duyệt tài liệu" placeholder="Tìm kiếm nội dung chờ duyệt..." />
        <main className="flex-1 p-8 flex flex-col gap-5">
          <div className="w-full bg-card border border-line rounded-2xl shadow-[0_1px_2px_rgba(20,15,40,0.04)] overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="text-[17px] font-extrabold">Đang chờ duyệt</h2>
              <span className="text-ink-soft text-[13.5px] font-semibold">{list.length} mục</span>
            </div>

            {list.length === 0 ? (
              <EmptyState icon={<ClipboardCheck size={24} strokeWidth={1.75} />} title="Không có tài liệu chờ duyệt" description="Mọi yêu cầu đã được xử lý." />
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-alt h-[52px] text-[13px] font-bold text-ink-soft uppercase tracking-wide border-b border-line">
                    <th className="px-6 w-[42%]">Tên tài liệu</th>
                    <th className="px-6 w-[24%]">Người tải lên</th>
                    <th className="px-6 w-[12%]">Ngày gửi</th>
                    <th className="px-6 w-[22%] text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item) => (
                    <tr key={item.id} className="h-[72px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-colors">
                      <td className="px-6">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                            <FileText size={18} strokeWidth={2} />
                          </div>
                          <span className="font-bold text-[14.5px] truncate">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={item.uploader} size={30} />
                          <span className="text-ink-soft font-semibold text-[14px]">{item.uploader}</span>
                        </div>
                      </td>
                      <td className="px-6 text-ink-soft font-medium text-[14px]">{item.date}</td>
                      <td className="px-6">
                        <div className="flex justify-end gap-2">
                          <TableActionButton label="Từ chối" icon={<X size={14} />} variant="danger" onClick={() => handleAction(item.id, 'reject')} />
                          <TableActionButton label="Duyệt" icon={<Check size={14} />} variant="success" onClick={() => handleAction(item.id, 'approve')} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <AdminPagination currentPage={1} totalPages={1} />
        </main>
      </div>
    </div>
  );
};

export default AdminHistoryApproval;
