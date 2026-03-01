import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blogger';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://future.myuvce.in';

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '', '/about', '/contact', '/privacy', '/terms', 
    '/disclaimer', '/map', '/wall', '/gallery', 
    '/submit-profile', '/blog', 
    '/uvce-notes', 
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    priority: route === '' ? 1.0 : 0.8,
    changeFrequency: 'weekly',
  }));

  // 2. Dynamic Routes with Filtering
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    dynamicRoutes = posts
      .filter((post) => post.slug !== 'uvce-notes') // REMOVE the redirect source
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published).toISOString().split('T')[0],
        priority: 0.6,
        changeFrequency: 'monthly',
      }));
  } catch (error) {
    console.error("Sitemap dynamic fetch failed:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}