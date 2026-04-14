import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";
import FilterBar from "./FilterBar";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Ensures the page always reads fresh URL parameters
export const runtime = 'edge';

export default async function EventsFeed({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  
  // Extract URL Parameters safely
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const clubParam = typeof resolvedParams.club === 'string' ? resolvedParams.club : 'all';
  const sortParam = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'upcoming';

  // 1. Fetch Clubs for the Dropdown Options
  const { data: clubsData } = await supabase
    .from('myuvce_events_clubs')
    .select('slug, name')
    .eq('is_active', true)
    .order('name');

  // 2. Build the Dynamic Supabase Query
  let query = supabase
    .from('myuvce_events_events')
    .select('*, myuvce_events_clubs!inner(name, logo_url)')
    .eq('status', 'published');

  // Apply Club Filter
  if (clubParam !== 'all') {
    query = query.eq('club_slug', clubParam);
  }

  // Apply Search Filter (Case-insensitive title search)
  if (q) {
    query = query.ilike('title', `%${q}%`);
  }

  // Apply Sorting Logic
  const now = new Date().toISOString();
  if (sortParam === 'upcoming') {
    query = query.gte('event_date', now).order('event_date', { ascending: true });
  } else if (sortParam === 'past') {
    query = query.lt('event_date', now).order('event_date', { ascending: false });
  } else if (sortParam === 'deadline') {
    // Only show events where the deadline hasn't passed, ordered by urgency
    query = query.gte('registration_deadline', now).order('registration_deadline', { ascending: true });
  }

  // Fetch the actual event data (limiting to 50 to prevent massive payloads. We can add pagination next).
  const { data: events } = await query.limit(50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
          Campus Events
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Workshops, hackathons, and cultural fests happening around UVCE.
        </p>
      </div>

      {/* The Interactive Filter Bar (Client Component) */}
      <Suspense fallback={<div className="h-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-2xl mb-8" />}>
        <FilterBar clubs={clubsData || []} />
      </Suspense>

      {/* Results Grid */}
      {!events || events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl mb-12 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Calendar className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No events found</h3>
          <p className="text-zinc-500 mt-1">Try adjusting your filters or searching for something else.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {events.map((event) => {
            // Supabase returns relations as arrays or single objects depending on the join type.
            const club = Array.isArray(event.myuvce_events_clubs) ? event.myuvce_events_clubs[0] : event.myuvce_events_clubs;
            const isDeadlineApproaching = sortParam === 'deadline' && event.registration_deadline;

            return (
              <Link 
                key={event.id}
                href={`/events/${event.club_slug}/${event.event_slug}`}
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="h-48 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden shrink-0">
                  {event.poster_url ? (
                    <Image src={event.poster_url} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  )}
                  {club && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-sm">
                      {club.logo_url && <Image src={club.logo_url} alt={club.name} width={16} height={16} className="rounded-full" />}
                      <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide truncate max-w-[120px]">{club.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="mt-auto flex flex-col gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      <Clock className="w-4 h-4 mr-1.5 text-indigo-500" />
                      {event.event_date ? new Date(event.event_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : "Date TBA"}
                    </div>
                    
                    {/* Show deadline warning if we are in deadline mode */}
                    {isDeadlineApproaching && (
                      <div className="flex items-center text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1.5 rounded-lg w-max">
                        <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                        Closes: {new Date(event.registration_deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}