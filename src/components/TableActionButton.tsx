import React from 'react';

interface TableActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger' | 'success' | 'brand';
}

const variants = {
  default: 'border-line bg-card text-ink-soft hover:bg-surface-alt hover:text-ink',
  danger: 'border-danger-line bg-danger-bg text-danger hover:bg-danger/10',
  success: 'border-success-line bg-success-bg text-success hover:bg-success/10',
  brand: 'border-brand-200 bg-brand-50 text-brand-600 hover:bg-brand-100',
};

const TableActionButton: React.FC<TableActionButtonProps> = ({ onClick, label, icon, variant = 'default' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-[7px] border rounded-lg font-bold text-[13px] transition-colors cursor-pointer select-none whitespace-nowrap ${variants[variant]}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default TableActionButton;
