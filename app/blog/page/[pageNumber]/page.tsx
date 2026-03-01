export const revalidate = 3600;

import { getPosts } from "@/lib/blogger";
import BlogFeed from "@/components/BlogFeed";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 9;

type Params = Promise<{ pageNumber: string }>;

export async function generateStaticParams() {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paths = [];
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ pageNumber: i.toString() });
  }
  return paths;
}

export default async function PaginatedBlogPage({ params }: { params: Params }) {
  const { pageNumber } = await params;
  const currentPage = parseInt(pageNumber);
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (isNaN(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound();
  }

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const initialPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  
  // Strip heavy HTML content again for this page's payload
  const allPostsIndex = posts.map(({ content, ...rest }) => rest);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Campus Updates <span className="text-neutral-400 text-2xl">/ Page {currentPage}</span>
        </h1>
      </div>

      <BlogFeed 
        initialPosts={initialPosts} 
        allPostsIndex={allPostsIndex} 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
    </div>
  );
}