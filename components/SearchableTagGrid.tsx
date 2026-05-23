'use client';

import { useState } from "react";
import Link from "next/link";
import { Search, Tag, ArrowRight } from "lucide-react";

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
    <div>
      {/* Search Input Container */}
      <div className="relative max-w-md mx-auto mb-10">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-5 h-5 text-zinc-400 dark:text-zinc-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tags (e.g., placements, academics, ieee)..."
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

      {/* Grid of tags */}
      {filteredTags.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredTags.map((tag) => {
            // Display name with first letter capitalized for standard presentation
            const displayTag = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
            
            return (
              <Link
                key={tag.name}
                href={`/blog/tags/${encodeURIComponent(tag.name)}`}
                className="group p-5 bg-white dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 dark:hover:bg-zinc-800/80 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2 bg-indigo-50 dark:bg-zinc-800/60 rounded-xl w-fit mb-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                    <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 tracking-tight text-base sm:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {displayTag}
                  </h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {tag.count} {tag.count === 1 ? "article" : "articles"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">
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
