import { getPosts } from "@/lib/blogger";
import PostCard from "@/components/PostCard";
import NoticeBoard from "@/components/NoticeBoard";
import QuickLinks from "@/components/QuickLinks";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">

      {/* Hero Header */}
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-loose">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 drop-shadow-sm">MyUVCE</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0">
          The ultimate student community portal. Access study materials, campus news, placement updates, and everything UVCE.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12 items-start">

        {/* Main Feed */}
        <div className="xl:col-span-3 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white border-l-4 border-blue-600 dark:border-blue-500 pl-4 py-1 leading-none shadow-blue-500/20 drop-shadow-sm">
              Latest from the Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {posts.length === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50">
                <p className="text-neutral-500 dark:text-neutral-400 font-medium">Fetching the latest updates...</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <aside className="xl:col-span-1 space-y-8 sticky top-28">
          <NoticeBoard />
          <QuickLinks />
        </aside>

      </div>
    </div>
  );
}