import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';

interface TeamProfileProps {
  name: string;
  email: string;
  image: string;
}

export const TeamProfile = ({ name, email, image }: TeamProfileProps) => (
  <div className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/40 hover:shadow-sm hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300">
    <div className="relative w-16 h-16 flex-shrink-0">
      <Image
        src={image}
        alt={name}
        fill
        className="rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-sm group-hover:scale-105 transition-transform duration-300"
        unoptimized={image.includes('googleusercontent')}
      />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{name}</span>
      <a 
        href={`mailto:${email}`} 
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-1"
      >
        <Mail size={12} />
        {email}
      </a>
    </div>
  </div>
);

export const TeamGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
    {children}
  </div>
);