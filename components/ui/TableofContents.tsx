// components/ui/TableOfContents.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronDown, List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    
    const headingData = elements.map((elem) => {
      if (!elem.id) {
        elem.id = elem.textContent?.toLowerCase().replace(/\s+/g, '-') || "section";
      }
      return {
        id: elem.id,
        text: elem.textContent || "",
        level: Number(elem.tagName.charAt(1)),
      };
    });

    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      if (isMobile) setIsOpen(false); // Close mobile menu after clicking
    }
  };

  if (headings.length === 0) return null;

  // --- MOBILE DROPDOWN UI ---
  if (isMobile) {
    return (
      <div className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden mb-8">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between font-bold text-sm text-neutral-900 dark:text-white"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-orange-600 dark:text-orange-500" />
            Table of Contents
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        
        {isOpen && (
          <ul className="px-4 pb-4 pt-1 space-y-3 text-sm border-t border-neutral-200 dark:border-neutral-800">
            {headings.map((heading) => (
              <li key={heading.id} className={`${heading.level === 3 ? "ml-4" : ""}`}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block transition-colors ${
                    activeId === heading.id
                      ? "text-orange-600 dark:text-orange-500 font-semibold"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // --- DESKTOP SIDEBAR UI ---
  return (
    <nav className="pl-6 border-l border-neutral-200 dark:border-neutral-800">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
        On this page
      </h4>
      <ul className="space-y-3 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={`${heading.level === 3 ? "ml-4" : ""}`}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block transition-colors duration-200 ${
                activeId === heading.id
                  ? "text-orange-600 dark:text-orange-500 font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};