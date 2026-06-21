import React, { useEffect, useRef, useState } from 'react';
import { Bell, CheckCircle2, XCircle, Flag, Share2, Database, Megaphone, Inbox, CheckCheck, Clock, UserPlus } from 'lucide-react';
import { notificationApi, type AppNotification, type NotificationType, type NotificationRole } from '../api/notificationApi';

interface NotificationBellProps {
  /** Vai trò hiện tại — quyết định bộ thông báo nào được tải (user khác admin). */
  role: NotificationRole;
}

const typeConfig: Record<NotificationType, { icon: React.ReactNode; bg: string; color: string }> = {
  approval: { icon: <CheckCircle2 size={16} strokeWidth={2.25} />, bg: 'bg-success-bg', color: 'text-success' },
  rejected: { icon: <XCircle size={16} strokeWidth={2.25} />, bg: 'bg-danger-bg', color: 'text-danger' },
  report: { icon: <Flag size={16} strokeWidth={2.25} />, bg: 'bg-warning-bg', color: 'text-warning' },
  pending: { icon: <Clock size={16} strokeWidth={2.25} />, bg: 'bg-brand-50', color: 'text-brand-500' },
  newUser: { icon: <UserPlus size={16} strokeWidth={2.25} />, bg: 'bg-brand-50', color: 'text-brand-500' },
  share: { icon: <Share2 size={16} strokeWidth={2.25} />, bg: 'bg-brand-50', color: 'text-brand-500' },
  storage: { icon: <Database size={16} strokeWidth={2.25} />, bg: 'bg-warning-bg', color: 'text-warning' },
  system: { icon: <Megaphone size={16} strokeWidth={2.25} />, bg: 'bg-surface-alt', color: 'text-ink-soft' },
};

const NotificationBell: React.FC<NotificationBellProps> = ({ role }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<AppNotification[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài — cùng pattern với ActionMenu.tsx
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Tải lại danh sách mỗi khi role đổi (vd. người dùng đăng nhập với vai trò khác)
  useEffect(() => {
    let active = true;
    setLoading(true);
    notificationApi.getAll(role).then((data) => {
      if (active) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [role]);

  const unreadCount = items.filter((n) => !n.read).length;

  const handleToggle = () => setOpen((v) => !v);

  const handleItemClick = (item: AppNotification) => {
    if (item.read) return;
    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
    notificationApi.markAsRead(item.id, role);
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (unreadCount === 0) return;
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    notificationApi.markAllAsRead(role);
  };

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center hover:text-brand-500 hover:border-brand-200 hover:scale-105 active:scale-95 transition-snappy ${
          open ? 'text-brand-500 border-brand-200' : 'text-ink-soft'
        }`}
        aria-label="Thông báo"
      >
        <Bell size={18} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-danger ring-2 ring-card" />
        )}
      </button>

      {open && (
        <div className="absolute top-[calc(100%+10px)] right-0 w-[360px] max-w-[88vw] bg-card border border-line rounded-2xl shadow-popover z-40 animate-scale-in origin-top-right overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-line">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-[14.5px] font-bold text-ink">Thông báo</h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[11px] font-bold leading-none">
                  {unreadCount} mới
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className={`flex items-center gap-1 text-[12.5px] font-semibold transition-snappy ${
                unreadCount === 0 ? 'text-ink-faint cursor-not-allowed' : 'text-brand-500 hover:text-brand-600 cursor-pointer'
              }`}
            >
              <CheckCheck size={14} strokeWidth={2.25} />
              Đánh dấu đã đọc
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
            {loading ? (
              <div className="p-4 space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-alt animate-pulse shrink-0" />
                    <div className="flex-1 space-y-1.5 pt-0.5">
                      <div className="h-3 w-3/4 bg-surface-alt rounded animate-pulse" />
                      <div className="h-3 w-full bg-surface-alt rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-center px-6">
                <Inbox size={28} strokeWidth={1.75} className="text-ink-faint" />
                <p className="text-[13px] font-semibold text-ink-soft">Không có thông báo nào</p>
              </div>
            ) : (
              items.map((item) => {
                const cfg = typeConfig[item.type];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-snappy border-b border-line last:border-b-0 ${
                      item.read ? 'hover:bg-surface' : 'bg-brand-50/40 hover:bg-brand-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.color}`}>
                      {cfg.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-semibold text-ink truncate">{item.title}</span>
                        {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />}
                      </span>
                      <span className="block text-[12.5px] text-ink-soft leading-snug mt-0.5 line-clamp-2">{item.message}</span>
                      <span className="block text-[11.5px] text-ink-faint mt-1">{item.time}</span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
