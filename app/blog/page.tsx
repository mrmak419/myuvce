import { getAllPosts } from "@/lib/mdx";
import BlogFeed from "@/components/BlogFeed";
import { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";

const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest updates and articles from MyUVCE.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  
  // Map MDX metadata keys to match what <BlogFeed> currently expects
  const formattedPosts = posts.map(meta => ({
    slug: meta.slug,
    title: meta.title,
    published: meta.date,
    labels: meta.tags,
  }));

  const initialPosts = formattedPosts.slice(0, POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Updated typography to match the premium Zinc aesthetic */}
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Campus Updates
        </h1>
        <Link
          href="/blog/tags"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 dark:bg-zinc-800 text-indigo-700 dark:text-indigo-400 text-sm font-semibold rounded-xl hover:bg-indigo-100 dark:hover:bg-zinc-700/50 transition-colors border border-indigo-100/50 dark:border-zinc-700/30 w-fit shadow-sm"
        >
          <Tag className="w-4 h-4" />
          Explore by Tag
        </Link>
      </div>

      <BlogFeed 
        initialPosts={initialPosts} 
        currentPage={1} 
        totalPages={totalPages} 
      />
    </div>
  );
}