import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import ProfileField from '../components/ProfileField';
import { CURRENT_ADMIN } from '../api/adminApi';
import { AllPages } from '../App';
import { CalendarDays, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';

const AdminProfile: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [form, setForm] = useState({
    fullName: CURRENT_ADMIN.fullName,
    email: CURRENT_ADMIN.email,
    phone: CURRENT_ADMIN.phone,
    role: CURRENT_ADMIN.role,
  });
  const [saved, setSaved] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <AdminSidebar onNavigate={onNavigate} activeTab="adminProfile" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader role="admin" title="Hồ sơ quản trị" />
        <main className="flex-1 animate-fade-in-up p-7">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,720px)_300px] gap-5 items-start max-w-[1040px] mx-auto">
            {/* Main form column */}
            <form onSubmit={submit} className="space-y-5 min-w-0">
              <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
                <div className="h-[54px] border-b border-line flex items-center px-5">
                  <h2 className="font-display text-[15.5px] font-bold">Thông tin cơ bản</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-line">
                    <div className="h-14 w-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-lg font-bold shrink-0">
                      {form.fullName?.[0]?.toUpperCase() ?? 'A'}
                    </div>
                    <button type="button" className="h-[34px] px-4 border border-line rounded-xl font-bold text-[13px] text-ink-soft hover:bg-surface-alt transition-snappy cursor-pointer">
                      Đổi ảnh đại diện
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <ProfileField label="Họ và tên" value={form.fullName} onChange={(v) => update('fullName', v)} />
                    <ProfileField label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} />
                    <ProfileField label="Số điện thoại" value={form.phone} onChange={(v) => update('phone', v)} placeholder="0xxx xxx xxx" />
                    <ProfileField label="Vai trò" value={form.role} onChange={(v) => update('role', v)} disabled />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                {saved && <span className="text-success text-[13.5px] font-bold mr-2">Đã lưu thay đổi</span>}
                <button type="button" className="h-[40px] px-5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt transition-snappy cursor-pointer">
                  Hủy
                </button>
                <button type="submit" className="h-[40px] px-5 bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white rounded-xl font-bold text-[14px] transition-snappy cursor-pointer shadow-brand-glow">
                  Lưu thay đổi
                </button>
              </div>
            </form>

            {/* Side summary column — sticky so it never trails empty space */}
            <div className="space-y-4 lg:sticky lg:top-[94px]">
              <div className="bg-card border border-line rounded-2xl shadow-card p-5 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white flex items-center justify-center text-xl font-bold mx-auto shadow-brand-glow">
                  {form.fullName?.[0]?.toUpperCase() ?? 'A'}
                </div>
                <h3 className="font-display text-[15px] font-bold mt-2.5">{form.fullName || 'Quản trị viên'}</h3>
                <p className="text-ink-soft text-[12.5px] mt-0.5 flex items-center justify-center gap-1.5">
                  <Mail size={13} strokeWidth={2.25} />
                  {form.email}
                </p>
                <p className="text-ink-faint text-[12px] mt-1.5 inline-flex items-center gap-1.5">
                  <Sparkles size={12} strokeWidth={2.5} className="text-brand-500" />
                  {form.role}
                </p>
              </div>

              <div className="bg-card border border-line rounded-2xl shadow-card p-4">
                <h3 className="font-display text-[13.5px] font-bold mb-2.5 flex items-center gap-2">
                  <ShieldCheck size={15} strokeWidth={2.25} className="text-success" />
                  Bảo mật tài khoản
                </h3>
                <ul className="space-y-2 text-[12.5px] text-ink-soft">
                  <li className="flex items-center gap-2">
                    <Lock size={13} strokeWidth={2.25} className="text-ink-faint shrink-0" />
                    Đổi mật khẩu định kỳ để bảo vệ tài khoản
                  </li>
                  <li className="flex items-center gap-2">
                    <CalendarDays size={13} strokeWidth={2.25} className="text-ink-faint shrink-0" />
                    Tham gia từ {CURRENT_ADMIN.joinedLabel}
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => onNavigate('adminSettings')}
                  className="w-full h-[34px] mt-3.5 border border-line rounded-lg font-bold text-[12px] text-ink-soft hover:bg-surface-alt transition-snappy cursor-pointer"
                >
                  Đi đến Cài đặt
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfile;
