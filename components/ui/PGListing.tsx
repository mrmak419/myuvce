"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Navigation, IndianRupee, Utensils, Train, Star } from 'lucide-react';

export interface PGListingProps {
  name: string;
  distance: string;
  area: string;
  rating: string;
  rent: string;
  deposit: string;
  amenities: string;
  metro: string;
  directionsUrl: string;
  mapUrl: string;
}

export const PGListing = ({
  name,
  distance,
  area,
  rating,
  rent,
  deposit,
  amenities,
  metro,
  directionsUrl,
  mapUrl
}: PGListingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Clean rating (remove "Stars" text if present)
  const cleanRating = rating.replace('Stars', '').trim();

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-700/50 my-2 bg-white dark:bg-zinc-900 rounded-lg shadow-sm overflow-hidden border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-left transition-colors active:scale-[0.99] touch-manipulation gap-2 sm:gap-0 bg-zinc-50/50 hover:bg-zinc-50 dark:bg-zinc-800/20 dark:hover:bg-zinc-800/40"
      >
        <div className="flex flex-col">
          <span className="font-bold text-base text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {name.replace(' *', '')}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" /> {distance} • {area}
          </span>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-500 flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
            <Star className="w-3.5 h-3.5 fill-current" /> {cleanRating}
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-400 transition-colors" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-1 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                <IndianRupee className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Rent & Sharing</span>
                  <span className="whitespace-pre-line font-medium text-zinc-800 dark:text-zinc-200">{rent.replace(/\|/g, '\n')}</span>
                </div>
             </div>
             
             <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                <IndianRupee className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Deposit</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{deposit}</span>
                </div>
             </div>
             
             <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                <Utensils className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Food & Amenities</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{amenities}</span>
                </div>
             </div>
             
             <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                <Train className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Nearest Metro</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{metro}</span>
                </div>
             </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
             <a 
               href={directionsUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
             >
                <Navigation className="w-4 h-4" /> Transit Directions
             </a>
             <a 
               href={mapUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-600 rounded-lg text-sm font-semibold transition-colors shadow-sm"
             >
                <MapPin className="w-4 h-4" /> View on Map
             </a>
          </div>
          
        </div>
      )}
    </div>
  );
};

export const PGListingGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 flex flex-col space-y-1">{children}</div>
);
