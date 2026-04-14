import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RegistrationForm from "./RegistrationForm";
import type { Metadata } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";

// SPEED UPGRADE: Incremental Static Regeneration (ISR)
// Cache this page globally. Rebuild in the background every 60 seconds if data changes.
export const revalidate = 60; 
export const runtime = 'edge';

// SEO UPGRADE: Dynamic OpenGraph Link Previews
export async function generateMetadata({ params }: { params: Promise<{ clubSlug: string, eventSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data: event } = await supabase
    .from('myuvce_events_events')
    .select('title, description, poster_url')
    .eq('club_slug', resolvedParams.clubSlug)
    .eq('event_slug', resolvedParams.eventSlug)
    .eq('status', 'published')
    .single();

  if (!event) return { title: "Event Not Found" };

  const plainTextDescription = event.description 
    ? event.description.substring(0, 150).replace(/[#*`_]/g, '') + '...' 
    : `Join us for ${event.title} at UVCE!`;

  return {
    title: `${event.title} | ${resolvedParams.clubSlug.toUpperCase()}`,
    description: plainTextDescription,
    openGraph: {
      title: event.title,
      description: plainTextDescription,
      images: event.poster_url ? [{ url: event.poster_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: plainTextDescription,
      images: event.poster_url ? [event.poster_url] : [],
    }
  };
}

// Main Page Component
export default async function EventPage({ params }: { params: Promise<{ clubSlug: string, eventSlug: string }> }) {
  const resolvedParams = await params;
  
  const { data: event } = await supabase
    .from('myuvce_events_events')
    .select('*, myuvce_events_clubs (name, logo_url)')
    .eq('club_slug', resolvedParams.clubSlug)
    .eq('event_slug', resolvedParams.eventSlug)
    .eq('status', 'published')
    .single();

  if (!event) notFound();

  const isPast = new Date(event.event_date) < new Date();
  const club = event.myuvce_events_clubs;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full animate-in fade-in duration-500 pb-32">
      
      <Link href="/events" className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Events
      </Link>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-xl mb-12">
        
        <div className="relative h-64 md:h-96 w-full bg-zinc-100 dark:bg-zinc-800">
          {event.poster_url ? (
            <Image src={event.poster_url} alt={event.title} fill className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
          )}
        </div>

        <div className="p-6 md:p-10 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link href={`/clubs/${resolvedParams.clubSlug}`} className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              {club?.logo_url && <Image src={club.logo_url} alt={club.name} width={16} height={16} className="rounded-full" />}
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{club?.name || resolvedParams.clubSlug}</span>
            </Link>
            {isPast && <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-100 text-red-700">Past Event</span>}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight mb-6">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              {new Date(event.event_date).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              {new Date(event.event_date).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
            </div>
          </div>

          {!isPast && (
            <a href="#registration" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/25 active:scale-95 w-full sm:w-auto">
              <ArrowDown className="w-4 h-4" /> Jump to Registration
            </a>
          )}
        </div>

        {event.description && (
          <div className="p-6 md:p-10 bg-zinc-50 dark:bg-zinc-900/50">
            <h3 className="text-sm font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6">About the Event</h3>
            <div className={`prose prose-zinc dark:prose-invert max-w-none ${event.is_markdown ? '' : 'whitespace-pre-wrap font-medium'}`}>
              {event.is_markdown ? (
                <MarkdownRenderer content={event.description} />
              ) : (
                event.description
              )}
            </div>
          </div>
        )}
      </div>

      <div id="registration" className="scroll-mt-24">
        {!isPast ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-lg">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Register</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">Please fill out the details below to complete your registration.</p>
            <RegistrationForm event={event} />
          </div>
        ) : (
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 text-center">
            <Calendar className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">This event has concluded.</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Thank you to everyone who participated!</p>
          </div>
        )}
      </div>
    </div>
  );
}