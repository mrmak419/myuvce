"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // 1. Prevent the default mini-infobar from appearing on mobile
      e.preventDefault();

      // 2. Read fresh data from localStorage EVERY time the event fires
      const dismissedAt = localStorage.getItem("pwa-prompt-dismissed");
      if (dismissedAt) {
        const dismissTime = parseInt(dismissedAt, 10);
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        if (now - dismissTime < oneWeek) {
          return; // Silently abort if they dismissed it recently
        }
      }

      // 3. Only show if the check passes
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []); // Empty dependency array is correct here

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      // Mark as dismissed so it doesn't try to re-prompt during the session
      localStorage.setItem("pwa-prompt-dismissed", Date.now().toString()); 
    } else {
      console.log("User dismissed the install prompt via system dialog");
    }

    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xl flex items-start gap-4">
        
        <div className="w-12 h-12 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <img src="/logo.jpg" alt="MyUVCE" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Install MyUVCE App</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
            Get instant access to notes, maps, and tools directly from your home screen. Works offline!
          </p>
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Install App
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              Not Now
            </button>
          </div>
        </div>

        <button 
          onClick={handleDismiss}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 absolute top-3 right-3"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}