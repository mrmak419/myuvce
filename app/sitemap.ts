import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blogger';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // MANDATORY: Sitemaps must use absolute URLs.
  const baseUrl = 'https://future.myuvce.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    '', '/about', '/contact', '/privacy', '/terms', 
    '/disclaimer', '/map', '/wall', '/gallery', 
    '/submit-profile', '/blog', '/uvce-notes'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    priority: route === '' ? 1.0 : 0.8,
    changeFrequency: 'weekly',
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    dynamicRoutes = posts.map((post) => {
      // Logic to preserve the .html if it exists in your source data
      // This ensures GSC points to the actual live URL
      const slug = post.slug; 
      
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(post.published).toISOString().split('T')[0],
        priority: 0.6,
        changeFrequency: 'monthly',
      };
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}