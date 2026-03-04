// components/ui/Accordion.tsx
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
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
      >
        <span className="font-semibold text-neutral-800 dark:text-neutral-100">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
};

export const AccordionGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 border-t border-neutral-200 dark:border-neutral-800">{children}</div>
);