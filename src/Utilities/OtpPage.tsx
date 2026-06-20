import React, { useState } from 'react';

const OtpPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [otp, setOtp] = useState('');
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-[500px] min-h-[550px] bg-white rounded-[30px] p-8 shadow-2xl flex flex-col justify-between items-center">
        <div className="w-full text-center">
          <h2 className="text-[24px] font-extrabold mb-6">Nhập mã xác thực</h2>
          <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,''))} maxLength={6} className="w-full h-[65px] border border-black rounded-[20px] px-4 tracking-widest text-center text-2xl font-bold outline-none" placeholder="000000" required />
        </div>
        <button type="button" onClick={() => onNavigate('reset')} className="w-full h-[65px] bg-[#2431eb]/71 text-white font-black rounded-[20px] cursor-pointer">Xác nhận</button>
      </div>
    </div>
  );
};

export default OtpPage;