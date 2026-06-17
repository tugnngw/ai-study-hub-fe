import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống của bạn
type NavigationPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome' | 'forgot' | 'login' | 'register' | 'verifyEmail';

interface RegisterPageProps {
  onNavigate: (page: NavigationPage) => void;
}

// Cấu trúc kiểu dữ liệu cho toàn bộ trường thông tin trong form đăng ký
interface RegisterFormState {
  username: string;
  fullName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  // Quản lý tập trung state cho form nhập liệu đăng ký
  const [formState, setFormState] = useState<RegisterFormState>({
    username: '',
    fullName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Hàm cập nhật dữ liệu động cho cả input và select box
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý sự kiện khi submit form đăng ký
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (formState.password !== formState.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    // Thực hiện logic gọi API đăng ký tài khoản tại đây nếu cần
    onNavigate('verifyEmail');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#007aff]/78 to-[#6e30e0]/52 flex items-center justify-center p-4 md:p-8 font-sans text-black">
      
      {/* Khung trắng trung tâm (Rectangle 9 - tối đa 900px cho form rộng rãi) */}
      <div className="w-full max-w-[900px] bg-white rounded-[30px] p-6 md:p-12 shadow-2xl relative">
        
        {/* Nút Quay lại (ep:back) */}
        <button 
          type="button"
          onClick={() => onNavigate('welcome')}
          className="absolute left-6 top-8 flex items-center gap-1 text-gray-500 hover:text-black font-medium text-lg cursor-pointer transition-colors"
        >
          ← <span className="text-sm hidden sm:inline">Quay lại</span>
        </button>

        {/* Tiêu đề chính */}
        <div className="text-center mb-8">
          <h2 className="text-[36px] md:text-[48px] font-bold text-black">Tạo Tài Khoản</h2>
        </div>

        {/* FORM ĐĂNG KÝ */}
        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          
          {/* Hàng 1: Tên đăng nhập */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Tên Đăng Nhập</label>
            <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white">
              <input 
                type="text" 
                name="username"
                value={formState.username}
                onChange={handleInputChange}
                placeholder="Nhập tên đăng nhập" 
                className="w-full h-full bg-transparent outline-none text-[18px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Hàng 2: Họ và tên */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Họ và Tên</label>
            <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white">
              <input 
                type="text" 
                name="fullName"
                value={formState.fullName}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên" 
                className="w-full h-full bg-transparent outline-none text-[18px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Hàng 3: Ngày Sinh (Chia 3 cột Ngày - Tháng - Năm bằng Grid) */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Ngày Sinh</label>
            <div className="grid grid-cols-3 gap-4">
              {/* Ô Ngày */}
              <div className="h-[65px] border border-black rounded-[20px] flex items-center justify-between px-4 bg-white">
                <select 
                  name="birthDay"
                  value={formState.birthDay}
                  onChange={handleInputChange}
                  className="w-full h-full bg-transparent outline-none text-[18px] text-gray-700 cursor-pointer appearance-none"
                  required
                >
                  <option value="">Ngày</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <span className="text-gray-500 text-xs">▼</span>
              </div>
              {/* Ô Tháng */}
              <div className="h-[65px] border border-black rounded-[20px] flex items-center justify-between px-4 bg-white">
                <select 
                  name="birthMonth"
                  value={formState.birthMonth}
                  onChange={handleInputChange}
                  className="w-full h-full bg-transparent outline-none text-[18px] text-gray-700 cursor-pointer appearance-none"
                  required
                >
                  <option value="">Tháng</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                  ))}
                </select>
                <span className="text-gray-500 text-xs">▼</span>
              </div>
              {/* Ô Năm */}
              <div className="h-[65px] border border-black rounded-[20px] flex items-center justify-between px-4 bg-white">
                <select 
                  name="birthYear"
                  value={formState.birthYear}
                  onChange={handleInputChange}
                  className="w-full h-full bg-transparent outline-none text-[18px] text-gray-700 cursor-pointer appearance-none"
                  required
                >
                  <option value="">Năm</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={2026 - i}>{2026 - i}</option>
                  ))}
                </select>
                <span className="text-gray-500 text-xs">▼</span>
              </div>
            </div>
          </div>

          {/* Hàng 4: Giới Tính */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Giới Tính</label>
            <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center justify-between px-4 bg-white">
              <select 
                name="gender"
                value={formState.gender}
                onChange={handleInputChange}
                className="w-full h-full bg-transparent outline-none text-[18px] text-gray-700 cursor-pointer appearance-none"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              <span className="text-gray-500 text-xs">▼</span>
            </div>
          </div>

          {/* Hàng 5: Số Điện Thoại */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Số Điện Thoại</label>
            <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white">
              <input 
                type="tel" 
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={handleInputChange}
                placeholder="Số điện thoại" 
                className="w-full h-full bg-transparent outline-none text-[18px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Hàng 6: Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Email</label>
            <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white">
              <input 
                type="email" 
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com" 
                className="w-full h-full bg-transparent outline-none text-[18px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Hàng 7: Mật Khẩu */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Mật Khẩu</label>
            <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white">
              <input 
                type="password" 
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu" 
                className="w-full h-full bg-transparent outline-none text-[18px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Hàng 8: Xác Nhận Mật Khẩu */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-semibold text-black pl-1">Xác Nhận Mật Khẩu</label>
            <div className="w-full h-[65px] border border-black rounded-[20px] flex items-center px-4 bg-white">
              <input 
                type="password" 
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu" 
                className="w-full h-full bg-transparent outline-none text-[18px] text-black placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Điều khoản quyên riêng tư */}
          <p className="text-[14px] md:text-[16px] font-light text-black text-center pt-2">
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với{' '}
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">Điều khoản</span> và{' '}
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">Chính sách quyền riêng tư</span> của chúng tôi.
          </p>

          {/* Nút Đăng ký lớn (Rectangle 218) */}
          <div className="w-full flex justify-center pt-4">
            <button 
              type="submit"
              className="w-full h-[70px] bg-[#2431eb]/60 hover:bg-[#2431eb]/80 border border-black rounded-[20px] text-[24px] md:text-[32px] font-bold text-white transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              ĐĂNG KÝ
            </button>
          </div>
        </form>

        {/* Lối chuyển về Đăng nhập nếu đã có tài khoản */}
        <div className="text-center mt-6">
          <p className="text-[18px] md:text-[22px] font-light text-black">
            Đã có tài khoản?{' '}
            <span 
              onClick={() => onNavigate('login')}
              className="font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Đăng nhập
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;