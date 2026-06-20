import React, { useState } from 'react';

const ForgotPasswordPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-[500px] min-h-[550px] bg-white rounded-[30px] p-8 shadow-2xl flex flex-col justify-between items-center">
        <div className="w-full text-center">
          <h2 className="text-[24px] font-extrabold mb-2">Quên mật khẩu</h2>
          <p className="text-gray-500 text-sm mb-6">Nhập email của bạn để nhận OTP đặt lại mật khẩu</p>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-[65px] border border-black rounded-[20px] px-4 outline-none" placeholder="your.email@gmail.com" required />
        </div>
        <div className="w-full space-y-3">
          <button type="button" onClick={() => onNavigate('otp')} className="w-full h-[65px] bg-[#2431eb]/71 text-white font-black rounded-[20px] cursor-pointer">Tiếp tục</button>
          <button type="button" onClick={() => onNavigate('login')} className="w-full text-center text-sm text-gray-500 hover:underline cursor-pointer">Quay lại</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;