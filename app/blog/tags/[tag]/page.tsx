import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import { Tag } from "lucide-react";
import { notFound } from "next/navigation";
import TagBackButton from "@/components/TagBackButton";

type Params = Promise<{ tag: string }>;

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((t) => {
      if (t) {
        tags.add(t.trim().toLowerCase());
      }
    });
  });

  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  // Title capitalized for standard display
  const displayTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  return {
    title: `Articles tagged ${displayTag}`,
    description: `Read technical guides, academic roadmaps, and campus updates categorized under ${decodedTag}.`,
    alternates: {
      canonical: `/blog/tags/${tag}`,
    },
  };
}

export default async function TagFilterPage({ params }: { params: Params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).toLowerCase();

  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter((post) =>
    post.tags.some((t) => t.trim().toLowerCase() === decodedTag)
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  // Display tag with first letter capitalized
  const displayTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Back navigation */}
      <div className="mb-6">
        <TagBackButton />
      </div>

      <div className="flex items-center gap-3 mb-8 sm:mb-12">
        <div className="p-2 bg-indigo-50 dark:bg-zinc-800 rounded-xl">
          <Tag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {displayTag}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} in this category
          </p>
        </div>
      </div>

      {/* Grid mapping over matching posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
