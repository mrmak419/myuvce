"use client";

import React from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'tip' | 'error';
  title?: string;
  children: React.ReactNode;
}

export const Callout = ({ type = 'info', title, children }: CalloutProps) => {
  const themes = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      border: 'border-blue-200 dark:border-blue-500/30',
      text: 'text-blue-800 dark:text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      border: 'border-amber-200 dark:border-amber-500/30',
      text: 'text-amber-800 dark:text-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      text: 'text-emerald-800 dark:text-emerald-300',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
    tip: {
      bg: 'bg-purple-50 dark:bg-purple-500/10',
      border: 'border-purple-200 dark:border-purple-500/30',
      text: 'text-purple-800 dark:text-purple-300',
      icon: <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      border: 'border-rose-200 dark:border-rose-500/30',
      text: 'text-rose-800 dark:text-rose-300',
      icon: <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    },
  };

  const theme = themes[type as keyof typeof themes] || themes['info'];

  return (
    <div className={`p-4 my-6 rounded-2xl border ${theme.bg} ${theme.border} shadow-sm`}>
      <div className="flex items-center gap-3 mb-2">
        {theme.icon}
        {title && <span className={`font-bold uppercase tracking-wider text-xs ${theme.text}`}>{title}</span>}
      </div>
      <div className={`text-sm leading-relaxed ${theme.text}`}>
        {children}
      </div>
    </div>
  );
};