import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Mail, Instagram, Globe, ArrowRight, ExternalLink } from "lucide-react";

export const runtime = 'edge';
export default async function ClubProfile({ params }: { params: Promise<{ clubSlug: string }> }) {
  // 1. Await the params
  const resolvedParams = await params;
  const slug = resolvedParams.clubSlug;

  // 2. Fetch Club Details
  const { data: club, error: clubError } = await supabase
    .from('myuvce_events_clubs')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  // DEBUGGING: If this fails, it will print the reason in your VS Code terminal
  if (clubError || !club) {
    console.error("FAILED TO FETCH CLUB:", slug);
    console.error("Error Details:", clubError?.message || "Club is either inactive or does not exist.");
    notFound(); // This triggers the 404 page
  }

  // 3. Fetch Active Events for this club
  const { data: events } = await supabase
    .from('myuvce_events_events')
    .select('id, title, event_slug, event_date, poster_url, registration_deadline')
    .eq('club_slug', slug)
    .eq('status', 'published')
    .order('event_date', { ascending: true });

  const socialLinks = club.social_links || {};

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="bg-indigo-600 dark:bg-indigo-900 w-full pt-16 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white border-4 border-indigo-500/30 flex items-center justify-center shadow-2xl overflow-hidden mb-6">
            {club.logo_url ? (
              <Image src={club.logo_url} alt={club.name} width={128} height={128} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-indigo-300">{club.name.charAt(0)}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            {club.name}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-indigo-100 text-sm font-medium">
            {club.contact_email && (
              <a href={`mailto:${club.contact_email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> {club.contact_email}
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            )}
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-20 relative z-20 pb-20">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl mb-12">
          <h2 className="text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">About the Club</h2>
          <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {club.description || "Welcome to our official page. We are currently updating our description."}
          </p>
        </div>

        {/* Club Events Section */}
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-indigo-500" />
            Events by {club.name}
          </h2>

          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Link 
                  key={event.id}
                  href={`/events/${slug}/${event.event_slug}`}
                  className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="h-48 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden shrink-0">
                    {event.poster_url ? (
                      <Image src={event.poster_url} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-900 dark:text-zinc-100 shadow-md">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {event.title}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {event.event_date ? new Date(event.event_date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : "Date TBA"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 text-center">
              <Calendar className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No upcoming events</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Check back later to see what we are planning.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}