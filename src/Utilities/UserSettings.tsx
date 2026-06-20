import React from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import { CURRENT_USER } from '../api/workspaceApi';
import { NavigateFn } from '../App';
import { LogOut } from 'lucide-react';

const UserSettings: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <UserSidebar onNavigate={onNavigate} activeTab="userSettings" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Cài đặt" />
        <main className="flex-1 animate-fade-in-up p-8 max-w-2xl space-y-6">
          <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center px-6">
              <h2 className="font-display text-[17px] font-bold">Tài khoản</h2>
            </div>
            <div className="p-6 text-[14px] space-y-1">
              <div className="text-ink-soft">Email đăng nhập</div>
              <div className="font-bold">{CURRENT_USER.email}</div>
            </div>
          </div>

          <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
            <div className="h-[64px] border-b border-line flex items-center px-6">
              <h2 className="font-display text-[17px] font-bold">Phiên đăng nhập</h2>
            </div>
            <div className="p-6">
              <button
                type="button"
                onClick={() => onNavigate('welcome')}
                className="inline-flex items-center gap-2 h-[42px] px-5 bg-danger hover:opacity-90 text-white rounded-xl font-bold text-[14px] transition-colors cursor-pointer"
              >
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserSettings;
