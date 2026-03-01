import { getAllPosts } from "@/lib/mdx";
import BlogFeed from "@/components/BlogFeed";

const POSTS_PER_PAGE = 15;

export const metadata = {
  title: "Campus Updates | MyUVCE",
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
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Campus Updates
        </h1>
      </div>

      <BlogFeed 
        initialPosts={initialPosts} 
        allPostsIndex={formattedPosts} 
        currentPage={1} 
        totalPages={totalPages} 
      />
    </div>
  );
}