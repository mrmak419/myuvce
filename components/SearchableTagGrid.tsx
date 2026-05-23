'use client';

import { useState } from "react";
import Link from "next/link";

interface TagItem {
  name: string;
  count: number;
}

interface SearchableTagGridProps {
  tags: TagItem[];
}

export default function SearchableTagGrid({ tags }: SearchableTagGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Input Container */}
      <div className="relative max-w-md mx-auto mb-10">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          {/* Simple, lightweight inline SVG search icon (zero bundles) */}
          <svg className="h-5 w-5 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories (e.g. placements, guide)..."
          className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Wrapping Pill Tag Cloud */}
      {filteredTags.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3.5 animate-in fade-in duration-500">
          {filteredTags.map((tag) => {
            const displayTag = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
            
            return (
              <Link
                key={tag.name}
                href={`/blog/tags/${encodeURIComponent(tag.name)}`}
                className="group flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-zinc-800 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 active:scale-[0.98] transition-all duration-200 shadow-sm"
              >
                <span className="text-sm font-semibold tracking-tight">
                  {displayTag}
                </span>
                <span className="flex-shrink-0 inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-extrabold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 rounded-full transition-colors">
                  {tag.count}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            No tags found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  );
}
