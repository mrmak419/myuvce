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
    <div className="flex flex-col h-full p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      {badge && (
        <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/30 rounded-full">
          {badge}
        </span>
      )}
      
      {Icon && (
        <div className="w-10 h-10 mb-4 rounded-lg bg-orange-50 dark:bg-neutral-800 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
          <Icon size={20} strokeWidth={2.5} />
        </div>
      )}
      
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
        {description}
      </p>
      
      {link && (
        <Link 
          href={link} 
          target={link.startsWith('http') ? "_blank" : "_self"}
          className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
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