import React, { useState } from 'react';

const ResetPasswordPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-[500px] min-h-[500px] bg-white rounded-[30px] p-8 shadow-2xl flex flex-col justify-between items-center">
        <div className="w-full text-center space-y-4">
          <h2 className="text-[24px] font-extrabold mb-4">Đặt lại mật khẩu mới</h2>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Nhập mật khẩu mới" className="w-full h-[60px] border border-black rounded-[20px] px-4 outline-none bg-white" required />
          <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Xác nhận mật khẩu mới" className="w-full h-[60px] border border-black rounded-[20px] px-4 outline-none bg-white" required />
        </div>
        <button type="button" onClick={() => onNavigate('resetSuccess')} className="w-full h-[65px] bg-[#2431eb]/71 text-white font-black rounded-[20px] cursor-pointer mt-6">Cập nhật mật khẩu</button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;