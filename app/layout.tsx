import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker";

const GA_ID = "G-WM3K309SLK";

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
  openGraph: {
    title: "MyUVCE - Student Resource Hub",
    description: "The ultimate unofficial resource hub for UVCE students.",
    url: "https://myuvce.in",
    siteName: "MyUVCE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' }, 
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },  
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, 
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 min-h-screen flex flex-col pb-16 md:pb-0`}>
        <GoogleAnalyticsTracker gaId="G-WM3K309SLK" />
        
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
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}