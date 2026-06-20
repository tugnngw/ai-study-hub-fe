import React from 'react';
import { AllPages } from '../App';
import { MailCheck } from 'lucide-react';

interface Props {
  onNavigate: (page: AllPages) => void;
}

const EmailVerificationPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 flex items-center justify-center p-4 font-sans text-ink antialiased overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[400px] bg-card rounded-[24px] p-8 shadow-modal flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-success-bg text-success border border-success-line rounded-full flex items-center justify-center mb-4">
          <MailCheck size={26} strokeWidth={2} />
        </div>

        <h2 className="font-display text-[19px] font-bold mb-2">Tạo tài khoản thành công</h2>
        <p className="text-ink-soft text-[13.5px] leading-relaxed max-w-[280px] mb-7">
          Tài khoản của bạn đã được tạo. Vui lòng xác nhận email để bắt đầu sử dụng AI Study Hub.
        </p>

        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="w-full h-[44px] bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-xl text-[14.5px] shadow-brand-glow transition-snappy cursor-pointer"
        >
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
