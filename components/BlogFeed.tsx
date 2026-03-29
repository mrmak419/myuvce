"use client";

import { useState, useDeferredValue } from "react";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { Search, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export interface PostMeta {
  slug: string;
  title: string;
  published: string;
  labels: string[];
}

interface BlogFeedProps {
  initialPosts: PostMeta[];
  currentPage: number;
  totalPages: number;
}

export default function BlogFeed({
  initialPosts,
  currentPage,
  totalPages,
}: BlogFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<PostMeta[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const deferredQuery = useDeferredValue(searchQuery);
  const isSearching = deferredQuery.trim().length > 0;

  const loadSearchIndex = async () => {
    if (searchIndex || isFetching) return;
    
    setIsFetching(true);
    try {
      const res = await fetch("/api/search");
      if (!res.ok) throw new Error("Failed to fetch search index");
      const data = await res.json();
      setSearchIndex(data);
    } catch (error) {
      console.error("Search index failed to load:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const displayPosts = isSearching && searchIndex
    ? searchIndex.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(deferredQuery.toLowerCase());
        const labelMatch = post.labels?.some((label) =>
          label.toLowerCase().includes(deferredQuery.toLowerCase())
        );
        return titleMatch || labelMatch;
      })
    : initialPosts;

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isFetching ? (
            <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-zinc-400" />
          )}
        </div>
        <input
          type="text"
          /* Elevated translucent background with Indigo focus rings */
          className="block w-full pl-11 pr-4 py-3 sm:py-3.5 text-sm sm:text-base bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all shadow-sm"
          placeholder="Search updates, notes, PYQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={loadSearchIndex}
          onMouseEnter={loadSearchIndex}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <div className="col-span-full py-16 text-center border border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              No results found for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {(!isSearching && totalPages > 1) ? (
        <div className="mt-12 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 w-full max-w-md mx-auto px-2">
          
          {currentPage > 1 ? (
            <Link
              href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
              className="flex flex-1 sm:flex-none justify-center items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Link>
          ) : (
            <div className="flex-1 sm:hidden"></div>
          )}

          <div className="flex flex-shrink-0 items-center px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              className="flex flex-1 sm:flex-none justify-center items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          ) : (
            <div className="flex-1 sm:hidden"></div>
          )}
          
        </div>
      ) : null}
    </div>
  );
}