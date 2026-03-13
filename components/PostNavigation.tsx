import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PostLink {
  title: string;
  slug: string;
}

interface PostNavigationProps {
  prevPost: PostLink | null; // Older post
  nextPost: PostLink | null; // Newer post
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      
      {/* Newer Post (LHS) */}
      {nextPost ? (
        <Link 
          href={`/blog/${nextPost.slug}`} 
          className="group flex flex-col items-start p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-orange-600 dark:hover:border-orange-400 hover:shadow-sm transition-all"
        >
          <ArrowLeft size={20} className="text-orange-600 dark:text-orange-400 mb-3 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div /> // Empty div to keep the grid layout balanced if there is no newer post
      )}
      
      {/* Older Post (RHS) */}
      {prevPost ? (
        <Link 
          href={`/blog/${prevPost.slug}`} 
          className="group flex flex-col items-end text-right p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-orange-600 dark:hover:border-orange-400 hover:shadow-sm transition-all"
        >
          <ArrowRight size={20} className="text-orange-600 dark:text-orange-400 mb-3 group-hover:translate-x-1 transition-transform" />
          <span className="font-semibold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div /> 
      )}
    </div>
  );
}