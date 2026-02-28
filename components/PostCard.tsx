import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Post } from '@/types/blogger';

export default function PostCard({ post }: { post: Post }) {
    const date = new Date(post.published).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="group flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
            {/* Aesthetic gradient border effect at the top */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                <div className="mb-4">
                    <Link href={`/posts/${post.slug}`} className="block">
                        <h2 className="text-xl font-extrabold leading-tight text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                            {post.title}
                        </h2>
                    </Link>
                </div>

                {/* Metadata - Author and Tags removed by request */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800/50 px-3 py-1.5 rounded-full border border-neutral-100 dark:border-neutral-800">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="font-medium">{date}</span>
                    </div>
                </div>
            </div>

            {/* Read More link for UX */}
            <div className="mt-8">
                <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center text-sm font-bold text-orange-600 dark:text-orange-400 hover:gap-2 transition-all"
                >
                    Read More
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
            </div>
        </div>
    );
}
