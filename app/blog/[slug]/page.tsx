import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { AUTHORS } from "@/lib/authors";
import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import ShareButtons from "@/components/ShareButton";
import PostNavigation from "@/components/PostNavigation";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

// 1. IMPORT THE CENTRALIZED COMPONENTS MAP
import { sharedMdxComponents } from "@/lib/mdx-components-map";

// 2. IMPORT THE TABLE OF CONTENTS COMPONENT
import { TableOfContents } from "@/components/ui/TableofContents";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { 
      title: "Post Not Found",
      description: "The requested blog post could not be found."
    };
  }

  const description = post.content
    .replace(/[#*`>]/g, "")
    .substring(0, 160)
    .trim();

  const postUrl = `/blog/${slug}`;

  return {
    title: post.meta.title, 
    description: description,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.meta.title,
      description: description,
      type: "article",
      publishedTime: post.meta.date,
      url: postUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPostData = currentIndex > 0 ? allPosts[currentIndex - 1] : null; 
  const prevPostData = currentIndex < allPosts.length - 1 && currentIndex !== -1 ? allPosts[currentIndex + 1] : null; 

  const nextPost = nextPostData ? { title: nextPostData.title, slug: nextPostData.slug } : null;
  const prevPost = prevPostData ? { title: prevPostData.title, slug: prevPostData.slug } : null;

  const authorKey = Object.keys(AUTHORS).find(
    key => AUTHORS[key].name === post.meta.author
  ) || post.meta.author.toLowerCase().split(" ")[0];

  const author = AUTHORS[authorKey] || null;

  return (
    <main className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 w-full">
      <div className="flex flex-col lg:flex-row gap-12 items-start relative">
        
        {/* LEFT COLUMN: Main Article Content */}
        {/* Added overflow-x-hidden strictly here to prevent mobile blowout from code blocks/iframes */}
        <article className="flex-1 min-w-0 w-full max-w-full lg:max-w-4xl animate-in fade-in duration-700 break-words overflow-x-hidden">
          <header className="mb-4">
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

          <ShareButtons title={post.meta.title} url={`/blog/${slug}`} />

          {/* Render the Dropdown TOC exclusively for Mobile screens */}
          <div className="block lg:hidden mt-6">
            <TableOfContents isMobile={true} />
          </div>

          {/* The prose wrapper uses max-w-none to fill the space, and overflow-x-hidden acts as the final guardrail */}
          <section className="prose-config prose dark:prose-invert max-w-none w-full overflow-x-hidden">
            <MDXRemote 
              source={post.content} 
              components={sharedMdxComponents} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                }
              }} 
            />        
          </section>

          <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <ShareButtons title={post.meta.title} url={`/blog/${slug}`} />
          </div>

          <PostNavigation prevPost={prevPost} nextPost={nextPost} />

          {author && (
            <div className="mt-12 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
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

        {/* RIGHT COLUMN: Desktop Table of Contents */}
        {/* FIXED: The <aside> is now sticky, tracks down the page, and has a max height and scrollbar if the TOC is extremely long */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden custom-scrollbar">
          <TableOfContents isMobile={false} />
        </aside>

      </div>
    </main>
  );
}