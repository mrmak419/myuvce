import { getAllPosts } from "@/lib/mdx";
import BlogFeed from "@/components/BlogFeed";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 10;

type Params = Promise<{ pageNumber: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
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
  
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // If the user types /blog/page/99 but there are only 2 pages, throw a 404
  if (isNaN(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound();
  }

  // Map MDX metadata keys to match <BlogFeed>
  const formattedPosts = posts.map(meta => ({
    slug: meta.slug,
    title: meta.title,
    published: meta.date,
    labels: meta.tags,
  }));

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const initialPosts = formattedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Campus Updates <span className="text-neutral-400 text-2xl">/ Page {currentPage}</span>
        </h1>
      </div>

      <BlogFeed 
        initialPosts={initialPosts} 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
    </div>
  );
}