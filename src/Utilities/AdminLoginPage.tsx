import React, { useState } from 'react';
import { AllPages } from '../App';
import { ChevronLeft, Lock, ShieldCheck, User as UserIcon } from 'lucide-react';

interface Props {
  onNavigate: (page: AllPages) => void;
}

const AdminLoginPage: React.FC<Props> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNavigate('adminDashboard');
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-ink to-brand-800 flex items-center justify-center p-4 text-ink font-sans antialiased overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 w-96 h-96 rounded-full bg-brand-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[420px] bg-card rounded-[24px] p-8 shadow-modal flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-900 text-white rounded-2xl flex items-center justify-center mb-3 shadow-[0_8px_20px_-4px_rgba(28,14,69,0.4)]">
          <ShieldCheck size={24} strokeWidth={2.25} />
        </div>
        <h2 className="font-display text-[18px] font-bold tracking-tight">Quản trị viên</h2>
        <p className="text-ink-soft text-[13px] mb-6">Đăng nhập vào cổng quản trị hệ thống</p>

        <form className="w-full space-y-4" onSubmit={handleAdminSubmit}>
          <div>
            <label className="text-[12px] font-bold block mb-1.5 text-ink">Email quản trị</label>
            <div className="w-full h-[42px] border border-line rounded-xl flex items-center px-3.5 bg-surface focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-snappy">
              <UserIcon size={16} strokeWidth={2} className="text-ink-faint mr-2.5 shrink-0" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên tài khoản hoặc email"
                className="w-full h-full bg-transparent outline-none text-[13.5px] text-ink placeholder-ink-faint"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-bold block mb-1.5 text-ink">Mật khẩu</label>
            <div className="w-full h-[42px] border border-line rounded-xl flex items-center px-3.5 bg-surface focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-snappy">
              <Lock size={16} strokeWidth={2} className="text-ink-faint mr-2.5 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full h-full bg-transparent outline-none text-[13.5px] text-ink placeholder-ink-faint tracking-wider"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[44px] bg-brand-900 hover:bg-brand-800 active:scale-[0.99] text-white font-bold rounded-xl cursor-pointer text-[14.5px] shadow-[0_8px_20px_-4px_rgba(28,14,69,0.4)] transition-snappy mt-2"
          >
            Đăng nhập
          </button>
        </form>

        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="text-[13px] font-semibold text-ink-faint hover:text-brand-500 mt-5 flex items-center gap-1 cursor-pointer transition-snappy"
        >
          <ChevronLeft size={15} strokeWidth={2.25} />
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
