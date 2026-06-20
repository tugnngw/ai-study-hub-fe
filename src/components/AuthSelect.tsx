import React from 'react';

interface AuthSelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  placeholder: string;
  required?: boolean;
}

const AuthSelect: React.FC<AuthSelectProps> = ({
  label, name, value, onChange, options, placeholder, required = true
}) => {
  return (
    <div className="w-full">
      {label && <label className="text-[12px] font-bold text-black block mb-1">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-[40px] border border-gray-300 rounded-[10px] px-3 bg-white text-sm outline-none cursor-pointer text-gray-500 focus:border-indigo-500"
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default AuthSelect;