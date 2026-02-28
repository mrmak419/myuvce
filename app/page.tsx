import { getPosts } from "@/lib/blogger";
import PostCard from "@/components/PostCard";
import NoticeBoard from "@/components/NoticeBoard";
import QuickLinks from "@/components/QuickLinks";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const POSTS_PER_PAGE = 9;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1");
  const posts = await getPosts();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">

      {/* Hero Header */}
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-loose">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-400 dark:to-rose-400 drop-shadow-sm">MyUVCE</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0">
          The ultimate student community portal. Access study materials, campus news, placement updates, and everything UVCE.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

        {/* Main Feed */}
        <div className="lg:col-span-3 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white border-l-4 border-orange-600 dark:border-orange-500 pl-4 py-1 leading-none drop-shadow-sm">
              Latest from the Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {posts.length === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50">
                <p className="text-neutral-500 dark:text-neutral-400 font-medium">Fetching the latest updates...</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {posts.length > POSTS_PER_PAGE && (
            <div className="mt-12 flex items-center justify-center gap-4">
              {currentPage > 1 && (
                <Link
                  href={`/?page=${currentPage - 1}`}
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
                  href={`/?page=${currentPage + 1}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl font-bold text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm hover:shadow-md"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <aside className="lg:col-span-1 space-y-8 sticky top-28">
          <NoticeBoard />
          <QuickLinks />
        </aside>

      </div>
    </div>
  );
}