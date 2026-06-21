import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import EmptyState from '../components/EmptyState';
import ActionMenu from '../components/ActionMenu';
import AdminPagination from '../components/AdminPagination';
import UploadDocumentDialog from '../components/UploadDocumentDialog';
import ShareDocumentDialog from '../components/ShareDocumentDialog';
import ReportDocumentDialog from '../components/ReportDocumentDialog';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { fileApi } from '../api/fileApi';
import { formatBytes } from './formatBytes';
import { DocumentItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { FileText, FolderOpen, Plus, Share2, Flag, Trash2 } from 'lucide-react';

const PAGE_SIZE = 6;

const UserDocuments: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [shareTarget, setShareTarget] = useState<DocumentItem | null>(null);
  const [reportTarget, setReportTarget] = useState<DocumentItem | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<DocumentItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchDocs = () => workspaceApi.getDocuments().then((d) => { setDocs(d); setLoading(false); });
  useEffect(() => { fetchDocs(); }, []);

  const filtered = docs.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await workspaceApi.deleteDocument(id);
      await fetchDocs();
    } finally {
      setDeleting(false);
      setDeletingDoc(null);
    }
  };

  const handleShare = async (email: string) => {
    if (!shareTarget) return;
    await workspaceApi.shareDocument({ id: shareTarget.id, email });
  };

  const handleReport = async (category: string, details: string) => {
    if (!reportTarget) return;
    const reason = details.trim() ? `${category} — ${details.trim()}` : category;
    await fileApi.submitReport({
      name: reportTarget.fileName ?? reportTarget.title,
      uploader: CURRENT_USER.fullName,
      size: formatBytes(reportTarget.fileSize ?? 0),
      reporter: CURRENT_USER.fullName,
      reason,
    });
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userDocuments" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader role="user" title="Tài liệu" placeholder="Tìm kiếm tài liệu..." value={query} onChange={handleSearch} />
        <main className="flex-1 animate-fade-in-up p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-ink-soft text-[14.5px] font-medium">Toàn bộ tài liệu bạn đã tải lên</p>
            <button
              type="button"
              onClick={() => setUploadOpen(true)}
              className="inline-flex items-center gap-2 h-[40px] px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-[14px] transition-colors cursor-pointer shadow-sm"
            >
              <Plus size={16} strokeWidth={2.5} /> Tải lên
            </button>
          </div>

          <div className="w-full bg-card border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="font-display text-[17px] font-bold">Danh sách tài liệu</h2>
              <span className="text-ink-soft text-[13.5px] font-semibold">{filtered.length} tài liệu</span>
            </div>

            {!loading && filtered.length === 0 ? (
              <EmptyState
                icon={<FileText size={24} strokeWidth={1.75} />}
                title="Không tìm thấy tài liệu"
                description="Thử thay đổi từ khóa hoặc tải lên tài liệu mới."
              />
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-alt h-[52px] text-[13px] font-bold text-ink-soft uppercase tracking-wide border-b border-line">
                    <th className="px-6 w-[46%]">Tiêu đề</th>
                    <th className="px-6 w-[34%] hidden md:table-cell">Mô tả</th>
                    <th className="px-6 w-[20%] text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((d) => (
                    <tr key={d.id} className="h-[72px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-snappy">
                      <td className="px-6">
                        <button
                          type="button"
                          onClick={() => onNavigate('userDocumentDetail', { docId: d.id })}
                          className="flex items-center gap-3 min-w-0 hover:text-brand-600 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                            <FileText size={18} strokeWidth={2} />
                          </div>
                          <span className="font-bold text-[14.5px] truncate">{d.title}</span>
                        </button>
                      </td>
                      <td className="px-6 text-ink-soft font-medium text-[14px] hidden md:table-cell truncate max-w-md">{d.description}</td>
                      <td className="px-6">
                        <div className="flex justify-end">
                          <ActionMenu
                            items={[
                              {
                                label: 'Mở',
                                icon: <FolderOpen size={15} strokeWidth={2.1} />,
                                onClick: () => onNavigate('userDocumentDetail', { docId: d.id }),
                              },
                              {
                                label: 'Chia sẻ',
                                icon: <Share2 size={15} strokeWidth={2.1} />,
                                onClick: () => setShareTarget(d),
                              },
                              {
                                label: 'Báo cáo',
                                icon: <Flag size={15} strokeWidth={2.1} />,
                                onClick: () => setReportTarget(d),
                              },
                              {
                                label: 'Xóa',
                                icon: <Trash2 size={15} strokeWidth={2.1} />,
                                variant: 'danger',
                                onClick: () => setDeletingDoc(d),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loading && filtered.length > 0 && (
              <div className="px-6 pb-5">
                <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </div>
        </main>
      </div>

      {uploadOpen && (
        <UploadDocumentDialog onClose={() => setUploadOpen(false)} onUploaded={fetchDocs} />
      )}

      {shareTarget && (
        <ShareDocumentDialog
          documentTitle={shareTarget.title}
          onShare={handleShare}
          onClose={() => setShareTarget(null)}
        />
      )}

      {reportTarget && (
        <ReportDocumentDialog
          documentTitle={reportTarget.title}
          onSubmit={handleReport}
          onClose={() => setReportTarget(null)}
        />
      )}

      {deletingDoc && (
        <ConfirmDeleteDialog
          title="Xóa tài liệu?"
          description={`"${deletingDoc.title}" sẽ bị xóa khỏi danh sách tài liệu của bạn.`}
          loading={deleting}
          onConfirm={() => handleDelete(deletingDoc.id)}
          onClose={() => setDeletingDoc(null)}
        />
      )}
    </div>
  );
};

export default UserDocuments;
