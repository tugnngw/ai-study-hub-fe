import React, { useEffect, useRef, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { DocumentItem, FolderItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { ChevronLeft, Download, FileText, Send, Trash2, Upload, X } from 'lucide-react';

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
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [asking, setAsking] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshFolderDocs = () => workspaceApi.getDocumentsByFolder(folderId).then(setFolderDocs);

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

  const handleDelete = async () => {
    if (!docId) return;
    if (!window.confirm('Xóa tài liệu này (chuyển vào Thùng rác)?')) return;
    await workspaceApi.deleteDocument(docId);
    await refreshFolderDocs();
    onNavigate('userFolderDetail', { folderId });
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
                <div className="text-sm font-bold">{folder?.name ?? '—'}</div>
                <div className="text-xs text-ink-soft mt-0.5">{folderDocs.length} tài liệu</div>
              </div>

              <div className="mt-6 flex-1 min-h-0 flex flex-col">
                <div className="text-[11px] font-bold tracking-wider text-ink-faint mb-2 uppercase">Tài liệu đang có</div>
                <div className="space-y-1 overflow-y-auto flex-1 -mx-1 px-1 scrollbar-thin">
                  {folderDocs.map((d) => {
                    const active = d.id === docId;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => onNavigate('userFolderDetail', { folderId, docId: d.id })}
                        className={`w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-lg transition-colors text-left cursor-pointer ${
                          active ? 'bg-brand-50 text-brand-600 font-bold' : 'hover:bg-surface-alt text-ink'
                        }`}
                      >
                        <FileText size={14} className="shrink-0" />
                        <span className="truncate">{d.title}</span>
                      </button>
                    );
                  })}
                  {folderDocs.length === 0 && <div className="text-xs text-ink-soft">Chưa có tài liệu</div>}
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
              <div className="flex gap-2 p-3 border-b border-line bg-surface-alt/50 overflow-x-auto">
                {(
                  [
                    { id: 'original', label: 'Nội dung gốc' },
                    { id: 'summary', label: 'Tóm tắt AI' },
                    { id: 'flashcards', label: 'Flashcards AI' },
                    { id: 'quizzes', label: 'Quiz AI' },
                  ] as { id: Tab; label: string }[]
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`px-4 py-1.5 text-sm rounded-xl font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      tab === t.id ? 'bg-brand-500 text-white shadow-brand-glow' : 'bg-card text-ink-soft border border-line hover:bg-surface-alt'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {!docId ? (
                  <div className="text-sm text-ink-soft text-center mt-16">Chọn một tài liệu ở cột bên trái để xem nội dung.</div>
                ) : docLoading ? (
                  <div className="space-y-3">
                    <div className="h-6 w-48 bg-surface-alt rounded animate-pulse" />
                    <div className="h-4 w-96 bg-surface-alt rounded animate-pulse" />
                  </div>
                ) : tab === 'summary' ? (
                  <div>
                    <h2 className="font-display text-lg font-bold">Tóm tắt AI</h2>
                    <p className="text-sm text-ink-soft mt-1">Chưa có tóm tắt</p>
                    <ul className="mt-4 space-y-2 text-sm list-disc pl-5 text-ink-soft">
                      <li>Trạng thái xử lý: đang xử lý</li>
                      <li>Kích thước file: {doc?.fileSize ? (doc.fileSize / 1024 / 1024).toFixed(1) : '0.0'} MB</li>
                    </ul>
                  </div>
                ) : tab === 'original' ? (
                  <div>
                    <h2 className="font-display text-lg font-bold">{doc?.title}</h2>
                    <p className="text-sm text-ink-soft mt-1">{doc?.description}</p>
                    <div className="mt-6 text-sm text-ink-soft">
                      (Nội dung gốc của tài liệu sẽ được hiển thị tại đây khi backend trả về.)
                    </div>
                  </div>
                ) : tab === 'flashcards' ? (
                  <div className="text-sm text-ink-soft">Flashcards sẽ được tạo tự động bằng AI sau khi xử lý tài liệu.</div>
                ) : (
                  <div className="text-sm text-ink-soft">Quizzes sẽ được tạo tự động bằng AI sau khi xử lý tài liệu.</div>
                )}
              </div>

              {docId && (
                <div className="p-3 border-t border-line flex items-center gap-2">
                  <button type="button" className="inline-flex items-center gap-1.5 px-3 py-[7px] border border-line bg-card text-ink-soft hover:bg-surface-alt rounded-lg font-bold text-[13px] transition-colors cursor-pointer">
                    <Download size={14} /> Tải xuống
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center gap-1.5 px-3 py-[7px] border border-danger-line bg-danger-bg text-danger hover:bg-danger/10 rounded-lg font-bold text-[13px] transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              )}
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
        <UploadDialog
          folderId={folderId}
          onClose={() => setUploadOpen(false)}
          onUploaded={refreshFolderDocs}
        />
      )}
    </div>
  );
};

const UploadDialog: React.FC<{ folderId: number; onClose: () => void; onUploaded: () => void }> = ({
  folderId,
  onClose,
  onUploaded,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const submit = async () => {
    if (!file || !title.trim()) return;
    setUploading(true);
    try {
      await workspaceApi.uploadDocument({ file, folderId, title, description });
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
              rows={3}
              className="w-full border border-line rounded-xl p-3.5 text-[14px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
            />
          </div>
        </div>
        <div className="flex gap-3 p-6">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
            Hủy
          </button>
          <button
            type="button"
            disabled={!file || !title.trim() || uploading}
            onClick={submit}
            className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${
              file && title.trim() && !uploading ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'
            }`}
          >
            {uploading ? 'Đang tải…' : 'Tải lên'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFolderDetail;
