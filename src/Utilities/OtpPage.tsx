import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống của bạn
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login' | 'reset';

interface OtpPageProps {
  onNavigate: (page: AdminPage) => void;
}

const OtpPage: React.FC<OtpPageProps> = ({ onNavigate }) => {
  // Quản lý state cho ô nhập OTP
  const [otp, setOtp] = useState<string>('');

  // Hàm xử lý chỉ cho phép nhập số vào ô OTP
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 font-sans text-black">
      
      {/* Khung trắng trung tâm (Rectangle 9) */}
      <div className="w-full max-w-[500px] min-h-[600px] bg-white rounded-[30px] p-8 md:p-10 shadow-2xl flex flex-col items-center justify-between relative">
        
        {/* Nội dung phía trên (Icon + Title + Input OTP) */}
        <div className="w-full flex flex-col items-center">
          
          {/* Khối bọc Icon Mail (Rectangle 226) */}
          <div className="w-[68px] h-[68px] bg-[#516bff]/37 rounded-[20px] flex items-center justify-center text-[#8A38F5] mb-4 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          {/* Tiêu đề */}
          <h2 className="text-[24px] font-extrabold text-black mb-2 text-center">Quên mật khẩu</h2>
          <p className="text-[20px] font-light text-gray-700 text-center max-w-[353px] leading-snug mb-8">
            Nhập OTP để đặt lại mật khẩu
          </p>

          {/* Ô Nhập OTP (Rectangle 227) */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[20px] font-medium text-black pl-2">Nhập OTP</label>
            <div className="w-full h-[70px] border border-black rounded-[20px] flex items-center px-4 bg-white focus-within:border-blue-500 transition-colors">
              <span className="text-gray-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM7 11h10M12 7v10" />
                </svg>
              </span>
              <input 
                type="text" 
                value={otp}
                onChange={handleOtpChange}
                placeholder="Nhập mã OTP gồm 6 số" 
                maxLength={6}
                className="w-full h-full bg-transparent outline-none text-[20px] text-black placeholder-gray-400 tracking-wider"
                required
              />
            </div>
          </div>
        </div>

        {/* Khối nút bấm hành động phía dưới */}
        <div className="w-full flex flex-col items-center gap-6 mt-8">
          
          {/* Nút Tiếp tục (Rectangle 225) */}
          <button 
            type="button"
            onClick={() => onNavigate('reset')}
            className="w-full max-w-[300px] h-[70px] bg-[#2431eb]/71 hover:bg-[#2431eb]/90 rounded-[20px] text-[24px] font-black text-white transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            Tiếp tục
          </button>

          {/* Nút Quay lại màn hình nhập Email trước đó */}
          <button 
            type="button"
            onClick={() => onNavigate('forgot')} 
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

export default OtpPage;