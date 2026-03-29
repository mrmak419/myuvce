import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PwaInstallPrompt from "@/components/PWAInstallPrompt";

const GA_ID = "G-PP42W81CTJ";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://myuvce.in"),
  title: {
    default: "MyUVCE - The Ultimate Student Resource Hub",
    template: "%s | MyUVCE"
  },
  description: "The ultimate unofficial resource hub for UVCE students. Access Notes, PYQs, Lab Manuals, and more.",
  alternates: { canonical: "https://myuvce.in" },
  manifest: "/site.webmanifest", 
  icons: { icon: "/logo.jpg", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' }, // zinc-50
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },  // FIXED: zinc-900 (Softer studio gray)
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* FIXED: Changed dark:bg-zinc-950 to dark:bg-zinc-900 */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 min-h-screen flex flex-col pb-16 md:pb-0`}>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="uvce-theme-v2"
        >
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>

        <PwaInstallPrompt />
      </body>
      
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}