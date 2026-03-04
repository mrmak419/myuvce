"use client";

import React, { useState } from 'react';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

export const Tabs = ({ children }: { children: React.ReactElement<TabProps>[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-8 border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="flex border-b border-slate-200 bg-slate-50">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 text-sm font-semibold transition-colors ${
              activeTab === index 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="p-6 text-sm text-slate-700 leading-relaxed">
        {children[activeTab]}
      </div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => <div>{children}</div>;