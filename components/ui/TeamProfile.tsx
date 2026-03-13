import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';

interface TeamProfileProps {
  name: string;
  email: string;
  image: string;
}

export const TeamProfile = ({ name, email, image }: TeamProfileProps) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
    <div className="relative w-16 h-16 flex-shrink-0">
      <Image
        src={image}
        alt={name}
        fill
        className="rounded-full object-cover border-2 border-white dark:border-neutral-800"
        unoptimized={image.includes('googleusercontent')}
      />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-neutral-900 dark:text-white">{name}</span>
      <a 
        href={`mailto:${email}`} 
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors mt-1"
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