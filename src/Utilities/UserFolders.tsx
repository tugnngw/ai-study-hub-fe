import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import EmptyState from '../components/EmptyState';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { FolderItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { FolderKanban, Plus, Pencil, Trash2, X } from 'lucide-react';

const UserFolders: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<FolderItem | null>(null);
  const [deleting, setDeleting] = useState<FolderItem | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchFolders = () => workspaceApi.getFolders().then((f) => { setFolders(f); setLoading(false); });
  useEffect(() => { fetchFolders(); }, []);

  const filtered = folders.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  const openCreate = () => {
    setEditing(null);
    setName('');
    setDescription('');
    setFormOpen(true);
  };

  const openEdit = (f: FolderItem) => {
    setEditing(f);
    setName(f.name);
    setDescription(f.description ?? '');
    setFormOpen(true);
  };

  const submitForm = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await workspaceApi.updateFolder(editing.id, { name, description });
      } else {
        await workspaceApi.createFolder({ name, description });
      }
      await fetchFolders();
      setFormOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    await workspaceApi.deleteFolder(deleting.id);
    await fetchFolders();
    setDeleting(null);
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userFolders" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Thư mục" placeholder="Tìm kiếm thư mục..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <main className="flex-1 animate-fade-in-up p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-ink-soft text-[14.5px] font-medium">Sắp xếp tài liệu của bạn theo chủ đề</p>
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 h-[40px] px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-[14px] transition-colors cursor-pointer shadow-sm"
            >
              <Plus size={16} strokeWidth={2.5} /> Thư mục mới
            </button>
          </div>

          {!loading && filtered.length === 0 ? (
            <div className="w-full bg-card border border-line rounded-2xl shadow-card">
              <EmptyState icon={<FolderKanban size={24} strokeWidth={1.75} />} title="Không tìm thấy thư mục" description="Thử thay đổi từ khóa hoặc tạo thư mục mới." />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((f) => (
                <div key={f.id} className="group bg-card border border-line rounded-2xl p-5 hover:border-brand-300 transition-colors shadow-card">
                  <button type="button" onClick={() => onNavigate('userFolderDetail', { folderId: f.id })} className="w-full text-left cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                        <FolderKanban size={20} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[15px] truncate">{f.name}</div>
                        <div className="text-ink-soft text-[13px] line-clamp-2 mt-1">{f.description || 'Không có mô tả'}</div>
                        <div className="text-ink-faint text-[12.5px] mt-2 font-semibold">{f.documentCount ?? 0} tài liệu</div>
                      </div>
                    </div>
                  </button>
                  <div className="flex justify-end gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => openEdit(f)} className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
                      <Pencil size={14} />
                    </button>
                    <button type="button" onClick={() => setDeleting(f)} className="w-8 h-8 rounded-lg flex items-center justify-center text-danger hover:bg-danger-bg cursor-pointer transition-snappy">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {formOpen && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-[440px] shadow-modal animate-scale-in">
            <div className="flex items-center justify-between px-6 pt-6">
              <h3 className="font-display text-[18px] font-bold">{editing ? 'Chỉnh sửa thư mục' : 'Thư mục mới'}</h3>
              <button type="button" onClick={() => setFormOpen(false)} className="text-ink-faint hover:text-ink cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 pt-5 space-y-4">
              <div>
                <label className="text-[13px] font-bold block mb-1.5">Tên thư mục</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Hợp đồng"
                  className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
                />
              </div>
              <div>
                <label className="text-[13px] font-bold block mb-1.5">Mô tả (tùy chọn)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-line rounded-xl p-3.5 text-[14px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
                />
              </div>
            </div>
            <div className="flex gap-3 p-6">
              <button type="button" onClick={() => setFormOpen(false)} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
                Hủy
              </button>
              <button
                type="button"
                disabled={!name.trim() || saving}
                onClick={submitForm}
                className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${name.trim() && !saving ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'}`}
              >
                {editing ? 'Lưu thay đổi' : 'Tạo thư mục'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-[420px] shadow-modal animate-scale-in p-6">
            <h3 className="font-display text-[18px] font-bold mb-1.5">Xóa thư mục?</h3>
            <p className="text-ink-soft text-[14px] mb-6">
              Thư mục "{deleting.name}" sẽ bị xóa. Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleting(null)} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
                Hủy
              </button>
              <button type="button" onClick={confirmDelete} className="flex-1 py-2.5 bg-danger hover:opacity-90 text-white rounded-xl font-bold text-[14px] cursor-pointer transition-snappy">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFolders;
