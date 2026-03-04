// components/ui/Tabs.tsx
"use client";

import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

export const Tabs = ({ children }: { children: React.ReactElement<TabProps>[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-8 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900">
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-x-auto hide-scrollbar">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`whitespace-nowrap px-6 py-3 text-sm font-semibold transition-colors ${
              activeTab === index 
                ? 'bg-white dark:bg-neutral-900 text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400' 
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="p-6 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {children[activeTab]}
      </div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => <div>{children}</div>;