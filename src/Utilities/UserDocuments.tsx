import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import EmptyState from '../components/EmptyState';
import TableActionButton from '../components/TableActionButton';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { DocumentItem, FolderItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { FileText, Plus, Share2, Trash2, X } from 'lucide-react';

const UserDocuments: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [shareTarget, setShareTarget] = useState<DocumentItem | null>(null);
  const [shareEmail, setShareEmail] = useState('');
  const [sharing, setSharing] = useState(false);

  const fetchDocs = () => workspaceApi.getDocuments().then((d) => { setDocs(d); setLoading(false); });
  useEffect(() => { fetchDocs(); }, []);

  const filtered = docs.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()));

  const handleDelete = async (id: number) => {
    if (!window.confirm('Xóa tài liệu này?')) return;
    await workspaceApi.deleteDocument(id);
    await fetchDocs();
  };

  const submitShare = async () => {
    if (!shareTarget || !shareEmail.trim()) return;
    setSharing(true);
    try {
      await workspaceApi.shareDocument({ id: shareTarget.id, email: shareEmail.trim() });
      setShareTarget(null);
      setShareEmail('');
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userDocuments" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Tài liệu" placeholder="Tìm kiếm tài liệu..." value={query} onChange={(e) => setQuery(e.target.value)} />
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
                  {filtered.map((d) => (
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
                        <div className="flex justify-end gap-2">
                          <TableActionButton label="Chia sẻ" icon={<Share2 size={14} />} variant="brand" onClick={() => { setShareTarget(d); setShareEmail(''); }} />
                          <TableActionButton label="Xóa" icon={<Trash2 size={14} />} variant="danger" onClick={() => handleDelete(d.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {uploadOpen && (
        <UploadDialog onClose={() => setUploadOpen(false)} onUploaded={fetchDocs} />
      )}

      {shareTarget && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-[420px] shadow-modal animate-scale-in">
            <div className="flex items-center justify-between px-6 pt-6">
              <h3 className="font-display text-[18px] font-bold">Chia sẻ tài liệu</h3>
              <button type="button" onClick={() => setShareTarget(null)} className="text-ink-faint hover:text-ink cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 pt-5">
              <p className="text-ink-soft text-[13.5px] mb-3">Chia sẻ "{shareTarget.title}" với:</p>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
              />
            </div>
            <div className="flex gap-3 p-6">
              <button type="button" onClick={() => setShareTarget(null)} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
                Hủy
              </button>
              <button
                type="button"
                disabled={!shareEmail.trim() || sharing}
                onClick={submitShare}
                className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${shareEmail.trim() && !sharing ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'}`}
              >
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UploadDialog: React.FC<{ onClose: () => void; onUploaded: () => void }> = ({ onClose, onUploaded }) => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [folderId, setFolderId] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => { workspaceApi.getFolders().then(setFolders); }, []);

  const submit = async () => {
    if (!file || !title.trim() || !folderId) return;
    setUploading(true);
    try {
      await workspaceApi.uploadDocument({ file, folderId: Number(folderId), title, description });
      onUploaded();
      onClose();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl w-full max-w-[440px] shadow-modal animate-scale-in">
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="font-display text-[18px] font-bold">Tải lên tài liệu</h3>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pt-5 space-y-4">
          <div>
            <label className="text-[13px] font-bold block mb-1.5">File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-[13.5px] border border-line rounded-xl px-3 py-2 outline-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-[13px] font-bold block mb-1.5">Tiêu đề</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
            />
          </div>
          <div>
            <label className="text-[13px] font-bold block mb-1.5">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full border border-line rounded-xl p-3.5 text-[14px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
            />
          </div>
          <div>
            <label className="text-[13px] font-bold block mb-1.5">Thư mục</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none cursor-pointer focus:border-brand-400 transition-all bg-white"
            >
              <option value="">Chọn thư mục</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 p-6">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
            Hủy
          </button>
          <button
            type="button"
            disabled={!file || !title.trim() || !folderId || uploading}
            onClick={submit}
            className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${
              file && title.trim() && folderId && !uploading ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'
            }`}
          >
            {uploading ? 'Đang tải…' : 'Tải lên'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDocuments;
