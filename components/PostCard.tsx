import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface PostCardProps {
    post: any; 
}

const MAX_TITLE_LENGTH = 100;

export default function PostCard({ post }: PostCardProps) {
    const rawDateString = post.date || post.published;
    const safeDateObj = rawDateString ? new Date(rawDateString) : new Date();

    const formattedDate = safeDateObj.toLocaleDateString("en-IN", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const displayTitle = post.title?.length > MAX_TITLE_LENGTH 
        ? `${post.title.substring(0, MAX_TITLE_LENGTH).trim()}...` 
        : post.title;

    return (
        <article className="group/card flex flex-col justify-between p-4 sm:p-6 bg-white dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/30 dark:hover:bg-zinc-800/80 active:scale-[0.98] transition-all duration-300 h-full relative cursor-pointer">

            <div>
                <div className="mb-2 sm:mb-3">
                    {/* Title hovers to a soft indigo instead of gray */}
                    <h2 className="text-base sm:text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors">
                        <Link href={`/blog/${post.slug}`} prefetch={false}>
                            <span className="absolute inset-0" aria-hidden="true" />
                            {displayTitle}
                        </Link>
                    </h2>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-2 sm:mt-3">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span suppressHydrationWarning>{formattedDate}</span>
                </div>
            </div>

            <div className="mt-4 sm:mt-8">
                {/* CTA uses indigo to signal clickability immediately */}
                <div className="inline-flex items-center text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 transition-colors">
                    Read More
                    <span className="ml-1 transform group-hover/card:translate-x-1 transition-transform duration-300">→</span>
                </div>
            </div>
        </article>
    );
}