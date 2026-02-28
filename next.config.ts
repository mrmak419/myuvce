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
      {
        // Intercepts legacy Blogger URLs
        source: '/:year(\\d{4})/:month(\\d{2})/:slug.html',
        // Redirects to your chosen namespace
        destination: '/posts/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;