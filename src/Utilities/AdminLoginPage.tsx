import React, { useState } from 'react';
import { AllPages } from '../App';

interface Props { 
  onNavigate: (page: AllPages) => void; 
}

const AdminLoginPage: React.FC<Props> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onNavigate('adminDashboard');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#C084FC] flex items-center justify-center p-4 text-black font-sans antialiased">
      <div className="w-full max-w-[420px] bg-white rounded-[24px] p-8 shadow-xl flex flex-col items-center">
        
        <div className="w-12 h-12 bg-[#F3E8FF] text-[#A855F7] rounded-[14px] flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <h2 className="text-[18px] font-bold">Quản trị viên</h2>
        <p className="text-gray-400 text-xs mb-6">Đăng nhập vào cổng quản trị hệ thống</p>

        <form className="w-full space-y-4" onSubmit={handleAdminSubmit}>
          <div>
            <label className="text-[11px] font-bold block mb-1">Email quản trị</label>
            <div className="w-full h-[40px] border border-gray-300 rounded-[10px] flex items-center px-3 bg-white">
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Tên tài khoản hoặc email" className="w-full h-full bg-transparent outline-none text-xs" required />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold block mb-1">Mật Khẩu</label>
            <div className="w-full h-[40px] border border-gray-300 rounded-[10px] flex items-center px-3 bg-white">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" className="w-full h-full bg-transparent outline-none text-xs tracking-wider" required />
            </div>
          </div>

          <button type="submit" className="w-full h-[42px] bg-[#6366F1]/80 text-white font-bold rounded-[10px] cursor-pointer text-sm shadow-md mt-2 hover:bg-indigo-600 transition-colors">
            Đăng Nhập
          </button>
        </form>

        <button type="button" onClick={() => onNavigate('welcome')} className="text-xs font-semibold text-gray-400 hover:text-black mt-5 flex items-center gap-1 cursor-pointer">
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;