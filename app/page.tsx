import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import QuickLinks from "@/components/QuickLinks";
import Link from "next/link";
import { ArrowRight, Calculator, Gamepad2, Map, LayoutDashboard } from "lucide-react";

const RECENT_POSTS_COUNT = 3;

const CAMPUS_TOOLS = [
  {
    name: "MyUVCE Hub",
    description: "Attendance tracking, bunk estimator, and scheduling.",
    icon: LayoutDashboard,
    href: "https://hub.myuvce.in",
    status: "Live",
    isExternal: true,
  },
  {
    name: "Campus Map",
    description: "Navigate UVCE classrooms and labs instantly.",
    icon: Map,
    href: "/map",
    status: "Live",
  },
  {
    name: "SGPA Calculator",
    description: "Accurate semester grading and forecasting.",
    icon: Calculator,
    href: "#",
    status: "Under Rebuild",
  },
  {
    name: "Viva Preparation",
    description: "Gamified viva questions for your next lab exam.",
    icon: Gamepad2,
    href: "#",
    status: "Under Rebuild",
  },
];

export default function Home() {
  const posts = getAllPosts(); 
  const recentPosts = posts.slice(0, RECENT_POSTS_COUNT);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      
      <h1 className="sr-only">MyUVCE - The Ultimate UVCE Resource Hub for Notes, PYQs, and Campus Maps</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

        <div className="lg:col-span-3 w-full space-y-12">
          
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white border-l-4 border-neutral-900 dark:border-white pl-4 py-1 leading-none drop-shadow-sm">
                Campus Utilities
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAMPUS_TOOLS.map((tool) => {
                const isUnderRebuild = tool.status === "Under Rebuild";
                const externalLink = tool.isExternal || tool.href.startsWith("http"); 
                const Icon = tool.icon;
                
                return (
                  <Link 
                    key={tool.name} 
                    href={isUnderRebuild ? "#" : tool.href}
                    target={externalLink && !isUnderRebuild ? "_blank" : undefined}
                    rel={externalLink && !isUnderRebuild ? "noopener noreferrer" : undefined}
                    className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-200 ${
                      isUnderRebuild 
                      ? "bg-neutral-50 border-neutral-200 dark:bg-neutral-900/50 dark:border-neutral-800 cursor-not-allowed opacity-80" 
                      : "bg-white border-neutral-200 hover:border-orange-500 hover:shadow-lg dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-orange-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${isUnderRebuild ? 'bg-neutral-200 dark:bg-neutral-800' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                        <Icon className={`w-6 h-6 ${isUnderRebuild ? 'text-neutral-500 dark:text-neutral-400' : 'text-orange-600 dark:text-orange-400'}`} />
                      </div>
                      {isUnderRebuild && (
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100 rounded-full dark:bg-orange-900/50 dark:text-orange-400">
                          Rebuilding
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{tool.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white border-l-4 border-orange-600 dark:border-orange-500 pl-4 py-1 leading-none drop-shadow-sm">
                  Latest Updates
                </h2>
                <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} /> 
              ))}
            </div>
            
            <div className="mt-6 sm:hidden flex justify-center">
              <Link href="/blog" className="flex items-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl font-bold text-neutral-900 dark:text-white transition-colors">
                Read all updates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>

        {/* Sidebar Widgets */}
        <aside className="lg:col-span-1 space-y-8 sticky top-28">
          <QuickLinks />
        </aside>

      </div>
    </div>
  );
}