import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical } from 'lucide-react';

export interface ActionMenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface ActionMenuProps {
  items: ActionMenuItem[];
  align?: 'left' | 'right';
}

const ActionMenu: React.FC<ActionMenuProps> = ({ items, align = 'right' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 cursor-pointer transition-snappy ${
          open ? 'bg-surface-alt text-ink' : 'text-ink-faint hover:bg-surface-alt hover:text-ink'
        }`}
        aria-label="Hành động"
      >
        <MoreVertical size={17} strokeWidth={2.25} />
      </button>

      {open && (
        <div
          className={`absolute top-[calc(100%+6px)] w-44 bg-card border border-line rounded-xl shadow-popover py-1.5 z-30 animate-scale-in ${
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          }`}
        >
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onClick();
              }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] font-semibold transition-snappy cursor-pointer text-left ${
                item.variant === 'danger' ? 'text-danger hover:bg-danger-bg' : 'text-ink-soft hover:bg-surface-alt hover:text-ink'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
