"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName?: keyof typeof LucideIcons;
  badge?: string;
  link?: string; // Legacy support for older MDX files
  href?: string; // Added to support standard web nomenclature used in the new MDX
  linkText?: string;
}

export const FeatureCard = ({ title, description, iconName, badge, link, href, linkText }: FeatureCardProps) => {
  const Icon = iconName ? LucideIcons[iconName] as React.ElementType : null;
  
  // Resolve the destination regardless of which prop was used
  const destination = href || link;

  // Extract the inner UI so we don't duplicate code
  const CardInner = (
    <>
      {badge && (
        <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30 rounded-full z-10">
          {badge}
        </span>
      )}
      
      {Icon && (
        <div className="w-10 h-10 mb-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
          <Icon size={20} strokeWidth={2} />
        </div>
      )}
      
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-grow">
        {description}
      </p>
      
      {destination && (
        // Changed from <Link> to <span> to prevent invalid <a> inside <a> HTML nesting
        <span className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
          {linkText || "Open link"}
          <LucideIcons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </span>
      )}
    </>
  );

  const cardClasses = "flex flex-col h-full p-6 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all relative overflow-hidden group cursor-pointer active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";

  // If a destination is provided, wrap the whole card in a Next.js Link
  if (destination) {
    const isExternal = destination.startsWith('http');
    return (
      <Link 
        href={destination}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`block ${cardClasses}`}
      >
        {CardInner}
      </Link>
    );
  }

  // Otherwise, return a normal div for non-interactive cards
  return (
    <div className={cardClasses}>
      {CardInner}
    </div>
  );
};

export const FeatureGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
    {children}
  </div>
);