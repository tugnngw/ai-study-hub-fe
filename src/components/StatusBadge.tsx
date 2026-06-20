import React from 'react';

type Tone = 'success' | 'danger' | 'warning' | 'neutral';

interface StatusBadgeProps {
  label: string;
  tone: Tone;
  dot?: boolean;
}

const toneStyles: Record<Tone, string> = {
  success: 'bg-success-bg text-success border-success-line',
  danger: 'bg-danger-bg text-danger border-danger-line',
  warning: 'bg-warning-bg text-warning border-warning-line',
  neutral: 'bg-surface-alt text-ink-soft border-line',
};

const dotStyles: Record<Tone, string> = {
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  neutral: 'bg-ink-faint',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, tone, dot = true }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[13px] font-semibold whitespace-nowrap ${toneStyles[tone]}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[tone]}`} />}
      {label}
    </span>
  );
};

export default StatusBadge;
