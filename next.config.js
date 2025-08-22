// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      
      { source: "/printing-perth", destination: "/", permanent: true },

      { source: "/signage", destination: "/signage-perth", permanent: true },

      // legacy Squarespace paths → relevant pages
      { source: "/contact-us", destination: "/contact", permanent: true },
      
      

      // /bethesda (exact)
      {
        source: "/bethesda",
        destination: "https://form.jotform.com/93288694319877",
        permanent: true,
      },
      // /bethesda/... (any subpaths)
      {
        source: "/bethesda/:path*",
        destination: "https://form.jotform.com/93288694319877",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
