import React, { useState } from 'react';

type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login';

interface AdminLoginPageProps {
  onNavigate: (page: AdminPage) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  // 1. Định nghĩa đầy đủ các state quản lý form nhập liệu
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 2. Định nghĩa hàm handleSubmit chuẩn Type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onNavigate('adminDashboard');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 font-sans text-black">
      
      {/* Khung trắng trung tâm (Rectangle 9) */}
      <div className="w-full max-w-[600px] bg-white rounded-[30px] p-8 md:p-12 shadow-2xl flex flex-col items-center relative">
        
        {/* Logo Cổng Quản Trị (Rectangle 219) */}
        <div className="w-[70px] h-[70px] bg-[#7d05e6]/10 rounded-[20px] flex items-center justify-center text-[#8A38F5] mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2 className="text-[26px] font-bold text-black mb-1">Quản trị viên</h2>
        <p className="text-[22px] font-light text-gray-700 mb-8 text-center">Đăng nhập vào cổng quản trị hệ thống</p>

        {/* FORM NHẬP LIỆU */}
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          
          {/* Ô Email quản trị */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[20px] font-medium text-black pl-2">Email quản trị</label>
            <div className="w-full h-[70px] border border-black rounded-[20px] flex items-center px-4 bg-white focus-within:border-purple-500 transition-colors">
              <span className="text-gray-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input 
                type="text" 
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                placeholder="Tên tài khoản hoặc email" 
                className="w-full h-full bg-transparent outline-none text-[18px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Ô Mật Khẩu */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[20px] font-medium text-black pl-2">Mật Khẩu</label>
            <div className="w-full h-[70px] border border-black rounded-[20px] flex items-center px-4 bg-white focus-within:border-purple-500 transition-colors relative">
              <span className="text-gray-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
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
            <div className="text-right mt-1">
              <span
                onClick={() => onNavigate('forgot')}
                className="text-[15px] font-medium text-[#6e38f5]/64 hover:underline cursor-pointer"
              >
                Quên mật khẩu ?
              </span>
            </div>
          </div>

          {/* Nút Đăng Nhập Hệ Thống */}
          <button 
            type="submit"
            className="w-full h-[70px] bg-[#2431eb]/60 hover:bg-[#2431eb]/80 border border-black rounded-[20px] text-[24px] font-black text-white transition-all shadow-md active:scale-[0.99] cursor-pointer mt-4"
          >
            Đăng Nhập
          </button>
        </form>

        {/* Nút Quay lại trang Login User */}
        <button 
          type="button"
          onClick={() => onNavigate('login')} 
          className="mt-12 h-[41px] flex items-center justify-center gap-2 text-[20px] font-medium text-[#8E51FF] hover:text-purple-800 transition-colors cursor-pointer group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại
        </button>

      </div>
    </div>
  );
};

export default AdminLoginPage;