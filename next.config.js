/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      { hostname: "dummyimage.com" },
    ],
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
