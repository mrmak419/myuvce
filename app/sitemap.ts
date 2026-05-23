import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { supabase } from '@/lib/supabase';
import { getStaticRoutes, getAppDirectory } from '@/lib/route-utils';

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://myuvce.in';

  // 1. Static Routes (Auto-discovered)
  const appDir = getAppDirectory();
  const discoveredRoutes = getStaticRoutes(appDir);

  const staticRoutes: MetadataRoute.Sitemap = discoveredRoutes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`, 
    lastModified: new Date().toISOString().split('T')[0],
    priority: route === '/' ? 1.0 : 0.8,
    changeFrequency: 'weekly',
  }));

  // 2. MDX Dynamic Routes (Blog)
  let mdxRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    
    mdxRoutes = posts
      .filter((post) => post.slug !== 'uvce-notes')
      .map((post) => {
        const rawDate = post.date || (post as any).published || new Date().toISOString();
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(rawDate).toISOString().split('T')[0],
          priority: 0.6,
          changeFrequency: 'monthly',
        };
      });
  } catch (error) {
    console.error("[SITEMAP] MDX parsing failed:", error);
  }

  // 3. Supabase Dynamic Routes (Clubs & Events)
  let databaseRoutes: MetadataRoute.Sitemap = [];
  
  // A. Fetch active clubs
  const { data: clubs, error: clubsError } = await supabase
    .from('myuvce_events_clubs')
    .select('slug, created_at') 
    .eq('is_active', true);

  if (clubsError) {
    console.error("[SITEMAP] Supabase Clubs Fetch Error:", clubsError.message);
  } else if (clubs) {
    const clubRoutes = clubs.map((club) => ({
      url: `${baseUrl}/clubs/${club.slug}`,
      lastModified: club.created_at 
        ? new Date(club.created_at).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0],
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    }));
    databaseRoutes.push(...clubRoutes);
  }

  // B. Fetch published events
  const { data: events, error: eventsError } = await supabase
    .from('myuvce_events_events')
    .select('club_slug, event_slug, created_at')
    .eq('status', 'published');

  if (eventsError) {
    console.error("[SITEMAP] Supabase Events Fetch Error:", eventsError.message);
  } else if (events) {
    const eventRoutes = events.map((event) => ({
      url: `${baseUrl}/events/${event.club_slug}/${event.event_slug}`,
      lastModified: event.created_at 
        ? new Date(event.created_at).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0],
      priority: 0.8,
      changeFrequency: 'daily' as const,
    }));
    databaseRoutes.push(...eventRoutes);
  }

  // 4. Dynamic Tag Routes
  let tagRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    const uniqueTags = new Set<string>();
    
    posts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((t) => {
          if (t) {
            uniqueTags.add(t.trim().toLowerCase());
          }
        });
      }
    });

    tagRoutes = Array.from(uniqueTags).map((tag) => ({
      url: `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.5,
      changeFrequency: 'weekly' as const,
    }));
  } catch (error) {
    console.error("[SITEMAP] Tag parsing failed:", error);
  }

  // Orchestrate the final build
  return [...staticRoutes, ...mdxRoutes, ...databaseRoutes, ...tagRoutes];
}