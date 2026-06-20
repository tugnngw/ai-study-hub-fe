import React from 'react';
import { Search, Bell } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, placeholder = 'Tìm kiếm...', value, onChange }) => {
  return (
    <div className="w-full h-[78px] bg-card/90 backdrop-blur border-b border-line flex items-center justify-between gap-6 px-8 shrink-0 sticky top-0 z-30">
      {title ? (
        <h1 className="text-[20px] font-extrabold tracking-tight shrink-0">{title}</h1>
      ) : (
        <div className="hidden md:block" />
      )}

      <div className="w-full max-w-[460px] h-[42px] border border-line rounded-xl flex items-center px-3.5 bg-surface focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
        <Search size={17} strokeWidth={2.25} className="text-ink-faint mr-2.5 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none font-medium text-ink placeholder-ink-faint text-[14.5px]"
        />
      </div>

      <button
        type="button"
        className="relative w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center text-ink-soft hover:text-brand-500 hover:border-brand-200 transition-colors shrink-0"
        aria-label="Thông báo"
      >
        <Bell size={18} strokeWidth={2} />
        <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-danger" />
      </button>
    </div>
  );
};

export default AdminHeader;
