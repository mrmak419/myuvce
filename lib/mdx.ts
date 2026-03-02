import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

/**
 * Normalizes frontmatter data into a strict BlogPostMeta object.
 * This prevents the "missing properties" error by providing fallbacks.
 */
function mapToMeta(slug: string, data: { [key: string]: any }): BlogPostMeta {
  return {
    slug,
    title: data.title ?? 'Untitled Post',
    // Ensure date is always a valid ISO string
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? 'MyUVCE Team',
    // Force tags to be an array even if missing or malformed in MDX
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      meta: mapToMeta(realSlug, data),
      content,
    };
  } catch (error) {
    console.error(`[Error] Failed to fetch post: ${slug}`, error);
    return null;
  }
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // We only extract 'data' (frontmatter) here for performance
      const { data } = matter(fileContents);
      return mapToMeta(slug, data);
    })
    // Sort by date: Newest first
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}