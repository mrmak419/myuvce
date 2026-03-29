"use client";

import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export const Testimonial = ({ quote, author, role }: TestimonialProps) => (
  <div className="my-10 relative p-8 md:p-10 rounded-3xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 overflow-hidden shadow-sm">
    {/* Large decorative quote icon in the background */}
    <Quote className="absolute -top-4 -left-4 w-32 h-32 text-indigo-100 dark:text-indigo-500/10 rotate-180 -z-10 transition-transform duration-700 hover:rotate-12 hover:scale-110" />
    
    <div className="relative z-10">
      <p className="text-lg md:text-xl font-medium text-zinc-800 dark:text-zinc-200 italic mb-6 leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-bold text-zinc-900 dark:text-zinc-50 tracking-wide">{author}</span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{role}</span>
        </div>
      </div>
    </div>
  </div>
);