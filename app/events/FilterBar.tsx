"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Filter, SortDesc } from "lucide-react";
import { useState, useEffect, useTransition } from "react";

interface FilterBarProps {
  clubs: { slug: string; name: string }[];
}

export default function FilterBar({ clubs }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for the search input to allow smooth typing before updating the URL
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Debounce the search input (waits 300ms after typing stops before updating URL)
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams("q", searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4 relative">
      
      {/* Loading Overlay when URL is updating */}
      {isPending && (
        <div className="absolute inset-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-[1px] z-10 rounded-2xl transition-all" />
      )}

      {/* Search Input */}
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex gap-4 md:w-auto w-full">
        {/* Club Filter */}
        <div className="relative flex-1 md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-zinc-400" />
          </div>
          <select
            value={searchParams.get("club") || "all"}
            onChange={(e) => updateParams("club", e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Clubs</option>
            {clubs.map((club) => (
              <option key={club.slug} value={club.slug}>{club.name}</option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="relative flex-1 md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SortDesc className="h-4 w-4 text-zinc-400" />
          </div>
          <select
            value={searchParams.get("sort") || "upcoming"}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none cursor-pointer"
          >
            <option value="upcoming">Upcoming First</option>
            <option value="deadline">Approaching Deadline</option>
            <option value="past">Past Events</option>
          </select>
        </div>
      </div>
    </div>
  );
}