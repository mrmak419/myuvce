'use client';

import { useEffect, useRef } from 'react';

export default function BloggerRenderer({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Only target scripts that we haven't already processed
    const scripts = containerRef.current.querySelectorAll('script:not([data-executed="true"])');

    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');

      // 1. Replicate all attributes (src, type, async, defer, etc.)
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // 2. Replicate inline execution code
      if (oldScript.innerHTML) {
        newScript.innerHTML = oldScript.innerHTML;
      }

      // 3. Tag the script to prevent React Strict Mode from double-executing it
      newScript.setAttribute('data-executed', 'true');

      // 4. Hot-swap the dead script node with the live one
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning 
      className="prose-config max-w-none prose-img:mx-auto prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}