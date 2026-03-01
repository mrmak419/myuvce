export const runtime = 'edge';
export const revalidate = 3600;

import { getPosts } from "@/lib/blogger";
import BlogFeed from "@/components/BlogFeed";

const POSTS_PER_PAGE = 9;

export const metadata = {
  title: "Campus Updates | MyUVCE",
};

export default async function BlogIndex() {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const initialPosts = posts.slice(0, POSTS_PER_PAGE);

  // CRITICAL PERFORMANCE STEP: Strip out the heavy HTML 'content' field 
  // before sending the full array to the client-side search engine.
  const allPostsIndex = posts.map(({ content, ...rest }) => rest);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Campus Updates
        </h1>
      </div>

      <BlogFeed 
        initialPosts={initialPosts} 
        allPostsIndex={allPostsIndex} 
        currentPage={1} 
        totalPages={totalPages} 
      />
    </div>
  );
}