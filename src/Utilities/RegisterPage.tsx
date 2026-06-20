import React, { useState } from 'react';
import AuthInput from '../components/AuthInput';
import AuthSelect from '../components/AuthSelect';
import { authApi } from '../api/authApi';

const RegisterPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [form, setForm] = useState({
    username: '', fullName: '', birthDay: '', birthMonth: '', birthYear: '',
    gender: '', phone: '', email: '', password: '', confirmPassword: ''
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Mật khẩu không khớp");
    const success = await authApi.register(form);
    if (success) onNavigate('verifyEmail');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#C084FC] flex items-center justify-center p-4 text-black antialiased">
      <div className="w-full max-w-[480px] bg-white rounded-[24px] p-6 md:p-8 shadow-xl flex flex-col relative">
        <button type="button" onClick={() => onNavigate('welcome')} className="absolute left-6 top-6 text-black">←</button>
        <h2 className="text-center text-[24px] font-bold mb-6">Tạo Tài Khoản</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <AuthInput label="Tên Đăng Nhập" name="username" value={form.username} placeholder="Nhập tên đăng nhập" onChange={handleInput} />
          <AuthInput label="Họ và Tên" name="fullName" value={form.fullName} placeholder="Nhập họ và tên" onChange={handleInput} />
          
          <div>
            <label className="text-[12px] font-bold block mb-1">Ngày Sinh</label>
            <div className="grid grid-cols-3 gap-2">
              <AuthSelect name="birthDay" value={form.birthDay} placeholder="Ngày" onChange={handleInput} options={Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: String(i + 1) }))} />
              <AuthSelect name="birthMonth" value={form.birthMonth} placeholder="Tháng" onChange={handleInput} options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `Tháng ${i + 1}` }))} />
              <AuthSelect name="birthYear" value={form.birthYear} placeholder="Năm" onChange={handleInput} options={Array.from({ length: 60 }, (_, i) => ({ value: 2026 - i, label: String(2026 - i) }))} />
            </div>
          </div>

          <AuthSelect label="Giới Tính" name="gender" value={form.gender} placeholder="Chọn giới tính" onChange={handleInput} options={[{ value: 'male', label: 'Nam' }, { value: 'female', label: 'Nữ' }]} />
          <AuthInput label="Số Điện Thoại" name="phone" value={form.phone} placeholder="Số điện thoại" onChange={handleInput} />
          <AuthInput label="Email" name="email" type="email" value={form.email} placeholder="your@example.com" onChange={handleInput} />
          <AuthInput label="Mật Khẩu" name="password" type="password" value={form.password} placeholder="Mật khẩu" onChange={handleInput} />
          <AuthInput label="Xác Nhận Mật Khẩu" name="confirmPassword" type="password" value={form.confirmPassword} placeholder="Nhập lại mật khẩu" onChange={handleInput} />

          <button type="submit" className="w-full h-[42px] bg-[#7B8CFF] text-white font-bold rounded-[10px] text-sm mt-4 shadow-md cursor-pointer">ĐĂNG KÝ</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;