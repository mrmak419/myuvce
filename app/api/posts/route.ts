import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const posts = getAllPosts();
  const formattedPosts = posts.map(meta => ({
    slug: meta.slug,
    title: meta.title,
    published: meta.date,
    labels: meta.tags,
  }));
  
  return NextResponse.json(formattedPosts);
}
