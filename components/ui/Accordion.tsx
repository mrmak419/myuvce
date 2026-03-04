"use client";

import React, { useState } from 'react';


import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-blue-600 transition-colors"
      >
        <span className="font-semibold text-slate-800">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
};

export const AccordionGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 border-t border-slate-200">{children}</div>
);