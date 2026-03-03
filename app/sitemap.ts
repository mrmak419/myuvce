import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://myuvce.in';

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
    const posts = getAllPosts(); // Synchronous read from content/blog
    
    dynamicRoutes = posts
      .filter((post) => post.slug !== 'uvce-notes') // REMOVE the redirect source
      .map((post) => {
        // Failsafe date parsing to prevent build crashes
        const rawDate = post.date || (post as any).published || new Date().toISOString();
        
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(rawDate).toISOString().split('T')[0],
          priority: 0.6,
          changeFrequency: 'monthly',
        };
      });
  } catch (error) {
    console.error("Sitemap dynamic parsing failed:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}