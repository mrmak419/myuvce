"use client";

import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend?: string;
}

export const MetricCard = ({ title, value, description, trend }: MetricCardProps) => (
  <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">{title}</h4>
      <BarChart3 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
    </div>
    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">{value}</div>
    {trend && (
      <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
        <TrendingUp className="w-3 h-3" />
        {trend}
      </div>
    )}
    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-snug">{description}</p>
  </div>
);

export const MetricCardGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
    {children}
  </div>
);