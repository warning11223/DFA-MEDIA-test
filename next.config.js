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
  },
};

module.exports = nextConfig;
