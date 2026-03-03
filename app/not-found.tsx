"use client";

import Link from 'next/link';
import { Home, BookOpen, Map, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-gray-900 px-4 transition-colors duration-200">
      <div className="text-center space-y-6 max-w-lg w-full relative z-10">
        
        {/* Massive Background 404 */}
        <h1 className="text-[12rem] font-black leading-none tracking-tighter text-gray-200 dark:text-gray-800 select-none">
          404
        </h1>

        {/* Messaging */}
        <div className="space-y-3 -mt-16 relative z-20 bg-[#FAFAFA] dark:bg-gray-900 py-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Looks like you bunked the wrong class.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            The page you are looking for has been moved, deleted, or is hiding somewhere in the KR Circle campus.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all w-full sm:w-auto justify-center shadow-sm"
          >
            <ArrowLeft size={18} /> Go Back
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95 transition-all w-full sm:w-auto justify-center shadow-sm shadow-blue-500/20"
          >
            <Home size={18} /> MyUVCE Home
          </Link>
        </div>

        {/* Quick Links Recovery */}
        <div className="pt-10 mt-10 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-bold uppercase tracking-widest">
           <Link href="/uvce-notes" className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors group">
              <BookOpen size={16} className="group-hover:scale-110 transition-transform" /> Notes & PYQs
           </Link>
           <Link href="/map" className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors group">
              <Map size={16} className="group-hover:scale-110 transition-transform" /> Campus Map
           </Link>
        </div>
        
      </div>
    </div>
  );
}