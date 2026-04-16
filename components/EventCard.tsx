import Image from "next/image";
import Link from "next/link";
import { Clock, CalendarX, Timer } from "lucide-react";

export default function EventCard({ event }: { event: any }) {
  // Supabase returns relations as arrays or single objects depending on the join type.
  const club = Array.isArray(event.myuvce_events_clubs) 
    ? event.myuvce_events_clubs[0] 
    : event.myuvce_events_clubs;

  const deadlineDate = event.registration_deadline ? new Date(event.registration_deadline) : null;
  const isClosed = deadlineDate ? deadlineDate < new Date() : false;

  return (
    <Link 
      href={`/events/${event.club_slug}/${event.event_slug}`}
      className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300"
    >
      <div className="h-48 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden shrink-0">
        {event.poster_url ? (
          <Image 
            src={event.poster_url} 
            alt={event.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 opacity-90 group-hover:scale-105 transition-transform duration-500" />
        )}
        
        {club && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-sm">
            {club.logo_url && (
              <Image src={club.logo_url} alt={club.name} width={16} height={16} className="rounded-full" />
            )}
            <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide truncate max-w-[120px]">
              {club.name}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        {/* Horizontal Footer: Date on LHS, Plain Deadline on RHS */}
        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 gap-2">
          
          <div className="flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 min-w-0">
            <Clock className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0" />
            <span className="truncate">
              {event.event_date 
                ? new Date(event.event_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) 
                : "Date TBA"}
            </span>
          </div>
          
          {/* Plain Text Deadline Indicator */}
          {deadlineDate && (
            <div className="flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
              {isClosed ? (
                <>
                  <CalendarX className="w-4 h-4 mr-1.5 text-zinc-400 shrink-0" />
                  Closed
                </>
              ) : (
                <>
                  <Timer className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0" />
                  Deadline: {deadlineDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </Link>
  );
}