import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import ExpandableDescription from "@/components/ExpandableDescription"; 
import { Calendar, Mail, Instagram, Globe, Linkedin, Twitter, ExternalLink } from "lucide-react";

export const runtime = 'edge';

// Helper to grab the right icon based on the JSONB key
const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('instagram')) return <Instagram className="w-4 h-4" />;
  if (p.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
  if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-4 h-4" />;
  if (p.includes('website') || p.includes('web')) return <Globe className="w-4 h-4" />;
  return <ExternalLink className="w-4 h-4" />;
};

export default async function ClubProfile({ params }: { params: Promise<{ clubSlug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.clubSlug;

  const { data: club, error: clubError } = await supabase
    .from('myuvce_events_clubs')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (clubError || !club) {
    console.error("FAILED TO FETCH CLUB:", slug);
    notFound(); 
  }

  const { data: events } = await supabase
    .from('myuvce_events_events')
    .select('*, myuvce_events_clubs!inner(name, logo_url)')
    .eq('club_slug', slug)
    .eq('status', 'published')
    .order('event_date', { ascending: true });

  // Safely parse and filter social links
  const socials = club.social_links && typeof club.social_links === 'object' 
    ? Object.entries(club.social_links).filter(([_, url]) => url && String(url).trim() !== '')
    : [];

  return (
    <div className="w-full">
      {/* Ultra-Clean Hero Header (Links Removed) */}
      <div className="w-full pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm overflow-hidden mb-6">
            {club.logo_url ? (
              <Image src={club.logo_url} alt={club.name} width={128} height={128} className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-4xl font-black text-zinc-300 dark:text-zinc-700">{club.name.charAt(0)}</span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {club.name}
          </h1>
          
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        
        {/* About Card (Links Added Here) */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-sm mb-12">
          <h2 className="text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">About the Club</h2>
          
          <ExpandableDescription 
            text={club.description} 
            isMarkdown={club.is_markdown ?? false} 
          />

          {/* Socials & Contact Bar (Moved from Hero) */}
          {(club.contact_email || socials.length > 0) && (
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-3">
              
              {club.contact_email && (
                <a 
                  href={`mailto:${club.contact_email}`} 
                  className="flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl transition-all text-sm font-bold shadow-sm"
                >
                  <Mail className="w-4 h-4 text-zinc-400" /> 
                  <span className="hidden sm:inline">{club.contact_email}</span>
                  <span className="sm:hidden">Email</span>
                </a>
              )}

              {socials.map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url as string} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl transition-all text-sm font-bold shadow-sm capitalize"
                >
                  {getSocialIcon(platform)} 
                  {platform}
                </a>
              ))}

            </div>
          )}
        </div>

        {/* Club Events Section */}
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-indigo-500" />
            Events by {club.name}
          </h2>

          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
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