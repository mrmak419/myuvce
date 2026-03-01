import Link from "next/link";
import {Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">

                    {/* Column 1: Brand & Description (Takes up more space) */}
                    <div className="md:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group inline-flex">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white flex-shrink-0">
                                <img
                                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmz1bkkO3JPLMjpXjV7tEKKJytWXsxlyDRQJWz-h7BOZmQkz5_TYGzPLU9MhLReghjouHQ87Yobsa_0EApCbTwZW9uRP2FdYw9xtZ0DVr98eWmJBfcOppkFuak-xaX-wO2s8NVdexzxf3s_z-5jvUbE39MxiGciboANAd7e07qZKipszYlx0FfTnYmI0og/s1600/IMG-20251206-WA0057.jpg"
                                    alt="MyUVCE Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
                                MyUVCE
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
                            The unofficial digital guide for UVCE Bangalore. We help students navigate the KR Circle campus with digital maps, classroom directories, and survival guides.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            {/* Instagram */}
                            <a href="https://instagram.com/myuvce" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-neutral-500 hover:text-pink-600 dark:hover:text-pink-400 bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="Instagram">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="https://linkedin.com/company/myuvce" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-neutral-500 hover:text-[#0A66C2] bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            {/* GitHub Repository */}
                            <a href="https://github.com/mrmak419/myuvce" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="GitHub Repository">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="md:col-span-3 space-y-5">
                        <h3 className="font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Explore</h3>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/blog/the-map-of-uvce" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Campus Map</Link>
                            </li>
                            <li>
                                <Link href="/map" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Classroom Directory</Link>
                            </li>
                            <li>
                                <Link href="/blog/guide-to-uvce-student-clubs" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Student Clubs</Link>
                            </li>
                            <li>
                                <Link href="/blog/uvce-freshers-guide-5-things-you-need" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Fresher's Guide</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Help */}
                    <div className="md:col-span-2 space-y-5">
                        <h3 className="font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Legal & Help</h3>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/about" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/disclaimer" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Disclaimer</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact (Right aligned on large screens) */}
                    <div className="md:col-span-3 space-y-5 lg:ml-auto">
                        <h3 className="font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Reach Out</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                <a href="mailto:contact@myuvce.in" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">contact@myuvce.in</a>
                            </li>
                            <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8">
                                University Visvesvaraya College of Engineering,<br />
                                K.R. Circle, Bengaluru - 560001
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 text-center md:text-left">
                        &copy; {currentYear} MyUVCE. An unofficial student initiative.
                    </p>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 text-center md:text-right">
                        Built by{' '}
                        <a href="https://www.linkedin.com/in/mrmak" target="_blank" rel="noopener noreferrer" className="text-neutral-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 transition-colors">Ayaan</a>
                        {' '}&{' '}
                        <a href="https://www.linkedin.com/in/gourav-pd-631526385" target="_blank" rel="noopener noreferrer" className="text-neutral-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 transition-colors">Gourav</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}