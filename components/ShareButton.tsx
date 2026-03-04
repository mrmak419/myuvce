'use client';

import { Share2, Link2, Linkedin, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

// Custom WhatsApp SVG Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstagramShare = () => {
    copyToClipboard();
    window.open('https://instagram.com', '_blank');
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon, // Now using the authentic brand icon
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + fullUrl)}`,
      color: 'hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      onClick: handleInstagramShare,
      color: 'hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
      color: 'hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20',
    }
  ];

  return (
    <div className="flex items-center gap-4 py-6 border-y border-neutral-100 dark:border-neutral-800 my-8">
      <span className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        Share Post:
      </span>

      <div className="flex items-center gap-2">
        {/* Native Share for Mobile/PWA */}
        <button
          onClick={handleNativeShare}
          className="md:hidden p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 transition-colors"
          aria-label="Share via Device"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Social Links for Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {shareLinks.map((link) => {
            const Icon = link.icon;
            
            if (link.onClick) {
              return (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className={`p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-all ${link.color}`}
                  title={`Share on ${link.name}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-all ${link.color}`}
                title={`Share on ${link.name}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all relative ml-1"
          title="Copy Link"
        >
          {copied && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded shadow-xl whitespace-nowrap z-10">
              Copied!
            </span>
          )}
          <Link2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}