"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm opacity-50">
        <span className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="p-2 sm:p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm backdrop-blur-sm 
                 hover:scale-105 hover:bg-neutral-50 dark:hover:bg-neutral-800 
                 transition-all duration-300 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-orange-400/50 group"
      aria-label="Toggle Dark Mode"
    >
      {currentTheme === "dark" ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
}
