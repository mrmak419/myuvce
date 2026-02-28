"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Notice Board", href: "/notices" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/50 dark:border-neutral-800/50 supports-[backdrop-filter]:bg-white/60 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 sm:h-20 items-center">

                    {/* Logo & Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-300">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                myuvce.in
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`) && link.href !== "/";
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-800/50 ${isActive
                                            ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                                            : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full rounded-b-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                                    )}
                                </Link>
                            );
                        })}

                        <div className="pl-4 ml-2 border-l border-neutral-200 dark:border-neutral-800 flex items-center">
                            <ThemeToggle />
                        </div>
                    </nav>

                    {/* Mobile Menu Button context */}
                    <div className="md:hidden flex items-center gap-3 sm:gap-4">
                        <ThemeToggle />
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 bg-neutral-100/50 dark:bg-neutral-900/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 border border-transparent dark:border-neutral-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[400px] opacity-100 border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-xl" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2 sm:px-6">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`) && link.href !== "/";
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold transition-colors ${isActive
                                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30"
                                        : "text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80"
                                    }`}
                            >
                                <span>{link.name}</span>
                                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "translate-x-1" : "opacity-50"}`} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
