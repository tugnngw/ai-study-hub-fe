import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled, label }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-7 rounded-full shrink-0 transition-snappy cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
        checked ? 'bg-brand-500' : 'bg-line'
      }`}
    >
      <span
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-card transition-snappy ${
          checked ? 'left-[23px]' : 'left-[3px]'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
