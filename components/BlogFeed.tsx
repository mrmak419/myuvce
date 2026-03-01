"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";

export default function BlogFeed({
  initialPosts,
  allPostsIndex,
  currentPage,
  totalPages,
}: {
  initialPosts: any[];
  allPostsIndex: any[];
  currentPage: number;
  totalPages: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.trim().length > 0;

  // If searching, filter the ENTIRE database. If not, just show the current page's 9 posts.
  const displayPosts = isSearching
    ? allPostsIndex.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const labelMatch = post.labels?.some((label: string) =>
          label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return titleMatch || labelMatch;
      })
    : initialPosts;

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-12 max-w-2xl mx-auto lg:mx-0">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
          placeholder="Search all campus updates, placements, and resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
              No updates found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Pagination (Only visible when NOT searching) */}
      {!isSearching && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          {currentPage > 1 && (
            <Link
              href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl font-bold text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Link>
          )}

          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-bold border border-orange-100 dark:border-orange-900/50">
            Page {currentPage} of {totalPages}
          </div>

          {currentPage < totalPages && (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl font-bold text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm hover:shadow-md"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}