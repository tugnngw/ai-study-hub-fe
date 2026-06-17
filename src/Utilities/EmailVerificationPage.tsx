import React from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống của bạn
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login';

interface EmailVerificationPageProps {
  onNavigate: (page: AdminPage) => void;
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 font-sans text-black">
      
      {/* Khung trắng trung tâm (Rectangle 9 - 500x500px) */}
      <div className="w-full max-w-[500px] min-h-[500px] bg-white rounded-[30px] p-8 md:p-10 shadow-2xl flex flex-col items-center justify-between relative">
        
        {/* Nội dung thông báo phía trên */}
        <div className="w-full flex flex-col items-center flex-1 justify-center mt-4">
          
          {/* Vòng tròn Icon tích xanh (Rectangle 224) */}
          <div className="w-20 h-20 bg-[#06ff0b]/12 rounded-full flex items-center justify-center text-[#14AE5C] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Tiêu đề */}
          <h2 className="text-[24px] font-black text-black mb-4 text-center">Tạo tài khoản</h2>
          
          {/* Nội dung thông báo */}
          <p className="text-[20px] font-light text-gray-800 text-center max-w-[320px] leading-relaxed">
            Tài khoản của bạn đã được tạo thành công. Vui lòng xác nhận email để tiếp tục.
          </p>
        </div>

        {/* Khối nút bấm hành động phía dưới (Rectangle 225) */}
        <div className="w-full flex flex-col items-center mt-6 mb-4">
          <button 
            type="button"
            onClick={() => onNavigate('login')}
            className="w-full max-w-[400px] h-[70px] bg-[#2431eb]/71 hover:bg-[#2431eb]/90 rounded-[20px] text-[24px] font-black text-white transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
            Đăng nhập ngay
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmailVerificationPage;