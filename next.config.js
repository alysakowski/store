/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
    ],
    unoptimized: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
