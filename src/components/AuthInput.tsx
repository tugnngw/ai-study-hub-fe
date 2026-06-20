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
      <label className="text-[11px] font-bold block mb-1 text-gray-700">{label}</label>
      <div className="w-full h-[40px] border border-gray-300 rounded-[10px] flex items-center px-3 bg-white focus-within:border-indigo-500 transition-colors">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none text-xs text-black placeholder-gray-400"
          required={required}
        />
      </div>
    </div>
  );
};

export default AuthInput;