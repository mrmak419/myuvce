import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

// CRITICAL: This forces Next.js to build this endpoint as a static file.
// It will not use Cloudflare compute at runtime.
export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  
  // Strip out full content; only map the metadata required for search
  const searchIndex = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    labels: post.tags || [],
    published: post.date,
  }));

  return NextResponse.json(searchIndex);
}