import React, { useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import AdminHeader from '../components/AdminHeader';
import { CURRENT_USER } from '../api/workspaceApi';
import { NavigateFn } from '../App';

const UserProfile: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [form, setForm] = useState({
    fullName: CURRENT_USER.fullName,
    email: CURRENT_USER.email,
    phone: '',
    dob: '',
    address: '',
    bio: '',
    occupation: '',
    company: '',
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
      <UserSidebar onNavigate={onNavigate} activeTab="userProfile" userName={CURRENT_USER.fullName} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Hồ sơ" />
        <main className="flex-1 animate-fade-in-up p-8 max-w-3xl">
          <form onSubmit={submit} className="space-y-6">
            <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
              <div className="h-[64px] border-b border-line flex items-center px-6">
                <h2 className="font-display text-[17px] font-bold">Thông tin cơ bản</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4 pb-5 border-b border-line">
                  <div className="h-16 w-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xl font-extrabold">
                    {form.fullName?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <button type="button" className="h-[36px] px-4 border border-line rounded-xl font-bold text-[13.5px] text-ink-soft hover:bg-surface-alt transition-colors cursor-pointer">
                    Đổi ảnh đại diện
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Họ và tên" value={form.fullName} onChange={(v) => update('fullName', v)} />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} />
                  <Field label="Số điện thoại" value={form.phone} onChange={(v) => update('phone', v)} placeholder="0xxx xxx xxx" />
                  <Field label="Ngày sinh" type="date" value={form.dob} onChange={(v) => update('dob', v)} />
                </div>
                <Field label="Địa chỉ" value={form.address} onChange={(v) => update('address', v)} />
              </div>
            </div>

            <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
              <div className="h-[64px] border-b border-line flex items-center px-6">
                <h2 className="font-display text-[17px] font-bold">Thông tin nghề nghiệp</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nghề nghiệp" value={form.occupation} onChange={(v) => update('occupation', v)} placeholder="VD: Software Engineer" />
                  <Field label="Công ty / Trường học" value={form.company} onChange={(v) => update('company', v)} />
                </div>
                <div>
                  <label className="text-[13px] font-bold block mb-1.5">Giới thiệu</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => update('bio', e.target.value)}
                    rows={4}
                    placeholder="Vài dòng giới thiệu về bản thân…"
                    className="w-full border border-line rounded-xl p-3.5 text-[14px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              {saved && <span className="text-success text-[13.5px] font-bold mr-2">Đã lưu thay đổi</span>}
              <button type="button" className="h-[42px] px-5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt transition-colors cursor-pointer">
                Hủy
              </button>
              <button type="submit" className="h-[42px] px-5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-[14px] transition-colors cursor-pointer shadow-sm">
                Lưu thay đổi
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}> = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label className="text-[13px] font-bold block mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
    />
  </div>
);

export default UserProfile;
