import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-14 h-14 rounded-2xl bg-surface-alt flex items-center justify-center text-brand-400 mb-4">
        {icon ?? <Inbox size={24} strokeWidth={1.75} />}
      </div>
      <p className="font-bold text-ink">{title}</p>
      {description && <p className="text-ink-soft text-sm mt-1 max-w-[320px]">{description}</p>}
    </div>
  );
};

export default EmptyState;
