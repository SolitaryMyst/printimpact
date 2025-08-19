// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/printing-perth", permanent: true },
    ];
  },
};
module.exports = nextConfig;
