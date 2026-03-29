import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import QuickLinks from "@/components/QuickLinks";
import Link from "next/link";
import { ArrowRight, Calculator, Gamepad2, Map, LayoutDashboard } from "lucide-react";

const RECENT_POSTS_COUNT = 4;

// We add specific color mapping for each tool to give them identity
const CAMPUS_TOOLS = [
  {
    name: "MyUVCE HUB",
    description: "Attendance tracking, notes, pyq's and more.",
    icon: LayoutDashboard,
    href: "https://hub.myuvce.in",
    status: "Live",
    isExternal: true,
    color: "blue" // Hub gets trust/utility blue
  },
  {
    name: "Campus Map",
    description: "Navigate UVCE classrooms and labs instantly.",
    icon: Map,
    href: "/map",
    status: "Live",
    color: "emerald" // Map gets location/success green
  },
  {
    name: "SGPA Calculator",
    description: "Accurate semester grading and forecasting.",
    icon: Calculator,
    href: "https://hub.myuvce.in/sgpa",
    status: "Under Rebuild",
    isExternal: true,
    color: "violet" // Calculator gets deep, analytical purple
  },
  {
    name: "Viva Garage",
    description: "Gamified viva questions for your next lab exam.",
    icon: Gamepad2,
    href: "https://hub.myuvce.in/question-garage",
    status: "Live",
    isExternal: true,
    color: "rose" // Game gets an energetic but muted red/rose
  },
];

export default function Home() {
  const posts = getAllPosts(); 
  const recentPosts = posts.slice(0, RECENT_POSTS_COUNT);

  // Helper function to map logical colors to Tailwind classes dynamically
  const getColorClasses = (color: string, isUnderRebuild: boolean) => {
    if (isUnderRebuild) {
      return {
        bg: 'bg-zinc-100 dark:bg-zinc-800/80',
        icon: 'text-zinc-400 dark:text-zinc-500',
        hoverBg: 'group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
      };
    }
    
    const colorMap: Record<string, any> = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'text-blue-600 dark:text-blue-400', hoverBg: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40' },
      emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-600 dark:text-emerald-400', hoverBg: 'group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40' },
      violet: { bg: 'bg-violet-50 dark:bg-violet-900/20', icon: 'text-violet-600 dark:text-violet-400', hoverBg: 'group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40' },
      rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'text-rose-600 dark:text-rose-400', hoverBg: 'group-hover:bg-rose-100 dark:group-hover:bg-rose-900/40' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      
      <h1 className="sr-only">MyUVCE - The Ultimate UVCE Resource Hub for Notes, PYQs, and Campus Maps</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

        <div className="lg:col-span-3 w-full space-y-12">
          
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Campus Utilities
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {CAMPUS_TOOLS.map((tool) => {
                const isUnderRebuild = tool.status === "Under Rebuild";
                const externalLink = tool.isExternal || tool.href.startsWith("http"); 
                const Icon = tool.icon;
                const colors = getColorClasses(tool.color || 'blue', isUnderRebuild);
                
                return (
                  <Link 
                    key={tool.name} 
                    href={isUnderRebuild ? "#" : tool.href}
                    target={externalLink && !isUnderRebuild ? "_blank" : undefined}
                    rel={externalLink && !isUnderRebuild ? "noopener noreferrer" : undefined}
                    className={`group relative flex flex-col p-4 sm:p-5 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${
                      isUnderRebuild 
                      ? "bg-zinc-50 border-zinc-200 dark:bg-zinc-800/20 dark:border-zinc-800 cursor-not-allowed opacity-80" 
                      : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm dark:bg-zinc-800/40 dark:border-zinc-700/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                      <div className={`p-2 rounded-lg transition-colors ${colors.bg} ${colors.hoverBg}`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} strokeWidth={1.5} />
                      </div>
                      {isUnderRebuild && (
                        <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 rounded-md dark:bg-zinc-800/80 dark:text-zinc-400">
                          Rebuilding
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5 sm:mb-2">{tool.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{tool.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Latest Updates
                </h2>
                <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                  View all <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} /> 
              ))}
            </div>
            
            <div className="mt-6 sm:hidden flex justify-center">
              <Link href="/blog" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:dark:bg-zinc-800/80 hover:dark:border-zinc-600 rounded-xl font-medium text-sm text-zinc-900 dark:text-zinc-100 active:scale-[0.98] transition-all shadow-sm">
                Read all updates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>

        <aside className="lg:col-span-1 space-y-8 sticky top-28">
          <QuickLinks />
        </aside>

      </div>
    </div>
  );
}