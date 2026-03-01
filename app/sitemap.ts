export const runtime = 'edge';
export const revalidate = 3600; // Rebuild the sitemap hourly on the Edge

import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blogger';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use your production domain
  const baseUrl = 'https://www.myuvce.in';

  // 1. Define all hardcoded native routes
  const staticRoutes = [
    '', // Homepage (Command Center)
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/map',
    '/wall',
    '/gallery',
    '/submit-profile',
    '/blog', // Main blog feed
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    // Homepage gets maximum priority, utilities get high priority
    priority: route === '' ? 1.0 : 0.8, 
    changeFrequency: 'weekly' as const,
  }));

  // 2. Fetch dynamic blog post routes from the Blogger API
 let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    dynamicRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.published), // Fixed: Removed post.updated
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }));
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
  }

  // 3. Combine and return the complete map
  return [...staticRoutes, ...dynamicRoutes];
}