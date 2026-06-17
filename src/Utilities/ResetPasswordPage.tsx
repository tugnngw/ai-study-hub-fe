import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống của bạn
type NavigationPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login' | 'otp' | 'resetSuccess';

interface ResetPasswordPageProps {
  onNavigate: (page: NavigationPage) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  // Quản lý dữ liệu đầu vào cho 2 ô mật khẩu
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Trạng thái ẩn/hiện mật khẩu độc lập cho từng ô dữ liệu
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Xử lý sự kiện khi submit biểu mẫu đổi mật khẩu
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Mật khẩu nhập lại không khớp!');
      return;
    }

    // Thực hiện logic gọi API cập nhật mật khẩu mới tại đây nếu có
    onNavigate('resetSuccess');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 font-sans text-black">
      
      {/* Khung trắng trung tâm (Rectangle 9) */}
      <div className="w-full max-w-[500px] min-h-[600px] bg-white rounded-[30px] p-8 md:p-10 shadow-2xl flex flex-col items-center justify-between relative">
        
        {/* Nội dung phía trên (Icon + Title + Inputs) */}
        <div className="w-full flex flex-col items-center">
          
          {/* Khối bọc Icon khóa/khiên bảo mật (Rectangle 226) */}
          <div className="w-[68px] h-[68px] bg-[#516bff]/37 rounded-[20px] flex items-center justify-center text-[#8A38F5] mb-4 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Tiêu đề */}
          <h2 className="text-[24px] font-extrabold text-black mb-6 text-center">Đặt lại mật khẩu mới</h2>

          {/* FORM NHẬP MẬT KHẨU MỚI */}
          <form id="resetPasswordForm" className="w-full space-y-4" onSubmit={handleSubmit}>
            
            {/* Ô Nhập mật khẩu */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-[18px] font-medium text-black pl-2">Nhập mật khẩu</label>
              <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white focus-within:border-blue-500 transition-colors relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="........" 
                  className={`w-full h-full bg-transparent outline-none text-black placeholder-gray-400 ${showPassword ? 'text-[18px]' : 'text-[24px] tracking-widest'}`}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 absolute right-4 cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Ô Nhập lại mật khẩu */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-[18px] font-medium text-black pl-2">Nhập lại mật khẩu</label>
              <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white focus-within:border-blue-500 transition-colors relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  placeholder="........" 
                  className={`w-full h-full bg-transparent outline-none text-black placeholder-gray-400 ${showConfirmPassword ? 'text-[18px]' : 'text-[24px] tracking-widest'}`}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 absolute right-4 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Khối nút bấm hành động phía dưới */}
        <div className="w-full flex flex-col items-center gap-4 mt-6">
          
          {/* Nút Tiếp tục (Liên kết kích hoạt submit form id hệ thống) */}
          <button 
            type="submit"
            form="resetPasswordForm"
            className="w-full max-w-[300px] h-[70px] bg-[#2431eb]/71 hover:bg-[#2431eb]/90 rounded-[20px] text-[24px] font-black text-white transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            Tiếp tục
          </button>

          {/* Nút Quay lại màn hình nhập OTP trước đó */}
          <button 
            type="button"
            onClick={() => onNavigate('otp')} 
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

export default ResetPasswordPage;