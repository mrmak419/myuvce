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
    <div className="border-b border-zinc-200 dark:border-zinc-700/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full py-4 flex justify-between items-center text-left transition-colors active:scale-[0.99] touch-manipulation"
      >
        <span className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-400 transition-colors" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
};

export const AccordionGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 border-t border-zinc-200 dark:border-zinc-700/50">{children}</div>
);