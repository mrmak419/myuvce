export const revalidate = 3600; // Revalidate every hour


import { getPostBySlug, getPosts } from "@/lib/blogger";
import { notFound } from "next/navigation";
import BloggerRenderer from "@/components/BloggerRenderer"; 

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

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <article className="animate-in fade-in duration-700">
        <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
             {/* Note to teammate: Add Lucide Icons for Calendar and User here */}
             <span>{new Date(post.published).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
             {post.labels.length > 0 && (
               <div className="flex gap-2">
                 {post.labels.map(label => (
                   <span key={label} className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                     #{label}
                   </span>
                 ))}
               </div>
             )}
          </div>
        </header>

        <section className="prose-config">
          <BloggerRenderer html={post.content} /> 
        </section>
      </article>
    </main>
  );
}