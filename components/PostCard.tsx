import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface PostCardProps {
    post: any; 
}

export default function PostCard({ post }: PostCardProps): React.ReactElement {
    // 1. SMART FALLBACK: Grab the date whether it arrives as 'date' (raw MDX) or 'published' (mapped by BlogFeed)
    const rawDateString = post.date || post.published;

    // 2. FAILSAFE: If the MDX file is completely missing a date, fallback to today to prevent crashes
    const safeDateObj = rawDateString ? new Date(rawDateString) : new Date();

    const formattedDate = safeDateObj.toLocaleDateString("en-IN", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <article className="group/card flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-rose-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

            <div>
                <div className="mb-3">
                    <h2 className="text-xl font-extrabold leading-tight text-neutral-900 dark:text-white group-hover/card:text-orange-600 dark:group-hover/card:text-orange-400 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`} prefetch={false}>
                            <span className="absolute inset-0" aria-hidden="true" />
                            {post.title}
                        </Link>
                    </h2>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span suppressHydrationWarning>{formattedDate}</span>
                </div>
            </div>

            <div className="mt-8">
                <div className="inline-flex items-center text-sm font-bold text-orange-600 dark:text-orange-400 group-hover/card:gap-2 transition-all">
                    Read More
                    <span className="ml-1 opacity-0 group-hover/card:opacity-100 transition-opacity">→</span>
                </div>
            </div>
        </article>
    );
}