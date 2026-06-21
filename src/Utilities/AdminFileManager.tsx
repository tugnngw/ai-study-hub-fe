import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import TableActionButton from '../components/TableActionButton';
import AdminPagination from '../components/AdminPagination';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import { fileApi, ReportedFileItem } from '../api/fileApi';
import { AllPages } from '../App';
import { FileText, FileSpreadsheet, AlertTriangle, ShieldCheck, X, CheckCircle2, Flag } from 'lucide-react';

const fileIcon = (name: string) => {
  if (name.toLowerCase().endsWith('.docx') || name.toLowerCase().endsWith('.doc')) {
    return <FileSpreadsheet size={18} strokeWidth={2} />;
  }
  return <FileText size={18} strokeWidth={2} />;
};

const PAGE_SIZE = 8;

const AdminFileManager: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [files, setFiles] = useState<ReportedFileItem[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ReportedFileItem | null>(null);
  const [decision, setDecision] = useState<'remove' | 'reject' | null>(null);
  const [note, setNote] = useState('');
  const [resolved, setResolved] = useState(false);

  const fetchFiles = () => fileApi.getReportedFiles().then(setFiles);
  useEffect(() => { fetchFiles(); }, []);

  const filtered = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()) || f.uploader.toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const openModal = (file: ReportedFileItem) => {
    setSelected(file);
    setDecision(null);
    setNote('');
    setResolved(false);
  };

  const closeModal = () => setSelected(null);

  const confirmDecision = async () => {
    if (!selected || !decision) return;
    await fileApi.handleReportDecision(selected.id, decision);
    await fetchFiles();
    setResolved(true);
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <AdminSidebar onNavigate={onNavigate} activeTab="adminFileManager" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader role="admin" title="Quản lý Tài liệu" placeholder="Tìm kiếm tài liệu vi phạm..." value={query} onChange={handleSearch} />
        <main className="flex-1 animate-fade-in-up p-8 flex flex-col gap-5">
          <div className="w-full bg-card border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="font-display text-[17px] font-bold">Tài liệu bị báo cáo</h2>
              <span className="text-ink-soft text-[13.5px] font-semibold">{filtered.length} tài liệu</span>
            </div>

            {filtered.length === 0 ? (
              <EmptyState icon={<ShieldCheck size={24} strokeWidth={1.75} />} title="Không có báo cáo nào" description="Mọi tài liệu hiện đang tuân thủ quy định." />
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-alt h-[52px] text-[13px] font-bold text-ink-soft uppercase tracking-wide border-b border-line">
                    <th className="px-6 w-[38%]">Tên File</th>
                    <th className="px-6 w-[24%]">Người đăng</th>
                    <th className="px-6 w-[12%]">Kích thước</th>
                    <th className="px-6 w-[12%]">Báo cáo</th>
                    <th className="px-6 w-[14%] text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((file) => (
                    <tr key={file.id} className="h-[72px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-snappy">
                      <td className="px-6">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                            {fileIcon(file.name)}
                          </div>
                          <span className="font-bold text-[14.5px] truncate">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 text-ink-soft font-medium text-[14.5px]">{file.uploader}</td>
                      <td className="px-6 text-ink-soft font-medium text-[14.5px]">{file.size}</td>
                      <td className="px-6">
                        <span className="inline-flex items-center gap-1 text-danger font-bold text-[14px]">
                          <Flag size={13} strokeWidth={2.5} />
                          {file.reports}
                        </span>
                      </td>
                      <td className="px-6">
                        <div className="flex justify-end">
                          <TableActionButton label="Xử lý" icon={<AlertTriangle size={14} />} variant="brand" onClick={() => openModal(file)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </main>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-[480px] shadow-modal animate-scale-in overflow-hidden">
            {!resolved ? (
              <>
                <div className="flex items-center justify-between px-6 pt-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-danger-bg text-danger flex items-center justify-center">
                      <AlertTriangle size={18} strokeWidth={2.25} />
                    </div>
                    <h3 className="font-display text-[18px] font-bold">Báo cáo tài liệu</h3>
                  </div>
                  <button type="button" onClick={closeModal} className="text-ink-faint hover:text-ink cursor-pointer">
                    <X size={20} />
                  </button>
                </div>

                <div className="px-6 pt-5 space-y-5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-alt border border-line">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                      {fileIcon(selected.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[14.5px] truncate">{selected.name}</p>
                      <p className="text-ink-soft text-[13px]">Tải lên bởi {selected.uploader}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar name={selected.reporter} size={26} />
                      <span className="text-[13.5px] font-semibold text-ink-soft">Báo cáo bởi {selected.reporter}</span>
                    </div>
                    <p className="text-danger font-bold text-[13px] mb-1">Lý do báo cáo</p>
                    <div className="bg-danger-bg border border-danger-line rounded-xl p-3 text-[13.5px] text-ink leading-relaxed">
                      {selected.reason}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-[13.5px] mb-2">Quyết định xử lý <span className="text-danger">*</span></p>
                    <div className="space-y-2">
                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-snappy ${decision === 'remove' ? 'border-brand-400 bg-brand-50' : 'border-line hover:bg-surface-alt'}`}>
                        <input type="radio" name="decision" className="mt-1 accent-brand-500" checked={decision === 'remove'} onChange={() => setDecision('remove')} />
                        <span>
                          <span className="block font-bold text-[14px]">Gỡ tài liệu xuống</span>
                          <span className="block text-ink-soft text-[13px]">Xóa tài liệu và thông báo người tải</span>
                        </span>
                      </label>
                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-snappy ${decision === 'reject' ? 'border-brand-400 bg-brand-50' : 'border-line hover:bg-surface-alt'}`}>
                        <input type="radio" name="decision" className="mt-1 accent-brand-500" checked={decision === 'reject'} onChange={() => setDecision('reject')} />
                        <span>
                          <span className="block font-bold text-[14px]">Từ chối báo cáo</span>
                          <span className="block text-ink-soft text-[13px]">Tài liệu không vi phạm</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-[13px] text-ink-soft mb-1.5">Ghi chú (tùy chọn)</p>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      placeholder="Nội dung thông báo gửi tới người báo cáo và người tải..."
                      className="w-full border border-line rounded-xl p-3 text-[13.5px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
                    />
                  </div>
                </div>

                <div className="flex gap-3 p-6">
                  <button type="button" onClick={closeModal} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
                    Hủy
                  </button>
                  <button
                    type="button"
                    disabled={!decision}
                    onClick={confirmDecision}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${decision ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'}`}
                  >
                    Xác nhận xử lý
                  </button>
                </div>
              </>
            ) : (
              <div className="px-6 py-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-success-bg text-success flex items-center justify-center mb-4">
                  <CheckCircle2 size={28} strokeWidth={2} />
                </div>
                <h3 className="font-display text-[18px] font-bold mb-1.5">Đã giải quyết báo cáo</h3>
                <p className="text-ink-soft text-[14px] max-w-[300px] mb-6">
                  {decision === 'remove' ? 'Tài liệu đã được gỡ xuống và người dùng đã được thông báo.' : 'Báo cáo đã được từ chối, tài liệu vẫn được giữ nguyên.'}
                </p>
                <button type="button" onClick={closeModal} className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-[14px] cursor-pointer transition-snappy">
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFileManager;
