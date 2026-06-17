import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống của bạn
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login' | 'otp';

interface ForgotPasswordPageProps {
  onNavigate: (page: AdminPage) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  // Quản lý state cho dữ liệu ô nhập email
  const [email, setEmail] = useState<string>('');

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 font-sans text-black">
      
      {/* Khung trắng trung tâm (Rectangle 9 - 500x600px) */}
      <div className="w-full max-w-[500px] min-h-[600px] bg-white rounded-[30px] p-8 md:p-10 shadow-2xl flex flex-col items-center justify-between relative">
        
        {/* Nội dung phía trên (Icon + Title + Input) */}
        <div className="w-full flex flex-col items-center">
          
          {/* Khối bọc Icon Mail (Rectangle 226) */}
          <div className="w-[68px] h-[68px] bg-[#516bff]/37 rounded-[20px] flex items-center justify-center text-[#8A38F5] mb-4 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Tiêu đề */}
          <h2 className="text-[24px] font-extrabold text-black mb-2 text-center">Quên mật khẩu</h2>
          <p className="text-[18px] font-light text-gray-700 text-center max-w-[353px] leading-snug mb-8">
            Nhập email của bạn để nhận OTP đặt lại mật khẩu
          </p>

          {/* Ô Nhập Email Form */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[20px] font-medium text-black pl-2">Email</label>
            <div className="w-full h-[70px] border border-black rounded-[20px] flex items-center px-4 bg-white focus-within:border-blue-500 transition-colors">
              {/* Icon Mail nhỏ */}
              <span className="text-gray-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input 
                type="email" 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="your@gmail.com" 
                className="w-full h-full bg-transparent outline-none text-[20px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Khối các nút bấm phía dưới hành động */}
        <div className="w-full flex flex-col items-center gap-6 mt-8">
          
          {/* Nút Tiếp tục (Rectangle 225) */}
          <button 
            type="button"
            onClick={() => onNavigate('otp')}
            className="w-full max-w-[300px] h-[70px] bg-[#2431eb]/71 hover:bg-[#2431eb]/90 rounded-[20px] text-[24px] font-black text-white transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            Tiếp tục
          </button>

          {/* Nút Quay lại màn hình Login trước đó */}
          <button 
            type="button"
            onClick={() => onNavigate('login')} 
            className="h-[41px] flex items-center justify-center gap-2 text-[20px] font-medium text-[#8E51FF] hover:text-purple-800 transition-colors cursor-pointer group mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;