import React, { useState } from 'react';
import { AllPages } from '../App';
import { Lock, ShieldCheck } from 'lucide-react';

const ResetPasswordPage: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 flex items-center justify-center p-4 text-ink overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[440px] bg-card rounded-[24px] p-8 shadow-modal flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mb-4">
          <ShieldCheck size={22} strokeWidth={2.1} />
        </div>
        <h2 className="font-display text-[20px] font-bold mb-1.5">Đặt lại mật khẩu mới</h2>
        <p className="text-ink-soft text-[13.5px] text-center mb-6 max-w-[300px] leading-relaxed">
          Tạo một mật khẩu mới, mạnh và dễ nhớ
        </p>

        <div className="w-full space-y-3.5">
          <div className="w-full h-[42px] border border-line rounded-xl flex items-center px-3.5 bg-surface focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-snappy">
            <Lock size={16} strokeWidth={2} className="text-ink-faint mr-2.5 shrink-0" />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="w-full h-full bg-transparent outline-none text-[13.5px] text-ink placeholder-ink-faint"
              required
            />
          </div>
          <div className="w-full h-[42px] border border-line rounded-xl flex items-center px-3.5 bg-surface focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-snappy">
            <Lock size={16} strokeWidth={2} className="text-ink-faint mr-2.5 shrink-0" />
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
              className="w-full h-full bg-transparent outline-none text-[13.5px] text-ink placeholder-ink-faint"
              required
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('resetSuccess')}
          className="w-full h-[44px] bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-xl text-[14.5px] shadow-brand-glow transition-snappy cursor-pointer mt-6"
        >
          Cập nhật mật khẩu
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
