"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BookOpen, Map as MapIcon, Calendar, Users, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// --- Desktop Navigation Links ---
const desktopLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Map", href: "/map" },
  { name: "Notes", href: "/uvce-notes"},
  { name: "Gallery", href: "/gallery" },
];

// --- Mobile Bottom Nav Links (Upgraded to 5 tabs) ---
const mobileLinks = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Events", icon: Calendar, href: "/events" },
  { name: "Blog", icon: FileText, href: "/blog" },
  { name: "Notes", icon: BookOpen, href: "/uvce-notes" },
  { name: "Map", icon: MapIcon, href: "/map" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Route Checks
  const isCampusLifeActive = pathname?.startsWith('/events') || pathname?.startsWith('/clubs');
  
  // Logic to determine if the top header should be visible on mobile
  const showMobileHeader = pathname === "/" || pathname?.startsWith("/blog");

  return (
    <>
      {/* --- TOP HEADER (Sticky) --- */}
      <header 
        className={`sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200/60 dark:border-zinc-800/50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${!showMobileHeader ? 'hidden md:block' : ''}`} 
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">

            {/* Logo & Brand (LHS) */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white border border-zinc-200 dark:border-zinc-700/50 shadow-sm group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-all duration-300 flex-shrink-0">
                  <img
                    src="/logo.jpg"
                    alt="MyUVCE Logo"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  MyUVCE
                </span>
              </Link>
            </div>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {desktopLinks.map((link) => {
                const isActive = pathname === link.href || (pathname?.startsWith(`${link.href}/`) && link.href !== "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Campus Life Dropdown */}
              <div className="relative group">
                <button 
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isCampusLifeActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-50"
                  }`}
                >
                  Campus Life
                  <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                
                {/* Dropdown Menu Panel */}
                <div className="absolute top-full right-0 mt-1 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-1.5 flex flex-col gap-1">
                    <Link 
                      href="/events" 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Events</span>
                        <span className="text-[10px] text-zinc-500">Upcoming campus activities</span>
                      </div>
                    </Link>
                    <Link 
                      href="/clubs" 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Users className="w-4 h-4 text-emerald-500" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Clubs</span>
                        <span className="text-[10px] text-zinc-500">Explore technical societies</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Theme Toggle */}
            <div className="flex items-center md:pl-4 md:border-l border-zinc-200 dark:border-zinc-800/50">
              <ThemeToggle />
            </div>

          </div>
        </div>
      </header>

      {/* --- MOBILE BOTTOM NAVIGATION DOCK --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800/50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16 px-1 sm:px-2">
          {mobileLinks.map((link) => {
            const Icon = link.icon;
            // Special check for events to catch both /events and /clubs under the Calendar icon
            const isEventsTab = link.href === '/events';
            const isActive = pathname === link.href || (pathname?.startsWith(`${link.href}/`) && link.href !== "/") || (isEventsTab && pathname?.startsWith('/clubs'));
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors active:scale-95 touch-manipulation ${
                  isActive 
                  ? "text-indigo-600 dark:text-indigo-400" 
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                }`}
              >
                <Icon className="w-5 h-5 transition-all" strokeWidth={isActive ? 2.5 : 1.75} />
                <span className={`text-[9px] sm:text-[10px] transition-all ${isActive ? "font-bold" : "font-medium"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}