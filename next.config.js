const optimizedImages = require("next-optimized-images");
const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "dummyimage.com"],
  },
};

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        /* config for next-optimized-images */
        // Добавьте здесь настройки для next-optimized-images, если необходимо
      },
    ],
  ],
  nextConfig,
);
