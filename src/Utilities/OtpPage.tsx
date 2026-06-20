import React, { useState } from 'react';
import { AllPages } from '../App';
import { ShieldCheck } from 'lucide-react';

const OtpPage: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [otp, setOtp] = useState('');

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 flex items-center justify-center p-4 text-ink overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[440px] bg-card rounded-[24px] p-8 shadow-modal flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mb-4">
          <ShieldCheck size={22} strokeWidth={2.1} />
        </div>
        <h2 className="font-display text-[20px] font-bold mb-1.5">Nhập mã xác thực</h2>
        <p className="text-ink-soft text-[13.5px] text-center mb-6 max-w-[300px] leading-relaxed">
          Mã OTP 6 số đã được gửi đến email của bạn
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          maxLength={6}
          className="w-full h-[56px] border border-line rounded-xl px-4 tracking-[0.5em] text-center text-[22px] font-bold outline-none bg-surface focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy text-ink"
          placeholder="000000"
          required
        />

        <button
          type="button"
          onClick={() => onNavigate('reset')}
          className="w-full h-[44px] bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-xl text-[14.5px] shadow-brand-glow transition-snappy cursor-pointer mt-6"
        >
          Xác nhận
        </button>

        <p className="text-ink-faint text-[12.5px] mt-4">
          Chưa nhận được mã? <span className="font-bold text-brand-500 hover:underline cursor-pointer">Gửi lại</span>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;
