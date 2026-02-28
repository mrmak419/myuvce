export const revalidate = 3600; // Revalidate every hour

import { getPostBySlug, getPosts } from "@/lib/blogger";
import { notFound } from "next/navigation";
import BloggerRenderer from "@/components/BloggerRenderer";
import { AUTHORS } from "@/lib/authors";
import Image from "next/image";
import { Calendar, User, Linkedin } from "lucide-react";

type Params = Promise<{ slug: string }>;

/**
 * SSG (Static Site Generation)
 * This pre-builds every post at compile time so they load instantly.
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Dynamic Metadata
 * Optimized for SEO and social sharing.
 */
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found | MyUVCE" };

  // Clean description: Remove HTML tags and limit to 160 chars
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

  // 2. DOM PURIFICATION: Erase the legacy author box to prevent React hydration crashes
  // This regex targets any div containing "uvce-author-box" and removes it entirely.
  const cleanHtml = post.content.replace(
    /<div[^>]*uvce-author-box[^>]*>[\s\S]*?<\/div>/gi,
    ''
  );

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <article className="animate-in fade-in duration-700">
        <header className="mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span suppressHydrationWarning>
                {new Date(post.published).toLocaleDateString('en-IN', { dateStyle: 'long' })}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-orange-600" />
              <span>{author ? author.name : "Team MyUVCE"}</span>
            </div>

            {post.labels.length > 0 && (
              <div className="flex gap-2">
                {post.labels.map(label => (
                  <span key={label} className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    #{label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="prose-config">
          {/* Inject the cleaned HTML, completely free of legacy author scripts */}
          <BloggerRenderer html={cleanHtml} />
        </section>

        {/* 3. NATIVE COMPONENT: Render the Author Box using React and Tailwind */}
        {author && (
          <div className="mt-16 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-6">About the Author</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={author.img}
                  alt={author.name}
                  fill
                  className="rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{author.name}</h3>
                <span className="inline-block mt-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                  {author.role}
                </span>
                <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {author.bio}
                </p>
                <a
                  href={author.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
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