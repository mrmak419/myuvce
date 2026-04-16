import { supabase } from "@/lib/supabase";
import { Calendar } from "lucide-react";
import FilterBar from "./FilterBar";
import EventCard from "@/components/EventCard"; 
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const runtime = 'edge';

export default async function EventsFeed({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const clubParam = typeof resolvedParams.club === 'string' ? resolvedParams.club : 'all';
  const sortParam = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'upcoming';

  const { data: clubsData } = await supabase
    .from('myuvce_events_clubs')
    .select('slug, name')
    .eq('is_active', true)
    .order('name');

  let query = supabase
    .from('myuvce_events_events')
    .select('*, myuvce_events_clubs!inner(name, logo_url)')
    .eq('status', 'published');

  if (clubParam !== 'all') {
    query = query.eq('club_slug', clubParam);
  }

  if (q) {
    query = query.ilike('title', `%${q}%`);
  }

  const now = new Date().toISOString();
  if (sortParam === 'upcoming') {
    query = query.gte('event_date', now).order('event_date', { ascending: true });
  } else if (sortParam === 'past') {
    query = query.lt('event_date', now).order('event_date', { ascending: false });
  } else if (sortParam === 'deadline') {
    query = query.gte('registration_deadline', now).order('registration_deadline', { ascending: true });
  }

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

      <Suspense fallback={<div className="h-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-2xl mb-8" />}>
        <FilterBar clubs={clubsData || []} />
      </Suspense>

      {!events || events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl mb-12 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Calendar className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No events found</h3>
          <p className="text-zinc-500 mt-1">Try adjusting your filters or searching for something else.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}