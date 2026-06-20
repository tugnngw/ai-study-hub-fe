import React from 'react';

const ResetSuccessPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-[500px] min-h-[450px] bg-white rounded-[30px] p-8 shadow-2xl flex flex-col justify-between items-center">
        <div className="w-full flex flex-col items-center flex-1 justify-center text-center">
          <div className="w-16 h-16 border border-emerald-500/20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-[24px] font-extrabold mb-2">Đặt lại thành công</h2>
          <p className="text-gray-500 font-medium">Mật khẩu mới của bạn đã được cập nhật thành công hệ thống!</p>
        </div>
        <button type="button" onClick={() => onNavigate('login')} className="w-full h-[65px] bg-[#2431eb]/71 text-white font-bold text-xl rounded-[20px] cursor-pointer">Đăng nhập</button>
      </div>
    </div>
  );
};

export default ResetSuccessPage;