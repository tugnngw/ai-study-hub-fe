import React from 'react';

interface AdminHeaderProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ placeholder = "Tìm kiếm...", value, onChange }) => {
  return (
    <div className="w-full h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="w-full max-w-[620px] h-[40px] border border-gray-200 rounded-[8px] flex items-center px-3 bg-white focus-within:border-[#5B5BF5] transition-colors">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 mr-2" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4-4" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-[14px]"
        />
      </div>
      <div className="flex items-center gap-2 shrink-0 pl-4">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#5B5BF5]" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
        </svg>
        <span className="text-[15px] font-bold text-gray-800 tracking-tight">AI STUDY HUB</span>
      </div>
    </div>
  );
};

export default AdminHeader;
