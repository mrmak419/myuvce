import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blogger';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://future.myuvce.in';

  // 1. Define all hardcoded native routes
  const staticRoutes = [
    '', // Homepage
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/map',
    '/wall',
    '/gallery',
    '/submit-profile',
    '/blog', 
    '/uvce-notes',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    priority: route === '' ? 1.0 : 0.8, 
    changeFrequency: 'weekly' as const,
  }));

  // 2. Fetch dynamic blog post routes during the BUILD step
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    dynamicRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.published),
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }));
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes at build time:", error);
  }

  // 3. Combine and return the complete map
  return [...staticRoutes, ...dynamicRoutes];
}