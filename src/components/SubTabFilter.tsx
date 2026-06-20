import React from 'react';

interface TabItem { id: string; label: string; }
interface SubTabFilterProps { tabs: TabItem[]; activeTab: string; onChange: (tabId: any) => void; }

const SubTabFilter: React.FC<SubTabFilterProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex items-center gap-1 bg-surface-alt p-1 rounded-xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`h-[34px] px-4 font-bold text-[13.5px] rounded-lg transition-snappy cursor-pointer ${
              isActive ? 'bg-brand-500 text-white shadow-brand-glow' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default SubTabFilter;
