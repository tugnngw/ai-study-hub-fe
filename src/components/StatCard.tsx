import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  accent: 'brand' | 'success' | 'warning';
}

const accentStyles = {
  brand: 'bg-brand-50 text-brand-500',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
};

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, accent }) => {
  const isUp = (trend ?? 0) >= 0;
  return (
    <div className="bg-card p-6 rounded-2xl border border-line shadow-[0_1px_2px_rgba(20,15,40,0.04)] hover:shadow-[0_4px_16px_rgba(20,15,40,0.06)] transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accentStyles[accent]}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`inline-flex items-center gap-0.5 text-[13px] font-bold px-2 py-1 rounded-full ${isUp ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
            {isUp ? <ArrowUpRight size={14} strokeWidth={2.5} /> : <ArrowDownRight size={14} strokeWidth={2.5} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-ink-soft font-semibold text-[14px] mt-4">{label}</p>
      <h3 className="text-[30px] font-extrabold mt-1 tracking-tight text-ink">{value}</h3>
    </div>
  );
};

export default StatCard;
