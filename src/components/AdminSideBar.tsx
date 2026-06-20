import React from 'react';
import { AllPages } from '../App';
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardCheck,
  Trash2,
  LogOut,
  GraduationCap,
} from 'lucide-react';

interface AdminSidebarProps {
  onNavigate: (page: AllPages) => void;
  activeTab: AllPages;
}

const menuItems = [
  { id: 'adminDashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'adminUserManager', label: 'Quản lý Users', icon: Users },
  { id: 'adminFileManager', label: 'Quản lý tài liệu', icon: FileText },
  { id: 'adminHistoryApproval', label: 'Phê duyệt', icon: ClipboardCheck },
  { id: 'adminTrashManager', label: 'Thùng rác', icon: Trash2 },
] as const;

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onNavigate, activeTab }) => {
  return (
    <div className="w-[260px] bg-gradient-to-b from-brand-900 via-brand-800 to-brand-900 text-white flex flex-col justify-between p-5 shrink-0 min-h-screen">
      <div>
        <div className="flex items-center gap-2.5 mb-9 mt-1 px-1">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
            <GraduationCap size={20} strokeWidth={2} />
          </div>
          <span className="font-extrabold text-[17px] tracking-tight">AI Study Hub</span>
        </div>

        <div className="flex items-center gap-3 mb-8 px-3 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20 font-bold text-[16px]">
            A
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold leading-tight truncate">Admin</h3>
            <p className="text-[13px] text-white/55 truncate">Nguyen Van A</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative w-full h-[46px] rounded-xl flex items-center gap-3 px-3.5 text-[14.5px] font-semibold transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-white text-brand-700 shadow-[0_2px_10px_rgba(0,0,0,0.18)]'
                    : 'text-white/65 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <Icon size={18} strokeWidth={2.25} className={isActive ? 'text-brand-600' : ''} />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <a
        onClick={() => onNavigate('welcome')}
        className="w-full h-[46px] hover:bg-white/[0.08] rounded-xl flex items-center gap-3 px-3.5 text-[14.5px] font-semibold text-white/70 hover:text-white transition-all cursor-pointer mt-auto"
      >
        <LogOut size={18} strokeWidth={2.25} />
        Đăng xuất
      </a>
    </div>
  );
};

export default AdminSidebar;
