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
      {label && <label className="text-[12px] font-bold text-ink block mb-1.5">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-[42px] border border-line rounded-xl px-3.5 bg-card text-[13.5px] outline-none cursor-pointer text-ink-soft focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
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