import React, { useEffect, useRef, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import ActionMenu from '../components/ActionMenu';
import UploadDocumentDialog from '../components/UploadDocumentDialog';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { DocumentItem, FolderItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { formatBytes } from './formatBytes';
import { ChevronLeft, Download, FileText, Folder, Send, Trash2, Upload } from 'lucide-react';

type Tab = 'original' | 'summary' | 'flashcards' | 'quizzes';

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  onNavigate: NavigateFn;
  folderId: number;
  docId?: number;
}

const UserFolderDetail: React.FC<Props> = ({ onNavigate, folderId, docId }) => {
  const [folder, setFolder] = useState<FolderItem | null>(null);
  const [folderDocs, setFolderDocs] = useState<DocumentItem[]>([]);
  const [doc, setDoc] = useState<DocumentItem | null>(null);
  const [docLoading, setDocLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('summary');
  const [chipFilter, setChipFilter] = useState<number | 'all'>('all');
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [asking, setAsking] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deletingDoc, setDeletingDoc] = useState<DocumentItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshFolderDocs = () => workspaceApi.getDocumentsByFolder(folderId).then(setFolderDocs);
  const folderTotalSize = folderDocs.reduce((sum, d) => sum + (d.fileSize ?? 0), 0);

  useEffect(() => {
    workspaceApi.getFolder(folderId).then(setFolder);
    refreshFolderDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  useEffect(() => {
    if (!docId) {
      setDoc(null);
      return;
    }
    setDocLoading(true);
    workspaceApi.getDocument(docId).then((d) => {
      setDoc(d ?? null);
      setDocLoading(false);
    });
    setMessages([]);
    setQuizSelected(null);
  }, [docId]);

  // Auto-select first doc if none chosen
  useEffect(() => {
    if (!docId && folderDocs.length > 0) {
      onNavigate('userFolderDetail', { folderId, docId: folderDocs[0].id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId, folderDocs, folderId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const submitChat = async () => {
    if (!input.trim() || !docId) return;
    const q = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: q }]);
    setAsking(true);
    try {
      const res = await workspaceApi.askRag({ id: docId, question: q });
      setMessages((m) => [...m, { role: 'assistant', content: res.answer }]);
    } finally {
      setAsking(false);
    }
  };

  const handleDownload = (d: DocumentItem) => {
    const blob = new Blob(
      [`Tài liệu: ${d.title}\nMô tả: ${d.description ?? ''}\n`],
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

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await workspaceApi.deleteDocument(id);
      await refreshFolderDocs();
      if (id === docId) {
        onNavigate('userFolderDetail', { folderId });
      }
    } finally {
      setDeleting(false);
      setDeletingDoc(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userFolders" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-[78px] bg-card/90 backdrop-blur border-b border-line flex items-center px-8 shrink-0 sticky top-0 z-30">
          <h1 className="font-display text-[20px] font-bold tracking-tight truncate">{folder?.name ?? 'Thư mục'}</h1>
        </div>
        <main className="flex-1 animate-fade-in-up p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 h-[calc(100vh-9rem)]">
            {/* Column 1: file list */}
            <aside className="hidden lg:flex flex-col bg-card border border-line rounded-2xl p-4 overflow-hidden">
              <button
                type="button"
                onClick={() => onNavigate('userFolders')}
                className="flex items-center gap-1 text-brand-600 font-bold text-sm mb-4 hover:underline cursor-pointer"
              >
                <ChevronLeft size={16} /> Quay về
              </button>

              <div>
                <div className="text-[11px] font-bold tracking-wider text-ink-faint mb-2 uppercase">Thư mục đang dùng</div>
                <div className="flex items-center gap-3 bg-brand-50 border border-brand-100 rounded-xl p-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
                    <Folder size={18} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate">{folder?.name ?? '—'}</div>
                    <div className="text-xs text-ink-soft mt-0.5">{formatBytes(folderTotalSize)} · {folderDocs.length} tài liệu</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex-1 min-h-0 flex flex-col">
                <div className="text-[11px] font-bold tracking-wider text-ink-faint mb-2 uppercase">Tài liệu đang có</div>
                <div className="space-y-1 overflow-y-auto flex-1 -mx-1 px-1 scrollbar-thin">
                  {folderDocs.map((d) => {
                    const active = d.id === docId;
                    return (
                      <div
                        key={d.id}
                        className={`group flex items-center gap-1 rounded-lg transition-colors ${
                          active ? 'bg-brand-50' : 'hover:bg-surface-alt'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onNavigate('userFolderDetail', { folderId, docId: d.id })}
                          className={`flex-1 min-w-0 flex items-center gap-2 text-sm px-2 py-1.5 text-left cursor-pointer ${
                            active ? 'text-brand-600 font-bold' : 'text-ink'
                          }`}
                        >
                          <FileText size={14} className="shrink-0" />
                          <span className="truncate">{d.title}</span>
                        </button>
                        <ActionMenu
                          items={[
                            { label: 'Tải xuống', icon: <Download size={15} strokeWidth={2.1} />, onClick: () => handleDownload(d) },
                            { label: 'Xóa', icon: <Trash2 size={15} strokeWidth={2.1} />, variant: 'danger', onClick: () => setDeletingDoc(d) },
                          ]}
                        />
                      </div>
                    );
                  })}
                  {folderDocs.length === 0 && <div className="text-xs text-ink-soft px-2">Chưa có tài liệu</div>}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setUploadOpen(true)}
                className="mt-4 h-[38px] border border-line rounded-xl flex items-center justify-start gap-2 px-3 text-[13.5px] font-bold text-ink-soft hover:bg-surface-alt transition-colors cursor-pointer"
              >
                <Upload size={14} /> Tải lên tài liệu
              </button>
            </aside>

            {/* Column 2: preview */}
            <section className="bg-card border border-line rounded-2xl flex flex-col overflow-hidden">
              <div className="flex gap-6 px-6 pt-4 border-b border-line overflow-x-auto scrollbar-thin">
                {(
                  [
                    { id: 'original', label: 'Original Content' },
                    { id: 'summary', label: 'AI Summary' },
                    { id: 'flashcards', label: 'AI Flashcards' },
                    { id: 'quizzes', label: 'AI Quizzes' },
                  ] as { id: Tab; label: string }[]
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`pb-3 text-[14.5px] font-bold whitespace-nowrap cursor-pointer border-b-2 transition-snappy ${
                      tab === t.id ? 'border-brand-500 text-ink' : 'border-transparent text-ink-soft hover:text-ink'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 px-6 py-3 border-b border-line overflow-x-auto scrollbar-thin shrink-0">
                <button
                  type="button"
                  onClick={() => setChipFilter('all')}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap cursor-pointer transition-snappy ${
                    chipFilter === 'all' ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                  }`}
                >
                  All
                </button>
                {folderDocs.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => { setChipFilter(d.id); onNavigate('userFolderDetail', { folderId, docId: d.id }); }}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap cursor-pointer transition-snappy ${
                      chipFilter === d.id ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                    }`}
                  >
                    {d.fileName ?? d.title}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {tab === 'original' ? (
                  (() => {
                    const visible = chipFilter === 'all' ? folderDocs : folderDocs.filter((d) => d.id === chipFilter);
                    return visible.length === 0 ? (
                      <div className="text-sm text-ink-soft text-center mt-16">Chưa có tài liệu trong thư mục này.</div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {visible.map((d) => (
                          <div
                            key={d.id}
                            className="relative bg-card border border-line rounded-2xl p-5 flex flex-col items-center text-center hover:border-brand-300 hover:shadow-card-hover transition-snappy"
                          >
                            <div className="absolute top-2 right-2">
                              <ActionMenu
                                items={[
                                  { label: 'Tải xuống', icon: <Download size={15} strokeWidth={2.1} />, onClick: () => handleDownload(d) },
                                  { label: 'Xóa', icon: <Trash2 size={15} strokeWidth={2.1} />, variant: 'danger', onClick: () => setDeletingDoc(d) },
                                ]}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => onNavigate('userFolderDetail', { folderId, docId: d.id })}
                              className="flex flex-col items-center cursor-pointer w-full"
                            >
                              <div className="h-14 w-14 rounded-2xl bg-danger-bg text-danger flex items-center justify-center mb-3">
                                <FileText size={26} strokeWidth={2} />
                              </div>
                              <span className="text-brand-600 text-[13.5px] font-bold truncate w-full">{d.fileName ?? d.title}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })()
                ) : !docId ? (
                  <div className="text-sm text-ink-soft text-center mt-16">Chọn một tài liệu ở cột bên trái để xem nội dung AI.</div>
                ) : docLoading ? (
                  <div className="space-y-3">
                    <div className="h-6 w-48 bg-surface-alt rounded animate-pulse" />
                    <div className="h-4 w-96 bg-surface-alt rounded animate-pulse" />
                  </div>
                ) : tab === 'summary' ? (
                  <div>
                    <h2 className="font-display text-lg font-bold mb-4">AI Summary</h2>
                    <div className="bg-surface-alt/60 border border-line rounded-2xl p-6">
                      <p className="font-bold text-[15px] mb-1.5">Tóm tắt tài liệu</p>
                      <p className="text-ink-soft text-[14px] leading-relaxed">
                        AI sẽ sinh phần tóm tắt nội dung của tài liệu đang chọn tại đây.
                      </p>
                    </div>
                  </div>
                ) : tab === 'flashcards' ? (
                  <div>
                    <h2 className="font-display text-lg font-bold mb-4">AI Flashcards</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-card border border-line rounded-2xl p-5">
                        <p className="font-bold text-[14px] text-ink-soft mb-2">Front</p>
                        <p className="text-[15px] font-semibold">Agile là gì?</p>
                      </div>
                      <div className="bg-surface-alt/60 border border-line rounded-2xl p-5">
                        <p className="font-bold text-[14px] text-ink-soft mb-2">Back</p>
                        <p className="text-[15px] font-semibold leading-relaxed">
                          Agile là phương pháp phát triển phần mềm theo từng vòng lặp.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-display text-lg font-bold mb-4">AI Quizzes</h2>
                    <p className="font-bold text-[15px] mb-4">Agile tập trung vào điều gì?</p>
                    <div className="space-y-2.5">
                      {[
                        { key: 'A', text: 'Waterfall' },
                        { key: 'B', text: 'Phản hồi nhanh' },
                        { key: 'C', text: 'Big Bang' },
                        { key: 'D', text: 'Không có đáp án' },
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setQuizSelected(opt.key)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-[14px] font-medium transition-snappy cursor-pointer border ${
                            quizSelected === opt.key
                              ? 'bg-brand-50 border-brand-400 text-brand-700'
                              : 'bg-surface-alt/60 border-transparent hover:bg-surface-alt'
                          }`}
                        >
                          {opt.key}. {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Column 3: chat */}
            <aside className="bg-card border border-line rounded-2xl flex flex-col overflow-hidden">
              <div className="p-4 border-b border-line text-center">
                <div className="text-sm font-bold text-ink-soft">Tài liệu</div>
                <div className="text-sm font-extrabold mt-1 break-all">{doc?.fileName ?? doc?.title ?? 'Chưa chọn'}</div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                {messages.length === 0 ? (
                  <div className="text-xs text-ink-soft text-center mt-8">Hỏi AI bất cứ điều gì về tài liệu này</div>
                ) : (
                  messages.map((m, i) => (
                    <div
                      key={i}
                      className={`animate-fade-in-up text-sm rounded-xl px-3 py-2 max-w-[90%] leading-relaxed ${
                        m.role === 'user' ? 'bg-brand-500 text-white ml-auto' : 'bg-surface-alt text-ink'
                      }`}
                    >
                      {m.content}
                    </div>
                  ))
                )}
                {asking && (
                  <div className="animate-fade-in-up flex items-center gap-1 bg-surface-alt rounded-xl px-3 py-2.5 max-w-[60px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: '120ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void submitChat();
                }}
                className="p-3 border-t border-line flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  disabled={!docId}
                  className="flex-1 h-[40px] border border-line rounded-xl px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={asking || !input.trim() || !docId}
                  className={`w-[40px] h-[40px] rounded-xl flex items-center justify-center text-white transition-snappy active:scale-90 shrink-0 ${
                    asking || !input.trim() || !docId ? 'bg-ink-faint cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 shadow-brand-glow cursor-pointer'
                  }`}
                >
                  <Send size={16} />
                </button>
              </form>
            </aside>
          </div>
        </main>
      </div>

      {uploadOpen && (
        <UploadDocumentDialog
          folderId={folderId}
          onClose={() => setUploadOpen(false)}
          onUploaded={refreshFolderDocs}
        />
      )}

      {deletingDoc && (
        <ConfirmDeleteDialog
          title="Xóa tài liệu?"
          description={`"${deletingDoc.title}" sẽ được chuyển vào Thùng rác.`}
          loading={deleting}
          onConfirm={() => handleDelete(deletingDoc.id)}
          onClose={() => setDeletingDoc(null)}
        />
      )}
    </div>
  );
};

export default UserFolderDetail;
