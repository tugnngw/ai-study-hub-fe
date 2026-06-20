import React from 'react';

interface Props { onNavigate: (page: any) => void; }

const EmailVerificationPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#C084FC] flex items-center justify-center p-4 text-black font-sans antialiased">
      <div className="w-full max-w-[400px] bg-white rounded-[24px] p-8 shadow-xl flex flex-col items-center text-center">
        
        <div className="w-12 h-12 bg-[#D1FAE5] text-[#10B981] rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-[18px] font-bold mb-2">Tạo tài khoản</h2>
        <p className="text-gray-500 text-xs leading-relaxed max-w-[260px] mb-6">
          Tài khoản của bạn đã được tạo thành công. Vui lòng xác nhận email để tiếp tục.
        </p>

        <button type="button" onClick={() => onNavigate('login')} className="w-full h-[42px] bg-[#5368FF] text-white font-bold rounded-[10px] cursor-pointer text-sm shadow-md hover:opacity-95">
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;