import React from 'react';
import { AllPages } from '../App';
import { CheckCircle2 } from 'lucide-react';

const ResetSuccessPage: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 flex items-center justify-center p-4 text-ink overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[420px] bg-card rounded-[24px] p-8 shadow-modal flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-success-bg text-success border border-success-line rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} strokeWidth={2} />
        </div>
        <h2 className="font-display text-[20px] font-bold mb-1.5">Đặt lại thành công</h2>
        <p className="text-ink-soft text-[13.5px] leading-relaxed max-w-[280px]">
          Mật khẩu mới của bạn đã được cập nhật. Hãy đăng nhập lại để tiếp tục.
        </p>

        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="w-full h-[44px] bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-xl text-[14.5px] shadow-brand-glow transition-snappy cursor-pointer mt-7"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ResetSuccessPage;
