import { Post } from "@/types/blogger";

const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const API_KEY = process.env.BLOGGER_API_KEY;

/**
 * Validates that the necessary environment variables are present.
 * This prevents the build from silently failing on Cloudflare.
 */
function checkEnvVars() {
  if (!BLOG_ID || !API_KEY) {
    throw new Error("CRITICAL: Missing Blogger API credentials in environment variables.");
  }
}

/**
 * Fetches the list of all posts.
 * Used primarily for the Home Page feed and to map slugs to IDs.
 * Note: The 'content' field here might be truncated by Google.
 */
export async function getPosts(): Promise<Post[]> {
  checkEnvVars();

  // maxResults=500 forces Google to send as many posts as possible in one request
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`;

  // next: { revalidate: 3600 } tells Next.js to cache this data for 1 hour.
  // This makes your site load instantly and protects your API limits.
  const res = await fetch(url, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error(`Blogger API List Error: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.items) return [];

  return data.items.map((post: { id: string; title: string; content?: string; url: string; published: string; labels?: string[]; author: any }) => ({
    id: post.id,
    title: post.title,
    content: post.content || "",
    // Dynamically extract the clean slug from the legacy .html URL
    slug: post.url.split('/').pop().replace('.html', ''),
    published: post.published,
    labels: post.labels || [],
    author: post.author
  }));
}

/**
 * Fetches a single post directly by its Blogger ID.
 * This guarantees 100% untruncated HTML, preserving your custom CSS and JS tags.
 */
export async function getPostById(postId: string): Promise<Post> {
  checkEnvVars();

  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}?key=${API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error(`Blogger API Single Post Error for ID ${postId}: ${res.statusText}`);
  }

  const post = await res.json();

  return {
    id: post.id,
    title: post.title,
    content: post.content, // Guaranteed complete HTML payload
    slug: post.url.split('/').pop().replace('.html', ''),
    published: post.published,
    labels: post.labels || [],
    author: post.author
  };
}

/**
 * The bridge function for the Next.js App Router.
 * Takes the clean URL slug, finds the legacy ID, and fetches the full content.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // 1. Get the lightweight list to find the ID mapping
  const posts = await getPosts();

  // 2. Find the specific post data
  const matchedPost = posts.find((p) => p.slug === slug);

  if (!matchedPost) {
    return null;
  }

  // 3. Fetch and return the heavy, untruncated payload
  return await getPostById(matchedPost.id);
}