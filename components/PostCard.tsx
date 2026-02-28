import Link from 'next/link';
import { Calendar, User, Tag } from 'lucide-react';
import { Post } from '@/types/blogger';

export default function PostCard({ post }: { post: Post }) {
    const date = new Date(post.published).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="group flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
            {/* Optional aesthetic gradient border effect at the top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                <div className="mb-4">
                    <Link href={`/posts/${post.slug}`} className="block">
                        <h2 className="text-xl font-extrabold leading-snug text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {post.title}
                        </h2>
                    </Link>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                    <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded-md">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded-md">
                        <User className="w-4 h-4 text-indigo-500" />
                        <span className="truncate max-w-[120px]">{post.author?.displayName || 'Unknown Author'}</span>
                    </div>
                </div>
            </div>

            {/* Badges/Tags mapped */}
            {post.labels && post.labels.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 mt-auto">
                    <Tag className="w-4 h-4 text-neutral-400" />
                    {post.labels.slice(0, 3).map((label, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 shadow-sm"
                        >
                            {label}
                        </span>
                    ))}
                    {post.labels.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold tracking-wide bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                            +{post.labels.length - 3}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
