"use client";

import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

export const Tabs = ({ children }: { children: React.ReactElement<TabProps>[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-8 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl overflow-hidden bg-white dark:bg-zinc-800/40 shadow-sm">
      <div className="flex border-b border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto hide-scrollbar">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`whitespace-nowrap px-6 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
              activeTab === index 
                ? 'bg-white dark:bg-zinc-800/80 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="p-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed animate-in fade-in slide-in-from-bottom-1">
        {children[activeTab]}
      </div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => <div>{children}</div>;