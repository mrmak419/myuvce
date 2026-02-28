import BloggerRenderer from "@/components/BloggerRenderer";
import { Calendar, ChevronLeft, Linkedin } from "lucide-react";
import Link from "next/link";
import { AUTHORS } from "@/lib/authors";
import Image from "next/image";

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

  // 1. DATA EXTRACTION: Find the author ID from the legacy data-author attribute
  const authorMatch = post.content.match(/data-author=["']([^"']+)["']/i);
  const authorId = authorMatch ? authorMatch[1].toLowerCase() : null;
  const author = authorId ? AUTHORS[authorId] : null;

  // 2. DOM PURIFICATION: Erase the legacy author boxes
  const cleanHtml = post.content.replace(
    /<div[^>]*uvce-author-box[^>]*>[\s\S]*?<\/div>/gi,
    ''
  );

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
              <span suppressHydrationWarning>{new Date(post.published).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </div>
          </div>
        </header>

        <section className="prose-config selection:bg-orange-100 dark:selection:bg-orange-900/40">
          <BloggerRenderer html={cleanHtml} />
        </section>

        {/* 3. NATIVE COMPONENT: Re-introducing Author Box with matching Orange Theme */}
        {author && (
          <div className="mt-16 p-8 bg-orange-50/30 dark:bg-orange-950/10 rounded-3xl border border-orange-100 dark:border-orange-900/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400 mb-8">Article Contributor</p>
            <div className="flex flex-col sm:flex-row items-start gap-8 relative z-10">
              <div className="relative w-24 h-24 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={author.img}
                  alt={author.name}
                  fill
                  className="rounded-2xl object-cover border-4 border-white dark:border-neutral-900 shadow-xl shadow-orange-500/10"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white leading-tight">{author.name}</h3>
                <span className="inline-block mt-1 text-sm font-bold text-orange-600 dark:text-orange-400">
                  {author.role}
                </span>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                  {author.bio}
                </p>
                <a
                  href={author.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-600/20 active:scale-95 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect
                </a>
              </div>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}