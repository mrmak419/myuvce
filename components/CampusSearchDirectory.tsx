"use client";

import { useState, useMemo } from "react";
import { Search, Navigation } from "lucide-react";
import { Room } from "@/data/campus-map";

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Mech', label: 'Mech Block' },
  { id: 'Class', label: 'Classrooms' },
  { id: 'Lab', label: 'Labs' },
  { id: 'Cabin', label: 'Staff' },
  { id: 'Hall', label: 'Halls' },
  { id: 'Washroom', label: 'Restrooms' },
  { id: 'Ground', label: 'Ground Floor' },
  { id: 'First', label: '1st Floor' },
  { id: 'Second', label: '2nd Floor' },
  { id: '-1', label: 'Basement' },
];

export default function CampusSearchDirectory({ initialRooms }: { initialRooms: Room[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // useMemo ensures we only recalculate the list when search or filter changes
  const filteredRooms = useMemo(() => {
    return initialRooms.filter(room => {
      // 1. Category Filter Logic
      let categoryMatch = false;
      if (activeFilter === 'all') {
        categoryMatch = true;
      } else if (['Ground', 'First', 'Second', '-1'].includes(activeFilter)) {
        categoryMatch = room.floor === activeFilter;
      } else if (activeFilter === 'Mech') {
        categoryMatch = room.loc.includes('Mechanical Block');
      } else {
        categoryMatch = room.type.toLowerCase().includes(activeFilter.toLowerCase());
      }

      // 2. Text Search Logic
      const q = searchQuery.toLowerCase();
      const textMatch = 
        room.name.toLowerCase().includes(q) || 
        room.loc.toLowerCase().includes(q) || 
        room.type.toLowerCase().includes(q);

      return categoryMatch && textMatch;
    });
  }, [searchQuery, activeFilter, initialRooms]);

  // Helper for dynamic Tailwind badge colors
  const getBadgeStyles = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('class')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (t.includes('lab')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    if (t.includes('cabin')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    if (t.includes('hall')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    if (t.includes('tpo')) return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    if (t.includes('office')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
    if (t.includes('washroom')) return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400';
    if (t.includes('coe')) return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400';
    if (t.includes('sports')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700';
  };

  return (
    <div className="w-full">
      
      {/* Sticky Top Bar (Search + Filters) */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm mb-8">
        
        {/* Search Input */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 bg-neutral-100 dark:bg-neutral-900 border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-neutral-950 focus:ring-0 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-500 transition-all text-base"
            placeholder="Search 120+ rooms, labs, or staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Horizontal Scrolling Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2 mask-edges">
          {FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                activeFilter === filter.id 
                  ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-900 shadow-md' 
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Status */}
      <div className="flex justify-between items-center text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 px-2">
        <span>Directory Index</span>
        <span>Showing <strong className="text-neutral-900 dark:text-white">{filteredRooms.length}</strong> locations</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, idx) => (
            <div key={idx} className="flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${getBadgeStyles(room.type)}`}>
                    {room.type}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug mb-4">
                  {room.name}
                </h3>
                
                <div className="bg-neutral-50 dark:bg-neutral-950 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 mb-6">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 block mb-2">
                    📍 {room.loc}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-bold text-orange-700 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 rounded">
                    {room.floor} Floor
                  </span>
                </div>
              </div>

              <a 
                href={`https://maps.google.com/?q=${room.lat},${room.lng}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold rounded-xl transition-colors text-sm"
              >
                <Navigation className="w-4 h-4" />
                Navigate
              </a>
              
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
            <span className="text-4xl block mb-4 opacity-50">😕</span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">No locations found</h3>
            <p className="text-neutral-500">Try adjusting your search or clearing the filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-6 text-orange-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}