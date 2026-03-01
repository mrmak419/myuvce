"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BookOpen, Map as MapIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// --- Desktop Navigation Links ---
const desktopLinks = [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    { name: "Gallery", href: "/gallery" },
    { name: "Wall of Fame", href: "/wall" },
];

// --- Mobile Bottom Nav Links ---
const mobileLinks = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Blog", icon: FileText, href: "/blog" },
    { name: "Study", icon: BookOpen, href: "/resources" }, // Adjust href if your study material is elsewhere
    { name: "Map", icon: MapIcon, href: "/map" },
];

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    // Hide top navbar on scroll down, show on scroll up
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

    return (
        <>
            {/* --- TOP HEADER (Sticky) --- */}
            <header 
                className={`sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/60 dark:border-neutral-800/60 transition-transform duration-300 ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 sm:h-20 items-center">

                        {/* Logo & Brand (LHS) */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white border border-neutral-200 dark:border-neutral-800 shadow-sm group-hover:shadow-orange-500/20 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                                    <img
                                        src="/logo.jpg"
                                        alt="MyUVCE Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    MyUVCE
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation (Hidden on Mobile) */}
                        <nav className="hidden md:flex items-center space-x-2">
                            {desktopLinks.map((link) => {
                                const isActive = pathname === link.href || (pathname?.startsWith(`${link.href}/`) && link.href !== "/");
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                                            isActive
                                                ? "text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20"
                                                : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Theme Toggle (Right aligned on all screens) */}
                        <div className="flex items-center md:pl-4 md:border-l border-neutral-200 dark:border-neutral-800">
                            <ThemeToggle />
                        </div>

                    </div>
                </div>
            </header>

            {/* --- MOBILE BOTTOM NAVIGATION DOCK --- */}
            <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
                <div className="flex justify-around items-center h-16 px-2">
                    {mobileLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (pathname?.startsWith(`${link.href}/`) && link.href !== "/");
                        
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                                    isActive 
                                    ? "text-orange-600 dark:text-orange-400" 
                                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                                }`}
                            >
                                {/* We fill the icon if it's active for a native app feel */}
                                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                                <span className={`text-[10px] font-bold ${isActive ? "opacity-100" : "opacity-80"}`}>
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