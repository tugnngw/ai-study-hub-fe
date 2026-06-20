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
    <div className="group bg-card p-6 rounded-2xl border border-line shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-snappy">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-snappy group-hover:scale-110 ${accentStyles[accent]}`}>
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
      <h3 className="font-display text-[30px] font-bold mt-1 tracking-tight text-ink">{value}</h3>
    </div>
  );
};

export default StatCard;
