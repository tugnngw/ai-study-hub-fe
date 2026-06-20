import React, { useState } from 'react';
import { AllPages } from '../App';

interface Props { 
  onNavigate: (page: AllPages) => void; 
}

const LoginPage: React.FC<Props> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNavigate('welcome');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#C084FC] flex items-center justify-center p-4 font-sans text-black antialiased">
      <div className="w-full max-w-[440px] bg-white rounded-[24px] p-8 shadow-xl flex flex-col items-center">
        
        <div className="w-12 h-12 bg-[#7B92FF] rounded-[14px] flex items-center justify-center text-white mb-3 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <h2 className="text-[20px] font-bold mb-0.5">AI STUDY HUB</h2>
        <p className="text-gray-500 text-xs mb-6 font-medium">Đăng nhập</p>

        <form className="w-full space-y-4" onSubmit={handleUserSubmit}>
          <div>
            <label className="text-[11px] font-bold block mb-1">Tài Khoản</label>
            <div className="w-full h-[40px] border border-gray-300 rounded-[10px] flex items-center px-3 bg-white">
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Tên tài khoản hoặc email" className="w-full h-full bg-transparent outline-none text-xs" required />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold block mb-1">Mật Khẩu</label>
            <div className="w-full h-[40px] border border-gray-300 rounded-[10px] flex items-center px-3 bg-white">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" className="w-full h-full bg-transparent outline-none text-xs tracking-wider" required />
            </div>
            <div className="text-right mt-1.5">
              <span onClick={() => onNavigate('forgot')} className="text-[10px] font-medium text-[#8E51FF] hover:underline cursor-pointer">Quên mật khẩu ?</span>
            </div>
          </div>

          <button type="submit" className="w-full h-[42px] bg-[#6366F1]/80 text-white font-bold rounded-[10px] cursor-pointer text-sm shadow-md mt-2 hover:bg-indigo-600 transition-colors">
            Đăng Nhập
          </button>
        </form>

        <div className="w-full grid grid-cols-2 gap-3 mt-4">
          <button type="button" className="h-[38px] border border-gray-300 rounded-[10px] flex items-center justify-center font-bold text-xs hover:bg-gray-50 cursor-pointer">Gmail</button>
          <button type="button" className="h-[38px] border border-gray-300 rounded-[10px] flex items-center justify-center font-bold text-xs hover:bg-gray-50 cursor-pointer">Facebook</button>
        </div>

        <p className="text-center text-[11px] text-gray-500 mt-5">
          Chưa có tài khoản? <span onClick={() => onNavigate('register')} className="font-bold text-[#8E51FF] hover:underline cursor-pointer">Đăng ký ngay</span>
        </p>

        <div className="w-full border-t border-gray-200 mt-5 pt-4 flex justify-center">
          <button type="button" onClick={() => onNavigate('admin')} className="text-[11px] text-gray-400 hover:text-black flex items-center gap-1 cursor-pointer">
            Cổng quản trị
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;