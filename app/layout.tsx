import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "MyUVCE - The Ultimate Student Resource Hub",
    template: "%s | MyUVCE"
  },
  //  Truncated slightly for optimal SEO scoring (160 characters)
  description: "The ultimate unofficial resource hub for UVCE students. Access a comprehensive library of Notes, PYQs, Lab Manuals, Placement Prep, and our exclusive Campus Map.",
  manifest: "/site.webmanifest", 
  icons: {
    icon: "/logo.jpg",
    apple: "/apple-touch-icon.png", 
  },
  //  Added OpenGraph to make WhatsApp/LinkedIn links look professional
  openGraph: {
    title: "MyUVCE - Student Resource Hub",
    description: "The ultimate unofficial resource hub for UVCE students from First to Final year. Access Notes, PYQs, Lab Manuals, Campus Map, and Placement guides.",
    url: "https://www.myuvce.in",
    siteName: "MyUVCE",
    type: "website",
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' }, 
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },  
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents iOS Safari from zooming in when students tap inputs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics GA4 Script Injection */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-WM3K309SLK`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WM3K309SLK', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 min-h-screen flex flex-col pb-16 md:pb-0`}
      >
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
    </html>
  );
}