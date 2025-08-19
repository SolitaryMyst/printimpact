// next.config.js
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/", destination: "/printing-perth", permanent: true },
      { source: "/signage", destination: "/signage-perth", permanent: true },

      // legacy Squarespace paths → relevant pages
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/take-action", destination: "/contact", permanent: true },
      { source: "/new-page", destination: "/printing-perth", permanent: true },
      // if /bethesda was a private portal and is gone:
      { source: "/bethesda", destination: "/medical-supply-perth", permanent: true },
    ];
  },
};
module.exports = nextConfig;
