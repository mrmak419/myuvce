import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { AUTHORS } from "@/lib/authors";
import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const description = post.content
    .replace(/[#*`>]/g, "")
    .substring(0, 160)
    .trim();

  return {
    title: post.meta.title, // The Layout template will turn this into "Title | MyUVCE"
    description: description,
    openGraph: {
      title: post.meta.title,
      description: description,
      type: "article",
      publishedTime: post.meta.date,
      url: `https://myuvce.in/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const authorKey = Object.keys(AUTHORS).find(
    key => AUTHORS[key].name === post.meta.author
  ) || post.meta.author.toLowerCase().split(" ")[0];

  const author = AUTHORS[authorKey] || null;

  return (
    <main className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6 w-full overflow-hidden">
      <article className="animate-in fade-in duration-700 break-words">
        <header className="mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            {post.meta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span suppressHydrationWarning>
                {new Date(post.meta.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
              </span>
            </div>
            {post.meta.tags.length > 0 && (
              <div className="flex gap-2">
                {post.meta.tags.map(tag => (
                  <span key={tag} className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="prose-config prose dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </section>

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
                  unoptimized={author.img.includes('googleusercontent')}
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
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </a>
              </div>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}