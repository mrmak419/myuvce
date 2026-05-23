'use client';

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TagBackButton() {
  const [backUrl, setBackUrl] = useState("/blog");
  const [backText, setBackText] = useState("Back to Blog");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. First check if a 'from' query parameter exists (for Next.js SPA client-side transitions)
      const searchParams = new URLSearchParams(window.location.search);
      const fromSlug = searchParams.get("from");
      
      if (fromSlug) {
        setBackUrl(`/blog/${fromSlug}`);
        setBackText("Back to Article");
        return;
      }

      // 2. Fallback to document.referrer (for standard full-page reloads)
      if (document.referrer) {
        const referrer = document.referrer;
        const origin = window.location.origin;
        
        if (referrer.startsWith(origin)) {
          const path = referrer.substring(origin.length);
          
          // If the path points to an individual blog article (e.g. /blog/my-slug)
          // and is not a sub-route like /blog/tags/something or /blog itself
          if (path.startsWith("/blog/") && !path.startsWith("/blog/tags") && path !== "/blog") {
            setBackUrl(path);
            setBackText("Back to Article");
          }
        }
      }
    }
  }, []);

  return (
    <Link
      href={backUrl}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {backText}
    </Link>
  );
}
