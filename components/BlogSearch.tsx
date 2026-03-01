"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import { Search } from "lucide-react";

// Assuming your Post type has at least title, labels, and id.
// You might need to adjust the any type to your actual Post interface.
export default function BlogSearch({ initialPosts }: { initialPosts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter((post) => {
    const matchesTitle = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLabels = post.labels?.some((label: string) => 
      label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return matchesTitle || matchesLabels;
  });

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-12 max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
          placeholder="Search for placement news, campus updates, or resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
              No updates found for "{searchQuery}"
            </p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-orange-600 dark:text-orange-400 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}