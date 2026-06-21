import React, { useState } from 'react';
import { AllPages, NavigateFn } from '../App';
import UploadDocumentDialog from './UploadDocumentDialog';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Users,
  Trash2,
  Cloud,
  LogOut,
  Settings,
  GraduationCap,
  UploadCloud,
} from 'lucide-react';

interface UserSidebarProps {
  onNavigate: NavigateFn;
  activeTab: AllPages;
  userName: string;
}

const menuItems = [
  { id: 'userDashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'userFolders', label: 'Thư mục', icon: FolderKanban },
  { id: 'userDocuments', label: 'Tài liệu', icon: FileText },
  { id: 'userShared', label: 'Được chia sẻ', icon: Users },
  { id: 'userTrash', label: 'Thùng rác', icon: Trash2 },
  { id: 'userCloud', label: 'Lưu trữ Cloud', icon: Cloud },
] as const;

const UserSidebar: React.FC<UserSidebarProps> = ({ onNavigate, activeTab, userName }) => {
  const initial = userName?.[0]?.toUpperCase() ?? 'U';
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <div className="relative w-[260px] bg-gradient-to-b from-brand-900 via-brand-800 to-brand-900 text-white flex flex-col justify-between p-5 shrink-0 min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-20 w-56 h-56 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 w-48 h-48 rounded-full bg-brand-300/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-9 mt-1 px-1">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <GraduationCap size={20} strokeWidth={2} />
          </div>
          <span className="font-display font-bold text-[17px] tracking-tight">AI Study Hub</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('userProfile')}
          className="w-full flex items-center gap-3 mb-8 px-3 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-snappy cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20 font-bold text-[16px] shrink-0">
            {initial}
          </div>
          <div className="min-w-0 text-left">
            <h3 className="text-[15px] font-bold leading-tight truncate">{userName || 'Người dùng'}</h3>
            <p className="text-[13px] text-white/55 truncate">Xem hồ sơ</p>
          </div>
        </button>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                onClick={() => onNavigate(item.id as AllPages)}
                className={`relative w-full h-[46px] rounded-xl flex items-center gap-3 px-3.5 text-[14.5px] font-semibold transition-snappy cursor-pointer select-none ${
                  isActive
                    ? 'bg-white text-brand-700 shadow-[0_4px_14px_rgba(0,0,0,0.22)]'
                    : 'text-white/65 hover:bg-white/[0.08] hover:text-white hover:translate-x-0.5'
                }`}
              >
                <Icon size={18} strokeWidth={2.25} className={isActive ? 'text-brand-600' : ''} />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="w-full h-[44px] rounded-xl flex items-center justify-center gap-2 text-[14px] font-bold text-white bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-400 hover:to-brand-300 shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition-snappy cursor-pointer"
        >
          <UploadCloud size={17} strokeWidth={2.25} />
          Tải lên tài liệu
        </button>
        <a
          onClick={() => onNavigate('userSettings')}
          className={`w-full h-[46px] rounded-xl flex items-center gap-3 px-3.5 text-[14.5px] font-semibold transition-snappy cursor-pointer select-none ${
            activeTab === 'userSettings'
              ? 'bg-white text-brand-700 shadow-[0_4px_14px_rgba(0,0,0,0.22)]'
              : 'text-white/65 hover:bg-white/[0.08] hover:text-white hover:translate-x-0.5'
          }`}
        >
          <Settings size={18} strokeWidth={2.25} className={activeTab === 'userSettings' ? 'text-brand-600' : ''} />
          Cài đặt
        </a>
        <a
          onClick={() => onNavigate('welcome')}
          className="w-full h-[46px] hover:bg-white/[0.08] rounded-xl flex items-center gap-3 px-3.5 text-[14.5px] font-semibold text-white/70 hover:text-white transition-snappy cursor-pointer"
        >
          <LogOut size={18} strokeWidth={2.25} />
          Đăng xuất
        </a>
      </div>

      {uploadOpen && (
        <UploadDocumentDialog
          onClose={() => setUploadOpen(false)}
          onUploaded={() => onNavigate('userDocuments')}
        />
      )}
    </div>
  );
};

export default UserSidebar;
