import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import { workspaceApi, storageApi, CURRENT_USER } from '../api/workspaceApi';
import { DocumentItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import { formatBytes } from './formatBytes';
import { Cloud, Database, FileText, HardDrive, Lightbulb, Trash2 } from 'lucide-react';

const TYPE_META: Record<string, { label: string; color: string; bg: string }> = {
  'application/pdf': { label: 'PDF', color: 'text-danger', bg: 'bg-danger' },
  'image/png': { label: 'Hình ảnh', color: 'text-success', bg: 'bg-success' },
  'image/jpeg': { label: 'Hình ảnh', color: 'text-success', bg: 'bg-success' },
  default: { label: 'Khác', color: 'text-warning', bg: 'bg-warning' },
};

const UserCloud: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);

  useEffect(() => {
    workspaceApi.getDocuments().then(setDocs);
  }, []);

  const used = storageApi.usedBytes();
  const total = storageApi.totalBytes;
  const pct = (used / total) * 100;

  const byType = docs.reduce<Record<string, number>>((acc, d) => {
    const key = d.mimeType ?? 'default';
    acc[key] = (acc[key] ?? 0) + (d.fileSize ?? 0);
    return acc;
  }, {});
  const typeBreakdown = Object.entries(byType)
    .map(([mime, size]) => ({ mime, size, meta: TYPE_META[mime] ?? TYPE_META.default }))
    .sort((a, b) => b.size - a.size);

  const largest = [...docs].sort((a, b) => (b.fileSize ?? 0) - (a.fileSize ?? 0)).slice(0, 5);

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userCloud" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader role="user" title="Lưu trữ Cloud" />
        <main className="flex-1 animate-fade-in-up p-8">
          {/* Top summary row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            <div className="md:col-span-2 bg-card border border-line rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Cloud size={24} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="text-ink-soft text-[13px] font-semibold">Tổng dung lượng đã dùng</div>
                  <div className="font-display text-[24px] font-bold tracking-tight truncate">
                    {formatBytes(used)} <span className="text-sm text-ink-soft font-semibold">/ {formatBytes(total)}</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-2.5 bg-surface-alt rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full transition-snappy" style={{ width: `${Math.min(100, pct)}%` }} />
              </div>
              <div className="text-ink-faint text-[12.5px] font-semibold mt-2">{pct.toFixed(4)}% đã sử dụng</div>
            </div>

            <div className="bg-card border border-line rounded-2xl p-6 shadow-card flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                <Database size={20} strokeWidth={2.25} />
              </div>
              <div>
                <div className="text-ink-soft text-[13.5px] font-semibold">Số tài liệu</div>
                <div className="font-display text-[22px] font-bold">{docs.length}</div>
              </div>
            </div>

            <div className="bg-card border border-line rounded-2xl p-6 shadow-card flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-success-bg text-success flex items-center justify-center shrink-0">
                <HardDrive size={20} strokeWidth={2.25} />
              </div>
              <div>
                <div className="text-ink-soft text-[13.5px] font-semibold">Còn trống</div>
                <div className="font-display text-[22px] font-bold">{formatBytes(total - used)}</div>
              </div>
            </div>
          </div>

          {/* Detail row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
              <div className="h-[60px] border-b border-line flex items-center px-6">
                <h2 className="font-display text-[16px] font-bold">Phân loại theo loại tệp</h2>
              </div>
              {typeBreakdown.length === 0 ? (
                <p className="text-ink-soft text-[13.5px] p-6">Chưa có dữ liệu để hiển thị.</p>
              ) : (
                <div className="p-6 space-y-4">
                  {typeBreakdown.map(({ mime, size, meta }) => (
                    <div key={mime}>
                      <div className="flex items-center justify-between text-[13.5px] mb-1.5">
                        <span className="font-semibold flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${meta.bg}`} />
                          {meta.label}
                        </span>
                        <span className="text-ink-soft font-medium">{formatBytes(size)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${meta.bg}`} style={{ width: `${used ? (size / used) * 100 : 0}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
              <div className="h-[60px] border-b border-line flex items-center justify-between px-6">
                <h2 className="font-display text-[16px] font-bold">Tài liệu chiếm nhiều dung lượng nhất</h2>
              </div>
              {largest.length === 0 ? (
                <p className="text-ink-soft text-[13.5px] p-6">Chưa có tài liệu nào.</p>
              ) : (
                <div>
                  {largest.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => onNavigate('userDocumentDetail', { docId: d.id })}
                      className="w-full flex items-center gap-3 px-6 h-[58px] border-b border-line last:border-b-0 hover:bg-surface/60 transition-snappy text-left cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                        <FileText size={15} strokeWidth={2} />
                      </div>
                      <span className="flex-1 min-w-0 font-semibold text-[13.5px] truncate">{d.title}</span>
                      <span className="text-ink-soft text-[12.5px] font-semibold shrink-0">{formatBytes(d.fileSize ?? 0)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 flex items-start gap-3 mt-5">
            <div className="h-9 w-9 rounded-lg bg-card text-brand-500 flex items-center justify-center shrink-0">
              <Lightbulb size={17} strokeWidth={2.1} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[13.5px] text-brand-700">Mẹo giải phóng dung lượng</p>
              <p className="text-brand-700/80 text-[13px] mt-0.5 leading-relaxed">
                Dọn dẹp các tài liệu không còn dùng trong Thùng rác để giải phóng thêm không gian lưu trữ.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('userTrash')}
              className="inline-flex items-center gap-1.5 h-[34px] px-3.5 bg-card border border-brand-200 text-brand-600 rounded-lg font-bold text-[12.5px] hover:bg-brand-100 transition-snappy cursor-pointer shrink-0"
            >
              <Trash2 size={13} strokeWidth={2.25} />
              Mở thùng rác
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserCloud;
