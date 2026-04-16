import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import QuickLinks from "@/components/QuickLinks";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Calculator, Gamepad2, Map, LayoutDashboard, Calendar, Clock } from "lucide-react";

export const revalidate = 60; // Keep the landing page fast, refresh data every 60 seconds

const RECENT_POSTS_COUNT = 6;

const CAMPUS_TOOLS = [
  {
    name: "MyUVCE HUB",
    description: "Attendance tracking, notes, pyq's and more.",
    icon: LayoutDashboard,
    href: "https://hub.myuvce.in",
    status: "Live",
    isExternal: true,
    color: "blue" 
  },
  {
    name: "Campus Map",
    description: "Navigate UVCE classrooms and labs instantly.",
    icon: Map,
    href: "/map",
    status: "Live",
    color: "emerald" 
  },
  {
    name: "SGPA Calculator",
    description: "Accurate semester grading and forecasting.",
    icon: Calculator,
    href: "https://hub.myuvce.in/sgpa",
    status: "Under Rebuild",
    isExternal: true,
    color: "violet" 
  },
  {
    name: "Viva Garage",
    description: "Gamified viva questions for your next lab exam.",
    icon: Gamepad2,
    href: "https://hub.myuvce.in/question-garage",
    status: "Live",
    isExternal: true,
    color: "rose" 
  },
];

export default async function Home() {
  const posts = getAllPosts(); 
  const recentPosts = posts.slice(0, RECENT_POSTS_COUNT);

  // Fetch logic stays here so you don't have to rewrite it later, 
  // but it won't be used in the UI for now.
  const { data: upcomingEvents } = await supabase
    .from('myuvce_events_events')
    .select('*, myuvce_events_clubs(name, logo_url)')
    .eq('status', 'published')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
    .limit(3);

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

          {/* Upcoming Events Section - Commented out for now */}
          {/* {upcomingEvents && upcomingEvents.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Upcoming Events
                  </h2>
                  <Link href="/events" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    View all <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {upcomingEvents.map((event) => {
                  const club = Array.isArray(event.myuvce_events_clubs) ? event.myuvce_events_clubs[0] : event.myuvce_events_clubs;
                  
                  return (
                    <Link 
                      key={event.id}
                      href={`/events/${event.club_slug}/${event.event_slug}`}
                      className="group flex flex-col bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl overflow-hidden hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300"
                    >
                      <div className="h-32 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden shrink-0">
                        {event.poster_url ? (
                          <Image src={event.poster_url} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90 group-hover:scale-105 transition-transform duration-500" />
                        )}
                        {club && (
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                            {club.logo_url && <Image src={club.logo_url} alt={club.name} width={12} height={12} className="rounded-full" />}
                            <span className="text-[9px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide truncate max-w-[80px]">{club.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="mt-auto flex flex-col gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                            {new Date(event.event_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-6 sm:hidden flex justify-center">
                <Link href="/events" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 hover:dark:bg-zinc-800/80 hover:dark:border-zinc-600 rounded-xl font-medium text-sm text-zinc-900 dark:text-zinc-100 active:scale-[0.98] transition-all shadow-sm">
                  View all events <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )} 
          */}

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