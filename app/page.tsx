import { getPosts } from "@/lib/blogger";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Latest from MyUVCE</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/posts/${post.slug}`}
            className="p-4 border rounded hover:bg-slate-50 dark:hover:bg-slate-900 transition"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </main>
  );
}