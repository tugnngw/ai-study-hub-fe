import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-50 to-surface-alt ring-1 ring-line flex items-center justify-center text-brand-400 mb-4">
        {icon ?? <Inbox size={26} strokeWidth={1.75} />}
      </div>
      <p className="font-display font-bold text-ink text-[15px]">{title}</p>
      {description && <p className="text-ink-soft text-sm mt-1.5 max-w-[320px] leading-relaxed">{description}</p>}
    </div>
  );
};

export default EmptyState;
