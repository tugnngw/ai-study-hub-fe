import React, { useState } from 'react';
import { AllPages } from '../App';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';

const ForgotPasswordPage: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 flex items-center justify-center p-4 text-ink overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[440px] bg-card rounded-[24px] p-8 shadow-modal flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mb-4">
          <KeyRound size={22} strokeWidth={2.1} />
        </div>
        <h2 className="font-display text-[20px] font-bold mb-1.5">Quên mật khẩu</h2>
        <p className="text-ink-soft text-[13.5px] text-center mb-6 max-w-[300px] leading-relaxed">
          Nhập email của bạn để nhận mã OTP đặt lại mật khẩu
        </p>

        <div className="w-full h-[42px] border border-line rounded-xl flex items-center px-3.5 bg-surface focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-snappy mb-5">
          <Mail size={16} strokeWidth={2} className="text-ink-faint mr-2.5 shrink-0" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-full bg-transparent outline-none text-[13.5px] text-ink placeholder-ink-faint"
            placeholder="your.email@gmail.com"
            required
          />
        </div>

        <div className="w-full space-y-2.5">
          <button
            type="button"
            onClick={() => onNavigate('otp')}
            className="w-full h-[44px] bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-xl text-[14.5px] shadow-brand-glow transition-snappy cursor-pointer"
          >
            Tiếp tục
          </button>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="w-full h-[40px] flex items-center justify-center gap-1.5 text-[13px] font-semibold text-ink-soft hover:text-brand-500 transition-snappy cursor-pointer"
          >
            <ArrowLeft size={14} strokeWidth={2.25} />
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
