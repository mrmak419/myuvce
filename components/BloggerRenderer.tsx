'use client';

import { useEffect, useRef } from 'react';

export default function BloggerRenderer({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // React strips scripts on injection. This finds them and forces them to run.
    const scripts = containerRef.current.querySelectorAll('script');

    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');

      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.innerHTML = oldScript.innerHTML;

      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      // Suppress hydration errors caused by Blogger's invalid HTML structures (like <style> tags in the body)
      suppressHydrationWarning 
      // The prose class handles typography, but allows your custom inline CSS to override
      className="prose-config max-w-none prose-img:mx-auto prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}