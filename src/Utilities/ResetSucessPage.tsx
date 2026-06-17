import React from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống của bạn
type NavigationPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login' | 'otp' | 'reset';

interface ResetSuccessPageProps {
  onNavigate: (page: NavigationPage) => void;
}

const ResetSuccessPage: React.FC<ResetSuccessPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 font-sans text-black">
      
      {/* Khung trắng trung tâm (Rectangle 9 - 500x500px) */}
      <div className="w-full max-w-[500px] min-h-[500px] bg-white rounded-[30px] p-8 md:p-10 shadow-2xl flex flex-col items-center justify-between relative">
        
        {/* Nội dung thông báo phía trên */}
        <div className="w-full flex flex-col items-center flex-1 justify-center">
          
          {/* Vòng tròn Icon tích xanh thành công */}
          <div className="w-20 h-20 bg-[#06ff0b]/12 rounded-full flex items-center justify-center text-[#14AE5C] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Tiêu đề thông báo */}
          <h2 className="text-[24px] font-extrabold text-black mb-2 text-center">Đặt lại mật khẩu thành công</h2>
          <p className="text-[24px] font-bold text-[#2B7FFF] text-center leading-snug">
            Chúc mừng bạn!
          </p>
        </div>

        {/* Khối nút bấm hành động phía dưới */}
        <div className="w-full flex flex-col items-center gap-6 mt-6">
          
          {/* Nút Đăng nhập để quay về trang Login User */}
          <button 
            type="button"
            onClick={() => onNavigate('login')}
            className="w-full max-w-[300px] h-[70px] bg-[#2431eb]/71 hover:bg-[#2431eb]/90 rounded-[20px] text-[24px] font-bold text-white transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            Đăng nhập
          </button>

          {/* Nút Quay lại */}
          <button 
            type="button"
            onClick={() => onNavigate('reset')} 
            className="h-[41px] flex items-center justify-center gap-2 text-[20px] font-medium text-[#8E51FF] hover:text-purple-800 transition-colors cursor-pointer group"
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

export default ResetSuccessPage;