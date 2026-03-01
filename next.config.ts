import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'blogger.googleusercontent.com' },
      { protocol: 'https', hostname: '*.bp.blogspot.com' },
    ],
  },
  async redirects() {
    return [
      // 1. Dynamic Blogger Post Migrations
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug.html',
        destination: '/blog/:slug',
        permanent: true,
      },
      // 2. Internal Refactoring Catch-all
      {
        source: '/posts/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // 3. Legacy Static Pages Migration
      {
        source: '/p/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/p/contact-us.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/p/privacy-policy.html',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/p/term-page.html',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/p/submit-profile.html',
        destination: '/submit-profile',
        permanent: true,
      },
      {
        source: '/p/myuvce-wall-of-fame.html',
        destination: '/wall',
        permanent: true,
      },
      {
        source: '/p/gallery.html',
        destination: '/gallery',
        permanent: true
      },
      {
        source: '/p/disclaimer.html',
        destination: '/disclaimer',
        permanent: true
      },
      {
        source: '/p/classroom-directory.html',
        destination: '/map',
        permanent: true
      }
    ];
  },
};

export default nextConfig;