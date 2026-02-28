import { getPostBySlug } from "@/lib/blogger";
import { notFound } from "next/navigation";
import BloggerRenderer from "@/components/BloggerRenderer"; // <-- Import it here

// Next.js 15 requires params to be treated as a Promise
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params; // <-- Awaiting the params
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | MyUVCE`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""), 
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {post.title}
          </h1>
        </header>

        {/* Use the new renderer to execute your custom components */}
        <BloggerRenderer html={post.content} /> 
        
      </article>
    </main>
  );
}
