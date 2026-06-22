import React from 'react';

interface TabItem { id: string; label: string; }
interface SubTabFilterProps { tabs: TabItem[]; activeTab: string; onChange: (tabId: any) => void; }

const SubTabFilter: React.FC<SubTabFilterProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`h-[32px] px-4 font-semibold text-[13px] rounded-[8px] transition-all cursor-pointer ${
              isActive ? 'bg-[#7C5CFC] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
