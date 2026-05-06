import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import PortalClient from "./PortalClient";
import { XCircle } from "lucide-react";

export const runtime = "edge";

// SEO & OpenGraph UPGRADE: Dynamic WhatsApp Previews for Tickets
export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  
  // 1. Fetch the registration to get the linked event ID
  const { data: registration } = await supabase
    .from('myuvce_events_registrations')
    .select('event_id')
    .eq('edit_token', token)
    .single();

  if (!registration) return { title: "Invalid Ticket | MyUVCE" };

  // 2. Fetch the event and club details for the rich preview
  const { data: event } = await supabase
    .from('myuvce_events_events')
    .select('title, description, poster_url, myuvce_events_clubs (name, logo_url)')
    .eq('id', registration.event_id)
    .single();

  if (!event) return { title: "Event Ticket | MyUVCE" };

  // 3. Extract data safely
  const club = Array.isArray(event.myuvce_events_clubs) 
    ? event.myuvce_events_clubs[0] 
    : event.myuvce_events_clubs;

  const plainTextDescription = event.description 
    ? event.description.substring(0, 120).replace(/[#*`_]/g, '') + '...' 
    : `Digital ticket for ${event.title} by ${club?.name || 'UVCE'}.`;

  // 4. Prioritize Poster -> Club Logo -> Default MyUVCE OG Image
  const previewImage = event.poster_url || club?.logo_url || 'https://myuvce.in/og-image.jpg'; // Replace with your actual default OG image URL

  return {
    title: `Ticket: ${event.title}`,
    description: plainTextDescription,
    openGraph: {
      title: `🎟️ RSVP Confirmed: ${event.title}`,
      description: plainTextDescription,
      images: [{ url: previewImage }],
      siteName: 'MyUVCE Hub',
    },
    twitter: {
      card: "summary_large_image",
      title: `🎟️ RSVP Confirmed: ${event.title}`,
      description: plainTextDescription,
      images: [previewImage],
    }
  };
}

export default async function PortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data, error } = await supabase.rpc('get_registration_by_token', { token });

  if (error || !data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-xl">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Access Denied</h2>
          <p className="text-sm text-zinc-500 font-medium">Registration not found or link is invalid.</p>
        </div>
      </div>
    );
  }

  // Pass the securely fetched data down to the interactive client
  return <PortalClient token={token} initialData={data[0]} />;
}