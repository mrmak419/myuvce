"use client";

import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export const Testimonial = ({ quote, author, role }: TestimonialProps) => (
  <div className="my-10 relative p-8 md:p-10 rounded-3xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 overflow-hidden">
    {/* Large decorative quote icon in the background */}
    <Quote className="absolute -top-4 -left-4 w-32 h-32 text-orange-100 dark:text-orange-900/30 rotate-180 -z-10" />
    
    <div className="relative z-10">
      <p className="text-lg md:text-xl font-medium text-neutral-800 dark:text-neutral-200 italic mb-6 leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-1 bg-orange-600 dark:bg-orange-500 rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-bold text-neutral-900 dark:text-white tracking-wide">{author}</span>
          <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{role}</span>
        </div>
      </div>
    </div>
  </div>
);