import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

                    {/* Brand & Description */}
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white">
                                <img
                                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmz1bkkO3JPLMjpXjV7tEKKJytWXsxlyDRQJWz-h7BOZmQkz5_TYGzPLU9MhLReghjouHQ87Yobsa_0EApCbTwZW9uRP2FdYw9xtZ0DVr98eWmJBfcOppkFuak-xaX-wO2s8NVdexzxf3s_z-5jvUbE39MxiGciboANAd7e07qZKipszYlx0FfTnYmI0og/s1600/IMG-20251206-WA0057.jpg"
                                    alt="MyUVCE Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
                                myuvce.in
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                            The official student community portal for the University Visvesvaraya College of Engineering. Built by students, for students.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="https://x.com/myuvce" className="p-2 rounded-full text-neutral-500 hover:text-orange-600 dark:hover:text-orange-400 bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="Twitter">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com/company/myuvce" className="p-2 rounded-full text-neutral-500 hover:text-orange-600 dark:hover:text-orange-400 bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://github.com/mrmak419" className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="GitHub">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/notices" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Notice Board</Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Gallery</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/syllabus" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Syllabus</Link>
                            </li>
                            <li>
                                <Link href="/question-papers" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Previous Papers</Link>
                            </li>
                            <li>
                                <Link href="/clubs" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Student Clubs</Link>
                            </li>
                            <li>
                                <Link href="/alumni" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Alumni Portal</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <Mail className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                <a href="mailto:contact@myuvce.in" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">contact@myuvce.in</a>
                            </li>
                            <li className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                                University Visvesvaraya College of Engineering,<br />
                                K R Circle, Bengaluru - 560001
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">
                        &copy; {currentYear} MyUVCE. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
