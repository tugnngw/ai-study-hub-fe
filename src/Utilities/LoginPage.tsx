import React, { useState } from 'react';
import { AllPages } from '../App';
import { GraduationCap, Lock, ShieldCheck, User as UserIcon } from 'lucide-react';

interface Props {
  onNavigate: (page: AllPages) => void;
}

const LoginPage: React.FC<Props> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNavigate('userDashboard');
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 flex items-center justify-center p-4 font-sans text-ink antialiased overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[440px] bg-card rounded-[24px] p-8 shadow-modal flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-brand-glow">
          <GraduationCap size={26} strokeWidth={2.25} />
        </div>
        <h2 className="font-display text-[20px] font-bold mb-0.5 tracking-tight">AI Study Hub</h2>
        <p className="text-ink-soft text-[13px] mb-6 font-medium">Đăng nhập để tiếp tục học tập</p>

        <form className="w-full space-y-4" onSubmit={handleUserSubmit}>
          <div>
            <label className="text-[12px] font-bold block mb-1.5 text-ink">Tài khoản</label>
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
            <div className="text-right mt-1.5">
              <span onClick={() => onNavigate('forgot')} className="text-[12px] font-semibold text-brand-500 hover:text-brand-600 hover:underline cursor-pointer">
                Quên mật khẩu?
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[44px] bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-xl cursor-pointer text-[14.5px] shadow-brand-glow transition-snappy mt-2"
          >
            Đăng nhập
          </button>
        </form>

        <div className="w-full flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-line" />
          <span className="text-ink-faint text-[12px] font-semibold">hoặc</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          <button type="button" className="h-[40px] border border-line rounded-xl flex items-center justify-center font-bold text-[13px] text-ink-soft hover:bg-surface-alt hover:text-ink transition-snappy cursor-pointer">
            Gmail
          </button>
          <button type="button" className="h-[40px] border border-line rounded-xl flex items-center justify-center font-bold text-[13px] text-ink-soft hover:bg-surface-alt hover:text-ink transition-snappy cursor-pointer">
            Facebook
          </button>
        </div>

        <p className="text-center text-[13px] text-ink-soft mt-5">
          Chưa có tài khoản?{' '}
          <span onClick={() => onNavigate('register')} className="font-bold text-brand-500 hover:text-brand-600 hover:underline cursor-pointer">
            Đăng ký ngay
          </span>
        </p>

        <div className="w-full border-t border-line mt-5 pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="text-[12.5px] font-semibold text-ink-faint hover:text-brand-500 flex items-center gap-1.5 cursor-pointer transition-snappy"
          >
            <ShieldCheck size={14} strokeWidth={2.25} />
            Cổng quản trị
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
