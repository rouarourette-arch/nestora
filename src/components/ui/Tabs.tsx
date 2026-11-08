import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pill',
}) => {
  if (variant === 'underline') {
    return (
      <div className="border-b border-[#E3EAE4] dark:border-[#354A3D] flex space-x-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-[#234B3A] text-[#234B3A] dark:border-[#8FAF9A] dark:text-[#8FAF9A]'
                  : 'border-transparent text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0]'
              }`}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#E7EFE8] text-[#234B3A] dark:bg-[#354A3D] dark:text-[#F1F4F0]'
                      : 'bg-[#EAECE8] text-[#78847C] dark:bg-[#304338] dark:text-[#B1BDB4]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="inline-flex p-1 bg-[#EAECE8] dark:bg-[#1D2A23] rounded-xl overflow-x-auto no-scrollbar border border-[#E3EAE4]/60 dark:border-[#354A3D]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              isActive
                ? 'bg-white dark:bg-[#26372E] text-[#234B3A] dark:text-[#8FAF9A] shadow-sm'
                : 'text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0]'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-[#E7EFE8] text-[#234B3A] dark:bg-[#354A3D] dark:text-[#8FAF9A]'
                    : 'bg-black/5 dark:bg-white/5 text-[#78847C] dark:text-[#B1BDB4]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
