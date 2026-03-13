"use client";

import React from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb, XCircle } from 'lucide-react';

interface CalloutProps {
  // Made type optional and added 'error'
  type?: 'info' | 'warning' | 'success' | 'tip' | 'error';
  title?: string;
  children: React.ReactNode;
}

export const Callout = ({ type = 'info', title, children }: CalloutProps) => {
  const themes = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800/50',
      text: 'text-blue-800 dark:text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800/50',
      text: 'text-amber-800 dark:text-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-200 dark:border-emerald-800/50',
      text: 'text-emerald-800 dark:text-emerald-300',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
    tip: {
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      border: 'border-purple-200 dark:border-purple-800/50',
      text: 'text-purple-800 dark:text-purple-300',
      icon: <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-200 dark:border-red-800/50',
      text: 'text-red-800 dark:text-red-300',
      icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    },
  };

  // Safe fallback: if an invalid type is passed, it defaults to 'info' without crashing
  const theme = themes[type as keyof typeof themes] || themes['info'];

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