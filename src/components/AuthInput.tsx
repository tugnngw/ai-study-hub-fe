import React from 'react';

interface AuthInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label, name, type = 'text', value, placeholder, onChange, required = true
}) => {
  return (
    <div>
      <label className="text-[12px] font-bold block mb-1.5 text-ink">{label}</label>
      <div className="w-full h-[42px] border border-line rounded-xl flex items-center px-3.5 bg-card focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-snappy">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none text-[13.5px] text-ink placeholder-ink-faint"
          required={required}
        />
      </div>
    </div>
  );
};

export default AuthInput;