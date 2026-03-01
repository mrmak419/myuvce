import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "MyUVCE - The Student Community Portal",
    template: "%s | MyUVCE"
  },
  description: "The ultimate student community portal for the University Visvesvaraya College of Engineering. Access notes, news, and campus updates.",
  icons: {
    icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmz1bkkO3JPLMjpXjV7tEKKJytWXsxlyDRQJWz-h7BOZmQkz5_TYGzPLU9MhLReghjouHQ87Yobsa_0EApCbTwZW9uRP2FdYw9xtZ0DVr98eWmJBfcOppkFuak-xaX-wO2s8NVdexzxf3s_z-5jvUbE39MxiGciboANAd7e07qZKipszYlx0FfTnYmI0og/s1600/IMG-20251206-WA0057.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
