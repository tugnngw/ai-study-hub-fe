import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import EmptyState from '../components/EmptyState';
import Avatar from '../components/Avatar';
import ActionMenu from '../components/ActionMenu';
import AdminPagination from '../components/AdminPagination';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { SharedDocumentItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { Download, FileText, Trash2, Users } from 'lucide-react';

const PAGE_SIZE = 8;

const UserShared: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [shared, setShared] = useState<SharedDocumentItem[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [removingDoc, setRemovingDoc] = useState<SharedDocumentItem | null>(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    fetchShared();
  }, []);

  function fetchShared() {
    setLoading(true);
    workspaceApi.getShared().then((d) => { setShared(d); setLoading(false); });
  }

  const handleSave = (d: SharedDocumentItem) => {
    const blob = new Blob(
      [`Tài liệu: ${d.title}\nMô tả: ${d.description ?? ''}\nChia sẻ bởi: ${d.sharedBy}\n`],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = d.fileName ?? `${d.title}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleRemove = async (id: number) => {
    setRemoving(true);
    try {
      await workspaceApi.removeShared(id);
      await fetchShared();
    } finally {
      setRemoving(false);
      setRemovingDoc(null);
    }
  };

  const filtered = shared.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userShared" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader role="user" title="Được chia sẻ với tôi" placeholder="Tìm kiếm tài liệu được chia sẻ..." value={query} onChange={handleSearch} />
        <main className="flex-1 animate-fade-in-up p-8">
          <div className="w-full bg-card border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center justify-between px-6">
              <h2 className="font-display text-[17px] font-bold">Tài liệu được chia sẻ</h2>
              <span className="text-ink-soft text-[13.5px] font-semibold">{filtered.length} tài liệu</span>
            </div>

            {!loading && filtered.length === 0 ? (
              <EmptyState icon={<Users size={24} strokeWidth={1.75} />} title="Chưa có tài liệu được chia sẻ" description="Các tài liệu người khác chia sẻ với bạn sẽ xuất hiện ở đây." />
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4 p-6">
                  {paged.map((d) => (
                    <div
                      key={d.id}
                      className="relative bg-surface-alt/50 border border-line rounded-xl p-4 flex items-start gap-3 hover:border-brand-300 transition-snappy"
                    >
                      <button
                        type="button"
                        onClick={() => onNavigate('userDocumentDetail', { docId: d.id })}
                        className="flex items-start gap-3 text-left flex-1 min-w-0 cursor-pointer"
                      >
                        <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                          <FileText size={18} strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[14.5px] truncate pr-6">{d.title}</div>
                          <div className="text-ink-soft text-[13px] truncate">{d.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar name={d.sharedBy} size={22} />
                            <span className="text-ink-soft text-[12.5px] font-semibold">Chia sẻ bởi {d.sharedBy}</span>
                          </div>
                        </div>
                      </button>
                      <div className="absolute top-3 right-3">
                        <ActionMenu
                          items={[
                            {
                              label: 'Lưu',
                              icon: <Download size={15} strokeWidth={2.1} />,
                              onClick: () => handleSave(d),
                            },
                            {
                              label: 'Xóa',
                              icon: <Trash2 size={15} strokeWidth={2.1} />,
                              variant: 'danger',
                              onClick: () => setRemovingDoc(d),
                            },
                          ]}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-5">
                  <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {removingDoc && (
        <ConfirmDeleteDialog
          title="Xóa tài liệu được chia sẻ?"
          description={`"${removingDoc.title}" sẽ bị xóa khỏi danh sách được chia sẻ với bạn.`}
          loading={removing}
          onConfirm={() => handleRemove(removingDoc.id)}
          onClose={() => setRemovingDoc(null)}
        />
      )}
    </div>
  );
};

export default UserShared;
