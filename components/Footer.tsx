"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // If the user is not on the root homepage, do not render the footer
  if (pathname !== "/") {
    return null;
  }

  return (
    <footer className="w-full bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white flex-shrink-0">
                <img
                  src="/logo.jpg"
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
              {/* WhatsApp */}
              <a href="https://whatsapp.com/channel/0029VbBewjS2ER6oSkOHcs1H" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-neutral-500 hover:text-green-600 dark:hover:text-green-400 bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="WhatsApp Channel">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/myuvce" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-neutral-500 hover:text-pink-600 dark:hover:text-pink-400 bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/myuvce" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-neutral-500 hover:text-[#0A66C2] bg-neutral-100 dark:bg-neutral-900 transition-colors" aria-label="LinkedIn">
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

          {/* Column 2: Legal & Help */}
          <div className="md:col-span-3 space-y-5">
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

          {/* Column 3: Contact */}
          <div className="md:col-span-4 space-y-5 lg:ml-auto">
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
        </div>
      </div>
    </footer>
  );
}