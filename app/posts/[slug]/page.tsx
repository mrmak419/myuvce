export const revalidate = 3600; // Revalidate every hour


import { getPostBySlug, getPosts } from "@/lib/blogger";
import { notFound } from "next/navigation";
import BloggerRenderer from "@/components/BloggerRenderer";
import { Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

/** 
 * SSG (Static Site Generation)
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Dynamic Metadata
 */
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found | MyUVCE" };

  const description = post.content
    .replace(/<[^>]*>/g, "")
    .substring(0, 160)
    .trim();

  return {
    title: `${post.title} | MyUVCE`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.published,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-orange-600 transition-colors mb-12 group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Feed
      </Link>
      <article className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full border border-orange-100 dark:border-orange-800/50">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.published).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </div>
          </div>
        </header>

        <section className="prose-config selection:bg-orange-100 dark:selection:bg-orange-900/40">
          <BloggerRenderer html={post.content} />
        </section>
      </article>
    </main>
  );
}