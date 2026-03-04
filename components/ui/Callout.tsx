"use client";

import React from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'tip';
  title?: string;
  children: React.ReactNode;
}

export const Callout = ({ type, title, children }: CalloutProps) => {
  const themes = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-600" />,
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    },
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    },
    tip: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
    },
  };

  const theme = themes[type];

  return (
    <div className={`p-4 my-6 rounded-lg border-l-4 ${theme.bg} ${theme.border}`}>
      <div className="flex items-center gap-3 mb-2">
        {theme.icon}
        {title && <span className={`font-bold uppercase tracking-wide text-sm ${theme.text}`}>{title}</span>}
      </div>
      <div className={`text-sm leading-relaxed ${theme.text}`}>
        {children}
      </div>
    </div>
  );
};