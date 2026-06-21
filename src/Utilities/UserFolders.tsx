import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import EmptyState from '../components/EmptyState';
import AdminPagination from '../components/AdminPagination';
import FolderFormDialog, { FolderFormValues } from '../components/FolderFormDialog';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { FolderItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { FolderKanban, Plus, Pencil, Trash2 } from 'lucide-react';

const PAGE_SIZE = 9;

const UserFolders: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<FolderItem | null>(null);
  const [deleting, setDeleting] = useState<FolderItem | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const fetchFolders = () => workspaceApi.getFolders().then((f) => { setFolders(f); setLoading(false); });
  useEffect(() => { fetchFolders(); }, []);

  const filtered = folders.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (f: FolderItem) => {
    setEditing(f);
    setFormOpen(true);
  };

  const submitForm = async ({ name, description }: FolderFormValues) => {
    if (editing) {
      await workspaceApi.updateFolder(editing.id, { name, description });
    } else {
      await workspaceApi.createFolder({ name, description });
    }
    await fetchFolders();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeletingBusy(true);
    try {
      await workspaceApi.deleteFolder(deleting.id);
      await fetchFolders();
    } finally {
      setDeletingBusy(false);
      setDeleting(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userFolders" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader role="user" title="Thư mục" placeholder="Tìm kiếm thư mục..." value={query} onChange={handleSearch} />
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
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paged.map((f) => (
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
              <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </main>
      </div>

      {formOpen && (
        <FolderFormDialog
          initialValues={editing ? { name: editing.name, description: editing.description ?? '' } : undefined}
          onSubmit={submitForm}
          onClose={() => setFormOpen(false)}
        />
      )}

      {deleting && (
        <ConfirmDeleteDialog
          title="Xóa thư mục?"
          description={`Thư mục "${deleting.name}" sẽ bị xóa. Hành động này không thể hoàn tác.`}
          loading={deletingBusy}
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </div>
  );
};

export default UserFolders;
