"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName?: keyof typeof LucideIcons;
  badge?: string;
  link?: string;
  linkText?: string;
}

export const FeatureCard = ({ title, description, iconName, badge, link, linkText }: FeatureCardProps) => {
  const Icon = iconName ? LucideIcons[iconName] as React.ElementType : null;

  return (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all relative overflow-hidden group cursor-pointer active:scale-[0.98]">
      {badge && (
        <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30 rounded-full">
          {badge}
        </span>
      )}
      
      {Icon && (
        <div className="w-10 h-10 mb-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
          <Icon size={20} strokeWidth={2} />
        </div>
      )}
      
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-grow">
        {description}
      </p>
      
      {link && (
        <Link 
          href={link} 
          target={link.startsWith('http') ? "_blank" : "_self"}
          className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          {linkText || "Learn more"}
          <LucideIcons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export const FeatureGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
    {children}
  </div>
);