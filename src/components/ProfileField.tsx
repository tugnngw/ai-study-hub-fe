import React from 'react';

interface ProfileFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

// Ô nhập liệu dùng chung cho các trang Hồ sơ (Admin & User) — trước đây
// bị định nghĩa trùng lặp ở cả UserProfile.tsx lẫn AdminProfile.tsx.
const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, onChange, type = 'text', placeholder, disabled }) => (
  <div>
    <label className="text-[13px] font-bold block mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy disabled:bg-surface-alt disabled:text-ink-faint disabled:cursor-not-allowed"
    />
  </div>
);

export default ProfileField;
