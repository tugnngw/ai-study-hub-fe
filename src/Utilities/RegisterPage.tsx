import React, { useState } from 'react';
import AuthInput from '../components/AuthInput';
import AuthSelect from '../components/AuthSelect';
import { authApi } from '../api/authApi';
import { AllPages } from '../App';
import { ArrowLeft } from 'lucide-react';

const RegisterPage: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
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
    <div className="relative w-full min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 flex items-center justify-center p-4 text-ink antialiased overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="animate-scale-in relative z-10 w-full max-w-[480px] bg-card rounded-[24px] p-6 md:p-8 shadow-modal flex flex-col">
        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="absolute left-6 top-6 w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-surface-alt hover:text-ink transition-snappy cursor-pointer"
          aria-label="Quay lại"
        >
          <ArrowLeft size={17} strokeWidth={2.25} />
        </button>
        <h2 className="font-display text-center text-[22px] font-bold mb-1 mt-1">Tạo tài khoản</h2>
        <p className="text-center text-ink-soft text-[13px] mb-6">Bắt đầu hành trình học tập với AI Study Hub</p>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <AuthInput label="Tên đăng nhập" name="username" value={form.username} placeholder="Nhập tên đăng nhập" onChange={handleInput} />
          <AuthInput label="Họ và tên" name="fullName" value={form.fullName} placeholder="Nhập họ và tên" onChange={handleInput} />

          <div>
            <label className="text-[12px] font-bold block mb-1.5 text-ink">Ngày sinh</label>
            <div className="grid grid-cols-3 gap-2">
              <AuthSelect name="birthDay" value={form.birthDay} placeholder="Ngày" onChange={handleInput} options={Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: String(i + 1) }))} />
              <AuthSelect name="birthMonth" value={form.birthMonth} placeholder="Tháng" onChange={handleInput} options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `Tháng ${i + 1}` }))} />
              <AuthSelect name="birthYear" value={form.birthYear} placeholder="Năm" onChange={handleInput} options={Array.from({ length: 60 }, (_, i) => ({ value: 2026 - i, label: String(2026 - i) }))} />
            </div>
          </div>

          <AuthSelect label="Giới tính" name="gender" value={form.gender} placeholder="Chọn giới tính" onChange={handleInput} options={[{ value: 'male', label: 'Nam' }, { value: 'female', label: 'Nữ' }]} />
          <AuthInput label="Số điện thoại" name="phone" value={form.phone} placeholder="Số điện thoại" onChange={handleInput} />
          <AuthInput label="Email" name="email" type="email" value={form.email} placeholder="your@example.com" onChange={handleInput} />
          <AuthInput label="Mật khẩu" name="password" type="password" value={form.password} placeholder="Mật khẩu" onChange={handleInput} />
          <AuthInput label="Xác nhận mật khẩu" name="confirmPassword" type="password" value={form.confirmPassword} placeholder="Nhập lại mật khẩu" onChange={handleInput} />

          <button
            type="submit"
            className="w-full h-[44px] bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-bold rounded-xl text-[14.5px] mt-3 shadow-brand-glow transition-snappy cursor-pointer"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;