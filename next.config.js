// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/", destination: "/printing-perth", permanent: true },
      { source: "/signage", destination: "/signage-perth", permanent: true },
    ];
  },
};

module.exports = nextConfig;
