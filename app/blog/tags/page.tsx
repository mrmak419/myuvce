import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SearchableTagGrid from "@/components/SearchableTagGrid";

export const metadata = {
  title: "Explore by Category - MyUVCE Blog",
  description: "Browse articles, technical roadmaps, student guidebooks, and campus updates categorized by specific topics and tags.",
  alternates: {
    canonical: "/blog/tags",
  },
};

export default function BlogTagsPage() {
  const posts = getAllPosts();
  
  // Calculate unique tags and counts
  const tagCounts: { [key: string]: number } = {};
  
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((t) => {
        if (t) {
          const normalized = t.trim().toLowerCase();
          tagCounts[normalized] = (tagCounts[normalized] || 0) + 1;
        }
      });
    }
  });

  const sortedTags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 animate-in fade-in duration-700">
      
      

     

      {/* Interactive Tag Search Grid */}
      <SearchableTagGrid tags={sortedTags} />

    </div>
  );
}
