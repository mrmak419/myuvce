"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BookOpen, Map as MapIcon, Calendar, Users, Menu, X, Image as ImageIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// --- Desktop Navigation Links (Flattened) ---
const desktopLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Clubs", href: "/clubs" },
  { name: "Blog", href: "/blog" },
  { name: "Notes", href: "/uvce-notes"},
  { name: "Map", href: "/map" },
  { name: "Gallery", href: "/gallery" },
];

// --- Mobile Bottom Nav Links (Primary 4) ---
const mobileLinks = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Events", icon: Calendar, href: "/events" },
  { name: "Blog", icon: FileText, href: "/blog" },
  { name: "Notes", icon: BookOpen, href: "/uvce-notes" }, // Moved Notes to primary dock
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll visibility logic
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          setIsMenuOpen(false); // Close mobile menu on scroll down
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Click outside listener for mobile menu popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // --- Visibility Logic ---
  // Safely parse the path components (e.g., /events/marvel/design-sprint -> ['events', 'marvel', 'design-sprint'])
  const pathParts = pathname?.split('/').filter(Boolean) || [];
  
  // Hide completely on /events/[club]/[event] AND /events/portal/[token]
  const isFormOrPortalPage = pathParts[0] === 'events' && pathParts.length >= 3;
  
  if (isFormOrPortalPage) {
    return null; // Return nothing, completely hiding top and bottom navs
  }

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
                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white border border-zinc-200 dark:border-zinc-700/50 shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
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
            </nav>

            {/* Theme Toggle */}
            <div className="flex items-center md:pl-4 md:border-l border-zinc-200 dark:border-zinc-800/50">
              <ThemeToggle />
            </div>

          </div>
        </div>
      </header>

      {/* --- MOBILE POPUP MENU (RHS) --- */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden fixed bottom-20 right-4 w-48 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-bottom-4 fade-in duration-200"
        >
          <div className="flex flex-col p-2 gap-1">
            <Link 
              href="/clubs" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Users className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-bold">Clubs</span>
            </Link>
            
            <Link 
              href="/map" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <MapIcon className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-bold">Campus Map</span>
            </Link>

            <Link 
              href="/gallery" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-bold">Gallery</span>
            </Link>
          </div>
        </div>
      )}

      {/* --- MOBILE BOTTOM NAVIGATION DOCK --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800/50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16 px-1 sm:px-2">
          {mobileLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (pathname?.startsWith(`${link.href}/`) && link.href !== "/");
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} // Close menu if another tab is clicked
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

          {/* Dedicated Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors active:scale-95 touch-manipulation ${
              isMenuOpen 
              ? "text-indigo-600 dark:text-indigo-400" 
              : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 transition-all" strokeWidth={2.5} />
            ) : (
              <Menu className="w-5 h-5 transition-all" strokeWidth={1.75} />
            )}
            <span className={`text-[9px] sm:text-[10px] transition-all ${isMenuOpen ? "font-bold" : "font-medium"}`}>
              Menu
            </span>
          </button>
        </div>
      </div>
    </>
  );
}